# Kaayo Phase 2 (Onboarding Completion) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close every onboarding gap identified in `docs/kaayo-redesign-frontend-prd.md` Phase 2 (items 2.1–2.6) and `docs/kaayo-redesign-backend-prd.md` Phase 2 (items 2.1–2.4), using the Phase 1 decisions already resolved and recorded inline (✅ RESOLVED) in both PRDs as binding constraints.

**Architecture:** Backend changes are additive Java DTO/service extensions on top of the existing Firestore-transaction pattern (`*Service.java` + `*Controller.java` + `*EmulatorIT.java`); no new services. Frontend changes extend existing onboarding screens (`CenterScreen`, `SubscriptionScreen`, `BranchScreen`) and the existing `ImportScreen` into a parameterized wizard, plus two net-new screens (Setup-complete, Dashboard first-run prompt). Org-profile fields (logoUrl, firstRunPromptShown) stay frontend-direct-Firestore-write, consistent with how `centerType`/`name` are already written today — no backend endpoint for those two fields.

**Tech Stack:** Backend: Java 25, Spring Boot, Firestore (Google Cloud Firestore Admin SDK), JUnit 5 + Firestore Emulator integration tests (`*EmulatorIT.java`, run via `mvnw verify -Pemulator-tests`). Frontend: React Native/Expo, TypeScript, React Query, Zod, `expo-image-picker`, `expo-document-picker`, `papaparse`, Firebase JS SDK (Firestore + Storage).

**Testing note:** The backend has a real test tier (`*EmulatorIT.java` against a Firestore emulator) — every backend task below follows strict TDD against that existing pattern. The frontend has **no existing component/unit test suite** (confirmed: `jest` is installed only for Firestore-rules tests via `jest.rules.config.js`; zero `*.test.tsx` files exist under `frontend/` outside `node_modules`). Introducing a new RN test framework is out of scope for this feature work, so frontend tasks are verified via `npx tsc --noEmit` (must stay clean) plus an explicit manual run-through step in Expo — this is the existing project convention, not a shortcut.

---

## Backend Tasks

### Task 1: Fix payments bulk-settle atomicity (BUG-1)

**Files:**
- Modify: `backend/src/main/java/com/kaayo/service/PaymentService.java:36-50,201-248`
- Test: `backend/src/test/java/com/kaayo/payment/PaymentEmulatorIT.java`

- [ ] **Step 1: Write the failing test**

Add to `PaymentEmulatorIT.java` (after the existing `settle_marksSelectedInvoicesFullyPaidAndSkipsAlreadyPaid` test):

```java
@Test
void settle_oneInvalidPaymentIdAbortsEntireBatchWithNoPartialCommit() throws Exception {
    String orgId = newOrgWithEnrollment("enr-1", 1000, "2026-05", "full", "2026-05-01");
    paymentService.generateForOrg(orgId, "2026-05", "uid-x", "MASTER");
    RequestAuthContext ctx = masterContext("uid-" + orgId, orgId);

    ApiException ex = assertThrows(ApiException.class, () -> paymentService.settle(
        ctx, new SettleRequest(List.of("enr-1_2026-05", "does-not-exist_2026-05"), "cash", "2026-05-15", "bulk")));
    assertEquals("PAYMENT_NOT_FOUND", ex.getCode());

    DocumentSnapshot payment = getPayment(orgId, "enr-1_2026-05");
    assertEquals(0L, payment.getLong("amountPaid"), "The valid invoice must NOT be settled when another invoice in the same batch fails");
    assertEquals("unpaid", payment.getString("status"));

    long ledgerCount = firestore.collection("organizations").document(orgId)
        .collection("paymentTransactions").get().get().size();
    assertEquals(0, ledgerCount, "No ledger entry should be written when the batch aborts");
}
```

- [ ] **Step 2: Run test to verify it fails**

Run (from `backend/`, with the emulator already running per Step 0 below):

```bash
cd frontend && firebase emulators:start --only firestore,auth,storage --project demo-kaayo
```

In a second terminal:

```bash
cd backend && ./mvnw verify -Pemulator-tests -Dit.test=PaymentEmulatorIT#settle_oneInvalidPaymentIdAbortsEntireBatchWithNoPartialCommit
```

Expected: **FAIL** — under today's code, `settle()` loops and calls `settleOne()` per ID; the valid ID succeeds and gets committed (becomes `paid`) before the invalid ID is reached and silently added to a `failed` list. No exception is thrown, so `assertThrows` fails, and even if it didn't, `amountPaid` would already be `1000`, not `0`.

- [ ] **Step 3: Implement the single-transaction fix**

Replace lines 199-248 of `PaymentService.java` (the `// ─── Settlement ───` section through the end of `settleOne()`) with:

```java
    // ─── Settlement ───────────────────────────────────────────────────────────

    public SettleResult settle(RequestAuthContext ctx, SettleRequest request) {
        RequestAuthContext.ActiveMembership membership = ctx.requireActiveMembership();
        String orgId = membership.orgId();
        Role actorRole = membership.role();

        try {
            return firestore.runTransaction(transaction -> {
                int settled = 0;
                int alreadyPaid = 0;
                for (String paymentId : request.paymentIds()) {
                    DocumentReference paymentRef = paymentsCol(orgId).document(paymentId);
                    DocumentSnapshot paymentSnap = transaction.get(paymentRef).get();
                    if (!paymentSnap.exists()) {
                        throw new NotFoundException("PAYMENT_NOT_FOUND", "Payment record not found: " + paymentId);
                    }
                    int amountDue = orZeroInt(paymentSnap.getLong("amountDue"));
                    int amountPaid = orZeroInt(paymentSnap.getLong("amountPaid"));
                    int remaining = amountDue - amountPaid;
                    if (remaining <= 0) {
                        alreadyPaid++;
                        continue;
                    }
                    applyPayment(transaction, orgId, paymentRef, paymentSnap, remaining,
                        request.mode(), request.paidOn(), request.notes(), ctx, actorRole);
                    settled++;
                }
                return new SettleResult(settled, alreadyPaid, List.of());
            }).get();
        } catch (ExecutionException e) {
            throw unwrapTransactionFailure(e, "Settle failed for batch in org " + orgId);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new FirestoreAccessException("Settle interrupted for org " + orgId, e);
        }
    }
```

Also update the class-level javadoc (lines 45-49) — replace:

```java
 * recordTransaction and settle each run as one Firestore transaction per invoice so the amountPaid
 * update, the immutable paymentTransactions ledger entry and the audit entry converge atomically,
 * and every transaction re-reads current amountPaid before deciding - concurrent attempts on the
 * same invoice cannot push amountPaid past amountDue (plan §13 Phase 3 exit gate: "Concurrent
 * payment attempts cannot overpay an invoice").
```

with:

```java
 * recordTransaction runs one Firestore transaction per invoice; settle runs ONE Firestore
 * transaction spanning the entire requested batch, so a single invalid/failing invoice aborts the
 * whole batch with zero partial commits (BUG-1 fix - "every invoice commits or none do"). Every
 * transaction re-reads current amountPaid before deciding - concurrent attempts on the same
 * invoice cannot push amountPaid past amountDue (plan §13 Phase 3 exit gate: "Concurrent payment
 * attempts cannot overpay an invoice").
```

This removes the `settleOne()` private method entirely (it is no longer called from anywhere).

- [ ] **Step 4: Run tests to verify the new test passes and the existing happy-path test still passes**

```bash
cd backend && ./mvnw verify -Pemulator-tests -Dit.test=PaymentEmulatorIT
```

Expected: **PASS** for all `PaymentEmulatorIT` tests, including the new one and the pre-existing `settle_marksSelectedInvoicesFullyPaidAndSkipsAlreadyPaid`.

- [ ] **Step 5: Commit**

```bash
git add backend/src/main/java/com/kaayo/service/PaymentService.java backend/src/test/java/com/kaayo/payment/PaymentEmulatorIT.java
git commit -m "fix(payments): make bulk-settle atomic across the whole batch (BUG-1)"
```

---

### Task 2: Extend Branch with address/schedule fields (shared with Phase 7.1)

**Files:**
- Modify: `backend/src/main/java/com/kaayo/request/CreateBranchRequest.java`
- Modify: `backend/src/main/java/com/kaayo/request/PatchBranchRequest.java`
- Modify: `backend/src/main/java/com/kaayo/response/BranchResponse.java`
- Modify: `backend/src/main/java/com/kaayo/service/BranchService.java:58-87,89-158`
- Test: `backend/src/test/java/com/kaayo/organization/BranchEmulatorIT.java`

- [ ] **Step 1: Write the failing tests**

Add to `BranchEmulatorIT.java` (after `create_succeedsAndIsReadable`):

```java
@Test
void create_persistsNewAddressAndScheduleFields() throws Exception {
    String orgId = newOrg("pro", "active");
    BranchResponse response = branchService.create(context("uid-1", orgId, Role.MASTER),
        new CreateBranchRequest("Selaiyur", true, "12 Main Road", "Near Bus Stop", "600073", "Chennai",
            "06:30 - 08:00 AM", "offline"));

    assertEquals("12 Main Road", response.addressLine1());
    assertEquals("offline", response.classMode());

    DocumentSnapshot doc = firestore.collection("organizations").document(orgId)
        .collection("branches").document(response.id()).get().get();
    assertEquals("600073", doc.getString("pincode"));
    assertEquals("06:30 - 08:00 AM", doc.getString("batchTimings"));
}

@Test
void update_patchesAddressFieldsWithoutTouchingUnspecifiedOnes() throws Exception {
    String orgId = newOrg("pro", "active");
    BranchResponse branch = branchService.create(context("uid-1", orgId, Role.MASTER),
        new CreateBranchRequest("Selaiyur", true, "12 Main Road", null, "600073", "Chennai", null, "offline"));

    BranchResponse updated = branchService.update(context("uid-1", orgId, Role.MASTER), branch.id(),
        new PatchBranchRequest(null, null, null, null, null, null, "06:30 - 08:00 AM", "hybrid"));

    assertEquals("12 Main Road", updated.addressLine1(), "Unspecified fields must be preserved, not cleared");
    assertEquals("hybrid", updated.classMode());
    assertEquals("06:30 - 08:00 AM", updated.batchTimings());
}
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd backend && ./mvnw verify -Pemulator-tests -Dit.test=BranchEmulatorIT
```

Expected: **compile error** — `CreateBranchRequest`/`PatchBranchRequest` don't have an 8-arg constructor yet, and `BranchResponse` has no `addressLine1()`/`classMode()` accessors.

- [ ] **Step 3: Extend the DTOs (with backward-compatible convenience constructors)**

`backend/src/main/java/com/kaayo/request/CreateBranchRequest.java`:

```java
package com.kaayo.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record CreateBranchRequest(
    @NotBlank(message = "Branch name is required.") String name,
    boolean active,
    String addressLine1,
    String addressLine2,
    String pincode,
    String city,
    String batchTimings,
    @Pattern(regexp = "online|offline|hybrid", message = "Class mode must be online, offline or hybrid.") String classMode
) {
    public CreateBranchRequest(String name, boolean active) {
        this(name, active, null, null, null, null, null, null);
    }
}
```

`backend/src/main/java/com/kaayo/request/PatchBranchRequest.java`:

```java
package com.kaayo.request;

import jakarta.validation.constraints.Pattern;

/** All fields are optional patches - null means "leave unchanged" (plan §9). */
public record PatchBranchRequest(
    String name,
    Boolean active,
    String addressLine1,
    String addressLine2,
    String pincode,
    String city,
    String batchTimings,
    @Pattern(regexp = "online|offline|hybrid", message = "Class mode must be online, offline or hybrid.") String classMode
) {
    public PatchBranchRequest(String name, Boolean active) {
        this(name, active, null, null, null, null, null, null);
    }
}
```

`backend/src/main/java/com/kaayo/response/BranchResponse.java`:

```java
package com.kaayo.response;

public record BranchResponse(
    String id,
    String name,
    boolean active,
    String addressLine1,
    String addressLine2,
    String pincode,
    String city,
    String batchTimings,
    String classMode
) {}
```

The convenience constructors mean every existing call site in `BranchEmulatorIT.java` (e.g. `new CreateBranchRequest("Main Branch", true)`, `new PatchBranchRequest("New Name", null)`) keeps compiling unchanged.

- [ ] **Step 4: Update `BranchService.create()`**

In `BranchService.java`, replace the body of `create()` (lines 58-87) with:

```java
    public BranchResponse create(RequestAuthContext ctx, CreateBranchRequest request) {
        RequestAuthContext.ActiveMembership membership = ctx.requireActiveMembership();
        String orgId = membership.orgId();
        String name = request.name().trim();
        planLimitService.enforceBranchLimit(orgId);

        try {
            return firestore.runTransaction(transaction -> {
                List<QueryDocumentSnapshot> existing = transaction.get(branchesCol(orgId)).get().getDocuments();
                ensureNameAvailable(existing, name, null);

                DocumentReference ref = branchesCol(orgId).document();
                Map<String, Object> doc = new HashMap<>();
                doc.put("name", name);
                doc.put("active", request.active());
                doc.put("addressLine1", request.addressLine1());
                doc.put("addressLine2", request.addressLine2());
                doc.put("pincode", request.pincode());
                doc.put("city", request.city());
                doc.put("batchTimings", request.batchTimings());
                doc.put("classMode", request.classMode());
                doc.put("createdAt", FieldValue.serverTimestamp());
                doc.put("updatedAt", FieldValue.serverTimestamp());
                doc.put("updatedBy", membership.role().name().toLowerCase(Locale.ROOT));
                transaction.set(ref, doc);

                recordAudit(transaction, orgId, ctx, membership.role(), "branch.created", ref.getId(), Map.of("name", name));
                return new BranchResponse(ref.getId(), name, request.active(), request.addressLine1(),
                    request.addressLine2(), request.pincode(), request.city(), request.batchTimings(), request.classMode());
            }).get();
        } catch (ExecutionException e) {
            throw unwrapTransactionFailure(e, "Branch creation failed for org " + orgId);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new FirestoreAccessException("Branch creation interrupted for org " + orgId, e);
        }
    }
```

- [ ] **Step 5: Update `BranchService.update()`**

Replace the body of `update()` (lines 89-158) with:

```java
    public BranchResponse update(RequestAuthContext ctx, String branchId, PatchBranchRequest request) {
        RequestAuthContext.ActiveMembership membership = ctx.requireActiveMembership();
        String orgId = membership.orgId();

        try {
            return firestore.runTransaction(transaction -> {
                DocumentReference branchRef = branchesCol(orgId).document(branchId);
                DocumentSnapshot branchSnap = transaction.get(branchRef).get();
                if (!branchSnap.exists()) {
                    throw new NotFoundException("BRANCH_NOT_FOUND", "Branch not found.");
                }
                String currentName = branchSnap.getString("name");
                boolean currentActive = Boolean.TRUE.equals(branchSnap.getBoolean("active"));
                boolean newActive = request.active() != null ? request.active() : currentActive;
                boolean renaming = request.name() != null && !request.name().trim().equals(currentName);
                String newName = renaming ? request.name().trim() : currentName;

                String newAddressLine1 = request.addressLine1() != null ? request.addressLine1() : branchSnap.getString("addressLine1");
                String newAddressLine2 = request.addressLine2() != null ? request.addressLine2() : branchSnap.getString("addressLine2");
                String newPincode = request.pincode() != null ? request.pincode() : branchSnap.getString("pincode");
                String newCity = request.city() != null ? request.city() : branchSnap.getString("city");
                String newBatchTimings = request.batchTimings() != null ? request.batchTimings() : branchSnap.getString("batchTimings");
                String newClassMode = request.classMode() != null ? request.classMode() : branchSnap.getString("classMode");

                Map<String, Object> branchPatch = new HashMap<>();
                branchPatch.put("updatedAt", FieldValue.serverTimestamp());
                branchPatch.put("updatedBy", membership.role().name().toLowerCase(Locale.ROOT));
                if (request.active() != null) {
                    branchPatch.put("active", newActive);
                }
                if (request.addressLine1() != null) branchPatch.put("addressLine1", newAddressLine1);
                if (request.addressLine2() != null) branchPatch.put("addressLine2", newAddressLine2);
                if (request.pincode() != null) branchPatch.put("pincode", newPincode);
                if (request.city() != null) branchPatch.put("city", newCity);
                if (request.batchTimings() != null) branchPatch.put("batchTimings", newBatchTimings);
                if (request.classMode() != null) branchPatch.put("classMode", newClassMode);

                if (renaming) {
                    List<QueryDocumentSnapshot> existing = transaction.get(branchesCol(orgId)).get().getDocuments();
                    ensureNameAvailable(existing, newName, branchId);

                    List<QueryDocumentSnapshot> enrollments =
                        transaction.get(enrollmentsCol(orgId).whereEqualTo("branchId", branchId)).get().getDocuments();
                    List<QueryDocumentSnapshot> sessions =
                        transaction.get(sessionsCol(orgId).whereEqualTo("branchId", branchId)).get().getDocuments();
                    List<QueryDocumentSnapshot> payments =
                        transaction.get(paymentsCol(orgId).whereEqualTo("branchId", branchId)).get().getDocuments();

                    int dependentCount = enrollments.size() + sessions.size() + payments.size();
                    if (dependentCount > MAX_CASCADE_DEPENDENTS) {
                        throw new ConflictException("RENAME_TOO_LARGE",
                            "This branch has too many linked records to rename automatically. Contact support.");
                    }

                    branchPatch.put("name", newName);
                    transaction.update(branchRef, branchPatch);
                    for (QueryDocumentSnapshot d : enrollments) {
                        transaction.update(d.getReference(), "branchName", newName);
                    }
                    for (QueryDocumentSnapshot d : sessions) {
                        transaction.update(d.getReference(), "branchName", newName);
                    }
                    for (QueryDocumentSnapshot d : payments) {
                        transaction.update(d.getReference(), "branchName", newName);
                    }

                    recordAudit(transaction, orgId, ctx, membership.role(), "branch.renamed", branchId,
                        Map.of("oldName", currentName, "newName", newName, "cascadeCount", dependentCount));
                } else {
                    transaction.update(branchRef, branchPatch);
                    recordAudit(transaction, orgId, ctx, membership.role(), "branch.updated", branchId,
                        Map.of("active", newActive));
                }

                return new BranchResponse(branchId, newName, newActive, newAddressLine1, newAddressLine2,
                    newPincode, newCity, newBatchTimings, newClassMode);
            }).get();
        } catch (ExecutionException e) {
            throw unwrapTransactionFailure(e, "Branch update failed for " + branchId);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new FirestoreAccessException("Branch update interrupted for " + branchId, e);
        }
    }
```

- [ ] **Step 6: Run tests to verify they pass**

```bash
cd backend && ./mvnw verify -Pemulator-tests -Dit.test=BranchEmulatorIT
```

Expected: **PASS** for all `BranchEmulatorIT` tests (new and pre-existing).

- [ ] **Step 7: Commit**

```bash
git add backend/src/main/java/com/kaayo/request/CreateBranchRequest.java backend/src/main/java/com/kaayo/request/PatchBranchRequest.java backend/src/main/java/com/kaayo/response/BranchResponse.java backend/src/main/java/com/kaayo/service/BranchService.java backend/src/test/java/com/kaayo/organization/BranchEmulatorIT.java
git commit -m "feat(branches): add address and batch-schedule fields (shared with Phase 7.1)"
```

---

### Task 3: Add import duplicate-resolution (skip/update/create)

**Files:**
- Modify: `backend/src/main/java/com/kaayo/request/ValidateImportRequest.java`
- Modify: `backend/src/main/java/com/kaayo/service/ImportRowOutcome.java`
- Modify: `backend/src/main/java/com/kaayo/service/ImportJobService.java`
- Modify: `backend/src/main/java/com/kaayo/service/ImportJobProcessor.java`
- Modify: `backend/src/main/java/com/kaayo/response/ImportJobResponse.java`
- Test: `backend/src/test/java/com/kaayo/importjob/ImportJobEmulatorIT.java`

**Design:** a row whose name matches an existing student is "duplicate." `resolution: "skip"` (default) preserves today's behavior exactly (no-op). `resolution: "create"` creates a brand-new student anyway, bypassing the dedupe. `resolution: "update"` adds a new enrollment onto the **matched existing student** instead of creating a second student record — this only applies when the duplicate matched a pre-existing student (not a second occurrence of the same name within the same uploaded batch, which has no existing record to attach to yet; that case falls back to skip and is documented as a known v1 limitation).

- [ ] **Step 1: Write the failing tests**

Add to `ImportJobEmulatorIT.java` (after `createJob_rejectsImportLargerThanRowLimit`):

```java
@Test
void createJob_resolutionSkip_leavesDuplicateUntouchedAsBefore() throws Exception {
    String orgId = newOrgWithBranchAndClassType();
    studentService.create(context("uid-1", orgId, Role.MASTER), new CreateStudentRequest(
        "Arjun", "Sharma", null, null, null, null, null, null, null, null, null,
        "2026-06-01", true, null, List.of(new NewEnrollmentRequest("branch-1", "ct-1", 1000, "2026-06", "full", null, null))));

    ValidateImportRequest request = new ValidateImportRequest(List.of(validRow("Arjun Sharma")), "skip");
    ImportJobResponse created = importJobService.createJob(context("uid-1", orgId, Role.MASTER), request, null);
    ImportJobResponse finalState = importJobService.getJob(context("uid-1", orgId, Role.MASTER), created.id());

    assertEquals("completed", finalState.status());
    assertEquals(0, finalState.createdCount());
    assertEquals(0, finalState.updatedCount());
    assertEquals(1, finalState.skippedCount());
}

@Test
void createJob_resolutionCreate_createsNewStudentDespiteNameMatch() throws Exception {
    String orgId = newOrgWithBranchAndClassType();
    studentService.create(context("uid-1", orgId, Role.MASTER), new CreateStudentRequest(
        "Arjun", "Sharma", null, null, null, null, null, null, null, null, null,
        "2026-06-01", true, null, List.of(new NewEnrollmentRequest("branch-1", "ct-1", 1000, "2026-06", "full", null, null))));

    ValidateImportRequest request = new ValidateImportRequest(List.of(validRow("Arjun Sharma")), "create");
    ImportJobResponse created = importJobService.createJob(context("uid-1", orgId, Role.MASTER), request, null);
    ImportJobResponse finalState = importJobService.getJob(context("uid-1", orgId, Role.MASTER), created.id());

    assertEquals("completed", finalState.status());
    assertEquals(1, finalState.createdCount());
    assertEquals(0, finalState.skippedCount());

    long studentCount = firestore.collection("organizations").document(orgId)
        .collection("students").get().get().size();
    assertEquals(2, studentCount, "Both the pre-existing and the newly created duplicate-named student should exist");
}

@Test
void createJob_resolutionUpdate_addsEnrollmentToExistingMatchedStudent() throws Exception {
    String orgId = newOrgWithBranchAndClassType();
    studentService.create(context("uid-1", orgId, Role.MASTER), new CreateStudentRequest(
        "Arjun", "Sharma", null, null, null, null, null, null, null, null, null,
        "2026-06-01", true, null, List.of(new NewEnrollmentRequest("branch-1", "ct-1", 1000, "2026-06", "full", null, null))));
    String existingStudentId = firestore.collection("organizations").document(orgId)
        .collection("students").get().get().getDocuments().get(0).getId();

    ValidateImportRequest request = new ValidateImportRequest(List.of(validRow("Arjun Sharma")), "update");
    ImportJobResponse created = importJobService.createJob(context("uid-1", orgId, Role.MASTER), request, null);
    ImportJobResponse finalState = importJobService.getJob(context("uid-1", orgId, Role.MASTER), created.id());

    assertEquals("completed", finalState.status());
    assertEquals(0, finalState.createdCount());
    assertEquals(1, finalState.updatedCount());
    assertEquals(0, finalState.skippedCount());

    long enrollmentCount = firestore.collection("organizations").document(orgId)
        .collection("enrollments").whereEqualTo("studentId", existingStudentId).get().get().size();
    assertEquals(2, enrollmentCount, "The existing student should now have 2 enrollments: original + imported");
}
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd backend && ./mvnw verify -Pemulator-tests -Dit.test=ImportJobEmulatorIT
```

Expected: **compile error** — `ValidateImportRequest` has no 2-arg constructor yet, and `ImportJobResponse` has no `updatedCount()` accessor.

- [ ] **Step 3: Update `ValidateImportRequest`**

```java
package com.kaayo.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import java.util.List;

public record ValidateImportRequest(
    @NotEmpty(message = "At least one row is required.") @Valid List<ImportRowRequest> rows,
    @Pattern(regexp = "skip|update|create", message = "Resolution must be skip, update or create.") String resolution
) {
    public ValidateImportRequest(List<ImportRowRequest> rows) {
        this(rows, "skip");
    }
}
```

(The convenience constructor keeps every existing single-arg call site in `ImportJobEmulatorIT.java` compiling unchanged.)

- [ ] **Step 4: Update `ImportRowOutcome`**

```java
package com.kaayo.service;

import com.kaayo.request.CreateStudentRequest;
import java.util.List;

/**
 * status is one of "valid" | "duplicate" | "error". request is non-null whenever per-field
 * validation passed (i.e. for "valid" AND "duplicate" rows) so a duplicate row can still be
 * submitted under the "create" or "update" resolution strategy without re-deriving it.
 * matchedStudentId is non-null only for "duplicate" rows matched against a pre-existing student
 * record (not a second occurrence of the same name within the same import batch) - that is the
 * only case "update" resolution can act on.
 */
record ImportRowOutcome(int rowIndex, String name, String status, List<String> errors,
        CreateStudentRequest request, String matchedStudentId) {}
```

- [ ] **Step 5: Update `ImportJobService`**

In `ImportJobService.java`:

Replace the `ReferenceData` record and `loadReferenceData()` (lines 196-229):

```java
    private record ReferenceData(Map<String, String> branchIdByName, Map<String, String> classTypeIdByName,
            Map<String, String> existingStudentIdByNameLower) {}

    private ReferenceData loadReferenceData(String orgId) {
        try {
            Map<String, String> branches = new HashMap<>();
            for (QueryDocumentSnapshot d : importJobDao.branchesCol(orgId).get().get().getDocuments()) {
                String name = d.getString("name");
                if (name != null) {
                    branches.put(name.trim().toLowerCase(Locale.ROOT), d.getId());
                }
            }
            Map<String, String> classTypes = new HashMap<>();
            for (QueryDocumentSnapshot d : importJobDao.classTypesCol(orgId).get().get().getDocuments()) {
                String name = d.getString("name");
                if (name != null) {
                    classTypes.put(name.trim().toLowerCase(Locale.ROOT), d.getId());
                }
            }
            Map<String, String> existingStudents = new HashMap<>();
            for (QueryDocumentSnapshot d : studentsCol(orgId).get().get().getDocuments()) {
                String name = d.getString("name");
                if (name != null) {
                    existingStudents.put(name.trim().toLowerCase(Locale.ROOT), d.getId());
                }
            }
            return new ReferenceData(branches, classTypes, existingStudents);
        } catch (ExecutionException e) {
            throw new FirestoreAccessException("Failed to load reference data for org " + orgId, e.getCause());
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new FirestoreAccessException("Interrupted while loading reference data for org " + orgId, e);
        }
    }
```

Replace `evaluateRow()` (lines 231-288) so the request is built before the duplicate check and the matched ID is tracked:

```java
    private ImportRowOutcome evaluateRow(int rowIndex, ImportRowRequest row, ReferenceData ref, Set<String> seenNames) {
        List<String> errors = new ArrayList<>();
        String name = row.name() != null ? row.name().trim() : "";
        if (name.isEmpty()) {
            errors.add("Name is required.");
        }
        String fatherPhone = row.fatherPhone() != null ? row.fatherPhone().trim() : "";
        if (fatherPhone.isEmpty()) {
            errors.add("Parent phone is required.");
        }
        String joiningDate = row.joiningDate() != null ? row.joiningDate().trim() : "";
        if (!joiningDate.matches("\\d{4}-\\d{2}-\\d{2}")) {
            errors.add("Joining date must be in YYYY-MM-DD format.");
        }
        String branchName = row.branchName() != null ? row.branchName().trim() : "";
        String branchId = branchName.isEmpty() ? null : ref.branchIdByName().get(branchName.toLowerCase(Locale.ROOT));
        if (branchName.isEmpty()) {
            errors.add("Branch is required.");
        } else if (branchId == null) {
            errors.add("Branch not found: " + branchName);
        }
        String classTypeName = row.classTypeName() != null ? row.classTypeName().trim() : "";
        String classTypeId = classTypeName.isEmpty() ? null
            : ref.classTypeIdByName().get(classTypeName.toLowerCase(Locale.ROOT));
        if (classTypeName.isEmpty()) {
            errors.add("Class type is required.");
        } else if (classTypeId == null) {
            errors.add("Class type not found: " + classTypeName);
        }
        if (row.monthlyFee() < 0) {
            errors.add("Monthly fee cannot be negative.");
        }
        String firstMonth = row.firstMonth() != null ? row.firstMonth().trim() : "";
        if (!firstMonth.matches("\\d{4}-\\d{2}")) {
            errors.add("First month must be in YYYY-MM format.");
        }

        if (!errors.isEmpty()) {
            return new ImportRowOutcome(rowIndex, name, "error", errors, null, null);
        }

        String[] parts = splitName(name);
        String mode = normalizeMode(row.firstMonthMode());
        String fatherName = row.fatherName() != null && !row.fatherName().isBlank() ? row.fatherName().trim() : null;
        String notes = row.notes() != null ? row.notes().trim() : null;
        CreateStudentRequest builtRequest = new CreateStudentRequest(parts[0], parts[1], null, null, null, null,
            fatherName, fatherPhone, null, null, null, joiningDate, row.active(), notes,
            List.of(new NewEnrollmentRequest(branchId, classTypeId, row.monthlyFee(), firstMonth, mode, null, null)));

        String lowerName = name.toLowerCase(Locale.ROOT);
        String matchedStudentId = ref.existingStudentIdByNameLower().get(lowerName);
        if (matchedStudentId != null || seenNames.contains(lowerName)) {
            return new ImportRowOutcome(rowIndex, name, "duplicate", List.of(), builtRequest, matchedStudentId);
        }
        seenNames.add(lowerName);
        return new ImportRowOutcome(rowIndex, name, "valid", List.of(), builtRequest, null);
    }
```

Replace the body of `createJob()` (lines 91-156) to thread `resolution` through and avoid double-counting rows that will actually be processed:

```java
    public ImportJobResponse createJob(RequestAuthContext ctx, ValidateImportRequest request, String idempotencyKey) {
        RequestAuthContext.ActiveMembership membership = ctx.requireActiveMembership();
        String orgId = membership.orgId();
        requireRowLimit(request.rows());
        String resolution = request.resolution() != null ? request.resolution() : "skip";

        if (idempotencyKey != null && !idempotencyKey.isBlank()) {
            ImportJobResponse existing = findByIdempotencyKey(orgId, idempotencyKey);
            if (existing != null) {
                return existing;
            }
        }

        ReferenceData ref = loadReferenceData(orgId);
        Set<String> seenNames = new HashSet<>();
        List<ImportRowOutcome> outcomes = new ArrayList<>();
        List<Map<String, Object>> initialRowErrors = new ArrayList<>();
        List<ImportRowResult> initialResults = new ArrayList<>();
        int skipped = 0;
        int failed = 0;

        List<ImportRowRequest> rows = request.rows();
        for (int i = 0; i < rows.size(); i++) {
            ImportRowOutcome outcome = evaluateRow(i, rows.get(i), ref, seenNames);
            outcomes.add(outcome);
            boolean duplicateWillBeProcessed = "duplicate".equals(outcome.status())
                && ("create".equals(resolution) || ("update".equals(resolution) && outcome.matchedStudentId() != null));
            if ("error".equals(outcome.status())) {
                initialRowErrors.add(rowResultDoc(outcome));
                initialResults.add(new ImportRowResult(outcome.rowIndex(), outcome.name(), outcome.status(), outcome.errors()));
                failed++;
            } else if ("duplicate".equals(outcome.status()) && !duplicateWillBeProcessed) {
                initialRowErrors.add(rowResultDoc(outcome));
                initialResults.add(new ImportRowResult(outcome.rowIndex(), outcome.name(), outcome.status(), outcome.errors()));
                skipped++;
            }
        }

        try {
            DocumentReference jobRef = importJobsCol(orgId).document();
            Map<String, Object> doc = new HashMap<>();
            doc.put("status", "queued");
            doc.put("totalRows", rows.size());
            doc.put("processedRows", skipped + failed);
            doc.put("createdCount", 0);
            doc.put("updatedCount", 0);
            doc.put("skippedCount", skipped);
            doc.put("failedCount", failed);
            doc.put("rowErrors", initialRowErrors);
            doc.put("resolution", resolution);
            if (idempotencyKey != null && !idempotencyKey.isBlank()) {
                doc.put("idempotencyKey", idempotencyKey);
            }
            doc.put("createdByUid", ctx.getUid());
            doc.put("createdAt", FieldValue.serverTimestamp());
            doc.put("updatedAt", FieldValue.serverTimestamp());
            jobRef.set(doc).get();

            RequestAuthContext rowCtx = new RequestAuthContext(ctx.getUid(), ctx.getPhoneNumber(), ctx.getEmail(),
                ctx.getDisplayName(), orgId, membership.role(), MembershipStatus.ACTIVE);
            processor.process(orgId, jobRef.getId(), outcomes, rowCtx, resolution);

            return new ImportJobResponse(jobRef.getId(), "queued", rows.size(), skipped + failed, 0, 0, skipped, failed,
                initialResults);
        } catch (ExecutionException e) {
            throw new FirestoreAccessException("Import job creation failed for org " + orgId, e.getCause());
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new FirestoreAccessException("Import job creation interrupted for org " + orgId, e);
        }
    }
```

Update `toResponse()` (lines 319-333) to read `updatedCount`:

```java
    @SuppressWarnings("unchecked")
    static ImportJobResponse toResponse(DocumentSnapshot snap) {
        List<Map<String, Object>> stored = (List<Map<String, Object>>) snap.get("rowErrors");
        List<ImportRowResult> rowResults = new ArrayList<>();
        if (stored != null) {
            for (Map<String, Object> entry : stored) {
                rowResults.add(new ImportRowResult(
                    intOf(entry.get("rowIndex")), (String) entry.get("name"), (String) entry.get("status"),
                    List.of((String) entry.get("message"))));
            }
        }
        return new ImportJobResponse(snap.getId(), snap.getString("status"), intOf(snap.get("totalRows")),
            intOf(snap.get("processedRows")), intOf(snap.get("createdCount")), intOf(snap.get("updatedCount")),
            intOf(snap.get("skippedCount")), intOf(snap.get("failedCount")), rowResults);
    }
```

- [ ] **Step 6: Update `ImportJobResponse`**

```java
package com.kaayo.response;

import java.util.List;

/** status is one of "queued" | "processing" | "completed" (plan §13 Phase 5). There is no "failed" job status - a row that cannot be created is recorded in rowErrors and counted in failedCount, but never leaves the job itself unreported. */
public record ImportJobResponse(
    String id, String status, int totalRows, int processedRows,
    int createdCount, int updatedCount, int skippedCount, int failedCount, List<ImportRowResult> rowErrors
) {}
```

- [ ] **Step 7: Update `ImportJobProcessor`**

```java
package com.kaayo.service;

import com.kaayo.dao.ImportJobDao;
import com.kaayo.request.AddEnrollmentRequest;
import com.kaayo.request.NewEnrollmentRequest;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.FieldValue;
import com.google.cloud.firestore.Firestore;
import com.kaayo.security.RequestAuthContext;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

/**
 * Runs the valid (and, depending on {@code resolution}, duplicate) rows of an import job
 * sequentially on the bounded {@code importJobExecutor} (plan §13 Phase 5; see
 * com.kaayo.config.AsyncConfig). resolution "skip" (default) leaves duplicate rows untouched -
 * the original behavior. resolution "create" submits a duplicate row as a brand-new student.
 * resolution "update" adds a new enrollment onto the pre-existing matched student instead -
 * only possible when {@code matchedStudentId} is non-null; a same-batch duplicate with no
 * pre-existing match falls back to skip, since there is nothing yet to attach an enrollment to.
 */
@Service
public class ImportJobProcessor {

    private static final Logger log = LoggerFactory.getLogger(ImportJobProcessor.class);

    private final Firestore firestore;
    private final StudentService studentService;
    private final EnrollmentService enrollmentService;
    private final ImportJobDao importJobDao;
    public ImportJobProcessor(Firestore firestore, StudentService studentService,
            EnrollmentService enrollmentService, ImportJobDao importJobDao) {
        this.firestore = firestore;
        this.studentService = studentService;
        this.enrollmentService = enrollmentService;
        this.importJobDao = importJobDao;
    }

    @Async("importJobExecutor")
    public CompletableFuture<Void> process(
            String orgId, String jobId, List<ImportRowOutcome> outcomes, RequestAuthContext rowCtx, String resolution) {
        DocumentReference jobRef = importJobsCol(orgId).document(jobId);
        markStatus(jobRef, "processing");

        for (ImportRowOutcome outcome : outcomes) {
            if ("error".equals(outcome.status())) {
                continue;
            }
            if ("duplicate".equals(outcome.status())) {
                if ("create".equals(resolution)) {
                    createRow(jobRef, orgId, jobId, outcome, rowCtx);
                } else if ("update".equals(resolution) && outcome.matchedStudentId() != null) {
                    updateRow(jobRef, orgId, jobId, outcome, rowCtx);
                }
                continue;
            }
            createRow(jobRef, orgId, jobId, outcome, rowCtx);
        }

        markStatus(jobRef, "completed");
        return CompletableFuture.completedFuture(null);
    }

    private void createRow(DocumentReference jobRef, String orgId, String jobId, ImportRowOutcome outcome, RequestAuthContext rowCtx) {
        Map<String, Object> update = new HashMap<>();
        update.put("updatedAt", FieldValue.serverTimestamp());
        try {
            studentService.create(rowCtx, outcome.request());
            update.put("processedRows", FieldValue.increment(1));
            update.put("createdCount", FieldValue.increment(1));
        } catch (RuntimeException e) {
            log.warn("Import row {} failed to create student for org {}: {}", outcome.rowIndex(), orgId, e.getMessage());
            update.put("processedRows", FieldValue.increment(1));
            update.put("failedCount", FieldValue.increment(1));
            update.put("rowErrors", FieldValue.arrayUnion(failureDoc(outcome, e)));
        }
        applyUpdate(jobRef, update, orgId, jobId);
    }

    private void updateRow(DocumentReference jobRef, String orgId, String jobId, ImportRowOutcome outcome, RequestAuthContext rowCtx) {
        Map<String, Object> update = new HashMap<>();
        update.put("updatedAt", FieldValue.serverTimestamp());
        try {
            NewEnrollmentRequest enr = outcome.request().enrollments().get(0);
            enrollmentService.addEnrollment(rowCtx, outcome.matchedStudentId(), new AddEnrollmentRequest(
                enr.branchId(), enr.classTypeId(), enr.monthlyFee(), enr.firstMonth(), enr.firstMonthMode(), null, null, null));
            update.put("processedRows", FieldValue.increment(1));
            update.put("updatedCount", FieldValue.increment(1));
        } catch (RuntimeException e) {
            log.warn("Import row {} failed to add enrollment to existing student {} for org {}: {}",
                outcome.rowIndex(), outcome.matchedStudentId(), orgId, e.getMessage());
            update.put("processedRows", FieldValue.increment(1));
            update.put("failedCount", FieldValue.increment(1));
            update.put("rowErrors", FieldValue.arrayUnion(failureDoc(outcome, e)));
        }
        applyUpdate(jobRef, update, orgId, jobId);
    }

    private static Map<String, Object> failureDoc(ImportRowOutcome outcome, RuntimeException e) {
        Map<String, Object> doc = new HashMap<>();
        doc.put("rowIndex", outcome.rowIndex());
        doc.put("name", outcome.name());
        doc.put("status", "error");
        doc.put("message", e.getMessage() != null ? e.getMessage() : "Student creation failed.");
        return doc;
    }

    private void markStatus(DocumentReference jobRef, String status) {
        try {
            jobRef.update("status", status, "updatedAt", FieldValue.serverTimestamp()).get();
        } catch (Exception e) {
            log.error("Failed to mark import job {} as {}", jobRef.getId(), status, e);
        }
    }

    private void applyUpdate(DocumentReference jobRef, Map<String, Object> update, String orgId, String jobId) {
        try {
            jobRef.update(update).get();
        } catch (Exception e) {
            log.error("Failed to persist progress for import job {} in org {}", jobId, orgId, e);
        }
    }

    private CollectionReference importJobsCol(String orgId) {
        return importJobDao.importJobsCol(orgId);
    }
}
```

- [ ] **Step 8: Update the `ImportJobEmulatorIT` test setup to inject `EnrollmentService`**

In `ImportJobEmulatorIT.java`, replace the `@BeforeAll setUp()` body's processor construction:

```java
        AuditDao AuditDao = new AuditDao(firestore);
        SubscriptionService subscriptionService = new SubscriptionService(firestore, AuditDao, 30L);
        PlanLimitService planLimitService = new PlanLimitService(firestore, subscriptionService, new PlanLimitDao(firestore));
        studentService = new StudentService(firestore, AuditDao, planLimitService);
        EnrollmentService enrollmentService = new EnrollmentService(firestore, AuditDao, new EnrollmentDao(firestore));
        ImportJobProcessor processor = new ImportJobProcessor(firestore, studentService, enrollmentService, new ImportJobDao(firestore));
        importJobService = new ImportJobService(firestore, processor, new ImportJobDao(firestore));
```

Add the import: `import com.kaayo.service.EnrollmentService;` (already imports `com.kaayo.dao.*`, which covers `EnrollmentDao`).

- [ ] **Step 9: Run tests to verify they pass**

```bash
cd backend && ./mvnw verify -Pemulator-tests -Dit.test=ImportJobEmulatorIT
```

Expected: **PASS** for all `ImportJobEmulatorIT` tests, including the 3 new ones and every pre-existing test (they all use the single-arg `ValidateImportRequest` convenience constructor, defaulting to `resolution: "skip"`, which preserves old behavior exactly).

- [ ] **Step 10: Commit**

```bash
git add backend/src/main/java/com/kaayo/request/ValidateImportRequest.java backend/src/main/java/com/kaayo/service/ImportRowOutcome.java backend/src/main/java/com/kaayo/service/ImportJobService.java backend/src/main/java/com/kaayo/service/ImportJobProcessor.java backend/src/main/java/com/kaayo/response/ImportJobResponse.java backend/src/test/java/com/kaayo/importjob/ImportJobEmulatorIT.java
git commit -m "feat(imports): support skip/update/create duplicate-resolution strategies"
```

---

## Frontend Tasks

All frontend steps are verified with `cd frontend && npx tsc --noEmit` (must report zero new errors) plus a manual run-through via `cd frontend && npx expo start` (note: requires Tasks 1-3's backend changes deployed/running locally for any screen that calls the affected endpoints).

### Task 4: Class-type taxonomy constant + Org/Branch type extensions

**Files:**
- Create: `frontend/lib/centerTypeClassTaxonomy.ts`
- Modify: `frontend/lib/types.ts:30-38` (Org), `:62-68` (Branch)

- [ ] **Step 1: Create the taxonomy constant**

```typescript
// frontend/lib/centerTypeClassTaxonomy.ts
import type { CenterType } from './types';

/** Locked Phase-1 decision: suggested class types per Center Type, capped at 5 selections
 * total (matches PlanLimitService's existing 5-class-type plan limit). Every center type also
 * always shows a free-text "Other" chip regardless of its suggested list below. */
export const CENTER_TYPE_CLASS_TYPES: Record<CenterType, string[]> = {
  'martial-arts': ['Karate', 'Silambam', 'Taekwondo', 'Judo', 'Kalaripayattu'],
  music: ['Guitar', 'Keyboard/Piano', 'Veena', 'Flute', 'Vocals'],
  dance: ['Bharatanatyam', 'Western', 'Zumba', 'Bollywood', 'Folk'],
  tuition: ['Maths', 'Science', 'English', 'Spoken English', 'Abacus'],
  sports: ['Cricket', 'Badminton', 'Football', 'Swimming', 'Yoga'],
  other: [],
};

export const MAX_ONBOARDING_CLASS_TYPES = 5;
export const OTHER_CHIP_VALUE = '__other__';
```

- [ ] **Step 2: Extend `Org` and `Branch` types**

In `frontend/lib/types.ts`, replace the `Org` interface (lines 30-38):

```typescript
export interface Org {
  id: string;
  name: string;
  centerType: CenterType | null;
  ownerUid: string;
  setupComplete: boolean;
  subscription: OrgSubscription;
  createdAt: unknown;
  logoUrl?: string;
  firstRunPromptShown?: boolean;
}
```

Replace the `Branch` interface (lines 62-68):

```typescript
export interface Branch {
  id: string;
  name: string;
  active: boolean;
  addressLine1?: string;
  addressLine2?: string;
  pincode?: string;
  city?: string;
  batchTimings?: string;
  classMode?: 'online' | 'offline' | 'hybrid';
  updatedAt?: unknown;
  updatedBy?: WriteActor;
}
```

- [ ] **Step 3: Verify**

```bash
cd frontend && npx tsc --noEmit
```

Expected: zero new errors (existing code that constructs `Branch`/`Org` objects only sets the pre-existing required fields, and all new fields are optional).

- [ ] **Step 4: Commit**

```bash
git add frontend/lib/centerTypeClassTaxonomy.ts frontend/lib/types.ts
git commit -m "feat(onboarding): add class-type taxonomy constant and Org/Branch field extensions"
```

---

### Task 5: ChipMultiSelect design-system molecule

**Files:**
- Create: `frontend/design-system/components/molecules/ChipMultiSelect.tsx`

No existing chip-multi-select atom was found (`Select.tsx` is a modal-based dropdown; `Badge.tsx` is display-only; `TabFilter.tsx` is single-select). This builds the new molecule that Task 6's class-type collection and any future chip-style multi-select (Phase 4.5 status filters, etc.) can reuse.

- [ ] **Step 1: Write the component**

```typescript
// frontend/design-system/components/molecules/ChipMultiSelect.tsx
import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { X } from 'lucide-react-native';

import { Input } from '../atoms/Input';
import { theme } from '../../foundations/theme';
import { typography } from '../../foundations/typography';
import { kayoSpace, kayoRadius, kayoBorder } from '../../foundations/tokens';

export interface ChipMultiSelectProps {
  /** Suggested chip labels shown alongside the always-present "Other" chip. */
  suggestions: string[];
  /** Currently selected chip labels (suggestions and/or custom "Other" entries). */
  value: string[];
  onChange: (next: string[]) => void;
  maxSelections: number;
  otherPlaceholder?: string;
  testID?: string;
}

export function ChipMultiSelect({
  suggestions,
  value,
  onChange,
  maxSelections,
  otherPlaceholder = 'Type a custom name',
  testID,
}: ChipMultiSelectProps) {
  const [otherText, setOtherText] = useState('');
  const [otherOpen, setOtherOpen] = useState(false);
  const atCap = value.length >= maxSelections;

  function toggleSuggestion(label: string) {
    if (value.includes(label)) {
      onChange(value.filter((v) => v !== label));
      return;
    }
    if (atCap) return;
    onChange([...value, label]);
  }

  function removeChip(label: string) {
    onChange(value.filter((v) => v !== label));
  }

  function commitOther() {
    const trimmed = otherText.trim();
    if (trimmed && !value.includes(trimmed) && value.length < maxSelections) {
      onChange([...value, trimmed]);
    }
    setOtherText('');
    setOtherOpen(false);
  }

  const customChips = value.filter((v) => !suggestions.includes(v));

  return (
    <View testID={testID} style={styles.container}>
      <View style={styles.row}>
        {suggestions.map((label) => {
          const selected = value.includes(label);
          return (
            <Pressable
              key={label}
              onPress={() => toggleSuggestion(label)}
              disabled={!selected && atCap}
              style={[
                styles.chip,
                selected && styles.chipSelected,
                !selected && atCap && styles.chipDisabled,
              ]}
              testID={testID ? `${testID}-chip-${label}` : undefined}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: selected }}
            >
              <Text style={[typography.label_sm, { color: selected ? theme.text.onPrimary : theme.text.primary }]}>
                {label}
              </Text>
            </Pressable>
          );
        })}
        {customChips.map((label) => (
          <Pressable
            key={label}
            onPress={() => removeChip(label)}
            style={[styles.chip, styles.chipSelected]}
            testID={testID ? `${testID}-custom-${label}` : undefined}
          >
            <Text style={[typography.label_sm, { color: theme.text.onPrimary }]}>{label}</Text>
            <X size={12} color={theme.text.onPrimary} strokeWidth={2.5} />
          </Pressable>
        ))}
        <Pressable
          onPress={() => !atCap && setOtherOpen((o) => !o)}
          disabled={atCap}
          style={[styles.chip, otherOpen && styles.chipSelected, atCap && styles.chipDisabled]}
          testID={testID ? `${testID}-chip-other` : undefined}
        >
          <Text style={[typography.label_sm, { color: otherOpen ? theme.text.onPrimary : theme.text.primary }]}>
            + Other
          </Text>
        </Pressable>
      </View>

      {otherOpen && (
        <Input
          value={otherText}
          onChangeText={setOtherText}
          placeholder={otherPlaceholder}
          onSubmitEditing={commitOther}
          onBlur={commitOther}
          autoFocus
          testID={testID ? `${testID}-other-input` : undefined}
        />
      )}

      <Text style={[typography.body_sm, { color: theme.text.tertiary }]}>
        {value.length} / {maxSelections} selected
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: kayoSpace[2] },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: kayoSpace[2] },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: kayoSpace[1],
    paddingHorizontal: kayoSpace[3],
    paddingVertical: kayoSpace[2],
    borderRadius: kayoRadius.pill,
    borderWidth: kayoBorder.width,
    borderColor: theme.border.strong,
    backgroundColor: theme.surface.card,
  },
  chipSelected: {
    backgroundColor: theme.brand.primary,
    borderColor: theme.brand.primaryDeep,
  },
  chipDisabled: { opacity: 0.4 },
});
```

- [ ] **Step 2: Verify**

```bash
cd frontend && npx tsc --noEmit
```

Expected: zero new errors. (No automated test — this molecule's behavior is verified inline in Task 6 via manual run-through, since no chip-multi-select precedent or test infra exists to extend.)

- [ ] **Step 3: Commit**

```bash
git add "frontend/design-system/components/molecules/ChipMultiSelect.tsx"
git commit -m "feat(design-system): add ChipMultiSelect molecule for class-type collection"
```

---

### Task 6: CenterScreen — logo upload + class-type collection (Phase 2.1)

**Files:**
- Modify: `frontend/features/onboarding/screens/CenterScreen.tsx` (full rewrite of the body, same imports/structure pattern)
- Modify: `frontend/features/subscriptions/api/subscription.ts` (add `uploadOrgLogo`)

**Depends on:** Task 4 (taxonomy constant, `Org.logoUrl`), Task 5 (ChipMultiSelect).

- [ ] **Step 1: Add the logo-upload API helper**

In `frontend/features/subscriptions/api/subscription.ts`, add (following the exact `uploadStudentPhoto` pattern from `frontend/features/students/hooks/useStudents.ts:92-102`, but writing directly to the org doc since there is no backend org endpoint):

```typescript
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getKayoStorage } from '../../../lib/firebase';

export async function uploadOrgLogo(orgId: string, localUri: string): Promise<string> {
  const storage = getKayoStorage();
  const logoRef = storageRef(storage, `organizations/${orgId}/logo.jpg`);
  const response = await fetch(localUri);
  if (!response.ok) throw new Error(`Failed to read logo: ${response.status}`);
  const blob = await response.blob();
  await uploadBytes(logoRef, blob, { contentType: 'image/jpeg' });
  const logoUrl = await getDownloadURL(logoRef);
  const db = getKayoDb();
  await updateDoc(doc(db, 'organizations', orgId), { logoUrl, updatedAt: serverTimestamp() });
  return logoUrl;
}
```

(Add `getKayoStorage` to the existing `getKayoDb` import from `../../../lib/firebase` if not already imported in this file; `doc`/`updateDoc`/`serverTimestamp` are already imported there per the existing `completeOrgSetup`/`saveOrgName` functions.)

- [ ] **Step 2: Rewrite `CenterScreen.tsx`**

Replace the full file with:

```typescript
/**
 * Setup Step 2/4 — Center Info.
 * Collects center/brand name, center type (6-card grid), an optional logo, and 1-5 class types
 * suggested from the chosen center type (Phase 1 item 2, locked taxonomy).
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert, Image } from 'react-native';
import { router } from 'expo-router';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import {
  ShieldCheck,
  BookOpen,
  Heart,
  Trophy,
  Music,
  MoreHorizontal,
  Camera,
} from 'lucide-react-native';

import { SetupShell } from '../../../design-system/components/templates/SetupShell';
import { Input } from '../../../design-system/components/atoms/Input';
import { Button } from '../../../design-system/components/atoms/Button';
import { Card } from '../../../design-system/components/atoms/Card';
import { ChipMultiSelect } from '../../../design-system/components/molecules/ChipMultiSelect';
import { theme } from '../../../design-system/foundations/theme';
import { typography } from '../../../design-system/foundations/typography';
import { kayoSpace, kayoRadius, kayoBorder, kayoShadow } from '../../../design-system/foundations/tokens';
import { useAuthStore } from '../../../stores/authStore';
import { getKayoDb } from '../../../lib/firebase';
import { createClassType } from '../../settings/api/class-types-api';
import { uploadOrgLogo } from '../../subscriptions/api/subscription';
import { CENTER_TYPE_CLASS_TYPES, MAX_ONBOARDING_CLASS_TYPES } from '../../../lib/centerTypeClassTaxonomy';
import type { CenterType } from '../../../lib/types';

interface CenterOption {
  type: CenterType;
  label: string;
  Icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
}

const CENTER_OPTIONS: CenterOption[] = [
  { type: 'martial-arts', label: 'Martial Arts', Icon: ShieldCheck },
  { type: 'tuition',      label: 'Tuition',      Icon: BookOpen },
  { type: 'dance',        label: 'Dance',         Icon: Heart },
  { type: 'sports',       label: 'Sports',        Icon: Trophy },
  { type: 'music',        label: 'Music',         Icon: Music },
  { type: 'other',        label: 'Other',         Icon: MoreHorizontal },
];

export default function SetupCenter() {
  const user = useAuthStore((s) => s.user);

  const [centerName, setCenterName] = useState('');
  const [centerType, setCenterType] = useState<CenterType | null>(null);
  const [logoUri, setLogoUri] = useState<string | null>(null);
  const [classTypes, setClassTypes] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!centerName.trim()) e.centerName = 'Center name is required.';
    if (!centerType) e.centerType = 'Choose a center type.';
    return e;
  };

  async function pickLogo() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Allow photo library access to upload a logo.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]) {
      setLogoUri(result.assets[0].uri);
    }
  }

  const handleContinue = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    if (!user?.orgId) return;

    setSaving(true);
    try {
      const db = getKayoDb();
      await updateDoc(doc(db, 'organizations', user.orgId), {
        name: centerName.trim(),
        centerType,
        updatedAt: serverTimestamp(),
      });

      if (logoUri) {
        // Fire-and-forget, non-fatal — mirrors the existing student-photo-upload pattern.
        uploadOrgLogo(user.orgId, logoUri).catch(() => undefined);
      }

      // Each selected class type is created immediately via the existing endpoint (Phase 1
      // item 2, resolved) so uniqueness/limit checks apply consistently with Settings-created
      // class types. "Other" free-text entries are plain strings here, same as suggested ones.
      await Promise.all(classTypes.map((name) => createClassType({ name, active: true }).catch(() => undefined)));

      router.push('/subscription');
    } catch {
      Alert.alert('Error', 'Could not save center details. Check your connection and try again.');
    } finally {
      setSaving(false);
    }
  };

  const suggestions = centerType ? CENTER_TYPE_CLASS_TYPES[centerType] : [];

  return (
    <SetupShell step={2} title="Your Center" subtitle="Tell us about your training center or academy.">
      <Input
        label="Center / Brand Name *"
        value={centerName}
        onChangeText={(t) => { setCenterName(t); setErrors((e) => ({ ...e, centerName: '' })); }}
        placeholder="e.g. Chennai Karate Club"
        autoCapitalize="words"
        errorText={errors.centerName}
        testID="center-name-input"
      />

      <Card padding="md">
        <Text style={[typography.heading_h4, { color: theme.text.primary, marginBottom: kayoSpace[3] }]}>Logo</Text>
        <View style={styles.logoRow}>
          <Pressable onPress={pickLogo} style={styles.logoWrap} testID="logo-picker-btn">
            {logoUri ? (
              <Image source={{ uri: logoUri }} style={styles.logoImg} />
            ) : (
              <View style={styles.logoPlaceholder}>
                <Camera size={20} color={theme.text.secondary} strokeWidth={2} />
              </View>
            )}
          </Pressable>
          <Text style={[typography.body_sm, { color: theme.text.secondary, flex: 1 }]}>
            Attach your logo if available (optional).
          </Text>
        </View>
      </Card>

      <View>
        <Text style={[typography.label_lg, styles.gridLabel]}>Center Type *</Text>
        <View style={styles.grid}>
          {CENTER_OPTIONS.map(({ type, label, Icon }) => {
            const selected = centerType === type;
            return (
              <Pressable
                key={type}
                style={({ pressed }) => [
                  styles.card,
                  selected && styles.cardSelected,
                  pressed && !selected && styles.cardPressed,
                ]}
                onPress={() => {
                  setCenterType(type);
                  setClassTypes([]);
                  setErrors((e) => ({ ...e, centerType: '' }));
                }}
                testID={`center-type-${type}`}
                accessibilityRole="radio"
                accessibilityState={{ selected }}
              >
                <Icon
                  size={28}
                  color={selected ? theme.text.onPrimary : theme.text.primary}
                  strokeWidth={2}
                />
                <Text
                  style={[
                    typography.label_sm,
                    { color: selected ? theme.text.onPrimary : theme.text.primary, textAlign: 'center' },
                  ]}
                >
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </View>
        {errors.centerType ? (
          <Text style={[typography.body_sm, styles.errorText]}>{errors.centerType}</Text>
        ) : null}
      </View>

      {centerType && (
        <View>
          <Text style={[typography.label_lg, styles.gridLabel]}>Class Types</Text>
          <Text style={[typography.body_sm, { color: theme.text.secondary, marginBottom: kayoSpace[2] }]}>
            Choose up to {MAX_ONBOARDING_CLASS_TYPES} — you can add more later in Settings.
          </Text>
          <ChipMultiSelect
            suggestions={suggestions}
            value={classTypes}
            onChange={setClassTypes}
            maxSelections={MAX_ONBOARDING_CLASS_TYPES}
            otherPlaceholder="e.g. Pottery"
            testID="class-type-chips"
          />
        </View>
      )}

      <Button
        label="Continue"
        variant="primary"
        size="lg"
        fullWidth
        loading={saving}
        disabled={!centerName.trim() || !centerType}
        onPress={handleContinue}
        testID="center-continue-btn"
      />
    </SetupShell>
  );
}

const styles = StyleSheet.create({
  gridLabel: {
    color: theme.text.primary,
    marginBottom: kayoSpace[3],
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: kayoSpace[3],
  },
  card: {
    width: '30%',
    minWidth: 90,
    aspectRatio: 1,
    borderWidth: kayoBorder.width,
    borderColor: theme.border.strong,
    borderRadius: kayoRadius.md,
    backgroundColor: theme.surface.card,
    alignItems: 'center',
    justifyContent: 'center',
    gap: kayoSpace[2],
    padding: kayoSpace[2],
    ...kayoShadow.sm,
  },
  cardSelected: {
    backgroundColor: theme.brand.primary,
    borderColor: theme.brand.primaryDeep,
    transform: [{ translateX: 2 }, { translateY: 2 }],
    ...kayoShadow.none,
  },
  cardPressed: {
    transform: [{ translateX: 1 }, { translateY: 1 }],
  },
  errorText: {
    color: theme.status.overdue.fg,
    marginTop: kayoSpace[2],
  },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: kayoSpace[3] },
  logoWrap: {
    width: 64,
    height: 64,
    borderRadius: kayoRadius.md,
    overflow: 'hidden',
    borderWidth: kayoBorder.width,
    borderColor: theme.border.strong,
  },
  logoImg: { width: '100%', height: '100%' },
  logoPlaceholder: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.surface.sunken,
  },
});
```

- [ ] **Step 3: Verify**

```bash
cd frontend && npx tsc --noEmit
```

Expected: zero new errors.

- [ ] **Step 4: Manual run-through**

```bash
cd frontend && npx expo start
```

Navigate through phone-entry → OTP → Personal → Center. Confirm: (a) tapping the logo placeholder opens the image picker and a selected image renders as a thumbnail; (b) selecting "Martial Arts" reveals 5 suggested chips + an "Other" chip; (c) selecting 5 chips disables further suggestion taps and the counter reads "5 / 5 selected"; (d) tapping "+ Other" reveals a text input, typing a name and pressing return adds it as a removable chip; (e) tapping Continue navigates to `/subscription` and the new class types appear under Settings → Class Types afterward (verify against a running backend).

- [ ] **Step 5: Commit**

```bash
git add frontend/features/onboarding/screens/CenterScreen.tsx frontend/features/subscriptions/api/subscription.ts
git commit -m "feat(onboarding): add logo upload and class-type chip collection to Center step"
```

---

### Task 7: Subscription tier constant + real tier table (Phase 2.2)

**Files:**
- Create: `frontend/lib/subscriptionPlans.ts`
- Modify: `frontend/features/onboarding/screens/SubscriptionScreen.tsx:191-202` (replace "Plans coming soon" block) and styles

**Depends on:** Phase 1 item 1 (resolved): backend enum (`basic|pro|ultra`+trial) is canonical; only Basic and Pro are shown; Ultra and Customize stay in the data but hidden from the UI.

- [ ] **Step 1: Create the single source-of-truth tier constant**

```typescript
// frontend/lib/subscriptionPlans.ts

/**
 * Canonical tier list (Phase 1 item 1, resolved). Feature caps mirror the backend's existing
 * PlanLimitService.PLAN_LIMITS exactly (basic: 3 branches/2 class types/300 students, pro: 10/5/500,
 * ultra: 15/12/1000) so this never drifts from what the backend actually enforces. Every screen
 * that shows a tier name/price (onboarding Subscription, Settings Subscription in Phase 7) must
 * read from this single constant — no second hardcoded tier list anywhere in the app.
 */
export interface SubscriptionPlanTier {
  id: 'basic' | 'pro' | 'ultra' | 'customize';
  label: string;
  monthlyPrice: number | null;
  regularAnnualPrice: number | null;
  launchAnnualPrice: number | null;
  features: string[];
  /** Only Basic and Pro are sellable for now — Ultra/Customize stay hidden until a later release. */
  visible: boolean;
}

export const SUBSCRIPTION_PLANS: SubscriptionPlanTier[] = [
  {
    id: 'basic',
    label: 'Basic',
    monthlyPrice: 499,
    regularAnnualPrice: 5988,
    launchAnnualPrice: 3799,
    features: ['Up to 3 branches', 'Up to 2 class types', 'Up to 300 students'],
    visible: true,
  },
  {
    id: 'pro',
    label: 'Pro',
    monthlyPrice: 999,
    regularAnnualPrice: 11988,
    launchAnnualPrice: 7599,
    features: ['Up to 10 branches', 'Up to 5 class types', 'Up to 500 students'],
    visible: true,
  },
  {
    id: 'ultra',
    label: 'Ultra',
    monthlyPrice: 1999,
    regularAnnualPrice: 23988,
    launchAnnualPrice: 14999,
    features: ['Up to 15 branches', 'Up to 12 class types', 'Up to 1000 students'],
    visible: false,
  },
  {
    id: 'customize',
    label: 'Customize',
    monthlyPrice: null,
    regularAnnualPrice: null,
    launchAnnualPrice: null,
    features: ['Tailored limits for large academies'],
    visible: false,
  },
];

export const ANNUAL_LAUNCH_DISCOUNT_LABEL = '37% off';

export function visiblePlans(): SubscriptionPlanTier[] {
  return SUBSCRIPTION_PLANS.filter((p) => p.visible);
}
```

- [ ] **Step 2: Replace the "Plans coming soon" block in `SubscriptionScreen.tsx`**

Add to the imports (top of file, alongside the existing `lucide-react-native` import):

```typescript
import { TabFilter } from '../../../design-system/components/atoms/TabFilter';
import { visiblePlans, ANNUAL_LAUNCH_DISCOUNT_LABEL } from '../../../lib/subscriptionPlans';
```

Add local state inside `SetupSubscription()` (alongside the existing `useState` calls):

```typescript
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');
```

Replace the `{/* Plans coming soon */}` block (lines 191-202) with:

```typescript
      {/* Real tier table (Phase 1 item 1, resolved) */}
      <View style={{ gap: kayoSpace[3] }}>
        <TabFilter
          options={[
            { value: 'monthly', label: 'Monthly' },
            { value: 'annual', label: `Annual (${ANNUAL_LAUNCH_DISCOUNT_LABEL})` },
          ]}
          value={billingPeriod}
          onChange={setBillingPeriod}
          testID="billing-period-toggle"
        />
        {visiblePlans().map((plan) => (
          <View key={plan.id} style={styles.planCard}>
            <View style={styles.planHeaderRow}>
              <Text style={[typography.label_lg, { color: theme.text.primary }]}>{plan.label}</Text>
              <Text style={[typography.heading_h4, { color: theme.text.primary }]}>
                {billingPeriod === 'monthly'
                  ? `₹${plan.monthlyPrice}/mo`
                  : `₹${plan.launchAnnualPrice}/yr`}
              </Text>
            </View>
            {plan.features.map((f) => (
              <View key={f} style={styles.featureRow}>
                <CheckCircle2 size={14} color={theme.text.secondary} strokeWidth={2} />
                <Text style={[typography.body_sm, { color: theme.text.secondary }]}>{f}</Text>
              </View>
            ))}
          </View>
        ))}
        <Text style={[typography.body_sm, { color: theme.text.tertiary }]}>
          Billed via Google Play In-App Billing
        </Text>
      </View>
```

Add to `styles` (replacing the now-unused `plansPreview` entry):

```typescript
  planCard: {
    borderWidth: kayoBorder.width,
    borderColor: theme.border.subtle,
    borderRadius: kayoRadius.md,
    padding: kayoSpace[4],
    backgroundColor: theme.surface.sunken,
    gap: kayoSpace[2],
  },
  planHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
```

- [ ] **Step 3: Verify**

```bash
cd frontend && npx tsc --noEmit
```

Expected: zero new errors.

- [ ] **Step 4: Manual run-through**

Navigate Setup → Subscription. Confirm: tier table shows only "Basic" and "Pro" (never Ultra/Customize); toggling Monthly/Annual updates displayed prices to ₹499/mo↔₹3,799/yr (Basic) and ₹999/mo↔₹7,599/yr (Pro); "Start Free Trial" / coupon flow behave exactly as before (no regression).

- [ ] **Step 5: Commit**

```bash
git add frontend/lib/subscriptionPlans.ts frontend/features/onboarding/screens/SubscriptionScreen.tsx
git commit -m "feat(onboarding): replace placeholder pricing with real Basic/Pro tier table"
```

---

### Task 8: Branch type + branches-api + Settings BranchModal new fields (shared with Phase 7.1)

**Files:**
- Modify: `frontend/features/settings/api/branches-api.ts`
- Modify: `frontend/features/settings/hooks/useBranches.ts`
- Modify: `frontend/features/settings/screens/BranchesScreen.tsx`

**Depends on:** Task 2 (backend `CreateBranchRequest`/`PatchBranchRequest`/`BranchResponse` already accept the 6 new fields), Task 4 (`Branch` type already extended).

This builds the field-additions UI **once** here in Settings; Task 9 (onboarding `BranchScreen`) reuses the same `createBranch()` API function with the same field shape rather than inventing a second form.

- [ ] **Step 1: Extend `branches-api.ts`**

Replace the full file content (it is only 30 lines today) with:

```typescript
/**
 * Branch create/rename/delete API calls to the Java backend (plan §9, §13 Phase 4). Rename
 * cascade (denormalized branchName on enrollments/sessions/payments) and the dependency-aware
 * delete guard are now one atomic backend transaction - the client no longer computes or commits
 * these writes itself. Reads stay as direct Firestore queries (see hooks/useBranches.ts).
 */

import { apiClient } from '../../../lib/api/client';

export interface BranchInput {
  name: string;
  active: boolean;
  addressLine1?: string;
  addressLine2?: string;
  pincode?: string;
  city?: string;
  batchTimings?: string;
  classMode?: 'online' | 'offline' | 'hybrid';
}

export interface BranchSnapshotResponse {
  id: string;
  name: string;
  active: boolean;
  addressLine1?: string;
  addressLine2?: string;
  pincode?: string;
  city?: string;
  batchTimings?: string;
  classMode?: 'online' | 'offline' | 'hybrid';
}

export function createBranch(input: BranchInput): Promise<BranchSnapshotResponse> {
  return apiClient.post<BranchSnapshotResponse>('/branches', input);
}

export function updateBranch(id: string, input: Partial<BranchInput>): Promise<BranchSnapshotResponse> {
  return apiClient.patch<BranchSnapshotResponse>(`/branches/${id}`, input);
}

export function deleteBranch(id: string): Promise<void> {
  return apiClient.delete<void>(`/branches/${id}`);
}
```

- [ ] **Step 2: Extend `useBranches.ts` mutations**

In `useCreateBranch()` and `useUpdateBranch()`, widen the `mutationFn` input types to `BranchInput`/`Partial<BranchInput>` (import the type from `../api/branches-api`):

```typescript
import { createBranch, updateBranch, deleteBranch, type BranchInput } from '../api/branches-api';

// ...

export function useCreateBranch() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: BranchInput) => createBranch(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: QK }),
  });
}

export function useUpdateBranch() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: { id: string } & Partial<BranchInput>) =>
      updateBranch(input.id, input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QK });
      qc.invalidateQueries({ queryKey: ['sessions'] });
      qc.invalidateQueries({ queryKey: ['payments'] });
      qc.invalidateQueries({ queryKey: ['students'] });
      qc.invalidateQueries({ queryKey: ['enrollments'] });
    },
  });
}
```

- [ ] **Step 3: Extend the Zod schema and `BranchModal` in `BranchesScreen.tsx`**

Replace the `schema`/`FormData` declaration (lines 27-31):

```typescript
const schema = z.object({
  name: z.string().trim().min(2, 'At least 2 characters'),
  active: z.boolean(),
  addressLine1: z.string().trim().optional(),
  addressLine2: z.string().trim().optional(),
  pincode: z.string().trim().optional(),
  city: z.string().trim().optional(),
  batchTimings: z.string().trim().optional(),
  classMode: z.enum(['online', 'offline', 'hybrid']).optional(),
});
type FormData = z.infer<typeof schema>;
```

Replace the two `BranchModal` `onSubmit` call sites (lines 139-147 and 156-165) to pass the full form data through instead of just `name`/`active`:

```typescript
        onSubmit={async (data) => {
          try {
            await createMut.mutateAsync(data);
            toast.show({ message: `${data.name} added.`, tone: 'success' });
            setAdding(false);
          } catch (err) {
            toast.show({ message: String((err as Error).message), tone: 'error' });
          }
        }}
```

```typescript
        onSubmit={async (data) => {
          if (!editing) return;
          try {
            await updateMut.mutateAsync({ id: editing.id, ...data });
            toast.show({ message: 'Branch updated.', tone: 'success' });
            setEditing(null);
          } catch (err) {
            toast.show({ message: String((err as Error).message), tone: 'error' });
          }
        }}
```

Replace the `BranchModal` function body (lines 171-239) to add the 6 new fields below the existing "Active" row, using `RadioGroup` for `classMode`:

```typescript
function BranchModal({
  visible,
  title,
  initial,
  submitting,
  onClose,
  onSubmit,
}: {
  visible: boolean;
  title: string;
  initial: Branch | null;
  submitting: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
}) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    values: {
      name: initial?.name ?? '',
      active: initial?.active ?? true,
      addressLine1: initial?.addressLine1 ?? '',
      addressLine2: initial?.addressLine2 ?? '',
      pincode: initial?.pincode ?? '',
      city: initial?.city ?? '',
      batchTimings: initial?.batchTimings ?? '',
      classMode: initial?.classMode,
    },
  });

  React.useEffect(() => {
    if (visible) {
      reset({
        name: initial?.name ?? '',
        active: initial?.active ?? true,
        addressLine1: initial?.addressLine1 ?? '',
        addressLine2: initial?.addressLine2 ?? '',
        pincode: initial?.pincode ?? '',
        city: initial?.city ?? '',
        batchTimings: initial?.batchTimings ?? '',
        classMode: initial?.classMode,
      });
    }
  }, [visible, initial, reset]);

  return (
    <Dialog visible={visible} onClose={onClose} title={title} testID="branch-modal">
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            testID="branch-name-input"
            label="Branch name"
            placeholder="e.g. Selaiyur"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            errorText={errors.name?.message}
          />
        )}
      />
      <View style={styles.activeRow}>
        <Text style={[typography.label_lg, { color: theme.text.primary }]}>Active</Text>
        <Controller
          control={control}
          name="active"
          render={({ field: { onChange, value } }) => (
            <KayoSwitch value={value} onChange={onChange} />
          )}
        />
      </View>
      <Controller
        control={control}
        name="addressLine1"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input testID="branch-address1-input" label="Address line 1" value={value} onChangeText={onChange} onBlur={onBlur} />
        )}
      />
      <Controller
        control={control}
        name="addressLine2"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input testID="branch-address2-input" label="Address line 2 (optional)" value={value} onChangeText={onChange} onBlur={onBlur} />
        )}
      />
      <Controller
        control={control}
        name="pincode"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input testID="branch-pincode-input" label="Pincode" value={value} onChangeText={onChange} onBlur={onBlur} keyboardType="number-pad" />
        )}
      />
      <Controller
        control={control}
        name="city"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input testID="branch-city-input" label="City / District" value={value} onChangeText={onChange} onBlur={onBlur} />
        )}
      />
      <Controller
        control={control}
        name="batchTimings"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input testID="branch-timings-input" label="Batch timings" placeholder="e.g. 06:30 - 08:00 AM" value={value} onChangeText={onChange} onBlur={onBlur} />
        )}
      />
      <View>
        <Text style={[typography.label_lg, { color: theme.text.primary, marginBottom: kayoSpace[2] }]}>Class mode</Text>
        <Controller
          control={control}
          name="classMode"
          render={({ field: { onChange, value } }) => (
            <RadioGroup
              testID="branch-class-mode"
              value={value ?? null}
              onChange={(v) => onChange(v as 'online' | 'offline' | 'hybrid')}
              options={[
                { value: 'online', label: 'Online' },
                { value: 'offline', label: 'Offline' },
                { value: 'hybrid', label: 'Hybrid' },
              ]}
            />
          )}
        />
      </View>
      <View style={styles.modalActions}>
        <Button label="Cancel" variant="secondary" onPress={onClose} />
        <Button
          testID="branch-save-btn"
          label="Save"
          variant="primary"
          loading={submitting}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </Dialog>
  );
}
```

Add the `RadioGroup` import at the top of the file:

```typescript
import { RadioGroup } from '../../../design-system/components/atoms/RadioGroup';
```

- [ ] **Step 4: Verify**

```bash
cd frontend && npx tsc --noEmit
```

Expected: zero new errors.

- [ ] **Step 5: Manual run-through**

Settings → Branches → Add branch. Fill in all fields including a class mode, save, confirm the new fields persist by re-opening "Edit" on that branch and seeing the same values pre-filled. Confirm an existing branch with no address data still edits cleanly (no crash on `undefined` fields).

- [ ] **Step 6: Commit**

```bash
git add frontend/features/settings/api/branches-api.ts frontend/features/settings/hooks/useBranches.ts frontend/features/settings/screens/BranchesScreen.tsx
git commit -m "feat(branches): add address and batch-schedule fields to Settings Branch form"
```

---

### Task 9: Onboarding BranchScreen — backend API, new fields, "Add more" loop (Phase 2.3)

**Files:**
- Modify: `frontend/features/onboarding/screens/BranchScreen.tsx` (full rewrite)

**Depends on:** Task 8 (`createBranch()`/`BranchInput` already accept the 6 new fields).

**Important fix bundled here:** today's onboarding `BranchScreen` writes the first branch via a direct client-side `addDoc(branchesCol(...))` Firestore call, bypassing the backend's name-uniqueness check, plan-limit enforcement, and audit logging that the Settings screen's `createBranch()` already goes through. This task switches onboarding to call the same `createBranch()` API function Settings uses, so both entry points share one validated code path — consistent with the backend PRD's note that "`POST /branches` already supports creating N branches sequentially."

- [ ] **Step 1: Rewrite `BranchScreen.tsx`**

```typescript
/**
 * Setup Step 4/4 — Branch Details.
 * Creates 1-5 branches via the same backend-validated createBranch() path Settings uses (no
 * more direct client-side Firestore write), marks org as setupComplete, then routes into the
 * new Setup-complete screen (Phase 2.4) instead of jumping straight to the dashboard.
 */

import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';

import { SetupShell } from '../../../design-system/components/templates/SetupShell';
import { Input } from '../../../design-system/components/atoms/Input';
import { Button } from '../../../design-system/components/atoms/Button';
import { Card } from '../../../design-system/components/atoms/Card';
import { RadioGroup } from '../../../design-system/components/atoms/RadioGroup';
import { theme } from '../../../design-system/foundations/theme';
import { typography } from '../../../design-system/foundations/typography';
import { kayoSpace, kayoBorder, kayoRadius } from '../../../design-system/foundations/tokens';
import { useAuthStore } from '../../../stores/authStore';
import { getKayoDb } from '../../../lib/firebase';
import { createBranch, type BranchInput } from '../../settings/api/branches-api';
import { completeOrgSetup } from '../../subscriptions/api/subscription';

const MAX_ONBOARDING_BRANCHES = 5;

interface BranchDraft {
  name: string;
  addressLine1: string;
  batchTimings: string;
  classMode: 'online' | 'offline' | 'hybrid' | undefined;
}

function emptyDraft(): BranchDraft {
  return { name: '', addressLine1: '', batchTimings: '', classMode: undefined };
}

export default function SetupBranch() {
  const user = useAuthStore((s) => s.user);
  const patchUser = useAuthStore((s) => s.patchUser);

  const [drafts, setDrafts] = useState<BranchDraft[]>([emptyDraft()]);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Pre-fill the first branch name from the org name, exactly as before.
  useEffect(() => {
    if (!user?.orgId) return;
    const db = getKayoDb();
    getDoc(doc(db, 'organizations', user.orgId)).then((snap) => {
      if (snap.exists()) {
        const name = snap.data().name as string;
        if (name) setDrafts((ds) => [{ ...ds[0], name }, ...ds.slice(1)]);
      }
    }).catch(() => undefined);
  }, [user?.orgId]);

  function updateDraft(index: number, patch: Partial<BranchDraft>) {
    setDrafts((ds) => ds.map((d, i) => (i === index ? { ...d, ...patch } : d)));
  }

  function addBranch() {
    if (drafts.length >= MAX_ONBOARDING_BRANCHES) return;
    setDrafts((ds) => [...ds, emptyDraft()]);
  }

  const handleFinish = async () => {
    if (!drafts[0].name.trim()) { setError('Branch name is required.'); return; }
    if (!user?.orgId || !user?.uid) return;

    setSaving(true);
    try {
      // Sequential, not parallel: each createBranch() call re-reads the current branch list for
      // its own uniqueness check, so concurrent calls from the same screen could otherwise race.
      for (const draft of drafts) {
        if (!draft.name.trim()) continue; // subsequent branches are optional except for name
        const input: BranchInput = {
          name: draft.name.trim(),
          active: true,
          addressLine1: draft.addressLine1.trim() || undefined,
          batchTimings: draft.batchTimings.trim() || undefined,
          classMode: draft.classMode,
        };
        await createBranch(input);
      }

      await completeOrgSetup(user.orgId);
      patchUser({ orgSetupComplete: true });
      router.replace('/setup/complete');
    } catch (e) {
      Alert.alert('Error', e instanceof Error ? e.message : 'Could not complete setup. Check your connection and try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <SetupShell step={4} title="Add Branches Details" subtitle="Branches let you manage multiple locations from one account.">
      {drafts.map((draft, i) => (
        <Card key={i} padding="md" style={styles.branchCard}>
          <Text style={[typography.label_lg, { color: theme.text.primary, marginBottom: kayoSpace[2] }]}>
            Branch {i + 1}{i === 0 ? '' : ' (optional)'}
          </Text>
          <Input
            label={i === 0 ? 'Branch Name *' : 'Branch Name'}
            value={draft.name}
            onChangeText={(t) => { updateDraft(i, { name: t }); if (i === 0) setError(null); }}
            placeholder="e.g. Main Branch"
            autoCapitalize="words"
            errorText={i === 0 ? error ?? undefined : undefined}
            testID={`branch-name-input-${i}`}
          />
          <Input
            label="Address (optional)"
            value={draft.addressLine1}
            onChangeText={(t) => updateDraft(i, { addressLine1: t })}
            testID={`branch-address-input-${i}`}
          />
          <Input
            label="Batch timings (optional)"
            placeholder="e.g. 06:30 - 08:00 AM"
            value={draft.batchTimings}
            onChangeText={(t) => updateDraft(i, { batchTimings: t })}
            testID={`branch-timings-input-${i}`}
          />
          <View style={{ marginTop: kayoSpace[2] }}>
            <Text style={[typography.label_sm, { color: theme.text.secondary, marginBottom: kayoSpace[1] }]}>
              Class mode (optional)
            </Text>
            <RadioGroup
              testID={`branch-class-mode-${i}`}
              value={draft.classMode ?? null}
              onChange={(v) => updateDraft(i, { classMode: v as 'online' | 'offline' | 'hybrid' })}
              options={[
                { value: 'online', label: 'Online' },
                { value: 'offline', label: 'Offline' },
                { value: 'hybrid', label: 'Hybrid' },
              ]}
            />
          </View>
        </Card>
      ))}

      {drafts.length < MAX_ONBOARDING_BRANCHES && (
        <Button
          label="+ Add more"
          variant="secondary"
          onPress={addBranch}
          testID="add-branch-btn"
        />
      )}

      <Card padding="sm" style={styles.infoCard}>
        <Text style={[typography.body_sm, { color: theme.text.secondary }]}>
          You can add up to {MAX_ONBOARDING_BRANCHES} branches — more can be added after completing setup too.
        </Text>
      </Card>

      <Button
        label="Finish Setup"
        variant="primary"
        size="lg"
        fullWidth
        loading={saving}
        disabled={!drafts[0].name.trim()}
        onPress={handleFinish}
        testID="finish-setup-btn"
      />
    </SetupShell>
  );
}

const styles = StyleSheet.create({
  branchCard: {
    borderWidth: kayoBorder.width,
    borderColor: theme.border.subtle,
    borderRadius: kayoRadius.md,
    gap: kayoSpace[3],
  },
  infoCard: {
    backgroundColor: theme.surface.sunken,
  },
});
```

- [ ] **Step 2: Verify**

```bash
cd frontend && npx tsc --noEmit
```

Expected: zero new errors.

- [ ] **Step 3: Manual run-through**

With a running backend, walk through Setup → Branch. Confirm: (a) branch 1's name pre-fills from the org name as before; (b) "+ Add more" appends up to 4 additional optional branch cards (button disappears at 5); (c) leaving branch 2's name blank while filling branch 1 still finishes setup successfully, creating only 1 branch; (d) the created branch(es) appear in Settings → Branches afterward with their address/batch-timings/class-mode fields intact; (e) tapping "Finish Setup" now lands on `/setup/complete` (this route does not exist yet until Task 10 — expect a routing error here until Task 10 lands; this is an acceptable, expected intermediate state per this plan's task ordering).

- [ ] **Step 4: Commit**

```bash
git add frontend/features/onboarding/screens/BranchScreen.tsx
git commit -m "feat(onboarding): route branch creation through backend API, add multi-branch support"
```

---

### Task 10: Setup-complete screen (Phase 2.4)

**Files:**
- Create: `frontend/features/onboarding/screens/CompleteScreen.tsx`
- Create: `frontend/app/(setup)/complete.tsx`

**Depends on:** Task 9 (`BranchScreen.handleFinish()` already routes to `/setup/complete`).

**Design note carried from the resolved Phase 1 item 10 (content gaps):** the OTP-verify 5-second auto-redirect interstitial was explicitly **not** built (instant redirect was kept). Per the frontend PRD's own guidance ("only build this countdown pattern once both screens agree on whether to use it"), this screen also does **not** build an auto-redirect timer — it shows a single explicit "Go to Dashboard" button only, no countdown.

- [ ] **Step 1: Create the screen**

```typescript
/**
 * Setup Step 5 (terminal) — Setup complete.
 * Shown once, between BranchScreen's "Finish Setup" and the dashboard, so there is an explicit
 * confirmation moment and a clear next-step hook into the Dashboard first-run import prompt
 * (Phase 2.5) instead of a silent redirect.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { CheckCircle2 } from 'lucide-react-native';

import { Card } from '../../../design-system/components/atoms/Card';
import { Button } from '../../../design-system/components/atoms/Button';
import { theme } from '../../../design-system/foundations/theme';
import { typography } from '../../../design-system/foundations/typography';
import { kayoSpace, kayoRadius, kayoColors } from '../../../design-system/foundations/tokens';

const NEXT_STEPS = [
  'Class types are already set up',
  'Import or add your first students',
  'Start tracking fees and attendance',
];

export default function SetupComplete() {
  return (
    <View style={styles.container}>
      <View style={styles.checkWrap}>
        <CheckCircle2 size={48} color={kayoColors.positive[600]} strokeWidth={2} />
      </View>
      <Text style={[typography.heading_h2, { color: theme.text.primary, textAlign: 'center' }]}>
        Your workspace is ready
      </Text>
      <Text style={[typography.body_sm, { color: theme.text.secondary, textAlign: 'center' }]}>
        Your branch details are saved. You can now add students, track fees, and mark attendance.
      </Text>

      <Card padding="md" style={styles.stepsCard}>
        <Text style={[typography.label_lg, { color: theme.text.primary, marginBottom: kayoSpace[2] }]}>
          Suggested next steps
        </Text>
        {NEXT_STEPS.map((step, i) => (
          <View key={step} style={styles.stepRow}>
            <View style={styles.stepNumber}>
              <Text style={[typography.utility_badge_tiny, { color: theme.text.onPrimary }]}>{i + 1}</Text>
            </View>
            <Text style={[typography.body_sm, { color: theme.text.secondary, flex: 1 }]}>{step}</Text>
          </View>
        ))}
      </Card>

      <Button
        label="Go to Dashboard"
        variant="primary"
        size="lg"
        fullWidth
        onPress={() => router.replace('/dashboard')}
        testID="setup-complete-continue-btn"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: kayoSpace[5],
    gap: kayoSpace[4],
    justifyContent: 'center',
    backgroundColor: theme.surface.canvas,
  },
  checkWrap: { alignItems: 'center' },
  stepsCard: {
    backgroundColor: theme.surface.sunken,
    borderRadius: kayoRadius.md,
    gap: kayoSpace[2],
  },
  stepRow: { flexDirection: 'row', alignItems: 'center', gap: kayoSpace[3] },
  stepNumber: {
    width: 20,
    height: 20,
    borderRadius: kayoRadius.pill,
    backgroundColor: theme.brand.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

- [ ] **Step 2: Add the route wrapper**

```typescript
// frontend/app/(setup)/complete.tsx
export { default } from '../../features/onboarding/screens/CompleteScreen';
```

- [ ] **Step 3: Verify**

```bash
cd frontend && npx tsc --noEmit
```

Expected: zero new errors.

- [ ] **Step 4: Manual run-through**

Complete the full onboarding wizard end to end (phone-entry → OTP → Personal → Center → Subscription → Branch → Finish Setup). Confirm: the new Setup-complete screen renders with the checkmark, "Your workspace is ready," the 3 numbered next steps, and a single "Go to Dashboard" button with no countdown; tapping it lands on the dashboard.

- [ ] **Step 5: Commit**

```bash
git add frontend/features/onboarding/screens/CompleteScreen.tsx "frontend/app/(setup)/complete.tsx"
git commit -m "feat(onboarding): add Setup-complete confirmation screen"
```

---

### Task 11: Dashboard first-run import prompt (Phase 2.5)

**Files:**
- Create: `frontend/features/onboarding/hooks/useFirstRunImportPrompt.ts`
- Create: `frontend/features/home/components/FirstRunImportPromptModal.tsx`
- Modify: `frontend/app/(main)/dashboard.tsx`

**Depends on:** Task 4 (`Org.firstRunPromptShown`), Task 10 (this is what "Go to Dashboard" routes into), Task 12 (the "Import Students" button's destination).

**Approach:** rather than editing the large existing `DashboardScreen.tsx` (700+ lines) to splice in prompt state, this composes the prompt as a sibling overlay at the route level — `frontend/app/(main)/dashboard.tsx` is today a 1-line re-export; it becomes a 2-component wrapper. This keeps the diff to the route file and two new small files, with zero risk of breaking existing Dashboard logic.

- [ ] **Step 1: Create the hook**

```typescript
// frontend/features/onboarding/hooks/useFirstRunImportPrompt.ts
import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

import { getKayoDb } from '../../../lib/firebase';
import { useAuthStore } from '../../../stores/authStore';

/**
 * Shows the first-run "Import Students" prompt exactly once per org: true only when the org has
 * completed setup and has never dismissed/acted on this prompt before (Phase 2.5 acceptance
 * criteria). Reads the org doc once on mount rather than subscribing, since this is a one-time
 * gate, not a live value the rest of the Dashboard needs to react to.
 */
export function useFirstRunImportPrompt() {
  const orgId = useAuthStore((s) => s.user?.orgId);
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    if (!orgId) return;
    const db = getKayoDb();
    getDoc(doc(db, 'organizations', orgId)).then((snap) => {
      if (!snap.exists()) return;
      const data = snap.data();
      if (data.setupComplete && !data.firstRunPromptShown) {
        setShouldShow(true);
      }
    }).catch(() => undefined);
  }, [orgId]);

  async function dismiss() {
    setShouldShow(false);
    if (!orgId) return;
    const db = getKayoDb();
    await updateDoc(doc(db, 'organizations', orgId), {
      firstRunPromptShown: true,
      updatedAt: serverTimestamp(),
    }).catch(() => undefined);
  }

  return { shouldShow, dismiss };
}
```

- [ ] **Step 2: Create the modal component**

```typescript
// frontend/features/home/components/FirstRunImportPromptModal.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';

import { Dialog } from '../../../design-system/components/atoms/Dialog';
import { Button } from '../../../design-system/components/atoms/Button';
import { theme } from '../../../design-system/foundations/theme';
import { typography } from '../../../design-system/foundations/typography';
import { kayoSpace } from '../../../design-system/foundations/tokens';
import { useFirstRunImportPrompt } from '../../onboarding/hooks/useFirstRunImportPrompt';

export function FirstRunImportPromptModal() {
  const { shouldShow, dismiss } = useFirstRunImportPrompt();

  if (!shouldShow) return null;

  return (
    <Dialog visible={shouldShow} onClose={dismiss} title="Add your students" testID="first-run-import-modal">
      <Text style={[typography.body_sm, { color: theme.text.secondary }]}>
        0 students added. Your branch is ready — bring in your roster now, or do it later.
      </Text>
      <View style={styles.actions}>
        <Button
          label="Import Students"
          variant="primary"
          fullWidth
          onPress={async () => {
            await dismiss();
            router.push('/settings/import?entryContext=onboarding');
          }}
          testID="first-run-import-btn"
        />
        <Button
          label="Add manually"
          variant="secondary"
          fullWidth
          onPress={async () => {
            await dismiss();
            router.push('/students/new');
          }}
          testID="first-run-manual-btn"
        />
        <Button
          label="Do this later"
          variant="ghost"
          fullWidth
          onPress={dismiss}
          testID="first-run-later-btn"
        />
      </View>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  actions: { gap: kayoSpace[2], marginTop: kayoSpace[3] },
});
```

("Add manually" routes to `frontend/app/(main)/students/new.tsx`, confirmed the correct existing route for `NewStudentScreen.tsx` — the frontend PRD confirms this screen is "fully reusable as-is for this entry point," so it is not modified here.)

- [ ] **Step 3: Wire it into the dashboard route**

Replace `frontend/app/(main)/dashboard.tsx`:

```typescript
import React from 'react';
import DashboardScreen from '../../features/home/screens/DashboardScreen';
import { FirstRunImportPromptModal } from '../../features/home/components/FirstRunImportPromptModal';

export default function Dashboard() {
  return (
    <>
      <DashboardScreen />
      <FirstRunImportPromptModal />
    </>
  );
}
```

- [ ] **Step 4: Verify**

```bash
cd frontend && npx tsc --noEmit
```

Expected: zero new errors.

- [ ] **Step 5: Manual run-through**

Complete onboarding through to the dashboard. Confirm: the modal appears exactly once on first dashboard load with 0 students; "Do this later" dismisses it and reloading the app does not show it again (verify `organizations/{orgId}.firstRunPromptShown` is `true` in Firestore); "Import Students" dismisses the modal and navigates to the import wizard with `entryContext=onboarding`; "Add manually" dismisses the modal and opens the existing Add Student screen.

- [ ] **Step 6: Commit**

```bash
git add frontend/features/onboarding/hooks/useFirstRunImportPrompt.ts frontend/features/home/components/FirstRunImportPromptModal.tsx "frontend/app/(main)/dashboard.tsx"
git commit -m "feat(dashboard): add one-time first-run Import Students prompt"
```

---

### Task 12: Student Import wizard v1 — entryContext-parameterized rebuild (Phase 2.6)

**Files:**
- Create: `frontend/lib/csv.ts` (extracted from `ExportScreen.tsx` so both screens share one implementation)
- Modify: `frontend/features/settings/screens/ExportScreen.tsx` (use the extracted helpers instead of local copies)
- Modify: `frontend/features/settings/api/imports-api.ts` (add `resolution`/`updatedCount`)
- Modify: `frontend/features/settings/screens/ImportScreen.tsx` (full rewrite into a step-driven wizard)

**Depends on:** Task 3 (backend `resolution` contract), Task 11 (links to this screen with `?entryContext=onboarding`).

**Scope decisions carried from the PRDs (do not silently expand):**
- CSV-only end to end; UI copy never says "CSV" (Phase 1 item 3, resolved) — say "spreadsheet"/"your sheet" instead.
- "Fix Issues" ships as the explicit v1 substitute the PRD itself recommends: errors are shown clearly with the offending field, and the recovery path is "fix your sheet and re-upload" — no inline cell-editing UI is built.
- "Choose Scope" is real for the Settings entry point (a 3-way picker) but is intentionally lightweight: scope does not gate any backend call (rows already carry `branchName` per row) — it only changes the step-1 framing copy and which example branch name the downloadable template uses. Do not build server-side scope filtering; nothing in the backend contract has a scope parameter.

- [ ] **Step 1: Extract shared CSV helpers**

Read `ExportScreen.tsx`'s current `escapeCell`/`toCSV`/`shareCSV` functions (lines 34-45) and move them verbatim into a new file:

```typescript
// frontend/lib/csv.ts
import { File, Paths } from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export function escapeCell(v: string | number | undefined | null): string {
  const s = String(v ?? '');
  return s.includes(',') || s.includes('"') || s.includes('\n')
    ? `"${s.replace(/"/g, '""')}"`
    : s;
}

export function toCSV(headers: string[], rows: (string | number | undefined | null)[][]): string {
  return [
    headers.join(','),
    ...rows.map((r) => r.map(escapeCell).join(',')),
  ].join('\n');
}

export async function shareCSV(filename: string, content: string): Promise<void> {
  const file = new File(Paths.cache, filename);
  file.write(content);
  await Sharing.shareAsync(file.uri, { mimeType: 'text/csv', dialogTitle: 'Export CSV' });
}
```

In `ExportScreen.tsx`, delete lines 10-11 (`import { File, Paths } from 'expo-file-system';` and `import * as Sharing from 'expo-sharing';` — no longer needed directly in this file) and lines 23-46 (the `// CSV helpers` comment block and the `escapeCell`/`toCSV`/`shareCSV` function definitions), replacing them with:

```typescript
import { toCSV, shareCSV } from '../../../lib/csv';
```

added alongside the file's other existing imports (e.g. near the `Card`/`Button` design-system imports).

- [ ] **Step 2: Verify the extraction didn't break anything**

```bash
cd frontend && npx tsc --noEmit
```

Expected: zero new errors. Manually re-run Settings → Export Data → Export Students/Payments and confirm the share sheet still opens with correct CSV content (no regression).

- [ ] **Step 3: Extend `imports-api.ts`**

```typescript
export type ImportResolution = 'skip' | 'update' | 'create';

export interface ImportJobSnapshotResponse {
  id: string;
  status: ImportJobStatus;
  totalRows: number;
  processedRows: number;
  createdCount: number;
  updatedCount: number;
  skippedCount: number;
  failedCount: number;
  rowErrors: ImportRowResultResponse[];
}

export function createImportJob(
  rows: ImportRowInput[],
  idempotencyKey: string,
  resolution: ImportResolution = 'skip',
): Promise<ImportJobSnapshotResponse> {
  return apiClient.post<ImportJobSnapshotResponse>('/imports/students', { rows, resolution }, { idempotencyKey });
}
```

(`validateImport`/`getImportJob` are unchanged — `resolution` only matters once a job is actually created, per Task 3's backend design.)

- [ ] **Step 4: Rewrite `ImportScreen.tsx` as a step-driven wizard**

```typescript
/**
 * Student bulk-import wizard (plan §13 Phase 5; redesign Phase 2.6/7.x). One implementation
 * serves both entry points via the `entryContext` route param — `entryContext=onboarding` (linked
 * from the Dashboard first-run prompt) shows the Intro step and skips the Scope step (silently
 * defaults to "current branch" framing only — rows still carry their own branchName, so this does
 * not gate any backend call); `entryContext=settings` (default) skips Intro and shows the full
 * 3-way Scope picker. CSV-only end to end; UI copy never uses the word "CSV" (Phase 1 item 3).
 *
 * "Fix Issues" intentionally ships as "fix your sheet and re-upload" (no inline cell editor) —
 * a deliberate v1 scope decision, not an oversight; see the companion PRDs.
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, Upload, CheckCircle2, AlertCircle, Download } from 'lucide-react-native';
import * as DocumentPicker from 'expo-document-picker';
import Papa from 'papaparse';

import { Card } from '../../../design-system/components/atoms/Card';
import { Button } from '../../../design-system/components/atoms/Button';
import { RadioGroup } from '../../../design-system/components/atoms/RadioGroup';
import { DataTable, type DataTableRow } from '../../../design-system/components/atoms/DataTable';
import { useToast } from '../../../design-system/components/atoms/Toast';
import { theme } from '../../../design-system/foundations/theme';
import { typography } from '../../../design-system/foundations/typography';
import { kayoSpace, kayoBorder, kayoRadius, kayoColors } from '../../../design-system/foundations/tokens';
import { toCSV, shareCSV } from '../../../lib/csv';
import {
  validateImport,
  createImportJob,
  getImportJob,
  type ImportRowInput,
  type ImportValidationResultResponse,
  type ImportJobSnapshotResponse,
  type ImportResolution,
} from '../api/imports-api';

type WizardStep = 'intro' | 'scope' | 'upload' | 'duplicates' | 'complete';
type Scope = 'current' | 'choose' | 'all';

function normalizeMode(raw: string): string {
  const v = raw.trim().toLowerCase();
  if (v === 'partial' || v === 'pro-rated' || v === 'half') return 'partial';
  if (v === 'free' || v === 'trial') return 'free';
  return 'full';
}

function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.startsWith('91') && digits.length === 12) return `+${digits}`;
  if (digits.length === 10) return `+91${digits}`;
  return digits ? `+${digits}` : '';
}

function col(row: Record<string, string>, ...keys: string[]): string {
  for (const k of keys) {
    const v = row[k] ?? row[k.toLowerCase()] ?? row[k.replace(/_/g, '')] ?? '';
    if (v.trim()) return v.trim();
  }
  return '';
}

function parseRows(raw: Record<string, string>[]): ImportRowInput[] {
  return raw.map((row) => {
    const activeRaw = col(row, 'active');
    return {
      name: col(row, 'name', 'student_name', 'studentname'),
      fatherName: col(row, 'parent_name', 'parentname', 'parent') || undefined,
      fatherPhone: normalizePhone(col(row, 'parent_phone', 'parentphone', 'phone', 'mobile')) || undefined,
      joiningDate: col(row, 'joining_date', 'joiningdate', 'joined', 'date'),
      active: activeRaw.toLowerCase() !== 'false' && activeRaw !== '0',
      notes: col(row, 'notes', 'note', 'remarks') || undefined,
      branchName: col(row, 'branch', 'branch_name', 'branchname', 'location'),
      classTypeName: col(row, 'class_type', 'classtype', 'class', 'discipline'),
      monthlyFee: Number(col(row, 'monthly_fee', 'monthlyfee', 'fee').replace(/[^\d.]/g, '')) || 0,
      firstMonth: col(row, 'first_month', 'firstmonth', 'start_month'),
      firstMonthMode: normalizeMode(col(row, 'first_month_mode', 'firstmonthmode', 'mode')),
    };
  });
}

const TEMPLATE_HEADERS = [
  'name', 'parent_name', 'parent_phone', 'joining_date', 'branch', 'class_type',
  'monthly_fee', 'first_month', 'first_month_mode', 'active', 'notes',
];
const TEMPLATE_EXAMPLE_ROW = [
  'Arjun Sharma', 'Lakshmi Sharma', '9876543210', '2026-06-01', 'Main Branch', 'Karate',
  '1200', '2026-06', 'full', 'true', '',
];

const POLL_INTERVAL_MS = 1500;

export default function ImportScreen() {
  const toast = useToast();
  const params = useLocalSearchParams<{ entryContext?: string }>();
  const entryContext: 'onboarding' | 'settings' = params.entryContext === 'onboarding' ? 'onboarding' : 'settings';

  const [wizardStep, setWizardStep] = useState<WizardStep>(entryContext === 'onboarding' ? 'intro' : 'scope');
  const [scope, setScope] = useState<Scope>('current');

  const [rows, setRows] = useState<ImportRowInput[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);
  const [validating, setValidating] = useState(false);
  const [validation, setValidation] = useState<ImportValidationResultResponse | null>(null);
  const [importKey, setImportKey] = useState<string | null>(null);
  const [resolution, setResolution] = useState<ImportResolution>('skip');
  const [importing, setImporting] = useState(false);
  const [job, setJob] = useState<ImportJobSnapshotResponse | null>(null);

  const pollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mounted = useRef(true);
  useEffect(() => () => {
    mounted.current = false;
    if (pollTimer.current) clearTimeout(pollTimer.current);
  }, []);

  function downloadTemplate() {
    const exampleRow = scope === 'current' || scope === 'choose'
      ? TEMPLATE_EXAMPLE_ROW
      : TEMPLATE_EXAMPLE_ROW.map((v, i) => (i === 4 ? 'Any branch you have set up' : v));
    shareCSV('kaayo-import-template.csv', toCSV(TEMPLATE_HEADERS, [exampleRow])).catch((e) => {
      toast.show({ message: String((e as Error).message), tone: 'error' });
    });
  }

  async function pickFile() {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['text/csv', 'text/comma-separated-values', 'application/csv', '*/*'],
        copyToCacheDirectory: true,
      });
      if (result.canceled) return;
      const asset = result.assets[0];
      setFileName(asset.name);
      setJob(null);
      setValidation(null);
      setImportKey(null);

      const response = await fetch(asset.uri);
      const text = await response.text();

      Papa.parse<Record<string, string>>(text, {
        header: true,
        skipEmptyLines: true,
        complete: async (results) => {
          const parsed = parseRows(results.data);
          setRows(parsed);
          await runValidate(parsed);
        },
        error: (err: { message: string }) => {
          toast.show({ message: `Could not read that file: ${err.message}`, tone: 'error' });
        },
      });
    } catch (e) {
      toast.show({ message: String((e as Error).message), tone: 'error' });
    }
  }

  async function runValidate(parsed: ImportRowInput[]) {
    if (parsed.length === 0) return;
    setValidating(true);
    try {
      const result = await validateImport(parsed);
      setValidation(result);
      setImportKey(`import-${Date.now()}-${Math.random().toString(36).slice(2)}`);
    } catch (e) {
      toast.show({ message: String((e as Error).message), tone: 'error' });
    } finally {
      setValidating(false);
    }
  }

  function pollJob(jobId: string) {
    pollTimer.current = setTimeout(async () => {
      try {
        const snapshot = await getImportJob(jobId);
        if (!mounted.current) return;
        setJob(snapshot);
        if (snapshot.status === 'completed') {
          setImporting(false);
          setWizardStep('complete');
        } else {
          pollJob(jobId);
        }
      } catch (e) {
        if (!mounted.current) return;
        setImporting(false);
        toast.show({ message: String((e as Error).message), tone: 'error' });
      }
    }, POLL_INTERVAL_MS);
  }

  async function runImport(chosenResolution: ImportResolution) {
    if (!validation || !importKey) return;
    if (validation.validCount === 0 && validation.duplicateCount === 0) return;
    setImporting(true);
    setJob(null);
    try {
      const snapshot = await createImportJob(rows, importKey, chosenResolution);
      setJob(snapshot);
      if (snapshot.status === 'completed') {
        setImporting(false);
        setWizardStep('complete');
      } else {
        pollJob(snapshot.id);
      }
    } catch (e) {
      setImporting(false);
      toast.show({ message: String((e as Error).message), tone: 'error' });
    }
  }

  function handleStartImport() {
    if (!validation) return;
    if (validation.duplicateCount > 0) {
      setWizardStep('duplicates');
    } else {
      runImport('skip');
    }
  }

  const errorRows = validation?.rows.filter((r) => r.status === 'error') ?? [];
  const duplicateRows = validation?.rows.filter((r) => r.status === 'duplicate') ?? [];
  const validRows = validation?.rows.filter((r) => r.status === 'valid') ?? [];

  function backLabel(): string {
    return entryContext === 'onboarding' ? 'Dashboard' : 'Settings';
  }

  function goBack() {
    if (entryContext === 'onboarding') router.replace('/dashboard');
    else router.back();
  }

  // ─── Intro (onboarding entry only) ───────────────────────────────────────
  if (wizardStep === 'intro') {
    return (
      <ScrollView contentContainerStyle={styles.scroll} testID="import-intro-scroll">
        <Pressable onPress={goBack} style={styles.backBtn} hitSlop={8}>
          <ChevronLeft size={20} color={theme.text.primary} strokeWidth={2.25} />
          <Text style={[typography.label_lg, { color: theme.text.primary }]}>{backLabel()}</Text>
        </Pressable>
        <Text style={[typography.heading_h2, { color: theme.text.primary }]}>Bring in your roster</Text>
        <Text style={[typography.body_sm, { color: theme.text.secondary }]}>
          Download a template, fill it with your students, and upload it here. We will check
          every row before anything is created.
        </Text>
        <Button label="Start Import" variant="primary" size="lg" fullWidth onPress={() => setWizardStep('upload')} testID="start-import-btn" />
      </ScrollView>
    );
  }

  // ─── Choose Scope (settings entry only) ──────────────────────────────────
  if (wizardStep === 'scope') {
    return (
      <ScrollView contentContainerStyle={styles.scroll} testID="import-scope-scroll">
        <Pressable onPress={goBack} style={styles.backBtn} hitSlop={8}>
          <ChevronLeft size={20} color={theme.text.primary} strokeWidth={2.25} />
          <Text style={[typography.label_lg, { color: theme.text.primary }]}>{backLabel()}</Text>
        </Pressable>
        <Text style={[typography.heading_h2, { color: theme.text.primary }]}>Import students</Text>
        <Text style={[typography.body_sm, { color: theme.text.secondary }]}>Which branches does this import cover?</Text>
        <RadioGroup
          testID="import-scope-picker"
          value={scope}
          onChange={(v) => setScope(v as Scope)}
          options={[
            { value: 'current', label: 'My current branch' },
            { value: 'choose', label: 'A specific branch' },
            { value: 'all', label: 'All branches' },
          ]}
        />
        <Button label="Continue" variant="primary" size="lg" fullWidth onPress={() => setWizardStep('upload')} testID="scope-continue-btn" />
      </ScrollView>
    );
  }

  // ─── Resolve Duplicates ───────────────────────────────────────────────────
  if (wizardStep === 'duplicates') {
    return (
      <ScrollView contentContainerStyle={styles.scroll} testID="import-duplicates-scroll">
        <Text style={[typography.heading_h2, { color: theme.text.primary }]}>
          {duplicateRows.length} row{duplicateRows.length > 1 ? 's' : ''} already exist
        </Text>
        <Text style={[typography.body_sm, { color: theme.text.secondary }]}>
          Choose how to handle every duplicate row in this file. This applies to all {duplicateRows.length} at once.
        </Text>
        <RadioGroup
          testID="duplicate-resolution-picker"
          value={resolution}
          onChange={(v) => setResolution(v as ImportResolution)}
          options={[
            { value: 'skip', label: 'Skip — leave existing students untouched' },
            { value: 'update', label: 'Update — add this enrollment to the existing student' },
            { value: 'create', label: 'Create new — add as a separate student record' },
          ]}
        />
        <Button
          label={`Apply to ${duplicateRows.length} Duplicate${duplicateRows.length > 1 ? 's' : ''}`}
          variant="primary"
          size="lg"
          fullWidth
          loading={importing}
          onPress={() => runImport(resolution)}
          testID="apply-duplicate-resolution-btn"
        />
      </ScrollView>
    );
  }

  // ─── Complete ─────────────────────────────────────────────────────────────
  if (wizardStep === 'complete' && job) {
    return (
      <ScrollView contentContainerStyle={styles.scroll} testID="import-complete-scroll">
        <View style={styles.doneRow}>
          <CheckCircle2 size={28} color={kayoColors.positive[600]} strokeWidth={2} />
          <Text style={[typography.heading_h2, { color: theme.text.primary }]}>Import Complete</Text>
        </View>
        <View style={styles.statsGrid}>
          {[
            ['Created', job.createdCount],
            ['Updated', job.updatedCount],
            ['Skipped (duplicates)', job.skippedCount],
            ['Failed', job.failedCount],
          ].map(([label, count]) => (
            <Card key={label} padding="md" style={styles.statCard}>
              <Text style={[typography.heading_h3, { color: theme.text.primary }]}>{count}</Text>
              <Text style={[typography.body_sm, { color: theme.text.secondary }]}>{label}</Text>
            </Card>
          ))}
        </View>
        {job.rowErrors.length > 0 && (
          <Card padding="md">
            <Text style={[typography.label_sm, { color: theme.status.overdue.fg, marginBottom: kayoSpace[2] }]}>
              Rows that need attention
            </Text>
            {job.rowErrors.slice(0, 10).map((r, i) => (
              <Text key={i} style={[typography.body_sm, { color: theme.text.secondary, marginTop: 4 }]}>
                Row &quot;{r.name || '?'}&quot;: {r.errors.join('; ')}
              </Text>
            ))}
          </Card>
        )}
        <Button
          label={entryContext === 'onboarding' ? 'Go to Dashboard' : 'View Students'}
          variant="primary"
          size="lg"
          fullWidth
          onPress={() => router.replace(entryContext === 'onboarding' ? '/dashboard' : '/students')}
          testID="import-complete-primary-btn"
        />
        {entryContext === 'settings' && (
          <Button
            label="Import more"
            variant="secondary"
            fullWidth
            onPress={() => {
              setJob(null);
              setRows([]);
              setFileName(null);
              setValidation(null);
              setWizardStep('upload');
            }}
            testID="import-more-btn"
          />
        )}
      </ScrollView>
    );
  }

  // ─── Upload + consolidated preview ───────────────────────────────────────
  const previewData: DataTableRow[] = (validation?.rows ?? []).map((r) => ({
    id: String(r.rowIndex),
    name: r.name || '—',
    status: (
      <Text style={[
        typography.utility_badge_tiny,
        { color: r.status === 'valid' ? kayoColors.positive[600] : r.status === 'duplicate' ? theme.text.tertiary : theme.status.overdue.fg },
      ]}>
        {r.status.toUpperCase()}
      </Text>
    ),
    details: r.status === 'error' ? r.errors.join('; ') : rows[r.rowIndex]
      ? `${rows[r.rowIndex].branchName} · ${rows[r.rowIndex].classTypeName} · ₹${rows[r.rowIndex].monthlyFee}`
      : '',
  }));

  return (
    <ScrollView contentContainerStyle={styles.scroll} testID="import-scroll">
      <Pressable onPress={goBack} style={styles.backBtn} hitSlop={8}>
        <ChevronLeft size={20} color={theme.text.primary} strokeWidth={2.25} />
        <Text style={[typography.label_lg, { color: theme.text.primary }]}>{backLabel()}</Text>
      </Pressable>

      <View>
        <Text style={[typography.heading_h2, { color: theme.text.primary }]}>Import students</Text>
        <Text style={[typography.body_sm, { color: theme.text.secondary, marginTop: kayoSpace[1] }]}>
          Download the template, fill it in, then upload your sheet.
        </Text>
      </View>

      <Button
        label="Download template"
        variant="secondary"
        iconLeft={<Download size={16} color={theme.text.primary} strokeWidth={2.25} />}
        onPress={downloadTemplate}
        testID="download-template-btn"
      />

      <Button
        label={fileName ? `Picked: ${fileName}` : 'Upload your sheet'}
        variant="secondary"
        iconLeft={<Upload size={16} color={theme.text.primary} strokeWidth={2.25} />}
        onPress={pickFile}
        loading={validating}
        testID="pick-file-btn"
      />

      {errorRows.length > 0 && (
        <Card padding="md">
          <View style={styles.doneRow}>
            <AlertCircle size={18} color={theme.status.overdue.fg} strokeWidth={2} />
            <Text style={[typography.label_sm, { color: theme.status.overdue.fg }]}>
              {errorRows.length} row{errorRows.length > 1 ? 's' : ''} have errors and will be skipped.
              Fix your sheet and upload it again.
            </Text>
          </View>
        </Card>
      )}

      {validation && previewData.length > 0 && (
        <>
          <Text style={[typography.label_lg, { color: theme.text.primary }]}>
            Preview — {validRows.length} valid, {duplicateRows.length} duplicate, {errorRows.length} error
          </Text>
          <DataTable
            columns={[
              { key: 'name', label: 'Student', flex: 1.2 },
              { key: 'status', label: 'Status', flex: 0.8 },
              { key: 'details', label: 'Details', flex: 1.5 },
            ]}
            data={previewData.slice(0, 25)}
          />
          <Button
            label={`Continue with ${validRows.length + duplicateRows.length} row${validRows.length + duplicateRows.length === 1 ? '' : 's'}`}
            variant="primary"
            loading={importing}
            disabled={validRows.length + duplicateRows.length === 0}
            onPress={handleStartImport}
            testID="run-import-btn"
          />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { gap: kayoSpace[5], paddingBottom: kayoSpace[10] },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: kayoSpace[1], alignSelf: 'flex-start' },
  doneRow: { flexDirection: 'row', alignItems: 'center', gap: kayoSpace[2] },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: kayoSpace[3] },
  statCard: { flexBasis: '47%', alignItems: 'center', gap: kayoSpace[1] },
});
```

- [ ] **Step 5: Verify**

```bash
cd frontend && npx tsc --noEmit
```

Expected: zero new errors. (Verify the exact export name for `DataTableRow` against `DataTable.tsx` — it is declared there as `export interface DataTableRow`, so the import in Step 4 is correct as written.)

- [ ] **Step 6: Manual run-through (both entry points)**

**Settings entry** (`Settings → Import Students`, no query param): confirm the Scope step shows first (3 options), then Upload; download the template, open it in a spreadsheet app to confirm headers/example row are sensible, fill in a few rows with one duplicate name (matching an existing student) and one row with a missing required field, save as `.csv`, upload it; confirm the consolidated preview table shows one row per status with correct color-coded badges; tap Continue, confirm the Resolve Duplicates step appears, try each of Skip/Update/Create against a fresh upload and confirm the resulting student/enrollment counts in Settings → Students match what was chosen; confirm the Complete screen's stat grid matches; confirm "Import more" returns to Upload with a clean slate.

**Onboarding entry** (`/settings/import?entryContext=onboarding`, reached via Task 11's modal): confirm Intro shows first and Scope is skipped; confirm the Complete screen's primary button reads "Go to Dashboard" and there is no "Import more" button.

- [ ] **Step 7: Commit**

```bash
git add frontend/lib/csv.ts frontend/features/settings/screens/ExportScreen.tsx frontend/features/settings/api/imports-api.ts frontend/features/settings/screens/ImportScreen.tsx
git commit -m "feat(imports): rebuild Import Students into an entryContext-parameterized wizard"
```

/**
 * DeleteGuardSheet — blocking confirmation shown when a delete is rejected
 * because enrollments still reference the entity (branch / class type).
 * Centered Dialog (size="sm"), not a slide-up sheet — see Dialog for rationale.
 */
import React from 'react';
import { Text } from 'react-native';
import { router } from 'expo-router';

import { Dialog } from '../atoms/Dialog';
import { Button } from '../atoms/Button';
import { theme } from '../../foundations/theme';
import { typography } from '../../foundations/typography';
import { kayoSpace } from '../../foundations/tokens';

export interface DeleteGuardSheetProps {
  visible: boolean;
  onClose: () => void;
  entityLabel: string; // "branch" | "class type"
  enrollmentCount: number;
  studentsListHref: string; // where "View Students" should navigate
  testID?: string;
}

export function DeleteGuardSheet({
  visible,
  onClose,
  entityLabel,
  enrollmentCount,
  studentsListHref,
  testID,
}: DeleteGuardSheetProps) {
  return (
    <Dialog
      visible={visible}
      onClose={onClose}
      title={`Cannot delete this ${entityLabel}`}
      size="sm"
      testID={testID}
      footer={
        <>
          <Button label="Cancel" variant="secondary" onPress={onClose} />
          <Button
            label="View Students"
            variant="primary"
            onPress={() => {
              onClose();
              router.push(studentsListHref as never);
            }}
          />
        </>
      }
    >
      <Text style={[typography.body_base, { color: theme.text.secondary, marginBottom: kayoSpace[1] }]}>
        {enrollmentCount} student{enrollmentCount === 1 ? '' : 's'} {enrollmentCount === 1 ? 'is' : 'are'} enrolled
        here. Reassign or remove all students before deleting.
      </Text>
    </Dialog>
  );
}

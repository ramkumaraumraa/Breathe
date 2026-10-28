/** Pure progress maths for Stepper (kept separate so it is unit-testable). */
export type StepState = 'complete' | 'active' | 'open';

export function stepperProgress(
  steps: { key: string }[],
  activeKey: string,
  completeKeys: string[],
) {
  const activeIndex = Math.max(0, steps.findIndex((s) => s.key === activeKey));
  const states: StepState[] = steps.map((s, i) =>
    i === activeIndex ? 'active' : completeKeys.includes(s.key) ? 'complete' : 'open',
  );
  let run = -1;
  while (run + 1 < steps.length && completeKeys.includes(steps[run + 1].key)) run++;
  return { states, activeIndex, completeRunEnd: Math.min(run, activeIndex) };
}

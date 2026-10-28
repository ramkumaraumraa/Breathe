import { stepperProgress } from '../../src/kaayo/components/molecules/stepper-progress';

const steps = ['a', 'b', 'c', 'd'].map((key) => ({ key, label: key }));

describe('stepperProgress', () => {
  it('no complete steps', () => {
    const r = stepperProgress(steps, 'b', []);
    expect(r.states).toEqual(['open', 'active', 'open', 'open']);
    expect(r.activeIndex).toBe(1);
    expect(r.completeRunEnd).toBe(-1);
  });
  it('leading run of complete steps', () => {
    const r = stepperProgress(steps, 'd', ['a', 'b']);
    expect(r.states).toEqual(['complete', 'complete', 'open', 'active']);
    expect(r.completeRunEnd).toBe(1);
  });
  it('gap ends the run', () => {
    expect(stepperProgress(steps, 'd', ['a', 'c']).completeRunEnd).toBe(0);
  });
  it('run beyond active is capped; active stays active when complete', () => {
    const r = stepperProgress(steps, 'b', ['a', 'b', 'c']);
    expect(r.completeRunEnd).toBe(1);
    expect(r.states[1]).toBe('active');
  });
  it('unknown activeKey falls back to index 0', () => {
    const r = stepperProgress(steps, 'zzz', ['a']);
    expect(r.activeIndex).toBe(0);
    expect(r.states[0]).toBe('active');
  });
});


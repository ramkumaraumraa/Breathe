import * as kaayo from '../../src/kaayo';

describe('@aumraa/breathe-native/kaayo public API', () => {
  it('exports foundations', () => {
    expect(kaayo.kayoColors).toBeDefined();
    expect(kaayo.kayoSpace).toBeDefined();
    expect(kaayo.kayoRadius).toBeDefined();
    expect(kaayo.kayoShadow).toBeDefined();
    expect(kaayo.kayoClay).toBeDefined();
    expect(kaayo.kayoMotion).toBeDefined();
    expect(kaayo.kayoGrid).toBeDefined();
    expect(kaayo.theme).toBeDefined();
    expect(kaayo.typography).toBeDefined();
    expect(kaayo.notifier).toBeDefined();
  });

  it('exports core atoms', () => {
    expect(kaayo.Button).toBeDefined();
    expect(kaayo.Card).toBeDefined();
    expect(kaayo.Badge).toBeDefined();
    expect(kaayo.Chip).toBeDefined();
    expect(kaayo.Input).toBeDefined();
    expect(kaayo.Dialog).toBeDefined();
    expect(kaayo.ToastHost).toBeDefined();
    expect(kaayo.useToast).toBeDefined();
    expect(kaayo.StatusDot).toBeDefined();
    expect(kaayo.ClayKnob).toBeDefined();
    expect(kaayo.ClayGrooveTrack).toBeDefined();
    expect(kaayo.ClayGrooveSplit).toBeDefined();
    expect(kaayo.ClayGrooveToggle).toBeDefined();
    expect(kaayo.WarliVeil).toBeDefined();
    expect(kaayo.BranchTabs).toBeDefined();
  });

  it('exports core molecules', () => {
    expect(kaayo.Tabs).toBeDefined();
    expect(kaayo.NotificationBanner).toBeDefined();
    expect(kaayo.WeekStrip).toBeDefined();
    expect(kaayo.MonthPicker).toBeDefined();
    expect(kaayo.ClayDial).toBeDefined();
    expect(kaayo.Stepper).toBeDefined();
    expect(kaayo.PushedScreenHeader).toBeDefined();
  });

  it('exports core organisms and templates', () => {
    expect(kaayo.KaayoTabBar).toBeDefined();
    expect(kaayo.CanopyBand).toBeDefined();
    expect(kaayo.QuickActionsFab).toBeDefined();
    expect(kaayo.AppShell).toBeDefined();
    expect(kaayo.AuthShell).toBeDefined();
    expect(kaayo.BiometricShield).toBeDefined();
  });
});

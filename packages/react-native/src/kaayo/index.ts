/**
 * Kaayo Design System — public barrel.
 * New feature-module code should import from here (`@/design-system`)
 * rather than reaching into design-system/foundations or design-system/components directly.
 * Existing call sites predate this barrel and were intentionally left on direct paths (see plan).
 */

// Foundations
export * from './foundations/tokens';
export * from './foundations/theme';
export * from './foundations/typography';
export * from './foundations/notifier';

// Atoms
export * from './components/atoms/AddSlot';
export * from './components/atoms/Alert';
export * from './components/atoms/AmountVisibilityToggle';
export * from './components/atoms/Avatar';
export * from './components/atoms/Badge';
export * from './components/atoms/BranchTabs';
export * from './components/atoms/Button';
export * from './components/atoms/Card';
export * from './components/atoms/Checkbox';
export * from './components/atoms/Chip';
export * from './components/atoms/ChoiceChip';
export * from './components/atoms/ClayGroove';
export * from './components/atoms/ClayKnob';
export * from './components/atoms/ClayPill';
export * from './components/atoms/EnrollmentTag';
export * from './components/atoms/DataTable';
export * from './components/atoms/Dialog';
export * from './components/atoms/EmptyState';
export * from './components/atoms/Input';
export * from './components/atoms/KaayoLoader';
export * from './components/atoms/KaayoLogo';
export * from './components/atoms/MonthStamp';
export * from './components/atoms/PaymentSummaryCard';
export * from './components/atoms/PhotoViewer';
export * from './components/atoms/PhotoWell';
export * from './components/atoms/Progress';
export * from './components/atoms/RadioGroup';
export * from './components/atoms/SegmentRing';
export * from './components/atoms/Select';
export * from './components/atoms/Separator';
export * from './components/atoms/Skeleton';
export * from './components/atoms/StatusDot';
export * from './components/atoms/StudentAvatar';
export * from './components/atoms/Switch';
export * from './components/atoms/TabFilter';
export * from './components/atoms/Toast';
export * from './components/atoms/WarliVeil';

// Molecules
export * from './components/molecules/ChipMultiSelect';
export * from './components/molecules/ClayDial';
export * from './components/molecules/DateField';
export * from './components/molecules/DeleteGuardSheet';
export * from './components/molecules/GroupMessageSheet';
export * from './components/molecules/InsetSearchField';
export * from './components/molecules/KhataFolder';
export * from './components/molecules/MonthCalendarSheet';
export * from './components/molecules/MonthField';
export * from './components/molecules/MonthPicker';
export * from './components/molecules/NotificationBanner';
export * from './components/molecules/PushedScreenHeader';
export * from './components/molecules/ScreenFooterButton';
export * from './components/molecules/SecondaryTabs';
export * from './components/molecules/Stepper';
export * from './components/molecules/Tabs';
export * from './components/molecules/TimeField';
export * from './components/molecules/WeekStrip';
export * from './components/molecules/WhatsAppPrefPicker';
export * from './components/molecules/WhatsAppSendModal';

// Organisms
export * from './components/organisms/BrandedScreenBackdrop';
export * from './components/organisms/CanopyBand';
export * from './components/organisms/KaayoTabBar';
export * from './components/organisms/QuickActionsFab';

// Templates
export * from './components/templates/AppErrorBoundary';
export * from './components/templates/AppShell';
export * from './components/templates/AuthShell';
export * from './components/templates/BiometricShield';
export * from './components/templates/SetupShell';

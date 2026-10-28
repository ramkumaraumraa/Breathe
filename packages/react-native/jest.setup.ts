require('react-native-gesture-handler/jestSetup');
jest.mock('react-native-worklets', () => require('react-native-worklets/src/mock'));
require('react-native-reanimated').setUpTests();

// NativeWind v5 rewrites imports in Metro only. In Jest `className` is a plain prop,
// so `styled()` can be the identity. This mock replaces the *entire* `nativewind` module —
// any future import besides `styled` (e.g. `vars`, `cssInterop`) must be added here too.
jest.mock('nativewind', () => ({ styled: jest.fn((Component: unknown) => Component) }));

jest.mock('react-native-screens', () => {
  const mockReact = require('react');
  return { FullWindowOverlay: ({ children }: { children: unknown }) => mockReact.createElement(mockReact.Fragment, null, children) };
});

// Every lucide icon renders as a View tagged `icon-<Name>` so tests can find it.
// Each component is cached on the target so repeated reads return the same reference
// (e.g. `Check === Check`); symbol keys and `then` (module-interop probes, which would
// otherwise make the mocked module thenable) pass through untouched.
jest.mock('lucide-react-native', () => {
  const mockReact = require('react');
  const { View: MockView } = require('react-native');
  return new Proxy(
    { __esModule: true },
    {
      get: (target: Record<string | symbol, unknown>, name: string | symbol) =>
        name in target || typeof name === 'symbol' || name === 'then'
          ? target[name]
          : (target[name] = (props: object) =>
              mockReact.createElement(MockView, { testID: `icon-${String(name)}`, ...props })),
    },
  );
});

// Deep-imported icons (`lucide-react-native/icons/<kebab-name>`) bypass the index mock above,
// so each one needs its own line here, reusing the index mock's `icon-<Name>` component.
jest.mock('lucide-react-native/icons/loader-circle', () => ({
  __esModule: true,
  default: jest.requireMock('lucide-react-native').Loader2,
}));
jest.mock('lucide-react-native/icons/check', () => ({
  __esModule: true,
  default: jest.requireMock('lucide-react-native').Check,
}));
jest.mock('lucide-react-native/icons/chevron-down', () => ({
  __esModule: true,
  default: jest.requireMock('lucide-react-native').ChevronDown,
}));
jest.mock('lucide-react-native/icons/dot', () => ({
  __esModule: true,
  default: jest.requireMock('lucide-react-native').Dot,
}));
jest.mock('lucide-react-native/icons/chevron-left', () => ({
  __esModule: true,
  default: jest.requireMock('lucide-react-native').ChevronLeft,
}));
jest.mock('expo-local-authentication', () => ({
  hasHardwareAsync: jest.fn().mockResolvedValue(false),
  isEnrolledAsync: jest.fn().mockResolvedValue(false),
  authenticateAsync: jest.fn().mockResolvedValue({ success: false }),
  cancelAuthenticate: jest.fn().mockResolvedValue(undefined),
  AuthenticationType: { FINGERPRINT: 1, FACIAL_RECOGNITION: 2, IRIS: 3 },
}));

jest.mock('@sentry/react-native', () => ({
  captureException: jest.fn(),
  wrap: (c: unknown) => c,
  init: jest.fn(),
}));

jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    canGoBack: jest.fn(() => true),
    setParams: jest.fn(),
  },
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useIsFocused: () => true,
  Tabs: Object.assign(
    ({ children }: { children: unknown }) => children,
    { Screen: ({ children }: { children: unknown }) => children }
  ),
}));

jest.mock('expo-image', () => {
  const mockReact = require('react');
  const { View: MockView } = require('react-native');
  return {
    Image: (props: object) => mockReact.createElement(MockView, { testID: 'expo-image', ...props }),
  };
});

jest.mock('lucide-react-native/icons/chevron-right', () => ({
  __esModule: true,
  default: jest.requireMock('lucide-react-native').ChevronRight,
}));

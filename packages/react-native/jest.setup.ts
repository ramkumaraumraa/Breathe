jest.mock('react-native-worklets', () => require('react-native-worklets/src/mock'));
require('react-native-reanimated').setUpTests();

// NativeWind v5 rewrites imports in Metro only. In Jest `className` is a plain prop,
// so `styled()` can be the identity. This mock replaces the *entire* `nativewind` module —
// any future import besides `styled` (e.g. `vars`, `cssInterop`) must be added here too.
jest.mock('nativewind', () => ({ styled: (Component: unknown) => Component }));

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

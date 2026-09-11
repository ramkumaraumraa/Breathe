const { getDefaultConfig } = require('expo/metro-config');
const { withNativewind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);
const nativewindConfig = withNativewind(config);

// react-native-worklets calls require.resolveWeak('react-native') to find the real RN module id.
// NativeWind's resolver redirects `react-native` to react-native-css/components/index.cjs, which is
// never bundled, so `expo export` fails with "Chunk containing module not found". Weak references
// resolve without the redirect; everything else goes through NativeWind.
const nativewindResolve = nativewindConfig.resolver.resolveRequest;
nativewindConfig.resolver.resolveRequest = (context, moduleName, platform) =>
  context.dependency?.data?.asyncType === 'weak'
    ? (config.resolver.resolveRequest ?? context.resolveRequest)(context, moduleName, platform)
    : nativewindResolve(context, moduleName, platform);

module.exports = nativewindConfig;

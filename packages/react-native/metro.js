const path = require('path');
const { withNativewind } = require('nativewind/metro');

/**
 * withNativewind plus the worklets fix every consumer needs:
 *   module.exports = withBreatheNative(getDefaultConfig(__dirname));
 *
 * react-native-worklets calls require.resolveWeak('react-native'). NativeWind redirects 'react-native'
 * to react-native-css's CJS components copy, which nothing else bundles, so `expo export` fails with
 * "Chunk containing module not found". Worklets never renders className components, so its
 * 'react-native' imports skip the redirect. Remove once react-native-css handles resolveWeak.
 */
function withBreatheNative(config) {
  // Captured before withNativewind runs, so the exemption can't recurse into NativeWind's
  // resolver if a future version mutates config.resolver in place.
  const parentResolve = config.resolver.resolveRequest;
  const nativewindConfig = withNativewind(config);
  const nativewindResolve = nativewindConfig.resolver.resolveRequest;

  const WORKLETS = `${path.sep}react-native-worklets${path.sep}`;
  nativewindConfig.resolver.resolveRequest = (context, moduleName, platform) =>
    moduleName === 'react-native' && context.originModulePath.includes(WORKLETS)
      ? (parentResolve ?? context.resolveRequest)(context, moduleName, platform)
      : nativewindResolve(context, moduleName, platform);

  return nativewindConfig;
}

module.exports = { withBreatheNative };

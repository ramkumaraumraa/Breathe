const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');
const { withNativewind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);
const nativewindConfig = withNativewind(config);
const nativewindResolve = nativewindConfig.resolver.resolveRequest;

// react-native-worklets calls require.resolveWeak('react-native'). NativeWind redirects 'react-native'
// to react-native-css's CJS components copy, which nothing else bundles, so `expo export` fails with
// "Chunk containing module not found". Worklets never renders className components, so its
// 'react-native' imports skip the redirect. Remove once react-native-css handles resolveWeak.
const WORKLETS = `${path.sep}react-native-worklets${path.sep}`;
nativewindConfig.resolver.resolveRequest = (context, moduleName, platform) =>
  moduleName === 'react-native' && context.originModulePath.includes(WORKLETS)
    ? (config.resolver.resolveRequest ?? context.resolveRequest)(context, moduleName, platform)
    : nativewindResolve(context, moduleName, platform);

module.exports = nativewindConfig;

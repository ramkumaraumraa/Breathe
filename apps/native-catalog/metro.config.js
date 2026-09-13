const { getDefaultConfig } = require('expo/metro-config');
const { withBreatheNative } = require('@aumraa/breathe-native/metro');

module.exports = withBreatheNative(getDefaultConfig(__dirname));

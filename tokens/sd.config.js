import StyleDictionary from 'style-dictionary';

StyleDictionary.registerTransform({
  name: 'breathe/size/px',
  type: 'value',
  filter: (token) => token.type === 'dimension',
  transform: (token) => (token.value === '0' || token.value === 0 ? '0' : `${token.value}px`),
});

StyleDictionary.registerTransform({
  name: 'breathe/duration/ms',
  type: 'value',
  filter: (token) => token.type === 'duration',
  transform: (token) => `${token.value}ms`,
});

StyleDictionary.registerTransform({
  name: 'breathe/size/number',
  type: 'value',
  filter: (token) => token.type === 'dimension',
  transform: (token) => Number(token.value),
});

StyleDictionary.registerTransformGroup({
  name: 'breathe/web',
  transforms: ['attribute/cti', 'name/kebab', 'breathe/size/px', 'breathe/duration/ms', 'color/css', 'fontFamily/css'],
});

StyleDictionary.registerTransformGroup({
  name: 'breathe/react-native',
  transforms: ['attribute/cti', 'name/pascal', 'breathe/size/number', 'color/css'],
});

StyleDictionary.registerTransformGroup({
  name: 'breathe/ios-swift',
  transforms: ['attribute/cti', 'name/camel', 'color/UIColorSwift', 'content/swift/literal', 'asset/swift/literal', 'breathe/size/number'],
});

const products = [
  { name: 'lemniscate', prefix: 'lmns', platforms: ['web'] },
  { name: 'technocracy', prefix: 'tech', platforms: ['web'] },
  { name: 'aumraa', prefix: 'amra', platforms: ['web'] },
  { name: 'yakaizen', prefix: 'ykai', platforms: ['web', 'reactNative', 'ios', 'android'] },
];

for (const product of products) {
  const config = {
    source: ['tokens/src/global.json', `tokens/src/${product.name}.json`],
    platforms: {},
  };

  if (product.platforms.includes('web')) {
    config.platforms.web = {
      transformGroup: 'breathe/web',
      buildPath: 'tokens/dist/web/',
      files: [
        {
          destination: `${product.name}.css`,
          format: 'css/variables',
          options: {
            selector: ':root',
          },
          filter: (token) =>
            token.path[0] === product.prefix ||
            token.path[0] === 'color' ||
            token.path[0] === 'font' ||
            token.path[0] === 'spacing' ||
            token.path[0] === 'radius' ||
            token.path[0] === 'shadow' ||
            token.path[0] === 'icon' ||
            token.path[0] === 'duration',
        },
      ],
    };
  }

  if (product.platforms.includes('reactNative')) {
    config.platforms.reactNative = {
      transformGroup: 'breathe/react-native',
      buildPath: 'tokens/dist/react-native/',
      files: [
        {
          destination: `${product.name}.ts`,
          format: 'javascript/es6',
          filter: (token) => token.path[0] === product.prefix,
        },
      ],
    };
  }

  if (product.platforms.includes('ios')) {
    const className = `${product.name.charAt(0).toUpperCase() + product.name.slice(1)}Tokens`;
    config.platforms.ios = {
      transformGroup: 'breathe/ios-swift',
      buildPath: 'tokens/dist/ios/',
      files: [
        {
          destination: `${className}.swift`,
          format: 'ios-swift/class.swift',
          filter: (token) => token.path[0] === product.prefix,
          options: { className, import: 'UIKit' },
        },
      ],
    };
  }

  if (product.platforms.includes('android')) {
    config.platforms.android = {
      transformGroup: 'android',
      buildPath: `tokens/dist/android/${product.name}/`,
      files: [
        {
          destination: 'colors.xml',
          format: 'android/colors',
          filter: (token) => token.path[0] === product.prefix && token.type === 'color',
        },
      ],
    };
  }

  const sd = new StyleDictionary(config);
  await sd.buildAllPlatforms();
}

console.log('\n✅ Style Dictionary build complete - all token outputs generated.\n');

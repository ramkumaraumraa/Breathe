module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['<rootDir>/test/**/*.test.ts?(x)'],
  transformIgnorePatterns: [
    // pnpm's store spells scoped packages with `+` (e.g. `.pnpm/@rn-primitives+slot@1.5.2_.../node_modules/@rn-primitives/slot`),
    // so scoped alternatives must match either `/` or `+` after the scope.
    'node_modules/(?!(?:\\.pnpm/)?((jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?[/+]|@rn-primitives[/+]|lucide-react-native|nativewind|react-native-css))',
    // jest-expo's own preset (packages/react-native/node_modules/jest-expo/jest-preset.js) sets these two
    // alongside its default transformIgnorePatterns; since setting the option above replaces the whole
    // array rather than merging, they're restored here.
    '/node_modules/react-native-reanimated/plugin/',
    '/node_modules/@react-native/babel-preset/',
  ],
};

// enableBabelRuntime: false — babel-preset-expo otherwise emits `@babel/runtime/helpers/*`
// imports, which aren't resolvable from this package under pnpm's isolated linker.
module.exports = { presets: [['babel-preset-expo', { enableBabelRuntime: false }]] };

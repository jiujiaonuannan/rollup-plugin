const path = require('path')
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

// rollup.config.js
// 以下注释是为了能使用 VSCode 的类型提示
/**
 * @type { import('rollup').RollupOptions }
 */
const buildOptions = {
  input: ["src/index.js", "src/utils.js"],
	dir: path.resolve(__dirname, 'dist'),
  output: [{
    // 产物输出目录
    dir: "dist/es",
    // 产物格式
    format: "esm",
  }, {
      dir: "dist/cjs",
      format: "cjs",
	}],
	entryFileNames: `[name].js`,
  // 非入口模块(如动态 import)的输出文件名
  chunkFileNames: 'chunk-[hash].js',
  // 静态资源文件输出文件名
  assetFileNames: 'assets/[name]-[hash][extname]',
  // 产物输出格式，包括`amd`、`cjs`、`es`、`iife`、`umd`、`system`
  format: 'cjs',
  // 是否生成 sourcemap 文件
  sourcemap: true,
  // 如果是打包出 iife/umd 格式，需要对外暴露出一个全局变量，通过 name 配置变量名
  name: 'MyBundle',
	external: ['react', 'react-dom'],
  // 全局变量声明
  globals: {
    // 项目中可以直接用`$`代替`jquery`
    jquery: '$'
  },
	// 通过 plugins 参数添加插件
	plugins: [resolve(), commonjs()],
};

export default buildOptions;

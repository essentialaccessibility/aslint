import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';
import html from 'rollup-plugin-html';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import visualizer from 'rollup-plugin-visualizer';

let defaults = { compilerOptions: { declaration: true } };
let override = { compilerOptions: { declaration: false, module: 'es6' } };

const config = {
  input: 'app/index.ts', // our source file
  output: [
    {
      exports: 'named',
      file: './dist/aslint.bundle.js',
      format: 'iife',
      name: 'aslint'
    }
  ],
  plugins: [
    html({
      include: '**/*.html'
    }),
    commonjs({
      // non-CommonJS modules will be ignored, but you can also
      // specifically include/exclude files
      include: ['./index.js', 'node_modules/**'], // Default: undefined

      // if true then uses of `global` won't be dealt with by this plugin
      ignoreGlobal: false, // Default: false

      // if false then skip sourceMap generation for CommonJS modules
      sourceMap: false // Default: true
    }),
    resolve({ preferBuiltins: true }),
    typescript({
      clean: process.env.BUILD === 'development' || false,
      objectHashIgnoreUnknownHack: false,
      tsconfigDefaults: defaults,
      tsconfig: './tsconfig.json',
      tsconfigOverride: override,
      exclude: ['*.test*', '**/*.test*', '*.spec*', '**/*.spec*']
    }),
    json()
  ]
};

if (process.env.BUILD === 'production') {
  // minifies generated bundles
  config.plugins.push(terser());
}

if (process.env.BUILD === 'development') {
  config.plugins.push(visualizer({
    filename: './dist/stats.html'
  }));
}

export default config;

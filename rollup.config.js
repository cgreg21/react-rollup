import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import babel from '@rollup/plugin-babel';
import auto from '@rollup/plugin-auto-install';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json';
import image from '@rollup/plugin-image';
import url from '@rollup/plugin-url';
import eslint from '@rollup/plugin-eslint';
import yaml from '@rollup/plugin-yaml';
import scss from 'rollup-plugin-scss';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import path from 'path';
import purgecss from 'rollup-plugin-purgecss';
import filesize from 'rollup-plugin-filesize';
import browsersync from 'rollup-plugin-browsersync';

export default {
  input: 'src/index.jsx',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    sourcemap: true,
  },
  plugins: [
    browsersync({ server: '.' }),
    filesize({
      showBrotliSize: true,
    }),
    auto(),
    nodeResolve({
      extensions: ['.js', '.jsx'],
    }),
    purgecss({
      content: ['index.html'],
    }),
    json(),
    image(),
    url(),
    yaml(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
      preventAssignment: true,
    }),
    babel({
      presets: ['@babel/preset-react'],
    }),
    scss({
      processor: () => postcss([autoprefixer()]),
      includePaths: [
        path.join(__dirname, '../../node_modules/'),
        'node_modules/',
      ],
      outputStyle: 'compressed',
    }),
    commonjs(),
    serve({
      open: true,
      verbose: true,
      contentBase: ['', 'public'],
      host: 'localhost',
      port: 3000,
    }),
    livereload({ watch: 'dist' }),
    eslint(),
  ],
};

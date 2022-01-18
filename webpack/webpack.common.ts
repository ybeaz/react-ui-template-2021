/* eslint-disable @typescript-eslint/no-var-requires */
// 'use strict';

/*  NodeJS server with express.js
  cd c:/Data/Dev/UserTo/r1.userto.com/
  node server.js
  localhost:3000/demo-js-redux-example.html
*/

import path from 'path'

export const common = {
  entry: {
    dist: ['./src/index.tsx'],
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name]Client.min.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.less'],
    alias: {
      '@ant-design/icons/lib/dist$': path.resolve(__dirname, './src/icons.js'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      browsers: [
                        'last 2 Chrome versions',
                        'last 2 Firefox versions',
                        'last 2 Safari versions',
                        'last 2 Edge versions',
                        'ie >= 11',
                      ],
                    },
                    useBuiltIns: 'usage',
                    corejs: 2,
                  },
                ],
                '@babel/preset-react',
                '@babel/typescript',
              ],
              plugins: [
                ['babel-plugin-transform-require-ignore', {}],
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-proposal-object-rest-spread',
              ],
            },
          },
        ],
      },
      {
        test: /\.(css|less)$/i,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'less-loader', // compiles Less to CSS
          },
        ],
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        use: ['file-loader?name=[name].[ext]'],
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        exclude: /node_modules/,
        use: [
          'url-loader?limit=10000',
          'img-loader',
          'file-loader?name=[name].[ext]?[hash]',
        ],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: ['url-loader?limit=10000&mimetype=application/font-woff'],
      },
      {
        test: /\.otf(\?.*)?$/,
        use: [
          'file-loader?name=/fonts/[name].  [ext]&mimetype=application/font-otf',
        ],
      },
    ],
  },
  performance: {
    hints: false,
  },
  watchOptions: {
    ignored: ['dist', 'node_modules'],
    poll: 1000,
  },
  watch: false,
  target: 'web',
  externals: [{ pg: true }],
  node: { fs: 'empty' },
  optimization: {
    nodeEnv: 'production',
    flagIncludedChunks: true,
    sideEffects: true,
    usedExports: true,
    concatenateModules: true,
    removeAvailableModules: true,
    removeEmptyChunks: true,
    mergeDuplicateChunks: true,
  },
  cache: {
    type: 'memory',
  },
}

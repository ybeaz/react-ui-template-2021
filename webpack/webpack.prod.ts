import { common } from './webpack.common'
//https://stackoverflow.com/questions/49053215/webpack-4-how-to-configure-minimize
import TerserPlugin from 'terser-webpack-plugin'
import { commonPlugins, prodPlugins } from './plugins'

export default {
  ...common,
  mode: 'production',
  devtool: false,
  optimization: {
    nodeEnv: 'production',
    flagIncludedChunks: true,
    sideEffects: true,
    usedExports: true,
    concatenateModules: true,
    splitChunks: {
      /*
      cacheGroups: {
        commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all'
        }
      },
      minSize: 30000,
      maxAsyncRequests: 5,
      maxAsyncRequests: 3,
    */
    },
    minimize: true,
    minimizer: [
      // we specify a custom UglifyJsPlugin here to get source maps in production
      new TerserPlugin({
        terserOptions: {
          mangle: true,
          compress: { hoist_props: false },
        },
        parallel: 4,
      }),
    ],
    removeAvailableModules: true,
    removeEmptyChunks: true,
    mergeDuplicateChunks: true,
  },
  plugins: [...commonPlugins, ...prodPlugins],
}

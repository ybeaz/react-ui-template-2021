import { common } from './webpack.common'
import { commonPlugins, devPlugins } from './plugins'

export default {
  ...common,
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    hot: true,
    historyApiFallback: true,
    compress: true,
    port: 3550,
  },
  plugins: [...commonPlugins, ...devPlugins],
}

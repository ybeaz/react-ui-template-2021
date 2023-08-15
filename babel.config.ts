module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-flow'],
  plugins: [
    'babel-plugin-styled-components',
    '@babel/plugin-proposal-class-properties',
  ],
}

/* eslint-disable import/no-commonjs */
/*
export default api => {
  api.cache(true)
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current',
          },
          useBuiltIns: 'usage',
          corejs: 2,
        },
      ],
      '@babel/preset-react',
      '@babel/typescript',
    ],
    plugins: [
      [
        'babel-plugin-transform-require-ignore',
        {
          extensions: ['.less', '.css'],
        },
      ],
      [
        '@babel/plugin-proposal-class-properties',
        {
          loose: true,
        },
      ],
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-transform-arrow-functions',
      '@babel/plugin-transform-template-literals',
      '@babel/plugin-transform-runtime',
      '@babel/plugin-transform-async-to-generator',
      '@babel/proposal-object-rest-spread',
      [
        'babel-plugin-inline-import',
        {
          extensions: ['.svg'],
        },
      ],
    ],
    env: {
      production: {
        presets: ['react-optimize'],
      },
    },
  }
}
*/

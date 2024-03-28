// ref: https://umijs.org/config/
export default {
  proxy: {
    '/api': {
      'target': 'http://localhost:8082',
      'changeOrigin': true,
      'pathRewrite': { '^/api' : '' },
    },
  },
  history: 'hash',
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,

      title: 'admin-web',
      dll: false,
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
}

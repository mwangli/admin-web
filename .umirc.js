// ref: https://umijs.org/config/
export default {
  history: 'hash',
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      proxy: { //配置代理,仅在dev时生效
        '/api': { //标识需要进行转换请求的url
          'target': 'http://localhost:8082', //服务端域名
          'changeOrigin': true, //允许域名进行转换
          'pathRewrite': {'^/api': ''}, //将请求url中的api去掉
        },
      },
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

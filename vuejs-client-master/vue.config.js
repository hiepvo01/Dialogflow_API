const webpack = require("webpack");

const BASE_PATH = "/";

module.exports = {
    devServer: {
        host: '0.0.0.0',
        port: 8083,
        disableHostCheck: true,
        public: '192.168.1.20:8083',
    },
    baseUrl: BASE_PATH,
    configureWebpack: {
        plugins: [
            new webpack.DefinePlugin({
                BASE_PATH: "'" + BASE_PATH + "'",
            }),
        ],
        performance: {
            hints: false
        },
    },
}
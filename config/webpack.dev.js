const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

const resolve = (...args) => path.resolve(__dirname, ...args)

const mapStyle = process.env.MAP_STYLE === 'true';

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',

    devServer: {
        public: 'localhost:3001',
        host: '0.0.0.0',
        port: 3001,
        contentBase: resolve('dist'),
        filename: resolve('dist/index.js'),
        historyApiFallback: true,
        overlay: true,
        open: true,
        inline: true,
        hot: true,
        stats: 'errors-only'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: mapStyle ? "css-loader?sourceMap" : "css-loader" }
                ]
            },
            {
                test: /\.s(a|c)ss$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    { loader: "sass-loader" }
                ]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
    ],
});

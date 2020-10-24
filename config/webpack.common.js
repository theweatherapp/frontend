const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebPackPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const config = require('./project.json');

const resolve = (...args) => path.resolve(__dirname, ...args)
module.exports = {
    entry: {
        main: resolve("../src", "index.js"),
    },
    output: {
        filename: '[name].[hash].js',
        path: resolve('../dist'),
        publicPath: "/"
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/],
                use: [{ loader: "babel-loader" }]
            },
            {
                test: /.*\.(gif|png|jp(e*)g|svg)$/i,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 21000,
                            name: "images/[name]_[hash:7].[ext]"
                        }
                    }
                ]
            },
            // Vendor CSS loader
            // This is necessary to pack third party libraries like antd
            {
                test: /\.css$/,
                exclude: resolve('../node_modules'),
                use: [
                    'style-loader',
                    'css-loader'
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CopyWebPackPlugin({
            patterns: [{
                from: './public',
                to: './'
            }]
        }),
        new HtmlWebPackPlugin({
            title: config.appName,
            template: "./public/index.html",
            inject: true,
            meta: {
                viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
            },

        }),
        new WorkboxPlugin.GenerateSW({
            // these options encourage the ServiceWorkers to get in there fast
            // and not allow any straggling "old" SWs to hang around
            clientsClaim: true,
            skipWaiting: true,
        })
    ],
    node: {
        fs: "empty"
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            "@components": resolve("../src/components"),
            "@data": resolve("../src/data"),
            "@pages": resolve("../src/pages"),
            "@views": resolve("../src/views"),
            "@utils": resolve("../src/utils/index.js")
        }
    },
}

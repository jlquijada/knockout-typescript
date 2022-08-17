const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'development',
    entry: {
        app: './src/index.ts'
    },
    devtool: 'source-map', // Generate separate source map files
    devServer: {
        static: path.join(__dirname, 'dist'),
        liveReload: true,
        port: 3000,
        devMiddleware: {
            publicPath: 'http://localhost:3000/'
        }
    },
    plugins: [
        new ErrorOverlayPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new MiniCssExtractPlugin({
            linkType: "text/css",
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ]
            },
            {
                test: /\.(js|ts)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.html$/, // All Knockout.js component HTML templates
                use: 'html-loader' // Adds the component templates to the bundle
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts']
    }
};

const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const devConfig = {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            modules: {
                                localIdentName: '[local]',
                            },
                        },
                    },
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
        ],
    },
    devtool: 'source-map',

    devServer: {
        static: './dist',
        historyApiFallback: true,
        open: true,
        port: 3000,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            favicon: './public/favicon.ico',
        }),
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
            }),
        ],
        usedExports: true,
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
        },
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
    },
};

module.exports = (env) => {
    return merge(commonConfig, devConfig);
};

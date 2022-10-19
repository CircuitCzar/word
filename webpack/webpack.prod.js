const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const prodConfig = {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                        },
                    },
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
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
            },
        ],
    },
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            favicon: './public/favicon.ico',
        }),
        new MiniCssExtractPlugin({ filename: 'css/[name].css' }),
        new CompressionPlugin({ test: /\.js(\?.*)?$/i, algorithm: 'gzip' }),
    ],

    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
                parallel: true,
                extractComments: false,
                terserOptions: {
                    compress: {
                        drop_console: true,
                    },
                },
            }),
        ],
        usedExports: true,
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
        },
    },
    output: {
        filename: 'js/[name].[contenthash].js',
        chunkFilename: 'js/[name].[contenthash].js',
    },
};

module.exports = (env) => {
    return merge(commonConfig, prodConfig);
};

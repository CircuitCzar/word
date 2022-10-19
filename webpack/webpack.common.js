const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
// const copyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    entry: {
        main: path.resolve(__dirname, '../src/index.tsx'),
    },
    resolve: {
        alias: {
            '~': path.resolve(__dirname, '../src/'),
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.js$|.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.ts$|.tsx?$/,
                use: [
                    { loader: 'babel-loader' },
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                        },
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|gif|pdf|eot|ttf|svg)$/,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            APP_ENV: JSON.stringify(process.env.CEM),
        }),
        new webpack.ProgressPlugin({ percentBy: 'entries' }),
        // new copyWebpackPlugin({
        //     patterns: [{ from: 'doc', to: 'doc' }],
        // }),
    ],
    output: {
        path: path.resolve(__dirname, '../build'),
        publicPath: '/',
        pathinfo: false,
    },
};

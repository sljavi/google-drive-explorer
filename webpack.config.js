'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './app/main'
    ],
    resolve: {
        alias: {
            bootstrap: path.join(__dirname, '/node_modules/bootstrap/js/bootstrap.min.js'),
            'bootstrap.css': path.join(__dirname, '/node_modules/bootstrap/dist/css/bootstrap.min.css'),
            'bootstrap-theme.css': path.join(__dirname, '/node_modules/bootstrap/dist/css/bootstrap-theme.min.css')
        },
        extensions: ['', '.js']
    },
    output: {
        path: path.join(__dirname, '/build'),
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    devtool: 'eval',
    module: {
        loaders: [{
            test: /\.css$/,
            loaders: ['style', 'css']
        }, {
            test: /\.js$/,
            loader: 'jsx-loader'
        },
        {
            test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.woff2$|\.ttf$|\.eot$|\.wav$|\.mp3$/,
            loader: 'file'
        }]
    }
};

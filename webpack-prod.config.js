'use strict';
var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: path.join(__dirname, '/app/main.jsx'),
    resolve: {
        alias: {
            bootstrap: path.join(__dirname, '/node_modules/bootstrap/js/bootstrap.min.js'),
            'bootstrap.css': path.join(__dirname, '/node_modules/bootstrap/dist/css/bootstrap.min.css'),
            'bootstrap-theme.css': path.join(__dirname, '/node_modules/bootstrap/dist/css/bootstrap-theme.min.css')
        },
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: path.join(__dirname, '/build'),
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false
            }
        })
    ],
    module: {
        loaders: [{
            test: /\.css$/,
            loaders: ['style', 'css']
        }, {
            test: /\.jsx$/,
            loader: 'jsx-loader'
        },
        {
            test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.woff2$|\.ttf$|\.eot$|\.wav$|\.mp3$/,
            loader: 'file'
        }]
    }
};

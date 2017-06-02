const debug = process.env.NODE_ENV !== "production";
const webpack = require('webpack');

module.exports = {
    context: __dirname + '/src',
    devtool: debug ? "inline-sourcemap" : null,
    entry: "./index.js",
    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
    },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ],
    module: {
        loaders: [
            { test: /\.css$/, loader: "style-loader!css-loader" },
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
        ]
    }
};
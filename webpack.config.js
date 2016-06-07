var path = require('path');

module.exports = {
    entry: {
        app: [
            './src/main.js'
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /nodes_modules/,
                loader: 'babel',
                query: {
                    presets: 'es2015'
                }
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.scss$/,
                loader: 'style!css!autoprefixer!sass'
            }
        ]
    }
}

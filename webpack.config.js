var path = require('path');

module.exports = {
    entry: {
        app: [
            './src/main.js'
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
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
    },
    resolve: {
        alias: {
            'ScrollToPlugin': path.join(__dirname, 'node_modules/gsap/src/minified/plugins/ScrollToPlugin.min.js')
        }
    }
}

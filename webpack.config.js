module.exports = {

    entry: './public/src/main.js',
    output: {
        filename: './public/build/bundle.js'
    },
    resolve: {
        alias: {
            view: './vue.js'
        }
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                'View-style-loader',
                'Css-loader'
            ]
        }, {
            test: /\.vue$/,
            loader: 'view-loader',
            options: {
                loaders: {}
                // other view-loader options go here
            }
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: / node_modules /
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file-loader',
            options: {
                name: '[name]. [ext]? [hash]'
            }
        }]
    },
    devServer: {
        port: 3000
    }
}
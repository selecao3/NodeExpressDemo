const path = require('path');

module.exports = {
    mode: 'development',
    entry: './public/javascript/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { url: false } }]
            }
        ],
    },
    resolve: {
        extensions: [
            '.js', '.css'
        ]
    },
};
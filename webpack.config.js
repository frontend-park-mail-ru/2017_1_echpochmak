 module.exports = {
     entry: './static/main.js',
     output: {
         path: __dirname + '/static/',
         filename: 'main.bundle.js',
     },
     // module: {
     //     loaders: [{
     //         test: /\.js$/,
     //         exclude: /node_modules/,
     //         loader: 'babel-loader'
     //     }]
     // }
 }
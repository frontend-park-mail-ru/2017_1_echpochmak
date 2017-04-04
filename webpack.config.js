 module.exports = {
     entry: './static/main.js',
     output: {
         path: './static',
         filename: 'main.bundle.js',
     },
     module: {
         loaders: [{
             test: /\.js$/,
             exclude: /node_modules/,
             loader: 'babel-loader'
         }]
     }
 }
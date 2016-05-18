var path = require('path');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
  style: path.join(__dirname, 'app/styles'),
  test: path.join(__dirname, 'tests')
};

var config = {
    entry: PATHS.app + '/main.js',//[__dirname + '/app/main.js'],
    resolve: {
        modulesDirectories: ['node_modules', 'src'],
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: PATHS.build,//'./build',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel',
            query: {
                cacheDirectory: true,
                presets: ['es2015', 'react']
            }
        },
        {
            test: /\.less$/,
            loader: "style!css!less",
            include: PATHS.style
        },
        { 
            test: /\.xml$/, 
            loader: 'xml-loader' 
        } 

        ]
    }
};


module.exports = config;

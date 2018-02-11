const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const fs  = require('fs');

const APP_INDEX = path.join(__dirname, "/index.js");
const APP_DIR = path.join(__dirname, "/");
const BUILD_PATH = path.join(__dirname, "/dist");
const publicPath = path.join(__dirname, '/public');

const pkgPath = path.join(__dirname, 'package.json');
const pkg = fs.existsSync(pkgPath) ? require(pkgPath) : {};
let theme = {};
if (pkg.theme && typeof(pkg.theme) === 'string') {
  let cfgPath = pkg.theme;
  // relative path
  if (cfgPath.charAt(0) === '.') {
    cfgPath = path.resolve(__dirname, cfgPath);
  }
  const getThemeConfig = require(cfgPath);
  theme = getThemeConfig();
} else if (pkg.theme && typeof(pkg.theme) === 'object') {
  theme = pkg.theme;
}

module.exports = {
    entry: APP_INDEX,
    output: {
        filename: '[name].js', //编译后的文件名字
        path: BUILD_PATH,
        chunkFilename: '[name].min.js',
        publicPath: '/'
    },

    resolve: {
        extensions: [".js", ".json"],
        alias: {
            '@Components': path.resolve(__dirname, 'components/'),
            '@Constants': path.resolve(__dirname, 'constants'),
            '@Services': path.resolve(__dirname, 'services'),
            '@Icons': path.resolve(__dirname, 'icons'),
            '@Errors': path.resolve(__dirname, 'errors'),
        }
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                // include : APP_DIR,
                loader: 'babel-loader',
                include: [
                    path.resolve(__dirname)
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
                exclude: /node_modules/,
            },
            {
                test: /.less$/,  // antd 中的less
                include: [
                    path.resolve(__dirname, 'node_modules/antd'),
                    path.resolve(__dirname)
                ],  //这个路径要写准确，否则报错
                use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: [
                    {
                      loader: 'css-loader',
                    },
                    {
                      loader: 'less-loader',
                      options: {
                        sourceMap: true,
                        modules: false,
                        modifyVars: theme,
                      },
                    },
                  ],
                }),
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'sass-loader' }),
                exclude: /node_modules/,
            },
            {
                test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
                exclude: /node_modules/,
                loader: 'file-loader?name=[name].[ext]'
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                exclude: /node_modules/,
                loader: 'url-loader?limit=8192', //url-loader?limit=8192&name=images/[name].[ext]
                //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify('production') //定义编译环境
            }
        }),
        new ExtractTextPlugin("../../css/[name].css"),
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false, // remove all comments
            },
            compress: {
                warnings: false,
                 // Drop console statements
                drop_console: true
            }
        })
    ],

    // When importing a module whose path matches one of the following, just assume
    // a corresponding global variable exists and use that instead. This is
    // important because it allows us to avoid bundling all of our dependencies,
    // which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React", "react-dom": "ReactDOM"
    }
};
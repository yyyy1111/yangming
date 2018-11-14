const merge = require('webpack-merge');


var webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtraTextPlugin = require("extract-text-webpack-plugin");

const commonConfig = require('./webpack.common.config');

const publicConfig = {
    //devtool优化
    devtool: 'cheap-module-source-map',
    module:{
        rules:[
          {
                // 编译css
                test:/\.css$/,
                // use: ['style-loader','css-loader']
                use: ExtraTextPlugin.extract({
                    fallback:"style-loader",
                    use: "css-loader"
                })
            }
            
        ]
    }
    ,plugins: [
        new UglifyJSPlugin()
        //指定环境优化
        ,new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
        ,new CleanWebpackPlugin(['dist/*.js','dist/*.html','dist/*.jpg'],{
            root: __dirname,
            verbose: true,
            dry: false
        })
        ,new ExtraTextPlugin({
            filename: '[name].[contenthash:8].css',
            allChunks: true
        })
    ],
    
};

module.exports = merge(commonConfig, publicConfig);
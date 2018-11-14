const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

commonConfig = {
    entry:{
        app:[
            path.join(__dirname,'src/index.js')
        ],
        vendor:['react','react-router-dom','redux','react-dom','react-redux']
    }
    ,output: {
        path:path.join(__dirname,'./dist'),
        filename:'[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        publicPath: '/',
    },
    module: {
        rules:[
            {   
                // 编译js
                test:/\.js$/,
                use:['babel-loader?cacheDirectory=true'],
                include:path.join(__dirname,'src')
            }
            ,{
                //编译图片
                test:/\.(png|jpg|gif)$/i,
                use: [{
                    loader:'url-loader',
                    options: {
                        limit: 8192
                    }
                }]
            }
            ,{
                // 编译less
                test:/\.less$/,
                use:[{
                    loader:"style-loader"
                },{
                    loader:"css-loader"
                },{
                    loader:"less-loader"
                }]
            }
        ]
    }
    ,plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname,'src/index.html')
        })
        
    ]
    ,resolve:{
        //别名配置
        alias:{
            pages:path.join(__dirname,'src/pages'),
            components:path.join(__dirname,'src/components'),
            router:path.join(__dirname,'src/router'),
            actions:path.join(__dirname,'src/redux/actions'),
            reducers:path.join(__dirname,'src/redux/reducers'),
            // redux:path.join(__dirname,'src/redux')
        }
    }
    ,optimization: {
        splitChunks: {
            cacheGroups: {
               commons: {
                    chunks:"initial",
                    minChunks: 2, maxInitialRequests: 5,
                    minSize:0
               },
               vendor: {
                   test:/node_modules/,
                   chunks:'initial',
                   name:'vendor',
                   priority:10,
                   enforce:true
               }
               
            }
        }
    }
};
module.exports = commonConfig ;
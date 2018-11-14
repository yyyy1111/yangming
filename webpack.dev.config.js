const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
module.exports = {
    //入口
    entry:{
       app:[
            'react-hot-loader/patch',
            path.join(__dirname,'src/index.js')
        ],
        vendor:['react','react-router-dom','redux','react-dom','react-redux']
    },
    //出口------输出到dist文件夹，输出文件名字为bundle.js
    output:{
        path:path.join(__dirname,'./dist'),
        filename:'[name].[hash].js',
        chunkFilename: '[name].[chunkhash].js'
    },
    //babel解析
    /*cacheDirectory是用来缓存编译结果，下次编译加速*/
    module:{
        rules:[
            {   
                // 编译js
                test:/\.js$/,
                use:['babel-loader?cacheDirectory=true'],
                include:path.join(__dirname,'src')
            }
            ,{
                // 编译css
                test:/\.css$/,
                use: ['style-loader','css-loader']
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
        ]
    },
    //服务配置
    devServer:{
        port:8080,
        contentBase: path.join(__dirname,'./dist')
        ,historyApiFallback:true
        ,host:'0.0.0.0'
    },
    resolve:{
        //别名配置
        alias:{
            pages:path.join(__dirname,'src/pages'),
            component:path.join(__dirname,'src/component'),
            router:path.join(__dirname,'src/router'),
            actions:path.join(__dirname,'src/redux/actions'),
            reducers:path.join(__dirname,'src/redux/reducers'),
            // redux:path.join(__dirname,'src/redux')
        }
    },
    //devtool优化
    devtool: 'inline-source-map',
    //插件
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname,'src/index.html')
        })
        // ,new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor'
        // })
    ],
    optimization: {
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
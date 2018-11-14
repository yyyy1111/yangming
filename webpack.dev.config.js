const merge = require('webpack-merge');
const path = require('path');

const commonConfig = require('./webpack.common.config.js');

const devConfig = {
    //devtool优化
    devtool: 'inline-source-map',
    //入口
    entry:{
       app:[
            'react-hot-loader/patch',
            path.join(__dirname,'src/index.js')
        ]
    },
    //出口------
    output:{
        filename:'[name].[hash].js'
    },
    //babel解析
    /*cacheDirectory是用来缓存编译结果，下次编译加速*/
    module:{
        rules:[
            {
                // 编译css
                test:/\.css$/,
                use: ['style-loader','css-loader']
            }
        ]
    },
    //服务配置
    devServer:{
        port:8080,
        contentBase: path.join(__dirname,'./dist')
        ,historyApiFallback:true
        ,host:'0.0.0.0'
    }
};

module.exports = merge({
    customizeArray(a,b,key) {
        /*entry.app不合并，全替换*/
        if(key === 'entry.app'){
            return b;
        }
        return undefined;
    }
})(commonConfig,devConfig);


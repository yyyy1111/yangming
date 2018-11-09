const path = require('path');
module.exports = {
    //入口
    entry:path.join(__dirname,'src/index.js'),
    //出口------输出到dist文件夹，输出文件名字为bundle.js
    output:{
        path:path.join(__dirname,'./dist'),
        filename:'bundle.js'
    },
    //babel解析
    /*cacheDirectory是用来缓存编译结果，下次编译加速*/
    module:{
        rules:[
            {
                test:/\.js$/,
                use:['babel-loader?cacheDirectory=true'],
                include:path.join(__dirname,'src')
            }
        ]
    }
};
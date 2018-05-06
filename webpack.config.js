const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const isDev = process.env.NODE_ENV==='development'
const config= {
    target:"web",
    entry:path.join(__dirname,'src/index.js'),
    output:{
        filename:'bundle.js',
        path:path.join(__dirname,'dist')
    },
    module:{
        rules:[
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test:/\.styl$/,
                use:[
                    'style-loader',
                    'css-loader',
                    {
                        loader:'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    'stylus-loader'
                ]
            },
            {
                test:/\.(gif|jpg|jpeg|png|svg)$/,
                use:[{
                    loader: "url-loader",
                    options:{
                        limit:102400,  // 可以直接把图片转换为base64插到js中。适用于几K左右的图片
                        name:'[name]-aaa.[ext]'   // 使用原来本身的名字。ext 为文件后缀名
                    }
                }]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        new HTMLPlugin()
    ]
}

if(isDev){
    config.devtool = '#cheap-module-eval-source-map'
    config.devServer={
        port:'8888',
        host:'0.0.0.0',      // 方便用localhost来访问 推荐全写零
        overlay:{
            errors:true
        },
        // open: true
        // historyFallback:{
            
        // }
        hot:true    // 即组件更改只需重新渲染组件对应部分，不会整个页面刷新 
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}
module.exports=config
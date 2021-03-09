const path = require('path');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const vueLoaderPlugin = require('vue-loader/lib/plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const Webpack = require('webpack')

module.exports={
    mode:'development',
    entry:['@babel/polyfill',path.resolve(__dirname,'./src/main.js')],
    output:{
        filename:'[name].[hash].js',
        path:path.resolve(__dirname,'./dist')
    },
    resolve:{
      alias:{
        'vue$':'vue/dist/vue.runtime.esm.js',
        '@':path.resolve(__dirname,'./src')
      },
      extensions:['*','.js','.json','.vue']
    },
    module:{
        rules:[
          {
            test:/\.vue$/,
            use:['vue-loader']
          },
            {
                test:/\.js$/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env']
                    }
                    
                },
                exclude:/node_modules/
            },
            {
                test:/\.scss$/,
                use:[miniCssExtractPlugin.loader,'css-loader','postcss-loader','sass-loader']
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10240,
                        fallback: {
                            loader: 'file-loader',
                            options: {
                                name: 'img/[name].[hash:8].[ext]'
                            }
                        }
                    }
                }

                ]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //媒体文件
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 10240,
                      fallback: {
                        loader: 'file-loader',
                        options: {
                          name: 'media/[name].[hash:8].[ext]'
                        }
                      }
                    }
                  }
                ]
              },
              {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 10240,
                      fallback: {
                        loader: 'file-loader',
                        options: {
                          name: 'fonts/[name].[hash:8].[ext]'
                        }
                      }
                    }
                  }
                ]
              }
        ]
    },
    devServer:{
      port:3000,
      hot:true,
      contentBase:'./dist'
    },
    plugins:[
      new Webpack.HotModuleReplacementPlugin(),
        new vueLoaderPlugin(),
        new htmlWebpackPlugin(
          {
            template:path.resolve(__dirname,'./public/index.html'),
            filename:'index.html'
          }
        ),
        new CleanWebpackPlugin(),
        new miniCssExtractPlugin({
            filename:'bundle.css',
            chunkFilename:'[id].css'
        })
    ]
}
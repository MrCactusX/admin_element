/*
 * @Descripttion: 
 * @version: 
 * @Author: Mr.Cactus
 * @Date: 2021-04-26 10:40:24
 * @LastEditors: Mr.Cactus
 * @LastEditTime: 2021-04-26 16:53:01
 */
const path = require('path');

const port = process.env.port || process.env.npm_config_port || 8080
module.exports = {
    chainWebpack: (config) => {
        // 配置alias，使用别名
        config.resolve.alias
        .set('@$', path.join(__dirname, 'src'))
        .set('components', path.join(__dirname, 'src/components'))
    },
    devServer:{
        host: 'localhost',
        port: 8080,
        proxy:{
            [process.env.VUE_APP_BASE_API]: {
                target: `http://localhost:${port}/mock`,
                changeOrigin: true,
                pathRewrite: {
                    ['^' + process.env.VUE_APP_BASE_API]:''
                }
            }
        }
    },
}
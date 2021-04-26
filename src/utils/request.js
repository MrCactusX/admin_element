/*
 * @Descripttion: 封装axios
 * @version: 
 * @Author: Mr.Cactus
 * @Date: 2021-04-26 10:57:20
 * @LastEditors: Mr.Cactus
 * @LastEditTime: 2021-04-26 11:57:47
 */

import axios from 'axios';
import {Message, MessageBox} from 'element-ui';
import store from '@/store/index';
import common from '@/utils/common'

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
    config=>{
        if(store.user.getters.token){
            config.headers['X-Token'] = common.getToken()
        }
        return config;
    },error=>{
        console.log(error);
        Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        const res = response.data;
        // 200表示请求chengg
        if(res.code!==200){
            Message({
                message: res.message,
                type: 'error',
                duration: 5*1000
            })
            // 500表示非法token
            // 501 被其他客户端登录
            // 502 token过期了
            if(res.code === 500 || res.code === 501 || res.code === 502){
                MessageBox.confirm('您已被登出，可以取消继续留在该页面或重新登录','确定登出',{
                    confirmButtonText: '重新登录',
                    cancelButtonClass: '取消',
                    type: 'warning'
                }).then(()=>{
                    store.user.dispatch('fedLogOut').then(()=>{
                        // 重新实例化vue-loader，避免bug
                        location.reload()
                    })
                })
            }

            return Promise.reject('error')
        }else{
            return Promise.resolve(res.data)
        }
    },error=>{
        console.log('err'+ error);
        Message({
            message: error.message,
            type: 'error',
            duration: 5*1000
        })
        return Promise.reject(error)
    }
)

export default service
/*
 * @Descripttion: 
 * @version: 
 * @Author: Mr.Cactus
 * @Date: 2021-04-26 15:49:49
 * @LastEditors: Mr.Cactus
 * @LastEditTime: 2021-04-26 16:34:42
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes:[{
        path: '/',
        name: 'index',
        component: ()=> import('@/views/index'),
    },
    {
        path: '/login',
        name:'login',
        component: ()=> import('@/views/login')
    },]
})
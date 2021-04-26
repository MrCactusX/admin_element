/*
 * @Descripttion: 
 * @version: 
 * @Author: Mr.Cactus
 * @Date: 2021-04-26 11:01:24
 * @LastEditors: Mr.Cactus
 * @LastEditTime: 2021-04-26 11:35:55
 */
import Vue from 'vue'
import Vuex from 'vuex'
import user from './user/index'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user
    }
})
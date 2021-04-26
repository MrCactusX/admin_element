/*
 * @Descripttion: 
 * @version: 
 * @Author: Mr.Cactus
 * @Date: 2021-04-26 09:42:07
 * @LastEditors: Mr.Cactus
 * @LastEditTime: 2021-04-26 16:35:44
 */
import Vue from 'vue'
import Element from 'element-ui'
import App from './App.vue'
import router from '@/router/index'


if (process.env.NODE_ENV === 'production') {
    const {
        mockXHR
    } = require('./mock');
    mockXHR();
}

Vue.config.productionTip = false

Vue.use(Element);



new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
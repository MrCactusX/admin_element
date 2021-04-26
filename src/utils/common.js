/*
 * @Descripttion: 公共文件
 * @version: 
 * @Author: Mr.Cactus
 * @Date: 2021-04-11 16:46:32
 * @LastEditors: Mr.Cactus
 * @LastEditTime: 2021-04-26 16:06:00
 */
export default {
    /**
     * @name: 
     * @description: 根据指定属性名获取url中单个数据
     * @param {*} name
     * @return {*}
     */
    getUrlParam(name) {
        var reg = new RegExp(`(?<=\\b${name}=)[^&]*`);
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURI(r[2])
        } else {
            return null
        }
    },
    /**
     * @name: 
     * @description: 获取url中所有数据，返回数据对象
     * @param {*}
     * @return {*}
     */
    getUrlAllParam(...URL) {
        let url = '';
        if (URL) {
            url = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ');
            if (!url) {
                return {}
            }
        } else {
            url = window.location.search.substring(1);
        }
        let dataObj = {};
        if (url.indexOf('&') > -1) {
            url = url.split('&');
            for (const key in url) {
                let arr = url[key].split('=');
                dataObj[arr[0]] = arr[1]
            }
        } else {
            url = url.split('=');
            dataObj[url[0]] = url[1];
        }
        return dataObj;

    },
    /**
     * @name: 
     * @description: 函数防抖，用于将多次执行变为最后一次执行
     * @param {*} fn 需要使用函数防抖的被执行函数
     * @param {*} delay 多少毫秒之内触发
     * @return {*}
     */
    debounce(fn, delay) {
        delay = delay || 500;
        let timer = null;
        return function () {
            let _this = this
            let args = arguments;
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                fn.apply(_this, args)
            }, delay);
        }
    },
    /**
     * @name: 
     * @description: 函数节流
     * @param {*} fn
     * @param {*} delay
     * @return {*}
     */
    throttle(fn, delay) {
        let timer = null;
        return function () {
            let _this = this;
            let args = arguments;
            if (!timer) {
                timer = setTimeout(() => {
                    fn.apply(_this, args)
                    clearTimeout(timer);
                }, delay)
            }
        }
    },
    /**
     * @name: 
     * @description: 限时抢购，倒计时功能 
     * @param {*} starTime
     * @param {*} endTime
     * @param {*} callback
     * @return {*}
     */
    limitTime(startTime, endTime, callback) {
        // 结束时间，如果传的值为空则为当天时间的23:59:59
        let end = endTime ? endTime : new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1)
        // 标准时间，为当天时间的00:00:00，传入的时间都是以这个时间为标准做计算
        let standard = new Date(new Date().toLocaleDateString()).getTime();
        let objTime = {};
        // 获取开始时间，并确定是哪个时间场次
        let round = new Date(parseInt(standard + startTime)).getHours()
        objTime.round = round;
        // eslint-disable-next-line no-unused-vars
        let timer = setInterval(() => {
            // 当前时间
            let start = (new Date().getTime()) - standard;
            // 当前时间大于开始时间，表示活动开始
            if (start > startTime) {
                // 状态码
                objTime.code = 1;
                // 开始与结束的时间差
                let time = end - start;
                // 大于0，表示正在计时
                if (time > 0) {
                    objTime.time = this.formatTime(time);
                    callback(objTime)
                } else {
                    // 说明已到达结束时间
                    objTime.code = 2;
                    objTime.time = {
                        h: '00',
                        m: '00',
                        s: '00'
                    }
                    callback(objTime)
                }
            }
            // 当前时间小于开始时间，则说明活动还未开始，则返回时间 
            else {
                objTime.code = 0;
                let time = startTime - start;
                objTime.time = this.formatTime(time);
                callback(objTime)
            }
        }, 500)
    },
    // 格式化时间
    formatTime(time) {
        time = time / 1000;
        let hou = parseInt((time % (60 * 60 * 24)) / 3600) < 10 ? ('0' + parseInt((time % (60 * 60 * 24)) / 3600)) : parseInt((time % (60 * 60 * 24)) / 3600)
        let min = parseInt(((time % (60 * 60 * 24)) % 3600) / 60) < 10 ? ('0' + parseInt(((time % (60 * 60 * 24)) % 3600) / 60)) : parseInt(((time % (60 * 60 * 24)) % 3600) / 60);
        let sec = parseInt(((time % (60 * 60 * 24)) % 3600) % 60) < 10 ? ('0' + parseInt(((time % (60 * 60 * 24)) % 3600) % 60)) : parseInt(((time % (60 * 60 * 24)) % 3600) % 60);
        return {
            h: hou,
            m: min,
            s: sec
        }
    }
}
/*
 * @Descripttion: 
 * @version: 
 * @Author: Mr.Cactus
 * @Date: 2021-04-26 14:51:11
 * @LastEditors: Mr.Cactus
 * @LastEditTime: 2021-04-26 16:01:06
 */
import Mock from 'mockjs';
const user = require('./user');
const common = require('@/utils/common')

const mocks = [
    ...user
]

function XHR2ExpressReqWrap(respond){
    return function(options){
        let result = null;
        if(respond instanceof Function){
            const {body, type, url} = options

            result = respond({
                method: type,
                body: JSON.parse(body),
                query: common.getUrlAllParam(url)
            })
        }else{
            result = respond;
        }

        return Mock.mock(result);
    }
}

function mockXHR(){
    for (const i of mocks) {
        Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
    }
}

module.exports = {
    mocks,
    mockXHR
}
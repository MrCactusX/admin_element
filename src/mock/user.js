/*
 * @Descripttion: 
 * @version: 
 * @Author: Mr.Cactus
 * @Date: 2021-04-26 15:03:09
 * @LastEditors: Mr.Cactus
 * @LastEditTime: 2021-04-26 16:27:46
 */
const tokens = {
    admin: {
        token: 'admin-token'
    },
    editor: {
        token: 'editor-token'
    }
}

const users = {
    'admin-token': {
        roles: ['admin'],
        introduction: 'I am a super administrator',
        avator: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Super Admin'
    },
    'editor-token': {
        roles: ['editor'],
        introduction: 'I am an editor',
        avator: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Normal Editor'
    }
}

module.exports = [
    // 用户登录
    {
        url: '/api/user/login',
        type: 'post',
        reponse: config => {
            const {
                userName
            } = config.body;
            const token = tokens[userName];

            // mock error
            if (!token) {
                return {
                    code: 60204,
                    message: 'Account and password are incorrect'
                }
            }

            return {
                code: 200,
                data: token
            }
        }
    },
    // 用户信息
    {
        // eslint-disable-next-line no-useless-escape
        url: '/api/user/info\.*',
        type: 'get',
        response: config=>{
            const {token} = config.query;
            const info = users[token];

            // mock error
            if(!info){
                return {
                    code: 500,
                    message: 'Login failed, unable to get user details'
                }
            }

            return {
                code: 200,
                data: info
            }
        }
    },
    // 用户登出
    {
        url: '/api/user/logout',
        type: 'post',
        response:()=>{
            return {
                code: 200,
                data: 'success'
            }
        }
    }
]
import Cookie from '@/utils/cookie'
import UserApi from '@/api/user'
import store from '../index'
import Vue from 'vue'

const TOKEN_KEY = "TOKEN_KEY"
const token = {
    state: {
        token: Cookie.getAttribute(TOKEN_KEY)
    },

    mutations: {
        SET_TOKEN: (state, value) => {
            state.token = value
            Cookie.setAttribute(TOKEN_KEY, value, 30)
        },
        REMOVE_TOKEN: (state) => {
            state.token = null
            Cookie.remove(TOKEN_KEY)
        }
    },

    actions: {
        Authentication({ commit }, accessToken) {
            UserApi.verifyToken(accessToken).then((response) => {
                let result = response.data
                let githubUsername = store.state.configuration.githubUsername
                if (githubUsername == result['login']) {
                    commit('SET_TOKEN', accessToken)
                    Vue.prototype.$notify({
                        title: '成功',
                        message: '密钥绑定成功',
                        type: 'success'
                    })
                } else {
                    Vue.prototype.$message({
                        message: '密钥错误',
                        type: 'error'
                    })
                }
            }).catch(() => {

            })
        },
        Cancellation({ commit }) {
            commit('REMOVE_TOKEN')
            Vue.prototype.$message({
                message: '密钥取消绑定',
                type: 'info'
            })
        },
    }
}

export default token
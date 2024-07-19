import {
	getToken,
	setToken,
	setInfo,
	getInfo
}
from "@/common/auth.js"

import {loginAndRegController} from '@/api/index.js'

const getDefaultState = () => {
	return {
		token: getToken(),
		menu: '',
		info: getInfo() ?? {}
	}
}

const state = getDefaultState()

const mutations = {
	RESET_STATE: (state) => {
		Object.assign(state, getDefaultState())
	},
	SET_TOKEN: (state, token) => {
		setToken(token)
		state.token = token
	},
	SET_MENU: (state, menu) => {
		state.menu = menu
	},
	SET_KEY: (state, key) => {
		state.key = key
	},
	SET_INFO: (state, info) => {
		setInfo(info)
		state.info = info
	}
}

const actions = {
	login({ commit }, userInfo, current) {
		return new Promise((resolve, reject) => {
			console.log(1111, userInfo, current)
			if(userInfo.current === 0) {
				let params = {
					username: userInfo.username,
					password: userInfo.password
				}
				loginAndRegController.login(params).then(res => {
					console.log("用户信息", res)
					const { data, code } = res
					if(code == 200) {
						let userInfo = {
							...data
						}
						delete userInfo.tokenData
						// 存储token
						commit('SET_TOKEN', data.tokenData)
						commit('SET_INFO', userInfo)
						resolve(res)
					}
					
				}).catch(error => {
					reject(error)
				})
			} else {
				let params = {
					code: userInfo.code,
				}
				
				if (uni.$u.test.contains(userInfo.username, '@')) {
					params.email = userInfo.username
				} else {
					params.phone = userInfo.username
				}
				loginAndRegController.emailLogin(params).then(res => {
					const { data, code }  = res
					if(code === 200) {
						// 存储token
						commit('SET_TOKEN', data.tokenData)
						commit('SET_INFO', {nickname: data.nickname, userId: data.userId, permission: 1})
						resolve(res)
					}
				})
				
			}
			
		})
	}
}


export default {
	namespaced: true,
	state,
	mutations,
	actions
}

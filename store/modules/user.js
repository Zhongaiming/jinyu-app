import {
	getToken,
	setToken,
	setInfo,
	getInfo,
	getPermissions,
	setPermissions
}
from "@/common/auth.js"

import {loginAndRegController, userController} from '@/api/index.js'

const getDefaultState = () => {
	return {
		token: getToken(),
		menu: '',
		info: getInfo() ?? {},
		permissions: getPermissions() ?? [],
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
	},
	SET_PERMISSIONS: (state, permissions) => {
		setPermissions(permissions)
		state.permissions = permissions
	}
}

const actions = {
	login({ commit }, userInfo, current) {
		return new Promise((resolve, reject) => {
			if(userInfo.current === undefined) {
				loginAndRegController.loginXls(userInfo).then(res => {
					const { data, code } = res
					if(code == 200) {
						// 存储token
						commit('SET_TOKEN', data)
						userController.getInfo().then(res => {
							const { data, code } = res
							if(code == 200) {
								commit('SET_INFO', data)
								commit('SET_PERMISSIONS', data.permissions)
							}
						})
					}
					resolve(res)
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
	},
}


export default {
	namespaced: true,
	state,
	mutations,
	actions
}

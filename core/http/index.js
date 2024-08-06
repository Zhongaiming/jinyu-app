import Request from '@/js_sdk/luch-request_3.1.0/luch-request/index.js'
import Vue from 'vue'

import reqConfig from '@/core/config/reqConfig.js'
import {
	getToken
} from '@/common/auth.js'
import {
	changeToUpperCase
} from '@/common/index.js'
import cache from '@/common/cache.js'
import STATUS from './statusCode'

let loading

const http = new Request({
	baseURL: reqConfig.baseUrl,
	timeout: 30000,
	header: {
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*"
	}
})

// 请求拦截
http.interceptors.request.use(config => {
	config.method = changeToUpperCase(config.method)
	// 获取每个请求的loading， 若是没有配置，则默认设置 true
	loading = config.custom.loading ?? false
	config.header = {
		...config.header,
		...(config.custom.header ?? {})
	}
	// 获取token
	const token = getToken()
	if (reqConfig.whiteList.indexOf(config.url) == -1) {

		if (!token) {
			// 跳转到登录页重新登录
			console.log("token跳转111")
			// Vue.prototype.$goTo('/pages/loginAndReg/login', 'reLaunch')
		} else {
			config.header = {
				...config.header,
				"Authorization": token,
			}
		}
	}


	if (loading) {
		console.log('进来了没')
		// 后期封装
		uni.showLoading({
			title: '加载中',
			mask: true
		})
	}


	return config

}, error => {
	return Promise.resolve(error)
})

// 响应拦截
http.interceptors.response.use(response => {
	const {
		code,
		message
	} = response.data
	if (code != STATUS.SUCCESS) {
		// 返回错误处理
		Vue.prototype.$toast(message)
	}


	if (loading) {
		console.log('Jinglail lmei ')
		uni.hideLoading()
	}


	return response.data
}, error => {
	console.log('错误拦截', error)

	const {
		code,
		message
	} = error.data
	Vue.prototype.$toast(message)
	if (code === STATUS.TIMEOUT) {
		cache.clearCache()
		setTimeout(() => {
			console.log("token跳转222")
			Vue.prototype.$goTo('/pages/loginAndReg/login', 'reLaunch')
		}, 1000)

	}

	return Promise.resolve(error.data)
})

export default http
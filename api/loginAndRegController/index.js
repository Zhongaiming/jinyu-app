import http from '../../core/http/index.js'

export default class loginAndRegController {
	// 密码登录
	static loginXls(data) {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/login/doLogin',
			method: 'POST', // 请求方法必须大写
			data,
			custom: {
				isToken: true
			}
		})
	}
	
	// 注册
	static registerUser(data) {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/login/registerSelf',
			method: 'POST',
			data,
			custom: {
				isToken: true
			}
		})
	}
	
	// 获取验证码
	static getCode(data) {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/SendNoteCode/getSendNote',
			method: 'GET',
			data,
			custom: {
				isToken: true
			}
		})
	}
	
	//邮箱登录
	static emailLogin(data) {
		return http.request({
			url: '/api/v1/app/user/emailLogin',
			method: 'POST',
			data
		})
	}
}

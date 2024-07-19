import http from '../../core/http/index.js'

export default class loginAndRegController {
	
	// 密码登录
	static login(data) {
		return http.request({
			url: '/api/v1/app/user/doLogin',
			method: 'POST', // 请求方法必须大写
			data
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
	
	// 注册
	static registerUser(data) {
		return http.request({
			url: '/api/v1/app/user/emailRegister',
			method: 'POST',
			data
		})
	}
	
	// 获取验证码
	static getCode(data) {
		return http.request({
			url: '/api/v1/app/user/sendEmailCode',
			method: 'POST',
			data
		})
	}
}

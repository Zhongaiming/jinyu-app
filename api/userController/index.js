import http from '../../core/http/index.js'

export default class userController {
	
	// 修改用户信息
	static updateUser(data) {
		return http.request({
			url: '/api/v1/app/user/update',
			method: 'POST',
			data
		})
	}
	
	// 忘记密码（邮箱验证修改）
	static emailChangePwd(data) {
		return http.request({
			url: '/api/v1/app/user/emailForget',
			method: 'POST',
			data
		})
	}
	
	// 根据用户id获取用户信息
	static getUserInfoById(data) {
		return http.request({
			url: '/api/v1/app/user/get',
			method: 'POST',
			data
		})
	}
	
	// 邮箱换绑
	static emailRebind(data) {
		return http.request({
			url: '/api/v1/app/user/emailChange',
			method: 'POST',
			data
		})
	}
	
	// 修改密码
	static changePassword(data) {
		return http.request({
			url: '/api/v1/app/user/changePassword',
			method: 'POST',
			data
		})
	}
}
import http from '../../core/http/index.js'

export default class writeOffController {
	
	// 获取用户路由
	static getRouters(data) {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/login/getRouters',
			method: 'GET', 
			data
		})
	}
	
	// 修改用户信息
	static updateUser(data) {
		return http.request({
			url: '/api/v1/app/user/update',
			method: 'POST',
			data
		})
	}
}
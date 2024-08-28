import http from '../../core/http/index.js'

export default class memberController {
	// 获取会员统计信息
	static getTotalInfo(data) {
		return http.request({
			url: '/member/api/v1/admin/member/member/getTotalInfo',
			method: 'GET',
			data
		})
	}
	// 获取会员统计信息
	static getList(data) {
		return http.request({
			url: '/member/api/v1/admin/member/member/getList',
			method: 'GET',
			data
		})
	}

	// 添加黑名单
	static addBlackInfo(data) {
		return http.request({
			url: '/member/api/v1/admin/blacklist/addBlackInfo',
			method: 'POST',
			data
		})
	}
	// 黑名单列表
	static getBlackPageList(data) {
		return http.request({
			url: '/member/api/v1/admin/blacklist/getBlackPageList',
			method: 'GET',
			data
		})
	}
	// 黑名单详情
	static getMemberInfo(data) {
		return http.request({
			url: '/member/api/v1/admin/blacklist/getMemberInfo',
			method: 'GET',
			data
		})
	}
	// 黑名单操作记录
	static getBlackLogList(data) {
		return http.request({
			url: '/member/api/v1/admin/blacklist/getBlackLogList',
			method: 'GET',
			data
		})
	}
	// 删除黑名单
	static deleteBlackInfo(data) {
		return http.request({
			url: '/member/api/v1/admin/blacklist/deleteBlackInfo',
			method: 'POST',
			data
		})
	}
}
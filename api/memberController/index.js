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
	
	/** 
	 * 会员
	 * @param {type}  
	 * @return {type}
	 */
	static getMemberById(data) {
		return http.request({
			url: '/member/api/v1/admin/member/member/memberById',
			method: 'GET',
			data
		})
	}
	static getCoinFlowingList(data) {
		return http.request({
			url: '/member/api/v1/admin/member/coinFlowing/getCoinFlowingList',
			method: 'GET',
			data
		})
	}
	static getBalanceDetails(data) {
		return http.request({
			url: '/member/api/v1/admin/member/coinFlowing/getBalanceDetails',
			method: 'GET',
			data
		})
	}
	static getMemberOrderForm(data) {
		return http.request({
			url: '/member/api/v1/admin/member/member/getMemberOrderForm',
			method: 'GET',
			data
		})
	}
	// 修改余额余币
	static updateMoney(data) {
		return http.request({
			url: '/member/api/v1/admin/member/coinFlowing/updateMoney',
			method: 'POST',
			data
		})
	}
	// 派发福利
	static welfare(data) {
		return http.request({
			url: '/member/api/v1/admin/member/coinFlowing/welfare',
			method: 'POST',
			data
		})
	}
}
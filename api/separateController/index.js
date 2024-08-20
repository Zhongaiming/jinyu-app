import http from '../../core/http/index.js'

export default class separateController {
	// 分账人员
	// 通过手机查询商户信息
	static getUserInfoByPhone(data) {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/merchantUser/getUserInfoByPhone',
			method: 'GET',
			data
		})
	}
	static getSeparatePerson(data) {
		return http.request({
			url: '/order/api/v1/admin/order/separateBills/list',
			method: 'POST',
			data
		})
	}
	static addSeparatePerson(data) {
		return http.request({
			url: '/order/api/v1/admin/order/separateBills/add',
			method: 'POST',
			data
		})
	}
	static deleteSeparatePerson(data) {
		return http.request({
			url: '/order/api/v1/admin/order/separateBills/delete',
			method: 'POST',
			data
		})
	}
	static updateSeparatePerson(data) {
		return http.request({
			url: '/order/api/v1/admin/order/separateBills/update',
			method: 'POST',
			data
		})
	}
	static getViewSeparatePerson(data) {
		return http.request({
			url: '/order/api/v1/admin/order/separateBills/view',
			method: 'GET',
			data
		})
	}
	// 分成设置操作日志
	static getSeparateSetupLog(data) {
		return http.request({
			url: '/order/api/v1/admin/order/separateBillsLog/list',
			method: 'POST',
			data
		})
	}
	static getViewSeparateSetupLog(data) {
		return http.request({
			url: '/order/api/v1/admin/order/separateBillsLog/view',
			method: 'GET',
			data
		})
	}
	// 场地分账设置
	static getSeparateSetup(data) {
		return http.request({
			url: '/order/api/v1/admin/order/separateBillsPlace/list',
			method: 'POST',
			data
		})
	}
	static addSeparateSetup(data) {
		return http.request({
			url: '/order/api/v1/admin/order/separateBillsPlace/add',
			method: 'POST',
			data
		})
	}
	static deleteSeparateSetup(data) {
		return http.request({
			url: '/order/api/v1/admin/order/separateBillsPlace/delete',
			method: 'POST',
			data
		})
	}
	static updateSeparateSetup(data) {
		return http.request({
			url: '/order/api/v1/admin/order/separateBillsPlace/update',
			method: 'POST',
			data
		})
	}
	static getViewSeparateSetup(data) {
		return http.request({
			url: '/order/api/v1/admin/order/separateBillsPlace/view',
			method: 'GET',
			data
		})
	}
}
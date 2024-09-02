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
			url: '/order/api/v1/admin/order/separateBills/getSeparateBillsPeople',
			method: 'GET',
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
	// 分成人场地
	static getBilsPlaceList(data) {
		return http.request({
			url: '/order/api/v1/admin/order/separateBillsPlace/getBilsPlaceList',
			method: 'GET',
			data
		})
	}
	// 场地分账设置 
	static getSeparateSetup(data) {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/place/getPlaceDeviceNum',
			method: 'GET',
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
	// 场地业务
	static getDividePersonList(data) {
		return http.request({
			url: '/order/api/v1/admin/order/separateBillsPlace/getDividePersonList',
			method: 'GET',
			data
		})
	}
	static addSeparateBillsInfo(data) {
		return http.request({
			url: '/order/api/v1/admin/order/separateBillsPlace/addSeparateBillsInfo',
			method: 'POST',
			data
		})
	}
	static editSeparateBillsInfo(data) {
		return http.request({
			url: '/order/api/v1/admin/order/separateBillsPlace/editSeparateBillsInfo',
			method: 'POST',
			data
		})
	}
	static deleteSeparateBillsInfo(data) {
		return http.request({
			url: '/order/api/v1/admin/order/separateBillsPlace/deleteSeparateBillsInfo',
			method: 'POST',
			data
		})
	}
	// 收益
	static getPlaceMoney(data) {
		return http.request({
			url: '/order/api/v1/admin/order/orderSeparate/getPlaceMoney',
			method: 'GET',
			data
		})
	}
	static getSeparateByPerson(data) {
		return http.request({
			url: '/order/api/v1/admin/order/orderSeparate/getSeparateByPerson',
			method: 'GET',
			data
		})
	}
	static getSeparateByPlace(data) {
		return http.request({
			url: '/order/api/v1/admin/order/orderSeparate/getSeparateByPlace',
			method: 'GET',
			data
		})
	}
	static getSeparateByTime(data) {
		return http.request({
			url: '/order/api/v1/admin/order/orderSeparate/getSeparateByTime',
			method: 'GET',
			data
		})
	}
	
}
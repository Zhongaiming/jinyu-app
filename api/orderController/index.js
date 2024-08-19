import http from '../../core/http/index.js'

export default class orderController {
	
	// 获取订单列表
	static getOrderList(data) {
		return http.request({
			url: '/order/api/v1/admin/order/orderForm/list',
			method: 'POST',
			data
		})
	}
	
	// 订单表操作管理接口
	static getTotalTodayIncome(data) {
		return http.request({
			url: '/order/api/v1/admin/order/orderForm/getTotalTodayIncome',
			method: 'GET',
			data
		})
	}
	
	static subsidyIncomeInfo(data) {
		return http.request({
			url: '/order/api/v1/admin/order/orderForm/subsidyIncomeInfo',
			method: 'GET',
			data
		})
	}
	
	static getTodayOnlineIncome(data) {
		return http.request({
			url: '/order/api/v1/admin/order/orderForm/getTodayOnlineIncome',
			method: 'GET',
			data
		})
	}
	
	static getTodayCashIncome(data) {
		return http.request({
			url: '/order/api/v1/admin/order/orderForm/getTodayCashIncome',
			method: 'GET',
			data
		})
	}
	
	static getTodayOnlineOrderList(data) {
		return http.request({
			url: '/order/api/v1/admin/order/orderForm/getTodayOnlineOrderList',
			method: 'GET',
			data
		})
	}
	
	static getTodayCashOrderList(data) {
		return http.request({
			url: '/order/api/v1/admin/order/orderForm/getTodayCashOrderList',
			method: 'GET',
			data
		})
	}
	
	// 投币记录表操作管理接口
	static getDeviceInsertCoins(data) {
		return http.request({
			url: '/order/api/v1/admin/order/orderInsertCoins/getDeviceInsertCoins',
			method: 'GET',
			data
		})
	}
	
	static getInsertCoinsPlaceNum(data) {
		return http.request({
			url: '/order/api/v1/admin/order/orderInsertCoins/getInsertCoinsPlaceNum',
			method: 'GET',
			data
		})
	}
	
	
	// 出礼流水表操作管理接口
	static getInsertCoinsPlaceNum(data) {
		return http.request({
			url: '/order/api/v1/admin/commodity/outPresentWater/presentConsume',
			method: 'GET',
			data
		})
	}
	
}
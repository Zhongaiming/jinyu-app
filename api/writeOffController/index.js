import http from '../../core/http/index.js'

export default class writeOffController {
	
	// 核销统计、核销记录
	static summaryDouyin(data) {
		return http.request({
			url: '/order/api/v1/admin/order/dyMerchantShop/summary',
			method: 'GET', 
			data
		})
	}
	//添加商家关联
	static taskSubmit(data) {
		return http.request({
			url: '/order/api/v1/admin/order/dyMerchantShop/taskSubmit',
			method: 'GET', 
			data
		})
	}
	
	// 查询所有门店
	static getDyShopInfo(data) {
		return http.request({
			url: '/order/api/v1/admin/order/dyMerchantShop/list',
			method: 'GET', 
			data
		})
	}
	//抖音商户
	static getDyAccountInfo(data) {
		return http.request({
			url: '/order/api/v1/admin/order/dyMerchantShop/list',
			method: 'GET', 
			data
		})
	}
	// 添加团购套餐
	static addDySetMeal(data) {
		return http.request({
			url: '/order/api/v1/admin/order/dyMerchantShop/addDySetMeal',
			method: 'POST',
			data
		})
	}
	//查询门店的套餐
	static getDyShopMealById(data) {
		return http.request({
			url: '/order/api/v1/admin/order/dyMerchantShop/getDyShopMealById',
			method: 'GET', 
			data
		})
	}
	// 编辑团购套餐
	static updateDySetMeal(data) {
		return http.request({
			url: '/order/api/v1/admin/order/dyMerchantShop/updateDySetMeal',
			method: 'POST',
			data
		})
	}
	// 删除团购套餐
	static deleteDyShopMealById(data) {
		return http.request({
			url: '/order/api/v1/admin/order/dyMerchantShop/deleteDyShopMealById',
			method: 'POST',
			data,
			custom: {
				header: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}
		})
	}
	// 抖音核销
	static writeOff(data) {
		return http.request({
			url: '/order/api/v1/admin/order/dyMerchantShop/writeOff',
			method: 'POST',
			data
		})
	}
}
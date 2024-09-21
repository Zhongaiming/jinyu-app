import http from '../../core/http/index.js'

export default class shjController {
	/**
	 * 设备详情
	 * @param {Object} data
	 */
	static replenishmentDetails(data) {
		return http.request({
			url: '/device/api/v1/admin/device/deviceRail/replenishmentDetails',
			method: 'GET',
			data
		})
	}
	
	/**
	 * 清货或者补货或者批量补货
	 * @param {Object} data
	 */
	static clearingOrReplenishment(data) {
		return http.request({
			url: '/device/api/v1/admin/device/deviceRail/clearingOrReplenishment',
			method: 'POST',
			data
		})
	}
	
	/**
	 * 修改货道商品信息
	 * @param {Object} data
	 */
	static editEggDeviceRailInfo(data) {
		return http.request({
			url: '/device/api/v1/admin/device/deviceRail/editEggDeviceRailInfo',
			method: 'POST',
			data
		})
	}
	
	/**
	 * 一键清货或者一键补货
	 * @param {Object} data
	 */
	static oneKey(data) {
		return http.request({
			url: '/device/api/v1/admin/device/deviceRail/oneKey',
			method: 'POST',
			data
		})
	}
}
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
	 * 商品上架
	 * @param {Object} data
	 */
	static salesAirportDevice(data) {
		return http.request({
			url: '/device/api/v1/admin/device/deviceRail/salesAirportDevice',
			method: 'GET',
			data
		})
	}
	static setDisplayMode(data) {
		return http.request({
			url: '/device/api/v1/admin/device/deviceRail/setDisplayMode',
			method: 'POST',
			data
		})
	}
	static goodsOnTheShelf(data) {
		return http.request({
			url: '/device/api/v1/admin/device/deviceRail/goodsOnTheShelf',
			method: 'POST',
			data
		})
	}
	static goodsOnTheShelfList(data) {
		return http.request({
			url: '/device/api/v1/admin/device/deviceRail/goodsOnTheShelfList',
			method: 'POST',
			data
		})
	}
	/**
	 * 商品分类
	 * @param {Object} data
	 */
	/**
	 * shj 批量复制 
	 * @param {Object} data
	 * */
	static batchReplication(data) {
		return http.request({
			url: '/device/api/v1/admin/device/deviceRail/batchReplication',
			method: 'POST',
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
	
	/**
	 * 货道重置
	 * @param {Object} data
	 */
	static rendingMachineReset(data) {
		return http.request({
			url: '/device/api/v1/admin/device/deviceRail/rendingMachineReset',
			method: 'POST',
			data
		})
	}
	/**
	 * 编辑货道
	 * @param {Object} data
	 */
	static updCargoLane(data) {
		return http.request({
			url: '/device/api/v1/admin/device/deviceRail/updCargoLane',
			method: 'POST',
			data
		})
	}
	static updCargoLaneList(data) {
		return http.request({
			url: '/device/api/v1/admin/device/deviceRail/updCargoLaneList',
			method: 'POST',
			data
		})
	}
	/**
	 * 测试电机
	 * @param {Object} data
	 */
	static motorTest(data) {
		return http.request({
			url: '/device/api/v1/admin/device/deviceRail/motorTest',
			method: 'POST',
			data
		})
	}
	
	/**
	 * 补货管理
	 * @param {Object} data
	 */
	static clearingOrReplenishment(data) {
		return http.request({
			url: '/device/api/v1/admin/device/deviceRail/clearingOrReplenishment',
			method: 'POST',
			data
		})
	}
	
	static oneKeyShj(data) {
		return http.request({
			url: '/device/api/v1/admin/device/deviceRail/oneKey',
			method: 'POST',
			data
		})
	}
	
	/**
	 * 下发shj补货
	 * @param {Object} data
	 */
	static setShjRepertoryBatch(data) {
		return http.request({
			url: '/device/api/v1/admin/device/iot/setShjRepertoryBatch',
			method: 'POST',
			data
		})
	}
	
	/**
	 * 参数设置
	 * @param {Object} data
	 */
	static businessType(data) {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/businessType/queryList',
			method: 'GET',
			data
		})
	}
	static businessOne(data) {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/business/businessOne',
			method: 'GET',
			data
		})
	}
	static updBusinessOne(data) {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/business/updBusinessOne',
			method: 'POST',
			data
		})
	}
	
	
}
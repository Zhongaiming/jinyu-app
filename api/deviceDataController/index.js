import http from '../../core/http/index.js'

export default class deviceDataController {
	// === ndj
	// 获取投币总数
	static getCoinSum(data) {
		return http.request({
			url: '/order/api/v1/admin/order/orderShipment/getCoinSum',
			method: 'POST',
			data
		})
	}
	// 获取支付总数
	static getOrderSum(data) {
		return http.request({
			url: '/order/api/v1/admin/order/orderShipment/getOrderSum',
			method: 'POST',
			data
		})
	}
	// 获取出礼总数
	static getOutPresentSum(data) {
		return http.request({
			url: '/order/api/v1/admin/order/orderShipment/getOutPresentSum',
			method: 'POST',
			data
		})
	}
	// 按时间排序获取所有综合信息
	static getSumByDate(data) {
		return http.request({
			url: '/order/api/v1/admin/order/orderShipment/getSumByDate',
			method: 'POST',
			data
		})
	}
	// 按货道获取扭蛋机综合信息
	static getTwistedEggInfo(data) {
		return http.request({
			url: '/order/api/v1/admin/order/orderShipment/getTwistedEggInfo',
			method: 'GET',
			data
		})
	}
	
	// === 出礼统计
	//礼品统计列表
	static getPresentList(data) {
		return http.request({
			url: '/order/api/v1/admin/commodity/outPresentWater/getPresentList',
			method: 'GET',
			data
		})
	}
	/**
	 * 根据场地查询设备列表
	 * @param {Object} data
	 */
	static outPresentDeviceList(data) {
		return http.request({
			url: '/order/api/v1/admin/commodity/outPresentWater/outPresentDeviceList',
			method: 'GET',
			data
		})
	}
	
	/**
	 * 兑币机数据
	 * @param {Object} data
	 */
	static getDbjData(data) {
		return http.request({
			url: '/order/api/v1/admin/order/orderForm/getDbjData',
			method: 'POST',
			data
		})
	}
	/**
	 * 历史详情
	 * @param {Object} data
	 */
	static getDbjDataSum(data) {
		return http.request({
			url: '/order/api/v1/admin/order/orderForm/getDbjDataSum',
			method: 'POST',
			data
		})
	}
	/**
	 * 兑币机明细
	 * @param {Object} data
	 */
	static getDbjInfo(data) {
		return http.request({
			url: '/order/api/v1/admin/order/orderForm/getDbjInfo',
			method: 'POST',
			data
		})
	}
	/**
	 * 兑币机数据导出
	 * @param {Object} data
	 */
	static createDownloadFilesUrl(data) {
		return http.request({
			url: '/order/api/v1/admin/order/orderForm/createDownloadFilesUrl',
			method: 'POST',
			data
		})
	}
}
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
	//根据场地查询设备列表
	static outPresentDeviceList(data) {
		return http.request({
			url: '/order/api/v1/admin/commodity/outPresentWater/outPresentDeviceList',
			method: 'GET',
			data
		})
	}
	
}
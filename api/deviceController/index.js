import http from '../../core/http/index.js'

export default class deviceController {
	// 设备套餐模块
	// 订单服务
	static addDefaultSetMeal(data) {
		return http.request({
			url: '/order/api/v1/admin/setMeal/addDefaultSetMeal',
			method: 'POST',
			data
		})
	}
	
	// 场地设备类型 === 套餐
	static getPlaceDeviceTypeList(data) {
		return http.request({
			url: '/device/api/v1/admin/device/deviceType/getPlaceDeviceTypeList',
			method: 'GET',
			data
		})
	}
	
	// 设备注册
	static addDevice(data) {
		return http.request({
			url: '/device/api/v1/admin/device/device/addDevice',
			method: 'POST',
			data
		})
	}
	// 设备绑定
	static bindingDevice(data) {
		return http.request({
			url: '/device/api/v1/admin/device/device/bindingDevice',
			method: 'POST',
			data
		})
	}
	// 查询设备注册信息
	static getDeviceRegisterInfo(data) {
		return http.request({
			url: '/device/api/v1/admin/device/device/getDeviceRegisterInfo',
			method: 'GET',
			data
		})
	}
	
	// 设备类型
	static getDeviceTypeList(data) {
		return http.request({
			url: '/device/api/v1/admin/device/deviceType/list',
			method: 'POST',
			data
		})
	}
	static getDeviceTypeLists(data) {
		return http.request({
			url: '/device/api/v1/admin/device/deviceType/getList',
			method: 'GET',
			data
		})
	}
	
	
	// 设备查询
	static getListTwo(data) {
		return http.request({
			url: '/device/api/v1/admin/device/device/getListTwo',
			method: 'GET',
			data
		})
	}
	// 设备详情
	static getListDetails(data) {
		return http.request({
			url: '/device/api/v1/admin/device/device/getListDetails',
			method: 'GET',
			data
		})
	}
	// 查找设备货道
	static getDeviceRailList(data) {
		return http.request({
			url: '/device/api/v1/admin/device/device/getDeviceRailList',
			method: 'GET',
			data
		})
	}

	// 设备详情
	// 根据设备id查询设备详情
	static deviceDetail(data) {
		return http.request({
			url: '/device/api/v1/admin/device/device/detail',
			method: 'GET',
			data
		})
	}
	// 二维码链接
	static getOrderQR(data) {
		return http.request({
			url: '/device/api/v1/admin/device/device/getOrderQR',
			method: 'GET',
			data
		})
	}
	
	// 修改货道商品信息
	static editEggDeviceRailInfo(data) {
		return http.request({
			url: '/device/api/v1/admin/device/deviceRail/editEggDeviceRailInfo',
			method: 'POST',
			data
		})
	}
	// 查询扭蛋机货道信息
	static getEggDeviceRailInfo(data) {
		return http.request({
			url: '/device/api/v1/admin/device/deviceRail/getEggDeviceRailInfo',
			method: 'GET',
			data
		})
	}
	
	// 货道商品信息列表
	static getEggDeviceRailInfo(data) {
		return http.request({
			url: '/device/api/v1/admin/device/deviceRail/getEggDeviceRailInfo',
			method: 'GET',
			data
		})
	}
	
	//setRepertoryNumber
	static setRepertoryNumber(data) {
		return http.request({
			url: '/device/api/v1/admin/device/iot/setRepertoryNumber',
			method: 'POST',
			data
		})
	}
	
	// 设备数量
	static getDeviceNum(data) {
		return http.request({
			url: '/device/api/v1/admin/device/device/getDeviceNum',
			method: 'GET',
			data
		})
	}
}

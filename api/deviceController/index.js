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
	
	
	// 远程启动相关
	// 扭蛋机添加远程启动
	static addEggPoints(data) {
		return http.request({
			url: '/device/api/v1/admin/device/deviceLongRange/addEggPoints',
			method: 'POST',
			data
		})
	}
	// 娃娃机兑币机远程启动
	static addPoints(data) {
		return http.request({
			url: '/device/api/v1/admin/device/deviceLongRange/addPoints',
			method: 'POST',
			data
		})
	}
	// 售货机添加远程启动
	static addVendingPoints(data) {
		return http.request({
			url: '/device/api/v1/admin/device/deviceLongRange/addVendingPoints',
			method: 'POST',
			data
		})
	}
	// 场地和设备类型的设备列表
	static getDeviceListByPlaceDeviceType(data) {
		return http.request({
			url: '/device/api/v1/admin/device/device/getDeviceListByPlaceDeviceType',
			method: 'GET',
			data
		})
	}
	// 设备类型的场地列表
	static getDeviceTypePlaceList(data) {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/place/getDeviceTypePlaceList',
			method: 'GET',
			data
		})
	}
	// getPlaceListByDeviceType
	static getPlaceListByDeviceType(data) {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/place/getPlaceListByDeviceType',
			method: 'GET',
			data
		})
	}
	// 货道商品信息列表
	static getRailCommodityList(data) {
		return http.request({
			url: '/device/api/v1/admin/device/deviceRail/getRailCommodityList',
			method: 'GET',
			data
		})
	}
	// 后台远程登录记录
	static getRemoteLoginRecord(data) {
		return http.request({
			url: '/device/api/v1/admin/device/deviceLongRange/getRemoteLoginRecord',
			method: 'GET',
			data
		})
	}
	// 操作人列表
	static getOperatorList(data) {
		return http.request({
			url: '/device/api/v1/admin/device/deviceLongRange/getOperatorList',
			method: 'GET',
			data
		})
	}
	// 设备操作日志列表
	static getDeviceLogList(data) {
		return http.request({
			url: '/device/api/v1/admin/device/deviceLog/getDeviceLogList',
			method: 'GET',
			data
		})
	}
	// 补货记录
	static replenishmentList(data) {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/deviceReplenishment/replenishmentList',
			method: 'GET',
			data
		})
	}
	// 设备在线离线记录
	static getOnlineList(data) {
		return http.request({
			url: '/device/api/v1/admin/device/device/getOnlineList',
			method: 'GET',
			data
		})
	}
	// 设备状态：禁用，启用
	static editState(data) {
		return http.request({
			url: '/device/api/v1/admin/device/device/editState',
			method: 'POST',
			data
		})
	}
	// 设备解绑
	static editBinding(data) {
		return http.request({
			url: '/device/api/v1/admin/device/device/editBinding',
			method: 'POST',
			data
		})
	}
	// 转移设备
	static moveDevice(data) {
		return http.request({
			url: '/device/api/v1/admin/device/device/moveDevice',
			method: 'POST',
			data
		})
	}
	// 仓位重置
	static resetting(data) {
		return http.request({
			url: '/device/api/v1/admin/device/device/resetting',
			method: 'POST',
			data
		})
	}
	// 备注 机台编号
	static getMachineNumber(data) {
		return http.request({
			url: '/device/api/v1/admin/device/device/getMachineNumber',
			method: 'GET',
			data
		})
	}
	// 修改设备备注和标签
	static editRemark(data) {
		return http.request({
			url: '/device/api/v1/admin/device/device/editRemark',
			method: 'POST',
			data
		})
	}
	// 修改机台编号
	static updateMachineNumber(data) {
		return http.request({
			url: '/device/api/v1/admin/device/device/updateMachineNumber',
			method: 'POST',
			data
		})
	}
	
	// === 设备参数 ===
	//从redis获取数据
	static getRedisList(data) {
		return http.request({
			url: '/device/api/v1/admin/device/openParameterSet/redisList',
			method: 'GET',
			data,
			custom: {
				isToken: true
			}
		})
	}
	// 自定义命令发送给设备
	static sendCmd(data) {
	    return http.request({
	        url: '/device/api/v1/admin/device/openParameterSet/updateValue',
	        method: 'POST',
	        data,
	        timeout: 60 * 1000
	    })
	}
	// 设备基础参数查询
	static queryParam(data) {
	    return http.request({
	        url: "/device/api/v1/admin/device/iot/queryparam",
	        method: "GET",
	        data,
			custom: {
				isToken: true,
				// header: {
				// 	"Content-Type": 'application/x-www-form-urlencoded',
				// }
			}
	    })
	}
	// 获取终端
	static getTerminal(data) {
	    return http.request({
	        url: '/device/api/v1/admin/device/openTerminalSetSet/list',
	        method: 'GET',
	        data,
			custom: {
				isToken: true
			}
	    })
	}
	// 自定义终端命令 查询、修改
	static updateValue(data) {
	    return http.request({
	        url: '/device/api/v1/admin/device/openTerminalSetSet/updateValue',
	        method: 'POST',
	        data,
	        timeout: 60 * 1000
	    })
	}
	// 根据终端的id查询他的数据
	static getRedisOne(data) {
	    return http.request({
	        url: '/device/api/v1/admin/device/openTerminalSetSet/redisOne',
	        method: 'GET',
	        data,
	    })
	}
}

import http from '../../core/http/index.js'

export default class shjController {
	// 设备注册
	static addDevice(data) {
		return http.request({
			url: '/device/api/v1/admin/device/device/addDevice',
			method: 'POST',
			data
		})
	}
}
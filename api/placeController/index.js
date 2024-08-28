import http from '../../core/http/index.js'

export default class placeController {

	// 场地分页列表
	static getPage(data) {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/place/getPage',
			method: 'GET',
			data
		})
	}
	// 查询所有场地
	static getPlaceDeviceList(data) {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/place/getPlaceDeviceList',
			method: 'GET',
			data
		})
	}
	// 添加场地
	static addPlace(data) {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/place/add',
			method: 'POST',
			data
		})
	}
	// 删除场地
	static deletePlace(data) {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/place/delete',
			method: 'POST',
			data
		})
	}
	// 添加场地
	static editPlace(data) {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/place/edit',
			method: 'POST',
			data
		})
	}
	// 通过id获取场地
	static getPlaceById(data) {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/place/get',
			method: 'GET',
			data
		})
	}

	// 场地配置信息
	// 区域
	static getPlaceArea(data) {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/placeArea/getPage',
			method: 'GET',
			data
		})
	}
	static getAllArea(data) {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/placeArea/list',
			method: 'GET',
			data
		})
	}
	static addPlaceArea(data) {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/placeArea/add',
			method: 'POST',
			data
		})
	}
	static updatePlaceArea(data) {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/placeArea/update',
			method: 'POST',
			data
		})
	}
	static deletePlaceArea(data) {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/placeArea/delete',
			method: 'POST',
			data
		})
	}

	// 分类
	static getPlaceClassify(data) {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/placeClassify/getPage',
			method: 'GET',
			data
		})
	}
	static getAllClassify(data) {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/placeClassify/list',
			method: 'GET',
			data
		})
	}
	static addPlaceClassify(data) {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/placeClassify/add',
			method: 'POST',
			data
		})
	}
	static updatePlaceClassify(data) {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/placeClassify/update',
			method: 'POST',
			data
		})
	}
	static deletePlaceClassify(data) {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/placeClassify/delete',
			method: 'POST',
			data
		})
	}

	// 组别
	static getPlaceGroup(data) {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/placeGroup/getPage',
			method: 'GET',
			data
		})
	}
	static getAllGroup(data) {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/placeGroup/list',
			method: 'GET',
			data
		})
	}
	static addPlaceGroup(data) {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/placeGroup/add',
			method: 'POST',
			data
		})
	}
	static updatePlaceGroup(data) {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/placeGroup/update',
			method: 'POST',
			data
		})
	}
	static deletePlaceGroup(data) {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/placeGroup/delete',
			method: 'POST',
			data
		})
	}

	// 场地操作日志
	static getPlaceLogPage(data) {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/placeLog/getPlaceLogPage',
			method: 'GET',
			data
		})
	}
	static getPlaceLogDetail(data) {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/placeLog/getPlaceLogDetail',
			method: 'GET',
			data
		})
	}

	// 场地类型
	static getPlaceType(data) {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/placeType/getList',
			method: 'GET',
			data
		})
	}

	// 修改权重
	static setWeight(data) {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/place/setWeight',
			method: 'POST',
			data
		})
	}

	// 场地客服
	// 场地客服数量列表
	static getPlaceStaffCount(data) {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/CustomerServiceStaffPlace/getPlaceStaffCount',
			method: 'GET',
			data
		})
	}

	// 场地客服信息列表
	static getPlaceStaffInfoList(data) {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/CustomerServiceStaffPlace/getPlaceStaffInfoList',
			method: 'GET',
			data
		})
	}

	// 修改权重
	static updatePlaceStaffList(data) {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/CustomerServiceStaffPlace/updatePlaceStaffList',
			method: 'PUT',
			data
		})
	}

	// 客服
	static getStaffList(data) {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/CustomerServiceStaff/getStaffList',
			method: 'GET',
			data
		})
	}
	static deleteStaff(data) {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/CustomerServiceStaff/deleteStaff',
			method: 'POST',
			data
		})
	}
	static editStaff(data) {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/CustomerServiceStaff/editStaff',
			method: 'POST',
			data
		})
	}
	static addStaff(data) {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/CustomerServiceStaff/addStaff',
			method: 'POST',
			data
		})
	}
}
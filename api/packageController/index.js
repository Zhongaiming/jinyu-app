import http from '../../core/http/index.js'

export default class packageController {
	// 添加自定义套餐
	static addSetMeal(data) {
		return http.request({
			url: '/order/api/v1/admin/setMeal/addSetMeal',
			method: 'POST',
			data
		})
	}
	// 恢复默认值
	static comboDefaultSetting(data) {
		return http.request({
			url: '/order/api/v1/admin/setMeal/comboDefaultSetting',
			method: 'POST',
			data
		})
	}
	// 删除套餐
	static deleteSetMeal(data) {
		return http.request({
			url: '/order/api/v1/admin/setMeal/deleteSetMeal',
			method: 'DELETE',
			data
		})
	}
	// 修改套餐
	static editSetMeal(data) {
		return http.request({
			url: '/order/api/v1/admin/setMeal/editSetMeal',
			method: 'PUT',
			data
		})
	}
	// 批量修改套餐
	static editSetMeals(data) {
		return http.request({
			url: '/order/api/v1/admin/setMeal/editSetMeals',
			method: 'PUT',
			data
		})
	}
	// 套餐金额列表
	static getComboAmount(data) {
		return http.request({
			url: '/order/api/v1/admin/setMeal/getComboAmount',
			method: 'GET',
			data
		})
	}
	// 储蓄套餐列表
	static getComboList(data) {
		return http.request({
			url: '/order/api/v1/admin/setMeal/getComboList',
			method: 'GET',
			data
		})
	}
	// 场地
	static getPlaceDeviceNum(data) {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/place/getPlaceDeviceNum',
			method: 'GET',
			data
		})
	}
	
	// 查询商户推荐充值金额
	static getRecommendAmount(data) {
		return http.request({
			url: '/order/api/v1/recommendRechargeMoney/getRecommendAmount',
			method: 'GET',
			data
		})
	}
	// 修改推荐金额
	static editRecommendAmount(data) {
		return http.request({
			url: '/order/api/v1/recommendRechargeMoney/editRecommendAmount',
			method: 'PUT',
			data
		})
	}
	
	// 修改扭蛋机设置
	static editEggSet(data) {
		return http.request({
			url: '/order/api/v1/eggSet/editEggSet',
			method: 'PUT',
			data
		})
	}
	// 场地id查询扭蛋机设置
	static getEggSet(data) {
		return http.request({
			url: '/order/api/v1/eggSet/getEggSet',
			method: 'GET',
			data
		})
	}
}
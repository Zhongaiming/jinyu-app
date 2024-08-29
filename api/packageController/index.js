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
	//游乐车 shj 专用恢复套餐默认设置
	static defaultSettingYlc(data) {
		return http.request({
			url: '/order/api/v1/admin/setMeal/defaultSettings',
			method: 'POST',
			data
		})
	}
	// 删除套餐
	static deleteSetMeal(data) {
		return http.request({
			url: '/order/api/v1/admin/setMeal/deleteSetMeal',
			method: 'POST',
			data
		})
	}
	// 修改套餐
	static editSetMeal(data) {
		return http.request({
			url: '/order/api/v1/admin/setMeal/editSetMeal',
			method: 'POST',
			data
		})
	}
	// 批量修改套餐
	static editSetMeals(data) {
		return http.request({
			url: '/order/api/v1/admin/setMeal/editSetMeals',
			method: 'POST',
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
			method: 'POST',
			data
		})
	}
	
	// 修改扭蛋机设置
	static editEggSet(data) {
		return http.request({
			url: '/order/api/v1/admin/eggSet/editEggSet',
			method: 'POST',
			data
		})
	}
	// 场地id查询扭蛋机设置
	static getEggSet(data) {
		return http.request({
			url: '/order/api/v1/admin/eggSet/getEggSet',
			method: 'GET',
			data
		})
	}
	// 兑币套餐列表
	static conversionExchangeList(data) {
		return http.request({
			url: '/order/api/v1/admin/setMeal/conversionExchangeList',
			method: 'GET',
			data
		})
	}
	
	// 游乐车
	static getCart(data) {
		return http.request({
			url: '/order/api/v1/admin/setMeal/amusementCartPackage',
			method: 'GET',
			data
		})
	}
	
	static addCart(data) {
		return http.request({
			url: '/order/api/v1/admin/setMeal/rechargeBenefits',
			method: 'POST',
			data
		})
	}
	static editCart(data) {
		return http.request({
			url: '/order/api/v1/admin/setMeal/updateRechargeBenefits',
			method: 'POST',
			data
		})
	}
	static deleteCart(data) {
		return http.request({
			url: '/order/api/v1/admin/setMeal/delRechargeBenefits',
			method: 'POST',
			data
		})
	}
	
	// shj
	static getShjByPlace(data) {
		return http.request({
			url: '/order/api/v1/admin/setMeal/getPlaceMeal',
			method: 'GET',
			data
		})
	}
}
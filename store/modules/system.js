const getDefaultState = () => {
	return {
		windowWidth: uni.getSystemInfoSync().windowWidth || 0, // 可使用窗口宽度
		windowHeight: uni.getSystemInfoSync().windowHeight || 0, // 可使用窗口高度
		screenHeight: uni.getSystemInfoSync().screenHeight || 0, // 屏幕高度
		JinYuStatusBarHeight: uni.getSystemInfoSync().JinYuStatusBarHeight || 0, // app/小程序， 顶部状态栏高度
		
	}
}
const state = getDefaultState()

const mutations = {
	
}

const actions = {
	
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
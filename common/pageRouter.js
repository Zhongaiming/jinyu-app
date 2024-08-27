import Vue from "vue";
import {
	isEmptyObject
} from './index'
// switchTab tabbar
// reLaunch 关闭所有 跳到某个页面
// redirectTo 关闭当前页面，跳转到应用内的某个页面。
Vue.prototype.$goTo = function(path, openType = 'navigateTo', params = {}, animationType = 'pop-in', animationDuration =
	300) {
	if (!isEmptyObject(params)) {
		uni[openType]({
			url: path + "?params=" + encodeURIComponent(JSON.stringify(params)),
			animationType: animationType,
			animationDuration: animationDuration
		})
	} else {
		uni[openType]({
			url: path,
			animationType: animationType,
			animationDuration: animationDuration
		})
	}

}

Vue.prototype.$goBack = function() {
	uni.navigateBack({
		delta: 1
	})
}

Vue.prototype.$goTab = function(route = 'home') {
	// personal
	uni.switchTab({
		url: `/pages/mainPackages/${route}/index`
	});
}
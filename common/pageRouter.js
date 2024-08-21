import Vue from "vue";
import {isEmptyObject} from './index'
// switchTab tabbar
Vue.prototype.$goTo = function(path, openType = 'navigateTo', params = {},  animationType = 'pop-in', animationDuration = 300) {
	if(!isEmptyObject(params)) {
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
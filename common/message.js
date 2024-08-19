import Vue from 'vue'

/**
 * 显示消息提示框
 * @param content 提示的标题
 */
// uni.$u.toast('校验失败')
Vue.prototype.$toast = function(content, duration = 1500, position = "top", option = {}) {
	uni.showToast({
		icon: 'none',
		title: content,
		position: position,
		duration,
		...option
	})
}

/**
 * 显示加载中
 */
Vue.prototype.$loading = function() {
	uni.showLoading({
		title: '加载中',
		mask: true
	})
}

/**
 * 显示模态弹窗
 * @param content 提示的标题
 */
Vue.prototype.$modal = function(content, option = {}) {
	return new Promise((resolve, reject) => {
		uni.showModal({
			title: '温馨提示',
			content: content,
			cancelText: '取消',
			confirmText: '确定',
			confirmColor: "#5241ff",
			...option,
			success: function(res) {
				if (res.confirm && res.confirm == true) {
					resolve()
				}
			}
		})
	})
}
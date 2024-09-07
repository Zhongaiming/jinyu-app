export default {
	install(Vue) {
		Vue.prototype.$formatAmount = function(value) {
			// 检查是否是字符串，并且是有效的数字
			if (typeof value === 'string' && !isNaN(value.trim())) {
				value = Number(value);
			}
			// 检查 value 是否为有效数字
			if (value === null || value === undefined || isNaN(value)) {
				return '0.00';
			}
			// 检查 value 是否为有效数字
			if (typeof value !== 'number' || isNaN(value)) {
				return '0.00';
			}
			return (value / 100).toFixed(2);
		};
	}
};
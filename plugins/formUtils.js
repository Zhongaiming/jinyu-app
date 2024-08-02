/**
 * 判断是否是邮箱地址
 * @param {String} data
 */
export const checkIsEmail = data => {
	const reg =
		/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g
	if (reg.test(data)) return true
}



/**
 * 判断字符串是否为空
 * @param {String} str
 * @return {boolean} isNull
 */
export function validString(str) {
	return str == null || str === "";
}

/**
 * 严谨
 * 判断是否是手机号，根据工信部 2019 年最新公布的手机号段
 * @param { string } value
 */
export const checkIsTelphoneStrict = data => {
	const reg =
		/^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/g
	if (reg.test(data)) {
		return true
	} else {
		return false
	}
}


/**
 * 验证身份证号(2代,18位数字),最后一位是校验位,可能为数字或字符X
 * @param { string } value
 */
export const checkIsIDCardNew = data => {
	const reg = /^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}[\dXx]$/g
	if (reg.test(data)) return true
}


/**
 * 验证统一社会信用代码
 *  @param { string } value
 */
export const checkIsCreditCode = data => {
	const reg = /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/g
	if (reg.test(data)) return true
}


/**
 * 关键信息隐藏
 * @param str 字符串
 * @param frontLen 字符串前面保留位数
 * @param endLen 字符串后面保留位数
 * @returns {string}
 */
export function hideCode(str, frontLen, endLen) {
	var len = str.length - frontLen - endLen;
	var xing = '';
	for (var i = 0; i < len; i++) {
		xing += '*';
	}
	return str.substring(0, frontLen) + xing + str.substring(str.length - endLen);
};

/**
 *t毫秒对应的时分秒是：
 *int hours = t / 3600000;
 *int minutes = (t % 3600000) / 60000;
 *int seconds = (t % 60000 ) / 1000;
 */


export function formatDuring(mss) {
	var days = parseInt(mss / (1000 * 60 * 60 * 24));
	var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = Math.round((mss % (1000 * 60)) / 1000);
	let dataUrl = days ? days + "天" + hours + "小时" + minutes + "分钟" + seconds + "秒" : hours ? hours + "小时" + minutes +
		"分钟" + seconds + "秒" : minutes ? minutes + "分钟" + seconds + "秒" : seconds + "秒";
	return dataUrl
}


export function copyEvent(copyValue) {
	// 手动创建 textarea 标签
	const textarea = document.createElement('textarea')
	// 将该 textarea 设为 readonly禁止输入 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
	textarea.readOnly = 'readonly'
	textarea.style.position = 'absolute'
	textarea.style.left = '-9999px'
	// 将要 copy 的值赋给 textarea 标签的 value 属性
	textarea.value = copyValue
	// 将 textarea 插入到 body 中
	document.body.appendChild(textarea)
	// 选中值并复制
	textarea.select()
	document.execCommand('Copy')
	document.body.removeChild(textarea)
	uni.showToast({
		icon: 'none',
		title: '复制成功',
	})
}


/**
 * @description 获取当前时间
 * @return string
 */
export function getTimeState() {
	// 获取当前时间
	let timeNow = new Date();
	// 获取当前小时
	let hours = timeNow.getHours();
	// 判断当前时间段
	if (hours >= 0 && hours <= 6) return `凌晨好，别熬夜了！🌛`;
	if (hours >= 6 && hours <= 9) return `早上好，开始美好的一天！⛅`;
	if (hours >= 9 && hours <= 12) return `上午好，加油工作！⛅`;
	if (hours >= 12 && hours <= 14) return `中午好，吃好休息好！🌞`;
	if (hours >= 14 && hours <= 18) return `下午好，继续努力工作！🌞`;
	if (hours >= 18 && hours <= 24) return `晚上好，放松心情！🌛`;
}
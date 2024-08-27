import Vue from 'vue'

function placeNameRule(placeName, placeNumber) {
	let result;
	try {
		let defaultValue = "";
		placeName = placeName || defaultValue;
		placeNumber = placeNumber || defaultValue;
		result = (placeName.startsWith(placeNumber) ? "" : placeNumber) + placeName
	} catch (error) {
		result = placeName;
	}
	return result;
}

function getUniqueKey(outerIndex, innerIndex) {
	return `${outerIndex}-${innerIndex}`;
}



// 线上图片地址
Vue.prototype.$baseUrl = 'https://xls-ui-file.oss-cn-hangzhou.aliyuncs.com/appui/';
Vue.prototype.$placeNameRule = placeNameRule;
Vue.prototype.$getUniqueKey = getUniqueKey;
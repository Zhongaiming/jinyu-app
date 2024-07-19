const tabBar = require("./setting/tabBar")
const globalStyle = require("./setting/globalStyle")
const pages = require("./setting/pages")
const subPackages = require("./setting/subPackages")
const preloadRule = require('./setting/preloadRule')


module.exports = function() {
	return {
		// 设置页面路径及窗口表现
		pages,
		// 设置默认页面的窗口表现
		globalStyle,
		// 设置底部 tab 的表现
		tabBar,
		// 分包加载配置
		subPackages,
		// 分包预下载规则	
		preloadRule,
	}
}

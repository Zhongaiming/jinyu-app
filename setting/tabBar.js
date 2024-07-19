const globalConfig = require('../core/config/globalConfig.js')

// const tabBar = {
// 	"height": globalConfig.tabBarHeight + 'px',
// 	"borderStyle": "white",
// 	"backgroundColor": "#ffffff",
// 	"fontSize": "12px",
// 	"list": [
// 		{
// 			"pagePath": "pages/mainPackages/home/index",
// 			"iconPath": "static/tabbar/home_default.png",
// 			"selectedIconPath": "static/tabbar/home_active.png",
// 			"text": "%tabBar.home%",
// 			"visible": true
// 		},
// 		{
// 			"pagePath": "pages/mainPackages/personal/index",
// 			"iconPath": "static/tabbar/personal_default.png",
// 			"selectedIconPath": "static/tabbar/personal_active.png",
// 			"text": "%tabBar.personal%",
// 			"visible": true
// 		}		
// 	]
// }


const tabBar = {
	"height": globalConfig.tabBar.tabBarHeight + 'px',
	"borderStyle": "white",
	"backgroundColor": "#ffffff",
	"fontSize": "12px",
	"list": [
		{
			"pagePath": "pages/mainPackages/home/index"
		},
		{
			"pagePath": "pages/mainPackages/personal/index"
		}		
	]
}

module.exports = tabBar

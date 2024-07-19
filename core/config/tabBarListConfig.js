/**
 * 动态底部菜单配置
 */

const adminTabBar = [
	{
		"id": 0,
		"uiconName": "home",
		"pagePath": "/pages/mainPackages/home/index",
		"iconPath": require('../../static/tabbar/home_default.png'),
		"selectedIconPath": require('../../static/tabbar/home_active.png'),
		"text": 'tabBar.home',
	},
	{
		"id": 1,
		"uiconName": "account",
		"pagePath": "/pages/mainPackages/personal/index",
		"iconPath": require('../../static/tabbar/personal_default.png'),
		"selectedIconPath": require('../../static/tabbar/personal_active.png'),
		"text": 'tabBar.personal',
	}		
]

const commonUserTabBar = [
	{
		"id": 0,
		"pagePath": "/pages/mainPackages/personal/index",
		"iconPath": require('../../static/tabbar/personal_default.png'),
		"selectedIconPath": require('../../static/tabbar/personal_active.png'),
		"text": 'tabBar.personal',
	}		
]


export {
	adminTabBar,
	commonUserTabBar
}
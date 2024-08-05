module.exports = {
	navigatorHeight: 44, // 顶部导航栏高度，为了方便全局修改 jyNavbar 顶部导航栏组件高度 
	navigatorBgColor: '#f5f6f7', // 顶部导航栏全局背景色
	tabBar: { // 底部菜单配置
		tabBarHeight: 49, // 底部菜单高度

		// 以下属性，动态菜单中用到
		backgroundColor: '#ffffff', // 背景色
		textColor: '#bbbecd', // 文字默认颜色
		selectTextColor: '#5241ff', // 选中文字颜色
		textFontSize: '10px', // 文字大小
		imgWidth: '25px', // 图片宽度 （不适用icon图标）
		imgHeight: '25px', // 图片高度 （不适用icon图标）

		// 使用 u-icon 图标 相关配置
		isUseUicon: false, // 是否使用 uview 中的图标
		uiconSelectColor: 'red', // 选中图标颜色
		uiconSize: '18px', // 图标大小
	}

}
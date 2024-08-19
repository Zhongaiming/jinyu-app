const getters = {
	windowWidth: state => state.system.windowWidth,
	windowHeight: state => state.system.windowHeight,
	screenHeight: state => state.system.screenHeight,
	JinYuStatusBarHeight: state => state.system.JinYuStatusBarHeight,
	navigatorHeight: state => state.system.navigatorHeight,
	info: state => state.user.info
}


export default getters
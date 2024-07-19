const getters = {
	windowWidth: state => state.system.windowWidth,
	windowHeight: state => state.system.windowHeight,
	screenHeight: state => state.system.screenHeight,
	statusBarHeight: state => state.system.statusBarHeight,
	navigatorHeight: state => state.system.navigatorHeight,
	info: state => state.user.info
}


export default getters
import {
	mapGetters
} from 'vuex'
const globalConfig = require('../core/config/globalConfig.js')
import cache from '@/common/cache.js'
// 全局混入
let commonMixin = {
	data() {
		return {
			excludeNavbarHeight: 0, // 排除顶部导航剩下高度
			excludeTabbarHeight: 0, // 排除底部菜单剩下高度
			excludeNavbarHeightAndTabbarHeight: 0 // 排除顶部导航和底部菜单剩下高度
		}
	},
	computed: {
		...mapGetters([
			'screenHeight',
			'statusBarHeight',
			'windowHeight',
			'windowWidth',
			'info'
		])
	},
	methods: {
		getExcludeNavbarHeight() { 
			// 有顶部导航没有底部菜单！排除顶部菜单和状态栏剩下的高度（减1是因为在小程序中出现了滚动条）
			this.excludeNavbarHeight = this.screenHeight - globalConfig.navigatorHeight - this.statusBarHeight - 1
			cache.setCache('excludeNavbarHeight', this.excludeNavbarHeight)
		},
		getExcludeTabbarHeight() { 
			// 没有顶部导航和状态栏但是有底部菜单，除掉底部菜单剩下的高度
			this.excludeTabbarHeight = this.screenHeight - globalConfig.tabBar.tabBarHeight
			cache.setCache('excludeTabbarHeight', this.excludeTabbarHeight)
		},
		getExcludeNavbarAndTabbarHeight() { 
			// 没有底部菜单和顶部导航，剩余部分的高度
			this.excludeNavbarHeightAndTabbarHeight = this.screenHeight - globalConfig.navigatorHeight - this
				.statusBarHeight - globalConfig.tabBar.tabBarHeight
			cache.setCache('excludeNavbarHeightAndTabbarHeight', this.excludeNavbarHeightAndTabbarHeight)
		}
	},

	onLoad() {
		// console.log("ddd掉")
		this.getExcludeNavbarHeight()
		this.getExcludeTabbarHeight()
		this.getExcludeNavbarAndTabbarHeight()
	},
	onShow() {
		uni.hideTabBar()
		// console.log('可使用窗口宽度windowWidth: ', this.windowWidth, '\n可使用窗口高度windowHeight: ', this.windowHeight,
		// 	'\n可使用窗口screenHeight: ', this.screenHeight, '\n顶部状态栏statusBarHeight: ', this.statusBarHeight, )
			
		// console.log('没有顶部导航剩下高度 excludeNavbarHeight: ', this.excludeNavbarHeight,
		// 	'\n没有底部菜单剩下高度 excludeTabbarHeight: ', this.excludeTabbarHeight,
		// 	'\n底部菜单和顶部导航都没有剩下高度 excludeNavbarHeightAndTabbarHeight: ', this.excludeNavbarHeightAndTabbarHeight)
	}
}

export default commonMixin
import App from './App'
import i18n from '@/locale/index.js'
import "./permission.js"
import "@/common/pageRouter.js"
import "@/common/message.js"
import store from '@/store'
import "@/common/commonUrl.js"

// #ifndef VUE3
import Vue from 'vue'

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	i18n,
	store,
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'

export function createApp() {
	const app = createSSRApp(App)
	app.use(i18n)
	app.use(store)
	return {
		app
	}
}
// #endif

import uView from '@/uni_modules/uview-ui/index.js'
Vue.use(uView)

import commonMixin from '@/mixins/index.js'
Vue.mixin(commonMixin)

// 注册全局组件
import jyTabbar from './components/jy-tabbar/jyTabbar.vue'
import jyNavbar from '@/components/jy-navbar/jyNavbar.vue'
import jyScroll from '@/components/jy-scroll/jyScroll.vue'
import xlsEmpty from '@/components/xls-empty/xlsEmpty.vue'
Vue.component('jyTabbar', jyTabbar)
Vue.component('jyNavbar', jyNavbar)
Vue.component('jyScroll', jyScroll)
Vue.component('xlsEmpty', xlsEmpty)

// directive
import directive from './directive';
Vue.use(directive);

// 调用setConfig方法，方法内部会进行对象属性深度合并，可以放心嵌套配置
// 需要在Vue.use(uView)之后执行
const fontSize = 24
uni.$u.setConfig({
	// 修改$u.config对象的属性
	config: {
		// 修改默认单位为rpx，相当于执行 uni.$u.config.unit = 'rpx'
		unit: 'rpx'
	},
	// 修改$u.props对象的属性
	// 修改radio组件的size参数的默认值，相当于执行 uni.$u.props.radio.size = 30
	props: {
		text: {
			size: fontSize,
		},
		icon: {
			size: fontSize,
		},
		steps: {
			activeColor: "#5241ff",
			fontSize: fontSize
		}
	}
})
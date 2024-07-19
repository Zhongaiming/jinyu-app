// 引入i18n国际化插件 使用方法：$t("message.hello")
import en from './en.json'
import zh from './zh-Hans.json'
import ar from './ar.json'

let i18nConfig = {
	locale: uni.getLocale() || 'zh-Hans',
	messages: {
	 "zh-Hans": zh,
	 "en": en,
	 'ar': ar
	}
}



// #ifndef VUE3
	import Vue from 'vue'
	import VueI18n from 'vue-i18n'
	Vue.use(VueI18n)
	const i18n = new VueI18n(i18nConfig)
// #endif

// #ifdef VUE3
	import { createI18n } from 'vue-i18n'
	const i18n = createI18n(i18nConfig)
// #endif


export default i18n;



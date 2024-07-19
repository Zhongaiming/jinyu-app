/**
 * 静态字典mixin
 * 作用： 实现字典多语言切换
 */
export const dictMixin = {
	data() {
		return {
			 
		}
	},
	computed: {
		sexOptions() {
			return [
				[
					{id: 1, label: this.$t('personal.setUp.male')},
					{id: 2, label: this.$t('personal.setUp.female')}
				]
			]
		}
	},
	methods: {
		
	},
	
	onLoad() {
	
	}
}

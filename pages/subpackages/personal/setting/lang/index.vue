<template>
	<view>
		<jy-navbar :title="$t('common.multilingual')"></jy-navbar>
		<jy-scroll>
			<view v-for="(item, index) in langOptions" :key="item.value">
				<u-cell
					@click="changeLang(item)"
					:title="item.label"
					:isLink="item.value == selectLang.value"
					rightIcon="checkbox-mark"
					:rightIconStyle="{fontSize: '36rpx',color: '#78CDFF'}"
				></u-cell>
			</view>
		</jy-scroll>
		<view >
		</view>
	</view>
</template>

<script>
	import langConfig from '@/core/config/langConfig.js'
	import { mapGetters } from 'vuex'
	export default {
		components: {
			
		},
		data() {
			return {
				langOptions: [],
				selectLang: ''
			}
		},
		computed: {
			...mapGetters([
				'statusBarHeight'
			])
		},
		methods: {
			changeLang(item) {
				this.selectLang = item
				uni.setLocale(item.value)
				this.$i18n.locale = item.value
			}
		},
		onLoad() {
			this.langOptions = langConfig
			this.langOptions.forEach(item => {
				if(item.value === uni.getLocale()) {
					this.selectLang = item
				}
			})
		}
	}
</script>

<style lang="scss" scoped>
.lang-list {
	border: 1px solid red;
}

</style>

<template>
	<view class="jy-lang" :style="{top: JinYuStatusBarHeight + 'px'}">
		<picker @change="bindPickerChange" :value="selectItemIndex" :range="langData" mode="selector" range-key="label">
			<slot></slot>
			<view style="position: absolute;"  v-if="isShowBtn" :style="{right: platForm == 'MP' ? '' : '30rpx', left: platForm == 'MP' ? '20rpx' : ''}">
				<u-image src="@/static/lang.png" width="35px" height="35px"></u-image>
			</view>
		</picker>
	</view>
</template>

<script>
	import langConfig from '@/core/config/langConfig.js'
	import { mapGetters } from 'vuex'
	export default {
		props: {
			isShowBtn: {
				type: Boolean,
				default: true
			},
			modePosition: {
				type: String,
				default: 'bottom'
			}
		},
		data() {
			return {
				showLang: false,
				langData: [],
				selectItemIndex: 0,
				platForm: 'other'
			};
		},
		computed: {
			...mapGetters(['JinYuStatusBarHeight'])
		},
		methods: {
			bindPickerChange(e) {
				uni.setLocale(this.langData[e.detail.value].value)
				this.$i18n.locale = this.langData[e.detail.value].value
			}
		
		},
		mounted() {
			this.langData = langConfig
			// #ifdef MP
				this.platForm = "MP"
			// #endif
			console.log("1111", this.platForm)
		},
		onShow() {
			
			this.langOptions.forEach((item,index) => {
				if(item.value === uni.getLocale()) {
					this.selectItemIndex = index
				}
			})
		}
	}
</script>

<style lang="scss" scoped>
.jy-lang {
	position: absolute;
	z-index: 999;
	right: 0rpx;
	width: 100%;
}
.lang-list {
	height: 400rpx;
}
</style>

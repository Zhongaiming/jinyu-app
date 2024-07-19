<template>
	<view>
		<jy-navbar :title="$t('personal.version.updateDetail')"></jy-navbar>
		<jy-scroll>
			<view class="u-content">
					<u-parse :content="logDetail.versionInfo"></u-parse>
				</view>
		</jy-scroll>
	</view>
</template>

<script>
	import { commonController } from '@/api/index.js'
	export default {
		data() {
			return {
				id: '',
				logDetail: ''
			}
		},
		onLoad(option) {
			this.id = JSON.parse(option.params).id
			this.getLogDetail()
		},
		methods: {
			/**
			 * 获取日志详情
			 */
			getLogDetail() {
				commonController.getLogDetail({id: this.id}).then(res => {
					if(res.code === 200) {
						this.logDetail = res.data
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
page {
	background-color: #ffffff;
}
.u-content {
	padding: 24rpx;
}
</style>

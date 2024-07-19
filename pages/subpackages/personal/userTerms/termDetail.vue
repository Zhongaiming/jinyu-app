<template>
	<view>
		<jy-navbar :title="termDetail.title"></jy-navbar>
		<jy-scroll>
			<view class="u-content">
				<u-parse :content="termDetail.content"></u-parse>
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
				termDetail: ''
			}
		},
		onLoad(option) {
			this.id = JSON.parse(option.params).id
			this.getTermDetail()
		},
		mounted() {
			console.log(111111, this.excludeTabbarHeight)
		},
		methods: {
			getTermDetail() {
				commonController.getTermDetail({id: this.id}).then(res => {
					if(res.code === 200) {
						this.termDetail = res.data
					}
					console.log('获取大结果', res)
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

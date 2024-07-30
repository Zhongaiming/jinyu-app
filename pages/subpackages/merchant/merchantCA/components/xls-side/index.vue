<template>
	<view class="xls-side" v-if="current < 3">
		<view class="text">{{ `核对${merchantTypeDict[merchantType]}信息` }}</view>
	</view>
</template>

<script>
	export default {
		props: {
			current: {
				type: Number,
				default: 1
			},
			merchantType: {
				type: String,
				default: 'PERSON'
			}
		},
		data() {
			return {
				// N PERSON; P INDIVIDUALBISS; E ENTERPRISE; else SUBJECT_TYPE_OTHERS
				// 商户类型：ENTERPRISE：企业商户，INDIVIDUALBISS：个体工商户，PERSON：个人商户，
				// INSTITUTION：事业单位商户，SUBJECT_TYPE_OTHERS：其他组织
				merchantTypeDict: {
					PERSON: '个人商户',
					INDIVIDUALBISS: '个体工商户',
					ENTERPRISE: '企业商户',
					INSTITUTION: '事业单位商户',
					SUBJECT_TYPE_OTHERS: '其他组织'
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.xls-side {
		position: fixed;
		right: 0;
		top: 648rpx;
		z-index: 99;

		.text {
			background-color: #ff8d1a;
			border-radius: 24rpx 0 0 24rpx;
			box-shadow: 0 6rpx 12rpx 0 #f0937d;
			color: #fff;
			font-size: 24rpx;
			padding: 16rpx;
			text-align: center;
			width: 66rpx;
			box-sizing: border-box;
		}
	}
</style>
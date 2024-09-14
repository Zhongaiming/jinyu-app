<template>
	<view class="xls-p-botn">
		<view class="xls-p-botn-main" @click="goTo">
			<view class="btn">
				<text>{{ text }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "xlsPBotn",
		props: {
			text: {
				type: String,
				default: '保存'
			}
		},
		methods: {
			//去添加
			goTo() {
				this.$emit("confirm")
			},
		}
	};
</script>

<style lang="scss" scoped>
	.xls-p-botn {
		height: 120rpx;
		width: 100%;
		background: $xls-page-bg;

		&-main {
			height: 120rpx;
			background: $xls-page-white;
			position: fixed;
			padding: 16rpx 20rpx;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: 9999;

			.btn {
				height: 88rpx;
				background: $xls-color-primary;
				font-size: 32rpx;
				text-align: center;
				line-height: 88rpx;
				border-radius: 8rpx;
				color: $xls-page-white;
			}
		}
	}
</style>
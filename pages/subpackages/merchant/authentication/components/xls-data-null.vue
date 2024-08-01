<template>
	<view class="empty-box">
		<image :src="`${$baseUrl}appV4/authentications/empty.png`" alt="" class="empty-image" mode="widthFix" />
		<p class="empty-remark">恭喜你，全部渠道都认证完了！</p>
		<view class="empty-btn-outside">
			<view class="empty-btn-box" @click="goTo()">
				返回
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			goTo() {
				uni.navigateBack();
			}
		}
	};
</script>

<style lang="scss" scoped>
	.empty-box {
		padding: 200rpx 0;
		text-align: center;

		.empty-image {
			width: 320rpx;
		}

		.empty-remark {
			color: #333;
			font-size: 28rpx;
			font-weight: 500;
			height: 40rpx;
			line-height: 40rpx;
			margin-top: 32rpx;
		}

		.empty-btn-outside {
			padding: 60rpx 24rpx 32rpx 24rpx;
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			box-sizing: border-box;
			background: #fff;

			.empty-btn-box {
				align-items: center;
				background-color: #5241FF;
				border-radius: 8rpx;
				width: 100%;
				display: flex;
				height: 88rpx;
				justify-content: center;
				color: #fff;
				font-size: 32rpx;
				font-weight: 400;
			}
		}
	}
</style>
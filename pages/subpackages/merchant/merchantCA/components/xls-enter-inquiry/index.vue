<template>
	<view>
		<!-- 进入询问 -->
		<view class="xls-merchat-ca-tip-page" v-if="buttonSwitch">
			<view class="button" @click="nextStep">下一步</view>
		</view>
		<!-- 同意绑卡 -->
		<u-popup :show="inquiryPopup" :round="20" mode="center">
			<view class="xls-enter-inquiry">
				<p class="title">温馨提示</p>
				<p class="text">
					本次绑卡页面收集的银行卡、身份证、店面信息将提交给第三方支付公司一级银行开通支付及业务收款结算功能，如您不同意我们对此类信息的收集，您将无法使用前述功能
				</p>
				<view class="btn-wrapper">
					<view class="btn" @click="goTo">
						<p class="btn-text">不同意</p>
					</view>
					<view class="btn confirm" @click="inquiryPopup = false">
						<p class="btn-text">同意</p>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				buttonSwitch: false,
				inquiryPopup: false,
			}
		},
		methods: {
			nextStep() {
				this.buttonSwitch = false;
				this.inquiryPopup = true;
			},
			goTo() {
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.xls-merchat-ca-tip-page {
		transition-duration: 300ms;
		transition-timing-function: ease-out;
		position: fixed;
		inset: 0rpx;
		background-color: #ff9900;
		display: flex;
		z-index: 999;
		background-image: url(#{$prefix}appV4/example/bing-card.png);
		background-repeat: no-repeat;
		background-size: 100% auto;

		.button {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			width: 90%;
			height: 88rpx;
			border-radius: 16rpx;
			font-size: 32rpx;
			background-color: #fff;
			color: #ff9900;
			text-align: center;
			line-height: 88rpx;
			margin-bottom: 40rpx;
			bottom: 0;
		}
	}

	.xls-enter-inquiry {
		width: 560rpx;
		background-color: #fff;
		padding: 40rpx 40rpx 32rpx;
		border-radius: 20rpx;

		.title {
			color: #3f4040;
			font-size: 36rpx;
			font-weight: 700;
			height: 50rpx;
			line-height: 50rpx;
			text-align: center;
		}

		.text {
			color: #3e3e40;
			font-size: 26rpx;
			font-weight: 500;
			line-height: 40rpx;
			margin-top: 24rpx;
			text-align: left;
		}

		.btn-wrapper {
			align-items: center;
			display: flex;
			margin-top: 24rpx;

			.btn {
				background-color: #f5f5f5;
				border-radius: 16rpx;
				height: 88rpx;
				width: 176rpx;
				font-size: 32rpx;
				font-weight: 600;
				text-align: center;
				color: #333;
				@include center-flex();
			}

			.confirm {
				background-color: #5241ff;
				flex-grow: 1;
				margin-left: 16rpx;
				color: #fff;
			}
		}
	}
</style>
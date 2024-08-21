<template>
	<u-popup :show="showPopup" mode="center" round="20">
		<view class="showPopup">
			<view class="close-btn-panel" @click="showPopup = !showPopup">
				x
			</view>
			<view class="title-name">暂无可以参与分成的人员！</view>
			<view class="hint-info">
				请前往 “分成人员管理” 添加人员。<span class="isBindCard">如果您已添加人员，请确认分成人员的银行卡是否已绑定成功。</span>
			</view>
			<view class="bom-btn-panel" @click="goTo">
				前往管理分成人员
			</view>
		</view>
	</u-popup>
</template>

<script>
	export default {
		data() {
			return {
				showPopup: false,
			}
		},
		methods: {
			goTo() {
				this.$goTo('/pages/mainPackages/home/separateAccounts/person/index')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.showPopup {
		width: 710rpx;
		position: relative;
		box-sizing: border-box;
		padding: 100rpx 20rpx 80rpx;
		background: #fff;

		.close-btn-panel {
			position: absolute;
			top: 0;
			color: #cacaca;
			font-size: 60rpx;
			width: 80rpx;
			text-align: center;
			line-height: 80rpx;
			height: 80rpx;
			right: 0;
		}

		.title-name {
			text-align: center;
			font-size: 32rpx;
		}

		.hint-info {
			text-align: justify;
			margin: 30rpx 0 100rpx;
			font-size: 28rpx;
		}

		.bom-btn-panel {
			background: #5241ff;
			color: #fff;
			border-radius: 8rpx;
			font-size: 30rpx;
			text-align: center;
			line-height: 80rpx;
		}

		.title-name-have {
			padding: 24rpx;
		}
	}
</style>
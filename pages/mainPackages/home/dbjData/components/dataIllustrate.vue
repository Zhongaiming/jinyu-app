<template>
	<u-popup :show="show" round="20" mode="center">
		<view class="data-illustrate">
			<view class="data-illustrate__title">收益数据说明</view>
			<view class="data-illustrate__content">
				<ul>
					<li>
						在线支付：用户通过微信、支付宝进行在线支付的金额，等于充值支付+线上启动
					</li>
					<li>
						充值支付：用户通过微信，支付宝充值所支付的金额
					</li>
					<li>
						线上启动：用户通过微信，支付宝直接启动设备所支付的金额
					</li>
				</ul>
				<ul>
					<li>
						充值支付收益：用户通过微信，支付宝充值所支付的金额
					</li>
					<li>
						线上启动收益：用户通过微信，支付宝直接启动设备所支付的金额
					</li>
					<li>
						在线支付收益：用户通过微信、支付宝进行在线支付产生的收益，包括充值支付+线上启动金额
					</li>
				</ul>
				<ul>
					<li>
						充值币数:为该设备在该时间段内线上充值的币数量
					</li>
					<li>
						取币总数：为该设备所有取币方式发起取币的数量总和。包括线上启动取币+会员取币+美团核销取币+抖音核销取币+现金购币+平台活动取币+远程启动取币
					</li>
					<li>
						实际出币：为该设备实际出币数据，由设备上报，准确性会受设备及网络状态影响（例如主板未进行上报等），故数据仅供参考
					</li>
				</ul>
			</view>
			<view class="data-illustrate__button" @click="show = false">
				我知道了
			</view>
		</view>
	</u-popup>
</template>

<script>
	export default {
		name: "dataIllustrate",
		data() {
			return {
				show: false,
			}
		}
	}
</script>

<style lang="scss" scoped>
	.data-illustrate {
		width: 560rpx;
		padding: 48rpx 24rpx 32rpx 48rpx;
		
		&__title {
			width: 100%;
			color: #0a1b29;
			font-size: 32rpx;
			font-weight: 700;
			text-align: center;
			padding-bottom: 24rpx;
		}
		
		&__content {
		    color: #848f99;
		    font-size: 28rpx;
		    padding-bottom: 48rpx;
			font-weight: 400;
		    padding-top: 16rpx;
			line-height: 40rpx;
			width: 100%;
			word-wrap: break-word;
		}
		
		&__button {
			width: 100%;
			height: 88rpx;
			border-radius: 12rpx;
			background-color: #5241ff;
			color: #fff;
			font-size: 32rpx;
			font-weight: 700;
			line-height: 88rpx;
			text-align: center;
		}
	}
</style>
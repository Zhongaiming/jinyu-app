<template>
	<view class="xls-four-step" v-if="current === 4">
		<view class="cover-top-nav-bg">
			<view class="audit-ing-bg">
				<image :src="`${$baseUrl}appV4/authentications/icon-recond.png`" alt="" class="image-style"
					mode="widthFix" />
			</view>
			<p class="cover-text">微信实名申请中</p>
			<view class="audit-description-box">
				<view class="audit-description-outside">
					<p class="tips-outside"><span class="tips-bg"></span>温馨提示</p>
					<p class="margin-top-12">
						您的申请已提交到微信平台,&nbsp;预计在工作日内24小时完成审核,&nbsp;非工作日可能有所延后。&nbsp;为了保证交易的稳定性,
						<span class="fail">避免账户收款单一渠道风控</span>的风险，平台自动为您申请多个备用收款渠道。
					</p>
					<p class="tips-outside margin-top-12 success">
						审核成功
					</p>
					<p class="margin-top-8">
						您将收到多个实名码弹窗，请留意设备管理后台通知及短信，商户本人
						<span class="fail">按照指引完成实名认证操作</span>，即可开通微信支付。
					</p>
					<p class="tips-outside margin-top-12 success">审核成功后的实名入口</p>
					<p class="margin-top-8">【电脑端】</p>
					<p>账号登陆-系统弹窗-点击进入-微信扫码-实名认证完成</p>
					<p class="margin-top-4">【手机端】</p>
					<p>账号登陆-点击【我的】-【钱包】-【微信实名认证】-实名认证完成</p>
					<p class="tips-outside margin-top-12 fail">审核失败</p>
					<p class="margin-top-8">
						请按照提示检查对应资料，重新上传符合要求资料后再次进行信息审核。
					</p>
				</view>
			</view>
		</view>
		<view class="go-home-outside">
			<p class="go-home-btn" @click="goTo">返回首页</p>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			current: {
				type: Number,
				default: 1
			},
		},
		methods: {
			goTo() {
				uni.switchTab({
					url: '/pages/mainPackages/home/index'
				});
			},
		}
	};
</script>

<style lang="scss" scoped>
	.xls-four-step {
		width: 100%;
		font-family: PingFangSC;
		background-color: #f5f5f5;
		position: relative;
		top: -80rpx;
		border-radius: 24rpx 24rpx 0 0;
	}

	.cover-top-nav-bg {
		width: 100%;
		padding-bottom: 80rpx;
		text-align: center;

		.audit-ing-bg {
			margin: 54rpx auto 0;
			padding-top: 60rpx;
			
			.image-style {
				width: 90rpx;
				height: 90rpx;
			}
		}

		.cover-text {
			color: #333;
			font-size: 32rpx;
			font-weight: 600;
			line-height: 44rpx;
			margin-top: 18rpx;
			text-align: center;
		}

		.audit-description-box {
			background-color: #fff;
			border-radius: 24rpx;
			margin: 28rpx 24rpx 24rpx;

			.audit-description-outside {
				color: #333;
				font-size: 26rpx;
				font-weight: 400;
				line-height: 40rpx;
				padding: 32rpx 24rpx;
				text-align: justify;
			}

			.tips-outside {
				color: #333;
				font-size: 28rpx;
				font-weight: 600;
				line-height: 40rpx;
				display: flex;
				align-items: center;
			}

			.tips-bg {
				background-color: #5241FF;
				border-radius: 8rpx;
				display: inline-block;
				height: 28rpx;
				margin-right: 16rpx;
				width: 8rpx;
			}

			.success {
				color: #5241FF;
			}

			.fail {
				color: #ff4747;
			}

			.margin-top-4 {
				margin-top: 8rpx;
			}

			.margin-top-8 {
				margin-top: 16rpx;
			}

			.margin-top-12 {
				margin-top: 24rpx;
			}
		}
	}

	.go-home-outside {
		bottom: 0;
		padding: 16rpx 24rpx;
		box-sizing: border-box;
		position: fixed;
		width: 100%;
		background-color: #f5f5f5;

		.go-home-btn {
			background-color: #5241FF;
			border-radius: 16rpx;
			color: #fff;
			font-size: 32rpx;
			font-weight: 500;
			height: 88rpx;
			width: 100%;
			letter-spacing: 20rpx;
			line-height: 88rpx;
			text-align: center;
		}
	}
</style>
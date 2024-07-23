<template>
	<view class="xls-order-detail">
		<jy-navbar title="退款详情" bgColor="#f5f5f5"></jy-navbar>
		<view class="xls-main-wrapper">
			<view class="xls-header-style"></view>
			<view class="xls-content-style">
				<view class="xls-order-detail-refund-state">
					退款成功
				</view>
				<view class="order_line"></view>
				<view class="xls-order-detail-refund-price">
					<view class="refund-price">
						<view class="left">
							退款金额
						</view>
						<view class="right">
							￥16.80元
						</view>
					</view>
					<view class="text">
						已退还至您的账户
					</view>
				</view>
				<view class="order_line"></view>

				<view class="xls-order-detail-text-step">
					退款流程
				</view>

				<view class="xls-steps">
					<view class="xls-steps-item">
						<view class="xls-steps-content">
							<view class="title">退款完成</view>
							<view class="time">2024-07-22 13:30:51</view>
						</view>
						<view class="xls-steps-circle"></view>
						<view class="xls-steps-line"></view>
					</view>
					<view class="xls-steps-item">
						<view class="xls-steps-content">
							<view class="title">退款完成</view>
							<view class="description">正在为您退款，将在1~3个工作日内原路退还至支付账户</view>
							<view class="time">2024-07-22 13:30:51</view>
						</view>
						<view class="xls-steps-circle"></view>
						<view class="xls-steps-line"></view>
					</view>
					<view class="xls-steps-item">
						<view class="xls-steps-content">
							<view class="title">退款完成</view>
							<view class="time">2024-07-22 13:30:51</view>
						</view>
						<view class="xls-steps-circle"></view>
						<!-- <view class="xls-steps-line"></view> -->
					</view>
				</view>
				<view class="order_line"></view>
				<view class="xls-order-detail-text-step">
					退款信息
				</view>
				<view class="xls-order-style-price xls-pay-detail">
					<image class="icon-image"
						src="https://asset.leyaoyao.com/merchant-order-center/static/d0da3593648b2c25b3ca.png"
						mode="widthFix"></image>
					<view class="price-center">
						<view class="">
							16.8元1局
						</view>
						<view class="">
							x1
						</view>
					</view>
					<view class="price-right">
						<view class="backColor">
							¥16.80
						</view>
						<view class="redColor">
							实付：¥16.80
						</view>
					</view>
				</view>

				<view class="xls-order-detail-refund-price">
					<view class="refund-price">
						<view class="left">
							订单编号
						</view>
						<view class="right">
							PA101324072213302119074661891151
						</view>
					</view>
					<view class="refund-price">
						<view class="left">
							退款方式
						</view>
						<view class="right">
							启动失败退款
						</view>
					</view>
					<view class="refund-price">
						<view class="left">
							退款原因
						</view>
						<view class="right">
							启动失败退款
						</view>
					</view>
				</view>

				<view class="index_footer_Rrm8T">
					<view class="index_semicircle_M0lxi"></view>
					<view class="index_semicircle_M0lxi"></view>
					<view class="index_semicircle_M0lxi"></view>
					<view class="index_semicircle_M0lxi"></view>
					<view class="index_semicircle_M0lxi"></view>
					<view class="index_semicircle_M0lxi"></view>
					<view class="index_semicircle_M0lxi"></view>
					<view class="index_semicircle_M0lxi"></view>
					<view class="index_semicircle_M0lxi"></view>
					<view class="index_semicircle_M0lxi"></view>
					<view class="index_semicircle_M0lxi"></view>
					<view class="index_semicircle_M0lxi"></view>
					<view class="index_semicircle_M0lxi"></view>
					<view class="index_semicircle_M0lxi"></view>
					<view class="index_semicircle_M0lxi"></view>
					<view class="index_semicircle_M0lxi"></view>
					<view class="index_semicircle_M0lxi"></view>
					<view class="index_semicircle_M0lxi"></view>
					<view class="index_semicircle_M0lxi"></view>
					<view class="index_semicircle_M0lxi"></view>
					<view class="index_semicircle_M0lxi"></view>
					<view class="index_semicircle_M0lxi"></view>
				</view>
			</view>


		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">
	@import 'index.scss';

	.xls-order-detail {
		font-family: PingFangSC-Medium, PingFang SC;
		padding: 20rpx 24rpx;

		.xls-header-style {
			height: 16rpx;
			background: $xls-color-primary;
			border-radius: 2.13333vw 2.13333vw 0 0;
		}
		
		.xls-content-style {
			background-color: #fff;
			padding: 18rpx;
			padding-bottom: 0;
			position: relative;
		}

		&-refund-state {
			color: rgba(0, 0, 0, .85);
			font-family: PingFangSC-Medium, PingFang SC;
			font-size: 4.8vw;
			font-weight: 500;
			height: 6.66667vw;
			line-height: 6.66667vw;
			margin-bottom: 3.2vw;
		}

		&-refund-price {
			margin: 4.26667vw 0;

			.refund-price {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 1.06667vw;

				.left {
					color: rgba(0, 0, 0, .45);
					font-family: PingFangSC-Medium, PingFang SC;
					font-size: 3.46667vw;
					font-weight: 500;
					height: 4.8vw;
					line-height: 4.8vw;
				}

				.right {
					color: rgba(0, 0, 0, .85);
					font-family: PingFangSC-Medium, PingFang SC;
					font-size: 3.46667vw;
					font-weight: 500;
					height: 4.8vw;
					line-height: 4.8vw;
				}
			}

			.text {
				color: rgba(0, 0, 0, .45);
				font-family: PingFangSC-Regular, PingFang SC;
				font-size: 3.2vw;
				font-weight: 400;
				height: 4.53333vw;
				line-height: 4.53333vw;
			}
		}

		&-text-step {
			color: rgba(0, 0, 0, .85);
			font-family: PingFangSC-Medium, PingFang SC;
			font-size: 3.73333vw;
			font-weight: 500;
			height: 5.33333vw;
			line-height: 5.33333vw;
			margin: 3.2vw 0;
		}
	}

	.xls-steps {
		padding: 0 0 0 5.06667vw;

		&-item {
			padding: 2.13333vw 0;
			position: relative;
		}

		&-content {
			.title {
				color: rgba(0, 0, 0, .85);
				font-family: PingFangSC-Medium, PingFang SC;
				font-size: 3.73333vw;
				font-weight: 500;
				height: 5.33333vw;
				line-height: 5.33333vw;
			}

			.description {
				color: rgba(0, 0, 0, .45);
				font-family: PingFangSC-Regular, PingFang SC;
				font-size: 3.2vw;
				font-weight: 400;
				line-height: 4.53333vw;
				margin-top: 1.06667vw;
			}

			.time {
				color: rgba(0, 0, 0, .25);
				font-family: PingFangSC-Regular, PingFang SC;
				font-size: 3.2vw;
				font-weight: 400;
				height: 4.53333vw;
				line-height: 4.53333vw;
				margin-top: 1.06667vw;
			}
		}

		&-circle {
			border-radius: 50%;
			height: 2.66667vw;
			left: -5.33333vw;
			position: absolute;
			top: 3.73333vw;
			width: 2.66667vw;
			z-index: 2;
			background: $xls-color-primary;
			border: .53333vw solid $xls-color-primary;
		}

		&-circle {
			background: #d9d9d9;
			border: .53333vw solid #fff;
		}

		&-line {
			background: #d9d9d9;
			height: 100%;
			left: -4vw;
			position: absolute;
			top: 3.73333vw;
			width: 2rpx;
		}
	}

	.index_footer_Rrm8T {
		align-items: flex-end;
		background: #fff;
		display: flex;
		height: 2.13333vw;
		justify-content: space-around;

		.index_semicircle_M0lxi {
			background: #f5f5f5;
			border-radius: 1.06667vw 1.06667vw 0 0;
			height: 1.06667vw;
			width: 2.13333vw;
		}
	}
</style>
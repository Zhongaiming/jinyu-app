<template>
	<view class="xls-order-detail">
		<jy-navbar title="订单详情" bgColor="#f5f5f5"></jy-navbar>
		<view class="xls-box-style" @click="goTo()">
			<view class="device-style">
				<span>扭蛋机30000028</span>
				<span class="state arrow">已支付</span>
			</view>
			<view class="text-style">
				2024-07-20 11:49:54
			</view>
		</view>

		<view class="xls-box-style">
			<view class="xls-order-detail-text">
				L2141-1N德州大学路银座三楼东电梯口8聂
			</view>
			<view class="xls-order-detail-addressDetail">
				6064-山东德州大学路银座三楼东电梯口
			</view>
			<view class="label-style">
				<view class="label-device-type">
					扭蛋机
				</view>
				<view class="label border-left-none">
					54069639
				</view>
				<view class="label">
					设备启动
				</view>
				<view class="label">
					主板ID编号:01
				</view>
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

			<view class="order_line"></view>

			<view class="price-list">
				<view class="list">
					<span>需付款：</span>
					<span class="text">¥16.80</span>
				</view>
				<view class="list">
					<span>实付款：</span>
					<span class="text">¥16.80</span>
				</view>
				<view class="list">
					<span>商户实收款：</span>
					<span class="main-text">¥16.80</span>
				</view>
			</view>
		</view>
		
		<view class="xls-box-style">
			<view class="record-detail-list">
				<view class="title">
					订单编号
				</view>
				<view class="value">
					<view class="">
						PA101324072011424904074047881661
					</view>
				</view>
				<view class="copy">
					复制
				</view>
			</view>
			
			<view class="record-detail-list">
				<view class="title">
					创建时间
				</view>
				<view class="value">
					<view class="">
						2024-07-20 11:42:49
					</view>
				</view>
			</view>
			
			<view class="order_line margin10"></view>
			
			<view class="record-detail-list">
				<view class="title">
					支付方式
				</view>
				<view class="value">
					<view class="">
						微信正扫
					</view>
				</view>
			</view>
			
			<view class="record-detail-list">
				<view class="title">
					支付金额
				</view>
				<view class="value">
					<view class="">
						¥16.80
					</view>
				</view>
			</view>
			
			<view class="record-detail-list">
				<view class="title">
					支付时间
				</view>
				<view class="value">
					<view class="">
						2024-07-20 11:42:49
					</view>
				</view>
			</view>
			
			<view class="record-detail-list">
				<view class="title">
					交易单号
				</view>
				<view class="value">
					<view class="">
						PA101324072011424904074047881661
					</view>
				</view>
				<view class="copy">
					复制
				</view>
			</view>
			
			<view class="record-detail-list">
				<view class="title">
					平台单号
				</view>
				<view class="value">
					<view class="">
						PA101324072011424904074047881661
					</view>
				</view>
				<view class="copy">
					复制
				</view>
			</view>
			
			<view class="record-detail-list">
				<view class="title">
					商户单号
				</view>
				<view class="value">
					<view class="">
						PA101324072011424904074047881661
					</view>
				</view>
				<view class="copy">
					复制
				</view>
			</view>
		</view>
		
		<view class="xls-box-style">
			<view class="record-detail-list">
				<view class="title-text">
					会员信息
				</view>
			</view>
			
			<view class="record-detail-list">
				<view class="title">
					会员昵称
				</view>
				<view class="value">
					<view class="">
						冯宇
					</view>
				</view>
			</view>
			
			<view class="record-detail-list">
				<view class="title">
					会员id
				</view>
				<view class="value">
					<view class="">
						11111
					</view>
				</view>
				<view class="copy">
					复制
				</view>
			</view>
		</view>
		
		<view class="xls-box-style">
			<view class="record-detail-list">
				<view class="title">
					主板ID编号
				</view>
				<view class="value-text">
					001
				</view>
			</view>
			
			<view class="record-detail-list">
				<view class="title">
					蛋仓号
				</view>
				<view class="value-text">
					1-1
				</view>
			</view>
			
			<view class="record-detail-list">
				<view class="title">
					出礼名称
				</view>
				<view class="value-text">
					商品
				</view>
			</view>
		</view>
		
		<u-divider text="已经到底啦~" :dashed="true" text-size="28"></u-divider>
		
		<view class="fixed-box">
			<view class="fixed-box-wrapper">
				<view class="button">
					退款
				</view>
				<view class="button">
					远程启动
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
		onLoad(option) {
			console.log("传参", JSON.parse(option.params).id)
		},
		methods: {
			goTo(item) {
				this.$goTo('/pages/mainPackages/home/order/refundDetail', 'navigateTo', {id: 'item.id'})
			}
		}
	}
</script>

<style scoped lang="scss">
	@import 'index.scss';

	.xls-order-detail {
		font-family: PingFangSC-Medium, PingFang SC;
		padding: 20rpx 24rpx;

		.arrow {
			position: relative;
			padding-right: 32rpx;
		}

		.arrow::after {
			content: "";
			position: absolute;
			right: 10rpx;
			top: 50%;
			transform: translateY(-50%) rotate(45deg);
			border-right: 2rpx solid #52c41a;
			border-top: 2rpx solid #52c41a;
			width: 12rpx;
			height: 12rpx;
		}

		.text-style {
			color: rgba(0, 0, 0, .25);
			font-size: 26rpx;
			margin-top: 12rpx;
		}

		&-text {
			color: rgba(0, 0, 0, .85);

			font-size: 30rpx;
			font-weight: 500;
		}

		&-addressDetail {
			color: rgba(0, 0, 0, .45);
			font-size: 24rpx;
			margin-top: 8rpx;
		}

		.label-device-type {
			line-height: 32rpx;
			margin-top: 10rpx;
			font-size: 20rpx;
			background-color: #5241ff;
			border: 2rpx solid #5241ff;
			border-radius: 8rpx 0 0 8rpx;
			border-right: none;
			color: #fff;
			padding: 0 10rpx;
			position: relative;
		}

		.label-device-type::after {
			border-left: .8vw solid transparent;
			border-right: .8vw solid transparent;
			border-top: .8vw solid #fff;
			content: "";
			height: 0;
			position: absolute;
			right: -2rpx;
			top: 50%;
			transform: rotate(90deg) translateY(-50%) translateX(-25%);
			width: 0;
		}

		.border-left-none {
			border-left: none;
			border-radius: 0 8rpx 8rpx 0;
		}

		.xls-pay-detail {
			height: 132rpx;
		}

		.price-list {
			padding-top: 20rpx;
			text-align: right;
			color: rgba(0, 0, 0, .45);
			font-size: 26rpx;

			.text {
				color: rgba(0, 0, 0, 0.85);
			}

			.list {
				margin-bottom: 12rpx;
			}

			.main-text {
				color: rgba(0, 0, 0, .85);
				font-size: 28rpx;
				font-weight: 700;
			}
		}
	}
	
	.record-detail-list {
		display: flex;
		font-size: 26rpx;
		margin-bottom: 20rpx;
		
		.title {
			width: 156rpx;
			color: rgba(0, 0, 0, .45);
			white-space: nowrap;
		}
		
		.title-text {
			color: rgba(0, 0, 0, .85);
			white-space: nowrap;
			position: relative;
			padding-right: 30rpx;
		}
		
		.title-text::after {
			content: "";
			position: absolute;
			right: 10rpx;
			top: 50%;
			transform: translateY(-50%) rotate(45deg);
			border-right: 2rpx solid rgba(0, 0, 0, .6);
			border-top: 2rpx solid rgba(0, 0, 0, .6);
			width: 12rpx;
			height: 12rpx;
		}
		
		.value {
			color: rgba(0, 0, 0, .85);
			flex: 1;
			text-size-adjust: 100% !important;
			text-align: right;
			word-break: break-all;
			margin-left: 40rpx;
		}
		
		.value-text {
			color: rgba(0, 0, 0, .85);
			flex: 1;
			text-size-adjust: 100% !important;
			word-break: break-all;
			margin-left: 40rpx;
		}
		
		.copy {
			width: 80rpx;
			padding-left: 20rpx;
			position: relative;
			color: #5241ff;
		}
		
		.copy::before {
			content: "";
			position: absolute;
			top: 4rpx;
			left: 10rpx;
			width: 2rpx;
			height: 26rpx;
			background-color: rgba(0, 0, 0, .2);
		}
	}
	
	.fixed-box {
		height: 104rpx;
		width: 100%;
		
		&-wrapper {
			padding: 20rpx 24rpx;
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			background-color: #fff;
			display: flex;
			justify-content: flex-end;
		}
	}
</style>
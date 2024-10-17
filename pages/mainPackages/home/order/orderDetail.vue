<template>
	<view class="xls-order-detail">
		<jy-navbar title="订单详情" bgColor="#f5f5f5"></jy-navbar>
		<view class="xls-box-style" @click="goTo('refundDetail')">
			<view class="device-style">
				<text v-if="order.amountRefund && order.refundState == 1">已退 ¥{{$formatAmount(order.amountRefund)}}</text>
				<text v-else> ¥{{$formatAmount(order.amount)}}</text>
				<text class="state arrow" :style="[{color: stateColorDict[order.state]}]">
					{{stateDict[order.state]}}
				</text>
			</view>
			<view class="text-style">
				{{order.updateTime}}
			</view>
		</view>
 
		<view class="xls-box-style">
			<view class="xls-order-detail-text">
				{{order.placeName}}
			</view>
			<!-- <view class="xls-order-detail-addressDetail">
				6064-山东德州大学路银座三楼东电梯口
			</view> -->
			<view class="label-style">
				<view class="label-device-type">
					{{ deviceTypeDict[order.deviceType] }}
				</view>
				<view class="label border-left-none">
					{{ order.deviceNumber }}
				</view>
				<view class="label">
					{{typeDict[order.type]}}
				</view>
				<!-- <view class="label">
					主板ID编号:01
				</view> -->
			</view>

			<view class="xls-order-style-price xls-pay-detail">
				<image class="icon-image"
					src="https://asset.leyaoyao.com/merchant-order-center/static/d0da3593648b2c25b3ca.png"
					mode="widthFix"></image>
				<view class="price-center">
					<view class="">
						{{ $formatAmount(order.shopPrice) }}元1局
					</view>
					<view class="">
						x1
					</view>
				</view>
				<view class="price-right">
					<view class="backColor">
						¥{{ $formatAmount(order.amountTotal) }}
					</view>
					<view class="redColor">
						实付：¥{{ $formatAmount(order.amount) }}
					</view>
				</view>
			</view>

			<view class="order_line"></view>

			<view class="price-list">
				<view class="list">
					<view class="uicon-wrapper" @click="double=!double">
						<u-icon name="arrow-right-double" color="#c6c6c6" size="36" class="uicon" v-if="double"></u-icon>
						<u-icon name="arrow-left-double" color="#c6c6c6" size="36" class="uicon" v-else></u-icon>
					</view>
					<text>付款：</text>
					<text class="text">¥{{ $formatAmount(order.amountTotal) }}</text>
				</view>
				<view class="list" v-if="double">
					<text>实付款：</text>
					<text class="text">¥{{ $formatAmount(order.amount) }}</text>
				</view>
				<view class="list" v-if="double && getPrice(order)">
					<text>服务费：</text>
					<text class="text">¥{{ $formatAmount(getPrice(order)) }}</text>
				</view>
				<view class="list" v-if="double">
					<text>商户实收款：</text>
					<text class="main-text">¥{{ $formatAmount(order.commercialRealCollection) }}</text>
				</view>
			</view>
		</view>

		<view class="xls-box-style">
			<view class="record-detail-list">
				<view class="title">
					<!-- 订单编号 -->
					平台单号
				</view>
				<view class="value">
					<view class="">
						{{ order.orderNo }}
					</view>
				</view>
				<view class="copy" @click="copyEvent(order.orderNo)">
					复制
				</view>
			</view>

			<view class="record-detail-list" v-if="order.amountCoupon">
				<view class="title">
					营销活动
				</view>
				<view class="value">
					<view class="">
						-{{ $formatAmount(order.amountCoupon) }}元({{ order.couponName|| "优惠券" }})
					</view>
				</view>
			</view>

			<view class="record-detail-list">
				<view class="title">
					创建时间
				</view>
				<view class="value">
					<view class="">
						{{order.createTime}}
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
						{{ payTypeDict[order.payType] }}
					</view>
				</view>
			</view>

			<view class="record-detail-list">
				<view class="title">
					支付金额
				</view>
				<view class="value">
					<view class="">
						¥{{ $formatAmount(order.amount) }}
					</view>
				</view>
			</view>

			<view class="record-detail-list">
				<view class="title">
					支付时间
				</view>
				<view class="value">
					<view class="">
						{{order.updateTime}}
					</view>
				</view>
			</view>

			<view class="record-detail-list">
				<view class="title">
					交易单号
				</view>
				<view class="value">
					<view class="">
						{{ order.transactionId }}
					</view>
				</view>
				<view class="copy" @click="copyEvent(order.transactionId)">
					复制
				</view>
			</view>

			<!-- <view class="record-detail-list">
				<view class="title">
					平台单号
				</view>
				<view class="value">
					<view class="">
						{{ order.orderNo }}
					</view>
				</view>
				<view class="copy" @click="copyEvent(order.orderNo)">
					复制
				</view>
			</view> -->

			<view class="record-detail-list">
				<view class="title">
					商户单号
				</view>
				<view class="value">
					<view class="">
						{{ order.transactionNo }}
					</view>
				</view>
				<view class="copy" @click="copyEvent(order.transactionNo)">
					复制
				</view>
			</view>
			
			<view class="record-detail-list" v-if="order.deviceType === 4">
				<view class="title">
					交易状态
				</view>
				<view class="value" @click="getStateByOrder(order.orderNo)">
					<view style="text-decoration: underline;">
						{{stateDict[order.state]}}
					</view>
				</view>
			</view>
			<view class="record-detail-list" v-if="order.deviceType === 4">
				<view class="title">
					出货详情
				</view>
				<view class="value" @click="getShjOrderDetail">
					<view style="text-decoration: underline;">
						点击显示
					</view>
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
						{{order.nickName}}
					</view>
				</view>
			</view>

			<view class="record-detail-list">
				<view class="title">
					会员id
				</view>
				<view class="value">
					<view class="">
						{{order.memberNumber}}
					</view>
				</view>
				<view class="copy" @click="copyEvent(order.memberNumber)">
					复制
				</view>
			</view>
		</view>

		<view class="xls-box-style">
			<!-- <view class="record-detail-list">
				<view class="title">
					主板ID编号
				</view>
				<view class="value-text">
					001
				</view>
			</view> -->

			<view class="record-detail-list">
				<view class="title">
					蛋仓号
				</view>
				<view class="value-text">
					{{ order.shippingSpace }}/{{ order.railNumber }}
				</view>
			</view>

			<view class="record-detail-list">
				<view class="title">
					出礼名称
				</view>
				<view class="value-text">
					<text v-if="order.hasOwnProperty('barCode')">{{ order.barCode }}-</text>
					{{ order.commodityName }}
				</view>
			</view>
		</view>

		<xls-bottom></xls-bottom>

		<view class="fixed-box">
			<view class="fixed-box-wrapper">
				<view class="button" @click="goTo('orderRefund')" v-if="refuseJudge(order)">
					退款
				</view>
				<view class="button" @click="goTo('remote')">
					远程启动
				</view>
			</view>
		</view>
		
		<!-- <xls-member-welfare /> -->
		<xlsShjOrderDetailVue ref="shjOrder" />
	</view>
</template>

<script>
	import {
		orderController
	} from '@/api/index.js';
	import {
		mapGetters,
		mapState
	} from 'vuex';
	import {
		getDateAll
	} from "@/plugins/utilityClass";
	import suan from "@/plugins/floastCalculate.js";
	import xlsShjOrderDetailVue from './components/xls-shj-order-detail.vue';
	export default {
		components: {xlsShjOrderDetailVue},
		data() {
			return {
				order: {},
				double: false,
			}
		},
		computed: {
			...mapGetters([
				'deviceTypeList',
				'deviceTypeDict'
			]),
			...mapState('config', [
				'typeDict',
				'stateDict',
				'stateColorDict',
				'refundDict',
				'payTypeDict',
			])
		},
		onLoad(option) {
			this.$store.dispatch('config/getList');
			if (option.params) {
				const params = JSON.parse(option.params);
				this.getView(params.orderId)
			}
		},
		methods: {
			getView(id) {
				orderController.getOrderView({
					id
				}).then(res => {
					if (res.code = 200) {
						if (res.data.rails) {
							res.data.rails = JSON.parse(res.data.rails)
						}
						this.order = res.data
					}
				})
			},
			
			goTo(route) {
				if (route === 'remote') {
					this.$goTo("/pages/mainPackages/home/remote/operate", "navigateTo", {
						railNumber: this.order.railNumber,
						shippingSpace: this.order.shippingSpace,
						deviceNumber: this.order.deviceNumber,
						deviceTypeId: this.order.deviceType
					})
					return
				} 
				this.$goTo(`/pages/mainPackages/home/order/${route}`, 'navigateTo', {
					orderId: this.order.id
				})
			},
			copyEvent(copyValue) {
				// 手动创建 textarea 标签
				const textarea = document.createElement("textarea");
				// 将该 textarea 设为 readonly禁止输入 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
				textarea.readOnly = "readonly";
				textarea.style.position = "absolute";
				textarea.style.left = "-9999px";
				// 将要 copy 的值赋给 textarea 标签的 value 属性
				textarea.value = copyValue;
				// 将 textarea 插入到 body 中
				document.body.appendChild(textarea);
				// 选中值并复制
				textarea.select();
				document.execCommand("Copy");
				document.body.removeChild(textarea);
				this.$toast("复制成功");
			},
			// 服务费
			getPrice(order) {
				// deviceCommission 设备手续费
				// agentServiceCharge 代理商服务费
				// deviceServiceCharge 设备服务费	
				const {deviceCommission, agentServiceCharge, deviceServiceCharge} = order;
				const result = suan.addFloast((deviceCommission ?? 0), (agentServiceCharge ?? 0));
				return suan.addFloast(result, (deviceServiceCharge ?? 0));
			},
			
			// 查询云上分状态
			async getStateByOrder(orderNo) {
			  let res = await orderController.getTransactionStatus({ orderNo })
			  if (res.code == 200) {
				this.$modal(res.data, {
				  title: "查询结果",
				  confirmText: "我知道了",
				  showCancel: false
				})
			  }
			},
			getShjOrderDetail() {
				this.$refs.shjOrder.getShjList(this.order)
			},
			
			refuseJudge(item) {
				// 已支付 1
				// 没有退款 
				// 当天
				const pickerDate = item.createTime.split(" ")[0];
				return item.state === 1 && !item.amountRefund && pickerDate === getDateAll(0)       
			},
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
			border-right: 2rpx solid;
			border-top: 2rpx solid;
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
				display: flex;
				align-items: center;
				justify-content: flex-end;
				
				.uicon-wrapper {
					margin-right: 12rpx;
					.uicon {
						transform: rotate(90deg);
					}
				}
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
			width: 120rpx;
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
			margin-left: 20rpx;
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
		
		.copy:active {
			transform: scale(0.8);
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
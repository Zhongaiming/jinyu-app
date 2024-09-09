<template>
	<view class="dayBill-state-wrapper">
		<xls-jy-navbar title="钱包" bgColor="#f5f6f7"></xls-jy-navbar>
		<view class="header-wrapper">
			<view class="left-element element" @click="rulePopup = true">
				<xls-image :src="`${$baseUrl}appV4/authentications/balance-pay.png`" alt="" class="btn-icon" />
				<span>手续费收取规则</span>
			</view>
			<view class="right-element element" @click="moneyTime">
				<xls-image :src="`${$baseUrl}appV4/authentications/tosend.png`" alt="" class="btn-icon" />
				<span>到账时间</span>
			</view>
		</view>
		<!-- 支付收益账单 -->
		<view class="main-content">
			<view class="main-header">
				<span>商家支付收益账单</span>
				<!-- <span>商家支付收益账单 (费率 {{ obj.settleFee }} %)</span> -->
				<!-- orderStatus INIT已接收 DOING处理中  DONE成功 FAILED失败 MANUAL人工处理 -->
				<span class="header-right status-success" v-if="obj.orderStatus == 'DONE'">收益已到账</span>
				<span class="header-right status-failed" v-else-if="obj.orderStatus == 'FAILED'">失败</span>
				<span class="header-right status-base" v-else>{{orderStatusDict[obj.orderStatus]}}</span>
			</view>
			<view class="line-cell-wrapper" v-if="obj.reason">
				<span>原因</span>
				<view class="cell-value">{{ obj.reason }}</view>
			</view>
			<view class="line-cell-wrapper">
				<span>收益日期</span>
				<view class="cell-value">{{ obj.settleDate }}</view>
			</view>
			<view class="line-cell-wrapper">
				<span>结算金额</span>
				<view class="cell-value">{{ obj.settlementAmount }}</view>
			</view>
			<view class="line-cell-wrapper">
				<span>到账时间</span>
				<view class="cell-value">{{ obj.completeDate }}</view>
			</view>
			<view class="line-cell-wrapper">
				<span>渠道商户号</span>
				<view class="cell-value">{{ obj.customerNumber }}</view>
			</view>
			<view class="line-cell-wrapper">
				<span>订单号</span>
				<view class="cell-value">{{ obj.orderId }}</view>
			</view>
			<view class="line-cell-wrapper">
				<span>收款人</span>
				<view class="cell-value">{{ obj.accountName }}</view>
			</view>
			<view class="line-cell-wrapper">
				<span>收款账号</span>
				<view class="cell-value">{{ obj.accountNo }}</view>
			</view>
		</view>
		<!-- 现金收益账单 -->
		<view class="main-content">
			<view class="main-header">
				<!-- <span>商家不分账账单 (费率 {{ obj.settleFee }} %)</span> -->
				<span>商家账单</span>
			</view>
			<view class="line-cell-wrapper">
				<span>收益日期</span>
				<view class="cell-value">{{ obj.settleDate }}</view>
			</view>
			<view class="line-cell-wrapper">
				<span>收益金额</span>
				<view class="cell-value">{{ $formatAmount(voList.totalAmount) }}</view>
			</view>
			<view class="line-cell-wrapper">
				<span>分账金额</span>
				<view class="cell-value">{{ $formatAmount(voList.separateMoneySum) }}</view>
			</view>
			<view class="line-cell-wrapper">
				<span>手续费</span>
				<view class="cell-value">{{ $formatAmount(voList.charge) }}</view>
			</view>
			<view class="line-cell-wrapper">
				<span>服务费</span>
				<view class="cell-value">{{ $formatAmount(voList.serviceCharge) }}</view>
			</view>
			<view class="line-cell-wrapper">
				<span>收款人</span>
				<view class="cell-value">{{ obj.accountName }}</view>
			</view>
			<view class="line-cell-wrapper">
				<span>收款账号</span>
				<view class="cell-value">{{ obj.accountNo }}</view>
			</view>
			<view class="line-cell-wrapper">
				<span>到账时间</span>
				<view class="cell-value">{{ obj.completeDate }}</view>
			</view>
		</view>
		<u-popup :show="rulePopup" round="20" mode="center">
			<view class="rule-popup-wrapper">
				<view class="title">手续费收取规则</view>
				<view class="main-wrapper">
					<view class="content-center">
						<p>每笔订单收取0.6%手续费，按四舍五入计费保留小数点后两位；</p>
						<p class="example">如图所示</p>
						<ul class="rule-list" style="list-style-type: none;">
							<li class="flex-colum">
								<span>交易金额</span><span>费率</span><span>应扣金额(元)</span><span>实际扣除(元)</span>
							</li>
							<li class="flex-row sec-row">
								<span>1</span><span>0.60%</span><span>0.006</span><span>0.01</span>
							</li>
							<li class="flex-row third-row">
								<span>2</span><span>0.60%</span><span>0.012</span><span>0.01</span>
							</li>
							<li class="flex-row sec-row">
								<span>5</span><span>0.60%</span><span>0.03</span><span>0.03</span>
							</li>
							<li class="flex-row third-row">
								<span>10</span><span>0.60%</span><span>0.06</span><span>0.06</span>
							</li>
							<li class="flex-row sec-row">
								<span>20</span><span>0.60%</span><span>0.12</span><span>0.12</span>
							</li>
							<li class="flex-row third-row">
								<span>50</span><span>0.60%</span><span>0.3</span><span>0.3</span>
							</li>
							<li class="flex-row sec-row">
								<span>100</span><span>0.60%</span><span>0.6</span><span>0.6</span>
							</li>
						</ul>
						<p class="example">温馨提示</p>
						<p>
							1，银行结算手续费是按 “每一笔成交订单金额*0.6%”
							来收取。因此，此处结算单的手续费，是每一笔订单手续费的合计。由于每笔订单手续费都会四舍五入，所以，每笔订单手续费累加起来的值，跟用总收益来计算的手续费就会存在一些偏差，请商家知悉。
						</p>
						<p>2，分摊自动分账插件费：</p>
						<p>（1）指按分成比例分摊的插件费金额。</p>
						<p>
							（2）插件费是按实际使用了自动分账的设备来收取的，每台设备每个月只收1元。
						</p>
						<p>
							（3）举例：某台设备插件费是1元，若商家分成比例是80%，分成方A的分成比例是20%。则，商家分摊的插件费是
							1*80%=0.8元；分成方分摊的插件费是 1*20%=0.2元。
						</p>
					</view>
				</view>
				<view class="btn-style" @click="rulePopup = false">我知道了</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		orderController
	} from "@/api/index.js";
	export default {
		name: "dayBillState",
		data() {
			return {
				rulePopup: false,
				obj: {},
				voList: {},
				settleDate: "",
				orderStatusDict: {
					"INIT": "已接收",
					"DOING": "处理中",
					"MANUAL": "人工处理",
					undefined: "其他"
				},
			};
		},
		async onLoad(option) {
			if(option.params) {
				this.settleDate = JSON.parse(option.params).settleDate;
				this.get();
			}
		},
		methods: {
			async get() {
				let res = await orderController.getCommonDetailBill({
					settleDate: this.settleDate
				});
				if (res.code == 200) {
					this.obj = res.data;
					this.voList = res.data.voList;
				}
			},
			moneyTime() {
				this.$modal("当天所有的在线收益(平台补贴除外)扣除手续费后，第二天18:00前直接打款至您的银行卡，其中财付通渠道如遇到法定节假日打款时间会顺延至下一个工作日。",{
						title: "到账时间",
						confirmText: "我知道了",
						confirmColor: "#5241FF",
						showCancel: false
					})
					.then(() => {});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.dayBill-state-wrapper {
		.header-wrapper {
			align-items: center;
			background: #fff;
			border-radius: 12px;
			display: flex;
			font-size: 14px;
			margin: 14px auto;
			width: 91%;
			padding: 20px 0;

			.element {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;

				.btn-icon {
					width: 26px;
				}

				span {
					margin-left: 10px;
				}
			}

			.left-element {
				border-right: 2px solid #ccc;
			}
		}

		.main-content {
			margin: 14px auto;
			width: 91%;

			.main-header {
				border-bottom: 1px solid #dfdee3;
				border-top-left-radius: 15px;
				border-top-right-radius: 15px;
				background: #fff;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 8px 10px;
				font-size: 13px;

				.header-right {
					border-radius: 2px;
					color: #fff;
					padding: 4px 7px;
				}

				.status-success {
					background-color: #58cd56;
				}

				.status-failed {
					background: #ee0a24;
				}

				.status-base {
					background: #c8c7cc;
				}
			}

			.main-footer {
				border-top: 1px solid #c8c7cc;
				border-bottom-left-radius: 15px;
				border-bottom-right-radius: 15px;
				background: #fff;
				line-height: 40px;
				text-align: center;
				font-size: 15px;
				color: #5241FF;
			}

			.line-cell-wrapper {
				display: flex;
				align-items: center;
				padding: 5px 10px;
				font-size: 14px;
				background: #fff;

				span {
					color: #666;
				}

				.cell-value {
					flex: 1;
					padding-left: 10px;
					text-align: right;
				}
			}
		}

		.rule-popup-wrapper {
			width: 320px;

			.title {
				font-size: 19px;
				font-weight: 700;
				margin-top: 20px;
				text-align: center;
			}

			.main-wrapper {
				color: #262626;
				font-size: 14px;
				line-height: 21px;
				max-height: 355px;
				overflow-y: auto;
				padding: 16px 20px 20px;
				text-align: justify;

				.example {
					color: #3a3d44;
					font-weight: 900;
					padding: 8px 0;
				}

				.flex-colum {
					background-color: #d1dbec;
					border-top-left-radius: 15px;
					border-top-right-radius: 15px;
					display: flex;
					height: 40px;
					justify-content: space-between;
					line-height: 40px;
					padding: 0 8px;
				}

				.flex-row {
					span {
						display: inline-block;
						height: 40px;
						line-height: 40px;
						margin-left: -6px;
						text-align: center;
						width: 25%;
					}
				}

				.sec-row {
					background: #f9f9f9;
				}

				.third-row {
					background: #ebedf2;
				}
			}

			.btn-style {
				border-top: 1px solid #e6e6e6;
				text-align: center;
				line-height: 50px;
				font-size: 18px;
				font-weight: 500;
				color: #5241FF;
			}
		}
	}
</style>
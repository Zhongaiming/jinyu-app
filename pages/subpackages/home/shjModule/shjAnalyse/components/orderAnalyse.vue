<template>
	<view class="order-analyse">
		<view class="vending-card" style="padding-top: 0">
			<view class="card-title">订单占比</view>
			<!-- 扇图 -->
			<view class="percent-echarts-wrapper">
				<view class="percent-echarts" id="percent"></view>
				<view class="acount-wrapper">
					<view class="item-style item-center">
						<span class="span bg-span"></span>
						<span>退款订单金额： {{ acountTop.amountRefund }} 元</span>
					</view>
					<view class="item-style item-center">
						<span class="span"></span>
						<span>成交订单金额： {{ acountTop.amountTotal }} 元</span>
					</view>
				</view>
			</view>
		</view>
		<view class="vending-card">
			<view class="card-title">
				订单趋势<u-icon name="question-circle" size="36" color="#999" @click="tips" />
			</view>
			<view class="list-wrapper">
				<view class="tab-list">
					<view class="tab-item" v-for="item in typeList" :key="item.id" :class="{'cur': state == item.id}"
						@click="changeState(item.id)">
						{{ item.title }}
					</view>
				</view>
				<!-- 折线图 -->
				<view class="list-echarts" id="list"></view>
				<!-- 统计数据 -->
				<view class="acount-wrapper">
					<view class="item-style" v-show="state == 0">
						<span class="span"></span>
						<span>总订单金额： {{ acountTop.amountTotal }} 元</span>
						<!-- <span>总订单金额： {{ acountObj.paymentQuantity }} 元</span> -->
					</view>
					<view class="item-style" v-show="state == 0">
						<span class="span bg-span"></span>
						<span>总订单笔数： {{ acountTop.paymentQuantity }} 笔</span>
						<!-- <span>总订单笔数： {{ acountObj.refundQuantity }} 笔</span> -->
					</view>
					<view class="item-style" v-show="state == 0">
						<span class="span bl-span"></span>
						<span>总利润： {{ acountTop.summaryProfit }} 元</span>
						<!-- <span>总利润： {{ acountObj.summaryProfit }} 元</span> -->
					</view>
					<view class="item-style" v-show="state == 1">
						<span class="span"></span>
						<span>总退款金额： {{ acountTop.amountRefund }} 元</span>
						<!-- <span>总退款金额： {{ acountObj.paymentQuantity }} 元</span> -->
					</view>
					<view class="item-style" v-show="state == 1">
						<span class="span bg-span"></span>
						<span>总退订单总数： {{ acountTop.refundQuantity }} 笔</span>
						<!-- <span>总退订单总数： {{ acountObj.refundQuantity }} 笔</span> -->
					</view>
				</view>
				<view class="order-list">
					<li class="order-item list-head">
						<span class="col">日期</span>
						<span class="col" v-show="state == 0">成交单量</span>
						<span class="col" v-show="state == 0">成交金额</span>
						<span class="col" v-show="state == 0">客单价(元)</span>
						<span class="col" v-show="state == 0">利润</span>
						<span class="col" v-show="state == 1">退款单量</span>
						<span class="col" v-show="state == 1">退款金额(元)</span>
					</li>
					<li class="order-item" v-for="(item, index) in analysisVoList.slice(0, lengthAll)" :key="index">
						<span class="col">{{ hourChange(item.orderHour) }} </span>
						<span class="col" v-show="state == 0">{{ item.total }}笔</span>
						<span class="col" v-show="state == 0">{{ item.amountTotal }}</span>
						<span class="col" v-show="state == 0">{{ item.unitPricePerCustomer || "0" }}</span>
						<span class="col" v-show="state == 0">{{ item.profit }}</span>
						<span class="col" v-show="state == 1">{{ item.periodRefund || item.refundQuantity || 0 }}</span>
						<span class="col" v-show="state == 1">{{ item.amountRefund }}</span>
					</li>
					<view class="load-more" v-if="lengthAll == 5 && analysisVoList.length > 5"
						@click="lengthAll = analysisVoList.length">
						查看全部
					</view>
					<xls-bottom v-else />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		shjController
	} from '@/api/index.js';
	import * as echarts from "echarts";
	import suan from "@/plugins/floastCalculate";
	export default {
		name: "orderAnalyse",
		data() {
			return {
				state: 0,
				typeList: [{
						id: 0,
						title: "成交订单"
					},
					{
						id: 1,
						title: "退款订单"
					},
				],
				analysisVoList: [],
				params: {},
				lengthAll: 5,
				acountTop: {
					amountTotal: 0,
					amountRefund: 0,
				},
				acountObj: {
					summaryProfit: 0, //利润
					refundQuantity: 0, //笔数
					paymentQuantity: 0, //金额
				},
			};
		},
		methods: {
			tips() {
				let message =
					"统计时间段内，成交单量 = 支付成功单量;\n退款单量 = 全部退款单量 + 部分退款单量;";
					// + 部分成功单量
				this.$modal(message, {
						title: "说明",
						confirmText: "我知道了",
						confirmColor: "#5241FF",
						showCancel: false
					})
					.then(() => {});
			},

			hourChange(orderHour) {
				let text;
				if (orderHour.length > 2) {
					text = orderHour;
				} else if (orderHour.length == 2) {
					text = `${orderHour}:00`;
				} else if (orderHour.length < 2) {
					text = `0${orderHour}:00`;
				}
				return text;
			},
			changeState(id) {
				this.state = id;
				this.getOrder();
			},
			async getOrder(params = this.params) {
				this.params = params;
				let res = await shjController.orderAnalysis({
					startTime: params.startTime,
					endTime: params.endTime,
					state: this.state, //不传默认0  0：查询成功订单  !=0 查询退款订单
					...(params.placeId.length&&{placeId:String(params.placeId)})
				})
				if (res.code == 200) {
					this.acountTop = res.data
					this.analysisVoList = res.data.analysisVoList
					this.lengthAll =
						this.analysisVoList.length > 5 ? 5 : this.analysisVoList.length;
				}
				this.drawLine(
					res.data.paymentQuantity||0, //成交笔数
					res.data.refundQuantity||0 //退款笔数
				);
				this.drawList();
			},
			//扇图
			drawLine(paymentQuantity, refundQuantity) {
				// 为charts选定父容器并初始化charts画布
				let myChart = echarts.init(document.getElementById("percent"));
				myChart.clear();
				// 为图表添加数据
				myChart.setOption({
					tooltip: {
						trigger: "item",
						formatter: "{a} <br/>{b} : {c} ({d}%)", //a 标题 b name c value d %
					},
					series: [{
						name: "订单分析",
						type: "pie",
						radius: [30, 60],
						itemStyle: {
							borderRadius: 10,
						},
						data: [{
								value: paymentQuantity,
								name: "成交订单"
							},
							{
								value: refundQuantity,
								name: "退款订单"
							},
						],
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: "rgba(0, 0, 0, 0.5)",
							},
						},
						// roseType: "area", //南丁格尔图
						// stillShowZeroSum: false, //数据和为 0，不显示饼图
						label: {
							// show: false,
							normal: {
								formatter: "{font|{b}}\n{hr|}\n{font|{c}笔}",
								rich: {
									font: {
										align: "left", //设置字体左对齐
										fontSize: 12, //设置字体大小
										padding: [5, 0],
										color: "#000", //设置字体颜色
									},
									hr: {
										height: 1, //
										borderWidth: 1, //控制线的厚度
										width: "100%",
										align: "left",
										borderColor: "#fff", //线颜色
									},
								},
							},
						}, //扇形对应的标签也不显示
					}, ],
				});
				window.addEventListener("resize", function() {
					myChart.resize();
				});
			},
			//折线
			drawList() {
				let xData = [];
				let lineO = [];
				let lineT = [];
				let lineTh = [];
				this.acountObj = {
					summaryProfit: 0, //利润
					refundQuantity: 0, //笔数
					paymentQuantity: 0, //金额
				};
				this.analysisVoList.map((item) => {
					xData.push(this.hourChange(item.orderHour));
					if (this.state == 0) {
						this.acountObj.refundQuantity = suan.add(
							this.acountObj.refundQuantity,
							item.total * 1
						);
						this.acountObj.paymentQuantity = suan.add(
							this.acountObj.paymentQuantity,
							item.amountTotal * 1
						);
						this.acountObj.summaryProfit = suan.addFloast(
							this.acountObj.summaryProfit,
							item.profit * 1
						);
						lineO.push(item.amountTotal);
						lineT.push(item.total);
						lineTh.push(item.profit);
					} else {
						lineO.push(item.amountRefund);
						lineT.push(item.periodRefund || item.refundQuantity || 0);
						this.acountObj.refundQuantity = suan.add(
							this.acountObj.refundQuantity,
							item.periodRefund || item.refundQuantity || 0
						);
						this.acountObj.paymentQuantity = suan.add(
							this.acountObj.paymentQuantity,
							item.amountRefund
						);
					}
				});
				let legenD =
					this.state == 0 ? ["订单金额", "订单笔数", "利润"] : ["退款金额", "退款单数"];
				let seD =
					this.state == 0 ? [{
							name: "订单金额",
							type: "line",
							stack: "Total",
							data: lineO,
						},
						{
							name: "订单笔数",
							type: "line",
							stack: "Total",
							data: lineT,
						},
						{
							name: "利润",
							type: "line",
							stack: "Total",
							data: lineTh,
						},
					] : [{
							name: "退款金额",
							type: "line",
							stack: "Total",
							data: lineO,
						},
						{
							name: "退款单数",
							type: "line",
							stack: "Total",
							data: lineT,
						},
					];
				// 为charts选定父容器并初始化charts画布
				let myChart = echarts.init(document.getElementById("list"));
				myChart.clear();
				// 为图表添加数据
				myChart.setOption({
					legend: {
						data: legenD,
						bottom: 0,
					},
					tooltip: {
						trigger: "axis",
					},
					grid: {
						left: "3%",
						right: "12%",
						bottom: "12%",
						containLabel: true,
					},
					xAxis: {
						type: "category",
						boundaryGap: false,
						data: xData,
					},
					yAxis: {
						type: "value",
					},
					series: seD,
				});
				window.addEventListener("resize", function() {
					myChart.resize();
				});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.order-analyse {
		width: 100%;
		padding-bottom: 60px;

		.vending-card {
			padding: 10px 10px 0;

			.percent-echarts-wrapper {
				background: #fff;
				border-radius: 10px;
			}

			.percent-echarts {
				width: 100%;
				height: 226px;
			}
		}

		.card-title {
			font-size: 14px;
			line-height: 24px;
			margin-bottom: 5px;
			display: flex;
			align-items: center;
		}

		.list-wrapper {
			background: #fff;
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;
			padding-top: 15px;

			.tab-list {
				border: 1px solid #5241ff;
				border-radius: 5px;
				display: flex;
				margin: 0 auto;
				box-sizing: border-box;
				width: 40%;
				overflow: hidden;

				.tab-item {
					color: #5241ff;
					flex: 1;
					text-align: center;
					line-height: 32px;
					height: 32px;
					padding: 0 10px;
					font-size: 12px;
				}

				.cur {
					background-color: #5241ff;
					color: #fff;
				}
			}

			.list-echarts {
				width: 100%;
				height: 246px;
			}

			.order-list {
				.order-item {
					align-items: center;
					border-bottom: 1px solid #e5e5e5;
					display: flex;
					flex-direction: row;
					font-size: 13px;
					padding: 0 5px;

					.col {
						color: #000;
						text-align: center;
						flex: 1;
						white-space: nowrap;
						line-height: 20px;
						padding: 10px 0;
					}
				}

				.list-head {
					font-size: 14px;
				}

				.load-more {
					color: #5241ff;
					line-height: 40px;
					text-align: center;
					font-size: 15px;
				}
			}
		}

		.acount-wrapper {
			padding: 5px 12px;
			display: flex;
			align-items: center;
			flex-wrap: wrap;

			.item-style {
				width: 50%;
				display: flex;
				align-items: center;
				margin-bottom: 6px;
				font-weight: 700;
				font-size: 14px;

				.span {
					width: 10px;
					height: 10px;
					background: #5873c8;
					margin-right: 6px;
				}

				.bg-span {
					background: #91cc75;
				}

				.bl-span {
					background: #fac858;
				}
			}

			.item-center {
				justify-content: center;
			}
		}
	}
</style>
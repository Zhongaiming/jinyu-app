<template>
	<view class="produce-analyse">
		<view class="vending-card" style="padding-top: 0">
			<view class="card-title">销售趋势分析</view>
			<!-- 单品分析 -->
			<view class="produce-echarts" id="produce"></view>
			<view class="card-wrapper">
				<view class="summary_info">
					<span class="info-item">成交数: {{ acountObj.total }} 笔</span><span class="info-item">成交金额:
						{{ acountObj.amountTotal }} 元</span><span class="info-item">利润: {{ acountObj.profit }} 元</span>
				</view>
				<view class="order-list">
					<li class="order-item list-head">
						<span class="col col-big">日期</span>
						<span class="col">成交笔数</span>
						<span class="col">出货件数</span>
						<span class="col col-big">成交金额(元)</span>
						<span class="col">利润(元)</span>
					</li>
					<li class="order-item" v-for="(item, index) in analysisVoLists" :key="index">
						<span class="col col-big">{{ hourChange(item.data || item.orderHour) }}
						</span>
						<span class="col">{{ item.total }}</span>
						<span class="col">{{ item.totalShipments }}个</span>
						<span class="col col-big">{{ item.amountTotal }}</span>
						<span class="col">{{ item.profit }}</span>
					</li>
					<xls-bottom v-if="analysisVoLists.length" />
					<xls-empty v-else />
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
	export default {
		name: "produceAnalyse",
		data() {
			return {
				analysisVoLists: [],
				acountObj: {
					amountTotal: 0,
					profit: 0,
					total: 0,
				},
			};
		},
		methods: {
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
			async getProduce(params, commodityId) {
				let res = await api.singleProductAnalysis({
					startTime: params.startTime,
					endTime: params.endTime,
					commodityVendingMachineId: commodityId,
					placeIds: params.placeId.length ? String(params.placeId) : null, //场地id  String类型
				});
				if (res.code == 200) {
					this.analysisVoLists = res.data.data.analysisVoList;
					this.acountObj = res.data.data;
				}
				this.drawList();
			},
			drawList() {
				let xData = [];
				let lineO = [];
				let lineT = [];
				let lineTh = [];
				this.analysisVoLists.map((item) => {
					xData.push(this.hourChange(item.data || item.orderHour));
					lineO.push(item.total);
					lineT.push(item.amountTotal);
					lineTh.push(item.totalShipments);
				});
				// 为charts选定父容器并初始化charts画布
				let myChart = echarts.init(document.getElementById("produce"));
				myChart.clear();
				// 为图表添加数据
				myChart.setOption({
					legend: {
						data: ["成交数", "成交金额", "出货件数"],
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
					series: [{
							name: "成交数",
							type: "line",
							stack: "Total",
							data: lineO,
						},
						{
							name: "成交金额",
							type: "line",
							stack: "Total",
							data: lineT,
						},
						{
							name: "出货件数",
							type: "line",
							stack: "Total",
							data: lineTh,
						},
					],
				});
				window.addEventListener("resize", function() {
					myChart.resize();
				});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.produce-analyse {
		width: 100%;
		padding-bottom: 60px;

		.vending-card {
			padding: 10px 10px 0;

			.produce-echarts {
				width: 100%;
				height: 226px;
				background: #fff;
				border-top-left-radius: 10px;
				border-top-right-radius: 10px;
			}

			.card-title {
				font-size: 14px;
				line-height: 24px;
				margin-bottom: 5px;
			}

			.card-wrapper {
				border-bottom-left-radius: 10px;
				border-bottom-right-radius: 10px;
				background: #fff;

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

						.col-big {
							flex: 1.5;
						}
					}

					.list-head {
						font-size: 14px;
					}
				}
			}

			.summary_info {
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				padding: 7px 9px 0;

				.info-item {
					color: #000;
					font-size: 14px;
					max-width: 150px;
					overflow: hidden;
					text-align: center;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}
	}
</style>
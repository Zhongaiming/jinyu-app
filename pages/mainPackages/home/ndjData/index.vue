<template>
	<z-paging ref="ndjPaging" v-model="eggRailList" @query="queryList">
		<jy-navbar title="扭蛋机数据" slot="top"></jy-navbar>
		<view class="lyyCell">
			<view class="data-table" ref="choose">
				<xls-quick-date @getCondition="getCondition"></xls-quick-date>
				<view class="data-summary">
					<view class="container">
						<view class="data-item">
							<p class="data">
								{{eggEarnMsg.totalInsertCoins?keepFixed(eggEarnMsg.totalInsertCoins):0}}
							</p>
							<p class="title Center">合计投币(个)</p>
						</view>
						<view class="data-item">
							<p class="data">
								{{eggEarnMsg.onlinePayAmount?keepFixed(eggEarnMsg.onlinePayAmount):0}}
							</p>
							<p class="title Center">在线支付(元)</p>
						</view>
						<view class="data-item">
							<p class="data">
								{{eggEarnMsg.outPresentCount?keepFixed(eggEarnMsg.outPresentCount):0}}
							</p>
							<p class="title Center">出货总数</p>
						</view>
					</view>
				</view>
				<derive-watch leftTit="按货道" rightTit="按日期" @aisleOrdate="aisleOrdate"></derive-watch>
			</view>
			<view class="table-container" @scroll="crossSlip($event)">
				<view class="thead-fixed show" v-show="topTitle">
					<table border="0">
						<thead :style="containerStyle">
							<tr>
								<th class="tex-center" v-show="listType == 1">
									<p style="width: 85px">设备编号</p>
								</th>
								<th class="tex-center" v-show="listType == 1">
									<p style="width: 100px">商品名称</p>
								</th>
								<th class="tex-center" v-show="listType == 1">
									<p style="width: 60px">出货数</p>
								</th>
								<th class="tex-center" v-show="listType == 1">
									<p style="width: 60px">现有库存</p>
								</th>
								<th class="tex-center" v-show="listType == 1">
									<p style="width: 60px">启动单价</p>
									<p style="width: 60px" class="desc">(元/次)</p>
								</th>

								<th class="tex-center" v-show="listType == 2">
									<p style="width: 28vw">日期</p>
								</th>
								<th class="tex-center">
									<p :style="{width:listType==1?'60px':'16vw'}">
										线下投币
									</p>
									<p :style="{width:listType==1?'60px':'16vw'}" class="desc">
										(个)
									</p>
								</th>
								<th class="tex-center">
									<p :style="{width:listType==1?'60px':'16vw'}">
										线上投币
									</p>
									<p :style="{width:listType==1?'60px':'16vw'}" class="desc">
										(个)
									</p>
								</th>
								<th class="tex-center">
									<p :style="{width:listType==1?'70px':'19vw'}">
										在线支付
									</p>
									<p :style="{width:listType==1?'70px':'19vw'}" class="desc">
										(元)
									</p>
								</th>
								<th class="tex-center" v-show="listType == 2">
									<p style="width: 16vw">出货数</p>
								</th>

								<th class="tex-center" v-show="listType == 1">
									<p style="width: 100px">货道号</p>
								</th>
								<th style="text-align: left" v-show="listType == 1">
									<p style="width: 150px">场地名称</p>
								</th>
							</tr>
						</thead>
					</table>
				</view>
				<table border="0" id="table-gash">
					<thead>
						<tr>
							<th class="tex-center" v-if="listType == 1">
								<p style="width: 85px">设备编号</p>
							</th>
							<th class="tex-center" v-if="listType == 1">
								<p style="width: 100px">商品名称</p>
							</th>
							<th class="tex-center" v-if="listType == 1">
								<p style="width: 60px">出货数</p>
							</th>
							<th class="tex-center" v-if="listType == 1">
								<p style="width: 60px">现有库存</p>
							</th>
							<th class="tex-center" v-if="listType == 1">
								<p style="width: 60px">启动单价</p>
								<p style="width: 60px" class="desc">(元/次)</p>
							</th>

							<th class="tex-center" v-if="listType == 2">
								<p style="width: 28vw">日期</p>
							</th>
							<th class="tex-center">
								<p :style="{width:listType==1?'60px':'16vw'}">
									线下投币
								</p>
								<p :style="{width:listType==1?'60px':'16vw'}" class="desc">
									(个)
								</p>
							</th>
							<th class="tex-center">
								<p :style="{width:listType==1?'60px':'16vw'}">
									线上投币
								</p>
								<p :style="{width:listType==1?'60px':'16vw'}" class="desc">
									(个)
								</p>
							</th>
							<th class="tex-center">
								<p :style="{width:listType==1?'70px':'19vw'}">
									在线支付
								</p>
								<p :style="{width:listType==1?'70px':'19vw'}" class="desc">
									(元)
								</p>
							</th>
							<th class="tex-center" v-if="listType == 2">
								<p style="width: 16vw">出货数</p>
							</th>

							<th class="tex-center" v-if="listType == 1">
								<p style="width: 100px">货道号</p>
							</th>
							<th style="text-align: left" v-if="listType == 1">
								<p style="width: 150px">场地名称</p>
							</th>
						</tr>
					</thead>
					<tbody v-if="eggRailList.length">
						<tr v-for="(item, index) in eggRailList" :key="index">
							<!-- 设备编号 -->
							<td class="tex-center" v-if="listType == 1">
								<p>
									<span style="max-width: 85px">{{ item.deviceNumber }}</span>
								</p>
							</td>
							<!-- 商品名称 -->
							<td class="tex-center" v-if="listType == 1">
								<p>
									<span style="max-width: 100px">
										{{item.commodityName?item.commodityName:item.commodityState == 2?'未设置商品':'未知'}}
									</span>
									<span class="text-history" v-if="item.commodityState === 0">(历史)</span>
								</p>
							</td>
							<!-- 出货数 -->
							<td class="tex-center" v-if="listType == 1">
								<p>
									<span style="max-width: 60px">{{item.outPresentCount}}</span>
								</p>
							</td>
							<!-- 现有库存 -->
							<td class="tex-center" v-if="listType == 1">
								<p>
									<span style="max-width: 60px">{{ item.railRepertory }}</span>
								</p>
							</td>
							<!-- 投币单价 -->
							<td class="tex-center" v-if="listType == 1">
								<p>
									<span style="max-width: 60px">{{ item.price }}</span>
								</p>
							</td>
							<!-- 日期 -->
							<td class="tex-center" v-if="listType == 2">
								<p>
									<span style="max-width: 105px">{{ item.date }}</span>
								</p>
							</td>
							<!-- 线下投币 -->
							<td class="tex-center">
								<p>
									<span
										style="max-width: 60px">{{listType == 1?item.offlineOutTokenCount:item.offline_count || 0}}</span>
								</p>
							</td>
							<!-- 线上投币 -->
							<td class="tex-center">
								<p>
									<span
										style="max-width: 60px">{{listType==1?item.onlineOutTokenCount:item.online_count}}</span>
								</p>
							</td>
							<!-- 在线支付 -->
							<td class="tex-center">
								<p>
									<span
										style="max-width: 70px">{{listType == 1?item.orderMoney||0:item.amount_total||0}}</span>
								</p>
							</td>
							<!-- 出货数 -->
							<td class="tex-center" v-if="listType == 2">
								<p>
									<span style="max-width: 60px">{{item.out_present_count}}</span>
								</p>
							</td>
							<!-- 货道号 -->
							<td class="tex-center" v-if="listType == 1">
								<p>
									<span style="max-width: 100px">{{ item.railNumber }}</span>
								</p>
							</td>
							<!-- 场地名称 -->
							<td style="text-align: left" v-if="listType == 1">
								<p>
									<span style="max-width: 150px">{{ item.placeName }}</span>
								</p>
							</td>
						</tr>
					</tbody>
				</table>

			</view>
		</view>
		<xls-empty slot="empty"></xls-empty>
	</z-paging>
</template>

<script>
	// import TopChoose from "../gashComps/topChoose";
	import {
		deviceDataController
	} from "@/api/index.js";
	import {
		getDateAll
	} from "@/plugins/utilityClass";
	import DeriveWatch from "./components/derive-watch.vue";

	export default {
		components: {
			DeriveWatch,
			// TopChoose,
		},
		data() {
			return {
				//数据
				eggEarnMsg: {},
				eggRailList: [],
				//参数
				listType: 1,
				startTime: getDateAll(20),
				endTime: getDateAll(0),
				placeId: "",
				scrollLeft: 0,
				topTitle: false,
			};
		},
		computed: {
			containerStyle() {
				return this.listType === 1 ?
					`left: -${this.scrollLeft}px;` :
					'left: 0px;';
			}
		},
		methods: {
			keepFixed(item) {
				return item > 10000 ? (item / 10000).toFixed(2) + "万" : item;
			},
			//统计搜索
			getAcount() {
				const params = {
					startTime: `${this.startTime} 00:00:00`,
					endTime: `${this.endTime} 23:59:59`,
					placeId: this.placeIds,
				}
				//支付总数
				deviceDataController.getOrderSum(params).then((res) => {
					const result = res.data;
					this.eggEarnMsg.onlinePayAmount = result ? result : 0;
				});
				//投币总数
				deviceDataController.getCoinSum(params).then((res) => {
					const result = res.data;
					this.eggEarnMsg.totalInsertCoins = result ? result : 0;
				});
				//出礼总数
				deviceDataController.getOutPresentSum(params).then((res) => {
					const result = res.data;
					this.eggEarnMsg.outPresentCount = result ? result : 0;
				});
			},
			queryList(pageNo, pageSize) {
				this.getAcount();
				const params = {
					page: pageNo,
					size: pageSize,
					startTime: `${this.startTime} 00:00:00`,
					endTime: `${this.endTime} 23:59:59`,
					...(this.placeId && {
						placeId: String(this.placeId)
					})
				}
				const API = this.listType == 1 ? 'getTwistedEggInfo' : 'getSumByDate';
				deviceDataController[`${API}`](params).then(res => {
					this.$refs.ndjPaging.complete(res.data);
				})
			},
			//按货道或日期
			aisleOrdate(params) {
				this.listType = params ? 2 : 1;
				this.$refs.ndjPaging.reload();
			},
			getCondition(result) {
				const {
					startTime,
					endTime,
					placeIdList
				} = result;
				this.startTime = startTime;
				this.endTime = endTime;
				this.placeId = placeIdList;
				this.$refs.ndjPaging.reload();
			},

			//纵向
			screenSlide() {
				let scrollTop =
					document.documentElement.scrollTop ||
					document.body.scrollTop ||
					window.pageYOffset;
				var scrollHeight = document.documentElement.scrollHeight; // 元素高度
				var clientHeight = document.documentElement.clientHeight; // 视口高度
				if (scrollTop + clientHeight + 50 >= scrollHeight) {
					if (this.onEarth == false) {
						this.getEarndata();
					}
				}
				this.topTitle = scrollTop >= this.$refs.choose.scrollHeight + 48;
			},
			//横向滚动
			crossSlip(event) {
				this.scrollLeft = event.target.scrollLeft;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.lyyCell {
		background: #fff;

		.data-summary {
			background: #fff;
			overflow: auto;
			padding: 0 10px;

			.container {
				align-items: center;
				background: #5241ff;
				border-radius: 5px;
				display: flex;
				height: 63px;
				justify-content: space-around;
				margin: 14px 0 16px;
				text-align: center;

				.data-item {
					color: #fff;
					flex: 1;

					.data {
						font-size: 17px;
						font-weight: 500;
						line-height: 17px;
					}

					.title {
						font-size: 13px;
						font-weight: 400;
						line-height: 18px;
					}
				}
			}
		}

		.table-container {
			overflow-x: auto;
			box-sizing: content-box;
			width: 100%;
			position: relative;
			z-index: 1000;
			background: #fff;

			.loading {
				padding-left: 150px;
			}

			table {
				font-size: 14px;
				overflow: hidden;
				text-align: center;
				text-overflow: ellipsis;
				white-space: nowrap;
				width: 100%;
				border-collapse: collapse;
				border-spacing: 0;
				text-indent: initial;

				thead {
					background: #e6e4fe;
					font-size: 11px;

					th {
						height: 40px;
						margin-left: 20px;
						padding: 0 2px;
					}

					p {
						box-sizing: content-box;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}

					.desc {
						color: #ccc;
						font-size: 10px;
						text-align: center;
					}

					.txt-center {
						text-align: center;
					}
				}

				tbody {
					tr {
						border-bottom: 1px solid #e6e6e6;
						height: 40px;

						td {
							padding: 0 2px;

							span {
								display: inline-block;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
								font-size: 14px;
								font-family: PingFangSC-Regular;
							}

							.text-history {
								color: #f60;
								display: block !important;
								font-size: 10px;
								margin-top: -5px;
								text-align: center;
							}
						}
					}
				}
			}

			.thead-fixed {
				display: none;

				thead {
					position: fixed;
					top: 0;
					z-index: 99999;
				}
			}

			.show {
				display: block;
			}
		}

		.table-container::-webkit-scrollbar {
			display: none;
		}

		.data-table * {
			box-sizing: content-box;
		}

		.bottom-txt {
			line-height: 40px;
			text-align: center;
			font-size: 14px;
			background: #f5f6f7;
			color: #999;
		}
	}
</style>
<template>
	<view class="commodity-analyse">
		<!-- 数据统计 -->
		<view class="goods-center-wrapper" v-if="moreList == 1">
			<view class="goods-center">
				<view class="goods-center-item" @click="tips">
					<view class="name">
						动销商品数 <u-icon name="question-circle-fill" size="40" color="#fff" />
					</view>
					<view class="number">{{ acountObj.typeOfMovingPin }} 种</view>
				</view>
				<view class="goods-center-item item-style" @click="tips(1)">
					<view class="name">
						成交数量 <u-icon name="question-circle-fill" size="40" color="#fff" />
					</view>
					<view class="number">{{ acountObj.numberOfTransactions }} 件</view>
				</view>
				<view class="goods-center-item" @click="tips(2)">
					<view class="name">
						利润 <u-icon name="question-circle-fill" size="40" color="#fff" />
					</view>
					<view class="number">{{ acountObj.profit }} 元</view>
				</view>
			</view>
		</view>
		<!-- 商品列表 -->
		<view class="goods-ranking-container">
			<view v-if="moreList == 1">
				<view class="container-header">
					<span>商品销售排行榜</span>
					<span class="more" v-if="lengthAll == 10 && commodityList.length > 10"
						@click="(lengthAll = commodityList.length), (moreList = 2)">更多</span>
				</view>
				<view class="ranking-btn-block">
					<view class="ranking-btn" v-for="(item, index) in typeList" :key="index"
						:class="{'actived':type == item.id}" @click="changeType(item.id)">
						{{ item.title }}
					</view>
				</view>
			</view>
			<view class="goods-ranking-list" v-if="moreList == 1 || moreList == 2">
				<view class="goods-list-item" v-for="(item, index) in commodityList" :key="index">
					<view class="item-left">{{ index + 1 }}</view>
					<view class="item-right">
						<image :src="item.commodityImg" alt="" class="item-image" />
						<view class="item-right-des">
							<view class="item-top">
								<span class="item-name">{{item.commodityName}}</span>
								<a class="item-top_right more more-style"
									@click="produceCell(item.commodityId)">单品分析</a>
							</view>
							<view class="item-bottom">
								<span class="bottem-des">成交 {{ item.strikeABargain }} 笔</span>
								<span class="bottem-des">出货 {{ item.shipment }} 个</span>
								<span class="bottem-des">成交 {{ $formatAmount(item.amount) }} 元</span>
								<span class="bottem-des">利润 {{ item.commodityProfit }} 元</span>
							</view>
						</view>
					</view>
				</view>
				<xls-bottom v-if="commodityList.length" />
				<xls-empty v-else />
			</view>
		</view>
		<!-- 单品分析 -->
		<ProduceAnalyse ref="produce" v-show="moreList == 3" />
	</view>
</template>

<script>
	import ProduceAnalyse from "./produceAnalyse.vue";
	import {
		shjController
	} from '@/api/index.js';
	export default {
		name: "commodityAnalyse",
		components: {
			ProduceAnalyse
		},
		data() {
			return {
				type: 1,
				typeList: [{
						id: 1,
						title: "按出货数"
					},
					{
						id: 2,
						title: "按成交笔数"
					},
					{
						id: 3,
						title: "按成交金额"
					},
				],
				moreList: 1,
				params: {},
				commodityList: [],
				acountObj: {
					numberOfTransactions: 0,
					profit: 0,
					typeOfMovingPin: 0,
				},
				lengthAll: 10,
				commodityId: 0,
			};
		},
		methods: {
			tips(type) {
				let message = "统计时间段内，销量>0 的商品种类数量";
				if (type == 1) {
					message = "统计时间内， 成功付款订单的商品数量之和";
				} else if (type == 2) {
					message = "统计时间段内，总利润=∑（单个商品零售总额-单个商品成本）";
				}
				this.$modal(message,{
						title: "说明",
						confirmText: "我知道了",
						confirmColor: "#5241FF",
						showCancel: false
					})
					.then(() => {});
			},
			//排行方式
			changeType(id) {
				this.type = id;
				this.getAnalysis();
			},
			//单品分析
			produceCell(commodityId) {
				this.moreList = 3;
				this.commodityId = commodityId;
				this.$emit('setTitle', "单品分析")
				this.getAnalysis(this.params, this.commodityId);
			},
			//商品列表
			async getAnalysis(params = this.params, commodityId = this.commodityId) {
				this.params = params;
				this.commodityId = commodityId;
				if (this.moreList == 3) {
					return this.$refs.produce.getProduce(params, commodityId);
				}
				let res = await shjController.salesAnalysis({
					startTime: params.startTime,
					endTime: params.endTime,
					size: 10000,
					type: this.type, //默认1按出货数排序 2按成交笔数 3按成交金额
					placeIds: params.placeId.length ? String(params.placeId) : null, //场地id  String类型
				});
				if (res.code == 200) {
					this.acountObj = res.data
					this.commodityList = res.data.analysisVoList;
					this.lengthAll =
						this.commodityList.length > 10 ? 10 : this.commodityList.length;
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.commodity-analyse {
		width: 100%;
		padding-bottom: 60px;

		.goods-center-wrapper {
			padding: 10px;
			padding-top: 0;

			.goods-center {
				display: flex;
				align-items: center;
				padding: 15px 0;
				background-color: #5241ff;
				border-radius: 7px;

				.goods-center-item {
					flex: 1;
					text-align: center;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					.name {
						color: hsla(0, 0%, 100%, 0.7);
						font-size: 13px;
						margin-bottom: 10px;
						display: flex;
						align-items: center;
					}

					.number {
						color: #fff;
						font-size: 18px;
						text-align: center;
					}
				}

				.item-style {
					border-left: 1px solid hsla(0, 0%, 100%, 0.7);
					border-right: 1px solid hsla(0, 0%, 100%, 0.7);
				}
			}
		}

		.goods-ranking-container {
			background: #fff;

			.container-header {
				display: flex;
				align-items: center;
				justify-content: space-between;
				color: rgba(0, 0, 0, 0.8);
				font-size: 15px;
				padding: 10px 18px 0 10px;
			}

			.more {
				position: relative;
				color: rgba(0, 0, 0, 1);
				font-size: 14px;
			}

			.more::after {
				border-right: 1px solid #000;
				border-top: 1px solid #000;
				content: "";
				height: 6.5px;
				opacity: 0.6;
				position: absolute;
				right: -7.5px;
				top: 50%;
				transform: translateY(-50%) rotate(45deg);
				width: 6.5px;
			}

			.more-style::after {
				border-right: 1px solid #5241ff;
				border-top: 1px solid #5241ff;
			}

			.ranking-btn-block {
				margin: 0 10px;
				padding: 10px 0;
				position: relative;
				display: flex;
				align-items: center;

				.ranking-btn {
					background-color: #f2f2f2;
					border-radius: 6px;
					color: #616161;
					text-align: center;
					font-size: 15px;
					line-height: 32px;
					margin-right: 13px;
					width: 95px;
				}

				.actived {
					background-color: #fff;
					border: 2px solid #5241ff;
					color: #5241ff;
				}
			}

			.goods-ranking-list {
				.goods-list-item {
					align-items: center;
					background-color: #fff;
					display: flex;
					flex-direction: row;
					flex-wrap: nowrap;
					padding-right: 11px;

					.item-left {
						color: #616161;
						font-size: 15px;
						text-align: center;
						width: 29px;
					}

					.item-right {
						align-items: center;
						display: flex;
						flex: 1;
						flex-direction: row;
						flex-wrap: nowrap;
						justify-content: flex-start;
						padding: 11px 11px 11px 0;
						position: relative;
						border-top: 1px solid #e5e5e5;

						.item-image {
							border-radius: 5px;
							height: 50px;
							margin-right: 10px;
							vertical-align: middle;
							width: 50px;
						}

						.item-right-des {
							flex: 1;
							vertical-align: middle;

							.item-name {
								color: #000;
								display: inline-block;
								font-size: 15px;
								max-width: 70%;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}

							.item-top_right {
								color: #5241ff;
								float: right;
								font-size: 15px;
								position: relative;
							}

							.item-bottom {
								align-items: center;
								display: flex;
								flex-direction: row;
								flex-wrap: nowrap;
								justify-content: space-between;
								margin-top: 13px;

								.bottem-des {
									color: rgba(0, 0, 0, 0.8);
									display: inline-block;
									font-size: 12px;
									max-width: 33.33%;
									overflow: hidden;
									text-overflow: ellipsis;
									white-space: nowrap;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
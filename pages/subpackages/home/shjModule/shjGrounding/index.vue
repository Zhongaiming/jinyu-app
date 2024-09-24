<template>
	<view class="shj-grounding">
		<xls-jy-navbar title="商品上架" bgColor="#f5f6f7"></xls-jy-navbar>
		<xls-search @confirm="stratesSearch" placeholder="请输入货道号"></xls-search>
		<view class="container-content">
			<view class="top-statistics">
				<view class="statistics-item">
					<view class="item-value">{{ acountMsg.railCount }}</view>
					<view>货道总数</view>
				</view>
				<view class="statistics-item">
					<view class="item-value red">{{ acountMsg.shortSupply }}</view>
					<view>缺货数</view>
				</view>
				<view class="statistics-item">
					<view class="item-value">{{ acountMsg.total }}</view>
					<view>库存总容量</view>
				</view>
				<view class="statistics-item">
					<view class="item-value red">{{ acountMsg.stock }}</view>
					<view>现有库存总量</view>
				</view>
			</view>
			<view class="exhibition-mode" v-hasPermi="['app:shj:grounding:type']" @click="$refs.type.showType = true">
				<span class="mode-label">商品展示方式</span>
				<span class="mode-value text-over">{{ showTypeText }}</span>
			</view>
		</view>
		<view class="goods-list" v-if="railList.length">
			<view class="goods-item" v-for="(item, index) in railList" :key="index" v-show="item.railEnable == 1">
				<view class="aisle-text">
					<span>货道-{{ item.deviceNumber + "-" + item.railNumber }}</span>
					<span class="handle-right" v-hasPermi="['app:shj:grounding:edit']"
						@click="$refs.edit.handleEdit(item)">
						<u-icon name="edit" size="20" />
						编辑
					</span>
				</view>
				<view class="info-wrapper">
					<xls-image :src="item.commodityImg" alt="" v-if="item.commodityImg" />
					<xls-image :src="`${$baseUrl}/image/other/ztwl.png`" alt="" v-else />
					<view class="goods-info">
						<view class="goods-name">{{ item.commodityName || "暂无" }}</view>
						<view class="info-content">
							<view class="info-item">
								<view>{{ item.price }}元</view>
								<view class="label">商品售卖价格</view>
							</view>
							<view class="info-item">
								<view>{{ item.railRepertory }} / {{ item.railCapacity }}个</view>
								<view class="label">现有库存/货道容量</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<xls-bottom />
		</view>
		<xls-empty v-else text="暂无货道或货道禁用" />
		<view class="container-footer" v-hasPermi="['app:shj:grounding:edit']" v-if="railList.length">
			<view class="text-btn" @click="$refs.batch.openModule(1)">批量设置</view>
		</view>
		<show-type ref="type" v-hasPermi="['app:shj:grounding:edit']" />
		<edit-rail ref="edit" v-hasPermi="['app:shj:grounding:edit']" />
		<!-- <batch-setting ref="batch" v-hasPermi="['app:shj:grounding:edit']" /> -->
	</view>
</template>

<script>
	import {
		shjController
	} from "@/api/index.js";
	import ShowType from "./components/showType.vue";
	import EditRail from "./components/editRail.vue";
	// import BatchSetting from "@/components/shj/batchSetting.vue";

	export default {
		name: "shjGrounding",
		components: {
			ShowType,
			EditRail,
			// BatchSetting
		},
		data() {
			return {
				deviceNumber: "",
				railList: [],
				allRailList: [],
				//统计
				acountMsg: {
					total: 0,
					stock: 0,
					shortSupply: 0,
					railCount: 0,
				},
				showTypeText: "未设置",
			};
		},
		async onLoad(option) {
			if (option.params) {
				const {
					deviceNumber
				} = JSON.parse(option.params)
				this.deviceNumber = deviceNumber;
				this.getDetail();
				// this.$nextTick(() => {
				// 	this.$refs.type.getSet(this.deviceNumber);
				// });
			}
		},
		methods: {
			//详情
			async getDetail() {
				const {deviceNumber} = this
				let res = await shjController.replenishmentDetails({
					deviceNumber
				});
				if (res.code == 200) {
					const {list, total, stock, shortSupply, railCount} = res.data
					this.railList = list;
					this.allRailList = list;
					this.acountMsg.total = total;
					this.acountMsg.stock = stock;
					this.acountMsg.shortSupply = shortSupply;
					this.acountMsg.railCount = railCount;
				}
			},
			stratesSearch(value) {
				if (!value) {
					return (this.railList = this.allRailList);
				}
				this.railList = this.allRailList.filter((item) => {
					return item.railNumber.indexOf(value) > -1;
				});
			},
		},
	};
</script>

<style lang="less" scoped>
	.shj-grounding {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 999;
		background: #f5f6f7;
		height: 100vh;
		width: 100%;
		display: flex;
		flex-direction: column;

		.container-content {
			background: #fff;
			padding: 10px 10px 5px;
		}

		.top-statistics {
			background: #f6f7f9;
			border-radius: 10px;
			color: #666;
			display: flex;
			font-size: 13px;
			padding: 10px 10px 15px;
		}

		.statistics-item {
			flex: 1;
			text-align: center;

			.item-value {
				font-size: 17px;
			}

			.red {
				color: #ff2828;
			}
		}

		.exhibition-mode {
			padding: 10px 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 15px;

			.mode-value {
				flex: 1;
				color: #5241ff;
				padding-right: 20px;
				padding-left: 10px;
				position: relative;
				text-align: right;
			}

			.mode-value:after {
				border-right: 1px solid #5241ff;
				border-top: 1px solid #5241ff;
				content: "";
				height: 9px;
				opacity: 0.6;
				position: absolute;
				right: 5px;
				top: 50%;
				transform: translateY(-50%) rotate(45deg);
				width: 9px;
			}
		}

		.goods-list {
			flex: 1;
			box-sizing: border-box;
			padding: 15px 10px 70px;
			overflow: scroll;

			.goods-item {
				padding: 10px 0;

				.aisle-text {
					font-size: 14px;
					padding-bottom: 5px;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.handle-right {
						margin-right: 28px;
						font-size: 14px;
						color: #5241ff;
					}
				}

				.info-wrapper {
					box-shadow: 0 2px 8px 0 hsl(0deg, 0%, 84% / 50%);
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					margin-top: 7px;
					padding: 10px 0 10px 10px;
					background: #fff;
					border-radius: 5px;

					img {
						width: 108px;
						height: 108px;
						margin-right: 10px;
					}

					.goods-info {
						flex: 1;

						.goods-name {
							border-bottom: 1px solid #e6e6e6;
							color: #262626;
							font-size: 15px;
							padding: 5px 0;
						}

						.info-content {
							margin-top: 10px;
							display: flex;
							align-items: center;

							.info-item {
								flex: 1;
								font-size: 15px;

								.label {
									font-size: 12px;
									color: #8d8d8d;
								}
							}
						}
					}
				}
			}
		}

		.container-footer {
			background-color: #fff;
			bottom: 0;
			left: 0;
			padding: 10px;
			position: fixed;
			text-align: center;
			box-sizing: border-box;
			width: 100%;

			.text-btn {
				background: #5241ff;
				border-radius: 4px;
				color: #fff;
				font-size: 16px;
				line-height: 45px;
				width: 100%;
				text-align: center;
			}
		}
	}
</style>
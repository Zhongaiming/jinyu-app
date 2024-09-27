<template>
	<view class="stock-detail">
		<xls-jy-navbar title="备货单详情" bgColor="#f5f6f7"></xls-jy-navbar>
		<view class="top-tab">
			<view class="place-bar">
				<span>{{ placeName }}-售货机{{ deviceNumber }}</span>
			</view>
			<view class="tab-list">
				<view class="tab-item" :class="{'active':activeType == item.id}" @click="activeType = item.id"
					v-for="(item, index) in activeTypeList" :key="index">
					{{ item.title }}
				</view>
			</view>
		</view>
		<view class="page-content">
			<view class="goods-item" v-for="(item, index) in acountList" :key="index"
				v-show="activeType == 1 && item.shortSupply">
				<view class="info-wrapper">
					<xls-image :src="item.commodityImg" alt="" v-if="item.commodityImg" />
					<xls-image :src="`${$baseUrl}/image/other/ztwl.png`" alt="" v-else />
					<view class="goods-info">
						<view class="info-head">
							<span>{{ item.commodityName || "暂无" }}</span>
						</view>
						<view class="info-content">
							<view class="info-item">
								<view class="value">{{ item.shortSupply }}个</view>
								<view class="label">缺货</view>
							</view>
							<view class="info-item">
								<view class="value">{{ item.railCount }}个</view>
								<view class="label">货道总数</view>
							</view>
							<view class="info-item">
								<view class="value">{{ item.stock }}个</view>
								<view class="label">现有库存</view>
							</view>
							<view class="info-item">
								<view class="value">{{ item.total }}个</view>
								<view class="label">总库存</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="goods-item" v-for="item in railList" :key="item.id"
				v-show="activeType == 2 && item.railRepertory != item.railCapacity">
				<view class="aisle-text">
					货道 {{ item.deviceNumber + "-" + item.railNumber }}
				</view>
				<view class="info-wrapper">
					<xls-image :src="item.commodityImg" alt="" v-if="item.commodityImg" />
					<xls-image :src="`${$baseUrl}/image/other/ztwl.png`" alt="" v-else />
					<view class="goods-info">
						<view class="info-head">
							<view class="text-name-price">
								<span>{{ item.commodityName || "暂无" }}</span>
								<span class="goods-price">￥{{ item.price }}</span>
							</view>
							<button class="item-button back-cargo-btn" @click="replentGoods(item)"
								v-hasPermi="['app:shj:replenish:update']">
								补货
							</button>
						</view>
						<view class="info-content">
							<view class="info-item">
								<view class="value">{{ item.costPrice || "-" }}元</view>
								<view class="label">成本价</view>
							</view>
							<view class="info-item">
								<view class="value">
									{{ item.railRepertory }}/{{ item.railCapacity }} 个
								</view>
								<view class="label">现有/总库存</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 补货 -->
		<u-popup v-model="backCargo" round :close-on-click-overlay="false">
			<view class="popupContent">
				<view class="title">补货</view>
				<view class="info">
					<view class="popup-input-paneli">
						<view class="popup-input-require">货道号</view>
						<input type="text" v-model="railMsg.deviceNumber" disabled />
					</view>
					<view class="popup-input-paneli">
						<view class="popup-input-require">库存数</view>
						<input type="text" v-model="railMsg.railRepertory" />
					</view>
					<view class="popup-input-paneli">
						<view class="popup-input-require">库存容量</view>
						<input type="text" v-model="railMsg.railCapacity" />
					</view>
				</view>
				<view class="btn-wrapper">
					<view class="btn cancel-btn" @click="railMaxCapacity">补满</view>
					<view class="btn cancel-btn" @click="backCargo = false">取消</view>
					<view class="btn" @click="railOperation()">确定</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		shjController
	} from '@/api/index.js';
	export default {
		data() {
			return {
				placeName: "广州中土物联科技有限公司",
				deviceNumber: "",
				activeType: 1,
				activeTypeList: [{
						id: 1,
						title: "缺货盘点"
					},
					{
						id: 2,
						title: "缺货详情"
					},
				],
				railList: [],
				//统计
				acountList: [],
				//补货
				backCargo: false,
				railMsg: {
					id: 0,
					railCapacity: 0,
					railRepertory: 0,
					deviceNumber: "",
				},
				buhuoMsg: {},
			};
		},
		// created() {
		// 	if (this.$route.query.placeName && this.$route.query.deviceNumber) {
		// 		this.placeName = this.$route.query.placeName;
		// 		this.deviceNumber = this.$route.query.deviceNumber;
		// 		this.getDetail();
		// 	}
		// },
		methods: {
			async getDetail() {
				let deviceNumber = this.$route.query.deviceNumber;
				let res = await api.replenishmentDetails({
					deviceNumber
				});
				if (res.data.code == 0) {
					this.railList = res.data.data.list;
				}
				let acount = await api.stockOutInventory({
					deviceNumber
				});
				if (acount.data.code == 0) {
					this.acountList = acount.data.data;
				}
			},

			//补货
			replentGoods(item) {
				this.buhuoMsg = item;
				//单个补货
				this.railMsg.id = item.id;
				this.railMsg.deviceNumber = `${item.deviceNumber}-${item.railNumber}`;
				this.railMsg.railCapacity = item.railCapacity;
				this.railMsg.railRepertory = item.railRepertory;
				this.backCargo = true;
			},
			//补货 或者 批量补货
			async railOperation() {
				let params = {
					type: 2, //type 1=清货 2= 补货
					railId: this.railMsg.id,
				};
				if (this.railMsg.railRepertory === "") {
					return this.$toast("请输入库存");
				}
				if (this.railMsg.railCapacity === "") {
					return this.$toast("请输入库存容量");
				}

				params["railCapacity"] = this.railMsg.railCapacity;
				params["railRepertory"] = this.railMsg.railRepertory;

				api.clearingOrReplenishment(params).then((res) => {
					if (res.data.code == 0) {
						this.buhuoMsg.railRepertory = this.railMsg.railRepertory;
						this.buhuoMsg.railCapacity = this.railMsg.railCapacity;
						this.$toast(`补货成功~`);
						this.backCargo = false;
					}
				});
			},
			//单个补满
			railMaxCapacity() {
				this.$dialog
					.confirm({
						title: `补货提示`,
						width: "280px",
						message: `是否补满货道 ${this.buhuoMsg.railNumber} 的库存？`,
						confirmButtonColor: "#5241FF",
					})
					.then(() => {
						let params = {
							type: 2, //type 1=清货 2= 补货
							railId: this.railMsg.id,
							railRepertory: this.railMsg.railCapacity,
							railCapacity: this.railMsg.railCapacity,
						};
						api.clearingOrReplenishment(params).then((res) => {
							if (res.data.code == 0) {
								this.buhuoMsg.railRepertory = this.railMsg.railCapacity;
								this.buhuoMsg.railCapacity = this.railMsg.railCapacity;
								this.$toast(`库存已补满~`);
								this.backCargo = false;
							}
						});
					})
					.catch(() => {});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.stock-detail {
		width: 100%;

		.top-tab {
			background-color: #fff;
			padding: 10px 10px 0;

			.place-bar {
				border-bottom: 1px solid #e5e5e5;
				font-size: 16px;
				padding: 0 0 10px;
				text-align: center;
			}

			.tab-list {
				display: flex;
				align-items: center;

				.tab-item {
					flex: 1;
					border-bottom: 2px solid #fff;
					font-size: 15px;
					line-height: 13px;
					padding: 15px 11px;
					text-align: center;
				}

				.active {
					border-color: #5241FF;
					color: #5241FF;
				}
			}
		}

		.page-content {
			padding: 10px;

			.goods-item {
				background-color: #fff;
				border-radius: 5px;
				font-family: PingFangSC-Regular;
				margin-bottom: 10px;
				padding: 8px 10px 10px;

				.aisle-text {
					font-size: 15px;
					padding-bottom: 5px;
				}

				.info-wrapper {
					display: flex;
					flex-direction: row;
					padding-top: 8px;

					img {
						width: 70px;
						height: 76px;
						border-radius: 5px;
						margin-right: 15px;
					}

					.goods-info {
						flex: 1;

						.info-head {
							border-bottom: 1px solid #f5f5f5;
							font-size: 16px;
							padding: 5px 0;
							display: flex;

							.text-name-price {
								flex: 1;
								padding-right: 10px;
							}

							.goods-price {
								color: #ff3434;
								font-size: 14px;
								margin-left: 10px;
							}

							.item-button {
								border: 1px solid #d9d9d9;
								border-radius: 4px;
								color: #262626;
								font-size: 13px;
								height: 26px;
								width: 58px;
								background: #fff;
								margin-left: 8px;
							}

							.back-cargo-btn {
								background: #5241FF;
								border: 1px solid #5241FF;
								color: #fff;
							}
						}

						.info-content {
							align-items: center;
							display: flex;
							justify-content: space-around;
							margin-top: 10px;
						}

						.info-item {
							flex: 1;
							max-width: 33.33%;
							font-size: 13px;
							text-align: center;

							.label {
								color: #666;
								margin-top: 5px;
							}
						}
					}
				}
			}
		}
	}

	.popupContent {
		width: 270px;
		background: #fff;
		flex-direction: column;
		justify-content: space-between;

		.title {
			color: #262626;
			font-size: 19px;
			font-weight: 700;
			margin-top: 20px;
			text-align: center;
		}

		.info {
			color: #262626;
			font-size: 14px;
			line-height: 42px;
			max-height: 350px;
			overflow-y: auto;
			padding: 16px 20px 20px;

			.popup-input-paneli {
				height: 46px;
				display: flex;
				margin-bottom: 15.5px;

				.popup-input-require {
					color: #1a1a1a;
					display: inline-block;
					flex: 1;
					font-family: PingFangSC-Regular, PingFang SC;
					font-size: 16px;
					line-height: 44px;
					text-align: left;
				}

				input {
					border: 1px solid rgba(0, 0, 0, 0.15);
					border-radius: 4px;
					box-sizing: border-box;
					color: #262626;
					line-height: 44px;
					padding: 0 8px;
					width: 150px;
				}
			}
		}

		.btn-wrapper {
			border-top: 1px solid #e6e6e6;
			display: flex;
			height: 50px;

			.btn {
				flex: 1;
				font-size: 18px;
				line-height: 50px;
				text-align: center;
				color: #5241FF;
			}

			.cancel-btn {
				border-right: 1px solid #e6e6e6;
				color: #595959;
			}
		}
	}
</style>
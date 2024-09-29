<template>
	<view id="replenishment">
		<xls-jy-navbar title="补货管理" bgColor="#f5f6f7"></xls-jy-navbar>
		<view class="reple-ni-shment">
			<!-- 层数 -->
			<view class="left-wrapper-style">
				<view class="tier-item-style text-over" v-for="(item, index) in tierList" :key="index"
					:class="{'ative-tier':activeTier == item.id}" @click="activeTier = item.id">
					<span>{{ item.title }}</span>
				</view>
			</view>
			<view class="right-wrapper-style">
				<!-- 批量操作 -->
				<view class="btnCon">
					<button class="text-over" v-hasPermi="['app:shj:replenish:clear']" @click="clearGoods(1)">
						一键清货
					</button>
					<button class="text-over" v-hasPermi="['app:shj:replenish:update']" @click="clearGoods(2)">
						一键补满
					</button>
					<button class="activeBtn text-over" v-show="batchReplenish" @click="setBatch()"
						v-hasPermi="['app:shj:replenish:update']">
						批量补货
					</button>
					<button class="cancel text-over" v-show="!batchReplenish" @click="setBatch()"
						v-hasPermi="['app:shj:replenish:update']">
						取消补货
					</button>
				</view>
				<!-- 统计 -->
				<view class="top-statistics">
					<view class="item">
						<p class="count red">{{ acountMsg.shortSupply }}件</p>
						<p class="title red text-over">缺货量</p>
					</view>

					<view class="item">
						<p class="count">{{ acountMsg.railCount }}条</p>
						<p class="title text-over">货道总数</p>
					</view>

					<view class="item">
						<p class="count">{{ acountMsg.total }}件</p>
						<p class="title text-over">库存总量</p>
					</view>

					<view class="item">
						<p class="count">{{ acountMsg.stock }}件</p>
						<p class="title text-over">现库存量</p>
					</view>
				</view>
				<!-- 货道 -->
				<view class="content-panel-wrapper">
					<u-checkbox-group v-model="checkboxGroup" placement="column" v-if="railList.length">
						<view v-for="(item, index) in railList" :key="index">
							<view class="cargo-list" v-if="returnBack(item.railNumber) && item.railEnable == 1">
								<view class="left">
									<image :src="item.commodityImg" alt="" v-if="item.commodityImg" class="image" />
									<image :src="`${$baseUrl}appV4/image/other/ztwl.png`" alt="" class="image"
										v-else />
									<view v-show="!batchReplenish">
										<view class="imgFa" v-show="!checkboxGroup.includes(item.id)"></view>
										<view class="stateIcons">
											<u-checkbox :name="item.id" activeColor="#5241FF" shape="circle"
												iconSize="32" labelSize="36" size="38"></u-checkbox>
										</view>
									</view>
								</view>
								<view class="right">
									<view class="goods-name">
										{{ item.commodityName || "暂无" }}
									</view>
									<view class="locate-txt">
										{{ item.deviceNumber + "-" + item.railNumber }}
									</view>
									<view class="set-bottom-btn">
										<span class="green">余{{ item.railRepertory }}个</span>
										<view class="cargo-button">
											<button class="item-button text-over" @click="clearRail(item)"
												v-hasPermi="['app:shj:replenish:clear']">
												清货
											</button>
											<button class="item-button back-cargo-btn text-over"
												@click="replentGoods(2, item)"
												v-hasPermi="['app:shj:replenish:update']">
												补货
											</button>
										</view>
									</view>
								</view>
							</view>
						</view>
						<xls-bottom />
					</u-checkbox-group>
					<xls-empty v-else text="暂无货道或货道禁用" />
				</view>
			</view>
		</view>
		<!-- 补货 -->
		<u-popup :show="backCargo" round="20" @close="backCargo=false" mode="center">
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
					<view class="btn cancel-btn" @click="railMaxCapacity" v-if="times == 2">
						补满
					</view>
					<view class="btn cancel-btn" @click="backCargo = false">取消</view>
					<view class="btn" @click="railOperation(railMsg, times)">确定</view>
				</view>
			</view>
		</u-popup>
		<!-- 全选 -->
		<view class="bottom-btn" v-show="!batchReplenish">
			<view class="right">
				<u-checkbox-group v-model="allCheckGroup" @change="allCheckRail">
					<u-checkbox name="1" activeColor="#5241FF" shape="circle" iconSize="32" labelSize="36"
						size="38"></u-checkbox>
				</u-checkbox-group>
				<span style="margin-left: 10px">全选</span>
			</view>
			<view class="enter" @click="replentGoods(3, '')">确定补货</view>
		</view>
	</view>
</template>

<script>
	import {
		shjController
	} from '@/api/index.js';
	export default {
		name: "replenishment",
		data() {
			return {
				//补货
				backCargo: false,
				//批量开关
				batchReplenish: true,
				allCheck: false,
				allCheckGroup: [],
				checkboxGroup: [],
				//层数
				tierAllList: [{
						id: 1,
						title: "第一层"
					},
					{
						id: 2,
						title: "第二层"
					},
					{
						id: 3,
						title: "第三层"
					},
					{
						id: 4,
						title: "第四层"
					},
					{
						id: 5,
						title: "第五层"
					},
					{
						id: 6,
						title: "第六层"
					},
					{
						id: 7,
						title: "第七层"
					},
					{
						id: 8,
						title: "第八层"
					},
					{
						id: 9,
						title: "第九层"
					},
					{
						id: 10,
						title: "第十层"
					},
					{
						id: 11,
						title: "第十一层"
					},
					{
						id: 12,
						title: "第十二层"
					},
					{
						id: 13,
						title: "第十三层"
					},
					{
						id: 14,
						title: "第十四层"
					},
					{
						id: 15,
						title: "第十五层"
					},
					{
						id: 16,
						title: "第十六层"
					},
					{
						id: 17,
						title: "第十七层"
					},
					{
						id: 18,
						title: "第十八层"
					},
					{
						id: 19,
						title: "第十九层"
					},
					{
						id: 20,
						title: "第二十层"
					},
				],
				tierList: [],
				//统计
				acountMsg: {
					total: 0,
					stock: 0,
					shortSupply: 0,
					railCount: 0,
				},
				activeTier: 0,
				railList: [],
				railMsg: {
					id: 0,
					railCapacity: 0,
					railRepertory: 0,
					deviceNumber: "",
				},
				buhuoMsg: {},
				times: 2, //补货 批量补货
				deviceNumber: "",
			};
		},
		async onLoad(option) {
			if (option.params) {
				const {
					deviceNumber
				} = JSON.parse(option.params)
				this.deviceNumber = deviceNumber
				this.getDetail()
			}
		},
		methods: {
			returnBack(railNumber) {
				let rail = String(railNumber).length
				if (rail >= 4) {
					return String(railNumber).substring(0, 2) * 1 == this.activeTier
				} else {
					return String(railNumber).substring(0, 1) * 1 == this.activeTier
				}
			},
			//详情
			async getDetail(type) {
				const {
					deviceNumber
				} = this
				let res = await shjController.replenishmentDetails({
					deviceNumber
				})
				if (res.code == 200) {
					if (type == 1 || type == 2) {
						this.$toast(`${type == 1 ? "清货" : "补货"}成功~`)
					}
					this.allCheck = false
					this.batchReplenish = true
					this.checkboxGroup = []
					const {
						list,
						total,
						stock,
						shortSupply,
						railCount
					} = res.data
					this.railList = list
					this.acountMsg.total = total
					this.acountMsg.stock = stock
					this.acountMsg.shortSupply = shortSupply
					this.acountMsg.railCount = railCount
					if (!list.length) return
					let tierIdList = []
					list.forEach((element) => {
						let tier =
							element.railNumber.substring(
								0,
								element.railNumber.length == 3 ? 1 : 2
							) * 1; //层
						tierIdList.push(tier)
						if (tierIdList.length == list.length) {
							this.selectTier(tierIdList)
						}
					});
				}
			},
			//层级
			selectTier(tierIdList) {
				this.tierList = []
				let tierAllList = this.tierAllList
				tierAllList.forEach((tier) => {
					if (tierIdList.includes(tier.id)) {
						this.tierList.push(tier)
						tierAllList = tierAllList.filter((item) => {
							return item.id != tier.id
						});
					}
				})
				if (!this.activeTier) {
					this.activeTier = this.tierList[0].id
				}
			},
			//一键清货 或 一键补货
			async clearGoods(type) {
				const message = `${
					type == 1
					  ? "是否一键清除售货机所有货道库存，请确认？"
					  : "是否一键补满售货机所有货道库存，请确认？"
				}`
				this.$modal(message, {
					title: `${type == 1 ? "清货" : "补货"}提示`,
					confirmColor: "#5241FF"
				}).then(() => {	
					shjController.oneKeyShj({
						type: type, //type 1=清货 2= 补货
						deviceNumber: this.deviceNumber,
					}).then((res) => {
						if (res.code == 200) {
							this.getDetail(type)
						}
					})		
				}).catch(() => {});
			},
			//单个补满
			railMaxCapacity() {
				this.backCargo = false
				this.$modal(`是否补满货道 ${this.buhuoMsg.railNumber} 的库存？`, {
						title: `补货提示`,
						confirmColor: "#5241FF",
					})
					.then(() => {
						let params = {
							type: 2, //type 1=清货 2= 补货
							railId: this.railMsg.id,
							railRepertory: this.railMsg.railCapacity,
							railCapacity: this.railMsg.railCapacity,
						};
						shjController.clearingOrReplenishment(params).then((res) => {
							if (res.code == 200) {
								// this.buhuoMsg.railRepertory = this.railMsg.railCapacity
								// this.buhuoMsg.railCapacity = this.railMsg.railCapacity
								this.getDetail(2)
								this.$toast(`库存已补满~`)
								this.backCargo = false
							}
						});
					})
					.catch(() => {});
			},
			//清货
			clearRail(item) {
				this.$modal(`是否清空货道 ${item.railNumber} 的库存？`, {
						title: `清货提示`,
						confirmColor: "#5241FF",
					})
					.then(() => {
						let params = {
							type: 1, //type 1=清货 2= 补货
							railId: item.id,
						};
						shjController.clearingOrReplenishment(params).then((res) => {
							if (res.code == 200) {
								// item.railRepertory = 0
								this.$toast(`清货成功~`)
								this.getDetail(1)
							}
						});
					})
					.catch(() => {})
			},
			//补货
			replentGoods(type, item) {
				this.times = type
				if (this.times == 2) {
					this.buhuoMsg = item
					//单个补货
					this.railMsg.id = item.id
					this.railMsg.deviceNumber = `${item.deviceNumber}-${item.railNumber}`
					this.railMsg.railCapacity = item.railCapacity
					this.railMsg.railRepertory = item.railRepertory
				} else {
					//批量补货
					if (!this.checkboxGroup.length) {
						return this.$toast("请先选择补货货道~")
					}
					this.railMsg.deviceNumber = `已选${this.checkboxGroup.length}个货道`
					this.railMsg.railCapacity = ""
					this.railMsg.railRepertory = ""
				}
				this.backCargo = true
			},
			//补货 或者 批量补货
			async railOperation(item, times) {
				let params = {
					type: 2, //type 1=清货 2= 补货
					railId: item.id,
				};
				if (this.railMsg.railRepertory === "") {
					return this.$toast("请输入库存")
				}
				if (this.railMsg.railCapacity === "") {
					return this.$toast("请输入库存容量")
				}
				if (times == 2) {
					params["railCapacity"] = this.railMsg.railCapacity
					params["railRepertory"] = this.railMsg.railRepertory
				} else if (times == 3) {
					params["railCapacity"] = this.railMsg.railCapacity
					params["railRepertory"] = this.railMsg.railRepertory
					params.railId = String(this.checkboxGroup)
				}
				shjController.clearingOrReplenishment(params).then((res) => {
					if (res.code == 200) {
						this.backCargo = false
						if (times == 3) {
							this.getDetail(2)
						} else {
							// this.buhuoMsg.railRepertory = this.railMsg.railRepertory
							// this.buhuoMsg.railCapacity = this.railMsg.railCapacity
							// this.$toast(`补货成功~`)
							this.getDetail(2)
						}
					}
				});
			},
			//批量设置
			setBatch() {
				this.allCheck = false
				this.checkboxGroup = []
				this.batchReplenish = !this.batchReplenish
			},
			//全选
			allCheckRail(item) {
				if (item.length) {
					this.checkboxGroup = this.railList.map(item => item.id)
				} else {
					this.checkboxGroup = [];
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	#replenishment {
		width: 100%;
		height: 100vh;
		background: #fff;
	}

	.btnCon {
		margin: 0 2.5%;
		padding: 10px 0;
		display: flex;
		justify-content: space-between;

		button {
			background: #fff;
			border-radius: 5px;
			color: #262626;
			font-size: 13px;
			height: 30px;
			line-height: 30px;
			box-sizing: border-box;
			width: 30%;
			white-space: nowrap;
			padding: 0;
		}

		.activeBtn {
			background: #5241ff;
			border: 1px solid #5241ff;
			color: #fff;
		}

		.cancel {
			color: #5241ff;
		}
	}

	.top-statistics {
		height: 65px;
		margin: 0 2.5%;
		background: #f5f6f7;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: space-around;

		.item {
			text-align: center;

			p {
				padding: 0;
				margin: 0;
			}

			.count {
				font-size: 16px;
				font-weight: 700;
			}

			.red {
				color: red;
			}

			.title {
				font-size: 12px;
				color: #8c8c8c;
			}
		}
	}

	.content-panel-wrapper {
		flex: 1;
		padding: 20px 0 60px 0;
		box-sizing: border-box;
		overflow-y: scroll;

		.cargo-list {
			padding-left: 8px;
			box-sizing: border-box;
			display: flex;
			margin-bottom: 20px;

			.left {
				position: relative;
				height: 80px;
				width: 80px;
				overflow: hidden;

				.image {
					width: 80px;
					height: 80px;
					border-radius: 6px;
				}

				.imgFa {
					height: 80px;
					width: 80px;
					background: #fff;
					opacity: 0.5;
					position: absolute;
					z-index: 5;
					top: 0;
					left: 0;
				}

				.stateIcons {
					background: #fff;
					border-radius: 50%;
					position: absolute;
					z-index: 10;
					bottom: 0;
					left: 0;
				}
			}

			.right {
				flex: 1;
				box-sizing: border-box;
				line-height: 21px;
				padding-left: 6px;

				.goods-name {
					color: #262626;
					font-size: 16px;
					font-weight: 700;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.locate-txt {
					color: #a6a6a6;
					font-size: 13px;
				}

				.set-bottom-btn {
					align-items: flex-end;
					display: flex;
					height: 40px;
					justify-content: space-between;
					padding-right: 8px;
					box-sizing: border-box;

					.green {
						color: #01b99e;
						font-size: 13px;
					}

					.cargo-button {
						display: flex;

						.item-button {
							border-radius: 4px;
							color: #262626;
							font-size: 13px;
							height: 26px;
							line-height: 26px;
							width: 58px;
							background: #fff;
							margin-left: 8px;
						}

						.back-cargo-btn {
							background: #5241ff;
							border: 1px solid #5241ff;
							color: #fff;
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
					height: 44px;
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
				color: #5241ff;
			}

			.cancel-btn {
				border-right: 1px solid #e6e6e6;
				color: #595959;
			}
		}
	}

	.bottom-btn {
		align-items: center;
		background: #fff;
		border-top: 1px solid #ebeced;
		bottom: 0;
		display: flex;
		height: 54px;
		justify-content: space-between;
		left: 0;
		position: fixed;
		width: 100%;
		z-index: 999;

		.right {
			padding-left: 10px;
			align-items: center;
			display: flex;
			height: 54px;
			width: 40%;
			font-size: 14px;
			line-height: 54px;

			.icon {
				margin-right: 8px;
			}
		}

		.enter {
			align-items: center;
			background: #5241ff;
			color: #fff;
			display: flex;
			font-size: 16px;
			height: 54px;
			justify-content: center;
			width: 60%;
		}
	}

	.reple-ni-shment {
		display: flex;
		height: calc(100% - 48px);
		width: 100%;
		overflow: hidden;

		.left-wrapper-style {
			width: 84px;
			// height: calc(100vh - 48px);
			padding-bottom: 60px;
			background: #f5f6f7;
			overflow-y: scroll;

			.tier-item-style {
				line-height: 54px;
				font-size: 14px;
				text-align: center;
				position: relative;
			}

			.ative-tier {
				background: #fff;
				border-radius: 8px 0 0 8px;
				color: #5241ff;
				font-size: 16px;
			}

			.ative-tier::before {
				background: #5241ff;
				border-radius: 1px;
				content: "";
				display: inline-block;
				height: 16px;
				left: 6px;
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				width: 3px;
			}
		}

		.right-wrapper-style {
			flex: 1;
			display: flex;
			flex-direction: column;
			box-sizing: border-box;
		}
	}

	::v-deep .u-checkbox--horizontal {
		margin-right: 0;
	}
</style>
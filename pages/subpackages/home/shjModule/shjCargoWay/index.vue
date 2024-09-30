<template>
	<view>
		<xls-jy-navbar title="货道管理" bgColor="#f5f6f7"></xls-jy-navbar>
		<view class="top-notice-wrapper">
			<u-icon name="info-circle" size="36" color="#f7770f" />
			<span>该设置将影响货道布局，请在厂家指导下操作！</span>
		</view>
		<view class="car-go-way">
			<view class="left-wrapper-style">
				<view class="tier-item-style" v-for="(item, index) in tierList" :key="index"
					:class="{'ative-tier':activeTier == item.id}" @click="activeTier = item.id">
					<span>{{ item.title }}</span>
				</view>
				<view class="reset-button">
					<view class="text-main" @click="resetRail">重置</view>
				</view>
			</view>
			<view class="right-content-style">
				<view v-for="(item, index) in railList" :key="index">
					<view class="cargo-road-item" v-if="returnBack(item.railNumber)">
						<image :src="item.commodityImg" alt="" v-if="item.commodityImg" class="image" />
						<image :src="`${$baseUrl}appV4/image/other/ztwl.png`" alt="" v-else class="image" />
						<view class="cargo-road-info">
							<view class="top-info">
								<span>{{ item.deviceNumber + "-" + item.railNumber }}</span>
								<view class="right">
									<span class="cargo-road-state" v-if="item.railEnable == 1">开启</span>
									<span class="cargo-road-state disable" v-else>关闭</span>
								</view>
							</view>
							<view class="handle-panel">
								<view class="button" v-hasPermi="['app:shj:rail:edit']" @click="handleUpdate(item)">
									编辑
								</view>
								<view class="button" v-hasPermi="['app:shj:rail:test']" @click="testDevice(item)">
									测试电机
								</view>
							</view>
						</view>
					</view>
				</view>
				<xls-bottom v-show="railList.length" />
				<xls-empty v-show="!railList.length"></xls-empty>
			</view>
		</view>
		<view class="container-footer" v-hasPermi="['app:shj:rail:edit']">
			<view class="text-btn" @click="$refs.batch.openModule(2)">批量设置</view>
		</view>
		<!--  货道重置 -->
		<u-popup :show="railPopup" round="20" @close="railPopup=false" mode="center">
			<view class="rail-popup-wrapper">
				<p class="title">货道重置</p>
				<xls-field v-model="reset.row" type="digit" label="行" placeholder="请输入货道行数(1~20)" maxlength="2" />
				<xls-field v-model="reset.column" type="digit" label="列" placeholder="请输入货道列数(1~20)" maxlength="2" />
				<view class="read-stock">
					<view class="btn" @click="railPopup = false">取消</view>
					<view class="btn confirm" @click="confirmMethed">确定</view>
				</view>
			</view>
		</u-popup>
		<!-- 货道编辑 -->
		<u-popup v-hasPermi="['app:shj:rail:edit']" :show="showEdit" mode="bottom" @close="showEdit=false">
			<view class="edit-cargoroad">
				<view class="popup-header">
					<span @click="showEdit = false">取消</span>
					<span class="popup-title">货道编辑</span>
					<span @click="confirmSet">保存</span>
				</view>
				<view class="popup-content">
					<view class="edit-panel">
						<span>货道序号</span>
						<span>{{ railNumber }}</span>
					</view>
					<view class="edit-panel">
						<span>货道名称</span>
						<input type="text" placeholder="请输入货道名称" v-model="railMsg.cargoLaneNumber" />
					</view>
					<view class="edit-panel">
						<span>货道容量</span>
						<input type="text" placeholder="请输入货道容量" v-model="railMsg.railCapacity" />
					</view>
					<view class="edit-panel">
						<span>货道启用</span>
						<u-switch v-model="railEnable" active-color="#5241FF" size="50" />
					</view>
				</view>
			</view>
		</u-popup>
		<!-- 电机测试 -->
		<u-popup :show="testPopup" round="20" @close="() => {
			testPopup=false
		}">
			<view class="rail-popup-wrapper test-wrapper">
				<p class="title">电机测试</p>
				<u-cell title="出货数量" class="main-wrapper">
					<template #right-icon>
						<u-stepper v-model="test.railControlNum" theme="round" button-size="22" disable-input
							:max="maxNumber" />
					</template>
				</u-cell>
				<view class="read-stock">
					<view class="btn" @click="testPopup = false">取消</view>
					<view class="btn confirm" @click="confirmTest">确定</view>
				</view>
			</view>
		</u-popup>
		<!-- 批量电机测试 -->
		<u-popup :show="railBatchPopup" round="20" @close="railBatchPopup=false" mode="center">
			<view class="rail-popup-wrapper test-wrapper">
				<p class="title">批量电机测试</p>
				<u-cell title="时间间隔" class="main-wrapper">
					<template #right-icon>
						<u-number-box v-model="testTimes" input-width="75px" button-size="40px" min="0"
							iconStyle="fontSize: 17px" max="10" />
					</template>
				</u-cell>
				<view class="tips-text">时间间隔，单位秒，范围（1~10）</view>
				<view class="read-stock">
					<view class="btn" @click="(railBatchPopup = false), ($refs.batch.batchSet = true)">
						取消
					</view>
					<view class="btn confirm" @click="confirmBatchTest">确定</view>
				</view>
			</view>
		</u-popup>
		<!-- 批量电机测试中 -->
		<u-popup :show="loadingPopup" round="20" mode="center">
			<view class="rail-popup-wrapper test-wrapper" style="background: #f5f6f7">
				<p class="title">电机测试中</p>
				<view class="device-text">
					<view class="text">设备: {{ deviceNumber }}</view>
					<view>
						货道
						{{
						  testRailList.length ? testRailList[railIndex].railNumber : "暂无"
						}}
						正在测试...
					</view>
				</view>
				<view class="circle-wrapper">
					<view class="plan-wrapper">{{ railIndex + 1 }} / {{ railLength }}</view>
					<view class="circle-style">
						<view class="main-style">{{ nowTimes }}秒</view>
					</view>
				</view>
				<view class="button-wrapper">
					<u-button text="停止测试" color="#5421ff" size="normal" @click="stopTest"></u-button>
				</view>
			</view>
		</u-popup>

		<u-popup :show="finishPopup" round="20" mode="center" closeable @close="() => {
			finishPopup = false
		}">
			<view class="rail-popup-wrapper test-wrapper">
				<view class="finish-wrapper">
					<view class="finish" @click="() => {
						finishPopup = false
					}">
						<view>测试</view>
						<view>完成</view>
					</view>
				</view>
			</view>
		</u-popup>
		<!-- 批量货道编辑 -->
		<batch-setting ref="batch" :parentRailList="railList" @getDetail="getDetail" @stratTest="stratTest"
			v-hasPermi="['app:shj:rail:edit']" />
	</view>
</template>

<script>
	import {
		shjController
	} from '@/api/index.js';
	import BatchSetting from "../components/batchSetting.vue";
	import suan from "@/plugins/floastCalculate";
	export default {
		name: "cargoWay",
		components: {
			BatchSetting
		},
		data() {
			return {
				showEdit: false,
				railEnable: false,
				//层级
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
				activeTier: 0,
				//货道
				railList: [],
				deviceNumber: "",
				railNumber: "",
				railMsg: {
					id: 0,
					cargoLaneNumber: "", //货道编号
					railCapacity: 0,
					railEnable: 1, //货道是否启用;0关闭，1启用
				},
				railCenterObj: {},
				//重置
				railPopup: false,
				typeSwitch: false,
				reset: {
					deviceNumber: "",
					column: "",
					row: "",
					type: 1, //1 = 重置+添加 2 = 只添加
				},
				//电机测试
				testPopup: false,
				maxNumber: 10,
				test: {
					uuid: "",
					railNum: "",
					railControlNum: 1,
				},
				testTimes: 3, //时间间隔
				nowTimes: 10, //实时秒数
				interval: null,
				railBatchPopup: false,
				loadingPopup: false,
				finishPopup: false,
				testRailList: [],
				railLength: 0,
				railIndex: 0,
			};
		},
		onLoad(option) {
			if (option.params) {
				const {
					deviceNumber
				} = JSON.parse(option.params)
				this.deviceNumber = deviceNumber;
				this.getDetail();
			}
		},
		methods: {
			//详情
			async getDetail() {
				let deviceNumber = this.deviceNumber
				let res = await shjController.replenishmentDetails({
					deviceNumber,
					railEnable: 1
				})
				if (res.code == 200) {
					this.railList = res.data.list;
					if (!res.data.list.length) {
						this.resetRail();
						return;
					}
					let tierIdList = [];
					res.data.list.forEach((element) => {
						let tier =
							element.railNumber.substring(
								0,
								element.railNumber.length == 3 ? 1 : 2
							) * 1; //层
						tierIdList.push(tier);
						if (tierIdList.length == res.data.list.length) {
							this.selectTier(tierIdList);
						}
					});
				}
			},
			// 货道
			resetRail() {
				this.typeSwitch = false;
				this.reset = {
					deviceNumber: this.deviceNumber,
					column: "",
					row: "",
				};
				this.railPopup = true;
			},
			//除
			divideMethod() {
				return suan.divide(this.railIndex + 1, this.railLength).toFixed(4);
			},
			//层数
			returnBack(railNumber) {
				let rail = String(railNumber).length;
				if (rail >= 4) {
					return String(railNumber).substring(0, 2) * 1 == this.activeTier;
				} else {
					return String(railNumber).substring(0, 1) * 1 == this.activeTier;
				}
			},
			//层级
			selectTier(tierIdList) {
				this.tierList = [];
				let tierAllList = this.tierAllList;
				tierAllList.forEach((tier) => {
					if (tierIdList.includes(tier.id)) {
						this.tierList.push(tier);
						tierAllList = tierAllList.filter((item) => {
							return item.id != tier.id;
						});
					}
				});
				this.activeTier = this.tierList[0].id;
			},
			//单个编辑
			handleUpdate(row) {
				this.railNumber = row.railNumber;
				this.railCenterObj = row;
				this.railMsg = {
					id: row.id,
					cargoLaneNumber: row.cargoLaneNumber, //货道编号
					railCapacity: row.railCapacity,
					railEnable: row.railEnable, //货道是否启用;0关闭，1启用
				};
				this.railEnable = row.railEnable == 1;
				this.showEdit = true;
			},
			async confirmSet() {
				this.railMsg.railEnable = this.railEnable ? 1 : 0;
				let res = await shjController.updCargoLane(this.railMsg);
				if (res.code == 200) {
					this.$toast(`编辑成功~`);
					this.railCenterObj.cargoLaneNumber = this.railMsg.cargoLaneNumber;
					this.railCenterObj.railCapacity = this.railMsg.railCapacity;
					this.railCenterObj.railEnable = this.railMsg.railEnable;
					this.showEdit = false;
				}
			},

			async confirmMethed() {
				let res = await shjController.rendingMachineReset(this.reset);
				if (res.code == 200) {
					this.railPopup = false;
					this.getDetail();
					this.$toast("重置成功~");
				}
			},
			// 测试电机
			testDevice(item, type) {
				if (!item.uuid) {
					window.clearInterval(this.interval);
					return;
				} else {
					this.test = {
						uuid: item.uuid,
						railNum: item.railNumber,
						railControlNum: 1,
					};
					// this.maxNumber = item.railCapacity;
					// this.testPopup = true;
					this.confirmTest(type);
				}
			},
			async confirmTest(type) {
				let res = await shjController.motorTest(this.test);
				if (res.code == 200) {
					this.testPopup = false;
					if (type == 1) return;
					this.$toast("发送成功~");
				}
			},
			// 开始
			stratTest() {
				this.testTimes = 3;
				this.nowTimes = 10;
				this.railBatchPopup = true;
				this.loadingPopup = false;
			},
			// 批量测试
			async confirmBatchTest() {
				this.railBatchPopup = false
				let deviceNumber = this.deviceNumber
				let res = await shjController.replenishmentDetails({
					deviceNumber
				})
				if (res.code == 200) {
					this.testRailList = res.data.list;
					if (!this.testRailList.length) {
						return this.$toast("请先设置设备货道~");
					}
					this.railLength = this.testRailList.length;
					this.testDevice(this.testRailList[0]);
					if (this.testRailList.length <= 1) {
						return;
					}
					this.loadingPopup = true;
					this.nowTimes = this.testTimes;
					this.railIndex = 0;
					let that = this;
					that.interval = window.setInterval(function() {
						if (that.nowTimes-- <= 0) {
							that.nowTimes = that.testTimes;
							that.railIndex += 1;
							//测试中
							that.testDevice(that.testRailList[that.railIndex], 1);
						}
						if (that.railIndex + 1 >= that.railLength) {
							//结束
							that.loadingPopup = false;
							that.finishPopup = true;
							window.clearInterval(that.interval);
						}
					}, 1000);
				}
			},
			stopTest() {
				this.loadingPopup = false;
				window.clearInterval(this.interval);
			},
		},
	};
</script>

<style lang="scss" scoped>
	.top-notice-wrapper {
		line-height: 35px;
		color: #333;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #babecc;
		font-size: 13px;
	}

	.car-go-way {
		display: flex;

		.left-wrapper-style {
			width: 84px;
			height: calc(100vh - 83px);
			background: #f5f6f7;
			overflow-y: scroll;
			padding-bottom: 110px;
			box-sizing: border-box;
			position: relative;

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

		.reset-button {
			width: 84px;
			line-height: 30px;
			font-size: 15px;
			text-align: center;
			box-sizing: border-box;
			padding: 5px 10px;
			background: #fff;
			position: fixed;
			left: 0;
			bottom: 65px;

			.text-main {
				background: #5241ff;
				color: #fff;
				border-radius: 4px;
			}
		}

		.right-content-style {
			flex: 1;
			height: calc(100vh - 83px);
			background: #fff;
			overflow-y: scroll;
			padding-bottom: 70px;
			box-sizing: border-box;

			.cargo-road-item {
				border-bottom: 1px solid #e5e5e5;
				display: flex;
				padding: 10px;

				.image {
					height: 60px;
					width: 60px;
					margin-right: 10px;
				}

				.cargo-road-info {
					flex: 1;

					.top-info {
						display: flex;
						justify-content: space-between;
						margin-bottom: 5px;

						.right {
							display: flex;
							justify-content: flex-end;

							.cargo-road-state {
								color: #2ec05c;
								font-size: 13px;
								margin-left: 15px;
								position: relative;
							}

							.cargo-road-state::before {
								background-color: #2ec05c;
								border-radius: 50%;
								content: "";
								display: block;
								height: 6px;
								left: -9px;
								position: absolute;
								top: 50%;
								transform: translateY(-50%);
								width: 6px;
							}

							.disable {
								color: #f01e1e;
							}

							.disable::before {
								background-color: #f01e1e;
							}
						}
					}

					.handle-panel {
						display: flex;
						justify-content: flex-end;

						.button {
							border: 1px solid #d0d0d0;
							border-radius: 3px;
							color: #666;
							background: #fff;
							font-size: 14px;
							height: 28px;
							line-height: 28px;
							margin-left: 10px;
							padding: 0 10px;
						}
					}
				}
			}
		}
	}

	// popup
	.edit-cargoroad {
		background: #fff;
		width: 100%;

		.popup-header {
			align-items: center;
			background: #f4f5f7;
			color: #5241ff;
			display: flex;
			font-size: 16px;
			height: 45px;
			justify-content: space-between;
			padding: 0 10px;

			.popup-title {
				color: #000;
			}
		}

		.popup-content {
			font-size: 15px;
			padding-bottom: 70px;

			.edit-panel {
				align-items: center;
				border-bottom: 1px solid #e5e5e5;
				display: flex;
				height: 50px;
				justify-content: space-between;
				padding: 0 10px;

				input {
					background: none;
					border: none;
					font-size: 100%;
					outline: none;
					text-align: right;
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

	// 货道重置
	.rail-popup-wrapper {
		width: 320px;
		padding-top: 20px;
		font-size: 16px;
		text-align: center;
		overflow: hidden;

		.title {
			margin-bottom: 12px;
		}

		.read-stock {
			display: flex;
			line-height: 50px;

			.btn {
				flex: 1;
			}

			.confirm {
				border-left: 1px solid #ebedf0;
				color: #5241ff;
			}
		}
	}

	.test-wrapper {
		width: 280px;

		.main-wrapper {
			text-align: left;
			margin-top: 40px;
		}

		.tips-text {
			font-size: 12px;
			color: #999;
			text-align: center;
			margin-top: 10px;
			padding-bottom: 12px;
			border-bottom: 1px solid #ebedf0;
		}

		.circle-wrapper {
			position: relative;
			padding: 20px 0;
			display: flex;
			justify-content: center;
			align-items: center;

			.plan-wrapper {
				position: absolute;
				top: -20px;
				right: 12px;
			}

			.circle-style {
				width: 90px;
				height: 90px;
				border-radius: 50%;
				background: #5241ff;
				display: flex;
				justify-content: center;
				align-items: center;

				.main-style {
					background: #fff;
					width: 80px;
					height: 80px;
					border-radius: 50%;
					font-size: 14px;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
		}

		.button-wrapper {
			width: 150px;
			margin: 20px auto;
			padding-bottom: 20px;
		}

		.device-text {
			text-align: left;
			padding-left: 20px;
			font-size: 14px;

			.text {
				font-size: 12px;
				margin-bottom: 6px;
			}
		}

		.finish-wrapper {
			padding: 40px;
			display: flex;
			align-items: center;
			justify-content: center;

			.finish {
				width: 120px;
				height: 120px;
				color: #fff;
				border-radius: 50%;
				background: #5241ff;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
			}

			view {
				font-size: 26px;
				font-weight: 700;
			}
		}
	}
</style>
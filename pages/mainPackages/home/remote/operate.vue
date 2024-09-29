<template>
	<view class="deviceStartup">
		<xls-jy-navbar title="设备远程启动"></xls-jy-navbar>
		<view class="root-wrapper">
			<view class="item-type-style">
				<view class="children">
					<view class="caption">上分设备</view>
					<view class="input">
						<input type="text" v-model="enterValue" placeholder="请输入唯一码"
							@blur="pickDeviceDetail.deviceNumber = enterValue" />
					</view>
					<view class="icon">
						<u-icon name="plus-circle" size="50" color="#5241FF" @click="pickerDevice = !pickerDevice" />
					</view>
				</view>
			</view>
			<!-- ndj -->
			<view class="item-type-style" v-if="[2, 6, 7].includes(deviceTypeId)">
				<view class="children" @click="getRailInfo">
					<view class="caption">选择仓位</view>
					<view class="input">
						<input type="text" v-model="upperScore" placeholder="请选择上分仓位" readonly />
					</view>
					<view class="icon">
						<u-icon name="arrow-right" size="36" color="#d1d1d1" />
					</view>
				</view>
			</view>
			<!-- shj -->
			<view class="item-type-style" v-if="deviceTypeId == 4">
				<view class="children" @click="getRailInfo">
					<view class="caption">货道选择</view>
					<view class="input">
						<input type="text" v-model="upperScore" placeholder="请选择货道" />
					</view>
					<view class="icon">
						<u-icon name="arrow" size="18" color="#d1d1d1" />
					</view>
				</view>
			</view>
			<!-- shj -->
			<view class="SHJ-item" v-if="deviceTypeId == 4">
				<span class="label">启动设定</span>
				<u-radio-group v-model="startType">
					<view class="radio">
						<u-radio checked-color="#5241FF" name="1">游戏启动</u-radio>
						<u-radio checked-color="#5241FF" name="2">商品出货</u-radio>
					</view>
				</u-radio-group>
			</view>
			<!-- common -->
			<view class="step-btn-wrapper" v-if="![5,4].includes(deviceTypeId)">
				<view class="child" v-if="!showStep">
					<view class="childCaption" v-html="deviceTypeId == 2 ? '扭蛋个数' : '上分数量'"></view>
					<view class="childItem">-</view>
				</view>
				<view class="childShow" v-if="showStep">
					<view class="childTitle">
						<view>{{deviceTypeId == 2 ? '扭蛋个数' : '上分数量'}}</view>
					</view>
					<view class="childStep">
						<view class="main-box">
							<view class="stepper">
								<u-number-box v-model="valueStep" input-width="60px" button-size="35px" min="1"
									max="100" integer iconStyle="fontSize: 32rpx" />
							</view>
						</view>
						<view style="margin-left: 30px; color: red">数值范围 1~99</view>
					</view>
				</view>
			</view>
			<!-- dbj -->
			<view class="DBJ-item" v-if="deviceTypeId == 5">
				<view class="label">上分数量</view>
				<view class="grid-panel">
					<view class="grid-btns">
						<span class="btn" :class="scoreActiveValue == index ? 'active' : ''"
							@click="clickMethod(score, index)" v-for="(score, index) in upperScoreList" :key="index">
							{{ score.text }}
						</span>
						<input type="text" v-model="dbjValue" class="btn grid-input"
							@click="clickMethod({ text: '自定义', score: '' }, 6)"
							:class="{'disabled':scoreActiveValue != 6}" @input="valueStep = dbjValue" maxlength="3"
							placeholder="请输入" ref="dbjInput" />
					</view>
					<!-- <p class="tips">仅能选择纸钞面额</p> -->
				</view>
			</view>
			<!-- 上分 -->
			<view class="up-btn-style" @click="upperPoints">
				<view class="itemBtn">确定</view>
			</view>
		</view>
		<!-- 远程记录 -->
		<view class="bottom-wrapper" v-hasPermi="['app:remoteboot:index:records']">
			<p class="link" @click="goTo">
				远程启动记录
			</p>
		</view>
		<!-- 设备 -->
		<u-popup :show="pickerDevice" mode="bottom" @close="pickerDevice=false">
			<view class="popup-content">
				<view class="device-header-style">
					<view class="titleP">选择设备</view>
					
					<view class="outSide">
						<view class="mainB">
							<view class="title-txt">{{deviceOrplace?'选择场地':'选择设备'}}</view>
							<view @click="showPlacelist" class="place-txt text-over">
								{{ placeName }}
							</view>
						</view>
						<u-icon name="arrow-right" size="32" color="#969799" class="right-icons" />
					</view>
				</view>

				<view style="height: 12px; background: #e6e4fe"></view>

				<view class="outSide-other" v-for="(dev, index) in deviceList" :key="index" @click="pickDevice(dev)">
					<view class="mainB">
						<view class="title-txt" :style="{ color:dev.deviceNumber==enterValue?'#5241FF':''}">
							{{ dev.typeName }}{{ dev.deviceNumber }}
						</view>
						<view :style="{background:dev.onlineState?'#07c160':'#ee0a24'}" class="demo">
							<span>{{dev.onlineState ? '在线' : '离线'}}</span>
						</view>
					</view>
					<view class="remark" v-if="dev.remark">备注：{{ dev.remark }}</view>
				</view>
				<xls-empty v-if="!deviceList.length" text="场地无该类型设备"></xls-empty>
			</view>
		</u-popup>
		<!-- 场地 -->
		<place-list @pitchonPlace="pitchonPlace" ref="placelist" />
		<!-- 货道 -->
		<u-popup :show="railCommodity" mode="bottom" @close="railCommodity=false">
			<view class="popup-content">
				<view class="header">
					<span @click="railCommodity = !railCommodity">取消</span>
					<span class="title">选择仓位</span>
					<span @click="confirmEgg">确定</span>
				</view>
				<!-- <xls-search placeholder="请输入商品名称或货道编号" marLeft="-8em" /> -->
				<view class="rail-content">
					<view class="rail-item" v-for="(rail, index) in railList" :key="index" @click="pickRail(rail)">
						<view class="checkbox">
							<u-icon name="checkmark-circle-fill" size="40" color="#5241FF"
								v-if="activeRail == rail.railNumber" />
							<u-icon name="checkmark-circle" size="40" color="#cacbce" v-else />
						</view>
						<xls-image :src="rail.commodityImg" alt="" class="img" />
						<p class="device">{{ rail.shippingSpace }}-{{ rail.railNumber }}</p>
						<p class="name">{{ rail.commodityName }}</p>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	// import {
	// 	getDeviceTypePlaceList,
	// 	getDeviceListByPlaceDeviceType,
	// 	getRailCommodityList,
	// } from "@/utils/api/remoteBoot";
	// import {
	// 	addPoints,
	// 	addVendingPoints,
	// 	addEggPoints,
	// } from "@/utils/api/remoteBoot";
	// import {
	// 	deviceDetail,
	// 	getEggDeviceRailInfo,
	// 	getRailInfo,
	// } from "@/utils/api/device";
	// import api from "@/utils/shjApi";
	import PlaceList from "./components/place-list-rato.vue";
	import {
		deviceController
	} from '@/api/index.js';
	export default {
		components: {
			PlaceList
		},
		data() {
			return {
				//设备输入
				enterValue: "",
				valueStep: 1,
				dbjValue: "",
				showStep: false,
				scoreActiveValue: 0,
				upperScoreList: [{
						text: 1,
						score: 1
					},
					{
						text: 5,
						score: 5
					},
					{
						text: 10,
						score: 10
					},
					{
						text: 20,
						score: 20
					},
					{
						text: 50,
						score: 50
					},
					{
						text: 100,
						score: 100
					},
					// { text: "自定义", score: "" },
				],
				pickerDevice: false,
				deviceOrplace: true,
				//设备类型id
				deviceTypeId: "",
				placeName: "请选择场地",
				placeId: "",
				//类型场地
				typePlaceList: [],
				deviceList: [],
				//上分仓位
				upperScore: "",
				pickDeviceDetail: {
					deviceNumber: "",
					railNumber: "",
					shippingSpace: "",
				},
				uuid: "",
				//货道
				railCommodity: false,
				activeRail: -1,
				railList: [],
				startType: 1,
			};
		},
		onLoad(option) {
			const {
				deviceTypeId,
				railNumber,
				shippingSpace,
				deviceNumber
			} = JSON.parse(option.params);
			console.log("remote", JSON.parse(option.params))
			//来自上级
			if (deviceTypeId) {
				this.deviceTypeId = deviceTypeId * 1;
			}
			//售货机
			if (this.deviceTypeId == 4) {
				this.upperScore = "";
			}
			//来自订单
			if (railNumber && shippingSpace) {
				this.pickDeviceDetail.railNumber = railNumber;
				this.pickDeviceDetail.shippingSpace = shippingSpace;
				this.upperScore = `${shippingSpace}-${railNumber}`;
			}
			//来自申诉和订单
			if (deviceNumber) {
				this.pickDeviceDetail.deviceNumber = deviceNumber;
				this.enterValue = deviceNumber;
			}
			this.getTypePlace();
		},
		watch: {
			enterValue(newV) {
				if (newV) {
					this.showStep = true;
				} else {
					this.showStep = false;
				}
			},
		},
		methods: {
			goTo() {
				this.$goTo("/pages/mainPackages/home/remote/record")
			},
			/**
			 * @description:
			 * @return {*}
			 * @Date: 2023-10-04 17:14:33
			 */
			clickMethod(score, index) {
				this.scoreActiveValue = index;
				this.valueStep = score.score;
				if (score.text == "自定义") {
					this.$nextTick(() => {
						this.$refs.dbjInput.focus();
					});
				}
			},

			async getTypePlace() {
				if (!this.deviceTypeId) {
					return this.$toast("请返回上一级，选择设备类型后操作~");
				}
				//设备类型的场地列表
				let res = await deviceController.getDeviceTypePlaceList({
					deviceTypeId: this.deviceTypeId,
				});
				if (res.code == 200) {
					if (res.data.length) {
						this.typePlaceList = res.data;
						this.placeName = this.typePlaceList[0].placeName;
						this.placeId = this.typePlaceList[0].placeId;
						this.$refs.placelist.placeActive = this.typePlaceList[0].placeId;
						//场地和设备类型的设备列表
						let qes = await deviceController.getDeviceListByPlaceDeviceType({
							deviceTypeId: this.deviceTypeId,
							placeId: this.placeId,
						});
						if (qes.code == 200) {
							if (qes.data.length) {
								this.deviceList = qes.data;
							}
						}
					}
				}
			},

			showPlacelist() {
				this.pickerDevice = false;
				this.$refs.placelist.showPlacelist();
			},
			pitchonPlace(place) {
				this.placeName = place.placeName;
				this.placeId = place.id;
				this.pickPlace();
				this.pickerDevice = true;
			},

			//场地设备查询
			async pickPlace() {
				let qes = await deviceController.getDeviceListByPlaceDeviceType({
					deviceTypeId: this.deviceTypeId,
					placeId: this.placeId,
				});
				if (qes.code == 200) {
					if (qes.data.length) {
						this.deviceList = qes.data;
					} else {
						this.deviceList = [];
					}
				}
			},

			//设备
			pickDevice(nBer) {
				if (nBer.onlineState != 1) {
					return this.$toast("设备离线，不可操作~");
				} else {
					this.enterValue = nBer.deviceNumber;
					this.uuid = nBer.uuid;
					this.pickerDevice = !this.pickerDevice;
					this.pickDeviceDetail = nBer;
					this.upperScore = "";
					this.activeRail = -1;
				}
			},

			//设备货道信息
			async getRailInfo() {
				if (!this.enterValue) {
					return this.$toast("请先选择上分设备~");
				}
				this.railCommodity = !this.railCommodity;
				if (this.deviceTypeId == 4) {
					api
						.replenishmentDetails({
							deviceNumber: this.enterValue
						})
						.then((res) => {
							if (res.code == 200 || res.data.msg == "ok") {
								this.railList = res.data.data.list;
							}
						});
					return;
				}
				let res = await deviceController.getRailCommodityList({
					deviceNumber: this.enterValue,
				});
				if (res.code == 200) {
					this.railList = res.data;
				}
			},

			//仓位
			pickRail(rail) {
				this.activeRail = rail.railNumber;
				this.pickDeviceDetail = rail;
			},
			//确定选中仓位
			confirmEgg() {
				if (this.activeRail != -1) {
					this.railCommodity = !this.railCommodity;
					this.upperScore = `${this.pickDeviceDetail.shippingSpace}-${this.pickDeviceDetail.railNumber}`;
				} else {
					this.$toast("请选中上分仓位~");
				}
			},
			//上分
			async upperPoints() {
				this.$loading();
				//售货机
				if (this.deviceTypeId == 4) {
					this.shjStart();
					//扭蛋机 儿童类 游戏类
				} else if ([2, 6, 7].includes(this.deviceTypeId)) {
					this.ndjStart();
				} else {
					//兑币机、娃娃机、游乐车
					this.wwjStart();
				}
			},
			//兑币机、娃娃机、游乐车
			async wwjStart() {
				if (!this.pickDeviceDetail.deviceNumber) {
					this.$toast("请选择设备~");
					this.$hideLoading();
					return "badRequest";
				}
				if (!this.valueStep) {
					this.$toast("请输入次数~");
					this.$hideLoading();
					return "badRequest";
				}
				let rail = await deviceController.getRailCommodityList({
					deviceNumber: this.pickDeviceDetail.deviceNumber,
				});
				let currency = rail.data[0].currency;
				//设备详情
				let dev = await deviceController.deviceDetail({
					deviceNumber: this.pickDeviceDetail.deviceNumber,
				});
				let device = dev.data;
				if (device.uuid) {
					this.uuid = device.uuid;
				}
				let points =
					this.valueStep * device.currency * 1 || this.valueStep * currency * 1;
				//wwj/dbj
				let res = await deviceController.addPoints({
					uuid: this.uuid,
					deviceNumber: this.pickDeviceDetail.deviceNumber,
					points: points,
				});
				this.$hideLoading();
				if (res.code == 200) {
					this.$toast("上分成功");
				}
			},
			//售货机
			async shjStart() {
				if (!this.pickDeviceDetail.deviceNumber) {
					this.$toast("请选择设备~");
					this.$hideLoading();
					return "badRequest";
				}
				//设备详情
				let res = await deviceController.deviceDetail({
					deviceNumber: this.pickDeviceDetail.deviceNumber,
				});
				let device = res.data.data;
				if (device.uuid) {
					this.uuid = device.uuid;
				}
				let info = this.pickDeviceDetail;
				let vending = await deviceController.addVendingPoints({
					uuid: this.uuid,
					deviceNumber: info.deviceNumber,
					railNumber: info.railNumber,
					shippingSpace: info.shippingSpace,
					startType: this.startType,
					points: 1,
				});
				this.$hideLoading();
				if (vending.code == 200) {
					this.$toast("上分成功");
				}
			},
			//扭蛋机
			async ndjStart() {
				if (!this.pickDeviceDetail.deviceNumber) {
					this.$toast("请选择设备~");
					this.$hideLoading();
					return "badRequest";
				}
				//设备详情
				let res = await deviceController.deviceDetail({
					deviceNumber: this.pickDeviceDetail.deviceNumber,
				});
				let device = res.data;
				if (device.uuid) {
					this.uuid = device.uuid;
				}
				if (device.onlineState != 1) {
					this.$hideLoading();
					return this.$modal("设备离线，无法启动~", {
							title: "温馨提示",
							confirmText: "我知道了",
							confirmColor: "#5241FF",
							showCancel: false
						})
						.then(() => {
							return "badRequest";
						});
				}
				if (!this.pickDeviceDetail.railNumber) {
					this.$toast("请选择仓位~");
					this.$hideLoading();
					return "badRequest";
				}
				if (!this.pickDeviceDetail.shippingSpace) {
					this.$toast("请选择子设备~");
					this.$hideLoading();
					return "badRequest";
				}
				let gash;
				//扭蛋机 儿童类 游戏类
				if ([2, 6, 7].includes(this.deviceTypeId)) {
					gash = await deviceController.getEggDeviceRailInfo({
						deviceNumber: this.pickDeviceDetail.deviceNumber,
						shippingSpace: this.pickDeviceDetail.shippingSpace,
						railNumber: this.pickDeviceDetail.railNumber,
					});
				}

				// else {
				// 	gash = await getRailInfo({
				// 		deviceNumber: this.pickDeviceDetail.deviceNumber,
				// 		railNumber: this.pickDeviceDetail.railNumber,
				// 	});
				// }
				let eggDevice = gash.data;
				let info = this.pickDeviceDetail;
				if (eggDevice.railState != 0) {
					this.$hideLoading();
					return this.$modal("子设备离线，无法启动~", {
							title: "温馨提示",
							title: "温馨提示",
							confirmText: "我知道了",
							confirmColor: "#5241FF",
							showCancel: false
						})
						.then(() => {
							return "badRequest";
						});
				}
				let Egg = await deviceController.addEggPoints({
					uuid: this.uuid,
					deviceNumber: info.deviceNumber,
					railNumber: info.railNumber,
					shippingSpace: info.shippingSpace,
					points: this.valueStep * eggDevice.currency,
				});
				this.$hideLoading();
				if (Egg.code == 200) {
					this.$toast("上分成功");
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.deviceStartup {
		position: fixed;
		height: 100vh;
		width: 100%;
		top: 0;
		left: 0;
		background-color: #f5f6f7;
	}

	.root-wrapper {
		width: 100%;
		position: relative;
		z-index: 99;

		.item-type-style {
			width: 100%;
			height: 44px;
			background: #fff;
			display: flex;
			justify-content: center;

			.children {
				width: 95%;
				height: 44px;
				border-bottom: 1px solid rgba(204, 200, 200, 0.6);
				display: flex;

				.caption {
					width: 30%;
					height: 100%;
					font-size: 14px;
					line-height: 44px;
				}

				.input {
					width: 60%;
					height: 100%;
					display: flex;
					align-items: center;

					input[type="text"] {
						text-align: left;
						font-size: 15px;
						height: 35px;
						width: 100%;
						border: #fff 1px solid;
						line-height: 50px;
						appearance: none;
						-moz-appearance: none;
						outline: 0;
						text-decoration: none;
					}
				}

				input::-webkit-input-placeholder {
					color: #929292;
				}

				.icon {
					width: 10%;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: flex-end;
				}
			}
		}

		.step-btn-wrapper {
			width: 100%;
			background: #fff;
			display: flex;
			justify-content: center;

			.child {
				height: 44px;
				width: 95%;
				display: flex;

				.childCaption {
					height: 44px;
					width: 30%;
					font-size: 14px;
					line-height: 44px;
				}

				.childItem {
					height: 44px;
					width: 70%;
					font-size: 14px;
					line-height: 44px;
				}
			}

			.childShow {
				height: 90px;
				width: 95%;
				background: #fff;
				display: flex;
				justify-content: center;
				border-top: 1px solid #ddd;

				.childTitle {
					width: 30%;
					height: 100%;

					:nth-child(1) {
						height: 44px;
						width: 100%;
						font-size: 14px;
						line-height: 44px;
					}
				}

				.childStep {
					width: 70%;
					height: 100%;

					:nth-child(1) {
						line-height: 54px;
					}

					:nth-child(2) {
						font-size: 13px;
						color: rgb(168, 148, 148);
						line-height: 25px;
					}
				}
			}
		}

		.up-btn-style {
			width: 100%;
			height: 60px;
			display: flex;
			justify-content: center;
			align-items: center;

			.itemBtn {
				width: 95%;
				height: 44px;
				overflow: hidden;
				background: #5241ff;
				color: #fff;
				border-radius: 6px;
				text-align: center;
				font-size: 16px;
				line-height: 44px;
				margin-top: 15px;
			}
		}
	}

	.bottom-wrapper {
		width: 100%;
		height: 280px;
		margin-top: 25px;
		box-sizing: border-box;
		padding: 0 15px;
		background-image: url(#{$baseUrl}appV4/remoteBoot/bottomBg.png);
		background-size: 110% 100%;
		background-repeat: no-repeat;
		position: fixed;
		z-index: 1;
		bottom: 0;

		.link {
			bottom: 30px;
			color: #5241ff;
			font-size: 15px;
			left: 0;
			position: absolute;
			text-align: center;
			width: 100%;
		}
	}

	.main-box {
		padding: 10px;

		.stepper {
			width: 140px;
			height: 35px;
			box-sizing: border-box;
			overflow: hidden;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	.DBJ-item {
		display: flex;
		padding: 10px;
		background: #fff;
		border-top: 1px solid #ddd;
		font-size: 15px;

		.label {
			width: 100px;
		}

		.grid-panel {
			width: calc(100% - 100px);

			.grid-btns {
				display: flex;
				flex-wrap: wrap;

				.btn {
					background: #fff;
					border: 1px solid #5241ff;
					border-radius: 3px;
					color: #5241ff;
					display: inline-block;
					height: 44px;
					line-height: 44px;
					margin-bottom: 7.5px;
					margin-right: 7.5px;
					text-align: center;
					width: 70px;
				}

				.grid-input {
					padding: 0;
				}

				.disabled {
					background: #ececec;
					border: 1px solid #e9e9e9;
				}

				.active {
					color: #fff;
					background: #5241ff;
				}
			}

			.tips {
				color: #8f8f94;
				font-size: 14px;
				width: 140px;
			}
		}
	}

	.SHJ-item {
		align-items: center;
		background: #fff;
		display: flex;
		height: 58px;
		padding: 10px;
		box-sizing: border-box;
		font-size: 15px;

		.label {
			width: 100px;
			display: inline-block;
			font-size: 15px;
		}

		.radio {
			flex: 1;
			display: flex;
		}
	}

	.titleP {
		background: #fff;
		border-bottom: 1px solid #e5e5e5;
		color: #666;
		line-height: 50px;
		text-align: center;
		font-size: 16px;
	}

	.outSide {
		background: #fff;
		min-height: 44px;
		padding: 0 12px;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #e5e5e5;

		.right-icons {
			margin-left: 4px;
		}
	}

	.mainB {
		height: 25px;
		flex: 1;
		display: flex;
		font-size: 14px;
		align-items: center;
		justify-content: space-between;

		.title-txt {
			flex: 1;
			font-size: 14px;
			line-height: 24px;
		}

		.place-txt {
			flex: 1;
			text-align: right;
			line-height: 24px;
		}

		.demo {
			border-radius: 2px;
			color: #fff;
			font-size: 12px;
			line-height: 16px;
			padding: 0 4px;
			margin-left: 8px;
		}
	}

	.remark {
		color: #969799;
		font-size: 12px;
		line-height: 18px;
		margin-top: 4px;
	}

	.outSide-other {
		background: #fff;
		padding: 9px 12px;
		border-bottom: 1px solid #e5e5e5;
	}

	.PopupS {
		.textP {
			height: 44px;
			padding: 0 10px;
			font-size: 15px;
			line-height: 44px;
			border-bottom: 1px solid #e5e5e5;
		}
	}

	.popup-content {
		background: #efeff5;
		display: flex;
		flex-direction: column;
		width: 100%;
		max-height: 1000rpx;
		height: 60vh;
		position: relative;
		overflow-y: auto;
		
		.device-header-style {
			position: sticky;
			top: 0;
		}

		.header {
			align-items: center;
			border-bottom: 1px solid #e5e5e5;
			display: flex;
			font-size: 15px;
			justify-content: space-between;
			line-height: 48px;
			box-sizing: border-box;
			padding: 0 12px;
			color: #5241ff;

			.title {
				color: #666;
			}
		}

		.rail-content {
			flex: 1;
			display: flex;
			flex-wrap: wrap;
			overflow: auto;
			background: #fff;

			.rail-item {
				margin-top: 10px;
				padding: 5px;
				position: relative;
				text-align: center;
				width: 33.33%;
				box-sizing: border-box;
				min-height: 100px;

				.checkbox {
					position: absolute;
					right: 20px;
					top: -2.5px;
				}

				.img {
					height: 50px;
					width: 50px;
				}

				.device {
					color: #000;
					font-size: 14px;
					overflow: hidden;
					text-align: center;
					text-overflow: ellipsis;
					white-space: nowrap;
					width: 100%;
				}

				.name {
					color: #4c4c4c;
					font-size: 12px;
					overflow: hidden;
					text-align: center;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}
	}
</style>
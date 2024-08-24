<template>
	<view>
		<jy-navbar title="场地收益详情" bgColor="#f5f6f7"></jy-navbar>
		<view class="site-detail">
			<view class="survey-panel">
				<view class="site-info">
					<span class="name">{{detailList.placeName?detailList.placeName:detailList.deviceTypeName}}</span>
					<span class="count">{{ detailList.deviceNum }}台</span>
				</view>
				<view class="date-info">
					<span class="date-str">{{getText()}}</span>
					<span class="total-income" style="display: flex; flex-direction: column; text-align: right">
						<span class="Jtop-txt">{{ detailList.placeTotalIncome}}<span class="unit">元</span></span>
						<span class="bottom-txt cm-hidden" style="color: #bababa; font-size: 12px">
							(含服务费:<span v-html="detailList.commission ? detailList.commission : '0.00'"></span>元)
						</span>
					</span>
				</view>
				<!-- type -->
				<view class="equipment-con" @click="$refs.deviceType.showDeviceTypelist()" v-show="placeOrdevice">
					<view class="label-text">设备类型</view>
					<view class="value">
						{{deviceTypeName}}<u-icon name="arrow-right" size="36" color="#d1d1d1" />
					</view>
				</view>

			</view>

			<view class="list-panel">
				<view class="panel-hd">
					<view class="sort-item" v-for="(i, index) in screenList" :key="index"
						:class="screenActive == i.id ? 'active-screen' : ''" @click="screenActive = i.id">
						<span>{{ i.title }}</span>
						<view class="icon-play" @click="iconDown = !iconDown">
							<view class="icon-up" :class="{'active-up':screenActive==i.id&&iconDown}"></view>
							<view class="icon-down" :class="{'active-down':screenActive==i.id&&!iconDown}"></view>
						</view>
					</view>
					<u-icon name="question-circle" color="#d4d4d4" size="40" @click="questionPopup" />
				</view>
			</view>

			<view class="list-content" v-for="(dev, index) in detailList.simpleDeviceIncomeInfoVoList" :key="index" v-show="placeDeviceList">
				<view class="info-part">
					<view class="device-type">
						<view class="left">
							{{ dev.deviceTypeName }}{{ dev.deviceNumber }}
							<span class="status" v-show="!dev.moveState">已转移</span>
						</view>
						<view class="right" @click="isShowfoldOrno(dev)">
							合计: {{ dev.deviceIncome }}<span class="unit">元</span>
							<span>
								<u-icon name="arrow-up" size="18" color="#d1d1d1" class="icons"
									v-show="!dev.isShowfold" />
								<u-icon name="arrow-down" size="18" color="#d1d1d1" class="icons"
									v-show="dev.isShowfold" />
							</span>
						</view>
					</view>
					<view class="place-name" v-show="dev.placeName">
						场地：{{ dev.placeName }}
					</view>
				</view>
				<view v-show="dev.isShowfold">
					<view class="type-info" v-for="(egg, index) in dev.simpleDeviceRailIncomeInfoVoList" :key="index">
						<view class="list-item">
							<view class="machine-info">
								<span class="name">{{ egg.deviceNumber }}-{{ egg.railSpace }}/{{egg.railNumber}}</span>
							</view>
							<!-- shj -->
							<view class="flexbox" v-show="dev.deviceTypeName == '售货机'">
								<view class="flex-2">
									<view>线上合计付款{{ egg.onlinePayAmount || "0.00" }}元</view>
									<view>购买{{ egg.commodityTotalAmount || "0.00" }}元</view>
								</view>
								<view class="flex">
									<view>出货{{ egg.commodityCount || "0" }}个</view>
								</view>
								<view class="flex">
									<view>现金支付</view>
									<view>{{ egg.cashPayAmount || "0" }}个</view>
								</view>
							</view>
							<!-- wwj --><!-- ndj -->
							<view class="flexbox" v-show="dev.deviceTypeName == '娃娃机' || '扭蛋机'">
								<view class="flex">
									<view>{{ egg.totalInsertCoins || "0" }}个</view>
									<view>
										线上{{ egg.onlinePayInsertCoins || "0" }}个，线下{{egg.offlineInsertCoins || "0"}}个
									</view>
								</view>
								<view class="flex">
									<view>
										出礼比例<span
											v-html="egg.outPresentProportion > 0? egg.outPresentProportion + '/1':'0/0'"></span>
									</view>
									<view>
										{{ egg.commodityCount || "0" }}个,{{egg.commodityTotalAmount || "0.00"}}元
									</view>
								</view>
							</view>
							<!-- dbj -->
							<view class="flexbox" v-show="dev.deviceTypeName == '兑币机'">
								<view class="flex">
									<view>线上收益</view>
									<view>{{ egg.onlinePayAmount || "0.00" }}元</view>
								</view>
								<view class="flex">
									<view>补贴额</view>
									<view>{{ egg.subsidyAmount || "0.00" }}元</view>
								</view>
								<view class="flex">
									<view>现金支付</view>
									<view>{{ egg.cashPayAmount || "0.00" }}元</view>
								</view>
								<view class="flex">
									<view>实际出币</view>
									<view>{{ egg.outCoins || "0" }}个</view>
								</view>
							</view>
							<!-- ylc -->
							<view class="flexbox" v-show="dev.deviceTypeName == '游乐车'">
								<view class="flex">
									<view>线上收益</view>
									<view>{{ egg.onlinePayAmount || "0.00" }}元</view>
								</view>
								<view class="flex">
									<view>现金支付</view>
									<view>{{ egg.cashPayAmount || "0.00" }}元</view>
								</view>
								<view class="flex">
									<view>线上投币</view>
									<view>
										{{ egg.onlinePayInsertCoins || "0" }}个(线下{{egg.offlineInsertCoins || "0"}}个)
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<xls-empty v-show="!placeDeviceList"></xls-empty>
		</view>
		<xls-device-type-radio ref="deviceType" @changDeviceType="changDeviceType"></xls-device-type-radio>
	</view>
</template>

<script>
	// import {
	// 	getPlaceIncomeDetail,
	// 	getDeviceTypeIncomeDetail,
	// 	getPlaceDeviceByTypeInfo,
	// } from "@/utils/api/earningStat";
	// import DeviceTypesingle from "@/components/commonComps/deviceTypesingle";
	import {
		getDateAll
	} from "@/plugins/utilityClass";
	import {
		orderController
	} from "@/api/index.js";
	export default {
		data() {
			return {
				//设备类型名
				deviceTypeName: "全部设备",
				//设备类型id
				deviceTypeId: "",
				//跳转参数
				detailArguments: [],
				//场地或类型
				placeOrdevice: true,
				//详情
				detailList: [],
				//开始时间
				startTime: "",
				//结束时间
				endTime: "",
				//今天时间
				today: "",
				//选中状态
				screenActive: 1,
				iconDown: false,
				screenList: [{
						id: 1,
						title: "编号"
					},
					{
						id: 2,
						title: "合计投币"
					},
					{
						id: 3,
						title: "收益"
					},
					{
						id: 4,
						title: "实际出币"
					},
				],
				placeDeviceList: [],
			};
		},
		onLoad(option) {
			if (option.params) {
				const result = JSON.parse(option.params);
				this.detailArguments = result.detailArguments;
				this.startTime = this.detailArguments[1];
				this.endTime = this.detailArguments[2];
				this.today = getDateAll(0);
				if (this.detailArguments[3] == "place") {
					this.placeOrdevice = true;
					this.getPlaceDetail();
				} else {
					this.placeOrdevice = false;
					this.getTypeDetail();
				}
			}
		},
		methods: {
			//场地收益详情
			getPlaceDetail() {
				orderController.getPlaceIncomeDetail({
						startTime: this.startTime,
						endTime: this.endTime,
						placeId: this.detailArguments[0],
						deviceTypeId: this.deviceTypeId,
					})
					.then((res) => {
						if (res.code == 200) {
							this.detailList = res.data;
							this.placeDeviceList = this.detailList.simpleDeviceIncomeInfoVoList;
						}
					})
					.catch((err) => {});
			},
			//类型收益详情
			getTypeDetail() {
				orderController.getDeviceTypeIncomeDetail({
						startTime: this.startTime,
						endTime: this.endTime,
						placeId: this.detailArguments[4],
						deviceTypeId: this.detailArguments[0],
					})
					.then((res) => {
						if (res.code == 200) {
							this.detailList = res.data;
							this.placeDeviceList = this.detailList.simpleDeviceIncomeInfoVoList;
						}
					})
					.catch((err) => {});
			},
			getText() {
				return this.startTime == this.endTime ?
					this.endTime == this.today ?
					this.endTime + '今天' :
					this.endTime + '昨天' :
					this.startTime + '至' + this.endTime
			},
			//设备类型
			changDeviceType(params) {
				this.deviceTypeName = params.typeName;
				this.deviceTypeId = params.deviceTypeId;
				this.getPlaceDetail();
			},
			//疑问弹窗
			questionPopup() {
				this.$modal("娃娃机收益=在线支付收益+平台补贴\n兑币机收益=在线支付收益+现金收益", {
						confirmText: "我知道了",
						showCancel: false,
					})
					.then(() => {});
			},
			async isShowfoldOrno(dev) {
				if (dev.isShowfold) {
					this.$set(dev, "isShowfold", false);
				} else {
					this.$set(dev, "isShowfold", true);
				}
				if (!dev.simpleDeviceRailIncomeInfoVoList) {
					let res = await orderController.getPlaceDeviceByTypeInfo({
						startTime: this.startTime,
						endTime: this.endTime,
						deviceNumber: dev.deviceNumber,
					});
					if (res.code == 200) {
						this.$set(dev, "simpleDeviceRailIncomeInfoVoList", res.data);
					}
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.site-detail {
		.unit {
			font-size: 12px;
		}

		.survey-panel {
			padding: 21px 10px 0;
			background: #fff;
			border-bottom: 1px solid #c6c6c6;

			.site-info {
				font-size: 15px;
				display: flex;
				align-items: center;

				.name {
					max-width: 80%;
					color: rgba(0, 0, 0, 0.9);
				}

				.count {
					max-width: 14%;
					margin-left: 5px;
					padding: 3px 6px;
					display: inline-block;
					font-size: 13px;
					color: #fff;
					background: #19d619;
					border-radius: 4px;
					line-height: normal;
					text-align: center;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}

			.date-info {
				margin-top: 8px;
				font-size: 15px;
				color: rgba(0, 0, 0, 0.9);
				display: flex;
				justify-content: space-between;
				padding-bottom: 5px;

				.total-income {
					font-size: 18px;
					color: #000;

					.unit {
						font-size: 12px;
					}
				}
			}

			.equipment-con {
				border-top: 1px solid #ddd;
				display: flex;
				align-items: center;
				height: 44px;
				line-height: 44px;
				font-size: 16px;
				color: rgba(0, 0, 0, 0.6);

				.value {
					flex: 1;
					color: #5241ff;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					padding-left: 5px;
					display: flex;
					align-items: center;
					justify-content: flex-end;
				}
			}
		}

		.list-panel {
			margin-top: 15px;

			.icon-play {
				height: 22.5px;
				position: relative;
				left: 2.5px;

				.icon-up {
					width: 0;
					height: 0;
					border-width: 5px;
					border-style: solid;
					border-color: transparent transparent #b1b5c0;
				}

				.icon-down {
					margin-top: 2px;
					width: 0;
					height: 0;
					border-width: 5px;
					border-style: solid;
					border-color: #b1b5c0 transparent transparent;
				}

				.active-up {
					border-color: transparent transparent #5241ff;
				}

				.active-down {
					border-color: #5241ff transparent transparent;
				}
			}

			.panel-hd {
				padding: 10px;
				background: #fff;
				border-top: 1px solid #ddd;
				white-space: nowrap;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.sort-item {
					font-size: 14px;
					padding: 6px 10px;
					color: rgba(0, 0, 0, 0.4);
					border: 1px solid #f1f1f1;
					border-radius: 5px;
					display: flex;
					align-items: center;
				}

				.active-screen {
					color: #5241ff;
					border: 1px solid #5241ff;
				}
			}
		}

		.list-content {
			background: #fff;
			border-top: 1px solid #ddd;
			border-bottom: 1px solid #ddd;
			margin-bottom: 15px;

			.info-part {
				padding: 10px;
				min-height: 48px;
				font-size: 16px;

				.device-type {
					display: flex;
					justify-content: space-between;

					.status {
						padding: 0 2.5px;
						display: inline-block;
						margin-left: 5px;
						height: 18px;
						line-height: 18px;
						text-align: center;
						font-size: 11px;
						color: #fff;
						background: #ff3b30;
						border-radius: 4px;
						font-weight: 400;
					}
				}

				.place-name {
					padding-top: 8px;
					font-size: 12px;
				}

				.icons {
					margin-left: 20px;
				}
			}

			.type-info {
				margin-left: 10px;
				border-top: 1px solid #ddd;
				padding: 10px 10px 10px 0;

				.list-item {
					border: 1px solid #e5e5e5;
					border-radius: 4px;
					font-size: 14px;
					color: #5241ff;
					padding: 0 10px;

					.machine-info {
						padding: 10px 0;
						font-size: 16px;
						color: rgba(0, 0, 0, 0.9);
					}

					.flexbox {
						border-top: 1px solid #ddd;
						padding: 10px 10px 10px 0;
						overflow: hidden;
						min-height: 38px;
						display: flex;

						.flex-2 {
							flex: 2;
						}

						.flex {
							flex: 1;
						}
					}
				}
			}
		}
	}
</style>>
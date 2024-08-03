<template>
	<div class="device-manage-ment">
		<!-- <ConditionScreen /> -->
		<xls-condition></xls-condition>
		<u-list class="van-clearfix">
			<div v-for="(item, index) in dataList" :key="index" class="device-warpper">
				<div class="placeCon">
					<div class="placeName" @click="getRailDetail(item, 'edit')">
						{{ $placeNameRule(item.placeName, item.placeNumber) }}
					</div>
					<div class="placeDetail" @click.stop="getRailDetail(item)">
						<span>离线 {{ item.offlineNum }} / {{ item.deviceNum }} 台</span>
						<div class="perch">
							<!-- <van-icon name="arrow" v-show="!item.listSwitch" size="16" />
								<van-icon name="arrow-down" v-show="item.listSwitch" size="16" /> -->
						</div>
					</div>
					<!-- <van-icon name="edit" color="#5241FF" size="18" class="edit-icons"
							@click="getRailDetail(item, 'edit')" /> -->
				</div>
				<!-- two-device -->
				<div class="device-wrapper">
					<div v-for="(dev, index) in item.deviceList" :key="index" v-show="item.listSwitch"
						:class="dev.typeName != '扭蛋机' ? 'device-style' : ''">
						<div class="device" @click="updataDevice(dev)">
							<div class="left">
								<div class="name">
									<span v-show="dev.dollNumber">{{ dev.dollNumber }}号机-</span>
									{{ dev.typeName }}{{ dev.deviceNumber }}
								</div>
								<!-- 串 -->
								<image :src="`${$baseUrl}appV4/device/bunch.png`" alt="" v-if="dev.typeName" />
								<image :src="`${$baseUrl}appV4/device/pulse.png`" alt="" v-else />
							</div>
							<div class="right">
								<!-- 信号值组件 -->
								<div v-if="dev.onlineState == 1 && dev.deviceSignal > 0">
									<signal-svuetrength :signalValue="dev.deviceSignal ? dev.deviceSignal : 0" />
								</div>
								<div v-else><signal-offline /></div>
								<div class="arrow">
									<van-icon name="arrow" size="16" color="rgb(187, 184, 184)" />
								</div>
							</div>
						</div>
						<div class="remark">
							<span v-show="
                    dev.typeName == '娃娃机'
                      ? !dev.state
                      : dev.typeName == '兑币机'
                      ? !dev.state
                      : ''
                  " style="color: #ff524c; padding-right: 10px">设备已禁用</span>
							{{ dev.remark }}
						</div>
						<!-- three-top -->
						<div v-show="
                  dev.railNum &&
                  (dev.typeName == '扭蛋机' ||
                    dev.typeName == '游戏类' ||
                    dev.typeName == '儿童类' ||
                    dev.typeName == '微抓机')
                ">
							<div class="group-box-dec">
								<span @click="closeShow(dev)">共&nbsp;{{ dev.railNum }}&nbsp;个
									{{
                      dev.typeName == "儿童类"
                        ? "座位"
                        : dev.typeName == "扭蛋机"
                        ? "蛋仓"
                        : "机位"
                    }}
									&nbsp;(在线:&nbsp;{{
                      dev.onlineState == 1 && dev.deviceSignal > 0
                        ? dev.railOnlineNum
                        : 0
                    }}&nbsp;离线:&nbsp;{{
                      dev.onlineState == 1 && dev.deviceSignal > 0
                        ? dev.railOfflineNum
                        : dev.railNum
                    }}&nbsp;)</span>
								<!-- <div
                    class="reset-btn-style"
                    v-if="dev.typeName == '扭蛋机'"
                    v-hasPermi="['app:device:index:edit']"
                  >
                    <div class="btn" @click="resetDevice(dev)">重置</div>
                  </div> -->
								<span @click="closeShow(dev)">
									<!-- <van-icon name="play" class="play" size="22" color="#8d8d8d"
											v-show="dev.closeOrshow" />
										<van-icon name="play" class="playChang" size="22" color="#8d8d8d"
											v-show="!dev.closeOrshow" /> -->
								</span>
							</div>
						</div>
						<!-- three-Eggwarehouse -->
						<div style="margin-bottom: 3px" v-if="dev.deviceRailList">
							<div class="gashapon border-top" v-for="(gash, index) in dev.deviceRailList" :key="index"
								v-show="dev.closeOrshow">
								<div class="position-code">
									<div>{{ gash.shippingSpace }}/{{ gash.railNumber }}</div>
									<div v-if="
                        dev.onlineState == 1 &&
                        dev.deviceSignal > 0 &&
                        gash.railState == 0
                      ">
										<!-- <signal-svuetrength
												:signalValue="dev.deviceSignal ? dev.deviceSignal : 0" /> -->
									</div>
									<div v-else><signal-offline /></div>
								</div>
								<div class="giftInfo">
									<div class="left-box">
										<div class="image">
											<image v-lazy="gash.commodityImg" alt="" class="mianImg"
												v-show="gash.commodityImg" @error="handleError" />
											<image :src="`${baseUrl}appV4/device/default.png`" alt="" class="mianImg"
												v-show="!gash.commodityImg" />
										</div>
										<div class="info">
											<div class="text-over comidity-name">
												{{ gash.commodityName }}
											</div>
											<div class="des">
												{{ gash.currency }}币/次,&nbsp;{{
                            gash.price
                          }}元/次,&nbsp;库存{{ gash.railRepertory }}
											</div>
											<div class="des" v-show="gash.railEnable == 0" style="color: #ff524c">
												仓位已禁用
											</div>
										</div>
									</div>
									<div class="edit" v-hasPermi="['app:device:index:edit']"
										@click="showSetEgg(gash, dev)">
										编辑
									</div>
								</div>
							</div>
						</div>
						<div style="height: 6px"></div>
					</div>
				</div>
			</div>
		</u-list>

		<!-- <no-data v-show="!dataList.length" /> -->
		<!-- 批量 -->
		<!-- <place-popup ref="placePopup"></place-popup> -->
		<!-- 设备详情 -->
		<!-- <device-detail ref="deviceDetailpopup" @updatedDevice="updatedDevice"></device-detail> -->
		<!-- 蛋仓详情 -->
		<!-- <com-set ref="setting" @updatedEgg="updatedEgg"></com-set> -->

		<!-- <Tabbar v-show="$route.meta.showDeviceTabbar" /> -->
	</div>
</template>

<script>
	import xlsCondition from "./components/xls-condition/index.vue";
	// import DeviceTab from "./manaComps/deviceTab";
	// import DeviceDetail from "./manaComps/deviceDetail";
	// import PlacePopup from "./manaComps/placePopup";
	// import ComSet from "./manaComps/comSet";
	// import SignalSvuetrength from "./manaComps/signalSvuetrength";
	// import SignalOffline from "./manaComps/signalOffline";
	// import {
	// 	getDeviceRailList,
	// 	getUntreatedTotal,
	// 	getListTwo,
	// 	getListDetails,
	// 	resetting,
	// } from "@/utils/api/device";

	import {
		debounceFun,
		throttleFun
	} from "@/plugins/debounceOrthrottle";
	// import storage from "@/plugins/storage";
	// import ConditionScreen from "./components/conditionScreen.vue";
	// import Tabbar from "./components/tabbar.vue";

	export default {
		name: "deviceManagement",
		components: {
			xlsCondition,
			// DeviceTab,
			// DeviceDetail,
			// ComSet,
			// PlacePopup,
			// SignalSvuetrength,
			// SignalOffline,
			// Tabbar,
			// ConditionScreen,
		},
		data() {
			return {
				//设备列表
				dataList: [{
						"placeId": 401,
						"placeName": "V0006中土513",
						"province": "北京市",
						"city": "北京市",
						"region": "东城区",
						"placeDetails": "名额",
						"deviceNum": 2,
						"onlineNum": 0,
						"offlineNum": 2,
						"listSwitch": true,
						"deviceLoginId": "10020",
						"dollNumber": "",
						"placeNumber": "V0006"
					},
					{
						"placeId": 402,
						"placeName": "V0007中土512(测试)",
						"province": "北京市",
						"city": "北京市",
						"region": "东城区",
						"placeDetails": "空",
						"deviceNum": 8,
						"onlineNum": 2,
						"offlineNum": 6,
						"listSwitch": true,
						"deviceLoginId": "5365",
						"dollNumber": "15",
						"placeNumber": "V0007"
					},
					{
						"placeId": 1081,
						"placeName": "V0008中土514",
						"province": "广东省",
						"city": "广州市",
						"region": "番禺区",
						"placeDetails": "大龙街道",
						"deviceNum": 4,
						"onlineNum": 0,
						"offlineNum": 4,
						"listSwitch": true,
						"dollNumber": "3",
						"placeNumber": "V0008"
					},
					{
						"placeId": 1082,
						"placeName": "中土物联-513",
						"province": "北京市",
						"city": "北京市",
						"region": "东城区",
						"placeDetails": "详细地址",
						"deviceNum": 23,
						"onlineNum": 1,
						"offlineNum": 22,
						"listSwitch": true,
						"deviceLoginId": "5208",
						"dollNumber": "9",
						"placeNumber": "V0063"
					},
					{
						"placeId": 1099,
						"placeName": "中土515",
						"province": "北京市",
						"city": "北京市",
						"region": "东城区",
						"placeDetails": "新发大夏508",
						"deviceNum": 2,
						"onlineNum": 0,
						"offlineNum": 2,
						"listSwitch": true,
						"deviceLoginId": "5139",
						"placeNumber": "V0010"
					},
					{
						"placeId": 1113,
						"placeName": "V0013新发18126642688",
						"province": "广东省",
						"city": "广州市",
						"region": "番禺区",
						"placeDetails": "工厂测试",
						"deviceNum": 4,
						"onlineNum": 0,
						"offlineNum": 4,
						"listSwitch": true,
						"deviceLoginId": "4736",
						"placeNumber": "V0013"
					},
					{
						"placeId": 1117,
						"placeName": "V0014502兑币机",
						"province": "广东省",
						"city": "广州市",
						"region": "番禺区",
						"placeDetails": "工厂测试",
						"deviceNum": 5,
						"onlineNum": 0,
						"offlineNum": 5,
						"listSwitch": true,
						"placeNumber": "V0014"
					},
					{
						"placeId": 1256,
						"placeName": "1楼，测试",
						"province": "广东省",
						"city": "广州市",
						"region": "番禺区",
						"placeDetails": "1",
						"deviceNum": 12,
						"onlineNum": 0,
						"offlineNum": 12,
						"listSwitch": true,
						"deviceLoginId": "5250",
						"placeNumber": "V0015"
					},
					{
						"placeId": 1280,
						"placeName": "V0016售货机横屏工厂测试",
						"province": "重庆市",
						"city": "重庆市",
						"region": "万州区",
						"placeDetails": "工厂测试地区",
						"deviceNum": 2,
						"onlineNum": 0,
						"offlineNum": 2,
						"listSwitch": true,
						"deviceLoginId": "5156",
						"placeNumber": "V0016"
					},
					{
						"placeId": 1291,
						"placeName": "V0017游乐车",
						"province": "北京市",
						"city": "北京市",
						"region": "东城区",
						"placeDetails": "5",
						"deviceNum": 1,
						"onlineNum": 0,
						"offlineNum": 1,
						"listSwitch": true,
						"placeNumber": "V0017"
					},
					{
						"placeId": 1319,
						"placeName": "V0019广州万达店",
						"province": "广东省",
						"city": "广州市",
						"region": "海珠区",
						"placeDetails": "万达广场四楼119号",
						"deviceNum": 12,
						"onlineNum": 0,
						"offlineNum": 12,
						"listSwitch": true,
						"deviceLoginId": "5439",
						"placeNumber": "V0019"
					},
					{
						"placeId": 2448,
						"placeName": "射水测试场地",
						"province": "北京市",
						"city": "北京市",
						"region": "东城区",
						"placeDetails": "射水测试场地",
						"deviceNum": 2,
						"onlineNum": 0,
						"offlineNum": 2,
						"listSwitch": true,
						"deviceLoginId": "10036",
						"placeNumber": ""
					},
					{
						"placeId": 2486,
						"placeName": "地心测试机",
						"province": "广东省",
						"city": "广州市",
						"region": "番禺区",
						"placeDetails": "旧水坑",
						"deviceNum": 7,
						"onlineNum": 0,
						"offlineNum": 7,
						"listSwitch": true,
						"deviceLoginId": "10020",
						"dollNumber": "1",
						"placeNumber": ""
					}
				],
				//筛选条件
				screenList: {
					onlineState: "",
					placeId: "",
					deviceType: "",
					search: "",
				},
				//设备总数
				deviceNum: 0,
				//在线总数
				onlineNum: 0,

				//egg-updata
				editEggMsg: "",
				deviceMsg: {},

				//参数
				page: 0,
				onEarth: false,
				loading: false,
				// 待处理故障总数
				dealWithNum: 0,
			};
		},
		// created() {
		// 	this.getNum();
		// 	this.getDevicelist();
		// },
		methods: {
			/**
			 * @description: 重置仓位
			 * @return {*}
			 * @Date: 2024-05-21 16:31:54
			 */
			resetDevice(params) {
				let {
					deviceNumber
				} = params;
				this.$dialog
					.confirm({
						title: "温馨提示",
						message: `确定要重置设备<span style="color: #5241ff;">${deviceNumber}</span>的仓位吗？`,
						confirmButtonColor: "#5241ff",
						width: 280,
					})
					.then(() => {
						resetting({
							deviceNumber
						}).then((res) => {
							if (res.data.code == 0) {
								this.$toast("重置成功！");
								this.$set(params, "deviceRailList", []);
								this.$set(params, "railNum", 0);
								this.$set(params, "railOfflineNum", 0);
							}
						});
					})
					.catch(() => {});
			},

			// 故障总数
			getNum() {
				getUntreatedTotal().then((res) => {
					if (res.data.code == 0 || res.data.msg == "ok") {
						this.dealWithNum = res.data.data;
					}
				});
			},
			// 默认图片
			handleError(e) {
				e.target.src = reqiure("./img/default.png");
			},
			searchParams(params) {
				this.page = 0;
				this.onEarth = false;
				this.screenList = params;
				this.getDevicelist();
			},
			//设备列表
			getDevicelist: debounceFun(async function() {
				this.loading = true;
				let res = await getListTwo({
					page: ++this.page,
					size: 20,
					onlineState: this.screenList.onlineState,
					placeId: this.screenList.placeId ? this.screenList.placeId : null,
					deviceType: this.screenList.deviceType ?
						this.screenList.deviceType : null,
					search: this.screenList.search ? this.screenList.search : null,
				});
				this.loading = false;
				if (res.data.code == 0 || res.data.msg == "ok") {
					if (res.data.data.List.length < 20) {
						this.onEarth = true;
					} else {
						this.onEarth = false;
					}
					// 机台编号排序
					if (
						res.data.data.List.length > 0 &&
						res.data.data.List[0].deviceList != null
					) {
						res.data.data.List = this.descMethod(res.data.data.List);
					}
					if (this.page > 1) {
						this.dataList = [...this.dataList, ...res.data.data.List];
					} else {
						this.dataList = res.data.data.List;
						this.manyOrLittle = this.dataList.length > 10;
					}
					let placeId = storage.getSion("placeId");
					if (placeId) {
						this.dataList.forEach((item) => {
							if (item.placeId == placeId) {
								this.$refs.placePopup.callPlace(item);
								storage.removeSion("placeId");
							}
						});
					}
					this.deviceNum = res.data.data.all.offlineNums;
					this.onlineNum = res.data.data.online.onlineNums;
				}
			}, 500),
			// 机台排序
			descMethod(list) {
				list.forEach((item) => {
					if (item.deviceList != null) {
						var arr = [];
						var nullArr = [];
						item.deviceList.forEach((list) => {
							if (list.dollNumber != null && list.dollNumber != "") {
								arr.push(list);
							} else {
								nullArr.push(list);
							}
						});
						item.deviceList = this.quickSort(arr);
						item.deviceList = [...item.deviceList, ...nullArr];
					}
				});
				return list;
			},
			descListMethod(List) {
				var arr = [];
				var nullArr = [];
				List.forEach((list) => {
					if (list.dollNumber != null && list.dollNumber != "") {
						arr.push(list);
					} else {
						nullArr.push(list);
					}
				});
				List = this.quickSort(arr);
				List = [...List, ...nullArr];
				return List;
			},
			quickSort(arr) {
				if (arr.length <= 1) {
					return arr;
				}
				var pivot = arr[0];
				var left = [];
				var right = [];

				for (var i = 1; i < arr.length; i++) {
					if (arr[i].dollNumber * 1 < pivot.dollNumber * 1) {
						left.push(arr[i]);
					} else {
						right.push(arr[i]);
					}
				}
				return this.quickSort(left).concat(pivot, this.quickSort(right));
			},
			// 仓位排序 快速排序
			quickSortDesc(arr) {
				if (arr.length <= 1) {
					return arr;
				}
				var pivot = arr[0];
				var left = [];
				var right = [];

				for (var i = 1; i < arr.length; i++) {
					if (arr[i].railNumber * 1 < pivot.railNumber * 1) {
						left.push(arr[i]);
					} else {
						right.push(arr[i]);
					}
				}
				return this.quickSortDesc(left).concat(pivot, this.quickSortDesc(right));
			},
			//货仓详情
			async closeShow(dev) {
				if (dev.closeOrshow) {
					this.$set(dev, "closeOrshow", false);
				} else {
					this.$set(dev, "closeOrshow", true);
				}
				if (!dev.deviceRailList) {
					let res = await getDeviceRailList({
						deviceNumber: dev.deviceNumber
					});
					if (res.data.code == 0 || res.data.msg == "ok") {
						res.data.data = this.quickSortDesc(res.data.data);
						this.$set(dev, "deviceRailList", res.data.data);
					}
				}
			},
			//设备详情
			async getRailDetail(item, type) {
				if (!item.deviceList || (item.deviceNum && !item.deviceList.length)) {
					let res = await getListDetails({
						placeId: item.placeId,
						onlineState: this.screenList.onlineState,
						deviceType: this.screenList.deviceType ?
							this.screenList.deviceType : null,
					});
					if (res.data.code == 0 || res.data.msg == "ok") {
						// 仓位排序
						res.data.data = this.descListMethod(res.data.data);
						this.$set(item, "deviceList", res.data.data);
						item["listSwitch"] = false;
						if (type == "edit") {
							this.$refs.placePopup.callPlace(item);
						} else {
							item.listSwitch = !item.listSwitch;
						}
					}
				} else {
					if (type == "edit") {
						this.$refs.placePopup.callPlace(item);
					} else {
						item.listSwitch = !item.listSwitch;
					}
				}
			},
			//编辑蛋仓
			showSetEgg(gash, dev) {
				this.$refs.setting.changSet(
					gash.deviceNumber,
					gash.railNumber,
					dev.typeName,
					gash.shippingSpace,
					gash.commodityImg,
					dev.uuid,
					gash.railState
				);
				this.editEggMsg = gash;
			},
			//更新蛋仓数据
			updatedEgg(egg) {
				this.editEggMsg = Object.assign(this.editEggMsg, egg);
			},
			//设备详情
			updataDevice(dev) {
				this.$refs.deviceDetailpopup.isShowdetail(dev.deviceNumber);
				this.deviceMsg = dev;
			},
			//更新设备
			updatedDevice(params) {
				if (params.remark) {
					this.deviceMsg.remark = params.remark;
				} else if (params === "forbidden") {
					this.deviceMsg.state = !this.deviceMsg.state;
				} else if (params === "unbundle") {
					this.dataList.forEach((place) => {
						if (place.deviceList) {
							place.deviceList = place.deviceList.filter((device) => {
								return device.uuid != this.deviceMsg.uuid;
							});
						}
					});
				}
			},
			//批量解绑
			editBind(device) {
				this.$refs.deviceDetailpopup.deviceNumber = device;
				this.$refs.deviceDetailpopup.fromType = "来自批量";
				this.$refs.deviceDetailpopup.deviceState = true;
			},
			// 取消批量解绑
			manyBind() {
				this.$refs.placePopup.devicePopup = true;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.device-manage-ment {
		background: #f5f6f7;
		height: 100%;
		overflow-y: scroll; // overflow: hidden;  冲突 van-list
	}

	.reset-btn-style {
		flex: 1;
		display: flex;
		justify-content: flex-end;

		.btn {
			font-size: 12px;
			color: #fff;
			padding: 2px 10px;
			background: #8d8d8d;
			border-top-right-radius: 10px;
			border-bottom-right-radius: 10px;
			margin-right: 20px;

			&:active {
				background: rgb(112, 112, 112) d8d;
			}
		}
	}

	//场地
	.device-warpper {
		margin-bottom: 10px;
		background: #fff;
	}

	.placeCon {
		background: #f8fdfe;
		display: flex;
		align-items: center;
		padding: 10px 2.5%;

		.placeName {
			flex: 1;
			font-size: 17px;
			font-weight: 700;
			word-break: break-all;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
		}

		.placeDetail {
			padding-left: 12px;
			display: flex;
			justify-content: flex-end;
			color: #262626;
			font-size: 13px;
			font-weight: 400;
			align-items: center;

			.perch {
				padding: 0 10px;
			}

			.edit-icons {
				padding: 0 0px;
			}
		}
	}

	.device-wrapper {
		padding: 0 10px;
		background: #fff;

		.device-style:not(:last-child) {
			border-bottom: 1px solid #f0eff1;
		}

		.device {
			height: 45px;
			width: 100%;
			display: flex;
			justify-content: space-between;

			.left {
				display: flex;
				align-items: center;

				.name {
					text-align: right;
					font-size: 13px;
				}

				img {
					width: 18px;
					margin-left: 8px;
				}
			}

			.right {
				display: flex;
				align-items: center;

				.arrow {
					margin: 0 0 0 8px;
				}
			}
		}

		.remark {
			font-size: 12px;
			color: #8d8d8d;
			position: relative;
			top: -12px;
		}

		.line {
			background: rgb(241, 240, 240);
			height: 1px;
		}
	}

	//场地弹出
	.placeContent {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;

		.place-content {
			flex: 1;
			overflow-y: scroll;
		}

		.top {
			height: 48px;
			padding: 0 2.5%;
			display: flex;
			line-height: 48px;
			border-bottom: 1px solid #f0eff1;

			div {
				width: 33%;
				height: 48px;
			}

			.back {
				color: #5241ff;
				font-size: 16px;
				font-weight: 400;
			}

			.title {
				color: #262626;
				font-size: 16px;
				text-align: center;
			}
		}

		.positionTop {
			position: sticky;
			top: 0px;
			background: #fff;
			z-index: 6666;
		}

		.position {
			position: sticky;
			top: 50px;
			background: #fff;
			z-index: 6666;
		}

		.placeList {
			min-height: 50px;
			border-bottom: 1px solid #f0eff1;
			display: flex;
			justify-content: space-between;
			padding: 0 2.5%;
			color: #262626;
			font-size: 16px;
			font-weight: 400;
			align-items: center;

			.right {
				display: flex;
				align-items: center;
				text-align: right;
				white-space: nowrap;
			}

			.success {
				width: 30px;
			}
		}

		span {
			margin: 0 8px;
		}
	}

	//扭蛋机
	.group-box-dec {
		align-items: center;
		border: 1px solid #e6e6e6;
		color: #262626;
		display: flex;
		font-size: 14px;
		height: 40px;
		justify-content: space-between;
		padding: 0 2.5%;
		box-sizing: border-box;

		.play {
			transform: rotate(90deg);
		}

		.playChang {
			transform: rotate(270deg);
		}
	}

	.gashapon {
		border: 1px solid #e5e5e5;
		box-sizing: border-box;
		color: #262626;
		padding: 10px 2.5%;
		font-family: PingFangSC-Regular, PingFang SC;
		border-top: 0;

		.position-code {
			font-size: 13px;
			box-sizing: border-box;
			width: 100%;
			padding-bottom: 5px;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.giftInfo {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.left-box {
				display: flex;
				align-items: center;
				flex: 1;
			}

			.image {
				height: 50px;
				margin-right: 10px;
				width: 50px;

				.mianImg {
					width: 100%;
					height: 100%;
				}
			}

			.info {
				font-size: 14px;
				flex: 1;

				.comidity-name {
					max-width: 220px;
				}

				.des {
					color: #8c8c8c;
					font-size: 12px;
					margin-top: 2px;
				}
			}

			.edit {
				align-items: center;
				border: 1px solid #979797;
				border-radius: 4px;
				color: #8c8c8c;
				display: flex;
				font-size: 14px;
				height: 28px;
				justify-content: center;
				width: 54px;
			}
		}
	}
</style>
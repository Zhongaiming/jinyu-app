<template>
	<view>
		<view class="device-list">
			<view v-for="(item, dataIndex) in dataList" :key="dataIndex" class="device-list-item">

				<view class="device-list-first-place">
					<view class="place-name" @click="getRailDetail(item, 'edit')">
						{{ $placeNameRule(item.placeName, item.placeNumber) }}
					</view>
					<view class="place-detail" @click.stop="getRailDetail(item)">
						<text>离线 {{ item.offlineNum }} / {{ item.deviceNum }} 台</text>
						<view class="right-icon">
							<u-icon name="arrow-up" v-show="!item.deviceSwitch" size="32" />
							<u-icon name="arrow-down" v-show="item.deviceSwitch" size="32" />
						</view>
					</view>
					<u-icon name="edit-pen" color="#5241FF" size="36" @click="getRailDetail(item, 'edit')" />
				</view>

				<!-- 第二层 -->
				<view class="device-list-second-device" :style="{'padding-bottom':item.deviceSwitch?'20rpx':''}">
					<view v-for="(dev, itemIndex) in item.deviceList" :key="$getUniqueKey(dataIndex, itemIndex)"
						v-show="item.deviceSwitch" :class="{'device-style': dev.typeName != '扭蛋机'}">
						<view class="device" @click="updataDevice(dev)">
							<view class="left">
								<view class="name">
									<text v-show="dev.dollNumber">{{ dev.dollNumber }}号机-</text>
									{{ dev.typeName }}{{ dev.deviceNumber }}
								</view>
								<image :src="`${$baseUrl}appV4/device/bunch.png`" alt="" v-if="dev.typeName"
									class="image" mode="widthFix" />
								<image :src="`${$baseUrl}appV4/device/pulse.png`" alt="" v-else class="image"
									mode="widthFix" />
							</view>
							<view class="right">
								<!-- 信号值组件 -->
								<signal-svuetrength v-if="dev.onlineState == 1 && dev.deviceSignal > 0"
									:signalValue="dev.deviceSignal || 0" />
								<signal-offline v-else />
								<view class="arrow">
									<u-icon name="arrow-right" size="32" color="rgb(187, 184, 184)" />
								</view>
							</view>
						</view>
						<view class="remark">
							<text v-show="disableMethod(dev)" class="disabled">设备已禁用</text>
							{{ dev.remark }}
						</view>

						<!-- 蛋仓统计 -->
						<view v-if="railMethod(dev)" @click="closeShow(dev)">
							<view class="group-box-dec">
								<span>共{{ dev.railNum }}个
									{{dev.typeName == "儿童类" ? "座位" : dev.typeName == "扭蛋机" ? "蛋仓" : "机位"}}
									(在线:{{dev.onlineState == 1 && dev.deviceSignal > 0? dev.railOnlineNum: 0}}
									离线:{{dev.onlineState == 1 && dev.deviceSignal > 0? dev.railOfflineNum: dev.railNum}})
								</span>
								<span>
									<u-icon name="arrow-down-fill" class="play" size="32" color="#8d8d8d"
										v-show="dev.closeOrshow" />
									<u-icon name="arrow-up-fill" class="playChang" size="32" color="#8d8d8d"
										v-show="!dev.closeOrshow" />
								</span>
							</view>
						</view>

						<!-- 第三层 -->
						<view class="device-list-three-egg" v-if="dev.deviceRailList">
							<view class="egg-item" v-for="(gash, gashIndex) in dev.deviceRailList"
								:key="$getUniqueKey(itemIndex, gashIndex)" v-show="dev.closeOrshow">

								<view class="egg-count">
									<view>{{ gash.shippingSpace }}/{{ gash.railNumber }}</view>
									<view>
										<signal-svuetrength
											v-if="dev.onlineState == 1 && dev.deviceSignal > 0 && gash.railState == 0"
											:signalValue="dev.deviceSignal ? dev.deviceSignal : 0" />
										<signal-offline v-else />
									</view>
								</view>

								<view class="egg-gift">
									<view class="left-box">
										<view class="image">
											<image :src="gash.commodityImg" alt="" class="img" v-if="gash.commodityImg"
												@error="handleError" />
											<image :src="`${$baseUrl}appV4/device/default.png`" alt="" class="img"
												v-else />
										</view>
										<view class="egg-info">
											<view class="comidity-name">
												{{ gash.commodityName }}
											</view>
											<view class="egg-des">
												{{ gash.currency }}币/次,{{gash.price}}元/次,库存{{ gash.railRepertory }}
											</view>
											<view class="egg-des color" v-show="gash.railEnable == 0">
												仓位已禁用
											</view>
										</view>
									</view>
									<view class="egg-edit" v-hasPermi="['app:device:index:edit']"
										@click="showSetEgg(gash, dev)">
										编辑
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 设备详情 -->
		<device-detail ref="deviceDetailpopup" @updatedDevice="updatedDevice" @manyBind="manyBind"></device-detail>
		<!-- 蛋仓详情 -->
		<egg-set ref="setting" @updatedEgg="updatedEgg"></egg-set>
		<!-- 批量 -->
		<device-batch-set-vue ref="placePopup" @editBind="editBind"></device-batch-set-vue>
	</view>
</template>

<script>
	import signalOffline from "../signal-offline/index.vue"
	import signalSvuetrength from "../signal-svuetrength/index.vue"
	import deviceDetail from "../device-detail/index.vue"
	import eggSet from "../egg-set/index.vue"
	import deviceBatchSetVue from "../device-batch-set/device-batch-set.vue"
	
	import {
		deviceController
	} from "@/api/index.js"
	export default {
		components: {
			signalOffline,
			signalSvuetrength,
			deviceDetail,
			eggSet,
			deviceBatchSetVue,
		},
		props: {
			dataList: {
				type: Array,
				default: []
			},
			screen: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		data() {
			return {
				deviceMsg: {},
				editEggMsg: {},
			}
		},
		methods: {
			disableMethod(dev) {
				// return ['娃娃机', '兑币机'].includes(dev.typeName) && dev.state === 0;
				return dev.state === 0;
			},
			railMethod(dev) {
				return ['扭蛋机', '游戏类', '儿童类', '微抓机'].includes(dev.typeName) && dev.railNum;
			},
			//设备详情
			async getRailDetail(item, type) {
				if (!item.deviceList || (item.deviceNum && !item.deviceList.length)) {
					const screen = Object.fromEntries(
						Object.entries(this.screen).filter(([key, value]) => value !== null && value !==
							undefined && value !== '')
					);
					let res = await deviceController.getListDetails({
						placeId: item.placeId,
						...screen
					});
					if (res.code == 200) {
						// 仓位排序
						res.data = this.descListMethod(res.data);
						this.$set(item, "deviceList", res.data);
						if (type == "edit") {
							this.$refs.placePopup.callPlace(item)
						} else {
							if (item.deviceSwitch) {
								this.$set(item, "deviceSwitch", false);
							} else {
								this.$set(item, "deviceSwitch", true);
							}
						}
					}
				} else {
					if (type == "edit") {
						this.$refs.placePopup.callPlace(item)
					} else {
						if (item.deviceSwitch) {
							this.$set(item, "deviceSwitch", false);
						} else {
							this.$set(item, "deviceSwitch", true);
						}
					}
				}
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
			//货仓详情
			async closeShow(dev) {
				if (dev.closeOrshow) {
					this.$set(dev, "closeOrshow", false);
				} else {
					this.$set(dev, "closeOrshow", true);
				}
				if (!dev.deviceRailList) {
					let res = await deviceController.getDeviceRailList({
						deviceNumber: dev.deviceNumber
					});
					if (res.code == 200) {
						res.data = this.quickSortDesc(res.data);
						this.$set(dev, "deviceRailList", res.data);
					}
				}
			},
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
			// 设备详情
			updataDevice(dev) {
				this.$refs.deviceDetailpopup.isShowdetail(dev.deviceNumber);
				this.deviceMsg = dev;
			},
			//更新设备
			updatedDevice(params) {
				if (params.hasOwnProperty('remark')) {
					this.$set(this.deviceMsg, 'remark', params.remark);
				}  
				if (params.hasOwnProperty('dollNumber')) {
					this.$set(this.deviceMsg, 'dollNumber', params.dollNumber);
				} 
				if (params === "forbidden") {
					const state = this.deviceMsg.state == 1 ? 0 : 1;
					this.$set(this.deviceMsg, 'state', state);
				} 
				// 解绑
				if (params === "unbundle") {
					this.$emit('bingClearDevice', {
						type: params,
						params: this.deviceMsg
					})
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
					gash.railState,
					gash.commodityName,
				);
				this.editEggMsg = gash;
			},
			//更新蛋仓数据
			updatedEgg(egg) {
				Object.assign(this.editEggMsg, egg);
			},
			
			// 批量解绑
			editBind(device) {
			  this.$refs.deviceDetailpopup.deviceNumber = device
			  this.$refs.deviceDetailpopup.fromType = "来自批量"
			  this.$refs.deviceDetailpopup.deviceState = true
			},
			// 取消批量解绑
			manyBind() {
			  this.$refs.placePopup.devicePopup = true
			},
		}
	}
</script>

<style lang="scss" scoped>
	.device-list {

		&-item {
			margin-bottom: 20rpx;
			background: #fff;
		}

		&-first-place {
			background: #f8fdfe;
			display: flex;
			align-items: center;
			padding: 20rpx 2.5%;

			.place-name {
				flex: 1;
				font-size: 34rpx;
				font-weight: 700;
				word-break: break-all;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
			}

			.place-detail {
				padding-left: 24rpx;
				display: flex;
				justify-content: flex-end;
				color: #262626;
				font-size: 26rpx;
				font-weight: 400;
				align-items: center;

				.right-icon {
					padding: 0 20rpx;
				}
			}
		}

		&-second-device {
			padding: 0 20rpx;

			.device-style:not(:last-child) {
				border-bottom: 2rpx solid #f0eff1;
			}

			.device {
				height: 90rpx;
				width: 100%;
				display: flex;
				justify-content: space-between;

				.left {
					display: flex;
					align-items: center;

					.name {
						text-align: right;
						font-size: 26rpx;
					}

					.image {
						width: 36rpx;
						margin-left: 16rpx;
					}
				}

				.right {
					display: flex;
					align-items: center;

					.arrow {
						margin: 0 0 0 16rpx;
					}
				}
			}

			.remark {
				font-size: 24rpx;
				color: #8d8d8d;
				position: relative;
				top: -12rpx;
			}

			.disabled {
				color: #ff524c;
				padding-right: 20rpx
			}

			.line {
				background: rgb(241, 240, 240);
				height: 2rpx;
			}

			//扭蛋机
			.group-box-dec {
				align-items: center;
				border: 2rpx solid #e6e6e6;
				color: #262626;
				display: flex;
				font-size: 28rpx;
				height: 80rpx;
				justify-content: space-between;
				padding: 0 2.5%;
				box-sizing: border-box;
			}
		}

		&-three-egg {
			margin-bottom: 18rpx;

			.egg-item {
				border: 2rpx solid #e5e5e5;
				box-sizing: border-box;
				color: #262626;
				padding: 20rpx 2.5%;
				font-family: PingFangSC-Regular, PingFang SC;
				border-top: 0;

				.egg-count {
					font-size: 26rpx;
					box-sizing: border-box;
					width: 100%;
					padding-bottom: 10rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
				}

				.egg-gift {
					display: flex;
					align-items: center;
					justify-content: space-between;

					.left-box {
						display: flex;
						align-items: center;
						flex: 1;
					}

					.image {
						height: 100rpx;
						margin-right: 20rpx;
						width: 100rpx;

						.img {
							width: 100%;
							height: 100%;
						}
					}

					.egg-info {
						font-size: 28rpx;
						flex: 1;

						.comidity-name {
							max-width: 440rpx;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}

						.egg-des {
							color: #8c8c8c;
							font-size: 24rpx;
							margin-top: 4rpx;
						}

						.color {
							color: #ff524c
						}
					}

					.egg-edit {
						align-items: center;
						border: 2rpx solid #979797;
						border-radius: 8rpx;
						color: #8c8c8c;
						display: flex;
						font-size: 28rpx;
						height: 56rpx;
						justify-content: center;
						width: 108rpx;
					}
				}
			}
		}
	}
</style>
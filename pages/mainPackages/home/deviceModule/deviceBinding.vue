<template>
	<view class="xls-device-binging">
		<view class="info-content">
			<view class="item-cell">
				<view>设备唯一码</view>
				<view class="right-value">{{ deviceInfo.deviceNumber }}</view>
			</view>

			<view class="item-cell">
				<view>设备类型</view>
				<view class="right-value">{{ deviceInfo.typeName }}</view>
			</view>
			<!-- 1娃娃机 6儿童类 2扭蛋机-->
			<view class="item-cell item-cell-other" v-if="![1, 6].includes(deviceInfo.deviceType)">
				<view>投放场地</view>
				<view class="right-value" @click="$refs.placeList.showPlacePopup(bingDeviceInfo.placeId)">
					{{bingDeviceInfo.placeName || '未设置'}}
				</view>
				<view class="arrow-icon"><u-icon name="arrow-right" size="36" /></view>
			</view>

			<view class="item-cell item-cell-other" v-if="deviceInfo.deviceType == 2">
				<view>机台编号<span class="choose">(选填)</span></view>
				<view class="right-value" @click="serialNumber = !serialNumber">
					{{deviceNo || '未设置'}}
				</view>
				<view class="arrow-icon"><u-icon name="arrow-right" size="36" /></view>
			</view>

			<view class="item-cell item-cell-other-price" v-if="[1, 6].includes(deviceInfo.deviceType)">
				<view>单价(币/次)</view>
				<view class="right-value">
					<u-number-box v-model="bingDeviceInfo.price" integer inputWidth="116" buttonSize="66" iconStyle="fontSize: 17px"/>
				</view>
			</view>
			<view class="item-cell item-cell-other wwj" v-if="[1, 6].includes(deviceInfo.deviceType)">
				<view>投放场地</view>
				<view class="right-value" @click="$refs.placeList.showPlacePopup(bingDeviceInfo.placeId)">
					{{ bingDeviceInfo.placeName || '未设置'}}
				</view>
				<view class="arrow-icon"><u-icon name="arrow-right" size="36" /></view>
			</view>
		</view>


		<view class="btn-content">
			<view class="btn primary" @click="bingDevice">提交注册</view>
		</view>

		<crane-machine @getRailNumber="getRailNumber" :disableList="disableList"
			v-if="deviceInfo.typeName == '娃娃机' || deviceInfo.typeName == '儿童类'" ref="number" />
		<xls-place-radio ref="placeList" @getPlaceId="pickerPlace" :defaultPicker="true"></xls-place-radio>

		<!-- 输入机台编号 -->
		<u-popup v-model="serialNumber" round>
			<view class="device-number-wrapper">
				<view class="top-con">
					<view class="title">机台编号</view>
					<view class="enter">
						<input v-model="deviceEnterNo" placeholder="请输入机台编码" />
					</view>
				</view>
				<view class="bottom-btn">
					<view class="btn cancel" @click="serialNumber = !serialNumber">
						取消
					</view>
					<view class="btn confirm" @click="(serialNumber = !serialNumber), (deviceNo = deviceEnterNo)">
						确定
					</view>
				</view>
			</view>
		</u-popup>


	</view>
</template>

<script>
	import {
		deviceController
	} from "@/api/index.js";
	import craneMachine from "./components/crane-machine/crane-machine.vue";
	export default {
		components: {
			craneMachine
		},
		data() {
			return {
				bingDeviceInfo: {
					placeName: "",
					placeId: "",
					railNumber: "",
					price: 1,
				},
				serialNumber: false,
				deviceEnterNo: "",
				deviceNo: "",
				deviceInfo: {
					bindingState: 0,
					uuid: "",
					deviceNumber: "",
					deviceType: 2,
					typeName: "",
				},
				disableList: [],
				havePlace: true,
			};
		},
		onLoad(option) {
			if (option.params) {
				this.deviceInfo = JSON.parse(option.params).deviceInfo;
			}
		},
		methods: {
			pickerPlace(place) {
				Object.assign(this.bingDeviceInfo, place);
				this.wwjByPlace();
			},
			//绑定设备
			async bingDevice() {
				if (!this.bingDeviceInfo.placeId) {
					this.$toast("请选择绑定场地！！");
					return;
				}
				let params = {
					uuid: this.deviceInfo.uuid,
					deviceNumber: this.deviceInfo.deviceNumber,
					placeId: this.bingDeviceInfo.placeId,
					remark: "ztwl_appV4",
				};
				if ([1, 6].includes(this.deviceInfo.deviceType)) {
					if (!this.bingDeviceInfo.railNumber) {
						return this.$toast("请选择设备机台编号~");
					}
					params["railNumber"] = this.bingDeviceInfo.railNumber; //娃娃机 设备货道号
					params["price"] = this.bingDeviceInfo.price; //币数
				}
				let res = await deviceController.bindingDevice(params);
				if (res.code == 200) {
					this.$toast("绑定成功~");
					this.$goBack();
				}
			},
			//机台编号
			getRailNumber(params) {
				this.bingDeviceInfo.railNumber = params ? params : "";
			},
			//已注册机台编号
			wwjByPlace() {
				if (
					this.deviceInfo.typeName == "娃娃机" ||
					this.deviceInfo.typeName == "儿童类"
				) {
					deviceController.getMachineNumber({
						placeId: this.bingDeviceInfo.placeId
					}).then(res => {
							if (res.code == 200) {
								this.disableList = [];
								res.data.map((item) => {
									this.disableList.push(item * 1);
								});
							}
						}
					);
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.xls-device-binging {

		.info-content {
			border-bottom: 1rpx solid #e1e0e6;

			.item-cell {
				display: flex;
				align-items: center;
				padding: 24rpx;
				background-color: #fff;

				.choose {
					color: rgb(185, 183, 183);
					font-size: 26rpx;
				}

				.right-value {
					flex: 1;
					text-align: right;
					color: rgba(0, 0, 0, 0.4);
					font-size: 28rpx;
					display: flex;
					align-items: center;
					justify-content: flex-end;
				}

				.arrow-icon {
					height: 100%;
					display: flex;
					align-items: center;
					padding: 0 10rpx;
					color: rgb(185, 183, 183);
					font-size: 36rpx;
				}
			}

			.item-cell:not(:last-child) {
				border-bottom: 1rpx solid #e1e0e6;
			}

			.item-cell-other {
				padding-right: 0;
			}

			.item-cell-other-price {
				padding: 12rpx 24rpx;
			}

			.wwj {
				margin-top: 24rpx;
			}
		}

		.btn-content {
			padding: 40rpx 30rpx;
			position: fixed;
			width: 100%;
			box-sizing: border-box;
			bottom: 0;
			right: 0;
			background-color: #efeff4;
			z-index: 9999;

			.btn {
				padding-top: 22rpx;
				padding-bottom: 22rpx;
				text-align: center;
				border-radius: 10rpx;
			}

			.primary {
				color: #fff;
				background-color: #5241ff;
			}
		}
	}

	.device-number-wrapper {
		width: 540rpx;

		.top-con {
			padding: 32rpx;
			box-sizing: border-box;

			.title {
				width: 100%;
				text-align: center;
				font-size: 32rpx;
				padding-bottom: 24rpx;
			}
		}

		.bottom-btn {
			height: 100rpx;
			border-top: 1rpx solid #ddd;
			display: flex;

			.btn {
				flex: 1;
				line-height: 100rpx;
				text-align: center;
				font-size: 30rpx;
			}

			.confirm {
				color: #5241ff;
				border-left: 1rpx solid #ddd;
			}
		}

		.enter {
			border: 1rpx solid #ddd;
			border-radius: 8rpx;
			overflow: hidden;
		}

		.enter:not(:last-child) {
			margin-bottom: 30rpx;
		}
	}
</style>
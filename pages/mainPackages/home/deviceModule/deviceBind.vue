<template>
	<view class="xls-device-binging">
		<view class="xls-device-binging-content">
			<image :src="`${$baseUrl}appV4/remoteBoot/scan-icon.png`" alt="" mode="widthFix" class="image" />
			<view v-if="showOperatetype">
				<view class="btn-box primary" @click="launchScan(1)">扫码注册</view>
				<view class="btn-box primary" @click="headerEnter(1)">手动注册</view>
			</view>
			<view>
				<view class="btn-box primary" @click="launchScan(0)">扫码绑定</view>
				<view class="btn-box primary" @click="headerEnter(0)">手动绑定</view>
			</view>

			<view class="btn-box default" @click="goTo">
				返回首页
			</view>
		</view>

		<u-popup :show="operatePopup" round="20" mode="center">
			<view class="operate-popup">
				<view class="operate-popup-body">
					<view class="title">设备{{operatetype?"注册":"绑定"}}</view>
					<view>
						<u--input v-model="device.deviceUuid" placeholder="请输入设备编码/设备唯一码"></u--input>
					</view>
					<view class="enter" v-if="operatetype">
						<u-radio-group v-model="device.deviceType" placement="column">
							<u-radio :customStyle="{marginBottom: '8rpx'}" v-for="(item, index) in deviceTypeList"
								:key="index" :label="item.typeName" :name="item.id" size="40" iconSize="32"
								activeColor="#5241FF" labelSize="28">
							</u-radio>
						</u-radio-group>
					</view>
				</view>
				<view class="bottom-btn">
					<view class="btn cancel" @click="operatePopup = false">
						取消
					</view>
					<view class="btn confirm" @click="confirmBing">确定</view>
				</view>
			</view>
		</u-popup>
		<!-- 注册或重置 结果-->
		<u-popup :show="resultPopup" round="20" mode="center">
			<view class="result-popup">
				<p class="title">{{ result.type }}成功</p>
				<view class="main-content" v-if="result.type == '注册'">
					恭喜！类型为<span class="text">{{ result.typeName }}</span>的设备注册成功，设备编码为<span class="text">{{
              result.deviceNumber
            }}</span>~
				</view>
				<view class="main-content" v-if="result.type == '重置'">
					恭喜！当前设备重置成功，设备编码为<span class="text">{{
              result.deviceNumber
            }}</span>~
				</view>
				<view class="bottom-btn-comfirm" @click="resultPopup = false">
					我知道了
				</view>
			</view>
		</u-popup>
		<!-- 合法规范 -->
		<bingLegalNorm ref="legal" @getDeviceInfoTwo="getDeviceInfoTwo" />
	</view>

</template>

<script>
	import {
		deviceController
	} from "@/api/index.js";
	import {
		getInfo
	} from "@/common/auth.js";
	import bingLegalNorm from "./components/bing-legal-norm/index.vue";
	// #ifdef H5
	import wx from "weixin-jsapi";
	// #endif
	export default {
		components: {
			bingLegalNorm
		},
		data() {
			return {
				showOperatetype: false,
				operatetype: 0, // 0 普通  1 ztwl
				operatePopup: false, //手动
				device: {
					deviceType: 2,
					deviceUuid: "",
				},
				deviceTypeList: [],
				deviceInfo: {},
				// ===
				resultPopup: false, //注册结果提示
				result: {},

			};
		},
		onLoad() {
			const {
				commercialNumber,
				userType
			} = getInfo();
			const list = ['ZTWL_20241011160655014', 'ZTWL_20240816162905521'];
			const userTypeList = [1, 4]
			this.showOperatetype = list.includes(commercialNumber) && userTypeList.includes(userType);
			this.getTypeList();
		},
		methods: {
			goTo() {
				// deviceController.updateFromPc({
				// 	dto: {
				// 		deviceNumber: "30003303",
				// 		deviceType: 5
				// 	}
				// })
				// deviceController.restartDevice({
				// 	// imei: "867303073884231",
				// 	imei: "861714055498251" // 30003300
				// })
				this.$goTab();
			},
			getImage(id) {
				let image;
				if (id) {
					const url = id == this.activeDeviceTypeId ? "A" : "";
					try {
						image = `${this.$baseUrl}appV4/type/type${url}${id}.png`;
					} catch (error) {
						image = `${this.$baseUrl}appV4/type/default${url}.png`;
					}
				} else {
					image = `${this.$baseUrl}appV4/type/type${url}.png`;
				}
				return image;
			},
			getTypeList() {
				deviceController.getDeviceTypeList({
					pageParam: {
						pageNum: 1,
						pageSize: 1000
					}
				}).then(res => {
					this.deviceTypeList = res.data.dataList
				})
			},
			//手动
			confirmBing() {
				if (!this.device.deviceUuid) {
					return this.$toast("请输入设备编号~");
				}
				this.operatePopup = false;
				if (this.operatetype) {
					//注册
					this.resultPopupByuuid();
				} else {
					//绑定
					this.getDeviceInfo();
				}
			},
			//查询设备信息
			async getDeviceInfo() {
				let res = await deviceController.getDeviceRegisterInfo({
					inputInfo: this.device.deviceUuid
				});
				if (res.code == 200) {
					this.deviceInfo = res.data;
					if (this.deviceInfo.bindingState == 1) {
						// 已绑定
						this.$goTo("/pages/mainPackages/home/deviceModule/deviceBinded", "navigateTo", {
							deviceInfo: this.deviceInfo
						})
					} else if (this.deviceInfo.bindingState == 0) {
						// 去绑定
						this.$nextTick(() => {
							this.$refs.legal.downloadNorm = true;
						});
					}
				} else {
					this.errorTips(res.message);
				}
			},

			async getDeviceInfoTwo() {
				this.$nextTick(() => {
					this.$refs.legal.downloadNorm = false;
				});
				this.$goTo("/pages/mainPackages/home/deviceModule/deviceBinding", "navigateTo", {
					deviceInfo: this.deviceInfo
				})
			},

			//注册设备--不做限制
			async resultPopupByuuid() {
				if (!this.device.deviceUuid) {
					return this.$toast("设备uuid结果为空,请重试~");
				}
				let res = await deviceController.addDevice({
					uuid: this.device.deviceUuid,
					deviceType: this.device.deviceType,
				});
				if (res.code == 200) {
					this.operatePopup = false;
					this.resultPopup = true;
					let result;
					if(res.hasOwnProperty('data')) {
						result = res.data;
					} else {
						result = res.message;
					}
					//res.data.data.indexOf('DEVICE_EXISTS_DATA_RESET' > 0 )
					if (typeof result == "string" || typeof result == "String") {
						this.result["type"] = "重置";
						this.result["deviceNumber"] = result.split("：")[1];
					} else {
						this.result = result;
						this.result["type"] = "注册";
					}
				} else if (res.message) {
					this.$dialog.alert({
						title: "注册失败",
						message: `${res.message}`,
						confirmButtonText: "我知道了",
					});
				}
			},
			//手动
			headerEnter(force) {
				this.operatetype = force;
				this.device = {
					deviceType: "",
					deviceUuid: "",
				};
				this.operatePopup = !this.operatePopup;
			},

			//错误提示
			errorTips(msg) {
				this.$modal(msg, {
						confirmText: "我知道了",
						confirmColor: "#5241FF",
						showCancel: false
					})
					.then(() => {});
			},

			// 扫一扫
			launchScan(force) {
				this.operatetype = force;
				if (
					!/MicroMessenger/.test(window.navigator.userAgent) &&
					!/AlipayClient/.test(window.navigator.userAgent)
				) {
					//支付宝或微信
					return this.$modal("请使用微信/支付宝或在应用内浏览器打开程序", {
						title: "温馨提示",
						confirmText: "我知道了",
						showCancel: false
					});
				}
				let that = this;
				if (/MicroMessenger/.test(window.navigator.userAgent)) {
					wx.ready(() => {
						wx.scanQRCode({
							needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
							scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
							success: function(res) {
								//IMEI:869298053964870
								//https://mv3.ztuwl.com/g/?key=30000023-1-1
								//https://mv3.ztuwl.com/g/?key=30000026
								let data = res.resultStr;
								if (data.indexOf("key=") > -1) {
									that.device.deviceUuid = data.split("key=")[1].split("-")[0];
								} else if (data.indexOf("IMEI:") > -1) {
									//IMEI:863488051068487,MAC:C8C2C640B9E3
									let imei = data.split(",")[0].split(":")[1];
									that.device.deviceUuid = imei;
								} else {
									that.device.deviceUuid = data;
								}
								if (that.operatetype) {
									// 注册
									// that.addDeviceByuuid();--uuid有限制
									// that.resultPopupByuuid();
									that.ztwlBingDevice = false;
									that.operatePopup = true;
								} else {
									//查询
									that.getDeviceInfo();
								}
							},
							fail: function(res) {},
						});
					});
				} else {
					ap.scan({
							type: "qr",
						},
						function(res) {
							if (res.error === 10) {
								// 用户取消扫码
							} else if (res.error === 11) {
								// 错误码为11：扫码失败
								that.$toast("网络开小差了...");
							} else {
								let data = res.code;
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
		padding-top: 100rpx;

		&-content {
			padding: 100rpx 24rpx 24rpx;
			text-align: center;

			.image {
				width: 35%;
				margin-bottom: 40rpx;
			}

			.btn-box {
				margin: 36rpx auto 0;
				padding-top: 22rpx;
				padding-bottom: 22rpx;
				text-align: center;
				border-radius: 10rpx;
				font-size: 32rpx;
			}

			.btn-box:active {
				opacity: 0.5;
			}

			.primary {
				color: #fff;
				background-color: #04be02;
			}

			.default {
				color: #000;
				background-color: #fff;
			}
		}
	}

	.operate-popup {
		width: 320px;

		&-body {
			padding: 16px;
			box-sizing: border-box;

			.title {
				width: 100%;
				text-align: center;
				font-size: 18px;
				font-weight: 700;
				padding-bottom: 12px;
			}

			.enter {
				padding: 20rpx 0;
			}

		}

		.bottom-btn {
			height: 100rpx;
			border-top: 2rpx solid #ddd;
			display: flex;

			.btn {
				flex: 1;
				line-height: 100rpx;
				text-align: center;
				font-size: 30rpx;
			}

			.confirm {
				color: #5241ff;
				border-left: 2rpx solid #ddd;
			}
		}
	}

	.result-popup {
		width: 540rpx;
		background: #fff;
		border-radius: 20rpx;

		.title {
			font-size: 40rpx;
			font-weight: 700;
			padding: 40rpx 0 40rpx 0;
			text-align: center;
		}

		.main-content {
			padding: 32rpx;
			font-size: 28rpx;
			text-align: center;
			line-height: 44rpx;

			.text {
				color: #5241ff;
			}
		}

		.bottom-btn-comfirm {
			margin-top: 30rpx;
			line-height: 100rpx;
			text-align: center;
			font-size: 36rpx;
			color: #5241ff;
			border-top: 2rpx solid #ddd;
		}
	}
</style>
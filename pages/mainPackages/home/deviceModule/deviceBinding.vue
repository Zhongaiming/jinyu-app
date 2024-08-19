<template>
	<view class="xls-device-binging">
		<view class="xls-device-binging-content">
			<image :src="`${$baseUrl}appV4/remoteBoot/scan-icon.png`" alt="" mode="widthFix" class="image" />
			<view v-if="operatetype">
				<view class="btn-box primary" @click="launchScan()">扫码注册</view>
				<view class="btn-box primary" @click="headerEnter()">手动注册</view>
			</view>
			<view v-else>
				<view class="btn-box primary" @click="launchScan()">扫码绑定</view>
				<view class="btn-box primary" @click="headerEnter()">手动绑定</view>
			</view>

			<view class="btn-box default" @click="goTo">
				返回首页
			</view>
		</view>

		<!-- 手动 注册、绑定 -->
		<u-popup :show="operatePopup" round="20" mode="center">
			<view class="operate-popup">
				<view class="operate-popup-body">
					<view class="title">设备注册</view>
					<view>
						<u--input v-model="device.deviceUuid" placeholder="请输入设备编码/设备唯一码"></u--input>
					</view>
					<view class="enter">
						<u-radio-group v-model="device.deviceType" @change="pickerType">
							<u-radio :customStyle="{marginBottom: '8rpx'}" v-for="(item, index) in deviceTypeList"
								:key="index" :label="item.iotClassifyTitle" :name="item.iotClassifyId" size="40"
								iconSize="32" activeColor="#5241FF" labelSize="28">
							</u-radio>
						</u-radio-group>
					</view>
				</view>
				<view class="bottom-btn">
					<view class="btn cancel" @click="operatePopup = false">
						取消
					</view>
					<view class="btn confirm" @click="headerBinding">确定</view>
				</view>
			</view>
		</u-popup>
		<!-- 注册或重置 结果-->
		<u-popup :show="resultPopup" round="20">
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
		<!-- <LegalNorm ref="legal" @getDeviceInfoTwo="getDeviceInfoTwo" /> -->
	</view>

</template>

<script>
	import {
		deviceController
	} from "@/api/index.js";
	export default {
		components: {
			// LegalNorm
		},
		data() {
			return {
				operatetype: 0, // 0 普通  1 ztwl
				operateDict: {
					0: "注册",
					1: "绑定"
				},
				operatePopup: false, //手动
				device: {
					deviceType: 2,
					deviceUuid: "",
				},
				deviceTypeList: [],


				deviceUuidStr: "",
				operatetype: false, //是否ztwl登录
				ztwlBingDevice: false, // true 绑定 false 注册仅ztwl拥有
				resultPopup: false, //注册结果提示
				result: {},

				deviceInfo: {},
			};
		},
		async created() {
			this.getTypeList();
		},
		methods: {
			goTo() {
				this.$goBack();
			},
			getTypeList() {
				deviceController.getDeviceTypeList().then(res => {
					this.deviceTypeList = res.data.dataList
				})
			},
			//查询设备信息
			async getDeviceInfo() {
			  this.showDeviceNum = false;
			  let info = await getDeviceRegisterInfo({ inputInfo: this.deviceUuid });
			  if (info.data.code == 0 || info.data.msg == "ok") {
			    let deviceInfo = info.data.data;
			    this.deviceInfo = info.data.data;
			    if (deviceInfo.bindingState == 1) {
			      this.$router.push({
			        //已绑定
			        path: "/aBinding/tipsError",
			        query: { deviceInfo: JSON.stringify(deviceInfo) },
			      });
			    } else if (deviceInfo.bindingState == 0) {
			      this.$nextTick(() => {
			        this.$refs.legal.downloadNorm = true;
			      });
			    }
			  } else {
			    this.errorTips(info.data.msg);
			  }
			},
			
			async getDeviceInfoTwo() {
				this.$nextTick(() => {
					this.$refs.legal.downloadNorm = false;
				});
				this.$router.push({
					//未绑定
					path: "/aBinding/deviceRegister",
					query: {
						deviceInfo: JSON.stringify(this.deviceInfo)
					},
				});
			},

			//注册设备--不做限制
			async resultPopupByuuid() {
				if (!this.deviceUuid) {
					return this.$toast("设备uuid结果为空,请重试~");
				}
				let res = await addDevice({
					uuid: this.deviceUuid,
					deviceType: this.deviceType,
				});
				if (res.data.code == 0 || res.data.msg == "ok") {
					this.operatePopup = false;
					this.resultPopup = true;
					let result = res.data.data;
					//res.data.data.indexOf('DEVICE_EXISTS_DATA_RESET' > 0 )
					if (typeof result == "string" || typeof result == "String") {
						this.result["type"] = "重置";
						this.result["deviceNumber"] = result.split("：")[1];
					} else {
						this.result = result;
						this.result["type"] = "注册";
					}
				} else if (res.data.msg) {
					this.$dialog.alert({
						title: "注册失败",
						message: `${res.data.msg}`,
						confirmButtonText: "我知道了",
					});
				}
			},
			
			//选择注册设备类型
			pickerType(picker, value, index) {
				this.deviceType = value.id;
			},
			//手动
			headerEnter(ztwl) {
				if (ztwl == 1) {
					this.ztwlBingDevice = true; //绑定
				} else {
					this.ztwlBingDevice = false; //注册
				}
				this.deviceUuid = "";
				this.operatePopup = !this.operatePopup;
			},
			//手动
			headerBinding() {
				if (!this.deviceUuid) {
					return this.$toast("请输入设备编号~");
				}
				if (this.ztwlBingDevice) {
					this.getDeviceInfo(this.deviceUuid);
				} else {
					if (this.operatetype) {
						//注册
						// this.addDeviceByuuid();
						this.resultPopupByuuid();
					} else {
						//绑定
						this.getDeviceInfo(this.deviceUuid);
					}
				}
			},
			//错误提示
			errorTips(msg) {
				this.$dialog
					.alert({
						title: "温馨提示",
						message: msg,
						width: "270",
						confirmButtonText: "我知道了",
						confirmButtonColor: "#5241FF",
					})
					.then(() => {});
			},
			
			// 扫一扫
			launchScan(force) {
				if (
					!/MicroMessenger/.test(window.navigator.userAgent) &&
					!/AlipayClient/.test(window.navigator.userAgent)
				) {
					//支付宝或微信
					return this.$dialog.alert({
						title: "温馨提示",
						message: "请使用微信/支付宝或在应用内浏览器打开程序",
						confirmButtonText: "我知道了",
						confirmButtonColor: "#5241FF",
						width: "270",
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
								that.deviceUuidStr = data;
								if (data.indexOf("key=") > -1) {
									that.deviceUuid = data.split("key=")[1].split("-")[0];
								} else if (data.indexOf("IMEI:") > -1) {
									//IMEI:863488051068487,MAC:C8C2C640B9E3
									let imei = data.split(",")[0].split(":")[1];
									that.deviceUuid = imei;
								} else {
									that.deviceUuid = data;
								}
								if (force == 1) {
									//查询信息
									that.getDeviceInfo(that.deviceUuid);
								} else {
									if (that.operatetype) {
										// 注册
										// that.addDeviceByuuid();--uuid有限制
										// that.resultPopupByuuid();
										that.ztwlBingDevice = false;
										that.operatePopup = true;
									} else {
										//查询
										that.getDeviceInfo(that.deviceUuid);
									}
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
			line-height: 50rpx;
			text-align: center;
			font-size: 36rpx;
			color: #5241ff;
			border-top: 2rpx solid #ddd;
		}
	}
</style>
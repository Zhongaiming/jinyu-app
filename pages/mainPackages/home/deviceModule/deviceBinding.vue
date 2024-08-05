<template>
	<div class="xls-device-binging">
		<div class="content">
			<image :src="`${$baseUrl}appV4/remoteBoot/scan-icon.png`" alt="" mode="widthFix" class="image" />
			<div class="btn-box primary" @click="launchScan" v-html="isAdministrator ? '扫码注册' : '扫码绑定'"></div>
			<div class="btn-box primary" @click="headerEnter" v-html="isAdministrator ? '手动注册' : '手动绑定'"></div>
			<div v-show="isAdministrator">
				<div class="btn-box primary" @click="launchScan(1)">扫码绑定</div>
				<div class="btn-box primary" @click="headerEnter(1)">手动绑定</div>
			</div>
			<div class="btn-box default" @click="goTo">
				返回首页
			</div>
		</div>
		<!-- 手动 注册、绑定 -->
		<u-popup v-model="showDeviceNum" round>
			<div class="showDeviceNum">
				<div class="top-con">
					<div class="title" v-html="
                ztwlBingDevice
                  ? '设备绑定'
                  : isAdministrator
                  ? '设备注册'
                  : '设备绑定'
              "></div>
					<div class="enter">
						<u-field v-model="deviceUuid" :placeholder="
                  ztwlBingDevice
                    ? '请输入设备编码/设备唯一码'
                    : isAdministrator
                    ? '请输入设备唯一码'
                    : '请输入设备编码/设备唯一码'
                " />
					</div>

					<u-radio-group v-model="deviceType" class="type-wrapper-radio"
						v-if="isAdministrator && !ztwlBingDevice">
						<u-radio v-for="(item, index) in deviceTypeList" :key="index" :name="item.id"
							class="type-i-content" :class="deviceType == item.id ? 'type-a-content' : ''">
							{{ item.typeName }}
							<template #icon="props">
								<image class="type-image"
									:src="props.checked ? getImage(item.id) : getImage(item.id)" />
							</template>
						</u-radio>
					</u-radio-group>
				</div>
				<div class="bottom-btn">
					<div class="btn cancel" @click="showDeviceNum = !showDeviceNum">
						取消
					</div>
					<div class="btn confirm" @click="headerBinding">确定</div>
				</div>
			</div>
		</u-popup>
		<!-- 注册或重置 -->
		<u-popup v-model="registerDevice" round>
			<div class="registerDevice">
				<p class="title">{{ registerInfo.type }}成功</p>
				<div class="main-content" v-if="registerInfo.type == '注册'">
					恭喜！类型为<span class="text">{{ registerInfo.typeName }}</span>的设备注册成功，设备编码为<span class="text">{{
              registerInfo.deviceNumber
            }}</span>~
				</div>
				<div class="main-content" v-if="registerInfo.type == '重置'">
					恭喜！当前设备重置成功，设备编码为<span class="text">{{
              registerInfo.deviceNumber
            }}</span>~
				</div>
				<div class="bottom-btn-comfirm" @click="registerDevice = false">
					我知道了
				</div>
			</div>
		</u-popup>
		<!-- 合法规范 -->
		<!-- <LegalNorm ref="legal" @getDeviceInfoTwo="getDeviceInfoTwo" /> -->
	</div>

</template>

<script>
	// <reader ref="reader" />
	// @click="$refs.reader.media()" @click="$router.replace('/home')" H5扫码 https下有效
	// import {
	// 	addDevice,
	// 	getDeviceRegisterInfo
	// } from "@/utils/api/addDevice";
	// import wx from "weixin-jsapi";
	// import local from "@/plugins/storage";
	// import {
	// 	getDevicetype
	// } from "@/utils/api/device";
	// import LegalNorm from "./childComps/legalNorm.vue";
	export default {
		name: "aBinding",
		components: {
			// LegalNorm
		},
		data() {
			return {
				showDeviceNum: false, //手动
				deviceUuid: "",
				deviceUuidStr: "",
				isAdministrator: false, //是否ztwl登录
				ztwlBingDevice: false, // true 绑定 false 注册仅ztwl拥有
				registerDevice: false, //注册结果提示
				registerInfo: {},
				deviceType: 2,
				deviceTypeList: [],
				deviceInfo: {},
			};
		},
		// async created() {
		// 	// 判断用户是否允许注册设备= 仅ztwl可以
		// 	let name = local.get("useMerName");
		// 	if (name === "ztwl") {
		// 		this.isAdministrator = true;
		// 	} else {
		// 		this.isAdministrator = false;
		// 	}
		// 	let res = await getDevicetype();
		// 	if (res.data.data) {
		// 		res.data.data.forEach((element) => {
		// 			element["text"] = element.typeName;
		// 			this.deviceTypeList.push(element);
		// 		});
		// 	}
		// },
		methods: {
			goTo() {
				uni.navigateBack();
			},
			getImage(id) {
				let image;
				if (id) {
					try {
						image = require(`${this.$baseUrl}appV4/type/type${
            id == this.pickType ? "A" : ""
          }${id}.png`);
					} catch (error) {
						image = require(`${this.$baseUrl}appV4/type/default${
            id == this.pickType ? "A" : ""
          }.png`);
					}
				} else {
					image = require(`${this.$baseUrl}appV4/type/type${
          id == this.pickType ? "A" : ""
        }.png`);
				}
				return image;
			},
			//查询设备信息
			async getDeviceInfo() {
				this.showDeviceNum = false;
				let info = await getDeviceRegisterInfo({
					inputInfo: this.deviceUuid
				});
				if (info.data.code == 0 || info.data.msg == "ok") {
					let deviceInfo = info.data.data;
					this.deviceInfo = info.data.data;
					if (deviceInfo.bindingState == 1) {
						this.$router.push({
							//已绑定
							path: "/aBinding/tipsError",
							query: {
								deviceInfo: JSON.stringify(deviceInfo)
							},
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
			//注册设备--uuid有限制 暂时停用
			async addDeviceByuuid() {
				let deviceUuid = "";
				if (
					this.deviceUuid != null &&
					this.deviceUuid != undefined &&
					this.deviceUuid != ""
				) {
					if (this.deviceUuid.indexOf("86") >= 0) {
						if (this.deviceUuid.indexOf("IMEI") >= 0) {
							deviceUuid = this.deviceUuid.split(":")[1];
							if (this.deviceUuid.indexOf("MAC") >= 0) {
								deviceUuid = this.deviceUuid.split(",")[0];
							}
						} else {
							deviceUuid = this.deviceUuid;
						}
						//ztwl注册
						let res = await addDevice({
							uuid: deviceUuid
						});
						if (res.data.code == 0 || res.data.msg == "ok") {
							this.showDeviceNum = false;
							this.registerDevice = true;
							this.registerInfo = res.data.data;
						} else if (res.data.msg) {
							this.$toast(res.data.msg);
						}
					} else {
						if (this.deviceUuidStr.indexOf("key=") > 0) {
							let res = await addDevice({
								uuid: this.deviceUuid
							});
							if (res.data.code == 0 || res.data.msg == "ok") {
								this.showDeviceNum = false;
								this.registerDevice = true;
								this.registerInfo = res.data.data;
							} else if (res.data.msg) {
								this.$toast(res.data.msg);
							}
						} else {
							this.$toast("设备唯一码格式错误~");
						}
					}
				} else {
					this.$toast("设备唯一码为空~");
				}
			},
			//注册设备--不做限制
			async registerDeviceByuuid() {
				if (!this.deviceUuid) {
					return this.$toast("设备uuid结果为空,请重试~");
				}
				let res = await addDevice({
					uuid: this.deviceUuid,
					deviceType: this.deviceType,
				});
				if (res.data.code == 0 || res.data.msg == "ok") {
					this.showDeviceNum = false;
					this.registerDevice = true;
					let result = res.data.data;
					//res.data.data.indexOf('DEVICE_EXISTS_DATA_RESET' > 0 )
					if (typeof result == "string" || typeof result == "String") {
						this.registerInfo["type"] = "重置";
						this.registerInfo["deviceNumber"] = result.split("：")[1];
					} else {
						this.registerInfo = result;
						this.registerInfo["type"] = "注册";
					}
				} else if (res.data.msg) {
					this.$dialog.alert({
						title: "注册失败",
						message: `${res.data.msg}`,
						confirmButtonText: "我知道了",
					});
				}
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
									if (that.isAdministrator) {
										// 注册
										// that.addDeviceByuuid();--uuid有限制
										// that.registerDeviceByuuid();
										that.ztwlBingDevice = false;
										that.showDeviceNum = true;
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
				this.showDeviceNum = !this.showDeviceNum;
			},
			//手动
			headerBinding() {
				if (!this.deviceUuid) {
					return this.$toast("请输入设备编号~");
				}
				if (this.ztwlBingDevice) {
					this.getDeviceInfo(this.deviceUuid);
				} else {
					if (this.isAdministrator) {
						//注册
						// this.addDeviceByuuid();
						this.registerDeviceByuuid();
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
		},
	};
</script>

<style lang="scss" scoped>
	.xls-device-binging {
		background-color: #efeff4;
		width: 100%;
		height: 100vh;
		position: relative;
		padding-top: 60px;
		box-sizing: border-box;
		overflow-y: scroll;
	}

	.content {
		width: 100%;
		text-align: center;

		.image {
			width: 35%;
			margin-bottom: 20px;
		}

		.btn-box {
			width: 95%;
			margin: 18px auto 0;
			padding-top: 11px;
			padding-bottom: 11px;
			text-align: center;
			border-radius: 5px;
			font-size: 16px;
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

	.showDeviceNum {
		width: 320px;

		.top-con {
			padding: 16px;
			box-sizing: border-box;

			.title {
				width: 100%;
				text-align: center;
				font-size: 18px;
				font-weight: 700;
				padding-bottom: 12px;
			}
		}

		.bottom-btn {
			height: 49px;
			border-top: 1px solid #ddd;
			display: flex;

			.btn {
				flex: 1;
				line-height: 49px;
				text-align: center;
				font-size: 15px;
			}

			.confirm {
				color: #5241ff;
				border-left: 1px solid #ddd;
			}
		}

		.enter {
			border: 1px solid #ddd;
			border-radius: 4px;
			overflow: hidden;
		}

		.enter:not(:last-child) {
			margin-bottom: 15px;
		}
	}

	.registerDevice {
		width: 270px;
		background: #fff;

		.title {
			font-size: 20px;
			font-weight: 700;
			padding: 20px 0 10px 0;
			text-align: center;
		}

		.main-content {
			padding: 16px;
			font-size: 14px;
			text-align: center;
			line-height: 22px;

			.text {
				color: #5241ff;
				font-weight: 500;
			}
		}

		.bottom-btn-comfirm {
			margin-top: 15px;
			line-height: 50px;
			text-align: center;
			font-size: 18px;
			color: #5241ff;
			border-top: 1px solid #ddd;
		}
	}

	.type-wrapper-radio {
		padding: 20px;
		display: flex;
		flex-wrap: wrap;
		max-height: 200px;
		overflow-y: scroll;

		.type-i-content {
			width: 50%;
			margin: 10px 0;
			height: 30px;
			display: flex;
			align-items: center;
			line-height: 30px;
		}

		.type-image {
			width: auto;
			height: 24px;
		}
	}

	::v-deep .u-radio__label {
		color: #000;
		line-height: 30px;
		font-size: 14px;
	}

	::v-deep .type-a-content .u-radio__label {
		color: #5241ff !important;
		font-weight: 700;
	}
</style>
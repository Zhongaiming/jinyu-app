<template>
	<view class="egg-content">
		<!-- 蛋仓详情 -->
		<u-popup :show="showSetting" mode="bottom" @close="showSetting=false">
			<view class="top">
				<view class="sides" @click="showSetting = false">取消</view>
				<view class="title">商品设置</view>
				<view class="sides right-side" @click="editEggdetail">确定</view>
			</view>

			<view class="content">
				<view class="chooseItem" @click="getCommodity">
					<view>商品名称</view>
					<view class="right">
						<view class="text-over maxWidth">{{ eggDetail.commodityName }}</view>
						<view class="arrow">
							<u-icon name="arrow-right" size="36" color="#bbb8b8" />
						</view>
					</view>
				</view>

				<view class="chooseItem">
					<view>投币单价(币/次)</view>
					<view class="rightBox">
						<view class="twoSide" @click="eggDetail.currency > 0 ? --eggDetail.currency : ''">
							-
						</view>
						<view class="centerCon">
							<input v-model="eggDetail.currency" clearable placeholder="请输入" input-align="center"
								type="digit" />
						</view>
						<view class="twoSide" @click="++eggDetail.currency">+</view>
					</view>
				</view>

				<view class="chooseItem">
					<view @click="questionPopup(1)" class="icon-style">
						支付单价(元/次)<u-icon name="question-circle" color="#999" size="36" style="margin-left: 6px" />
					</view>
					<view class="rightBox border">
						<input v-model="eggDetail.price" clearable placeholder="请输入" input-align="center" type="number"
							:formatter="formatter" format-trigger="onBlur" />
					</view>
				</view>

				<view class="chooseItem">
					<view>游戏时间(S)</view>
					<view class="rightBox">
						<view class="twoSide" @click="eggDetail.gameTime > 0 ? --eggDetail.gameTime : ''">
							-
						</view>
						<view class="centerCon">
							<input v-model="eggDetail.gameTime" clearable placeholder="请输入" input-align="center" />
						</view>
						<view class="twoSide" @click="++eggDetail.gameTime">+</view>
					</view>
				</view>

				<view class="chooseItem">
					<view>现有库存</view>
					<view class="rightBox">
						<view class="twoSide" :class="{'disable': !parseFloat(eggDetail.railRepertory)}" @click="
                (showSetting = false),
                  (alterRepertory = true),
                  (alterType = '减少库存')
              ">
							-
						</view>
						<view class="centerCon">
							<input v-model="eggDetail.railRepertory" clearable placeholder="请输入" input-align="center"
								type="number" />
						</view>
						<view class="twoSide" @click="
                (showSetting = false),
                  (alterRepertory = true),
                  (alterType = '增加库存')
              ">
							+
						</view>
					</view>
				</view>

				<view class="chooseItem">
					<view @click="questionPopup(0)" class="icon-style">
						备用库存<u-icon name="question-circle" color="#999" size="36" style="margin-left: 6px" />
					</view>
					<view class="rightBox">
						<view class="twoSide" @click="
                eggDetail.railSpareRepertory > 0
                  ? --eggDetail.railSpareRepertory
                  : ''
              ">
							-
						</view>
						<view class="centerCon">
							<input v-model="eggDetail.railSpareRepertory" clearable placeholder="请输入"
								input-align="center" />
						</view>
						<view class="twoSide" @click="++eggDetail.railSpareRepertory">+</view>
					</view>
				</view>

				<view class="chooseItem">
					<view>仓位禁用</view>
					<view class="rightBox disabledDevice">
						<u-switch v-model="railEnable" active-color="#5241FF" size="50"
							@change="()=>{eggDetail.railEnable=railEnable?0:1}" />
					</view>
				</view>

				<view class="chooseItem" @click="(showQs = !showQs), (showSetting = !showSetting)">
					<view>生成二维码</view>
					<view class="right">
						<view class="arrow">
							<u-icon name="arrow-right" size="36" color="#bbb8b8" />
						</view>
					</view>
				</view>
			</view>
		</u-popup>
		<!-- 增减库存 -->
		<u-popup :show="alterRepertory" mode="bottom" @close="(alterRepertory = false), (showSetting = true)">
			<view class="qs-content repertory-wrapper">
				<view class="qs-top">
					<view class="sider-content" @click="(alterRepertory = false), (showSetting = true)">
						返回
					</view>
					<view class="qs-title">{{ alterType }}</view>
					<view class="sider-content" :class="{'right-btn':!repertory}" @click="confrimAlter">
						确定
					</view>
				</view>
				<view class="qs-body">
					<view class="alter-wrapper">
						<view class="title-style">
							{{ alterType == "增加库存" ? "增加数量" : "减少数量" }}
						</view>
						<input type="number" v-model="repertory" clearable placeholder="请输入" input-align="center" class="input-style"/>
					</view>
				</view>
			</view>
		</u-popup>
		<!-- 二维码 -->
		<u-popup :show="showQs" mode="bottom" @close="(showQs = !showQs), (showSetting = !showSetting)">
			<view class="qs-content">
				<view class="qs-top">
					<view class="top-left" @click="(showQs = !showQs), (showSetting = !showSetting)">
						<u-icon name="arrow-left" size="40"/>
					</view>
					<view class="qs-title">{{ deviceTypeName }}{{ deviceNumber }}</view>
				</view>

				<!-- <view class="title-qs-wrapper">
					<view class="title-txt" @click="qsType = true" :class="{'active-txt':qsType}">
						H5码
					</view>
					<view class="title-txt" @click="qsType = false" :class="{'active-txt':!qsType}">
						小程序码
					</view>
				</view> -->

				<view class="qs-body" v-show="qsType">
					<qr-canvas-rail :deviceNumber="deviceNumber" :railNumber="railNumber" :shippingSpace="shippingSpace"
						v-if="showQs" />
					<view class="desc">长按二维码,保存或发送给朋友</view>
				</view>

				<!-- <view class="qs-body" v-show="!qsType">
					<qr-canvas-rail-mini :deviceNumber="deviceNumber" :railNumber="railNumber"
						:shippingSpace="shippingSpace" :decideType="deviceTypeName" v-if="showQs" />
					<view class="desc">长按二维码，保存或发送给朋友</view>
				</view> -->
			</view>
		</u-popup>

		<!-- 添加或编辑商品 -->
		<!-- <u-popup :show="addCommodity" mode="bottom">
			<view class="top">
				<view class="sides" @click="(commodityPopup = !commodityPopup), (addCommodity = !addCommodity)">
					返回
				</view>
				<view class="title">商品预览</view>
			</view>
			<view class="comDetail">
				<view class="edit-list">
					<view class="name">商品名称</view>
					<view class="enter">
						<input v-model="commodityList.commodityName" center clearable placeholder="请输入"
							input-align="right" />
					</view>
					<view class="back-icon">
						<u-icon name="arrow" color="#b1b1b1" size="16" />
					</view>
				</view>

				<view class="edit-list">
					<view class="name">成本价</view>
					<view class="enter">
						<input v-model="commodityList.costPrice" center clearable placeholder="请输入"
							input-align="right" />
					</view>
					<view class="back-icon">
						<u-icon name="arrow" color="#b1b1b1" size="16" />
					</view>
				</view>

				<view class="edit-list">
					<view class="name">商品类型</view>
					<view class="enter">
						{{ commodityList.commodityTypeName }}
					</view>
					<view class="back-icon">
						<u-icon name="arrow" color="#b1b1b1" size="16" />
					</view>
				</view>

				<view class="image">
					<view class="name">图片(选填)</view>
					<view class="img">
						<u-uploader v-model="fileList" max-count="1" />
					</view>
				</view>
				<view class="text-con">
					<view class="name">描述</view>
					<textarea placeholder="非必填项,字数控制在50字以内" maxlength="50"
						v-model="commodityList.commodityDescribe"></textarea>
				</view>
			</view>
		</u-popup> -->
		<!-- 商品类型--单选 -->
		<!-- <commodity-type ref="comType" @itemclick="itemclick" :allCheck="true" /> -->
		
		<xls-commodity :commodityId="eggDetail.commodityId" @confirm="pitchCommodity" ref="commodity"></xls-commodity>
	</view>
</template>

<script>
	import QrCanvasRail from "../qr-canvas-rail/index.vue";
	// import {
	// 	getList
	// } from "@/utils/api/commodity";
	// import {
	// 	getRailInfo,
	// 	editEggDeviceRailInfo,
	// 	getEggDeviceRailInfo,
	// 	editRailCommodity,
	// 	setRepertoryNumber,
	// } from "@/utils/api/device";
	// import CommodityType from "@/components/commonComps/commodityType";
	import {
		debounceFun,
		throttleFun
	} from "@/plugins/debounceOrthrottle";
	// import qrCanvasRailMini from "./qrCanvasRailMini.vue";
	import {
		deviceController
	} from "@/api/index.js";

	export default {
		components: {
			QrCanvasRail,
			// CommodityType,
			// qrCanvasRailMini
		},
		data() {
			return {
				//修改库存
				alterRepertory: false,
				alterType: "增加库存",
				repertory: "",
				//展示
				showSetting: false,
				//二维码
				showQs: false,
				//商品列表
				commodityPopup: false,
				//添加商品
				addCommodity: false,
				//仓位状态
				railEnable: false,
				//添加商品
				commodityList: {
					commodityName: "",
					costPrice: "",
					commodityTypeName: "请选择",
					commodityDescribe: "",
				},
				//商品列表
				commodity: [],
				//上传
				fileList: [],
				//详情
				eggDetail: {},
				//商品类型
				commodityTypeName: "全部",
				commodityTypeId: "",
				searchCommodityName: "",
				//设备类型
				deviceTypeName: "",
				deviceNumber: "",
				railNumber: "",
				shippingSpace: "",
				//商品
				page: 1,
				onEarth: false,
				gameTime: "",
				uuid: "",
				railState: "",
				qsType: true,
			};
		},
		methods: {
			//确定修改
			confrimAlter() {
				if (this.alterType == "增加库存") {
					this.eggDetail.railRepertory =
						parseFloat(this.eggDetail.railRepertory) + parseFloat(this.repertory);
				} else {
					this.eggDetail.railRepertory =
						parseFloat(this.eggDetail.railRepertory) > parseFloat(this.repertory) ?
						parseFloat(this.eggDetail.railRepertory) -
						parseFloat(this.repertory) :
						0;
				}
				this.repertory = "";
				this.alterRepertory = false;
				this.showSetting = true;
			},

			//打开/关闭--获取蛋仓详情
			async changSet(
				device,
				rail,
				name,
				shippingSpace,
				commodityImg,
				uuid,
				railState,
				commodityName
			) {
				if (
					name == "扭蛋机" ||
					name == "游戏类" ||
					name == "儿童类" ||
					name == "微抓机"
				) {
					let eggDetail = await deviceController.getEggDeviceRailInfo({
						deviceNumber: device,
						railNumber: rail,
						shippingSpace: shippingSpace,
					});
					if (eggDetail.code == 200) {
						this.eggDetail = eggDetail.data;
						this.railSpareRepertory = this.eggDetail.railSpareRepertory;
						this.gameTime = this.eggDetail.gameTime;
						if (!this.eggDetail.railEnable) {
							this.railEnable = true;
						} else {
							this.railEnable = false;
						}
					} else {
						this.$toast({
							message: eggDetail.data.msg,
							position: "top",
							duration: 3000,
						});
						this.eggDetail = {};
					}
				} else {
					let eggDetail = await deviceController.getRailInfo({
						deviceNumber: device,
						railNumber: rail,
						shippingSpace: shippingSpace,
					});
					if (eggDetail.code == 200) {
						this.eggDetail = eggDetail.data;
						if (!this.eggDetail.railEnable) {
							this.railEnable = true;
						}
					} else {
						this.$toast({
							message: eggDetail.data.msg,
							position: "top",
							duration: 3000,
						});
						this.eggDetail = {};
					}
				}
				this.deviceTypeName = name;
				this.deviceNumber = device;
				this.shippingSpace = shippingSpace;
				this.railNumber = rail;
				this.showSetting = true;
				this.eggDetail.commodityImg = commodityImg;
				this.eggDetail.commodityName = commodityName;
				this.uuid = uuid;
				this.railState = railState;
			},
			//编辑蛋仓
			async editEggdetail() {
				if (!this.eggDetail.commodityId) {
					return this.$toast("请选择商品");
				}
				if (!this.eggDetail.price) {
					return this.$toast("请设置商品单价");
				}
				if (!this.eggDetail.currency) {
					return this.$toast("请设置投币单价");
				}
				if (!this.eggDetail.railRepertory) {
					return this.$toast("请设置库存");
				}
				if (this.eggDetail.railEnable == "") {
					this.eggDetail.railEnable = 0;
				}

				if (this.deviceTypeName == "扭蛋机" || this.deviceTypeName == "游戏类") {
					deviceController.setRepertoryNumber({
						imei: this.uuid,
						subId: this.eggDetail.shippingSpace * 1, //子设备号
						cwId: this.eggDetail.railNumber * 1, //货道号
						statue: this.railState, //状态（0在线，1离线）
						repertoryStatue: this.eggDetail.railEnable == 1 ? 0 : 1, //仓位状态（0启用，1禁用）
						repertoryNumber: this.eggDetail.railRepertory * 1, //库存数
					});
					let res = await deviceController.editEggDeviceRailInfo({
						deviceNumber: this.eggDetail.deviceNumber,
						railNumber: this.eggDetail.railNumber,
						shippingSpace: this.eggDetail.shippingSpace,
						commodityId: this.eggDetail.commodityId,
						price: Math.round(this.eggDetail.price * 100),
						currency: this.eggDetail.currency,
						railRepertory: this.eggDetail.railRepertory+'',
						railEnable: this.eggDetail.railEnable,
						railSpareRepertory: this.eggDetail.railSpareRepertory+'',
						gameTime: this.eggDetail.gameTime,
					});
					if (res.code == 200) {
						this.$toast("修改成功");
						this.showSetting = !this.showSetting;
						this.$emit("updatedEgg", this.eggDetail);
						this.eggDetail = {};
					}
				} else {
					let price = Math.round(this.eggDetail.price * 100);
					let res = await deviceController.editRailCommodity({
						deviceNumber: this.eggDetail.deviceNumber,
						railNumber: this.eggDetail.railNumber,
						commodityId: this.eggDetail.commodityId,
						price: price,
						currency: this.eggDetail.currency,
						railRepertory: this.eggDetail.railRepertory,
						railCapacity: this.eggDetail.railCapacity,
						railEnable: this.eggDetail.railEnable,
						railSpareRepertory: this.eggDetail.railSpareRepertory,
						gameTime: this.eggDetail.gameTime,
					});
					if (res.code == 200) {
						this.$toast("修改成功");
						this.showSetting = !this.showSetting;
						this.$emit("updatedEgg", this.eggDetail);
						this.eggDetail = {};
					}
				}
			},
			//疑问弹窗
			questionPopup(params) {
				if (params) {
					const message =
						"1、“支付单价” 是指，当用户没有余币时，可直接支付启动的价格。\n2、若用户没有余币的,则点击启动按钮时,可通过支付与 “支付单价” 等值的金额来直接启动设备。\n3、若用户有余币的,则优先抵扣余币（抵扣与 “投币单价” 等值的币数）。";
					this.$modal(message, {
							title: "离线说明",
							confirmText: "我知道了",
							confirmColor: "#5241FF",
							showCancel: false,
						})
						.then(() => {});
				} else {
					this.$modal("备用库存仅用于记录存放在仓位外的其他库存，该库存不会影响机器使用，请与现有库存做好区分", {
							title: "备用库存",
							confirmText: "我知道了",
							confirmColor: "#5241FF",
							showCancel: false,
						})
						.then(() => {});
				}
			},

			//商品列表--更改商品
			getCommodity() {
				this.showSetting = !this.showSetting;
				this.$refs.commodity.openMethod()
			},
			//选中商品
			pitchCommodity(commodity) {
				this.eggDetail.commodityName = commodity.commodityName;
				this.eggDetail.commodityId = commodity.commodityId;
				this.eggDetail.commodityImg = commodity.commodityImg;
				this.eggDetail.price = commodity.suggestRetailPrice;
				// this.eggDetail.currency = commodity.suggestInsertCoins;
				this.commodityPopup = !this.commodityPopup;
				this.showSetting = !this.showSetting;
			},
			
			//获取商品
			async getComlist() {
				let res = await getList({
					page: 1,
					size: 12,
					commodityName: encodeURIComponent(this.searchCommodityName),
					commodityTypeId: this.commodityTypeId,
				});
				if (res.data.code == 0 || res.data.msg == "ok") {
					this.commodity = res.data.data.records;
					this.onEarth = false;
					if (res.data.data.records.length < 12) {
						this.onEarth = true;
					}
					this.page = 1;
				}
			},
			scrollMoreCom(doc) {
				var scrollTop = doc.target.scrollTop;
				var scrollHeight = doc.target.scrollHeight;
				var clientHeight = doc.target.clientHeight;
				if (scrollTop + clientHeight + 50 >= scrollHeight) {
					if (this.onEarth == false) {
						this.getMore();
					}
				}
			},

			getMore: debounceFun(async function() {
				let res = await getList({
					page: ++this.page,
					size: 12,
					commodityName: encodeURIComponent(this.searchCommodityName),
					commodityTypeId: this.commodityTypeId,
				});
				this.commodity = [...this.commodity, ...res.data.records];
				this.onEarth = false;
				if (res.data.records.length < 12) {
					this.onEarth = true;
				}
			}, 500),



			//清空输入
			clearEnter() {
				this.commodityList.commodityName = "";
				this.commodityList.costPrice = "";
				this.commodityList.commodityTypeName = "请选择";
				this.commodityList.commodityDescribe = "";
				this.fileList = [];
				this.commodityPopup = !this.commodityPopup;
				this.addCommodity = !this.addCommodity;
			},
			//选中商品类型
			itemclick(pick) {
				if (pick == "全部") {
					this.commodityList.commodityTypeName = "全部";
					this.commodityTypeName = "全部";
					this.commodityTypeId = "";
				} else {
					this.commodityList.commodityTypeName = pick.name;
					this.commodityTypeName = pick.name;
					this.commodityTypeId = pick.id;
				}
				this.getComlist();
			},

			//判断价格
			formatter(value) {
				//价格
				if (value) {
					let pat = /(^[1-9]\d*.\d{1,2}$)|(^0.\d{1,2}$)|(^[1-9]\d*$)/;
					let val = pat.test(value);
					if (val) {
						return value;
					} else {
						this.$toast("请输入正确的价格(如:5.00)~");
						return "";
					}
				}
			},

		},
	};
</script>

<style lang="scss" scoped>
	.egg-content {
		width: 100%;
	}

	.top {
		display: flex;
		height: 44px;
		align-items: center;
		background: #fff;
		border-bottom: 1px solid #e5e5e5;
		line-height: 44px;
		position: sticky;
		padding: 0 2.5%;
		top: 0;
		z-index: 9999;

		.sides {
			color: #5241ff;
			font-size: 15px;
			height: 44px;
			width: 20%;
		}

		.right-side {
			text-align: right;
		}

		.title {
			width: 60%;
			font-size: 16px;
			text-align: center;
		}
	}

	//移动端的溢出滚动--默认
	.content {
		width: 100%;
	}

	.chooseItem {
		height: 50px;
		padding: 0 2.5%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-family: PingFangSC-Regular, PingFang SC;
		font-size: 14px;
		font-weight: 400;
		border-bottom: 1px solid #e5e5e5;

		.right {
			display: flex;

			.arrow {
				margin: 0 0 0 8px;
			}
		}

		.icon-style {
			@include center-flex();
		}

		.border {
			box-sizing: border-box;
			padding: 0 5px;
		}

		.rightBox {
			width: 158px;
			height: 33px;
			border-top: 1px solid #ddd;
			border-bottom: 1px solid #ddd;
			display: flex;
			align-items: center;

			.twoSide {
				width: 25%;
				height: 33px;
				border-left: 1px solid #ddd;
				border-right: 1px solid #ddd;
				text-align: center;
				line-height: 33px;
				font-size: 30px;
				font-weight: 330;
				color: rgb(175, 172, 172);
			}

			.centerCon {
				box-sizing: border-box;
				height: 33px;
				width: 50%;
				padding: 0 3px;
				display: flex;
				align-items: center;
			}

			input {
				border: 0;
				width: 100%;
				height: 24px;
				padding: 0;
				text-align: center;
			}
		}

		.disabledDevice {
			border: 0;
			display: flex;
			justify-content: flex-end;
		}

		.border {
			width: 158px;
			height: 33px;
			border: 1px solid #ddd;
		}

		.disable {
			pointer-events: none;
			color: rgb(255, 255, 255);
			background: #f5f5f5;
		}
	}

	.qs-content {
		width: 100%;
		font-family: PingFangSC-Regular, PingFang SC;

		.qs-top {
			display: flex;
			width: 100%;
			height: 44px;
			line-height: 44px;
			text-align: center;
			font-size: 16px;
			background: #f5f5f5;
			border-bottom: 1px solid #e5e5e5;

			.top-left {
				width: 10%;
				color: rgb(177, 175, 175);
				@include center-flex();
			}

			.qs-title {
				flex: 1;
			}
		}

		.title-qs-wrapper {
			display: flex;
			align-items: center;
			line-height: 50px;
			border-bottom: 1px solid #e5e5e5;

			.title-txt {
				flex: 1;
				text-align: center;
				color: #8c8c8c;
				box-sizing: border-box;
				font-size: 15px;
				font-weight: 700;
				border-bottom: 3px solid #ffffff;
			}

			.active-txt {
				color: #262626;
				border-bottom: 3px solid #262626;
			}
		}

		.qs-body {
			width: 100%;
			margin-bottom: 20px;
			padding: 20rpx;

			.desc {
				color: #8f8f8f;
				font-size: 12px;
				margin-bottom: 20px;
				text-align: center;
			}
		}
	}

	.repertory-wrapper {
		.sider-content {
			width: 17%;
			color: #5241ff;
		}

		.right-btn {
			pointer-events: none;
			color: rgb(177, 175, 175);
		}

		.alter-wrapper {
			display: flex;
			align-items: center;
			padding: 50px 30px;

			.title-style {
				display: flex;
				font-size: 16px;
				white-space: nowrap;
				padding-right: 20px;
			}

			.input-style {
				border: 1px solid #e6e6e6;
				line-height: 40px;
				height: 40px;
				border-radius: 2px;
				overflow: hidden;
				font-style: 15px;
				padding: 0 6px;
				width: 100%;
			}
		}
	}

	.u-cell {
		padding: 0;
		text-align: center !important;
	}
</style>
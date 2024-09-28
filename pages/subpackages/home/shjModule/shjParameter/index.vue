<template>
	<view>
		<xls-jy-navbar title="机台参数设置列表" bgColor="#f5f6f7"></xls-jy-navbar>
		<view class="setting">
			<view class="left">业务类型设置</view>
			<view class="right" @click="$refs.typeList.openBusiness(business.businessTypeId)">
				<view class="deviceName">{{ business.businessTypeName }}</view>
				<view class="arrow">
					<u-icon name="arrow-right" size="36" color="#bbb8b8" />
				</view>
			</view>
		</view>
		<!-- <view
        class="business"
        @click="
          $router.push({
            name: 'businType',
          })
        "
      >
        业务类型 >>
      </view> -->

		<view class="setting">
			<view class="left">自动退款</view>
			<view class="right">
				<u-switch v-model="automaticRefund" active-color="#5241FF" size="50" />
			</view>
		</view>

		<!-- <view class="setting">
      <view class="left">商品分类</view>
      <view class="right">
        <u-switch v-model="commodityClassification" active-color="#5241FF" />
      </view>
    </view> -->
		<!-- 出货顺序：顺序货道，随机货道 -->
		<view class="setting">
			<view class="left">随机货道</view>
			<view class="right">
				<u-switch v-model="shipmentSequence" active-color="#5241FF" size="50" />
			</view>
		</view>

		<!-- <view class="setting">
      <view class="left">饮料参数设置</view>
      <view class="right">
        <view class="arrow">
          <u-icon name="arrow" size="18px" color="rgb(187, 184, 184)" />
        </view>
      </view>
    </view> -->

		<view class="setting">
			<view class="left">商品多选<span class="cart">购物车模式</span></view>
			<view class="right">
				<u-switch v-model="shoppingCartMode" active-color="#5241FF" size="50" />
			</view>
		</view>

		<view class="item" v-show="shoppingCartMode">
			<view class="row-left">
				<span>商品购买上限</span>
				<span class="limit-tips">*商品购买上限为1-20个</span>
			</view>
			<view class="text-input">
				<input class="padding-r-3" placeholder="请输入购买上限, 购买上限为1-20" type="tel"
					v-model="business.purchaseCeiling" @blur="blurCeiling" />
			</view>
		</view>

		<p class="setLink" @click="paramsSetting">自定义参数设置</p>

		<view class="btn" @click="handleUpdata" v-hasPermi="['app:shj:params:edit']">
			保存
		</view>

		<shjbusinType ref="typeList" @itemclick="itemclick" />
	</view>
</template>

<script>
	import {
		shjController
	} from "@/api/index.js";
	import ShjbusinType from "./components/shjbusinType.vue";
	import storage from "@/plugins/storage";
	export default {
		name: "shjParameter",
		components: { ShjbusinType },
		data() {
			return {
				//自动退款开关
				automaticRefund: false,
				//购物车模式开关
				shoppingCartMode: false,
				commodityClassification: false,
				//出货顺序：顺序货道，随机货道
				shipmentSequence: false, //出货顺序 1：顺序货道 2：随机货道
				//业务类型信息
				business: {
					id: 0,
					businessTypeId: 0,
					businessTypeName: "请选择业务类型",
					automaticRefund: 0, //自动退款设置  1开 0关
					shoppingCartMode: 0, //购物车模式  1开0关
					purchaseCeiling: 10, //购买上限
					commodityClassification: 0, //商品分类 1开 0关
				},
				deviceNumber: null,
			};
		},
		onLoad(option) {
			if (option.params) {
				const {
					deviceNumber
				} = JSON.parse(option.params)
				storage.setSion("deviceNumber", deviceNumber);
				this.deviceNumber = storage.getSion("deviceNumber");
				this.getType();
			}
		},
		methods: {
			//查询设备业务类型
			async getType() {
				let deviceNumber = this.deviceNumber;
				let res = await shjController.businessOne({
					deviceNumber
				});
				if (res.code == 200) {
					this.business = res.data
					this.automaticRefund = this.business.automaticRefund == 1;
					this.shoppingCartMode = this.business.shoppingCartMode == 1;

					this.shipmentSequence = this.business.shipmentSequence == 2;
					this.commodityClassification =
						this.business.commodityClassification == 1;
				}
			},

			//修改设备设置
			async handleUpdata() {
				if (!this.business.businessTypeId) {
					return this.$toast("请选择业务类型");
				}
				this.business.automaticRefund = this.automaticRefund ? 1 : 0;
				this.business.shoppingCartMode = this.shoppingCartMode ? 1 : 0;
				this.business.shipmentSequence = this.shipmentSequence ? 2 : 1;
				this.business.commodityClassification = this.commodityClassification ?
					1 :
					0;
				let res = await shjController.updBusinessOne(this.business);
				if (res.code == 200) {
					this.$goBack();
					this.$toast("修改成功");
				}
			},

			//接收参数--更改业务类型
			itemclick(params) {
				this.business.businessTypeName = params.businessTypeName;
				this.business.businessTypeId = params.id;
			},

			//自定义设置
			async paramsSetting() {
				let parameter = storage.getSion("deviceLogin");
				if (parameter.onlineState) {
					if (!parameter.loginId) {
						return this.$modal("设备上报信息不全，请尝试断电重启设备！", {
							title: "温馨提示",
							confirmColor: "#5241FF",
							showCancel: false
						}).then(() => {})
					} else {
						this.$goTo("/pages/mainPackages/home/deviceModule/children/deviceParamSet")
					}
				} else {
					return this.$modal("设备处于离线状态无法设置，请确保设备在线", {
						title: "温馨提示",
						confirmColor: "#5241FF",
						showCancel: false
					}).then(() => {})
				}
			},

			blurCeiling() {
				if (this.business.purchaseCeiling * 1 < 1) {
					this.$toast("请输入范围在1~20的整数")
					this.business.purchaseCeiling = 1
				}
				if (this.business.purchaseCeiling * 1 > 20) {
					this.$toast("请输入范围在1~20的整数")
					this.business.purchaseCeiling = 20
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.setting {
		height: 50px;
		background: #fff;
		padding: 0 2.5%;
		display: flex;
		align-items: center;
		line-height: 50px;
		font-size: 16px;
		font-weight: 400;
		color: #000;
		margin-bottom: 10px;

		.right {
			flex: 1;
			display: flex;
			justify-content: flex-end;
			align-items: center;

			.deviceName {
				color: #5241ff;
			}

			.arrow {
				margin: 0 0 0 8px;
			}
		}

		.cart {
			font-size: 14px;
			color: #656565;
			padding-left: 10px;
		}
	}

	.item {
		padding: 10px 2.5% 15px 2.5%;
		background: #fff;
		position: relative;
		top: -10px;
		border-top: 1px solid #ddd;

		.row-left {
			padding-bottom: 10px;
			font-size: 16px;
			line-height: 22px;

			.limit-tips {
				color: #ff5353;
				font-size: 12px;
				padding-left: 5px;
			}
		}

		.text-input {
			background-color: #f4f4f4;
			width: 100%;
			height: 40px;
			display: flex;
			align-items: center;
			border-radius: 4px;

			.padding-r-3 {
				background-color: #f4f4f4;
				text-align: left;
				text-indent: 10px;
				width: 100%;
				font-size: 16px;
				font-weight: 400;
				border: 0;
				color: #000;
				box-sizing: border-box;
				padding-right: 30px;
			}
		}
	}

	.setLink {
		color: #5241ff;
		padding: 10px 15px 15px;
		font-family: PingFangSC;
		font-size: 15px;
		position: relative;
		text-align: right;
	}

	.btn {
		width: 95%;
		margin: 0 auto;
		height: 44px;
		border-radius: 6px;
		background: #5241ff;
		font-weight: 400;
		color: #fff;
		font-size: 16px;
		text-align: center;
		line-height: 44px;
	}

	.business {
		padding: 10px 2.5%;
		color: #5241ff;
		font-size: 13px;
		text-align: right;
		margin-top: 6px;
	}
</style>
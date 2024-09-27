<template>
	<view>
		<u-popup :show="showTypePopup" mode="bottom" @close="showTypePopup=false">
			<view class="show-type-title">
				<span class="btn" @click="showTypePopup = false">取消</span>
				<span class="center">请选择商品展示方式</span>
				<span class="btn basic-color" @click="setSet">确定</span>
			</view>
			<u-radio-group v-model="setMsg.displayMode" placement="column">
				<view class="item-style" v-for="(item, index) in operList" :key="index">
					<view class="text-wrapper">{{ item.title }}</view>
					<u-radio :name="item.id" activeColor="#5241FF" iconSize="32" size="38"></u-radio>
				</view>
			</u-radio-group>
			<view class="item-style">
				<view class="text-wrapper">展示商品详情</view>
				<u-switch v-model="detailSwitch" activeColor="#5241FF" size="50" />
			</view>
			<view class="tip">
				打开前请先在商品管理里添加商品详情哦！打开后C端购物页点击商品将会显示详情信息。
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		shjController
	} from "@/api/index.js";
	export default {
		name: "showTypePopup",
		data() {
			return {
				showTypePopup: false,
				operList: [{
						id: 1,
						title: "按商品排序展示"
					},
					{
						id: 2,
						title: "按货道顺序同类商品合并展示"
					},
					{
						id: 3,
						title: "按货道顺序展示商品(同类商品不合并)"
					},
				],
				detailSwitch: false,
				setMsg: {
					deviceNumber: "",
					displayMode: 0,
					detailSwitch: 0 //1 0
				},
			};
		},
		methods: {
			//查询
			async getSet(deviceNumber) {
				let res = await shjController.salesAirportDevice({
					deviceNumber
				});
				if (res.code == 200) {
					this.setMsg.displayMode = res.data.displayMode ? res.data.displayMode : 0;
					this.detailSwitch = res.data.detailSwitch == 1;
					this.$parent.showTypeText = this.setMsg.displayMode ?
						this.operList[this.setMsg.displayMode - 1].title : '未设置';
				}
			},
			//设置
			async setSet() {
				if (!this.setMsg.displayMode) {
					return this.$toast('请您先选择展示方式~');
				}
				this.setMsg.deviceNumber = this.$parent.deviceNumber;
				this.setMsg.detailSwitch = this.detailSwitch ? 1 : 0;
				let res = await shjController.setDisplayMode(this.setMsg);
				if (res.code == 200) {
					this.$toast('设置成功~')
					this.$parent.showTypeText =
						this.operList[this.setMsg.displayMode - 1].title;
					this.showTypePopup = false;
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.show-type-title {
		width: 100%;
		line-height: 45px;
		display: flex;
		align-items: center;
		font-size: 17px;

		.center {
			flex: 1;
			text-align: center;
		}

		.btn {
			padding: 0 12px;
		}
	}

	.basic-color {
		color: #5241FF;
	}

	.item-style {
		align-items: center;
		border-top: 1px solid #e5e5e5;
		display: flex;
		padding: 15px 10px;
		font-size: 15px;

		.text-wrapper {
			flex: 1;
		}
	}

	.tip {
		color: #8f8f94;
		font-size: 14px;
		padding: 0 10px 80px;
	}
</style>
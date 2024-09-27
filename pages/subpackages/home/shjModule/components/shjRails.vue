<template>
	<!-- 设备货道 -->
	<u-popup :show="railCheck" mode="bottom" @close="cancel">
		<view class="edit-cargoroad flex-wrapper">
			<view class="popup-header">
				<span @click="cancel">取消</span>
				<span class="popup-title">货道选择</span>
				<span @click="specialRail">确定</span>
			</view>
			<xls-search @confirm="stratesSearch" placeholder="请输入货道号"></xls-search>
			<view class="all-checkbox-box">
				<view class="left-style">
					<u-checkbox-group v-model="allCheckGroup" @change="allGroupChange">
						<u-checkbox name="1" activeColor="#5241FF" shape="circle" iconSize="32" labelSize="36"
							size="38"></u-checkbox>
					</u-checkbox-group>
					<span>全选</span>
				</view>
				<view>
					设备号： {{allRailList.length?allRailList[0].deviceNumber:""}}
				</view>
			</view>
			<u-checkbox-group v-model="checkboxGroup" class="rail-wrapper" v-if="railList.length">
				<view class="item-style-wrapper" v-for="(item, index) in railList" :key="index">
					<view class="item-style">
						<xls-image :src="item.commodityImg" alt="" v-if="item.commodityImg" class="image" />
						<xls-image :src="`${$baseUrl}appV4/image/other/ztwl.png`" alt="" v-else class="image" />
						<view>{{ item.railNumber }}</view>
						<view class="value text-over">{{ item.commodityName || "未设置" }}</view>
						<view class="handle-list">
							<u-checkbox :name="item.id" activeColor="#5241FF" shape="circle" iconSize="32"
								labelSize="36" size="38"></u-checkbox>
						</view>
					</view>
				</view>
				<xls-bottom></xls-bottom>
			</u-checkbox-group>
			<xls-empty v-if="!railList.length" />
		</view>
	</u-popup>
</template>

<script>
	import local from "@/plugins/storage";
	export default {
		name: "shjRails",
		emits: ['setRailEdit'],
		data() {
			return {
				//货道
				allRailList: [],
				railList: [],
				railCheck: false,
				allCheck: false,
				allCheckGroup: [],
				checkboxGroup: [],
			};
		},
		methods: {
			openRailModule() {
				this.railList = local.getSion("shjRailList") || [];
				this.allRailList = local.getSion("shjRailList") || [];
				this.checkboxGroup = [];
				this.allCheck = false;
				this.railCheck = true;
			},
			stratesSearch(value) {
				if (!value) {
					return this.railList = this.allRailList;
				}
				this.railList = this.allRailList.filter((item) => {
					return item.railNumber.indexOf(value) > -1;
				});
			},
			specialRail() {
				if (!this.checkboxGroup.length) {
					return this.$toast("请您至少选择一条货道~");
				}
				this.$emit("getShjRail", this.checkboxGroup);
				this.railCheck = false;
			},
			allGroupChange(item) {
				if (item.length) {
					this.checkboxGroup = this.railList.map(item => item.id)
				} else {
					this.checkboxGroup = [];
				}
			},
			cancel() {
				this.$emit('setRailEdit', true)
				this.railCheck = false
			}
		},
	};
</script>

<style lang="scss" scoped>
	.edit-cargoroad {
		background: #fff;
		width: 100%;

		.popup-header {
			align-items: center;
			background: #f4f5f7;
			color: #5241FF;
			display: flex;
			font-size: 16px;
			height: 45px;
			justify-content: space-between;
			padding: 0 10px;

			.popup-title {
				color: #000;
			}
		}
	}

	.flex-wrapper {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		font-size: 14px;

		.all-checkbox-box {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 12px 5px;

			.left-style {
				display: flex;
				align-items: center;

				span {
					margin-left: 10px;
				}
			}
		}

		.rail-wrapper {
			flex: 1;
			overflow-y: scroll;
			background: #f5f6f7;
			display: flex;
			flex-wrap: wrap;
			align-items: flex-start;
			padding: 5px 12px;

			.item-style-wrapper {
				width: 32%;
				margin-right: 1.3%;
				background: #fff;
				border-radius: 6px;
				margin-bottom: 10px;
				padding: 5px;
				box-sizing: border-box;
				position: relative;
			}

			.item-style {
				width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				.image {
					width: 50px;
					height: 50px;
					margin-bottom: 5px;
				}

				.value {
					max-width: 95%;
					font-size: 12px;
					color: #999;
				}

				.handle-list {
					position: absolute;
					top: 6px;
					right: 0px;
				}
			}
		}
	}
</style>
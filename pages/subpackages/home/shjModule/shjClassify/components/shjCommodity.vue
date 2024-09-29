<template>
	<u-popup :show="shjCommodity" mode="bottom" @close="() => {
		shjCommodity = false
	}">
		<view class="commodity-list">
			<view class="title-top-wrapper">
				<view class="left-back" @click="shjCommodity = false">返回</view>
				<view class="center-tit">选择商品</view>
				<view class="right-count" @click="pickerSpecial">确定</view>
			</view>

			<view class="all-style">
				<span class="text">全选</span>
				<u-checkbox-group v-model="allCheckGroup" @change="allGroupChange">
					<u-checkbox name="1" activeColor="#5241FF" shape="circle" iconSize="32" labelSize="36"
						size="38"></u-checkbox>
				</u-checkbox-group>
			</view>

			<view class="commodity-list-wrapper" v-if="commodityList.length">
				<u-checkbox-group v-model="checkboxGroup">
					<view class="commodity-wrapper">
						<view class="list-item" v-for="(item, index) in commodityList" :key="index">
							<view class="image-wrapper">
								<image :src="item.commodityImg" alt="" v-if="item.commodityImg" class="image" />
								<image :src="`${$baseUrl}appV4/image/other/ztwl.png`" alt="" v-else class="image" />
								<u-checkbox :name="item.commodityId" activeColor="#5241FF" shape="circle" iconSize="32"
									labelSize="36" size="38" class="checkbox"></u-checkbox>
							</view>
							<view class="name text-over">{{ item.commodityName }}</view>
						</view>
					</view>
				</u-checkbox-group>
			</view>
			
			<xls-empty v-else />
		</view>
	</u-popup>
</template>

<script>
	import {
		shjController
	} from '@/api/index.js';
	export default {
		name: "shjCommodity",
		props: {
			deviceNumber: {
				type: [String, Number],
				default: ''
			}
		},
		data() {
			return {
				shjCommodity: false,
				commodityList: [],
				searchValue: "",
				checkboxGroup: [],
				allCheckGroup: [],
			};
		},
		mounted() {
			this.getCommodity();
		},
		methods: {
			allGroupChange(item) {
				if (item.length) {
					this.checkboxGroup = this.commodityList.map(item => item.commodityId)
				} else {
					this.checkboxGroup = []
				}
			},
			async getCommodity() {
				let deviceNumber = this.deviceNumber
				let res = await shjController.railCommodity({
					deviceNumber
				})
				if (res.code == 200) {
					this.commodityList = res.data
				}
			},
			showCommodity(list) {
				this.checkboxGroup = list
				this.allCheckGroup = []
				this.shjCommodity = true
			},
			pickerSpecial() {
				this.$emit("getShjCommodity", this.checkboxGroup)
				this.shjCommodity = false
			},
		},
	};
</script>

<style lang="scss" scoped>
	.commodity-list {
		width: 100%;
		height: 1000rpx;
		height: 60vh;
		display: flex;
		flex-direction: column;

		.title-top-wrapper {
			padding: 0 12px;
			height: 45px;
			border-bottom: 1px solid #e6e6e6;
			font-weight: 400;
			font-size: 16px;
			color: #5241ff;
			display: flex;
			align-items: center;

			.left-back {
				width: 25%;
				color: #262626;
			}

			.center-tit {
				width: 50%;
				text-align: center;
			}

			.right-count {
				width: 25%;
				text-align: right;
			}
		}

		.all-style {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			line-height: 30px;
			padding: 0 12px;
			margin-bottom: 5px;
			font-size: 15px;

			.text {
				margin-right: 10px;
			}
		}

		.commodity-list-wrapper {
			flex: 1;
			overflow-y: scroll;
			background: #f5f6f7;

			.commodity-wrapper {
				display: flex;
				width: 100%;
				align-items: center;
				flex-wrap: wrap;
			}

			.list-item {
				width: 31%;
				background: #fff;
				border-radius: 6px;
				padding: 5px 0;
				font-size: 14px;
				text-align: center;
				margin: 5px 0;
				margin-left: 2%;

				.image-wrapper {
					position: relative;

					.image {
						width: 76px;
						height: 76px;
					}
				}

				.checkbox {
					position: absolute;
					bottom: 5px;
					right: 12px;
					background: #fff;
					border-radius: 50%;
				}



				.name {
					margin-top: 10px;
				}
			}
		}

		.add-btn-style {
			padding: 5px 20px;
			border-radius: 6px;
			font-size: 14px;
			color: #fff;
			background: #544df2;
			margin: 20px auto;
		}
	}
</style>
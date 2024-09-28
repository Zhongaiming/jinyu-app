<template>
	<view class="batchCopy-wrapper">
		<xls-jy-navbar title="批量设备选择" bgColor="#f5f6f7"></xls-jy-navbar>
		<view class="batchCopy-content">
			<!-- 选择 -->
			<view class="module-title">设备复制内容:</view>
			<view class="params-selector">
				<view class="checked">
					<span class="u-checkbox__label">1、货道容量</span>
					<span class="u-checkbox__label">2、货道启用禁用状态</span>
				</view>
				<view class="checked">
					<span class="u-checkbox__label">3、货道商品信息（商品图片，名称，售卖价格，库存）</span>
				</view>
				<view class="checked">
					<span class="u-checkbox__label">4、商品详情启用禁用状态</span>
				</view>
			</view>
			<!-- 设备选择 -->
			<view class="module-title">
				设备选择
				<span class="text" v-show="checkboxGroup.length">已选（{{ checkboxGroup.length }}）个</span>
			</view>
			<view class="equipment-selector">
				<!-- 左 - 场地 -->
				<view class="group-wrapper-left">
					<view class="group-item" :class="{'active':placeId == place.id}" v-for="(place, index) in placeList"
						:key="index" @click="changePlaceId(place.id)">
						{{ place.placeName }}
					</view>
				</view>
				<!-- 右 - 设备 -->
				<view class="equip-wrapper-right">
					<view class="allCheck">
						<u-checkbox-group v-model="allCheckGroup" @change="allChange">
							<u-checkbox name="1" activeColor="#5241FF" shape="circle" iconSize="32" labelSize="36"
								size="38"></u-checkbox>
						</u-checkbox-group>
						<span class="text">全选</span>
					</view>
					<view class="item-list">
						<u-checkbox-group v-model="checkboxGroup">
							<view class="allCheck" v-for="(device, index) in shjList" :key="index">
								<u-checkbox :name="device.deviceNumber" activeColor="#5241FF" shape="circle"
									iconSize="32" labelSize="36" size="38"></u-checkbox>
								<span class="text">{{device.typeName}}{{device.deviceNumber}}</span>
							</view>
						</u-checkbox-group>
					</view>
				</view>
			</view>
			<view class="bottom-button" :class="{'disabled':!checkboxGroup.length}" @click="confirmMethed">
				批量复制
			</view>
		</view>
	</view>
</template>

<script>
	import {
		shjController,
		placeController,
		deviceController
	} from '@/api/index.js';
	export default {
		name: "batchCopy",
		data() {
			return {
				placeList: [],
				placeId: 0,
				shjList: [],
				allCheckGroup: [],
				checkboxGroup: [],
				deviceNumber: ''
			};
		},
		onLoad(option) {
			if (option.params) {
				const {
					deviceNumber,
					placeId
				} = JSON.parse(option.params)
				this.deviceNumber = deviceNumber
				this.getPlace(placeId)
			}
		},
		methods: {
			async getPlace(placeId) {
				let res = await placeController.getPlaceListByDeviceType({
					deviceType: 4
				});
				if (res.code == 200) {
					this.placeList = res.data.filter((place) => {
						return place.id != placeId
					})
					this.placeId = this.placeList.length ? this.placeList[0].id : 0
					this.getDevice()
				}
			},
			async getDevice() {
				let res = await deviceController.getList({
					page: 1,
					size: 10000,
					placeId: this.placeId,
					deviceType: 4,
					search: "",
					onlineState: "",
				})
				if (res.code == 200) {
					this.shjList = res.data.List[0].deviceList
				}
			},
			//更换场地
			changePlaceId(id) {
				this.placeId = id
				this.getDevice()
			},
			//全选
			allChange(item) {
				if (item.length) {
					this.shjList.forEach((shj) => {
						if (!this.checkboxGroup.includes(shj.deviceNumber)) {
							this.checkboxGroup.push(shj.deviceNumber)
						}
					})
				} else {
					this.shjList.forEach((shj) => {
						this.checkboxGroup = this.checkboxGroup.filter((deviceNumber) => {
							return deviceNumber != shj.deviceNumber
						})
					})
				}
			},
			//确定
			async confirmMethed() {
				this.$modal("您确定要复制到当前选择设备吗？", {
					title: "温馨提示",
				})
				.then(() => {
					let deviceNumber = this.deviceNumber
					shjController.batchReplication({
						deviceNumber: deviceNumber,
						numberList: this.checkboxGroup
					}).then((res) => {
						if (res.code == 200) {
							this.$toast("复制成功~")
							this.$goBack()
						}
					})
				}).catch(() => {})
			},
		},
	};
</script>

<style lang="scss" scoped>
	.batchCopy-content {
		.module-title {
			font-size: 15px;
			line-height: 20px;
			padding: 10px;
			
			.text {
				margin-left: 12px;
			}
		}

		.params-selector {
			background: #fff;
			padding: 10px;
			font-size: 14px;

			.checked {
				width: 100%;
				height: 40px;
				line-height: 40px;
				display: flex;
				align-items: center;

				.u-checkbox__label {
					white-space: nowrap;
				}
			}
		}

		.equipment-selector {
			width: 100%;
			overflow: scroll;
			font-size: 14px;
			font-family: PingFangSC-Regular;
			display: flex;

			.group-wrapper-left {
				width: 38%;
				overflow-y: scroll;
				height: 52vh;

				.group-item {
					border-bottom: 1px solid #e5e5e5;
					height: 45px;
					line-height: 45px;
					overflow: hidden;
					padding: 0 5px;
					text-align: center;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.active {
					background: #fff;
				}
			}

			.equip-wrapper-right {
				width: 62%;
				background: #fff;

				.item-list {
					height: 45.27vh;
					width: 100%;
					overflow-y: scroll;
				}

				.allCheck {
					height: 45px;
					padding: 0 10px;
					display: flex;
					align-items: center;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;

					.text {
						margin-left: 8px;
					}
				}
			}
		}

		.bottom-button {
			align-items: center;
			bottom: 0;
			color: #fff;
			display: flex;
			height: 50px;
			justify-content: center;
			position: fixed;
			width: 100%;
			font-family: PingFangSC-Regular;
			font-size: 14px;
			background: #5241ff;
		}

		.disabled {
			background-color: #999;
			pointer-events: none;
		}
	}
</style>
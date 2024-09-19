<template>
	<view class="batchCopy-wrapper">
		<top-nav>批量设备选择</top-nav>
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
				<!-- <u-checkbox-group v-model="checkboxGroup" direction="horizontal">
          <view class="checked">
            <u-checkbox name="1" shape="square" checked-color="#5241FF"
              ><span class="u-checkbox__label">货道容量</span></u-checkbox
            >
            <u-checkbox name="2" shape="square" checked-color="#5241FF"
              ><span class="u-checkbox__label"
                >货道启用禁用状态</span
              ></u-checkbox
            >
          </view>
          <view class="checked">
            <u-checkbox name="3" shape="square" checked-color="#5241FF"
              ><span class="u-checkbox__label"
                >货道商品信息（商品图片，名称，售卖价格，库存）</span
              ></u-checkbox
            >
          </view>
          <view class="checked">
            <u-checkbox name="4" shape="square" checked-color="#5241FF"
              ><span class="u-checkbox__label"
                >商品详情启用禁用状态</span
              ></u-checkbox
            >
          </view>
        </u-checkbox-group> -->
			</view>
			<!-- 设备选择 -->
			<view class="module-title">
				设备选择
				<span v-show="checkboxGroup.length">已选（{{ checkboxGroup.length }}）个</span>
			</view>
			<view class="equipment-selector">
				<!-- 左 - 场地 -->
				<view class="group-wrapper-left">
					<view class="group-item" :class="placeId == place.id ? 'active' : ''"
						v-for="(place, index) in placeList" :key="index" @click="changePlaceId(place.id)">
						{{ place.placeName }}
					</view>
				</view>
				<!-- 右 - 设备 -->
				<view class="equip-wrapper-right">
					<view class="allCheck">
						<u-checkbox v-model="allCheck" checked-color="#5241FF" @click="allChange"></u-checkbox><span
							class="text">全选</span>
					</view>
					<view class="item-list">
						<u-checkbox-group v-model="checkboxGroup" direction="horizontal">
							<view class="allCheck" v-for="(device, index) in shjList" :key="index">
								<u-checkbox :name="device.deviceNumber" checked-color="#5241FF"></u-checkbox>
								<span class="text">售货机{{ device.deviceNumber }}</span>
							</view>
						</u-checkbox-group>
					</view>
				</view>
			</view>
			<view class="bottom-button" :class="!checkboxGroup.length ? 'disabled' : ''" @click="confirmMethed">
				批量复制
			</view>
		</view>
	</view>
</template>

<script>
	import {
		shjController
	} from '@/api/index.js';
	// import {
	// 	deviceList
	// } from "@/utils/api/device";
	export default {
		name: "batchCopy",
		data() {
			return {
				placeList: [],
				placeId: 0,
				shjList: [],
				allCheck: false,
				checkboxGroup: [],
			};
		},
		created() {
			this.getPlace();
		},
		methods: {
			async getPlace() {
				let res = await api.salesAirport({
					deviceType: 4
				});
				if (res.data.code == 0) {
					let placeId = this.$route.query.placeId;
					this.placeList = res.data.data.filter((place) => {
						return place.id != placeId;
					});
					this.placeId = this.placeList.length ? this.placeList[0].id : 0;
					this.getDevice();
				}
			},
			async getDevice() {
				let res = await deviceList({
					page: 1,
					size: 10000,
					placeId: this.placeId,
					deviceType: 4,
					search: "",
					onlineState: "",
				});
				if (res.data.code == 0) {
					this.shjList = [];
					res.data.data.List.map((device) => {
						this.shjList = [...this.shjList, ...device.deviceList];
					});
				}
			},
			//更换场地
			changePlaceId(id) {
				this.placeId = id;
				this.allCheck = false;
				this.getDevice();
			},
			//全选
			allChange() {
				if (this.allCheck) {
					this.shjList.map((shj) => {
						if (!this.checkboxGroup.includes(shj.deviceNumber)) {
							this.checkboxGroup.push(shj.deviceNumber);
						}
					});
				} else {
					this.shjList.map((shj) => {
						this.checkboxGroup = this.checkboxGroup.filter((deviceNumber) => {
							return deviceNumber != shj.deviceNumber;
						});
					});
				}
			},
			//确定
			async confirmMethed() {
				this.$dialog
					.confirm({
						title: "温馨提示",
						message: "您确定要复制到当前选择设备吗？",
						confirmButtonColor: "#5241FF",
						width: 280
					})
					.then(() => {
						let deviceNumber = this.$route.query.deviceNumber;
						api
							.shjBatchReplication({
								deviceNumber: deviceNumber,
								numberList: this.checkboxGroup,
							})
							.then((res) => {
								if (res.data.code == 0) {
									this.$router.back();
									this.$toast.success("复制成功~");
								}
							});
					})
					.catch(() => {});
			},
		},
	};
</script>

<style lang="less" scoped>
	.batchCopy-wrapper {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 999;
		background: #f5f6f7;
	}

	.batchCopy-content {
		.module-title {
			font-size: 15px;
			line-height: 20px;
			padding: 10px;
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
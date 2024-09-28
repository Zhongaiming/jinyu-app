<template>
	<view>
		<!-- 操作详情 -->
		<u-popup :show="placePopup" mode="bottom" @close="() => {
			placePopup = !placePopup
		}">
			<view id="place-popup">
				<view class="top-wrapper">
					<view class="cancel" @click="placePopup = !placePopup">返回</view>
					<view class="name">场地详情</view>
					<view class="sure"></view>
				</view>
				<view class="header-wrapper">
					<view class="left">
						<view class="group-name">{{ placeFather.placeName }}</view>
						<view class="device-count">
							共{{ placeFather.deviceNum }}台, 离线{{placeFather.offlineNum}}台
						</view>
					</view>
					<view class="right" @click="editPlace">
						<view class="edit-adress">编辑场地</view>
					</view>
				</view>
				<view class="main-content" :style="{'padding-bottom':optionList.length<6?'50px':''}">
					<view class="fun-list right-border" v-for="(item, index) in optionList" :key="index"
						@click="operItem(item.id)">
						<view class="bicon-new">
							<u-icon :name="item.icon" size="50" color="#5241ff" />
						</view>
						<view class="name">{{item.title}}</view>
					</view>
				</view>
			</view>
		</u-popup>

		<!-- 选择设备 -->
		<u-popup :show="devicePopup" mode="bottom" @close="()=>{
			(placePopup = !placePopup), (devicePopup = !devicePopup)
		}">
			<view class="device-wrapper">
				<view class="top-wrapper">
					<view class="cancel" @click="(placePopup = !placePopup), (devicePopup = !devicePopup)">取消</view>
					<view class="name"></view>
					<view class="sure cancel" :class="{'disable':!checkboxGroup.length}" @click="confrimBtn">
						{{ operTypeName }}
					</view>
				</view>
				<view class="main-content-device">
					<view v-for="(item, index) in deviceList" :key="index"
						v-show="operTypeName === '单价设置' ? item.typeName === '娃娃机' : true">
						<view class="mint-checklist-title flex-between">
							<span>{{ item.typeName }}</span>
							<u-checkbox-group v-model="item.allCheck" @change="allOrNull(index, item)">
								<u-checkbox :name="`item${index}`" activeColor="#5241FF" shape="circle" iconSize="32"
									labelSize="36" size="38"></u-checkbox>
							</u-checkbox-group>
						</view>
						<u-checkbox-group v-model="item.checkboxGroup" placement="column"
							@change="deviceItemPicker(item, index)">
							<view v-for="(dev, index) in item.device" :key="index" class="device flex-between">
								<span>{{ dev.typeName }}-{{ dev.deviceNumber }}</span>
								<u-checkbox :name="dev.deviceNumber" activeColor="#5241FF" shape="circle" iconSize="32"
									labelSize="36" size="38"></u-checkbox>
							</view>
						</u-checkbox-group>
					</view>
				</view>
			</view>
		</u-popup>

		<!-- 批量设置单价 -->
		<u-popup :show="unitPrice" round="20" mode="center" @close="() => {
			(unitPrice = !unitPrice), (devicePopup = !devicePopup)
		}">
			<view class="unitPrice">
				<view class="top-title">批量设置单价</view>
				<view class="info">
					<view class="set-price-modal">
						<input placeholder="请输入" oninput="this.value=this.value.replace(/[^0-9]+/,'')" maxlength="4"
							class="input" v-model="currency" />
						<span class="unit">币/次</span>
					</view>
				</view>
				<view class="bottom-btn">
					<view class="unit-cancel" @click="(unitPrice = !unitPrice), (devicePopup = !devicePopup)">
						取消
					</view>
					<view class="unit-confirm" @click="eidtPrice">确定</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import storage from "@/plugins/storage";
	import {
		deviceController
	} from "@/api/index.js"

	export default {
		name: "placePopup",
		data() {
			return {
				placePopup: false,
				optionList: [{
						id: 1,
						title: "场地收益",
						icon: "rmb-circle"
					},
					{
						id: 3,
						title: "设备单价设置",
						icon: "red-packet"
					},
					{
						id: 4,
						title: "批量解绑",
						icon: "hourglass"
					},
				],
				placeFather: {},
				devicePopup: false,
				deviceList: [],
				checkboxGroup: [],
				operTypeName: "批量解绑",
				//wwj
				unitPrice: false,
				currency: "",
			};
		},
		methods: {
			callPlace(params) {
				this.placeFather = params
				let hasWWj = false
				this.deviceTypeList = []
				if (
					this.placeFather.deviceList != undefined &&
					this.placeFather.deviceList != null &&
					this.placeFather.deviceList.length
				) {
					this.placeFather.deviceList.forEach((element) => {
						if (element.typeName == "娃娃机") {
							hasWWj = true
						}
					})
				}
				if (!hasWWj) {
					this.optionList = this.optionList.filter((element) => {
						return element.id != 3
					});
				} else {
					this.optionList = [{
							id: 1,
							title: "场地收益",
							icon: "rmb-circle"
						},
						{
							id: 3,
							title: "设备单价设置",
							icon: "red-packet"
						},
						{
							id: 4,
							title: "批量解绑",
							icon: "hourglass"
						},
					]
				}
				this.placePopup = !this.placePopup
				this.disposeDevice()
			},
			//处理设备
			disposeDevice() {
				let list = this.placeFather.deviceList
				let data = {}
				for (var i = 0, length = list.length; i < length; i++) {
					if (!data[list[i].typeName]) {
						var arr = []
						arr.push(list[i])
						data[list[i].typeName] = arr
					} else {
						data[list[i].typeName].push(list[i])
					}
					if (list.length == i + 1) {
						this.deviceList = []
						const keys = Object.keys(data)
						for (let a = 0; a < keys.length; a++) {
							const key = keys[a]
							const value = data[key]
							let obj = {
								typeName: key,
								device: value,
								allCheck: [],
								checkboxGroup: [],
							};
							this.deviceList.push(obj)
						}
					}
				}
			},
			//编辑场地
			editPlace() {
				if (!this.placeFather.placeId) return
				let placeId = this.placeFather.placeId
				storage.setSion("placeId", placeId)
				this.$goTo('/pages/mainPackages/personal/placeModule/placeOperate', 'navigateTo', {
					placeId
				})
			},
			operItem(itemId) {
				if (itemId == 1) {
					let place = JSON.stringify({
						placeId: this.placeFather.placeId,
						placeName: this.placeFather.placeName,
					})
					let placeId = this.placeFather.placeId
					storage.setSion("placeId", placeId)
					this.$goTo('/pages/mainPackages/home/operateModule/index', 'navigateTo', {
						placeId: this.placeFather.placeId,
						placeName: this.placeFather.placeName
					})

				} else {
					this.placePopup = false
					this.devicePopup = true
					if (itemId == 3) {
						this.operTypeName = "单价设置"
					} else if (itemId === 4) {
						this.operTypeName = "批量解绑"
					}
				}
			},
			allOrNull(index, item) {
				if (item.allCheck.length) {
					item.checkboxGroup = []
				} else {
					item.checkboxGroup = item.device.map(dev => dev.deviceNumber)
				}
				this.pickerChange()
			},
			deviceItemPicker(item, index) {
				setTimeout(() => {
					if (item.checkboxGroup.length === item.device.length) {
						this.$set(item, 'allCheck', [`item${index}`])
					} else {
						item.allCheck = []
					}
					this.pickerChange()
				}, 200)
			},
			pickerChange() {
				this.checkboxGroup = this.deviceList.reduce((last, device) => {
					return [...last, ...device.checkboxGroup]
				}, [])
			},
			confrimBtn() {
				if (!this.checkboxGroup.length) {
					return this.$toast("您还没有选择需要操作的设备~")
				}
				this.devicePopup = false
				this.placePopup = false
				if (this.operTypeName == "单价设置") {
					this.unitPrice = true
				} else if (this.operTypeName == "批量解绑") {
					this.$emit('editBind', String(this.checkboxGroup))
				}
			},
			eidtPrice() {
				if (!this.currency) {
					return this.$toast("您还没有输入单价~");
				}
				deviceController.editCurrency({
					deviceNumber: String(this.checkboxGroup),
					currency: this.currency,
					price: '',
				}).then((res) => {
					if (res.code == 200) {
						this.unitPrice = false
						this.devicePopup = true
						this.$toast("修改成功")
						this.currency = ""
					}
				}).catch(() => {})
			},
		},
	};
</script>

<style lang="scss" scoped>
	.top-wrapper {
		align-items: center;
		border-bottom: 1px solid #e6e6e6;
		display: flex;
		height: 48px;
		padding: 0 2.5%;
		box-sizing: border-box;
		font-size: 16px;

		.cancel {
			color: #5241ff;
			flex: 1;
		}

		.name {
			color: #262626;
			flex: 3;
			font-weight: 500;
			text-align: center;
		}

		.sure {
			flex: 1;
			text-align: right;
		}

		.disable {
			pointer-events: none;
			opacity: 0.5;
		}
	}

	.header-wrapper {
		align-items: center;
		display: flex;
		height: 80px;
		padding: 0 2.5%;
		font-size: 14px;
		background: #efeff4;

		.left {
			flex: 1;

			.group-name {
				color: #1a1a1a;
				font-size: 16px;
				font-weight: 400;
			}

			.device-count {
				color: #8c8c8c;
			}
		}

		.right {
			color: #5241ff;
		}
	}

	.main-content {
		border-top: 1px solid #e6e6e6;
		display: flex;
		flex-wrap: wrap;
		max-height: 350px;
		overflow-y: scroll;
		touch-action: pan-y;
		width: 100%;

		.fun-list {
			align-items: center;
			border-bottom: 1px solid #e6e6e6;
			display: flex;
			flex-direction: column;
			height: 95px;
			justify-content: center;
			padding: 20px 0;
			text-align: center;
			width: 33.33333333%;
			box-sizing: border-box;

			.bicon-new {
				color: #5241ff;
			}

			.name {
				color: #4d4d4d;
				font-size: 14px;
				margin-top: 5px;
			}
		}

		.right-border {
			border-right: 1px solid #e6e6e6;
		}
	}

	.main-content-device {
		max-height: 350px;
		overflow-y: scroll;
		padding: 12px 0;

		.mint-checklist-title {
			padding: 0 12px;
			color: #8c8c8c;
			font-size: 14px;
			line-height: 36px;
			background: #f7f8fa;
		}

		.device {
			line-height: 48px;
			padding: 0 12px;
			font-size: 16px;
		}

		.flex-between {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
	}

	.unitPrice {
		width: 270px;
		background: #fff;
		overflow: hidden;

		.top-title {
			color: #262626;
			font-size: 19px;
			font-weight: 700;
			margin-top: 20px;
			text-align: center;
		}

		.info {
			padding: 16px 20px 20px;

			.set-price-modal {
				border: 1px solid #d9d9d9;
				border-radius: 4px;
				height: 44px;
				margin: auto;
				width: 150px;
				line-height: 44px;
				text-align: right;
				display: flex;

				.input {
					color: #262626;
					font-size: 16px;
					line-height: 44px;
					height: 44px;
					margin: 0;
					border: 0;
					text-align: center;
					width: 80px;
					flex: 1;
				}

				.unit {
					color: #262626;
					font-size: 16px;
					padding-right: 6px;
				}
			}
		}

		.bottom-btn {
			height: 50px;
			width: 100%;
			border-top: 1px solid #e6e6e6;
			box-sizing: border-box;
			font-size: 16px;
			text-align: center;
			line-height: 50px;
			display: flex;

			.unit-cancel {
				width: 50%;
				box-sizing: border-box;
				border-right: 1px solid #e6e6e6;
			}

			.unit-confirm {
				width: 50%;
				color: #5241ff;
			}
		}
	}
</style>
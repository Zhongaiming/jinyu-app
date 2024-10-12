<template>
	<!-- 场地-单选 -->
	<u-popup :show="placePopup" mode="bottom" @close="() => {
		placePopup = !placePopup
	}">
		<view class="xls-place-list">
			<view class="place-title">
				<view class="left-back" @click="placePopup = !placePopup">返回</view>
				<view class="center-tit">选择场地</view>
				<view class="right-count" v-if="showRight">{{ placeTotal }}个</view>
			</view>
			<xls-search placeholder="请输入场地名称" marLeft="-5.5em" @confirm="searchMethod"></xls-search>
			<view class="place-wrapper" v-if="dataList.length">
				<view class="place-item" @click="pickerPlace(-1)" v-if="showAllCheck">
					<view class="place-main">
						<span :style="{color:placeActive==-1?'#5241FF':''} ">全部场地</span>
					</view>
				</view>
				<view class="place-item" v-for="(place, index) in dataList" :key="index" @click="pickerPlace(place)"
					v-show="searchShow(place)">
					<view class="place-main">
						<span
							:style="{ color: placeActive == place.placeId||placeActive == place.id ? '#5241FF': '' } ">
							{{index+1}}_{{place.placeNumber}}{{ place.placeName }}
						</span>
						<span class="device-num" v-if="showDeviceNum">{{ place.deviceNum }}台</span>
					</view>
				</view>
				<xls-bottom></xls-bottom>
			</view>
			<xls-empty v-else></xls-empty>
		</view>
	</u-popup>
</template>
<script>
	import {
		placeController
	} from "@/api/index.js";

	export default {
		props: {
			showAllCheck: {
				type: Boolean,
				default: false,
			},
			showDeviceNum: {
				type: Boolean,
				default: false,
			},
			showRight: {
				type: Boolean,
				default: false,
			},
			defaultPicker: {
				type: Boolean,
				default: false,
			},
			deviceType: {
				type: [String, Number],
				default: ''
			}
		},
		data() {
			return {
				placePopup: false,
				dataList: [],
				placeActive: -1,
				searchValue: "",
				placeTotal: 0,
			};
		},
		async created() {
			this.getList()
		},
		methods: {
			async getList() {
				if (this.deviceType) {
					placeController.getPlaceListByDeviceType({
						deviceType: this.deviceType
					}).then(res => {
						if (res.code == 200) {
							this.dataList = res.data;
							if (this.defaultPicker) {
								const defaultPlace = this.dataList.length ? this.dataList[0] : {};
								this.$emit("getPlaceId", defaultPlace);
							}
						}
					}).catch(err => {})
				} else {
					placeController.getPlaceDeviceList().then(res => {
						if (res.code == 200) {
							this.dataList = res.data;
							if (this.defaultPicker) {
								const defaultPlace = this.dataList.length ? this.dataList[0] : {};
								this.$emit("getPlaceId", defaultPlace);
							}
						}
					}).catch(err => {})
				}
			},
			searchMethod(search) {
				this.searchValue = search;
			},
			searchShow(place) {
				return !this.searchValue || (place.placeName.indexOf(this.searchValue) > -1 || place.placeNumber.indexOf(
					this.searchValue) > -1)
			},
			showPlacePopup(placeId = -1) {
				if (placeId) {
					this.placeActive = placeId
				}
				this.placePopup = !this.placePopup
			},
			pickerPlace(place) {
				if (place == -1) {
					this.placeActive = -1;
				} else {
					this.placeActive = place.placeId||place.id;
				}
				this.placePopup = !this.placePopup;
				this.$emit("getPlaceId", place);
			},
		},
	};
</script>

<style lang="scss" scoped>
	.xls-place-list {
		display: flex;
		flex-direction: column;
		height: 60vh;
		max-height: 1800rpx;

		.place-title {
			padding: 0 22rpx;
			height: 90rpx;
			border-bottom: 1rpx solid #e6e6e6;
			font-size: 32rpx;
			color: #5241ff;
			display: flex;
			align-items: center;

			.left-back {
				width: 25%;
			}

			.center-tit {
				width: 50%;
				text-align: center;
			}

			.right-count {
				width: 25%;
				color: #262626;
				text-align: right;
			}
		}

		.place-wrapper {
			flex: 1;
			overflow-y: auto;

			.place-item {
				padding-left: 24rpx;

				.place-main {
					padding: 20rpx;
					padding-left: 0;
					border-bottom: 1rpx solid #eee;
					min-height: 100rpx;
					box-sizing: border-box;
					font-size: 28rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
				}

				.device-num {
					font-size: 24rpx;
					color: #999;
				}
			}
		}
	}
</style>
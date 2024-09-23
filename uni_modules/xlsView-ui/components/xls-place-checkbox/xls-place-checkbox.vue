<template>
	<u-popup :show="showPlace" mode="bottom" round="20" @close="showPlace=false">
		<view class="place-wrapper-style">
			<view class="title-wrapper">
				<view @click="showPlace = false">取消</view>
				<view @click="comfirnBtn">确定（{{ checkboxGroup.length }}个）</view>
			</view>

			<xls-search placeholder="请输入场地名称" marLeft="-5.5em" @confirm="stratesSearch"></xls-search>

			<view class="place-content-style" v-if="placeList.length">
				<view class="place-item-style">
					<view class="text-name all-check">全选</view>
					<view class="radio-style" @click="checkAllPlace">
						<u-icon name="checkmark-circle-fill" size="46" color="#5241FF" v-if="allCheck" />
						<u-icon name="checkmark-circle" size="46" color="#CECFD2" v-else />
					</view>
				</view>
				<view class="place-item-style" v-for="(place, index) in placeList" :key="index" v-show="searchShow(place)">
					<view class="text-name">
						<span class="serial-number">{{ index + 1 }}_</span>
						<span>{{ place.placeName }}</span>
					</view>
					<view class="radio-style" @click="checkPlaceItem(place.placeId)">
						<u-icon name="checkmark-circle-fill" size="46" color="#5241FF"
							v-if="checkboxGroup.includes(place.placeId)" />
						<u-icon name="checkmark-circle" size="46" color="#CECFD2" v-else />
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
			deviceType: {
				type: [String, Number],
				default: ''
			}
		},
		data() {
			return {
				showPlace: false,
				searchValue: "",
				placeList: [],
				checkboxGroup: [],
				allCheck: false,
				placeNameList: [],
			};
		},
		mounted() {
			this.getPlace();
		},
		methods: {
			async getPlace() {
				if(this.deviceType) {
					placeController.getPlaceListByDeviceType({
						deviceType: this.deviceType
					}).then(res => {
						if (res.code == 200) {
							this.placeList = res.data;
						}
					}).catch(err => {})
				} else {
					placeController.getPlaceDeviceList().then(res => {
						if (res.code == 200) {
							this.placeList = res.data;
						}
					}).catch(err => {})
				}
			},
			//搜索
			stratesSearch(search) {
				this.searchValue = search;
			},
			searchShow(place) {
				return !this.searchValue || (place.placeName.indexOf(this.searchValue) > -1 || place.placeNumber.indexOf(
					this.searchValue) > -1)
			},
			//全选、全不选
			checkAllPlace() {
				this.allCheck = !this.allCheck;
				this.checkboxGroup = [];
				if (this.allCheck) {
					this.placeList.forEach((place) => {
						this.checkboxGroup.push(place.placeId);
					});
				}
			},
			//单项反选
			checkPlaceItem(placeId) {
				if (this.checkboxGroup.includes(placeId)) {
					// this.checkboxGroup = this.checkboxGroup.filter((item) => {
					//   return item != placeId;
					// });
					this.checkboxGroup.splice(this.checkboxGroup.indexOf(placeId), 1);
				} else {
					this.checkboxGroup.push(placeId);
				}
				this.allCheck = this.checkboxGroup.length == this.placeList.length;
			},

			//普通打开
			showPlacePopup(params) {
				if(Array.isArray(params)) {
					this.checkboxGroup = params
				}
				this.showPlace = !this.showPlace;
			},

			//回填
			defaultChecked(placeIds) {
				if (placeIds) {
					if (placeIds.charAt(placeIds.length - 1) == ",") {
						placeIds = placeIds.substr(0, placeIds.length - 1);
					}
					placeIds.split(",").forEach((item) => {
						this.checkboxGroup.push(parseInt(item));
					});
				}
			},
			checkItem() {
				this.placeList.forEach((item) => {
					if (this.checkboxGroup.indexOf(item.placeId) != -1) {
						this.placeNameList.push(item.placeName);
					}
				});
			},
			comfirnBtn() {
				this.checkItem();
				let arr = [
					this.placeNameList, //选中场地名称
					this.checkboxGroup, //选中场地placeId
					false, //是否全选
					this.placeList.length,
				];
				this.$emit("getPlaceId", arr);
				this.showPlace = !this.showPlace;
				this.placeNameList = [];
			},
		},
	};
</script>

<style lang="scss" scoped>
	.place-wrapper-style {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 60vh;
		max-height: 1000rpx;
		font-family: "Microsoft JhengHei", "Microsoft YaHei";
		background: #fff;

		.title-wrapper {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 4px 0 12px;
			line-height: 46px;
			font-size: 16px;
			color: #5241ff;
			background: #f5f6f7;
		}

		.place-content-style {
			flex: 1;
			padding: 0 10px;
			overflow-y: scroll;

			.place-item-style {
				border-top: 1px solid #e5e5e5;
				line-height: 45px;
				font-size: 16px;
				display: flex;
				align-items: center;

				.text-name {
					flex: 1;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.all-check {
					margin-left: 16px;
					font-weight: 700;
				}

				.serial-number {
					font-size: 12px;
					color: #999;
					margin-right: 8px;
				}

				.radio-style {
					padding: 0px 2px 0px 20px;
				}
			}
		}
	}
</style>
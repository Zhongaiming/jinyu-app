<template>
	<!-- 远程启动 场地 -->
	<u-popup :show="showPlace" mode="bottom">
		<view class="placeList">
			<view class="place-top">
				<view class="left-back" @click="showPlace = false">返回</view>
				<view class="center-tit">选择场地</view>
				<view class="right-count"></view>
			</view>
			<xls-search placeholder="请输入场地名称" marLeft="-5.5em" @confirm="stratesSearch"></xls-search>
			<view class="place-con" v-if="placeList.length">
				<view class="place-item" v-for="(place, index) in placeList" :key="index" @click="pitchPlace(place)">
					<view class="place-main">
						<span :style="{ color:placeActive == place.id?'#5241FF':''}">
							{{ place.placeName }}
						</span>
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
		deviceController
	} from '@/api/index.js';

	export default {
		data() {
			return {
				showPlace: false,
				placeList: [],
				placeActive: "",
				searchValue: "",
			};
		},
		created() {
			this.getPlace();
		},
		methods: {
			async getPlace() {
				let res = await deviceController.getPlaceListByDeviceType({
					search: this.searchValue ? encodeURIComponent(this.searchValue) : null,
					deviceType: this.$parent.deviceTypeId,
				});
				if (res.code == 200) {
					this.placeList = res.data;
				}
			},
			stratesSearch(search) {
				this.searchValue = search;
				this.getPlace();
			},

			showPlacelist() {
				this.showPlace = !this.showPlace;
			},
			pitchPlace(params) {
				this.$emit("pitchonPlace", params);
				this.placeActive = params.id;
				this.showPlace = !this.showPlace;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.placeList {
		width: 100%;
		height: 60vh;
		max-height: 1000rpx;
		display: flex;
		flex-direction: column;

		.place-top {
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

		.place-con {
			flex: 1;
			overflow-y: scroll;
			font-family: "Microsoft JhengHei", "Microsoft YaHei";

			.place-item {
				padding-left: 12px;

				.place-main {
					padding: 10px;
					padding-left: 0;
					border-bottom: 1px solid #eee;
					min-height: 50px;
					box-sizing: border-box;
					font-size: 14px;
					display: flex;
					align-items: center;
					justify-content: space-between;
				}

				.device-num {
					font-size: 12px;
					color: #999;
				}
			}
		}
	}
</style>
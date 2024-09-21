<template>
	<u-popup :show="showPlace" mode="bottom" @close="showPlace=false">
		<view class="place-wrapper-style">
			<view class="title-wrapper">
				<view @click="showPlace = false">取消</view>
				<view class="title">选择门店</view>
				<view></view>
			</view>

			<xls-search placeholder="请输入门店名称" marLeft="-5.5em" @confirm="stratesSearch"></xls-search>

			<view class="place-content-style" v-show="placeList.length">
				<view class="place-item-style" v-for="(place, index) in placeList" :key="index"
					@click="comfirnBtn(place)">
					<view class="text-name">
						<span class="serial-number">{{ index + 1 }}_</span>
						<span>{{ place.poiName }}</span>
					</view>
					<view class="radio-style">
						<u-icon name="checkmark-circle-fill" size="40" color="#5241FF" v-if="place.id === placeId" />
					</view>
				</view>
				<xls-bottom></xls-bottom>
			</view>
			<xls-empty v-show="!placeList.length" />
		</view>
	</u-popup>
</template>

<script>
	import {
		writeOffController
	} from "@/api/index.js"
	export default {
		name: "customList",
		data() {
			return {
				showPlace: false,
				searchValue: "",
				placeList: [],
				placeId: null,
			};
		},
		mounted() {
			this.getPlace();
		},
		methods: {
			async getPlace() {
				let res = await writeOffController.getDyShopInfo({
					search: encodeURIComponent(this.searchValue)
				});
				if (res.code == 200) {
					this.placeList = res.data;
				}
			},
			//普通打开
			showPlacePopup() {
				this.showPlace = !this.showPlace;
			},
			//搜索
			stratesSearch(search) {
				this.searchValue = search;
				this.getPlace();
			},

			comfirnBtn(item) {
				this.placeId = item.id;
				this.$emit("getStoreObj", item);
				this.showPlace = !this.showPlace;
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
			padding: 0 40px 0 12px;
			line-height: 46px;
			font-size: 16px;
			color: #5241ff;
			background: #f5f6f7;

			.title {
				color: #000;
				font-weight: 600;
			}
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
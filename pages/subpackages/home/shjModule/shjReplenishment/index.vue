<template>
	<z-paging ref="paging" v-model="commodityList" @query="queryList">
		<xls-jy-navbar title="补货管理" bgColor="#f5f6f7"></xls-jy-navbar>

		<xls-search @comfirm="stratesSearch" placeholder="输入设备编号或场地" marLeft="-6.5em"></xls-search>
		<view class="places-select-wrapper" @click="$refs.place.showPlacePopup(placeId)">
			<view class="select-label">场地</view>
			<view class="select-value">{{ placeName }}</view>
			<u-icon name="arrow-right" size="36" color="#ccc" />
		</view>
		<xls-place-radio ref="place" @getPlaceId="getPlaceId" deviceType="4" />

		<view class="main-content-wrapper">
			<view class="li-item-wrapper" v-for="(item, index) in commodityList" :key="index">
				<view class="title-style">{{ item.placeName }}</view>
				<view class="device-message" v-for="(rail, index) in item.railList" :key="index" @click="goReplenishment(rail.deviceNumber)">
					<view class="item-top">
						<span class="name">售货机{{ rail.deviceNumber }}</span>
						<span class="status-icon offline" v-if="!rail.onlineState">离线</span>
						<span style="color: #15d193" class="status-icon" v-else>在线</span>
						<u-icon name="wifi-off" color="#ff4747" size="50" v-if="!rail.onlineState"></u-icon>
						<u-icon name="wifi" color="#15d193" size="50" v-else></u-icon>
					</view>
					<view class="data-list">
						<view class="data-list_item">
							<view class="item-label">货道总数</view>
							<view class="item-value">{{ rail.railCount }}条</view>
						</view>
						<view class="data-list_item">
							<view class="item-label color-blue">缺货</view>
							<view class="item-value color-blue">
								{{ rail.shortSupply }}个
							</view>
						</view>
						<view class="data-list_item">
							<view class="item-label">总容量</view>
							<view class="item-value">{{ rail.total }}个</view>
						</view>
						<view class="data-list_item">
							<view class="item-label">现有库存</view>
							<view class="item-value">{{ rail.stock }}个</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<xls-empty slot="empty" />
	</z-paging>
</template>

<script>
	import {
		shjController
	} from '@/api/index.js'

	export default {
		name: "shjReplenishment",
		data() {
			return {
				searchValue: "",
				placeName: "全部场地",
				placeId: null,
				commodityList: [],
			};
		},
		methods: {
			async queryList(pageNo, pageSize) {
				shjController.venueVendingMachine({
					page: pageNo,
					size: pageSize,
					...(this.searchValue && {
						search: encodeURIComponent(this.searchValue)
					}),
					...(this.placeId && {
						placeId: this.placeId
					}),
				}).then(res => {
					this.$refs.paging.complete(res.data.dataList)
				})
			},
			stratesSearch(search) {
				this.searchValue = search
				this.getCommodity()
			},
			goReplenishment(deviceNumber) {
				this.$goTo("/pages/subpackages/home/shjModule/shjReplenishment/replenishment", "navigateTo", {
					deviceNumber
				})
			},
			getPlaceId(place) {
				if (place == -1) {
					this.placeId = null
					this.placeName = "全部场地"
				} else {
					this.placeId = place.id
					this.placeName = place.placeName
				}
				this.stratesSearch("")
			},
		},
	};
</script>

<style lang="scss" scoped>
	.places-select-wrapper {
		padding: 12px 10px;
		display: flex;
		align-items: center;
		background-color: #fff;
		border-top: 1px solid #e5e5e5;
		font-size: 15px;

		.select-label {
			width: 87.5px;
			color: #666;
		}

		.select-value {
			flex: 1;
			color: #5241FF;
			text-align: right;
		}
	}

	.main-content-wrapper {
		margin-top: 8px;
		padding: 0 12px 30px;

		.li-item-wrapper {
			margin-top: 6px;

			.title-style {
				padding: 10px;
				font-size: 15px;
			}

			.device-message {
				padding: 0 12px;
				margin-bottom: 12px;
				background: #fff;
				border-radius: 2px;

				.item-top {
					border-bottom: 1px solid #f0f0f0;
					padding: 10px 0;
					font-size: 13px;
					font-weight: 700;
					display: flex;
					align-items: center;
					position: relative;

					.name {
						color: #262626;
						margin-right: 8px;
						vertical-align: middle;
					}

					.offline {
						color: #ff4747;
					}
				}

				.item-top:after {
					border-right: 1px solid #999;
					border-top: 1px solid #999;
					content: "";
					height: 9px;
					opacity: 0.6;
					position: absolute;
					right: 0;
					top: 50%;
					transform: translateY(-50%) rotate(45deg);
					width: 9px;
				}

				.data-list {
					align-items: center;
					display: flex;
					height: 70px;
					justify-content: space-between;
					width: 100%;

					.data-list_item {
						color: #999;
						font-size: 13px;
						text-align: center;

						.item-label {
							color: #595959;
							font-size: 11.5px;
							margin-bottom: 4px;
						}

						.item-value {
							color: #262626;
							font-size: 13px;
							font-weight: 500;
						}

						.color-blue {
							color: #5241FF;
						}
					}
				}
			}
		}
	}
</style>
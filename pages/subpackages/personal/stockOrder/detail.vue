<template>
	<view class="pickDetail">
		<xls-jy-navbar title="备货单详情" bgColor="#f5f6f7"></xls-jy-navbar>
		<view class="page-container">
			<view class="date-wrapper" v-show="state == 1" @click="$refs.place.showPlacePopup(placeId)">
				<p class="select-label">场地</p>
				<p class="select-date">{{ placeName }}</p>
				<u-icon name="arrow-right" size="36" color="#ccc" />
			</view>
			<xls-place-radio ref="place" @getPlaceId="getPlaceId" deviceType="4" />
			
			<view class="top-notify" v-show="state == 0">
				<u-icon name="volume" size="40" class="icon" />
				建议实际备货时多准备20%的商品以供调配
			</view>
			
			<view class="top-tab">
				<view class="tab-list">
					<view class="tab-item" v-for="(item, index) in stateList" :key="index" @click="changeState(item.id)"
						:class="{'active':state == item.id}">
						{{ item.title }}
					</view>
				</view>
			</view>
			<view class="page-content">
				<view class="goods-item" v-for="(item, index) in detailList" :key="index">
					<view class="info-wrapper">
						<view class="goods-image">
							<image :src="item.commodityImg" alt="" v-if="item.commodityImg" class="image"/>
							<image :src="`${$baseUrl}appV4/image/other/ztwl.png`" alt="" class="image"
								v-else />
						</view>
						<!-- 备货 -->
						<view class="goods-info" v-show="state == 0">
							<p class="info-head">
								<span class="goods-name">{{ item.commodityName }}</span>
								<span class="goods-price">￥{{ item.referenceSellingPrice }}</span>
							</p>
							<view class="info-content">
								<view class="info-item">
									<span class="value-number">{{ item.railCapacity }}个</span>
									<span class="label">备货数</span>
								</view>
								<view class="info-item">
									<span class="value-number">{{ item.railRepertory }}个</span>
									<span class="label">建议备货</span>
								</view>
								<view class="info-item">
									<span class="value-number">1个</span>
									<span class="label">补货场地</span>
								</view>
								<view class="info-item">
									<span class="value-number">1个</span>
									<span class="label">补货机器</span>
								</view>
							</view>
						</view>
						<!-- 补货 -->
						<view class="goods-info" v-show="state == 1">
							<p class="info-head">
								<span class="goods-name">{{ item.commodityName }}</span>
							</p>
							<view class="info-content">
								<view class="info-item">
									<span class="value-number">{{ item.railCapacity }}个</span>
									<span class="label">补货数</span>
								</view>
								<view class="info-item">
									<span class="value-number">{{ item.costPrice }}/个</span>
									<span class="label">成本价</span>
								</view>
								<view class="info-item">
									<span class="value-number">1个</span>
									<span class="label">补货机器</span>
								</view>
							</view>
						</view>
					</view>
				</view>
				<xls-bottom v-if="detailList.length" />
				<xls-empty v-else></xls-empty>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		shjController
	} from '@/api/index.js'
	export default {
		name: "pickDetail",
		data() {
			return {
				state: 0,
				stateList: [{
						id: 0,
						title: "备货详情"
					},
					{
						id: 1,
						title: "补货详情"
					},
				],
				placeName: "全部场地",
				placeId: null,
				detailList: [],
				stockNo: ''
			};
		},
		onLoad(option) {
			if(option.params) {
				const {stockNo} = JSON.parse(option.params)
				this.stockNo = stockNo
				this.getDetail()
			}
		},
		methods: {
			async getDetail() {
				let res = await shjController.getStockDetail({
					stockNo: this.stockNo,
					state: 0, //0 备货详情 1 补货详情 默认0 传null
					placeId: this.placeId,
				});
				if (res.code == 200) {
					this.detailList = res.data
				}
			},
			changeState(id) {
				this.state = id
				this.getDetail()
			},
			getPlaceId(place) {
				if (place == -1) {
					this.placeId = null
					this.placeName = "全部场地"
				} else {
					this.placeId = place.id
					this.placeName = place.placeName
				}
				this.getDetail()
			},
		},
	};
</script>

<style lang="scss" scoped>
	.pickDetail {
		width: 100%;
		font-family: PingFangSC-Regular;
	}

	.page-container {
		.date-wrapper {
			padding: 0 10px;
			background: #fff;
			height: 45px;
			border-bottom: 1px solid #e5e5e5;
			border-top: 1px solid #e5e5e5;
			display: flex;
			align-items: center;
			font-size: 15px;

			.select-label {
				color: #666;
			}

			.select-date {
				flex: 1;
				color: #5241FF;
				padding: 0 10px 0 20px;
			}
		}

		.top-notify {
			background-color: #E6E4FE;
			color: #5241FF;
			font-size: 13px;
			font-weight: 700;
			line-height: 15px;
			padding: 7.5px 15px;
			display: flex;
			align-items: center;

			.icon {
				margin-right: 6px;
			}
		}

		.top-tab {
			.tab-list {
				background-color: #fff;
				box-sizing: border-box;
				display: flex;
				padding: 0 10px;

				.tab-item {
					border-bottom: 2px solid #fff;
					font-size: 13px;
					line-height: 13px;
					padding: 15px 11px;
				}

				.active {
					border-color: #5241FF;
					color: #5241FF;
				}
			}
		}

		.page-content {
			padding: 10px;

			.goods-item {
				background-color: #fff;
				border-radius: 5px;
				margin-bottom: 10px;
				padding: 8px 10px 10px;

				.info-wrapper {
					padding-top: 7.5px;
					display: flex;

					.goods-image {
						border-radius: 5px;
						flex: 0 0 auto;
						height: 76px;
						margin-right: 15px;
						width: 70px;

						.image {
							width: 100%;
							height: 100%;
						}
					}

					.goods-info {
						flex: 1;

						.info-head {
							border-bottom: 1px solid #f5f5f5;
							font-size: 16px;
							line-height: 15px;
							padding: 5px 0;

							.goods-price {
								color: #ff3434;
								font-size: 14px;
							}
						}

						.info-content {
							align-items: center;
							display: flex;
							height: 50px;
							justify-content: space-around;
							margin-top: 10px;

							.info-item {
								color: #999;
								display: flex;
								flex: 1;
								flex-direction: column;
								font-size: 12px;
								line-height: 18px;
								text-align: center;

								.value-number {
									color: #000;
									font-size: 13px;
									padding-bottom: 3px;
								}

								.label {
									padding-bottom: 7.5px;
									color: #666;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
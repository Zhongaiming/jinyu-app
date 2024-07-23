<template>
	<view class="xls-come-gift">
		<jy-navbar title="礼品消耗记录" bgColor="#f5f6f7"></jy-navbar>
		<u-list @scrolltolower="scrolltolower" class="xls-list">
			<u-list-item v-for="(gift, index) in dataList" :key="index" class="xls-list-item">
				<view class="list-content-left">
					<p class="title">
						<span class="main">{{ gift.commodityName }}</span>
						<span class="list-content-right">{{ gift.commodityReferencePrice }}元X{{
				        gift.commodityCount
				      }}个</span>
					</p>
					<p class="left-txt">
						<span class="place-name">{{ gift.placeName }}</span>-{{ gift.deviceTypeName }}{{ gift.deviceNumber }}-{{
				      gift.shippingSpace
				    }}/{{ gift.railNumber }}
					</p>
					<p class="left-txt">
						{{ gift.createTime}}
						<span style="color: red;margin-left: 20rpx;" v-show="gift.outPresentType == 3"> 远程出货</span>
					</p>
				</view>
			</u-list-item>
			<u-divider text="已经到底啦~" :dashed="true" text-size="28"></u-divider>
		</u-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList: [{
						"commodityId": 1006,
						"commodityName": "72757-6 3款無殼扭蛋造型系列 之 迪士尼公主人偶 愛麗絲 奇妙仙子 貝兒公主異色版",
						"commodityReferencePrice": 1,
						"commodityCount": 1,
						"placeId": 401,
						"placeName": "V0006中土513",
						"deviceType": 2,
						"deviceTypeName": "扭蛋机",
						"deviceNumber": "30000036",
						"shippingSpace": 1,
						"railNumber": "11",
						"outPresentType": 3,
						"createTime": "2024-07-23 14:05:24"
					},
					{
						"commodityId": 1006,
						"commodityName": "72757-6 3款無殼扭蛋造型系列 之 迪士尼公主人偶 愛麗絲 奇妙仙子 貝兒公主異色版",
						"commodityReferencePrice": 1,
						"commodityCount": 1,
						"placeId": 401,
						"placeName": "V0006中土513",
						"deviceType": 2,
						"deviceTypeName": "扭蛋机",
						"deviceNumber": "30000036",
						"shippingSpace": 1,
						"railNumber": "13",
						"outPresentType": 3,
						"createTime": "2024-07-23 14:01:35"
					},
					{
						"commodityId": 1006,
						"commodityName": "72757-6 3款無殼扭蛋造型系列 之 迪士尼公主人偶 愛麗絲 奇妙仙子 貝兒公主異色版",
						"commodityReferencePrice": 1,
						"commodityCount": 1,
						"placeId": 401,
						"placeName": "V0006中土513",
						"deviceType": 2,
						"deviceTypeName": "扭蛋机",
						"deviceNumber": "30000036",
						"shippingSpace": 1,
						"railNumber": "11",
						"outPresentType": 3,
						"createTime": "2024-07-23 13:58:40"
					}
				]
			}
		},
		methods: {
			scrolltolower() {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.xls-come-gift {
		background-color: $xls-page-bg;
		.xls-list {
			font-size: 28rpx;
			
			.xls-list-item {
				background: #fff;
				border-bottom: 2rpx solid #e3e2e6;
				display: flex;
				padding: 15rpx;

				.list-content-left {
					width: 100%;

					.title {
						display: flex;

						.main {
							flex: 1;
						}
					}

					p {
						padding-bottom: 20rpx;
					}

					.left-txt {
						color: #666;
						font-size: 26rpx;
					}
				}

				.list-content-right {
					color: #5241FF;
				}
			}
		}
	}
</style>
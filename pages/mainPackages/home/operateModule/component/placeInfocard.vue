<template>
	<view class="placeInfocard">
		<view class="detail-list-panel">
			<view class="entry">
				<view class="site-detail-link">
					<view class="entry-hd">
						<span class="place-name" v-html="item.placeName ? item.placeName : item.deviceTypeName"></span>
						<span class="count" v-show="item.placeName">{{ item.deviceNum }}台</span>
						<span class="money text-over">
							<span class="text">合计：</span>{{ item.totalIncome }}
							<span class="unit">元</span>
						</span>
					</view>
					<view class="entry-bd text-over">
						<view>
							<view class="info-row">
								<span class="field">在线支付</span>
								<span class="value">
									<span class="num">出币{{ item.onlinePayInsertCoins }}个,</span>
									{{ item.onlinePayIncome }}<span class="unit">元</span></span>
							</view>
							<view class="info-row">
								<span class="field">平台补贴</span>
								<span class="value">{{ item.subsidyIncome }}<span class="unit">元</span><u-icon
										name="arrow-right" size="18" color="#c6c6c6" class="icon-arrow" /></span>
							</view>
							<view class="info-row">
								<span class="field">现金支付</span>
								<span class="value">{{ item.cashPayIncome }}<span class="unit">元</span></span>
							</view>
							<view class="info-row">
								<span class="field">实际出币数</span>
								<span class="value">{{ item.totalInsertCoins }}<span class="unit">个</span></span>
							</view>
						</view>
						<view class="info-part">
							<view class="one-footer">
								<span class="field">合计投币</span>
								<span class="right-txt">{{ item.totalInsertCoins }}<span class="unit">个</span></span>
							</view>
							<view class="count">
								线上{{ item.onlinePayInsertCoins }}个,线下{{item.offlineInsertCoins}}个
							</view>
						</view>
						<view class="info-part">
							<view class="one-footer">
								<span class="field">商品消耗</span>
								<span class="right-txt">{{ item.commodityCount }}<span class="unit">个</span>{{ item.commodityTotalAmount
                  }}<span class="unit">元</span></span>
							</view>
							<view class="count">
								出礼比例<span v-html="
                    item.outPresentProportion
                      ? item.outPresentProportion + '/1'
                      : '0/0'
                  "></span>
							</view>
						</view>
					</view>
				</view>
				<view class="link" v-show="item.placeName" @click="$toast('敬请期待~')">
					<view class="tendency-link">场地收益趋势</view>
					<u-icon name="arrow-right" size="36" color="#c6c6c6" class="bottom-arrow" />
					<!-- <view class="tendency-link border-left">查看收益分类</view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "placeInfocard",
		props: ["item"],
	};
</script>

<style lang="scss" scoped>
	.placeInfocard {
		width: 100%;
	}

	.detail-list-panel {
		background: #f5f6f7;
		border-radius: 12px;

		.entry {
			.site-detail-link {
				.entry-hd {
					padding: 0 10px;
					min-height: 50px;
					background: #e6e4fe;
					border-top: 1px solid #c5cdd9;
					border-top-left-radius: 10px;
					border-top-right-radius: 10px;
					display: flex;
					align-items: center;

					.place-name {
						padding-top: 2.5px;
						max-width: 150px;
						font-size: 15px;
						font-weight: 600;
						color: #000;
						display: -webkit-box;
						overflow: hidden;
						text-overflow: ellipsis;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}

					.count {
						margin-left: 5px;
						display: inline-block;
						font-size: 13px;
						color: #fff;
						border-radius: 4px;
						text-align: center;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						background-image: url(#{$baseUrl}appV4/altered/label-bg.png);
						padding-left: 5px;
						line-height: normal;
						background-repeat: no-repeat;
						background-size: auto 100%;
						min-width: 36px;
						padding: left 5px;
					}

					.money {
						flex: 1;
						text-align: right;
						font-size: 17px;
						color: #000;
						font-weight: 700;

						.text {
							font-weight: 600;
						}

						.unit {
							font-size: 14px;
						}
					}
				}

				.entry-bd {
					padding: 7.5px 15px 0 10px;
					background: #fff;
					border-bottom: 1px solid #e6e6e6;

					.info-part {
						border-top: 1px solid #e6e6e6;
						padding: 10px 0;

						.one-footer {
							display: flex;
							justify-content: space-between;
							font-size: 15px;

							.right-txt {
								text-align: right;
								display: inline-block;
								max-width: 60%;
								color: rgba(0, 0, 0, 0.8);
								padding-right: 10px;

								.unit {
									font-size: 12px;
								}
							}
						}

						.count {
							padding-right: 10px;
							padding-top: 3px;
							text-align: right;
							font-size: 12px;
							color: rgba(138, 138, 138, 0.8);
						}
					}

					.info-row {
						padding: 10px 0;
						display: flex;
						align-items: center;
						justify-content: space-between;
					}

					.field {
						display: inline-block;
						max-width: 38%;
						font-size: 15px;
						color: #000;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}

					.value {
						padding-right: 10px;
						display: inline-block;
						font-size: 15px;
						max-width: 60%;
						color: rgba(0, 0, 0, 0.8);
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						text-align: right;

						.num {
							font-size: 12px;
							color: rgba(138, 138, 138, 0.8);
						}

						.unit {
							font-size: 12px;
						}

						.icon-arrow {
							display: inline-block;
							position: relative;
							top: 2px;
							right: -5px;
						}
					}
				}
			}

			.link {
				height: 44px;
				display: flex;
				background: #fff;
				border-bottom-right-radius: 12px;
				border-bottom-left-radius: 12px;
				position: relative;

				.tendency-link {
					flex: 1;
					height: 44px;
					color: #5241ff;
					font-size: 15px;
					line-height: 44px;
					text-align: center;
				}

				// .border-left{
				//     border-left: 1px solid #ddd;
				//     box-sizing: border-box;
				// }
				.bottom-arrow {
					position: absolute;
					right: 10px;
					top: 13px;
				}
			}
		}
	}
</style>
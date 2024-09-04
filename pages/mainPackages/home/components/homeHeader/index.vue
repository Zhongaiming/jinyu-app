<template>
	<view class="xls-header" v-hasPermi="['app:coin:index', 'app:outPresent:index', 'app:today:index']">
		<view class="xls-header-bg"></view>
		<answer-quest ref="answer"></answer-quest>
		<view class="xls-header-main">
			<!-- 收益 -->
			<view class="xls-header-main-right-wrapper" v-hasPermi="['app:today:index']">
				<view class="price-wrapper" @click="goTo('todayEarning')">
					<span class="price">{{total.totalIncome || "0.00"}}</span>
					<span class="unit">元</span>
				</view>
				<view class="acount-wrapper">
					<span>今日总收益</span>
					<image :src="`${$baseUrl}homeImages/fristList/qs.png`" alt="" class="img" mode="widthFix"
						@click.stop="$refs.answer.closeOrshow()" />
				</view>
			</view>

			<!-- 投币 -->
			<view class="xls-header-main-left-wrapper" v-hasPermi="['app:coin:index', 'app:outPresent:index']">

				<view class="xls-header-right-box" @click="goTo('insertCoins')" v-hasPermi="['app:coin:index']">
					<view class="right-box-header">
						<span>合计投币</span>
						<span class="count-style">{{total.totalInsertCoins || "0"}}</span>
						<span>个</span>
					</view>

					<view class="right-box-footer">
						<view class="small-box small-box-right">
							<span>线下</span>
							<span class="bottom-count bottom-count-small">
								{{total.offlineInsertCoins || "0"}}</span>
							<span>个</span>
						</view>

						<view class="small-box small-box-left">
							<span>线上</span>
							<span class="bottom-count bottom-count-small">
								{{total.onlineInsertCoins || "0"}}</span>
							<span>个</span>
						</view>
					</view>
				</view>

				<view class="line" v-hasPermi="['app:outPresent:index']"></view>

				<view class="xls-header-right-box" @click="goTo('comeGift')" v-hasPermi="['app:outPresent:index']">
					<view class="right-box-header">
						<span>出礼比例</span>
						<span class="count-style text-over">
							{{total.outPresentProportion|| "0/0"}}
						</span>
						<span v-show="total.outPresentProportion" style="line-height: 21rpx">/1</span>
					</view>

					<view class="right-box-footer">
						<view class="small-box small-box-right">
							<span>出礼</span>
							<span class="bottom-count bottom-count-max">
								{{total.outPresentNum || "0"}}</span>
							<span>个</span>
						</view>

						<view class="small-box small-box-left">
							<span class="bottom-count bottom-count-max">{{total.outPresentTotalPrice || "0.00"}}</span>
							<span>元</span>
						</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import AnswerQuest from "./answerQuest";
	export default {
		name: "homeHeader",
		components: {
			AnswerQuest
		},
		props: {
			total: {
				type: Object,
				default: () => {
					return {
						totalInsertCoins: "",
						outPresentNum: "",
						totalInsertCoins: "",
					}
				}
			}
		},
		methods: {
			goTo(route) {
				this.$goTo(`/pages/mainPackages/home/${route}/index`);
			},
		},
	};
</script>

<style lang="scss" scoped>
	.xls-header {
		width: 100%;
		margin-bottom: 40rpx;
		padding-top: 40rpx;

		&-bg {
			width: 100%;
			height: 240rpx;
			background: #5241ff;
			position: absolute;
			z-index: 0;
			top: 0;
			left: 0;
		}
	}

	.xls-header-main {
		box-shadow: 4rpx 6rpx 8rpx 6rpx rgba(98, 113, 186, 0.2);
		width: 93%;
		min-height: 260rpx;
		max-height: 300rpx;
		margin: 0 auto;
		background: #fff;
		border-radius: 20rpx;
		padding: 40rpx 24rpx;
		box-sizing: border-box;
		position: relative;
		display: flex;
		align-items: center;

		&-right-wrapper {
			flex: 1.2;
			display: flex;
			align-items: center;
			flex-direction: column;
			padding-right: 10rpx;

			.price-wrapper {
				font-size: 56rpx;
				font-weight: 900;
				color: #5241ff;
				display: flex;
				align-items: flex-end;

				.price {
					max-width: 300rpx;
					display: inline-block;
				}

				.unit {
					font-size: 26rpx;
					color: #000;
					margin-left: 16rpx;
					vertical-align: bottom;
				}
			}

			.acount-wrapper {
				display: flex;
				align-items: center;
				font-size: 32rpx;

				.img {
					width: 44rpx;
					margin-left: 20rpx;
				}
			}
		}

		&-left-wrapper {
			flex: 1;
			border-left: 1rpx solid #dddddd;
			padding-left: 36rpx;

			.line {
				width: 100%;
				height: 2rpx;
				background: #dddddd;
				margin: 20rpx 0;
			}

			.xls-header-right-box {
				.right-box-header {
					font-size: 28rpx;
					font-weight: 700;
					color: #000;
					margin-bottom: 4rpx;
					display: flex;
					align-items: center;

					.count-style {
						max-width: 120rpx;
						display: inline-block;
						margin: 0 4rpx;
					}
				}

				.right-box-footer {
					display: flex;
					align-items: center;
					color: #7e7e7e;

					.small-box-right {
						margin-right: 16rpx;
					}

					.small-box {
						display: flex;
						align-items: center;
						font-size: 20rpx;
						white-space: nowrap;
					}

					.bottom-count {
						display: inline-block;
						max-width: 80rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}

					.bottom-count-small {
						max-width: 60rpx;
					}
				}
			}
		}
	}
</style>
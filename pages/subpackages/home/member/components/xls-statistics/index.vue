<template>
	<view>
		<!-- 统计 -->
		<view class="statistics-wrapper" v-hasPermi="['app:member:index:acount']">
			<view class="statistics-content">
				<view class="left">
					<view class="content">统计数据</view>
				</view>
				<view class="right">
					<view class="list">
						<view class="number">
							{{ keepFixed(accountMsg.totalMemberNum) }}
						</view>
						<view class="name">总用户数(个)</view>
					</view>
					<view class="list">
						<view class="number">{{ keepFixed(accountMsg.totalPay) }}</view>
						<view class="name">累计支付(元)</view>
					</view>
					<view class="list">
						<view class="number">{{ keepFixed(accountMsg.totalBalance) }}</view>
						<view class="name">总余额(元)</view>
					</view>
					<view class="list">
						<view class="number">
							{{ keepFixed(accountMsg.totalCurrency) }}
						</view>
						<view class="name">总余币(个)</view>
					</view>
				</view>
				<view class="help" @click="showTips()">
					<u-icon name="question-circle" size="30" color="#fff" />
				</view>
			</view>
		</view>
		<u-popup :show="showNotice" :round="12" mode="center">
			<view class="noticeTips">
				<view class="member-title">
					<span v-show="!nextTips">统计</span>数据说明
				</view>
				<ol class="explain-ol" v-if="!nextTips">
					<li class="explain-li">
						<span class="explain-text">
							数据统计截止至前一日凌晨24时,每天凌晨更新一次。
						</span>
					</li>
					<li class="explain-li">
						<view class="explain-circle"></view>
						<span class="explain-text">用户总数：</span><span>扫过码的用户数量</span>
					</li>
					<li class="explain-li">
						<view class="explain-circle"></view>
						<span class="explain-text">累计支付：</span><span>所有用户充值和启动设备所支付的金额总和</span>
					</li>
					<li class="explain-li">
						<view class="explain-circle"></view>
						<span class="explain-text">总余额：</span><span>所有用户剩余余额的总和</span>
					</li>
					<li class="explain-li">
						<view class="explain-circle"></view>
						<span class="explain-text">总余币：</span><span>所有用户剩余余币的总和</span>
					</li>
				</ol>
				<view class="declaration-content" v-else>
					<view class="declaration-item">
						累计支付:用户充值+启动设备+购买商品所支付的金额。
					</view>
					<view class="declaration-item">余额:当前用户剩余余额。</view>
					<view class="declaration-item">余币:当前用户剩余余币。</view>
					<view class="declaration-item">累计充值:用户充值所支付的金额。</view>
					<view class="declaration-item">
						启动支付:用户启动设备+购买商品所支付的金额。
					</view>
					<view class="declaration-item">余额支付:用户累计消耗的余额。</view>
					<view class="declaration-item">累计投币:用户累计的消耗的余币。</view>
					<view class="declaration-item">
						支付用户:筛选条件下有数据的用户数量。
					</view>
				</view>
				<view class="bottom-btn" @click="showTips()">确定</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				accountMsg: {
					"totalMemberNum": 118,
					"totalPay": 1471.1,
					"totalBalance": 95.91,
					"totalCurrency": 6060
				},
				showNotice: false,
				nextTips: false,
			}
		},
		methods: {
			keepFixed(params) {
				return params > 10000 ? (params / 10000).toFixed(2) + "万" : params;
			},
			showTips() {
				this.showNotice = !this.showNotice;
			},

		}
	}
</script>

<style lang="scss" scoped>
	.statistics-wrapper {
		position: fixed;
		left: 0;
		width: 100%;
		bottom: 120rpx;
		padding: 0 24rpx;
		box-sizing: border-box;
		z-index: 99;

		.statistics-content {
			box-sizing: border-box;
			width: 100%;
			height: 100rpx;
			border-radius: 24rpx;
			background: rgba(51, 51, 51, 0.9);
			display: flex;
			align-items: center;
			padding-right: 40rpx;
			position: relative;

			.left {
				position: relative;
				width: 84rpx;
				padding: 0 16rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-right: 24rpx;
				box-sizing: border-box;

				.content {
					font-size: 24rpx;
					color: #fff;
					transform: scale(0.91667);
					transform-origin: center;
					text-align: center;
				}
			}

			.left:after {
				content: "";
				display: block;
				width: 2rpx;
				height: 32rpx;
				background: #666;
				position: absolute;
				right: 0;
			}

			.right {
				display: flex;
				flex: 1;
				overflow: hidden;
				justify-content: space-between;

				.list {
					overflow: hidden;
					text-align: center;

					.number {
						font-weight: 400;
						font-size: 28rpx;
						color: #fff;
						text-align: center;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						font-family: DINAlternate, DINAlternate-Bold;
					}

					.name {
						color: #ccc;
						font-size: 24rpx;
						white-space: nowrap;
					}
				}

				.list:not(:last-child) {
					margin-right: 20rpx;
				}
			}

			.help {
				position: absolute;
				width: 40rpx;
				height: 40rpx;
				top: 0;
				right: 0;
				background: #999;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 0 24rpx 0 16rpx;
			}
		}
	}

	.noticeTips {
		width: 560rpx;
		padding: 40rpx 60rpx;

		.member-title {
			color: #333;
			font-size: 34rpx;
			font-weight: 700;
			text-align: center;
		}

		.bottom-btn {
			width: 100%;
			height: 88rpx;
			border-radius: 16rpx;
			background: #5241FF;
			color: #fff;
			line-height: 88rpx;
			text-align: center;
			font-size: 30rpx;
		}

		.explain-ol {
			font-size: 26rpx;
			padding: 24rpx 0;

			.explain-li {
				padding-left: 24rpx;
				position: relative;
				margin-bottom: 12rpx;

				.explain-text {
					font-weight: 700;
				}

				// .explain-circle {
				// 	position: absolute;
				// 	width: 8rpx;
				// 	height: 8rpx;
				// 	border-radius: 50%;
				// 	left: 0;
				// 	top: 50%;
				// 	margin-top: -4rpx;
				// 	background: #000;
				// }
			}
		}

		.declaration-content {
			padding: 24rpx 0;

			.declaration-item {
				font-size: 26rpx;
				line-height: 40rpx;
				color: #333;
				padding-left: 16rpx;
				position: relative;
				text-align: justify;
				white-space: normal;
			}

			.declaration-item:before {
				position: absolute;
				content: "";
				width: 8rpx;
				height: 8rpx;
				left: 0;
				top: 16rpx;
				border-radius: 50%;
				background: #000;
				display: inline-block;
				white-space: normal;
			}
		}
	}
</style>
<template>
	<view class="list-outside">
		<view class="validate-float" @click="noviceGuide = 1">
			<view class="text-right">新手指引</view>
		</view>
		<!-- 1 -->
		<view class="guide-shade" v-show="noviceGuide == 1" @click="noviceGuide = 2">
			<view class="tips-copy-box">
				<view class="tips-copy-box-left">
					<view class="form-box">
						<p class="form-label">支付宝商户号</p>
						<view class="copy-outside">
							<p>382555805</p>
							<view class="copy-box">
								<p class="copy-text">复制</p>
							</view>
						</view>
					</view>
					<view class="form-box">
						<p class="form-label">商户名称</p>
						<view class="copy-outside">
							<p>广州中土</p>
						</view>
					</view>
				</view>
				<view class="tips-copy-box-right">
					<view class="arrow-box">
						<image :src="`${$baseUrl}appV4/authentications/arrow.png`" alt="" class="img-el" />
						<p class="text">第1步</p>
					</view>
					<view class="arrow-item">
						<p class="merchant">复制商户编号</p>
						<p class="merchant">牢记商户名称</p>
					</view>
				</view>
			</view>
		</view>
		<!-- 2 -->
		<view class="guide-shade" v-show="noviceGuide == 2" @click="noviceGuide = 3">
			<view class="tips-scan-box">
				<view class="share-box">
					<image :src="`${$baseUrl}appV4/authentications/arrow.png`" alt="" class="img-el edg90" />
					<p class="mg-t-8">点击右上方“…”按钮</p>
					<p class="text-color mg-t-4">分享页面给好友</p>
				</view>
				<view class="tips-scan-qr-code-box">
					<view class="tips-scan-qr-code-box-left">
						<view class="arrow-box arrow-box">
							<view class="arrow-item-text">
								<p class="text text-arrow">第2步</p>
								<p class="merchant">长按识别</p>
								<p class="merchant">[ 微信签约码 ]</p>
							</view>
							<image :src="`${$baseUrl}appV4/authentications/arrow.png`" alt="" class="img-el edg180" />
						</view>
					</view>
					<view class="scan-outside-right">
						<view class="scan-box">
							<p class="scan-box-text">微信商家注册码</p>
							<image :src="`${$baseUrl}appV4/authentications/sqs.png`" alt="" class="qr-code" />
						</view>
						<view class="finger">
							<image :src="`${$baseUrl}appV4/authentications/figer.png`" alt="" mode="widthFix"/>
						</view>
					</view>
				</view>
				<view class="scan-remark">
					<p>提示：</p>
					<p class="mg-t-6">在扫码后出现的弹框中，</p>
					<p class="mg-t-4">
						点击
						<span class="text-color">[微信支付商家注册]</span>
						入口完成实名
					</p>
				</view>
			</view>
		</view>
		<!-- 3 -->
		<view class="guide-shade" v-show="noviceGuide == 3" @click="noviceGuide = 0">
			<view class="tips-scan-box">
				<view class="share-box">
					<image :src="`${$baseUrl}appV4/authentications/arrow.png`" alt="" class="img-el edg90" />
					<p class="mg-t-8">点击右上方“…”按钮</p>
					<p class="text-color mg-t-4">分享页面给好友</p>
				</view>
				<view class="tips-scan-qr-code-box">
					<view class="tips-scan-qr-code-box-left">
						<view class="arrow-box arrow-box">
							<view class="arrow-item-text">
								<p class="text text-arrow">第3步</p>
								<p class="merchant">截图保存[ 支付宝签约码 ]</p>
							</view>
						</view>
					</view>
					<view class="scan-outside-right">
						<view class="scan-box">
							<image :src="`${$baseUrl}appV4/authentications/sqs.png`" alt="" class="qr-code" />
						</view>
						<view class="finger">
							<image :src="`${$baseUrl}appV4/authentications/figer.png`" alt="" mode="widthFix"/>
						</view>
					</view>
				</view>
				<view class="scan-remark">
					<p>
						提示：
						<image :src="`${$baseUrl}appV4/authentications/arrow.png`" alt="" class="img-el edg180" />
					</p>

					<p class="mg-t-6 text-color">打开支付宝App - 扫一扫 - 相册</p>
					<p class="mg-t-4 text-color">- 选择支付宝签约码</p>
					<image :src="`${$baseUrl}appV4/authentications/zfb.png`" alt="" class="zfb-image" mode="heightFix"/>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "newHand",
		data() {
			return {
				noviceGuide: 0,
			};
		},
	};
</script>

<style lang="scss" scoped>
	.list-outside {
		.zfb-image {
			margin-top: 20rpx;
			height: 80rpx;
		}
		.guide-shade {
			background-color: rgba(0, 0, 0, 0.72);
			left: 0;
			position: fixed;
			top: 0;
			width: 100%;
			height: 100vh;
			z-index: 99;
			font-family: PingFangSC;

			.tips-copy-box {
				display: flex;
				padding: 360rpx 0 0 24rpx;

				.tips-copy-box-left {
					background-color: #03bf79;
					border-radius: 24rpx;
					height: 228rpx;
					padding: 24rpx 0.32rem;
					width: 284rpx;
					box-sizing: border-box;

					.form-box {
						color: #fff;
					}

					.form-box:not(:first-child) {
						margin-top: 24rpx;
					}

					.form-label {
						font-size: 24rpx;
						font-weight: 400;
						height: 34rpx;
						line-height: 34rpx;
					}

					.copy-outside {
						display: flex;
						font-size: 28rpx;
						font-weight: 700;
						height: 40rpx;
						line-height: 40rpx;
						margin-top: 4rpx;
					}

					.copy-box {
						background-color: #fff;
						color: #03bf79;
						align-items: center;
						border-radius: 40rpx;
						display: flex;
						font-size: 22rpx;
						font-weight: 400;
						height: 36rpx;
						justify-content: center;
						margin-left: 8rpx;
						opacity: 0.9;
						width: 60rpx;
					}
				}

				.tips-copy-box-right {
					margin: 48rpx 0 0 32rpx;
				}
			}

			.arrow-box {
				align-items: center;
				display: flex;

				.text {
					color: #fff;
					font-size: 32rpx;
					font-weight: 400;
					line-height: 44rpx;
					margin-left: 16rpx;
					white-space: nowrap;
				}

				.text-arrow {
					margin-left: 0;
				}
			}

			.arrow-box {
				display: flex;
				align-items: flex-start;
				text-align: right;
			}

			.arrow-item {
				padding-left: 100rpx;
				margin-top: 12rpx;
			}

			.merchant {
				color: #ffa742;
				font-size: 36rpx;
				font-weight: 500;
				line-height: 47rpx;
			}

			.merchant:not(:first-child) {
				margin-top: 8rpx;
			}

			.img-el {
				width: 84rpx;
				height: 34rpx;
			}

			.scan-box {
				background-color: #fff;
				border-radius: 16rpx;
				padding: 8rpx;

				.scan-box-text {
					color: #03bf79;
					font-size: 20rpx;
					font-weight: 700;
					line-height: 28rpx;
					text-align: center;
				}

				.qr-code {
					width: 176rpx;
					height: 176rpx;
					display: block;
					position: relative;

					.img {
						width: 100%;
						height: 100%;
					}
				}

				.tips-box {
					left: 0;
					position: absolute;
					top: 0;
					width: 100%;
					height: 100%;
					background: rgba(255, 255, 255, 0.92);
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					.tips-icon {
						display: block;
						height: 48rpx;
						margin: 0 auto;
						width: 48rpx;
					}

					.tips-text {
						font-size: 24rpx;
						font-weight: bolder;
						line-height: 36rpx;
						margin-top: 8rpx;
						white-space: nowrap;
						color: #5241FF;
					}
				}
			}

			.tips-scan-box {
				color: #fff;
				font-size: 26rpx;
				font-weight: 500;
				margin-top: 16rpx;
				padding-left: 60rpx;

				.edg90 {
					transform: rotate(90deg);
				}

				.edg180 {
					transform: rotate(180deg);
				}

				.mg-t-4 {
					margin-top: 8rpx;
				}

				.mg-t-6 {
					margin-top: 12rpx;
				}

				.mg-t-8 {
					margin-top: 16rpx;
				}

				.text-color {
					color: #ffa742;
				}

				.share-box {
					padding-top: 24rpx;
					padding-right: 24rpx;
					position: absolute;
					top: 20rpx;
					right: 0rpx;
					text-align: right;
				}

				.scan-remark {
					font-weight: 400;
					line-height: 40rpx;
					margin-top: 106rpx;
					position: absolute;
					left: 60rpx;
					bottom: 300rpx;
				}
			}

			.tips-scan-qr-code-box {
				margin-top: 400rpx;
				display: flex;
				justify-content: flex-end;

				.tips-scan-qr-code-box-left {
					margin: 72rpx 32rpx 0 0;
				}

				.scan-outside-right {
					padding-top: 32rpx;
					padding-right: 40rpx;
					position: relative;

					.finger {
						animation: move 0.5s linear infinite;
						width: 144rpx;
						position: absolute;
						top: 270rpx;
						right: 20rpx;

						image {
							width: 100%;
							height: 100%;
						}
					}

					@keyframes move {
						0% {
							transform: translate(0rpx, 0rpx);
						}

						50% {
							transform: translate(10rpx, 10rpx);
						}

						100% {
							transform: translate(0rpx, 0rpx);
						}
					}
				}
			}
		}

		.list-item-nomel {
			padding: 0 24rpx 16rpx;

			.base-list-item {
				height: 360rpx;
				padding: 32rpx;
				position: relative;
				width: 100%;
				box-sizing: border-box;
				border-radius: 24rpx;
				background: url(#{$baseUrl}appV4/authentications/bg-image.png) no-repeat #03bf79;
				background-size: 100% 100%;
				margin-bottom: 16rpx;

				.card-content-outside {
					display: flex;
					justify-content: space-between;

					.card-content-item-left {
						flex-grow: 1;
						margin-right: 24rpx;
						overflow: hidden;

						.card-title-box {
							display: flex;
							align-items: center;

							.card-title-icon {
								display: inline-block;
								height: 44rpx;
								width: 44rpx;
							}

							.card-title-text {
								color: #fadb14;
								font-size: 32rpx;
								font-weight: 700;
								line-height: 44rpx;
								margin-left: 16rpx;
							}
						}
					}

					.card-content-item {
						padding-top: 32px;
					}

					.scan-text {
						color: #fff;
						font-size: 22rpx;
						font-weight: 400;
						letter-spacing: 2rpx;
						line-height: 32px;
						margin-top: 8rpx;
						opacity: 0.7;
						text-align: center;
					}
				}
			}

			.card-content-item-text-box {
				display: flex;
				margin-top: 32rpx;

				.left-form {
					width: 220rpx;
				}

				.right-form {
					margin-left: 32rpx;
					max-width: 170rpx;
				}

				.over-con {
					max-width: 170rpx;
				}
			}
		}

		.remark-box {
			flex-shrink: 0;
			padding: 16rpx 24rpx 0;
			color: #999;
			font-size: 26rpx;
			line-height: 36rpx;
			font-weight: 400;

			.remark-title {
				font-weight: 700;
			}

			.remark-text {
				margin-top: 8rpx;
			}

			.remark-text::before {
				background-color: #999;
				border-radius: 50%;
				content: "";
				display: inline-block;
				height: 8rpx;
				margin-right: 36rpx;
				width: 8rpx;
			}
		}
	}

	.validate-float {
		position: fixed;
		right: 0;
		bottom: 360rpx;
		z-index: 9;

		.text-right {
			background-color: #ff8d1a;
			border-radius: 24rpx 0 0 24rpx;
			box-shadow: 0 6rpx 12rpx 0 #f0937d;
			color: #fff;
			font-size: 24rpx;
			padding: 16rpx;
			text-align: center;
			width: 66rpx;
			box-sizing: border-box;
		}
	}
</style>
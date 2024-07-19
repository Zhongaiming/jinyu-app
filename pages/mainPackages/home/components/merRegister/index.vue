<template>
	<view class="carousel-wrapper home-family">
		<view class="icon" @click="wechatPay = !wechatPay">
			<img src="./notice.png" alt="" />
		</view>
		<view class="desc-wrapper" @click="wechatPay = !wechatPay">
			<view class="info">请点击提交入网资料，申请开通支付能力！</view>
			<view class="desc">待支付渠道审批通过，即可使用扫码收款！</view>
		</view>
		<view class="icon-arrow">
			<van-icon name="arrow" color="#c97c5c" size="18" />
		</view>
		<van-popup v-model="wechatPay" round :close-on-click-overlay="false">
			<view class="popup">
				<p class="title">扫码收款通知</p>
				<view class="wechat-pay-box">
					<view class="shadow"></view>
					<view class="bg">
						<view class="img"><img src="./hand.png" alt="" /></view>
						<span class="sign"><img src="./red-icon.png" alt="" /></span>
					</view>
				</view>
				<view class="remark">
					<p>
						根据央行颁布的<span class="blue">《中国人民银行[2013]第9号文》</span>和<span class="blue">《银发[2015]199号文》</span>
						之规定，银联、微信支付、支付宝等支付机构<span class="blue">需商户提交身份证、银行卡等相关资料</span>，否则无法使用扫码收款。
					</p>
				</view>
				<view class="btn-outside" @click="goRegister">
					<p class="btn-text">开通扫码收款</p>
				</view>
			</view>
		</van-popup>
		<view class="close-btn" v-show="wechatPay" @click="wechatPay = !wechatPay">
			<img src="./clear.png" alt="" />
		</view>
	</view>
</template>

<script>
	export default {
		name: "merRegister",
		data() {
			return {
				wechatPay: false,
			};
		},
		methods: {
			goRegister() {
				this.wechatPay = false;
				this.$router.push("/realNameattesta");
			},
		},
	};
</script>

<style lang="less" scoped>
	.carousel-wrapper {
		background: #fff3e3;
		align-items: center;
		display: flex;
		height: 56px;
		padding: 0 10px;
		position: relative;
		z-index: 99;

		.icon {
			img {
				width: 25px;
				height: 25px;
			}
		}

		.desc-wrapper {
			align-self: center;
			display: inline-block;
			flex: 1;
			margin-left: 10px;
			max-width: 100%;
			overflow: hidden;
			padding-right: 10px;
			text-overflow: ellipsis;
			white-space: nowrap;

			.info {
				color: #ff8019;
				font-size: 14px;
			}

			.desc {
				color: #a53b02;
				font-size: 12px;
			}
		}

		.float {
			bottom: 220px;
			height: 48px;
			position: fixed;
			right: 12px;
			width: 48px;
			z-index: 999;

			.shadow {
				background: linear-gradient(180deg, #ff9d47, #ff8214);
				border-radius: 24px;
				box-shadow: 0 3px 8px 0 rgba(255, 129, 20, 0.32);
				height: 100%;
				left: 50%;
				position: absolute;
				top: 50%;
				transform: translate(-50%, -50%);
				width: 100%;
			}

			.bg {
				display: inline-block;
				height: 100%;
				padding: 10px;
				box-sizing: border-box;
				position: relative;
				width: 100%;

				.img {
					img {
						width: 28px;
						height: 28px;
					}
				}

				.text-bg {
					align-items: center;
					-webkit-animation: move 1.5s linear infinite;
					animation: move 1.5s linear infinite;
					background-color: #ff4747;
					border-radius: 8px 8px 2px 8px;
					box-shadow: 0 3px 4px 0 rgb(255, 71, 71 / 32%);
					display: flex;
					height: 16px;
					left: -70px;
					padding: 0 5px;
					position: absolute;
					z-index: 9999;
					text-align: center;
					top: -4px;

					.text {
						color: #fff7e6;
						display: block;
						font-size: 11px;
						font-weight: 400;
						height: 16px;
						line-height: 16px;
						text-align: center;
					}
				}

				@keyframes move {
					0% {
						transform: translate(0px, 0px);
					}

					50% {
						transform: translate(0px, 5px);
					}

					100% {
						transform: translate(0px, 0px);
					}
				}

				.sign {
					bottom: 0;
					position: absolute;
					right: 0;

					img {
						width: 24px;
						height: 24px;
					}
				}
			}
		}

		.popup {
			background: #fff;
			padding: 20px 0 16px;
			position: relative;
			width: 280px;

			.title {
				color: #404040;
				font-size: 18px;
				font-weight: 700;
				height: 25px;
				line-height: 25px;
				text-align: center;
			}

			.wechat-pay-box {
				height: 56px;
				margin: 16px auto 8px;
				position: relative;
				text-align: center;
				width: 56px;

				.shadow {
					background: linear-gradient(180deg, #ff9d47, #ff8214);
					border-radius: 50%;
					box-shadow: 0 3px 8px 0 rgb(255, 129, 20 / 32%);
					height: 56px;
					left: 50%;
					position: absolute;
					top: 50%;
					transform: translate(-50%, -50%);
					width: 56px;
				}

				.bg {
					display: inline-block;
					height: 100%;
					padding: 10px;
					box-sizing: border-box;
					position: relative;
					width: 100%;

					.img {
						img {
							width: 36px;
							height: 36px;
						}
					}

					.sign {
						position: absolute;
						bottom: 0;
						right: 0;

						img {
							width: 24px;
							height: 24px;
						}
					}
				}
			}

			.remark {
				color: #262626;
				font-size: 13px;
				font-weight: 400;
				height: 100px;
				line-height: 20px;
				margin: 0 auto;
				text-align: justify;
				width: 231px;

				.blue {
					color: #5241FF;
					font-weight: 700;
				}
			}

			.btn-outside {
				animation: big 1.5s linear infinite;
				background-color: #5241FF;
				border-radius: 8px;
				height: 49px;
				margin: 12px auto 0;
				padding-top: 12px;
				width: 231px;
				box-sizing: border-box;

				.btn-text {
					color: #fff;
					font-size: 18px;
					font-weight: 400;
					height: 25px;
					letter-spacing: 1px;
					line-height: 25px;
					text-align: center;
				}
			}

			@keyframes big {
				0% {
					transform: scale(1, 1);
				}

				50% {
					transform: scale(0.9, 0.9);
				}

				100% {
					transform: scale(1, 1);
				}
			}
		}

		.close-btn {
			bottom: 20%;
			height: 28px;
			left: 50%;
			position: fixed;
			transform: translateX(-50%);
			width: 28px;
			z-index: 99999;

			img {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
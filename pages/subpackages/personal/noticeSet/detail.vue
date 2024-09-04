<template>
	<view class="notice-wechat">
		<xls-jy-navbar title="接受消息的微信"></xls-jy-navbar>
		<view class="receive-msg-wechat">
			<view class="send-msg-style">
				<text class="title">消息推送方式</text>
				<text class="title ruler" @click="noticeTips = !noticeTips">规则说明</text>
			</view>

			<view class="public-msg">
				<view class="switch">
					<text class="text">公众号消息</text>
				</view>
				<view class="qrcode-wrapper">
					<xls-image :src="`${$baseUrl}appV4/img/icons/Official-Accounts.jpg`" alt="" mode="widthFix"
						class="image" />
				</view>
				<view class="is-bind-wechat">
					<xls-image :src="`${$baseUrl}appV4/image/other/succss.png`" alt="" class="choose-img" mode="widthFix" />
					<text class="text-text">第一步：关注公众号</text>
				</view>
			</view>

			<view class="public-msg">

				<view class="qrcode-wrapper qrcode-img">
					<!-- <vue-qr ref="Qrcode" :text="qsUrl" qid="testQrId"> </vue-qr> -->
					<canvas canvas-id="qrcode" style="width: 360rpx; height: 360rpx;" class="canvas-style"></canvas>
					<xls-image :src="uQrcodeUrl" style="width: 360rpx; height: 360rpx;" v-if="uQrcodeUrl"></xls-image>
				</view>
				<view class="is-bind-wechat">
					<xls-image :src="`${$baseUrl}appV4/image/other/succss.png`" alt="" class="choose-img" />
					<text class="text-text">第二步：绑定接收消息微信</text>
				</view>
				<view class="text-wapper">
					<p class="text-text" v-if="wechatSet.nickName">
						微信已设置—
						<xls-image :src="wechatSet.img" alt="" class="img" />
						<text>{{wechatSet.nickName}}</text>
						<text v-show="wechatSet.acount > 1">等{{ wechatSet.acount }}个微信</text>
					</p>
					<view class="text">如需修改已绑定的微信，请扫码重新绑定</view>
					<view class="text tip">(修改后，记得刷新一下哟~)</view>
				</view>
			</view>
		</view>

		<u-popup :show="noticeTips" mode="center">
			<view class="notice-popup">
				<view class="title">消息推送方式</view>
				<view class="ruler-content">
					<view class="detail">
						<view class="small-title">1. 推送优先级</view>
						<view class="detail-content">
							(1）若未开启 “公众号消息” 开关，或者
							开启了“公众号消息开关”、但公众号端未绑定微信的，则系统默认使用企业微信进行消息推送。
						</view>
						<view class="detail-content">
							(2）若开启了 “公众号消息”
							开关、且绑定了微信的，则将会优先使用公众号进行推送。对于部分不支持公众号推送的消息，仍会通过企业微信消息进行推送。
						</view>
					</view>
					<view class="detail">
						<view class="small-title">2. 公众号消息</view>
						<view class="detail-content">
							(1）“公众号消息”是指通过 “新零售V3商户平台”公众号推送消息。
						</view>
						<view class="detail-content">
							(2）如果开启了“公众号消息”开关，并且成功绑定了微信的，那么，当前账号相关的消息通知（离线消息、故障消息、时段概况收益、流量控制等）将会通过
							“新零售V3商户平台”公众号推送给已绑定的微信。请确保正常关注该公众号，否则将无法正常通过公众号接收消息。
						</view>
						<view class="detail-content">(3）同一个微信支持绑定多个账号。</view>
					</view>

				</view>
				<view class="btn-back" @click="noticeTips = !noticeTips">
					<view class="btn">知道了</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		baseController
	} from "@/api/index.js";
	import { getInfo } from "@/common/auth";
	import uQRCode from '@/common/uqrcode.js'; //引入uqrcode.js
	export default {
		data() {
			return {
				wechat: false,
				noticeTips: false,
				qsUrl: "",
				wechatSet: {
					nickName: "",
					acount: 0,
					img: "",
				},
				uQrcodeUrl: "",
			};
		},
		onLoad() {
			this.getOfficial();
			this.getWxSet();
		},
		methods: {
			// 微信设置
			async getWxSet() {
				const {commercialNumber} = getInfo();
				let res = await baseController.getWechatInform({commercialNumber});
				const result = res.data.length > 0 ? res.data[0] : {};
				Object.assign(this.wechatSet, result);
			},
			async getOfficial() {
				const {commercialNumber} = getInfo();
				this.qsUrl = `https://mv3.ztuwl.com/GZHV4/?commercialNumber=${commercialNumber}`;
				this.qrFun();
			},
			/** 生成二维码 */
			qrFun() {
				uQRCode.make({
					canvasId: 'qrcode',
					componentInstance: this,
					text: this.qsUrl,
					size: 180,
					margin: 10,
					backgroundColor: '#ffffff',
					foregroundColor: '#000000',
					success: res => {
						this.uQrcodeUrl = res;
					}
				})
			},
		},
	};
</script>

<style lang="scss" scoped>
	.notice-wechat {
		width: 100%;
		font-family: PingFangSC-Regular, PingFang SC;
	}

	.receive-msg-wechat {
		.send-msg-style {
			display: flex;
			justify-content: space-between;
			padding: 15px;

			.title {
				color: #666;
				display: inline-block;
				font-size: 14px;
				font-weight: 400;
				height: 20px;
				line-height: 20px;
			}

			.ruler {
				color: #5241ff;
			}
		}

		.public-msg {
			background: #fff;
			padding: 0 15px;

			.switch {
				align-items: center;
				display: flex;
				height: 50px;
				justify-content: space-between;

				.text {
					color: #333;
					font-size: 18px;
					font-weight: 600;
					height: 25px;
					line-height: 25px;
				}
			}

			.qrcode-wrapper {
				margin-bottom: 5px;
				display: flex;
				justify-content: center;
				position: relative;
				
				.canvas-style {
					position: absolute;
					left: 0;
					z-index: -10;
				}

				.image {
					margin: auto;
					width: 180px;
					height: 180px;
					display: block;
				}
			}

			.qrcode-img {
				img {
					width: 195px;
					height: 195px;
				}
			}

			.is-bind-wechat {
				padding-bottom: 10px;
				display: flex;
				align-items: center;
				justify-content: center;

				.choose-img {
					margin-right: 2.5px;
					vertical-align: text-bottom;
					width: 18px;
					height: 18px;
				}
			}

			.text-wapper {
				padding-bottom: 20px;
				text-align: center;
			}

			.text-text {
				color: #666;
				display: inline-block;
				font-size: 16px;
				display: flex;
				align-items: center;
				justify-content: center;

				.img {
					width: 30px;
					height: 30px;
					border-radius: 50%;
					margin: 5px;
				}

				text {
					font-weight: 700;
					color: #000;
				}
			}

			.text {
				color: #666;
				font-size: 14px;
				font-weight: 400;
				height: 20px;
				line-height: 20px;
				margin: auto;
				text-align: center;
			}

			.tip {
				font-size: 12px;
			}
		}

		.qiye-wechat-msg {
			background: #fff;
			margin-top: 10px;
			padding: 17.5px 15px 20.5px;

			.title {
				color: #333;
				font-size: 14px;
				font-weight: 600;
				height: 25px;
				line-height: 25px;
			}

			.operation-guide {
				color: #5241ff;
				font-size: 16px;
				font-weight: 400;
				height: 22.5px;
				line-height: 22.5px;
				margin: 10px 0 5px;
			}

			.server-link {
				color: #666;
				font-size: 16px;
				font-weight: 400;
				height: 22.5px;
				line-height: 22.5px;

				.link {
					color: #5241ff;
				}
			}
		}
	}

	::-webkit-scrollbar {
		display: none;
	}

	.notice-popup {
		width: 325px;
		height: 500px;
		display: flex;
		flex-direction: column;
		padding: 0 25px;

		.title {
			color: #333;
			font-size: 18px;
			font-weight: 600;
			height: 25px;
			line-height: 25px;
			margin: 18px 0;
			text-align: center;
		}

		.ruler-content {
			flex: 1;
			font-family: PingFangSC-Semibold, PingFang SC;
			overflow: scroll;

			.detail {
				margin-bottom: 25px;

				.small-title {
					color: #333;
					font-size: 14px;
					font-weight: 600;
					height: 20px;
					line-height: 20px;
				}

				.detail-content {
					color: #666;
					font-size: 14px;
					margin-top: 10px;
				}
			}
		}

		.btn-back {
			padding: 10px 0;

			.btn {
				background: #5241ff;
				border-radius: 5px;
				color: #fff;
				font-size: 16px;
				height: 44px;
				line-height: 44px;
				text-align: center;
				width: 100%;
			}
		}
	}
</style>
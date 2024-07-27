<template>
	<div class="notice-wechat">
		<nav-bar>接受消息的微信</nav-bar>
		<div class="receive-msg-wechat">
			<div class="send-msg-style">
				<span class="title">消息推送方式</span>
				<span class="title ruler" @click="noticeTips = !noticeTips">规则说明</span>
			</div>

			<div class="public-msg">
				<div class="switch">
					<span class="text">公众号消息</span>
				</div>
				<div class="qrcode-wrapper">
					<img src="@/assets/img/icons/Official-Accounts.jpg" alt="" />
				</div>
				<div class="is-bind-wechat">
					<img src="@/assets/image/other/succss.png" alt="" class="choose-img" />
					<span class="span-text">第一步：关注公众号</span>
					<!-- <div class="text">如需修改已绑定的微信，请扫码重新绑定</div> -->
				</div>
			</div>

			<div class="public-msg">
				<!-- <div class="switch">
                <span class="text">公众号消息</span>
                <van-switch v-model="wechat" size="26px" active-color="#4cd964" />
            </div> -->
				<div class="qrcode-wrapper qrcode-img">
					<!-- <create-qs  imgWidth="180" v-if="qsUrl"/> -->
					<!-- :logoSrc="dataObj.logo"  -->
					<!-- :qsData="qsUrl" -->
					<vue-qr ref="Qrcode" :text="qsUrl" qid="testQrId"> </vue-qr>
					<!-- :callback="test"  -->
				</div>
				<div class="is-bind-wechat">
					<img src="@/assets/image/other/succss.png" alt="" class="choose-img" />
					<span class="span-text">第二步：绑定接收消息微信</span>
				</div>
				<div class="text-wapper">
					<p class="span-text" v-show="wechatSet.acount">
						微信已设置—<img :src="wechatSet.img" alt="" /><span>{{
              wechatSet.nickName
            }}</span>
						<span v-show="wechatSet.acount > 1">等{{ wechatSet.acount }}个微信</span>
					</p>
					<div class="text">如需修改已绑定的微信，请扫码重新绑定</div>
					<div class="text tip">(修改后，记得刷新一下哟~)</div>
				</div>
			</div>

			<!-- <div class="qiye-wechat-msg">
            <div class="title">企业微信消息</div> 
            <div class="operation-guide">企业微信端绑定微信：操作指引 &gt;&gt;</div> 
            <div class="server-link"><span>若需查询已绑定的微信，请</span> 
            <span class="link">联系客服</span></div>
        </div> -->
		</div>
		<van-popup v-model="noticeTips">
			<div class="noticeTips">
				<div class="title">消息推送方式</div>
				<div class="ruler-content">
					<div class="detail">
						<div class="small-title">1. 推送优先级</div>
						<div class="detail-content">
							(1）若未开启 “公众号消息” 开关，或者
							开启了“公众号消息开关”、但公众号端未绑定微信的，则系统默认使用企业微信进行消息推送。
						</div>
						<div class="detail-content">
							(2）若开启了 “公众号消息”
							开关、且绑定了微信的，则将会优先使用公众号进行推送。对于部分不支持公众号推送的消息，仍会通过企业微信消息进行推送。
						</div>
					</div>
					<div class="detail">
						<div class="small-title">2. 公众号消息</div>
						<div class="detail-content">
							(1）“公众号消息”是指通过 “新零售V3商户平台”公众号推送消息。
						</div>
						<div class="detail-content">
							(2）如果开启了“公众号消息”开关，并且成功绑定了微信的，那么，当前账号相关的消息通知（离线消息、故障消息、时段概况收益、流量控制等）将会通过
							“新零售V3商户平台”公众号推送给已绑定的微信。请确保正常关注该公众号，否则将无法正常通过公众号接收消息。
						</div>
						<div class="detail-content">(3）同一个微信支持绑定多个账号。</div>
					</div>
					<!-- <div class="detail">
                    <div class="small-title">3. 企业微信消息 </div> 
                    <div class="detail-content">(1）“企业微信消息” 是指通过企业微信推送消息。</div> 
                    <div class="detail-content">(2）如果在企业微信端成功绑定了微信的，那么，根据“推送优先级”的规则，当前账号下、符合条件的消息将会通过 “企业微信” 推送给已绑定的微信。</div> 
                    <div class="detail-content">(3）同一个微信仅支持绑定一个账号。</div>
                </div> -->
				</div>
				<div class="btn-back" @click="noticeTips = !noticeTips">
					<div class="btn">知道了</div>
				</div>
			</div>
		</van-popup>
	</div>
</template>

<script>
	// 二维码组件
	import VueQr from "vue-qr";
	import {
		getCustomerQR,
		getWechatInform
	} from "@/utils/api/service";
	export default {
		name: "noticeWechat",
		components: {
			VueQr
		},
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
			};
		},
		async created() {
			let commercialNumber = JSON.parse(localStorage.getItem("commercialNumber"));
			//推送客服
			let res = await getWechatInform({
				commercialNumber
			});
			if (res.data.data.length) {
				this.wechatSet.nickName = res.data.data[0].nickName;
				this.wechatSet.img = res.data.data[0].img;
				this.wechatSet.acount = res.data.data.length;
			}
			this.getOfficial();
		},
		methods: {
			async getOfficial() {
				let commercialNumber = JSON.parse(
					localStorage.getItem("commercialNumber")
				);
				// this.qsUrl = `https://bv3.ztuwl.com/GZH/?commercialNumber=${commercialNumber}`;
				this.qsUrl = `https://mv3.ztuwl.com/GZH/?commercialNumber=${commercialNumber}`;
				// let res = await getCustomerQR({commercialNumber});
				// if(res.data.code == 0 || res.data.msg == 'ok'){
				//     if(res.data.data){
				//         this.qsUrl = res.data.data
				//         // https://bv3.ztuwl.com/GZH/?commercialNumber=ZTWL_202204141613
				//         // https://mv3.ztuwl.com/GZH/?commercialNumber=ZTWL_202204141613
				//     }
				// }
			},
		},
	};
</script>

<style lang="less" scoped>
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

				img {
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

			.span-text {
				color: #666;
				display: inline-block;
				font-size: 16px;
				display: flex;
				align-items: center;
				justify-content: center;

				img {
					width: 30px;
					height: 30px;
					border-radius: 50%;
					margin: 5px;
				}

				span {
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

	.noticeTips {
		width: 275px;
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
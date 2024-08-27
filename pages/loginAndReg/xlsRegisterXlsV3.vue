<template>
	<view class="xls-register">
		<view class="item-style">
			<view class="title">语言</view>
			<view class="main">中文</view>
			<u-icon name="arrow-right" size="36" color="#b4b4b4" />
		</view>

		<view class="item-style margin24">
			<view class="title">经营范围</view>
			<view class="main" @click="show = !show">{{ homeLocation}}</view>
			<u-icon name="arrow-right" size="36" color="#b4b4b4" />
		</view>
		
		<view class="item-style">
			<view class="title">昵称</view>
			<input class="main" type="text" placeholder="请输入昵称" maxlength="10" v-model="loginInfo.nickName" />
		</view>
		<view class="item-style">
			<view class="title">手机号归属地</view>
			<view class="main" @click="show = !show">{{ homeLocation}}</view>
			<u-icon name="arrow-right" size="36" color="#b4b4b4" />
		</view>

		<view class="item-style center">
			<view class="option">
				<span>手机号</span><input type="text" placeholder="请输入手机号" maxlength="11" v-model="loginInfo.username"
					@input="isShade = loginInfo.username == ''" />
			</view>
		</view>

		<view class="item-style center">
			<view class="option">
				<span>图片验证码</span>
				<view class="code">
					<input type="text" placeholder="请输入图形验证码" maxlength="5" v-model="ranCode"
						style="padding-right: 12px" />
					<!--    图形验证码    -->
					<view><ran-code @getRancode="getRancode" /></view>
				</view>
			</view>
		</view>

		<view class="item-style center">
			<view class="option">
				<span>验证码</span>
				<view class="code">
					<input type="text" placeholder="请输入验证码" maxlength="6" v-model="ranCodeNumber" />
					<view class="btnStyle" :class="{'shade':isShade}" @click="getCode">
						{{flag ? '获取验证码' : `${second} S`}}
					</view>
				</view>
			</view>
		</view>

		<view class="item-style center position">
			<view class="option">
				<span>密码</span><input type="text" placeholder="请输入密码" v-model="loginInfo.password" />
			</view>
		</view>

		<view class="item-style center">
			<view class="option">
				<span>确认密码</span><input type="text" placeholder="确认密码" v-model="loginInfo.finalPassword" />
			</view>
		</view>

		<view class="text">
			<router-link to="/login">
				<view class="txt">已有账号?直接登录>></view>
			</router-link>
		</view>

		<view class="btnCon center">
			<view class="btn center" @click="registerUser">提交</view>
		</view>
		<!-- popup -->
		<u-popup :show="show" position="bottom">
			<view>
				<view class="topTitle">经营范围</view>
				<view class="itemCon center" v-for="item in titleList" :key="item.id" @click="changChoose(item)">
					<view class="item">
						<span>{{ item.title }}</span><u-icon name="success" size="20"
							:style="item.id == number ? { color: '#5241FF' } : ''" v-show="item.id == number" />
					</view>
				</view>
			</view>
		</u-popup>
		<u-popup :show="showNotice" position="bottom" :style="{ height: '65%' }" round :close-on-click-overlay="false">
			<view class="u-pop home-family">
				<view class="u-content">
					<view class="pop-title"><span>请阅读以下内容</span></view>

					<view class="box-noitem">
						<view class="popitemC" v-for="item in noticeList" :key="item.id">
							<view class="itemNotice">
								<view class="vertical">
									<view class="notice" @click="showCheck = !showCheck">
										<image :src="`${$baseUrl}appV4/login_image/check.png`" alt="" class="position"
											v-show="showCheck" mode="widthFix" />
									</view>
									<span>{{ item.title }}</span>
								</view>
								<view>
									<image :src="`${$baseUrl}appV4/login_image/attention.png`" alt="" mode="widthFix" />
								</view>
							</view>
							<view class="underLine"></view>
						</view>
					</view>

					<view class="btnPop">
						<view class="mainPop">
							<view class="txtPop disagree" @click="$router.back()">取消</view>
							<view class="txtPop agree" @click="showNotice = !showNotice">
								确定
							</view>
						</view>
					</view>

					<view class="bottomTxt">
						<view class="leftImg">
							<view class="minB" @click="showCheck = !showCheck">
								<image :src="`${$baseUrl}appV4/login_image/check.png`" alt="" v-show="showCheck" />
							</view>
						</view>
						<view class="rightTxt" @click="goDetail">
							<p><span>我已阅读并同意</span>《服务协议》</p>
							<p>《隐私协议》《增值服务协议》</p>
							<p>《渠道支付服务协议》</p>
						</view>
					</view>
				</view>
			</view>
		</u-popup>
		<!-- 条例 -->
		<u-popup :show="showNodetail" round :close-on-click-overlay="false">
			<view class="con home-family">
				<view class="mainCon">
					<view class="txtDetail" @scroll="noticeScroll($event)">
						<view class="title">《服务协议》</view>
						<p>
							本协议是由您（以下简称“甲方”）与广州中土信息科技有限责任公司（以下简称“乙方”）就甲方使用乙方提供的系统服务事项所订立的有效合约。
							请务必认真阅读并充分理解本协议全部内容，如甲方按照乙方平台注册程序进行注册并使用乙方系统服务或甲方将拟使用乙方服务的新自助设备绑定至甲方已有账户名下的
							，注册程序或新设备绑定完成时即视为甲方已经充分理解和同意本协议全部内容，并签署了本协议，本协议已产生合同法律效力，甲方使用乙方服务的全部活动将受到本协议的约束并应承担相应的责任和义务。
							乙方有权随时对本协议内容进行修改，并在乙方系统平台界面公告的方式予以公布；若甲方在乙方公告本协议内容变更后继续使用乙方服务的，表示甲方已充分阅读、理解并接受修改后的协议内容；
							若甲方不同意修改后的协议内容，应停止继续使用乙方系统服务。
						</p>
						<view class="title">《隐私协议》</view>
						<p>
							本协议是由您（以下简称“甲方”）与广州中土信息科技有限责任公司（以下简称“乙方”）就甲方使用乙方提供的系统服务事项所订立的有效合约。
							请务必认真阅读并充分理解本协议全部内容，如甲方按照乙方平台注册程序进行注册并使用乙方系统服务或甲方将拟使用乙方服务的新自助设备绑定至甲方已有账户名下的
							，注册程序或新设备绑定完成时即视为甲方已经充分理解和同意本协议全部内容，并签署了本协议，本协议已产生合同法律效力，甲方使用乙方服务的全部活动将受到本协议的约束并应承担相应的责任和义务。
							乙方有权随时对本协议内容进行修改，并在乙方系统平台界面公告的方式予以公布；若甲方在乙方公告本协议内容变更后继续使用乙方服务的，表示甲方已充分阅读、理解并接受修改后的协议内容；
							若甲方不同意修改后的协议内容，应停止继续使用乙方系统服务。
						</p>
						<view class="title">《增值服务协议》</view>
						<p>
							本协议是由您（以下简称“甲方”）与广州中土信息科技有限责任公司（以下简称“乙方”）就甲方使用乙方提供的系统服务事项所订立的有效合约。
							请务必认真阅读并充分理解本协议全部内容，如甲方按照乙方平台注册程序进行注册并使用乙方系统服务或甲方将拟使用乙方服务的新自助设备绑定至甲方已有账户名下的
							，注册程序或新设备绑定完成时即视为甲方已经充分理解和同意本协议全部内容，并签署了本协议，本协议已产生合同法律效力，甲方使用乙方服务的全部活动将受到本协议的约束并应承担相应的责任和义务。
							乙方有权随时对本协议内容进行修改，并在乙方系统平台界面公告的方式予以公布；若甲方在乙方公告本协议内容变更后继续使用乙方服务的，表示甲方已充分阅读、理解并接受修改后的协议内容；
							若甲方不同意修改后的协议内容，应停止继续使用乙方系统服务。
						</p>
						<view class="title">《渠道支付服务协议》</view>
						<p>
							本协议是由您（以下简称“甲方”）与广州中土信息科技有限责任公司（以下简称“乙方”）就甲方使用乙方提供的系统服务事项所订立的有效合约。
							请务必认真阅读并充分理解本协议全部内容，如甲方按照乙方平台注册程序进行注册并使用乙方系统服务或甲方将拟使用乙方服务的新自助设备绑定至甲方已有账户名下的
							，注册程序或新设备绑定完成时即视为甲方已经充分理解和同意本协议全部内容，并签署了本协议，本协议已产生合同法律效力，甲方使用乙方服务的全部活动将受到本协议的约束并应承担相应的责任和义务。
							乙方有权随时对本协议内容进行修改，并在乙方系统平台界面公告的方式予以公布；若甲方在乙方公告本协议内容变更后继续使用乙方服务的，表示甲方已充分阅读、理解并接受修改后的协议内容；
							若甲方不同意修改后的协议内容，应停止继续使用乙方系统服务。
						</p>
					</view>
					<view class="bottomTxt">
						<view class="leftImg">
							<view class="minB">
								<image :src="`${$baseUrl}appV4/login_image/check.png`" alt="" mode="widthFix"
									v-show="showCheck" />
							</view>
						</view>
						<view class="rightTxt">
							<p><span>我已阅读并同意</span>《服务协议》《隐私协议》</p>
							<p>《增值服务协议》《渠道支付服务协议》</p>
						</view>
					</view>
				</view>
				<view class="btnBottom">
					<view @click="goDetail">返回</view>
					<view @click="showNodetail = !showNodetail">确定</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	// import RanCode from "./registerComps/ranCode";
	// import AuthCode from "./registerComps/authCode";
	// import axios from "axios";
	import md5 from "js-md5";
	// import {
	// 	checkIsTelphoneStrict
	// } from "@/plugins/formUtils";
	// import {
	// 	getSendNote
	// } from "@/utils/otherRequest/modules";
	export default {
		// components: {
		// 	RanCode,
		// 	AuthCode,
		// },
		data() {
			return {
				changColor: "",
				isShade: false,
				show: false,
				showNotice: false,
				showCheck: false,
				showNodetail: false,
				titleList: [{
						id: 0,
						title: "中国大陆"
					},
					{
						id: 1,
						title: "马来西亚"
					},
				],
				number: 0,
				homeLocation: "中国大陆",
				noticeList: [{
						id: 0,
						title: "服务协议"
					},
					{
						id: 1,
						title: "隐私协议"
					},
					{
						id: 2,
						title: "增值服务协议"
					},
					{
						id: 3,
						title: "渠道支付服务协议"
					},
				],
				//-----//
				loginInfo: {
					nickName: "",
					username: "",
					password: "",
					finalPassword: "",
				},
				ranCode: "",
				getRancodeValue: "",
				ranCodeNumber: "",
				//
				second: 60,
				flag: true, // 验证码无效？
				timer: null, // 该变量是用来记录定时器的,防止点击的时候触发多个setInterval
			};
		},
		created() {
			this.judgeCode();
		},
		methods: {
			/**************短信验证********************/
			async getCode() {
				let that = this;
				if (!that.loginInfo.username) {
					return this.$toast("请输入手机号");
				}
				// if (!checkIsTelphoneStrict(that.loginInfo.username)) {
				//   return this.$toast("请输入正确的手机号");
				// }
				if (that.loginInfo.username.length != 11) {
					return this.$toast("请输入正确的手机号");
				}
				if (!this.ranCode) {
					return this.$toast("请输入图形验证码~");
				}
				if (this.ranCode.toLowerCase() != this.getRancodeValue.toLowerCase()) {
					return this.$toast("图形验证码填写有误！！");
				}
				if (that.flag) {
					let res = await getSendNote({
						phone: that.loginInfo.username,
					});
					if (res.data.code == 0 || res.data.msg == "ok") {
						this.$toast("短信发送成功");
					} else {
						return;
					}
					that.flag = false;
					let interval = window.setInterval(function() {
						that.setStorage(that.second);
						if (that.second-- <= 0) {
							that.second = 60;
							that.flag = true;
							window.clearInterval(interval);
						}
					}, 1000);
				} else {
					that.$toast("验证码还在有效时间内");
				}
			},

			setStorage(parm) {
				localStorage.setItem("dalay", parm);
				localStorage.setItem("_time", new Date().getTime());
			},

			getStorage() {
				let localDelay = {};
				localDelay.delay = localStorage.getItem("dalay");
				localDelay.sec = localStorage.getItem("_time");
				return localDelay;
			},

			judgeCode() {
				let that = this;
				let localDelay = that.getStorage();
				let secTime = parseInt((new Date().getTime() - localDelay.sec) / 1000);
				if (secTime > localDelay.delay) {
					that.flag = true;

					// this.isShade = true;
					// this.showNotice = true;
				} else {
					// this.showNotice = false;
					// this.isShade = false;

					that.flag = false;
					let _delay = localDelay.delay - secTime;
					that.second = _delay;
					that.timer = window.setInterval(function() {
						if (_delay > 1) {
							_delay--;
							that.setStorage(_delay);
							that.second = _delay;
							that.flag = false;
						} else {
							// 此处赋值时为了让浏览器打开的时候,直接就显示剩余的时间
							that.flag = true;
							window.clearInterval(that.timer);
						}
					}, 1000);
				}
			},
			/**************短信验证********************/
			changChoose(item) {
				this.number = item.id;
				this.homeLocation = item.title;
				this.show = false;
			},
			goDetail() {
				this.showNotice = !this.showNotice;
				this.showNodetail = !this.showNodetail;
			},
			noticeScroll($event) {
				if (
					$event.srcElement.scrollHeight - $event.target.scrollTop ==
					$event.target.offsetHeight
				) {}
			},
			//**************注册**************//
			getRancode(ran) {
				this.getRancodeValue = ran;
			},
			async registerUser() {
				if (!this.loginInfo.nickName) {
					return this.$toast("请输入昵称~");
				}
				if (!this.loginInfo.username) {
					return this.$toast("请输入手机号~");
				}
				if (!this.ranCode) {
					return this.$toast("请输入图形验证码~");
				}
				if (this.ranCode.toLowerCase() != this.getRancodeValue.toLowerCase()) {
					return this.$toast("图形验证码有误！！");
				}
				if (!this.ranCodeNumber) {
					return this.$toast("请输入短信验证码~");
				}
				if (!this.loginInfo.finalPassword || !this.loginInfo.password) {
					return this.$toast("请输入密码~");
				}
				if (this.loginInfo.finalPassword !== this.loginInfo.password) {
					return this.$toast("前后输入密码不一致~");
				}

				let res = await axios({
					url: "/xls-login/Login/registerSelf",
					// url: "http://192.168.8.90:10020/Login/registerSelf",
					method: "post",
					headers: {
						"Content-Type": "application/json",
					},
					data: {
						nickName: this.loginInfo.nickName,
						username: this.loginInfo.username,
						password: md5(this.loginInfo.password),
						oldPassword: md5(this.loginInfo.finalPassword),
						code: this.ranCodeNumber,
					},
				});
				if (res.data.code == 0 || res.data.msg == "ok") {
					this.$toast("注册成功~");
					this.$router.replace("/login");
				} else if (res.data.msg) {
					return this.$toast(res.data.msg);
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.xls-register {
		width: 100%;
		font-family: PingFangSC-Regular, PingFang SC;
	}

	.item-style {
		border-bottom: 2rpx solid rgba(243, 241, 241, 0.5);
		background: #fff;
		@include center-flex();
		padding: 24rpx 12rpx 24rpx 24rpx;
		font-size: 32rpx;

		.main {
			flex: 1;
			text-align: right;
			padding: 0 20rpx;
		}

		.option {
			padding: 24rpx;
			height: 50px;
			width: 100%;
			display: flex;
			align-items: center;
			font-size: 16px;

			.code {
				display: flex;
				position: relative;
				flex: 1;
				justify-content: flex-end;
				align-items: center;

				.btnStyle {
					margin-left: 2%;
					position: relative;
					height: 30px;
					width: 94px;
					border-radius: 8px;
					background: #5241ff;
					font-size: 14px;
					font-weight: 400;
					line-height: 30px;
					color: #fff;
					text-align: center;
				}

				.shade {
					opacity: 0.5;
				}
			}

			input[type="text"] {
				text-align: right;
				font-size: 15px;
				height: 25px;
				// width: 60%;
				border: rgb(255, 255, 255) 1px solid;
				appearance: none;
				-moz-appearance: none;
				outline: 0; //镂空
				text-decoration: none;
			}
		}
	}
	
	
	.margin24 {
		margin-bottom: 24rpx;
	}

	.text {
		width: 95%;
		height: 39px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: flex-end;

		.txt {
			width: 100%;
			height: 19px;
			text-align: right;
			font-size: 14px;
			font-weight: 500;
			color: #5241ff;
		}
	}

	.btnCon {
		height: 64px;
		width: 100%;

		.btn {
			height: 44px;
			width: 95%;
			background: #5241ff;
			border-radius: 8px;
			font-size: 18px;
			font-weight: 500;
			color: #fff;
		}
	}

	.topTitle {
		height: 45px;
		width: 100%;
		text-align: center;
		line-height: 45px;
		font-weight: 500;
		font-size: 16px;
		border-bottom: 1px solid rgb(230, 227, 227);
	}

	.itemCon {
		height: 50px;
		border-bottom: 1px solid rgb(230, 227, 227);

		.item {
			width: 95%;
			font-size: 15px;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
	}

	.u-pop {
		height: 100%;
		width: 100%;

		.u-content {
			width: 90%;
			margin: 0 auto;

			.pop-title {
				height: 62px;
				border-bottom: 1px solid rgb(240, 237, 237);

				span {
					font-size: 16px;
					font-weight: 500;
					position: relative;
					top: 45%;
				}
			}

			.box-noitem {
				height: 180px;
				width: 100%;
				overflow-y: scroll;
			}

			.popitemC {
				width: 100%;
				height: 60px;
				border-bottom: 1px solid rgb(240, 237, 237);

				.underLine {
					height: 1px;
					width: 90%;
					background: rgb(240, 237, 237);
					float: right;
				}

				.itemNotice {
					height: 59px;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.vertical {
						display: flex;
						align-items: center;
						position: relative;
					}

					img {
						height: 24px;
						width: 24px;
					}

					.notice {
						display: inline-block;
						height: 22px;
						width: 22px;
						border: 1px solid rgb(194, 189, 189);
						border-radius: 50%;
						position: relative;

						.position {
							position: absolute;
							top: -1px;
							left: -1px;
						}
					}

					span {
						font-size: 15px;
						position: relative;
						left: 8%;
					}
				}
			}

			.btnPop {
				height: 100px;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;

				.mainPop {
					height: 40px;
					width: 70%;
					display: flex;
					justify-content: space-between;

					.txtPop {
						width: 45%;
						text-align: center;
						line-height: 40px;
						font-size: 15px;
						font-weight: 400;
						border-radius: 8px;
					}

					.disagree {
						background: #f1f3f2;
						color: #06c060;
					}

					.agree {
						background: #06c060;
						color: #fff;
					}
				}
			}

			.bottomTxt {
				height: 60px;
				display: flex;
				justify-content: center;

				.leftImg {
					width: 8%;

					.minB {
						width: 14px;
						height: 14px;
						border-radius: 50%;
						border: 1px solid rgb(194, 189, 189);

						img {
							width: 15px;
							height: 15px;
						}
					}
				}

				.rightTxt {
					font-size: 12px;
					color: rgb(35, 127, 202);

					p {
						margin: 0;
					}

					span {
						color: #999;
					}
				}
			}
		}
	}

	.con {
		height: 480px;
		width: 320px;
		background: #fff;

		.mainCon {
			width: 280px;
			margin: 0 auto;

			.txtDetail {
				height: 380px;
				width: 100%;
				overflow-y: scroll;
				font-size: 13px;
				font-weight: 400;
				line-height: 20px;
				text-align: left;
				color: #3e3e40;
				margin-top: 6px;

				.title {
					height: 46px;
					width: 100%;
					font-size: 18px;
					font-weight: 700;
					background: #fff;
					text-align: center;
					line-height: 50px;
					position: sticky;
					top: 0;
				}
			}

			.bottomTxt {
				height: 40px;
				display: flex;
				justify-content: center;
				margin-top: 6px;

				.leftImg {
					width: 8%;

					.minB {
						width: 14px;
						height: 14px;
						border-radius: 50%;
						border: 1px solid rgb(194, 189, 189);

						img {
							width: 15px;
							height: 15px;
						}
					}
				}

				.rightTxt {
					font-size: 12px;
					color: rgb(35, 127, 202);

					p {
						margin: 0;
					}

					span {
						color: #999;
					}
				}
			}
		}

		.btnBottom {
			height: 53px;
			border-top: 1px solid rgb(219, 215, 215);
			font-size: 18px;
			font-weight: 700;
			display: flex;
			text-align: center;
			line-height: 53px;

			:nth-child(1) {
				width: 50%;
				border-right: 1px solid rgb(219, 215, 215);
			}

			:nth-child(2) {
				width: 50%;
				color: #576b95;
			}
		}
	}
</style>
<template>
	<view class="change-phone-wrapper">
		<xls-jy-navbar title="修改登录手机号"></xls-jy-navbar>
		<view class="header-wrapper">
			<u-steps :current="active" activeColor="#5241ff">
				<u-steps-item title="步骤一"></u-steps-item>
				<u-steps-item title="步骤二"></u-steps-item>
			</u-steps>
			<view class="header">
				<u-icon name="info-circle" color="#5241ff" size="40" />
				<span>为确保是您本人操作，请按步骤完成验证</span>
			</view>
		</view>
		<view class="main-wrapper" v-if="active == 0">
			<view class="option">
				<span>现手机号</span>
				<view class="code">
					{{ hidePhone() }}
				</view>
			</view>

			<view class="option">
				<span>图形验证码</span>
				<view class="code">
					<input type="text" placeholder="请输入图形验证码" maxlength="5" @input="isShade = ranCode == ''"
						v-model="ranCode" style="padding-right: 12px" />
					<view><xls-ran-code @getRancode="getRancode" /></view>
				</view>
			</view>

			<view class="option">
				<span>验证码(一)</span>
				<view class="code">
					<input type="text" placeholder="请输入验证码" maxlength="6" v-model="ranCodeNumber" />
					<view class="btnStyle" 
						:class="{'shade':isShade}" 
						@click="getCode(userPhone)">
						{{flag ? '获取验证码' : `${second} S`}}
					</view>
				</view>
			</view>
		</view>

		<view class="main-wrapper" v-if="active == 1">
			<view class="option">
				<span>改手机号</span><input type="text" placeholder="请输入修改后手机号" maxlength="11" v-model="username" />
			</view>

			<view class="option">
				<span>图形验证码</span>
				<view class="code">
					<input type="text" placeholder="请输入图形验证码" maxlength="5" @input="isShade = ranCode == ''"
						v-model="ranCode" style="padding-right: 12px" />
					<view>
						<xls-ran-code @getRancode="getRancode" ref="ranCode" v-if="active == 1" />
					</view>
				</view>
			</view>

			<view class="option">
				<span>验证码(二)</span>
				<view class="code">
					<input type="text" placeholder="请输入验证码" maxlength="6" v-model="ranCodeNumberTwo" />
					<view class="btnStyle" 
						:class="{'shade':isShade}" 
						@click="getCode(username)">
						{{flag ? '获取验证码' : `${second} S`}}
					</view>
				</view>
			</view>
		</view>

		<view class="button-wrapper">
			<view class="btn" @click="confirmMethod">
				{{ active == 0 ? "下一步" : "确定" }}
			</view>
			<span class="tip">温馨提示：每个月只能修改一次</span>
		</view>
		<view class="text">如遇到问题请联系管理员</view>
	</view>
</template>

<script>
	import md5 from "js-md5";
	import { getInfo } from "@/common/auth";
	import {
		loginAndRegController
	} from "@/api/index.js";
	import cache from '@/common/cache.js';
	
	export default {
		data() {
			return {
				active: 0,
				isShade: true,
				ranCode: "",
				getRancodeValue: "",
				ranCodeNumber: "",
				ranCodeNumberTwo: "",
				username: "",
				second: 60,
				flag: true,
				timer: null,
				userPhone: "",
			};
		},
		onLoad() {
			const {userPhone} = getInfo();
			this.userPhone = userPhone;
			this.judgeCode();
		},
		methods: {
			// 隐藏字符
			hidePhone() {
				return this.hideCode(this.userPhone, 3, 4);
			},
			hideCode(str, frontLen, endLen) {
			    var len = str.length - frontLen - endLen;
			    var xing = '';
			    for (var i = 0; i < len; i++) {
			        xing += '*';
			    }
			    return str.substring(0, frontLen) + xing + str.substring(str.length - endLen);
			},
			// 图形验证码
			getRancode(code) {
				console.log("收到图形验证码", code);
				this.getRancodeValue = code;
			},
			async confirmMethod() {
				if (this.active == 0) {
					return this.nextMethod();
				}
				if (!this.username) {
					return this.$toast("请输入您要修改的手机号");
				}
				if (this.username.length != 11) {
					return this.$toast("请输入正确的修改手机号");
				}
				let result = await loginAndRegController.inspectCode({
					username: this.username,
					code: this.ranCodeNumberTwo,
				});
				if (result.code != 200) {
					return this.$toast("短信验证码校验错误");
				}
				let res = await loginAndRegController.updateUserName({
					code: this.ranCodeNumber,
					username: this.username,
					newCode: this.ranCodeNumberTwo,
				});
				if (res.code == 200) {
					this.$toast("修改成功~");
					uni.reLaunch({
						url: '/'
					});
				}
			},
			async nextMethod() {
				if (!this.ranCodeNumber) {
					return this.$toast("请输入短信验证码~");
				}
				let res = await loginAndRegController.inspectCode({
					username: this.userPhone,
					code: this.ranCodeNumber,
				});
				if (res.code == 200) {
					this.ranCode = "";
					this.removeStorage();
					this.active = 1;
				} else {
					return this.$toast("短信验证码校验错误");
				}
			},
			// 获取短信验证码
			async getCode(phone) {
				let that = this;
				if (!this.ranCode) {
					return this.$toast("请输入图形验证码~");
				}
				console.log(
					this.ranCode.toLowerCase(),
					this.getRancodeValue.toLowerCase()
				);
				if (this.ranCode.toLowerCase() != this.getRancodeValue.toLowerCase()) {
					return this.$toast("图形验证码填写有误！！");
				}
				if (that.flag) {
					let res = await loginAndRegController.getCode({phone});
					if (res.code == 200) {
						this.$toast("短信发送成功");
					} else {
						return;
					}
					that.flag = false;
					that.second = 60;
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
				cache.setCache("dalay", parm);
				cache.setCache("_time", new Date().getTime());
			},
			getStorage() {
				let localDelay = {};
				localDelay.delay = cache.getCache("dalay");
				localDelay.sec = cache.getCache("_time");
				return localDelay;
			},
			removeStorage() {
				this.flag = true;
				this.isShade = true;
				this.second = 60;
				cache.removeCache("dalay");
				cache.removeCache("_time");
			},
			judgeCode() {
				let that = this;
				let localDelay = that.getStorage();
				let secTime = parseInt((new Date().getTime() - localDelay.sec) / 1000);
				if (secTime > localDelay.delay) {
					that.flag = true;
					this.isShade = true;
				} else {
					this.isShade = false;
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
							that.flag = true;
							that.isShade = that.ranCode == "";
							window.clearInterval(that.timer);
						}
					}, 1000);
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	
	.header-wrapper {
		background: #fff;
		margin: 0 10px 12px;
		border-radius: 8px;
		padding: 10px;
	}

	.change-phone-wrapper {
		width: 100%;
		height: 100vh;
		background: #f5f6f7;
		position: relative;

		.header {
			display: flex;
			align-items: center;
			padding: 10px 10px 20px;
			font-size: 15px;

			span {
				color: #8c8c8c;
				margin-left: 10px;
			}
		}

		.main-wrapper {
			margin: 0 10px;
			border-radius: 8px;
			overflow: hidden;
			background: #fff;
		}

		.option {
			padding: 0 10px;
			line-height: 56px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 16px;

			span {
				white-space: nowrap;
			}

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
				line-height: 40px;
				border: #ffffff 1px solid;
				appearance: none;
				-moz-appearance: none;
				outline: 0; //镂空
				text-decoration: none;
			}
		}

		.option:not(:last-child) {
			border-bottom: 1px solid rgba(243, 241, 241, 0.5);
		}

		.button-wrapper {
			margin: 0 10px;
			text-align: center;

			.btn {
				line-height: 50px;
				background: #5241ff;
				color: #fff;
				font-size: 18px;
				border-radius: 10px;
				margin: 28px 0 10px;
			}

			.tip {
				font-size: 14px;
				color: #8c8c8c;
			}
		}

		.text {
			line-height: 30px;
			font-size: 12px;
			width: 100%;
			color: #8c8c8c;
			text-align: center;
			position: absolute;
			bottom: 0;
			left: 0;
		}
	}
</style>
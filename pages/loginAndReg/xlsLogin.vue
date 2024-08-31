<template>
	<view class="xls-login-wrapper">
		<view class="xls-header">
			<xls-image :src="`${$baseUrl}login_image/ztuwl-logo.png`" mode="widthFix" class="xls-image"></xls-image>
		</view>

		<view class="xls-main-content">
			<view class="xls-title">商家后台登录</view>
			<form action="#">
				<input type="text" v-model="login.username" placeholder="请输入账号">
				<input type="password" v-model="login.password" placeholder="请输入密码">
				<view class="xls-remember-style">
					<text>记住密码？</text>
					<checkbox-group @change="changeMethod">
						<checkbox value="remember" :checked="rememberNb" style="transform:scale(0.8)" />
					</checkbox-group>
				</view>

				<!-- <button class="xls-botton-style" @click="loginMethod">登录</button> -->
				<u-button type="primary" :loading="loginSwitch" color="#5241ff"
					:disabled="loginSwitch" loadingText="加载中" text="登录" loadingSize="30"
					@click="loginMethod"></u-button>
					
			</form>
			<view class="xls-register-wrapper" @click="goTo">
				<xls-image :src="`${$baseUrl}login_image/register.png`" alt="" class="image"
					mode="widthFix" />
			</view>
		</view>
	</view>
</template>

<script>
	import {
		loginAndRegController
	} from '@/api/index.js';
	import {
		getLoginInfo,
		setLoginInfo
	} from "@/common/auth.js";
	import md5 from "js-md5";
	export default {
		data() {
			return {
				login: {
					username: "19854573708",
					password: "123456"
				},
				rememberNb: true,
				loginSwitch: false,
			}
		},
		created() {
			this.getInfo();
		},
		methods: {
			changeMethod(event) {
				this.rememberNb = event.detail.value.includes('remember')
			},
			async loginMethod() {
				if (!this.login.username) {
					return uni.showToast({
						icon: "error",
						title: "请填写账号！"
					});
				}
				if (!this.login.password) {
					return uni.showToast({
						icon: "error",
						title: "请填写密码！"
					});
				}
				let params = {
					code: "",
					username: this.login.username,
					password: md5(this.login.password),
					uuid: ""
				}
				// this.$loading();
				this.loginSwitch = true;
				this.$store.dispatch('user/login', params).then(res => {
					this.loginSwitch = false;
					if(res.code === 200) {
						setTimeout(() =>{
							// this.setInfo();
							// this.$toast(this.$t('login.loginSuccess'), 2000);
							this.$goTab();
							// this.$hideLoading();
						}, 1000)
					}
				})
			},
			setInfo() {
				if (!this.rememberNb) {
					this.login.username = "";
					this.login.password = "";
					uni.removeStorageSync("at_username");
					uni.removeStorageSync("at_password");
					return
				}
				try {
					let info = {
						username: this.login.username,
						password: this.login.password,
						rememberNb: this.login.rememberNb
					}
					uni.setStorageSync("at_username", this.login.username);
					uni.setStorageSync("at_password", this.login.password);
				} catch (e) {
					// error
				}
			},
			getInfo() {
				try {
					// let info = getLoginInfo();
					// this.login.username = info.username;
					// this.login.password = info.password;
				} catch (e) {
					// error
				}
			},
			goTo() {
				this.$goTo('/pages/loginAndReg/xlsRegister')
			}

		}
	}
</script>

<style lang="scss" scoped>
	.xls-login-wrapper {
		height: 100vh;
		width: 100%;

		.xls-header {
			width: 100%;
			height: 32.5%;
			text-align: center;
			background: $xls-color-primary;
			display: flex;
			align-items: center;
			justify-content: center;

			.xls-image {
				width: 160rpx;
			}
		}

		.xls-main-content {
			width: 90%;
			height: 690rpx;
			padding: 40rpx;
			box-sizing: border-box;
			border-radius: 24rpx;
			position: relative;
			top: -100rpx;
			margin: 0 auto;
			background: #fff;
			box-shadow: 4rpx 6rpx 8rpx 6rpx rgba(98, 113, 186, 0.2);

			.xls-title {
				text-align: center;
				font-size: 40rpx;
				font-weight: 900;
				color: $xls-title-color-primary;
				margin-bottom: 40rpx;
				user-select: none;
			}

			input {
				line-height: 100rpx;
				height: 100rpx;
				border-bottom: 0.026667rem solid #ebedf0;
			}

			.xls-remember-style {
				padding: 20rpx 0;
				font-size: 24rpx;
				display: flex;
				align-items: center;
			}

			.xls-botton-style {
				margin-top: 40rpx;
				background: $xls-color-primary;
				color: #fff;
			}
		}

		.xls-register-wrapper {
			display: flex;

			.image {
				width: 200rpx;
				margin-top: 64rpx;
				margin-bottom: 24rpx;
			}
		}
	}
</style>
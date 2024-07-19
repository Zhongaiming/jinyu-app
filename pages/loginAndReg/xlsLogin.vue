<template>
	<view class="at-login-wrapper">
		<view class="at-header">
			<image :src="`${$baseUrl}login_image/ztuwl-logo.png`" mode="" class="at-image"></image>
		</view>

		<view class="at-main-content">
			<view class="at-title">商家后台登录</view>
			<form action="#">
				<input type="text" v-model="login.username" placeholder="请输入账号">
				<input type="password" v-model="login.password" placeholder="请输入密码">
				<view class="at-remember-style">
					<text>记住密码？</text>
					<checkbox-group @change="changeMethod">
						<checkbox value="remember" :checked="rememberNb" style="transform:scale(0.8)" />
					</checkbox-group>
				</view>

				<button class="at-botton-style" @click="loginMethod">登录</button>
			</form>
		</view>
	</view>
</template>

<script>
	import {
		loginController
	} from '@/api/index.js'
	import qs from "qs";
	import md5 from "js-md5";
	export default {
		data() {
			return {
				login: {
					username: "ztwl",
					password: "123456"
				},
				rememberNb: true,
			}
		},
		// created() {
		// 	this.getLoginInfo();
		// },
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
				this.$goTo('/pages/mainPackages/home/index', 'switchTab')
				return
				let data = qs.stringify({
					username: this.login.username,
					password: md5(this.login.password),
				});
				let res = await loginController.loginXls(data)
				if (res.code == 0 && res.msg == "ok") {
					uni.showToast({
						icon: "success",
						title: "登录成功！"
					})
					this.setLoginInfo();
					try {
						uni.setStorageSync("at_token", res.data.token);
						uni.setStorageSync("at_permissions", res.data.permissions);
					} catch (e) {
						// error
					}
					this.$goTo('/pages/mainPackages/home/index', 'switchTab')
				}
			},
			setLoginInfo() {
				if (!this.rememberNb) {
					this.login.username = "";
					this.login.password = "";
					uni.removeStorageSync("at_username");
					uni.removeStorageSync("at_password");
					return
				}
				try {
					uni.setStorageSync("at_username", this.login.username);
					uni.setStorageSync("at_password", this.login.password);
				} catch (e) {
					// error
				}
			},
			getLoginInfo() {
				try {
					this.login.username = uni.getStorageSync("at_username");
					this.login.password = uni.getStorageSync("at_password");
				} catch (e) {
					// error
				}
			},

		}
	}
</script>

<style lang="scss" scoped>
	.at-login-wrapper {
		height: 100vh;
		width: 100%;

		.at-header {
			width: 100%;
			height: 32.5%;
			text-align: center;
			background: $xls-color-primary;

			.at-image {
				margin-top: 12%;
				width: 160rpx;
				height: 160rpx;
			}
		}

		.at-main-content {
			width: 90%;
			padding: 40rpx;
			box-sizing: border-box;
			border-radius: 24rpx;
			position: relative;
			top: -100rpx;
			margin: 0 auto;
			background: #fff;
			box-shadow: 4rpx 6rpx 8rpx 6rpx rgba(98, 113, 186, 0.2);

			.at-title {
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

			.at-remember-style {
				padding: 20rpx 0;
				font-size: 24rpx;
				display: flex;
				align-items: center;
			}

			.at-botton-style {
				margin-top: 40rpx;
				background: $xls-color-primary;
				color: #fff;
			}
		}
	}
</style>
<template>
	<view class="register">
		<view class="container">
			<view class="top-img">
				<image :src="`${$baseUrl}login_image/ztuwl-logo.png`" mode="widthFix" class="image"></image>
			</view>
			<view class="form-area">
				<u--form :model="registerForm" :rules="registerRules" ref="registerRef">
					<u-form-item prop="nickName">
						<u--input v-model="registerForm.nickName" placeholder="请输入昵称" shape="circle"
							:placeholderStyle="placeholderStyle" prefixIcon="account-fill"
							:prefixIconStyle="prefixIconStyle"></u--input>
					</u-form-item>
					<u-form-item prop="account">
						<u--input v-model="registerForm.account" :placeholder="$t('login.placeholderPhoneAndEmail')"
							shape="circle" :placeholderStyle="placeholderStyle" prefixIcon="phone-fill"
							:prefixIconStyle="prefixIconStyle"></u--input>
					</u-form-item>
					<u-form-item prop="code">
						<!-- #ifndef APP-NVUE -->
						<u-input v-model="registerForm.code" :placeholder="$t('login.placeholderCode')" shape="circle"
							:placeholderStyle="placeholderStyle" style="height: 37.33px;">
						<!-- #endif -->
							<!-- #ifdef APP-NVUE -->
							<u--input v-model="registerForm.code" :placeholder="$t('login.placeholderCode')"
								shape="circle" :placeholderStyle="placeholderStyle" style="height: 37.33px;">
							<!-- #endif -->
								<template slot="prefix">
									<u--image src="/static/code.png" width="35rpx" height="35rpx"></u--image>
								</template>
								<template slot="suffix">
									<u-code :seconds="seconds" ref="uCode" @change="codeChange"
										:start-text="$t('login.getCode')" change-text="x second"
										:end-text="$t('login.retrieveAgain')"></u-code>
									<u-button @click.native.stop="getCode" size="small" shape="circle" type="primary"
										color="linear-gradient(.25turn, #5241ff, 40%, #7063ff)">{{tips}}</u-button>
								</template>
						<!-- #ifndef APP-NVUE -->
						</u-input>
						<!-- #endif -->
						<!-- #ifdef APP-NVUE -->
						</u--input>
						<!-- #endif -->
					</u-form-item>
					<u-form-item prop="password">
						<u--input v-model="registerForm.password" :placeholder="$t('login.placeholderPassword')"
							shape="circle" :placeholderStyle="placeholderStyle" prefixIcon="lock-fill"
							:prefixIconStyle="prefixIconStyle" password></u--input>
					</u-form-item>
					<u-form-item prop="confirmPassword">
						<u--input v-model="registerForm.confirmPassword"
							:placeholder="$t('login.placeholderConfirmPwd')" shape="circle"
							:placeholderStyle="placeholderStyle" prefixIcon="lock-fill"
							:prefixIconStyle="prefixIconStyle" password></u--input>
					</u-form-item>
					<view style="margin: 40rpx 0;">
						<u-button shape="circle" color="linear-gradient(.25turn, #5241ff, 40%, #7063ff)"
							:loading="loginSwitch" :disabled="loginSwitch" loadingText="注册中"
							@click="registerSubmit">{{$t('login.registerNow')}}</u-button>
					</view>
				</u--form>
			</view>
		</view>
		<view class="bottom_area" @click="gotoLogin">
			<span>{{$t('login.hasAccountToLogin')}}</span>
		</view>
	</view>
</template>

<script>
	import {
		loginAndRegController
	} from '@/api/index.js'

	import {
		encrypt
	} from '../../common';
	import {
		strTrim
	} from '../../common/check';
	import md5 from "js-md5";
	export default {
		data() {
			return {
				placeholderStyle: "fontSize: 24rpx;opacity: .7",
				prefixIconStyle: {
					fontSize: '35rpx'
				},
				seconds: 60,
				tips: '',

				registerForm: {
					nickName: '',
					account: '',
					code: '',
					password: '',
					confirmPassword: ''
				},
				loginSwitch: false,
			}
		},
		computed: {
			registerRules() {
				return {
					account: [{
							required: true,
							message: this.$t('login.placeholderPhoneAndEmail'),
							trigger: ['blur']
						},
						// {
						// 	validator: (rule, value, callback) => {
						// 		if (uni.$u.test.contains(value, '@')) {
						// 			return uni.$u.test.email(value)
						// 		} else {
						// 			return uni.$u.test.mobile(value)
						// 		}
						// 	},
						// 	message: this.$t('login.formatError'),
						// 	trigger: ['blur']
						// }
					],
					nickName: [{
						required: true,
						message: '请输入',
						trigger: ['blur']
					}],
					code: [{
						required: true,
						message: this.$t('login.placeholderCode'),
						trigger: ['blur']
					}],
					password: [{
						required: true,
						message: this.$t('login.placeholderPassword'),
						trigger: ['blur']
					}],
					confirmPassword: [{
						required: true,
						message: this.$t('login.placeholderConfirmPwd'),
						trigger: ['blur']
					}]
				}
			}
		},
		onReady() {
			// #ifdef MP
			this.$refs.registerRef.setRules(this.registerRules)
			// #endif
		},
		methods: {
			codeChange(text) {
				this.tips = text
			},
			getCode() {
				if (this.registerForm.account && uni.$u.test.mobile(this.registerForm.account)) {
					if (this.$refs.uCode.canGetCode) {
						// 模拟向后端请求验证码
						uni.showLoading({
							title: this.$t('login.gettingCode')
						})
						let params = {
							phone: this.registerForm.account
						}

						// if (uni.$u.test.contains(this.registerForm.account, '@')) {
						// 	params = {
						// 		email: this.registerForm.account,
						// 		type: '1'
						// 	}
						// } else {
						// 	params = {
						// 		phone: this.registerForm.account,
						// 		type: '1'
						// 	}
						// }
						loginAndRegController.getCode(params).then(res => {
							if (res.code === 200) {
								uni.hideLoading();
								// 这里此提示会被this.start()方法中的提示覆盖
								uni.$u.toast(this.$t('login.hasSentCode'));
								// 通知验证码组件内部开始倒计时
								this.$refs.uCode.start();
							}
						})
					} else {
						uni.$u.toast(this.$t('login.endSend'));
					}
				} else {
					this.$toast("请输入正确的手机号！！")
				}
			},
			gotoLogin() {
				this.$goTo('/pages/loginAndReg/xlsLogin', 'redirectTo')
			},
			registerSubmit() {
				this.loginSwitch = true;
				this.$refs.registerRef.validate().then(res => {
					this.$nextTick(() => {
						if (this.registerForm.password === this.registerForm.confirmPassword) {
							let params = {
								nickName: this.registerForm.nickName,
								username: this.registerForm.account,
								code: this.registerForm.code,
								oldPassword: md5(this.registerForm.confirmPassword),
								password: md5(this.registerForm.password),
							}
							// if (uni.$u.test.contains(this.registerForm.account, '@')) {
							// 	params = {
							// 		code: this.registerForm.code,
							// 		email: this.registerForm.account,
							// 		password: encrypt(strTrim(this.registerForm.password))
							// 	}
							// } else {
							// 	params = {
							// 		code: this.registerForm.code,
							// 		phone: this.registerForm.account,
							// 		password: encrypt(strTrim(this.registerForm.password))
							// 	}
							// }
							loginAndRegController.registerUser(params).then(res => {
								this.loginSwitch = false
								if (res.code === 200) {
									this.$toast(this.$t('login.registerSuccess'), 2000)
									setTimeout(() => {
										this.gotoLogin();
									}, 2000)
								}
							}).catch(() => {
								this.loginSwitch = false
							})
						} else {
							this.loginSwitch = false
							this.$toast(this.$t('login.twoPasswordDifferent'))
						}
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import 'index.scss';
</style>
<template>
	<view class="wrap">
		<jy-lang></jy-lang>
		<!-- <view class="logo"><image src="/static/jeesite/logo200.png"></image></view> -->
		<view class="list">
			<u-tabs :list="tabsList" @click="tabsChange" lineHeight="5" :itemStyle="{width: '50%'}" :scrollable="false"
				:activeStyle="{padding: '10px 11px'}" :current="current"></u-tabs>
			<view style="height: 300rpx;padding: 0 70rpx;">
				<u--form :model="loginForm" ref="loginRef" :rules="loginRules">
					<u-form-item v-if="current === 0" prop="username">
						<view class="list-call">
							<u--input v-model="loginForm.username" prefixIcon="account"
								:placeholder="$t('login.placeholderPhoneAndEmail')" border="none" clearable
								:prefixIconStyle="prefixIconStyle" :placeholderStyle="placeholderStyle"></u--input>
						</view>
					</u-form-item>
					<u-form-item v-if="current === 0" prop="password">
						<view class="list-call">
							<u--input v-model="loginForm.password" :placeholder="$t('login.placeholderPassword')"
								border="none" clearable password prefixIcon="lock" :prefixIconStyle="prefixIconStyle"
								:placeholderStyle="placeholderStyle"></u--input>
						</view>
					</u-form-item>

					<u-form-item v-if="current === 1" prop="username">
						<view class="list-call">
							<u--input v-model="loginForm.username" :placeholder="$t('login.placeholderPhoneAndEmail')"
								shape="circle" :placeholderStyle="placeholderStyle" prefixIcon="account-fill"
								border="none" :prefixIconStyle="prefixIconStyle"></u--input>
						</view>
					</u-form-item>
					<u-form-item v-if="current === 1" prop="code">
						<view class="list-call">
							<!-- #ifndef APP-NVUE -->
							<u-input v-model="loginForm.code" :placeholder="$t('login.placeholderCode')" shape="circle"
								:placeholderStyle="placeholderStyle" style="height: 37.33px;" border="none">
								<!-- #endif -->
								<!-- #ifdef APP-NVUE -->
								<u--input v-model="loginForm.code" :placeholder="$t('login.placeholderCode')"
									shape="circle" :placeholderStyle="placeholderStyle" style="height: 37.33px;">
									<!-- #endif -->
									<template slot="prefix">
										<u--image src="/static/code.png" width="35rpx" height="35rpx"></u--image>
									</template>
									<template slot="suffix">
										<u-code :seconds="seconds" ref="uCode" @change="codeChange"
											:start-text="$t('login.getCode')" change-text="x second"
											:end-text="$t('login.retrieveAgain')"></u-code>
										<u-button @click.native.stop="getCode" size="small" shape="circle" type="primary">{{tips}}
										</u-button>
									</template>
									<!-- #ifndef APP-NVUE -->
							</u-input>
							<!-- #endif -->
							<!-- #ifdef APP-NVUE -->
							</u--input>
							<!-- #endif -->
						</view>
					</u-form-item>
				</u--form>
			</view>
		</view>
		<view class="button" hover-class="button-hover" @click="loginEvent">{{ $t('login.title') }}</view>
		<view class="footer">
			<view @click="goTo('pwd')" open-type="navigate">{{$t('login.forgetPsd')}}</view>
			<text>|</text>
			<view @click="goTo('register')" open-type="navigate">{{$t('login.reg')}}</view>
		</view>
		<view class="oauth2">
			<!-- <u-icon class="u-icon" size="120" color="#00d969" name="weixin-circle-fill"></u-icon> -->
			<!-- <u-icon class="u-icon" size="120" color="#4fa1e8" name="qq-circle-fill"></u-icon>s -->
		</view>

	</view>
</template>

<script>
	import jyLang from '@/components/jy-lang/jyLang.vue';
	import {encrypt} from '../../common';
	import {strTrim} from '../../common/check';
	import {loginAndRegController} from '@/api/index.js'

	export default {
		components: {
			jyLang
		},
		data() {
			return {
				loginForm: {
					username: '1400518713@qq.com',
					password: '2222222222',
					code: ''
				},

				placeholderStyle: "fontSize: 28rpx;opacity: .7",
				prefixIconStyle: {
					fontSize: '35rpx'
				},
				seconds: 60,
				tips: '',
				current: 0
			};
		},
		computed: {
			tabsList() {
				return [{
						name: this.$t('login.passwordLogin')
					},
					{
						name: this.$t('login.noPasswordLogin')
					}
				]
			},
			loginRules() {
				return {
					password: [{
						required: true,
						message: this.$t('login.placeholderPassword'),
						trigger: ['blur']
					}],
					username: [{
							required: true,
							message: this.$t('login.placeholderPhoneAndEmail'),
							trigger: ['blur']
						},
						{
							validator: (rule, value, callback) => {
								if (uni.$u.test.contains(value, '@')) {
									return uni.$u.test.email(value)
								} else {
									return uni.$u.test.mobile(value)
								}
							},
							message: this.$t('login.formatError'),
							trigger: ['blur']
						}
					],
					code: [{
						required: true,
						message: this.$t('login.placeholderCode'),
						trigger: ['blur']
					}],
				}
			}
		},
		onReady() {
			// #ifdef MP
			this.$refs.loginRef.setRules(this.loginRules)
			// #endif
		},
		methods: {
			/**
			 * 修改验证码按钮展示的文字提示
			 * @param {Object} text
			 */
			codeChange(text) {
				this.tips = text
			},
			/**
			 * 获取验证码
			 */
			getCode() {
				if (this.loginForm.username && (uni.$u.test.mobile(this.loginForm.username) || uni.$u.test.email(this.loginForm.username))) {
					if (this.$refs.uCode.canGetCode) {
						// 模拟向后端请求验证码
						uni.showLoading({
							title: this.$t('login.gettingCode')
						})
						let params
						if (uni.$u.test.contains(this.loginForm.username, '@')) {
							params = {
								email: this.loginForm.username,
								type: '2'
							}
						} else {
							params = {
								phone: this.loginForm.username,
								type: '2'
							}
						}
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
				}
			},
			tabsChange(e) {
				this.current = e.index
				this.$refs.loginRef.clearValidate()
				this.$refs.loginRef.resetFields()
			},
			goTo(type) {
				if(type === 'register') {
					this.$goTo('/pages/loginAndReg/register', 'redirectTo')
				} else {
				
					this.$goTo('/pages/loginAndReg/retrievePassword')
				}
				
			},
			loginEvent() {
				this.$refs.loginRef.validate().then(res => {
					this.$nextTick(() => {
						let params = {
							username: this.loginForm.username,
							password: encrypt(strTrim(this.loginForm.password)),
							code: this.loginForm.code,
							current: this.current
						}
						this.$store.dispatch('user/login', params).then(res => {
							this.$toast(this.$t('login.loginSuccess'), 2000)
							setTimeout(() => {
								this.$goTo('/pages/mainPackages/home/index', 'switchTab')
							}, 2000)
						})
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import 'index.scss';

	.logo {
		width: 260rpx;
		height: 260rpx;
		background: rgba(59, 121, 235, 1);
		box-shadow: 0rpx 5rpx 20rpx 5rpx rgba(45, 127, 235, 0.5);
		border-radius: 50%;
		margin: 160rpx auto 10rpx auto;
	}

	.logo image {
		width: 260rpx;
		height: 260rpx;
		border-radius: 50%;
	}


	.button {
		margin: 30rpx auto 0;
	}

	.footer {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		text-align: center;
		color: #46afff;
		height: 40rpx;
		line-height: 40rpx;
		font-size: 35rpx;
		margin-top: 60rpx;
	}

	.footer text {
		font-size: 30rpx;
		margin-left: 25rpx;
		margin-right: 25rpx;
	}

	.oauth2 {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		margin: 55rpx 100rpx;

		image {
			height: 100rpx;
			width: 100rpx;
		}
	}

	::v-deep .u-tabs__wrapper__nav__line {
		width: 40rpx !important;
	}
</style>

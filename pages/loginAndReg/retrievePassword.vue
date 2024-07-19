<template>
	<view class="retrieve-password">
		<jy-navbar bgColor="transparent"></jy-navbar>
		<view class="container">
			<view class="form-area">
				<view class="title">修改密码</view>
				<u--form :model="updatePwdForm" :rules="updatePwdRules" ref="updatePwdRef">
					<u-form-item prop="account">
						<u--input v-model="updatePwdForm.account" 
							:placeholder="$t('login.placeholderPhoneAndEmail')" shape="circle"
							:placeholderStyle="placeholderStyle" prefixIcon="account-fill"
							:prefixIconStyle="prefixIconStyle"></u--input>
					</u-form-item>
					<u-form-item prop="code">
						<!-- #ifndef APP-NVUE -->
						<u-input v-model="updatePwdForm.code" :placeholder="$t('login.placeholderCode')" shape="circle" :placeholderStyle="placeholderStyle"
							style="height: 37.33px;">
						<!-- #endif -->
						<!-- #ifdef APP-NVUE -->
						<u--input v-model="updatePwdForm.code" :placeholder="$t('login.placeholderCode')" shape="circle" :placeholderStyle="placeholderStyle"
							style="height: 37.33px;">
						<!-- #endif -->
							<template slot="prefix">
									<u--image src="/static/code.png" width="35rpx" height="35rpx"></u--image>
							</template>
							<template slot="suffix">
								<u-code :seconds="seconds" ref="uCode" @change="codeChange" :start-text="$t('login.getCode')" change-text="x second" :end-text="$t('login.retrieveAgain')"></u-code>
								<u-button @click.native.stop="getCode" size="small" shape="circle" type="primary">{{tips}}</u-button>
							</template>
						<!-- #ifndef APP-NVUE -->
						</u-input>
						<!-- #endif -->
						<!-- #ifdef APP-NVUE -->
						</u--input>
						<!-- #endif -->
					</u-form-item>
					<u-form-item prop="password">
						<u--input v-model="updatePwdForm.password" :placeholder="$t('login.placeholderPassword')" shape="circle"
							:placeholderStyle="placeholderStyle" prefixIcon="lock-fill" :prefixIconStyle="prefixIconStyle"
							password></u--input>
					</u-form-item>
					<u-form-item prop="confirmPassword">
						<u--input v-model="updatePwdForm.confirmPassword" :placeholder="$t('login.placeholderConfirmPwd')" shape="circle"
							:placeholderStyle="placeholderStyle" prefixIcon="lock-fill" :prefixIconStyle="prefixIconStyle"
							password></u--input>
					</u-form-item>
					<view style="margin: 40rpx 0;">
						<u-button shape="circle" color="linear-gradient(.25turn, #d834c2, 40%, #2088dd)"
							@click="submit">{{$t('login.updatePassword')}}</u-button>
					</view>
				</u--form>
			</view>
		</view>
	</view>
</template>

<script>
	import { userController, loginAndRegController } from '../../api'
	import { encrypt } from '../../common';
	import { strTrim } from '../../common/check';
	export default {
		data() {
			return {
				placeholderStyle: "fontSize: 24rpx;opacity: .7",
				prefixIconStyle: {
					fontSize: '35rpx'
				},
				seconds: 60,
				tips: '',
				
				updatePwdForm: {
					account: '',
					code: '',
					password: '',
					confirmPassword: ''
				},
				
			}
		},
		computed: {
			updatePwdRules() {
				return {
					account: [
						{
							required: true, message: this.$t('login.placeholderPhoneAndEmail'),trigger: ['blur']
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
					code: [{required: true,message: this.$t('login.placeholderCode'),trigger: ['blur']}],
					password: [{required: true,message: this.$t('login.placeholderPassword'),trigger: ['blur']}],
					confirmPassword: [{required: true,message: this.$t('login.placeholderConfirmPwd'),trigger: ['blur']}]
				}
			}
		},
		methods: {
			codeChange(text) {
				this.tips = text
			},
			getCode() {
				if (this.updatePwdForm.account && (uni.$u.test.mobile(this.updatePwdForm.account) || uni.$u.test.email(this
						.updatePwdForm.account))) {
					if (this.$refs.uCode.canGetCode) {
						// 模拟向后端请求验证码
						uni.showLoading({
							title: this.$t('login.gettingCode')
						})
						let params
						if (uni.$u.test.contains(this.updatePwdForm.account, '@')) {
							params = {
								email: this.updatePwdForm.account,
								type: '3'
							}
						} else {
							params = {
								phone: this.updatePwdForm.account,
								type: '3'
							}
						}
						loginAndRegController.getCode(params).then(res => {
							if(res.code === 200) {
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
			submit() {
				this.$refs.updatePwdRef.validate().then(res => {
					if (this.updatePwdForm.password === this.updatePwdForm.confirmPassword) {
						let params
						if (uni.$u.test.contains(this.updatePwdForm.account, '@')) {
							params = {
								code: this.updatePwdForm.code,
								email: this.updatePwdForm.account,
								password: encrypt(strTrim(this.updatePwdForm.password))
							}
						} else {
							params = {
								code: this.updatePwdForm.code,
								phone: this.updatePwdForm.account,
								password: encrypt(strTrim(this.updatePwdForm.password))
							}
						}
						userController.emailChangePwd(params).then(res => {
							if(res.code === 200) {
								this.$toast("修改成功！", 2000)
								setTimeout(() => {
									this.$goTo('/pages/loginAndReg/login', 'redirectTo')
								}, 2000)
							} 
						})
					} else {
						this.$toast(this.$t('login.twoPasswordDifferent'))
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
@import 'index.scss';
</style>

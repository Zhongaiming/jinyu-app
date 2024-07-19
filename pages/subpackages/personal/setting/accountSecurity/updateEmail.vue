<template>
	<view>
		<jy-navbar :title="$t('personal.setUp.rebindEmail')" :slotRight="true" >
		<!-- #ifdef APP || H5 -->
			<view slot="right">
				<u-button @click="submit" size="small" type="success" :disabled="updateEmailForm.email == info.email">{{ $t('common.save') }}</u-button>
			</view>
			<!-- #endif -->
		</jy-navbar>
		
		<view class="form-area">
			<u--form :model="updateEmailForm" labelWidth="120" :rules="emailRules" ref="updateEmailForm">
				<u-form-item prop="email" :label="$t('common.email') + ':'">
					<u--input v-model="updateEmailForm.email" :placeholder="$t('personal.setUp.placeholderEmail')" border="bottom"
						:placeholderStyle="placeholderStyle" prefixIcon="account-fill" :prefixIconStyle="prefixIconStyle"></u--input>
				</u-form-item>
				<u-form-item prop="code" :label="$t('common.code') + ':'">
					<!-- #ifndef APP-NVUE -->
					<u-input v-model="updateEmailForm.code" :placeholder="$t('login.placeholderCode')"
						:placeholderStyle="placeholderStyle" border="bottom">
						<!-- #endif -->
						<!-- #ifdef APP-NVUE -->
						<u--input v-model="updateEmailForm.code" :placeholder="$t('login.placeholderCode')"
							 :placeholderStyle="placeholderStyle" border="bottom">
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
				</u-form-item>
			</u--form>
		</view>
		<!-- #ifdef MP -->
		<view class="btn-area">
			<u-button @click="submit" type="primary" shape="circle">{{ $t('common.save') }}</u-button>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	import { loginAndRegController, userController } from '@/api/index.js'
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				updateEmailForm: {
					email: '',
					code: ''
				},
				placeholderStyle: "fontSize: 28rpx;opacity: .7",
				prefixIconStyle: {
					fontSize: '35rpx'
				},
				seconds: 60,
				tips: '',
				current: 0
			}
		},
		computed: {
			...mapGetters(['info']),
			emailRules() {
				return {
					email: [{
							required: true,
							message: this.$t('personal.setUp.placeholderEmail'),
							trigger: ['blur']
						},
						{
							validator: (rule, value, callback) => {
								return uni.$u.test.email(value)
							},
							message: this.$t('personal.setUp.placeEmailFormatError'),
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
		methods: {
			/**
			 * 修改验证码按钮展示的文字提示
			 * @param {Object} text
			 */
			codeChange(text) {
				this.tips = text
			},
			getCode() {
				if (this.updateEmailForm.email && uni.$u.test.email(this.updateEmailForm.email)) {
					if (this.$refs.uCode.canGetCode) {
						// 模拟向后端请求验证码
						uni.showLoading({
							title: this.$t('login.gettingCode')
						})
						let params = {
								email: this.updateEmailForm.email,
								type: '4'
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
			submit() {
				this.$refs.updateEmailForm.validate().then(res => {
					console.log('333', res)
					let params = {
						...this.updateEmailForm,
						userId: this.info.userId
					}
					userController.emailRebind(params).then(res => {
						if(res.code === 200) {
							this.$modal("修改绑定邮箱成功！请退出重新登录！", {title: '修改成功', showCancel: false}).then(res => {
								console.log('1111',)
								this.$goTo('/pages/loginAndReg/login')
							})
						}
					})
					
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
page {
	background-color: #ffffff;
}

.btn-area {
	margin: 100rpx 50rpx;
}
.form-area {
	width: 80%;
	margin: 60rpx auto;
}
</style>

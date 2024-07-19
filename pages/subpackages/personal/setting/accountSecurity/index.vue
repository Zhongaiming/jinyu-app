<template>
	<view>
		<jy-navbar :title="$t('personal.setUp.AccountAndSecurity')" :slotRight="true"></jy-navbar>
		
		<u-cell-group>
			<u-cell @click="changeHeadImg" :rightIconStyle="{fontSize: '32rpx'}" :title="$t('personal.setUp.headImg')" :isLink="true">
				<view slot="value">
					<u-image width="45px" height="45px" :src="getPreviewUrl(info.headUrl)"></u-image>
				</view>
			</u-cell>
			<u-cell size="large" @click="goTo('nickname')" :rightIconStyle="{fontSize: '32rpx'}" :title="$t('personal.setUp.nickName')" :isLink="true">
				<view slot="value">
					<span>{{ info.nickname }}</span>
				</view>
			</u-cell>
			<jy-picker v-model="sexPickerShow" :columns="sexOptions" :defaultValue="info.sex" @pickerChange="(e) => pickerChange(e, 'sex')">
				<u-cell  @click="sexPickerShow = true" size="large" :value="info.sex == 1 ? $t('personal.setUp.male') : $t('personal.setUp.female')" :rightIconStyle="{fontSize: '32rpx'}" :title="$t('personal.setUp.sex')" :isLink="true"></u-cell>
			</jy-picker>
			<jy-picker v-model="birthdayPickerShow" type="dateTime" :defaultValue="info.birthday" @pickerChange="(e) => pickerChange(e, 'birthday')">
				<u-cell @click="birthdayPickerShow = true" size="large" :value="info.birthday" :rightIconStyle="{fontSize: '32rpx'}" :title="$t('personal.setUp.birthday')" :isLink="true"></u-cell>
			</jy-picker>
		</u-cell-group>
		
		<u-cell-group :customStyle="{marginTop: '20rpx'}">
			<u-cell :title="$t('login.updatePassword')" @click="pwdModal = true" :isLink="true" size="large" :rightIconStyle="{fontSize: '32rpx'}"></u-cell>
			<u-cell :title="$t('personal.setUp.emailAddress')" :value="info.email" @click="goTo('email')" :isLink="true" size="large" :rightIconStyle="{fontSize: '32rpx'}"></u-cell>
		</u-cell-group>
		
		<u-modal :show="pwdModal" :confirmText="$t('common.confirm')"
			:cancelText="$t('common.cancel')" :showCancelButton="true"
			@cancel="cancelEvent" @confirm="confirmEvent"
		>
			<u--form :model="updatePwdForm" :rules="updatePwdRules" ref="updatePwdRef" labelWidth="150">
				<u-form-item prop="password" label="新密码">
					<u--input v-model="updatePwdForm.password" :placeholder="$t('login.placeholderPassword')"
						:placeholderStyle="placeholderStyle" :prefixIconStyle="prefixIconStyle"
						password></u--input>
				</u-form-item>
				<u-form-item prop="confirmPassword" label="确认密码: ">
					<u--input v-model="updatePwdForm.confirmPassword" :placeholder="$t('login.placeholderConfirmPwd')"
						:placeholderStyle="placeholderStyle" :prefixIconStyle="prefixIconStyle"
						password></u--input>
				</u-form-item>
			</u--form>
		</u-modal>
	</view>
</template>

<script>
	import jyPicker from '@/components/jy-picker/jyPicker.vue'
	import { userController } from '@/api/index.js'
	import { mapGetters } from 'vuex'
	import { formatDate } from '@/common/time.js'
	import { getRandomNumber } from '@/common/index.js'
	import { upload, getPreviewUrl } from '@/common/upload.js'
	import { dictMixin } from '@/mixins/dictMixin.js'
	import { encrypt } from '@/common';
	import { strTrim } from '@/common/check';
	export default {
		mixins: [dictMixin],
		components: {
			jyPicker
		},
		computed: {
			...mapGetters(['info']),
			updatePwdRules() {
				return {
					password: [{required: true,message: this.$t('login.placeholderPassword'),trigger: ['blur']}],
					confirmPassword: [{required: true,message: this.$t('login.placeholderConfirmPwd'),trigger: ['blur']}]
				}
			}
		},
		
		data() {
			return {
				imgUrl: '',
				pwdModal: false,
				updatePwdForm: {
					password: '',
					confirmPassword: ''
				},
				placeholderStyle: "fontSize: 24rpx;opacity: .7",
				prefixIconStyle: {
					fontSize: '35rpx'
				},
				
				sexPickerShow: false,
				birthdayPickerShow: false
			}
		},
		onReady() {
			// 兼容微信叫小程序
			// #ifdef MP
			this.$refs.updatePwdRef.setRules(this.updatePwdRules)
			// #endif
			
			
			
		},
		onShow() {
			this.getUserInfo()
			console.log("zhes ", dictMixin)
		},
		methods: {
			getPreviewUrl,
			getRandomNumber,
			getUserInfo() {
				userController.getUserInfoById({userId: this.info.userId}).then(res => {
					console.log('用户信息', res)
					if(res.code === 200) {
						let info = {
							...res.data,
							userId: res.data.id,
							birthday: formatDate(res.data.birthday, 'yyyy-MM-dd'),
						}
						this.$store.commit('user/SET_INFO', info)
					}
				})
			},
			goTo(type) {
				switch(type) {
					case 'nickname':
						this.$goTo('/pages/subpackages/personal/setting/accountSecurity/nickname')
						break
					case 'email':
						this.$goTo('/pages/subpackages/personal/setting/accountSecurity/updateEmail')
						break
				}
			},
			changeHeadImg() {
				upload().then(res => {
					console.log('返回的结果', res)
					this.info.headUrl = res.downloadUri
					this.changeInfoData()
				})
			},
			// 修改性别
			pickerChange(data, type) {
				if(type === 'sex') {
					this.info.sex = data.id
				} else {
					this.info.birthday = data
				}	
				this.changeInfoData()
			},
			changeInfoData() {
				let params = {
					appUserUpdateDto: {
						...this.info
					}
				}
				userController.updateUser(params).then(res => {
					if(res.code === 200) {
						this.getUserInfo()
						this.$toast(this.$t('common.updateSuccess'))
					}
				})
			},
			confirmEvent() {
				this.$refs.updatePwdRef.validate().then(res => {
					this.$nextTick(() => {
						if (this.updatePwdForm.password === this.updatePwdForm.confirmPassword) {
							let params = {
								id: this.info.userId,
								password: encrypt(strTrim(this.updatePwdForm.password))
							}
							userController.changePassword(params).then(res => {
								console.log('56789', res)
								if(res.code === 200) {
									this.$toast(this.$t('common.updateSuccess'))
									this.$refs.updatePwdRef.resetFields()
									this.pwdModal = false
								}
							})
						} else {
							this.$toast(this.$t('login.twoPasswordDifferent'))
						}
					})
					console.log('3323', res)
				})
			},
			cancelEvent() {
				this.pwdModal = false
			}
		}
	}
</script>

<style lang="scss" scoped>
::v-deep .u-modal__content {
	padding: 15px;
}
.u-form {
	width: 100%;
}
</style>

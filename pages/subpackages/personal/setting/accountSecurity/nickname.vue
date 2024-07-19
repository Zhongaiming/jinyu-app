<template>
	<view>
		<jy-navbar :title="$t('personal.setUp.updateNickname')" :slotRight="true" >
			<!-- #ifdef APP || H5 -->
			<view slot="right">
				<u-button @click="submit" size="small" type="success" :disabled="nickname === info.nickname">{{ $t('common.save') }}</u-button>
			</view>
			<!-- #endif -->
		</jy-navbar>

		<view class="content-area">
			<u--input v-model="nickname" border="bottom"></u--input>
			<view class="text">好名字可以让你的朋友更容易记住你。</view>
		</view>
		 
		 <!-- #ifdef MP -->
		 <view class="btn-area">
		 		<u-button @click="submit" type="primary" shape="circle">{{ $t('common.save') }}</u-button>
		 </view>
		 <!-- #endif -->
		
		 
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { userController } from '@/api/index.js'
	export default {
		data() {
			return {
				nickname: ''
			}
		},
		computed: {
			...mapGetters(['info'])
		},
		methods: {
			submit() {
				let params = {
					appUserUpdateDto: {
						...this.info,
						nickname: this.nickname
					}
				}
				userController.updateUser(params).then(res => {
					if(res.code === 200) {
						this.$toast(this.$t('common.updateSuccess'))
						setTimeout(() => {
							uni.navigateBack()
						},1000)
					}
					console.log('111',res)
				})
			}
		},
		onReady() {
			this.nickname = this.info.nickname
		}
	}
</script>

<style lang="scss" scoped>
page {
	background-color: #ffffff;
}
.content-area {
	margin: 25rpx;
	.text {
		margin-top: 20rpx;
		font-size: 25rpx;
		opacity: .6;
	}
}
.btn-area {
	margin: 100rpx 50rpx;
}
</style>

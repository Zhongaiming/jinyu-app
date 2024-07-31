<template>
	<view class="xls-second-step" v-if="current === 2">
		<!-- 银行卡 -->
		<view class="credentials-box">
			<view class="info-title">{{ `${valueByType[merchantType]}` }}</view>
			<p class="des" v-show="merchantType !== 'ENTERPRISE'">
				不建议使用农村商业银行/信用合作社等小银行卡，因为审批和结算时间较长。
			</p>

			<view class="picture">
				<view class="picture-box">
					<u-upload :previewFullImage="true" :fileList="cardPhotoList" name="cardPhoto" @afterRead="afterRead"
						@delete="deletePic" :maxCount="1" class="upload" width="464" height="288">
						<view class="uploadBg cardPhoto">
							<view class="camera-bg">
								<image :src="`${$baseUrl}appV4/image/wallet/camera.png`" alt="" class="camera"
									mode="widthFix" />
							</view>
							<p class="tips">{{ `${valuePicText[merchantType]}` }}</p>
						</view>
					</u-upload>
				</view>
			</view>
		</view>

		<!-- 底部 -->
		<view class="xls-step-bottom">
			<view class="bottom-fixed">
				<view class="bottom-divider">
					<view class="prev-button">
						<u-icon name="arrow-left" size="30" color="#5241ff"></u-icon>
						<text class="text">上一步</text>
					</view>
					<view class="btn-wrapper" :class="{disabled: true}">
						下一步
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		props: {
			current: {
				type: Number,
				default: 1
			},
			merchantType: {
				type: String,
				default: 'PERSON'
			}
		},
		data() {
			return {
				valueByType: {
					PERSON: '收款人银行卡信息',
					INDIVIDUALBISS: '企业开户许可证/收款人银行卡信息',
					ENTERPRISE: '企业开户许可证信息',
					INSTITUTION: '收款人银行卡信息', //事业单位商户
					SUBJECT_TYPE_OTHERS: '收款人银行卡信息', //其他组织
				},
				valuePicText: {
					PERSON: '拍照银行卡号面',
					INDIVIDUALBISS: '拍照银行卡号面',
					ENTERPRISE: '开户许可证正面照',
					INSTITUTION: '拍照银行卡号面', //事业单位商户
					SUBJECT_TYPE_OTHERS: '拍照银行卡号面', //其他组织
				},
				cardPhotoList: [],
			}
		},
		methods: {
			async afterRead(event) {
				const {
					file,
					index,
					name
				} = event;
				console.log('after', typeof file, file, index, name)
				this[`${name}List`].push({
					...file,
					status: 'success', // uploading
					message: '' // 上传中
				})
			},
			deletePic(event) {
				const {
					file,
					index,
					name
				} = event;
				this[`${name}List`] = [];
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '../index.scss';

	.picture {
		@include center-flex();
		margin-top: 80rpx !important;
	}

	.picture-box {
		max-width: 464rpx !important;
		height: 288rpx !important;
	}

	.credentials-box {
		padding-bottom: 100rpx !important;
	}
</style>
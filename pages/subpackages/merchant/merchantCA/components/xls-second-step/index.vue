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
					<view class="prev-button" @click="lastStep">
						<u-icon name="arrow-left" size="30" color="#5241ff"></u-icon>
						<text class="text">上一步</text>
					</view>
					<view class="btn-wrapper" :class="{disabled: !images.cardPhoto}" @click="nextStepMethod">
						下一步
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		uploadFilePromise
	} from "@/common/upload.js";
	import {
		merchantController
	} from "@/api/index.js";
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
				images: {
					cardPhoto: "" //结算银行卡正面照图片
				},
				result: {
					accountNo: "", //结算银行卡账号 说明(必传
				}
			}
		},
		methods: {
			updateList(list, url) {
				list = [];
				list.push({
					status: 'success', // uploading
					message: '上传成功', // 上传中
					url
				});
				return list;
			},
			updateMethod(params) {
				if (params) {
					const requiredParams = {
						accountNo: params.accountNo, //结算银行卡账号 说明(必传
					}
					Object.assign(this.result, requiredParams);

					if (params.images) {
						const requiredImages = {
							cardPhoto: params.images.cardPhoto,
						}
						Object.assign(this.images, requiredImages);

						// 更新 idCardinfo 列表
						if (this.images.cardPhoto) {
							this.cardPhotoList = this.updateList(this.cardPhoto, this.images
								.cardPhoto);
						}
					}
				}
			},
			async afterRead(event) {
				const {
					file,
					index,
					name
				} = event;
				this[`${name}List`].push({
					...file,
					status: 'uploading', // uploading
					message: '上传中' // 上传中
				})
				let res = await uploadFilePromise(file)
				this[`${name}List`] = []
				this[`${name}List`].push({
					status: 'success', // uploading
					message: '上传成功', // 上传中
					url: res.data.downloadUri
				})
				this.images[`${name}`] = res.data.downloadUri;
				this.getFileInfo(name, res.data.downloadUri);
			},
			deletePic(event) {
				const {
					file,
					index,
					name
				} = event;
				this[`${name}List`] = [];
				this.images.cardPhoto = "";
			},
			getFileInfo(name, url) {
				// ENTERPRISE === INDIVIDUALBISS
				merchantController.recognizeBankAccountLicense({
					url
				}).then(res => {
					if (res.code === 200) {
						const obj = res.data;
						this.result.accountNo = obj.bankAccount
					}
				})
				merchantController.recognizeBankCard({
					url
				}).then(res => {
					if (res.code === 200) {
						const obj = res.data;
						this.result.accountNo = obj.cardNumber
					}
				})
			},
			nextStepMethod() {
				const params = {
					...this.result,
					images: this.images
				}
				this.$emit('nextStepMethod', {
					step: 'secondStep',
					params
				})
			},
			lastStep() {
				this.$emit('lastStep')
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
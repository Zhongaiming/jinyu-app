<template>
	<view class="xls-first-step" v-if="current === 1">
		<view class="credentials-box">
			<view class="info-title">{{ `${textByMerchantTypeDict[merchantType]}人证件信息` }}</view>
			<u-subsection :list="idTypeList" :current="idType" activeColor="#5241ff" keyName="text" fontSize="28"
				@change="sectionChange">
			</u-subsection>
			<!-- 身份证 -->
			<view class="picture">
				<view class="picture-box">
					<u-upload :previewFullImage="true" :fileList="idCardinfo.lepUrlaList" name="lepUrla"
						@afterRead="afterRead" @delete="deletePic" :maxCount="1" class="upload" width="343"
						height="212">
						<view class="uploadBg" :class="`lepUrla${idType}`">
							<view class="camera-bg">
								<image :src="`${$baseUrl}appV4/image/wallet/camera.png`" alt="" class="camera"
									mode="widthFix" />
							</view>
							<p class="tips">{{ lepUrlaDict[idType] }}</p>
						</view>
					</u-upload>
				</view>

				<view class="picture-box">
					<u-upload :previewFullImage="true" :fileList="idCardinfo.lepUrlbList" name="lepUrlb"
						@afterRead="afterRead" @delete="deletePic" :maxCount="1" class="upload" width="343"
						height="212">
						<view class="uploadBg" :class="`lepUrlb${idType}`">
							<view class="camera-bg">
								<image :src="`${$baseUrl}appV4/image/wallet/camera.png`" alt="" class="camera"
									mode="widthFix" />
							</view>
							<p class="tips">{{ lepUrlbDict[idType] }}</p>
						</view>
					</u-upload>
				</view>
			</view>

			<!-- 示例 -->
			<view class="up-example-show">
				<p class="card-tips">
					请确保证件边框完整、字体清晰、亮度均匀。
					<span class="examples" @click="goTo">示例</span>
				</p>
				<view class="error-show-box">
					<view>
						<image :src="`${$baseUrl}appV4/image/wallet/sample-one.png`" alt="" class="tab-show" />
						<p class="tab-show-text correct-ph">标准拍摄</p>
					</view>
					<view>
						<image :src="`${$baseUrl}appV4/image/wallet/sample-two.png`" alt="" class="tab-show" />
						<p class="tab-show-text correct-bh">边框缺失</p>
					</view>
					<view>
						<image :src="`${$baseUrl}appV4/image/wallet/sample-three.png`" alt="" class="tab-show" />
						<p class="tab-show-text correct-bh">照片模糊</p>
					</view>
					<view>
						<image :src="`${$baseUrl}appV4/image/wallet/sample-four.png`" alt="" class="tab-show" />
						<p class="tab-show-text correct-bh">闪光强度</p>
					</view>
				</view>
			</view>
		</view>

		<!-- 营业执照 -->
		<view class="credentials-box business" v-if="!['PERSON'].includes(merchantType)">
			<view class="info-title">营业执照信息</view>
			<view class="picture">
				<view class="picture-box">
					<u-upload :previewFullImage="true" :fileList="idCardinfo.blicUrlaList" name="blicUrla"
						@afterRead="afterRead" @delete="deletePic" :maxCount="1" class="upload" width="343"
						height="212">
						<view class="uploadBg blicUrla">
							<view class="camera-bg">
								<image :src="`${$baseUrl}appV4/image/wallet/camera.png`" alt="" class="camera"
									mode="widthFix" />
							</view>
							<p class="tips">拍照营业执照</p>
						</view>
					</u-upload>
				</view>
				<view style="flex: 1;"></view>
			</view>
		</view>

		<!-- 底部 -->
		<view class="xls-step-bottom">
			<view class="bottom-fixed padding">
				<view class="text-wrapper">
					<u-icon name="error-circle" color="#ff8d1a" size="36"></u-icon>
					<text class="text"> 请确认上传收款人证件与营业执照主体一致的资料信息 </text>
				</view>
				<view class="bottom-divider">
					<view class="btn-wrapper" :class="{disabled: getNextStep()}" @click="nextStepMethod">
						下一步
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		compress
	} from "@/plugins/imageZip";
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
				nextStep: false,
				textByMerchantTypeDict: {
					PERSON: '收款', // 个人商户
					INDIVIDUALBISS: '收款', //个体工商户
					ENTERPRISE: '法', //企业商户
					INSTITUTION: '负责', //事业单位商户
					SUBJECT_TYPE_OTHERS: '负责', //其他组织
				},
				idType: 0,
				idTypeList: [{
						id: 0,
						text: '大陆',
						value: 'IDCARD'
					},
					{
						id: 1,
						text: '港澳',
						value: 'GATXCERTIFICATE'
					},
					{
						id: 2,
						text: '台湾',
						value: 'TWNDCERTIFICATE'
					},
				],
				lepUrlaDict: ['拍照身份证人像面', '港澳通行证人像面', '台湾通行证人像面'],
				lepUrlbDict: ['拍照身份证国徽面', '港澳通行证背面', '台湾通行证背面'],
				idCardinfo: {
					lepUrlaList: [],
					lepUrlbList: [],
					blicUrlaList: [],
				},
				images: {
					lepUrla: "", //法人身份证信息正面图片 说明
					lepUrlb: "", //法人身份证信息背面图片 说明
					blicUrla: "", //营业执照照片
				},
				result: {
					merchantType: 'PERSON',
					idType: "IDCARD",
					legalPerson: "",
					legalPersonId: "",
					idCardStartDate: "",
					idCardEndDate: "",
					accountName: "", // (必传个人--身份证名字，企业--营业执照上的工商注册名称)
					businessLicense: "", // 营业执照号 说明(个人商户填身份证，其他，填统一社会信用代码)
					// 营业证件到期日 说明(长期直接写长期 ，不是写日期格式yyyy-mm-dd，个体工商户，企业必须传
					businessDateStart: "",
					businessDateLimit: "",
				},
			}
		},
		methods: {
			goTo() {},
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
					// 只提取需要的属性
					const requiredParams = {
						merchantType: params.merchantType ? params.merchantType : "IDCARD",
						idType: params.idType ? params.idType : "IDCARD",
						legalPerson: params.legalPerson,
						legalPersonId: params.legalPersonId,
						idCardStartDate: params.idCardStartDate,
						idCardEndDate: params.idCardEndDate,
						accountName: params.accountName,
						businessLicense: params.businessLicense,
						businessDateStart: params.businessDateStart,
						businessDateLimit: params.businessDateLimit,
					};
					Object.assign(this.result, requiredParams);
					const result = this.idTypeList.find(item => item.value === this.result.idType);
					this.sectionChange(result.id)

					if (params.images) {
						const requiredImages = {
							lepUrla: params.images.lepUrla,
							lepUrlb: params.images.lepUrlb,
							blicUrla: params.images.blicUrla,
						}
						Object.assign(this.images, requiredImages);

						// 更新 idCardinfo 列表
						if (this.images.lepUrla) {
							this.idCardinfo.lepUrlaList = this.updateList(this.idCardinfo.lepUrlaList, this.images
								.lepUrla);
						}
						if (this.images.lepUrlb) {
							this.idCardinfo.lepUrlbList = this.updateList(this.idCardinfo.lepUrlbList, this.images
								.lepUrlb);
						}
						if (this.images.blicUrla) {
							this.idCardinfo.blicUrlaList = this.updateList(this.idCardinfo.blicUrlaList, this.images
								.blicUrla);
						}
					}
				}
			},
			sectionChange(index) {
				this.idType = index;
				let value = this.idTypeList[index].value;
				this.result.idType = value;
				this.$emit('@changeIdType', 'idType', value);
			},
			getNextStep() {
				const {
					lepUrla,
					lepUrlb,
					blicUrla
				} = this.images || {};

				if (this.merchantType === "PERSON") {
					return !(lepUrla && lepUrlb);
				}

				return !(lepUrla && lepUrlb && blicUrla);
			},
			async afterRead(event) {
				const {
					file,
					index,
					name
				} = event;
				this.idCardinfo[`${name}List`].push({
					...file,
					status: 'uploading', // uploading
					message: '上传中' // 上传中
				})
				let res = await uploadFilePromise(file)
				this.idCardinfo[`${name}List`] = []
				this.idCardinfo[`${name}List`].push({
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
				this.idCardinfo[`${name}List`] = [];
				this.images[`${name}`] = "";
			},
			getFileInfo(name, url) {
				if (name === 'blicUrla') {
					merchantController.recognizeBusinessLicense({
						url
					}).then(res => {
						if (res.code === 200) {
							const obj = res.data;
							this.result.accountName = obj.companyName
							this.result.businessLicense = obj.creditCode
							this.result.businessDateStart = obj.validFromDate.replace(
								/(\d{4})(\d{2})(\d{2})/,
								"$1-$2-$3"
							);
							this.result.businessDateLimit = obj.validToDate.replace(
								/(\d{4})(\d{2})(\d{2})/,
								"$1-$2-$3"
							);
						}
					})
				} else {
					merchantController.recognizeIdCard({
						url
					}).then(res => {
						if (res.code === 200) {
							if (name === 'lepUrla') {
								const obj = res.data.face.data
								this.result.legalPerson = obj.name
								this.result.legalPersonId = obj.idNumber
							} else {
								const obj = res.data.back.data.validPeriod.split("-");
								this.result.idCardStartDate = obj[0].replaceAll(".", "-");
								this.result.idCardEndDate = obj[1].replaceAll(".", "-");
							}
						}
					})
				}
			},
			nextStepMethod() {
				this.result.merchantType = this.merchantType;
				const params = {
					...this.result,
					images: this.images
				}
				this.$emit('nextStepMethod', {
					step: 'firstStep',
					params
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '../index.scss';

	.business {
		margin: 16rpx 0;
		background-color: #fff;
		border-radius: 24rpx;
		padding: 24rpx 24rpx 30rpx;
	}

	.up-example-show {
		margin-top: 46rpx;

		.card-tips {
			color: #666;
			font-size: 24rpx;
			padding-bottom: 20rpx;

			.examples {
				color: #5241ff;
				float: right;
				padding-right: 60rpx;
			}
		}

		.error-show-box {
			display: flex;
			justify-content: space-around;

			.tab-show {
				height: 100rpx;
				width: 162rpx;
			}

			.tab-show-text {
				align-items: center;
				display: flex;
				font-size: 26rpx;
				text-align: left;
			}

			.tab-show-text:before {
				border-radius: 50%;
				content: "";
				display: inline-block;
				height: 32rpx;
				margin-right: 4rpx;
				vertical-align: middle;
				width: 32rpx;
			}

			.correct-ph:before {
				background: url(#{$baseUrl}appV4/image/wallet/correct.png) no-repeat;
				background-size: 100% 100%;
			}

			.correct-bh:before {
				background: url(#{$baseUrl}appV4/image/wallet/bad.png) no-repeat;
				background-size: 100% 100%;
			}
		}
	}
</style>
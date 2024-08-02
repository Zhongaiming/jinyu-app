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
		<view class="credentials-box business">
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
					<view class="btn-wrapper" :class="{disabled: true}">
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
				textByMerchantTypeDict: {
					PERSON: '收款', // 个人商户
					INDIVIDUALBISS: '收款', //个体工商户
					ENTERPRISE: '法', //企业商户
					INSTITUTION: '负责', //事业单位商户
					SUBJECT_TYPE_OTHERS: '负责', //其他组织
				},
				idType: 0,
				idTypeList: [{
						id: 1,
						text: '大陆',
						value: 'IDCARD'
					},
					{
						id: 2,
						text: '港澳',
						value: 'GATXCERTIFICATE'
					},
					{
						id: 3,
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
				}
			}
		},
		methods: {
			sectionChange(index) {
				this.idType = index;
				let value = this.idTypeList[index].value;
				this.$emit('@changeIdType', 'idType', value);
			},
			goTo() {},
			async afterRead(event) {
				const {
					file,
					index,
					name
				} = event;
				console.log('after', typeof file, file, index, name)
				// file = compress(file, 3.5, 2048);
				// console.log('after123', file, index, name)
				this.idCardinfo[`${name}List`].push({
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
				this.idCardinfo[`${name}List`] = [];
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
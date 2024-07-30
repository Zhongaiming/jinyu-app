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
		<view class="xls-first-step-bottom">
			<view class="bottom-fixed">
				<view class="text-wrapper">
					<u-icon name="error-circle" color="#ff8d1a" size="36"></u-icon>
					<text class="text"> 请确认上传收款人证件与营业执照主体一致的资料信息 </text>
				</view>
				<div class="bottom-divider">
					<div class="btn-wrapper" :class="{disabled: true}">
						下一步
					</div>
				</div>
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
	.credentials-box {
		position: relative;
		padding: 34rpx 24rpx 32rpx;
		margin-bottom: 20rpx;
		background: #fff;
		border-radius: 0 0 24rpx 24rpx;
		overflow: auto;

		.info-title {
			color: #3e3e40;
			display: inline-block;
			font-size: 32rpx;
			font-weight: 700;
			height: 44rpx;
			line-height: 44rpx;
			margin-bottom: 20rpx;
		}

		.picture {
			display: flex;
			align-items: center;
			margin-top: 24rpx;

			.picture-box {
				flex: 1;
				height: 212rpx;
				position: relative;
				overflow: hidden;
				border: 2rpx solid #eeeeee;
				border-radius: 16rpx;

				.upload {
					width: 100%;
					height: 100%;
					position: relative;
				}

				.uploadBg {
					width: 100%;
					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: center;
					left: 0;
					position: absolute;
					top: 0rpx;

					.camera-bg {
						height: 80rpx;
						margin: 0 auto;
						width: 80rpx;

						.camera {
							width: 100%;
						}
					}

					.tips {
						color: #3e3e40;
						font-size: 24rpx;
						font-weight: 700;
						height: 34rpx;
						letter-spacing: 0;
						line-height: 40rpx;
						margin: 8rpx auto 0;
						text-align: center;
						width: 80%;
					}
				}

				@mixin bg-image($url) {
					background: url(#{$prefix}#{$url}) no-repeat;
					background-size: 100% 100%;
				}

				.lepUrla0 {
					@include bg-image('appV4/image/wallet/identity-card.png');
				}

				.lepUrlb0 {
					@include bg-image('appV4/image/wallet/back-side.png');
				}

				.lepUrla1 {
					@include bg-image('appV4/image/wallet/region.png');
				}

				.lepUrlb1 {
					@include bg-image('appV4/image/wallet/Gregion-side.png');
				}

				.lepUrla2 {
					@include bg-image('appV4/image/wallet/out-region.png');
				}

				.lepUrlb2 {
					@include bg-image('appV4/image/wallet/Tregion.png');
				}

				// 营业执照
				.blicUrla {
					@include bg-image('appV4/image/wallet/license.png');
				}

				// 登记证书
				.bg-four {
					@include bg-image('appV4/image/wallet/register.png');
				}

				// 证明函
				.bg-five {
					@include bg-image('appV4/image/wallet/prove.png');
				}

				// 请选择行业类型
				.bg-six {
					@include bg-image('appV4/image/wallet/trade.png');
				}

				// 银行卡
				.bg-seven {
					@include bg-image('appV4/image/wallet/nextPress/card.png');
				}
			}


			.picture-box:not(:first-child) {
				margin-left: 16rpx;
			}
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
					background: url(#{$prefix}appV4/image/wallet/correct.png) no-repeat;
					background-size: 100% 100%;
				}

				.correct-bh:before {
					background: url(#{$prefix}appV4/image/wallet/bad.png) no-repeat;
					background-size: 100% 100%;
				}
			}
		}
	}

	.business {
		margin: 16rpx 0;
		background-color: #fff;
		border-radius: 24rpx;
		padding: 24rpx 24rpx 30rpx;
	}

	.xls-first-step-bottom {
		padding-bottom: 198rpx;
		
		.bottom-fixed {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
		}
		
		.text-wrapper {
			height: 64rpx;
			line-height: 64rpx;
			display: flex;
			align-items: center;
			color: rgb(255, 141, 26);
			background: rgb(255, 247, 230);
			font-size: 26rpx;
			padding: 0rpx 24rpx;
			.text {
				margin-left: 16rpx;
			}
		}

		.bottom-divider {
			background-color: #fff;
			overflow: hidden;
			padding: 16rpx 24rpx;

			.btn-wrapper {
				height: 88rpx;
				line-height: 88rpx;
				text-align: center;
				color: #fff;
				font-size: 32rpx;
				font-weight: 700;
				background-color: #5241ff;
				border-radius: 12rpx;
			}

			.disabled {
				opacity: 0.6;
				pointer-events: none;
			}
		}

	}
</style>
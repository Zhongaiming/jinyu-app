<template>
	<view class="xls-three-step" v-if="current === 3">
		<!-- 门店信息 -->
		<view class="credentials-box">
			<view class="xls-cell">
				<view class="xls-field__body">
					<input type="text" placeholder="请输入商户简称" maxlength="15" class="xls-field__control font-size"
						placeholder-style="color: #cacaca" />
				</view>
			</view>
			<p class="des">
				<u-icon name="error-circle" color="#999" size="32" class="inline-icon"></u-icon>
				商户简称为店铺名称或品牌名称，若无店铺名称或品牌名称，可使用设备相关名称。
				<text class="limit">(商户简称控制在15个字符内)</text>
			</p>
			<view class="xls-cell">
				<p class="xls-field__label">所在地区</p>
				<view class="xls-field__body">
					<input type="text" placeholder="请选择所在地区" class="xls-field__control"
						placeholder-style="color: #cacaca" />
				</view>
				<view class="xls-field__icon">
					<u-icon name="map-fill" size="32" color="#5241ff"></u-icon>
					<u-icon name="arrow-right" size="32" color="#8b8b8b"></u-icon>
				</view>
			</view>
			<view class="xls-cell">
				<p class="xls-field__label">经营地址</p>
				<view class="xls-field__body">
					<input type="text" placeholder="请输入经营地址(5~20个字)" class="xls-field__control"
						placeholder-style="color: #cacaca" />
				</view>
			</view>

			<view class="xls-title">
				<view class="info-title">场地和设备照片</view>
				<text class="example">《上传要求和示例》</text>
			</view>
			<!-- 门头照 -->
			<view class="picture">
				<view class="picture-box">
					<u-upload :previewFullImage="true" :fileList="commercial.imgList" name="img" @afterRead="afterRead"
						@delete="deletePic" :maxCount="1" class="upload" width="218" height="212">
						<view class="uploadBg img">
							<view class="xls-describe">
								<p class="title-text">门店招牌照</p>
								<view class="camera-icon">
									<image :src="`${$baseUrl}appV4/image/wallet/camera.png`" alt="" class="camera"
										mode="widthFix" />
								</view>
							</view>
						</view>
					</u-upload>
				</view>

				<view class="picture-box">
					<u-upload :previewFullImage="true" :fileList="commercial.enterimgList" name="enterimg"
						@afterRead="afterRead" @delete="deletePic" :maxCount="1" class="upload" width="218"
						height="224">
						<view class="uploadBg enterimg">
							<view class="xls-describe">
								<p class="title-text">门店招牌照</p>
								<view class="camera-icon">
									<image :src="`${$baseUrl}appV4/image/wallet/camera.png`" alt="" class="camera"
										mode="widthFix" />
								</view>
							</view>
						</view>
					</u-upload>
				</view>

				<view class="picture-box">
					<u-upload :previewFullImage="true" :fileList="commercial.innerimgList" name="innerimg"
						@afterRead="afterRead" @delete="deletePic" :maxCount="1" class="upload" width="218"
						height="224">
						<view class="uploadBg innerimg">
							<view class="xls-describe">
								<p class="title-text">门店招牌照</p>
								<view class="camera-icon">
									<image :src="`${$baseUrl}appV4/image/wallet/camera.png`" alt="" class="camera"
										mode="widthFix" />
								</view>
							</view>
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
						<u-icon name="arrow-leftward" size="38" color="#5241ff"></u-icon>
						<text class="text">上一步</text>
					</view>
					<view class="btn-wrapper" :class="{disabled: false}">
						<p class="text">提交</p>
						<p class="detail">(24小时内完成审核)</p>
					</view>
				</view>
				<div class="protocol">
				  <p>
				    提交即代表您已阅读并同意 <span>《条码支付用户服务协议》</span>和
				    <span>《商家支付服务协议》</span>
				  </p>
				</div>
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
				commercial: {
					imgList: [],
					enterimgList: [],
					innerimgList: [],
				}
			}
		},
		methods: {
			async afterRead(event) {
				const {
					file,
					index,
					name
				} = event;
				this.commercial[`${name}List`].push({
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
				this.commercial[`${name}List`] = [];
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '../index.scss';

	.font-size {
		font-size: 36rpx !important;
	}

	.xls-title {
		align-items: baseline;
		margin-top: 24rpx;
		display: flex;

		.example {
			color: #5241ff;
			font-size: 22rpx;
			font-weight: 500;
			height: 32rpx;
			line-height: 40rpx;
		}
	}

	.xls-describe {
		align-items: center;
		bottom: 24rpx;
		display: flex;
		padding: 0 16rpx;
		position: absolute;
		width: 100%;
		box-sizing: border-box;

		.camera-icon {
			height: 56rpx;
			margin: 0 auto;
			width: 56rpx;

			.camera {
				width: 100%;
			}
		}

		.title-text {
			color: #5241ff;
			flex-grow: 1;
			font-size: 24rpx;
			font-weight: 500;
			height: 34rpx;
			line-height: 40rpx;
			white-space: nowrap;
		}
	}
	
	.protocol {
	  color: rgba(0, 0, 0, 0.4);
	  font-size: 24rpx;
	  margin-top: 16rpx;
	  
	  span {
	    color: #5241ff;
	  }
	}
</style>
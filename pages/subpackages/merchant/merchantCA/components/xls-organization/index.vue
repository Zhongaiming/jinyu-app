<template>
	<view class="xls-organization-tabs-outside" v-if="current < 4">
		<view class="organizationTabs">
			<view class="tabs">
				<!-- 个人/个体 -->
				<view class="cances" v-if="['PERSON', 'INDIVIDUALBISS'].includes(merchantType)">
					<view class="organizationActiveTab">
						<view class="item item1 right" @click="changeMerchantType('PERSON')">
							<p class="text" :class="{'text-active': merchantType === 'PERSON'}">
								个人
							</p>
						</view>
						<view class="viewider"></view>
						<view class="item left" @click="changeMerchantType('INDIVIDUALBISS')">
							<p class="text" :class="{'text-active': merchantType === 'INDIVIDUALBISS'}">
								个体工商户
							</p>
						</view>
					</view>
				</view>

				<view class="tab" v-else @click="changeMerchantType('PERSON')">
					<view class="tab-item">
						<view class="organizationNormalTab">
							<image :src="`${$baseUrl}appV4/image/wallet/zooid.png`" alt="" class="image-style" />
							<p class="text">个人/个体</p>
						</view>
					</view>
				</view>

				<!-- 企业商户 -->
				<view class="cances cances-center" v-if="['ENTERPRISE'].includes(merchantType)">
					<view class="organizationActiveTab">
						<view class="item">
							<p class="text text-active">企业商户</p>
						</view>
					</view>
				</view>

				<view class="tab" v-else @click="changeMerchantType('ENTERPRISE')">
					<view class="tab-item">
						<view class="organizationNormalTab">
							<image :src="`${$baseUrl}appV4/image/wallet/firm.png`" alt="" class="image-style" />
							<p class="text">企业商户</p>
						</view>
					</view>
				</view>

				<!-- 事业/政府 -->
				<!-- <view class="cances cances-center canves-three" v-if="['INSTITUTION', 'OTHER'].includes(merchantType)">
					<view class="organizationActiveTab">
						<view class="item right" @click="changeMerchantType('OTHER')">
							<p class="text" :class="{'text-active': merchantType === 'OTHER'}">政府机构</p>
						</view>
						<view class="viewider"></view>
						<view class="item left" @click="changeMerchantType('INSTITUTION')">
							<p class="text" :class="{'text-active': merchantType === 'INSTITUTION'}">事业单位</p>
						</view>
					</view>
				</view>

				<view class="tab" v-else @click="changeMerchantType('OTHER')">
					<view class="tab-item">
						<view class="organizationNormalTab">
							<image :src="`${$baseUrl}appV4/image/wallet/government.png`" alt="" class="image-style">
								<p class="text">事业/政府</p>
						</view>
					</view>
				</view> -->

				<!-- 其他组织 -->
				<!-- <view class="cances cances-finsh" v-if="['SUBJECT_TYPE_OTHERS'].includes(merchantType)">
					<view class="organizationActiveTab">
						<view class="item">
							<p class="text text-active">其他组织</p>
						</view>
					</view>
				</view>

				<view class="tab finsh-tab" v-else @click="changeMerchantType('SUBJECT_TYPE_OTHERS')">
					<view class="tab-item">
						<view class="organizationNormalTab">
							<image :src="`${$baseUrl}appV4/image/wallet/else.png`" alt="" class="image-style">
								<p class="text">其他组织</p>
						</view>
					</view>
				</view> -->


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
			},
		},
		data() {
			return {
				mainActive: false,
				fristActive: 1
			}
		},
		methods: {
			changeMerchantType(params) {
				this.$emit('changeMerchantType', 'merchantType', params);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.xls-organization-tabs-outside {
		margin-top: -24rpx;

		.organizationTabs {
			height: 91rpx;

			.tabs {
				align-items: flex-end;
				background-color: #f0f3f5;
				border-radius: 24rpx 24rpx 0 0;
				display: flex;
				padding-right: 200rpx;
				height: 90rpx;

				.cances {
					height: 100rpx;
					flex: 1;
					background: #fff;
					border-radius: 24rpx 0rpx 100rpx 0;
					position: relative;
					box-shadow: 10rpx 10rpx 20rpx #ddd;
					border-bottom: 2rpx solid #ddd;
					overflow: hidden;

					.organizationActiveTab {
						padding-top: 28rpx;
						@include center-flex();

						.text {
							color: #333;
							font-size: 28rpx;
							font-weight: 700;
							height: 40rpx;
							line-height: 40rpx;
							padding-bottom: 10rpx;
							white-space: nowrap;
							box-sizing: content-box;
						}

						.item {
							flex: 1;
							text-align: center;
						}

						.item1 {
							flex: 0.7;
						}

						.text-active {
							display: inline-block;
							border-bottom: 4rpx solid #5241ff;
							color: #5241ff;

						}

						.left {
							text-align: left;
						}

						.right {
							text-align: right;
						}

						.viewider {
							background-color: #e6e6e6;
							height: 28rpx;
							margin: 0 16rpx;
							width: 2rpx;
						}
					}
				}

				.cances-center {
					border-radius: 100rpx 0rpx 100rpx 0rpx;
					margin-left: 40rpx;
				}

				.canves-three {
					margin-left: 10rpx;
				}

				.cances-finsh {
					margin-left: 30rpx;
					border-radius: 0rpx 24rpx 0rpx 100rpx;
				}

				.tab {
					align-items: center;
					display: flex;
					height: 90rpx;
					margin-left: 30rpx;
					position: relative;
					text-align: center;

					.tab-item {
						height: 90rpx;

						.organizationNormalTab {
							height: 90rpx;
							overflow: hidden;

							.image-style {
								display: block;
								height: 40rpx;
								margin: 10rpx auto 0;
								width: 40rpx;
							}

							.text {
								color: #333;
								font-size: 20rpx;
								font-weight: 500;
								height: 28rpx;
								margin-top: 4rpx;
								text-align: center;
								white-space: nowrap;
							}
						}
					}
				}

				.finsh-tab {
					margin-right: 30rpx;
				}
			}
		}
	}
</style>
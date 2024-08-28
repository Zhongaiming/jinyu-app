<template>
	<z-paging ref="memberPaging" v-model="dataList" @query="queryList">
		<view slot="top">
			<xls-jy-navbar title="会员管理" bgColor="#f5f6f7"></xls-jy-navbar>
			<xls-statistics></xls-statistics>
			<xls-condition></xls-condition>
		</view>
		<!-- 会员列表 -->
		<view class="xls-list">
			<u-checkbox-group v-model="checkboxGroup" @change="checkboxChange" placement="column">
				<view v-for="(item, index) in dataList" :key="index" class="xls-list-item">
					<view class="list-item" @click="goMemberDetail(item)">
						<view class="user-list">
							<view v-show="setMember">
								<u-checkbox :name="`${item.id}`" size="40" iconSize="32" activeColor="#5241FF"
									shape="circle"></u-checkbox>
							</view>
							<view class="content">
								<view class="info-container">
									<view class="avatar">
										<xls-image :src="item.url" alt="" class="img" v-if="item.url" />
									</view>
									<view class="info">
										<view class="name-wrapper">
											<view class="top">
												<view class="icon-image icon">
													<!-- item.platformState  1 微信  2 支付宝 -->
													<image :src="`${$baseUrl}appV4/member/Alipay.png`" alt=""
														class="img" v-if="item.memberOpenid * 1 > 0" />
													<image :src="`${$baseUrl}appV4/member/WeChat2.png`" alt=""
														class="img" v-else />
												</view>
												<view class="nickname">{{ item.name }}</view>
											</view>
											<view class="desc">
												<span>最近消费:
													{{
				                    item.recentConsumption * 1
				                      ? item.recentConsumption + "天前"
				                      : "今天"
				                  }}</span>
											</view>
										</view>
										<view class="other-info">
											<view class="id">ID:{{ item.id }}</view>
											<view class="copy" @click.stop="copyMemberId(item.id)">
												<span class="text">复制</span>
											</view>
										</view>
									</view>
								</view>
								<view class="data-container">
									<view class="data-list">
										<view class="number">{{ item.totalPay }}</view>
										<view class="name"><span>累计支付(元)</span></view>
									</view>
									<view class="data-list">
										<view class="number">{{ item.balance }}</view>
										<view class="name"><span>余额(元)</span></view>
									</view>
									<view class="data-list">
										<view class="number">{{ item.currency }}</view>
										<view class="name"><span>余币(个)</span></view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<xls-empty slot="empty" />
			</u-checkbox-group>
		</view>
	</z-paging>
</template>

<script>
	import xlsStatistics from "./components/xls-statistics/index.vue";
	import xlsCondition from "./components/xls-condition/index.vue";
	import {
		copyEvent
	} from "@/plugins/formUtils";
	import {
		memberController
	} from '@/api/index.js';
	export default {
		components: {
			xlsStatistics,
			xlsCondition,
		},
		data() {
			return {
				dataList: [],
				setMember: false,
				checkboxGroup: [],
			}
		},
		methods: {
			goTo() {

			},
			goMemberDetail(item) {
				return
				this.$goTo('/pages/subpackages/home/member/detail', 'navigateTo', {
					item
				})
			},
			//copy-会员ID
			copyMemberId(memberId) {
				copyEvent(memberId);
			},
			queryList(pageNo, pageSize) {
				memberController.getList({
					page: pageNo,
					size: pageSize,
				}).then(res => {
					if (res.code === 200) {
						this.$refs.memberPaging.complete(res.data);
					}
				})
			},
			checkboxChange(n) {
				console.log('change', n);
			},
		}
	}
</script>

<style lang="scss" scoped>
	.xls-list {
		padding: 24rpx;

		.list-item {
			width: 100%;
		}

		.user-list {
			margin-bottom: 16rpx;
			padding: 24rpx;
			border: none;
			border-radius: 24rpx;
			display: flex;
			color: #323233;
			font-size: 28rpx;
			line-height: 28rpx;
			background-color: #fff;

			.content {
				flex: 1;

				.info-container {
					display: flex;

					.avatar {
						width: 80rpx;
						height: 80rpx;
						border-radius: 50%;
						margin-right: 24rpx;
						position: relative;
						overflow: hidden;

						img {
							width: 100%;
							height: 100%;
						}
					}

					.info {
						flex: 1;
						overflow: hidden;

						.name-wrapper {
							display: flex;
							align-items: center;
							height: 42rpx;
							overflow: hidden;

							.top {
								flex: 1;
								display: flex;
								align-items: center;
								overflow: hidden;

								.icon-image {
									width: 40rpx;
									height: 40rpx;
									margin-right: 8rpx;

									.img {
										width: 100%;
										height: 100%;
									}
								}

								.nickname {
									font-size: 28rpx;
									overflow: hidden;
									text-overflow: ellipsis;
									white-space: nowrap;
									flex: 1;
								}
							}

							.desc {
								color: #999;
								display: flex;
								align-items: center;
								justify-content: flex-end;
								margin-left: 44rpx;
								font-size: 24rpx;
							}
						}

						.other-info {
							display: flex;
							align-items: center;
							margin-top: 4rpx;

							.id {
								color: #999;
								font-size: 24rpx;
								height: 34rpx;
								display: flex;
								align-items: center;
								margin-right: 8rpx;
							}

							.copy {
								width: 56rpx;
								height: 32rpx;
								border: 2rpx solid #9389ff;
								border-radius: 8rpx;
								color: #5241ff;
								display: flex;
								align-items: center;
								justify-content: center;

								.text {
									font-size: 24rpx;
									transform: scale(0.83333);
								}
							}
						}
					}
				}

				.data-container {
					margin-top: 36rpx;
					padding: 0 34rpx 0 104rpx;
					display: flex;
					justify-content: space-between;

					.data-list {
						text-align: center;
						display: flex;
						flex-direction: column;
						align-items: center;

						.number {
							font-size: 36rpx;
							font-weight: 700;
							color: #333;
							height: 40rpx;
							display: flex;
							align-items: center;
							padding-right: 16.66667%;
							font-family: DINAlternate, DINAlternate-Bold;
						}

						.name {
							height: 32rpx;
							margin-top: 8rpx;
							display: flex;
							align-items: center;
							color: #999;
							font-size: 24rpx;
						}
					}
				}
			}
		}
	}
</style>
<template>
	<view class="xls-merchat-auth">
		<xls-jy-navbar title="审核进度" bgColor="#5241FF" titleStyle="color: #fff"></xls-jy-navbar>
		<xls-steps :current="6"></xls-steps>

		<view class="tabs-outside">
			<view class="tabs-box box-color">
				<view class="tab tab-text-wrapper">
					中国银行 <u-icon name="arrow-right"></u-icon>
				</view>
			</view>

			<view class="tabs-box">
				<view class="tab" @click="activeItem = 2" :class="{active: activeItem === 2}">
					<p class="tab-text">待认证</p>
				</view>
				<view class="tab" @click="activeItem = 1" :class="{active: activeItem === 1}">
					<p class="tab-text">已认证</p>
				</view>
			</view>
		</view>
		<!-- 认证记录 -->
		<view class="stay-attestation">
			<!-- 实名认证 -->
			<view v-for="(data,dataIndex) in dataList" :key="dataIndex">
				<view class="screenshot-contanier" v-for="(item,itemIndex) in data.authInfoList"
					:key="$getUniqueKey(dataIndex, itemIndex)" v-show="item.authorizeStatus == activeItem">
					<view class="logo-index">
						<image :src="`${$baseUrl}appV4/authentications/svg/${item.url}`" alt="" class="image"
							mode="heightFix" />
					</view>
					<view class="main-wrapper">
						<view class="content-text">
							<view class="title" v-if="item.authorizeStatus == 2">
								待{{ item.legalPerson }}实名认证{{ item.sort }}
							</view>
							<view class="title" v-else>已完成实名认证{{ item.sort }}</view>
							<view class="content-block-guide">
								<view class="info" v-if="item.threePartnerNo">
									<span class="label">渠道商户号：</span>
									<span class="value"> {{ item.threePartnerNo }} </span>
								</view>
								<view class="info">
									<span class="label">商户名称：</span>
									<span class="value"> {{ item.merchantName }} </span>
								</view>
								<view class="info">
									<span class="label">法人名称：</span>
									<span class="value">{{ item.legalPerson }}</span>
								</view>
							</view>
						</view>
						<xls-merchant-state :state="item.authorizeStatus"></xls-merchant-state>
					</view>

					<view class="button-block-guide" v-if="item.authorizeStatus === 2 && !item.appPayType">
						<view class="message-index">
							<span class="status-message">
								提示：资料审核需要1-3个工作日，请您耐心等待！
							</span>
						</view>
					</view>
					<view class="button-block-guide" v-if="item.appPayType">
						<view type="info" class="mmoi-button" @click="goTo(item)">
							<view class="mmoi-button-icon">
								<svg viewBox="0 0 1024 1024" fill="currentColor" width="100%" height="100%">
									<path
										d="M512 68.032a443.968 443.968 0 1 1 0 887.936 443.968 443.968 0 0 1 0-887.936zm0 72a372.032 372.032 0 1 0 0 744 372.032 372.032 0 0 0 0-744.064zm156.416 235.84a36.032 36.032 0 0 1 51.456 50.368L492.8 658.112a36.032 36.032 0 0 1-50.88.64l-115.84-112.96a36.032 36.032 0 1 1 50.24-51.584l90.176 87.872 201.92-206.208z">
									</path>
								</svg>
							</view>
							<!-- 1 认证  2否 -->
							{{item.authorizeStatus == 1 ? "认证详情" : "立即认证"}}
						</view>
					</view>
				</view>
			</view>
			<xls-data-nul v-if="getDataNull"></xls-data-nul>
			<!-- 温馨提示 -->
			<view class="tip-message" v-if="activeItem == 2&&!getDataNull">
				<view class="tip-message-inner">
					<view class="title">温馨提示</view>
					<ul class="content">
						<li>
							<span class="space"></span><span class="name">为免影响您的收款，请尽快扫码完成实名认证。</span>
						</li>
						<li>
							<span class="space"></span><span class="name">如您已经实名签约，等待15分钟即可进行收款若无法收款请返回
								实名认证页面查看实名状态。</span>
						</li>
					</ul>
				</view>
			</view>
			<view class="xls-link-style" @click="goTo('xxx', 1)">
				常见问题
			</view>
			<xls-new-hand></xls-new-hand>
		</view>
	</view>
</template>

<script>
	import xlsSteps from "../merchantCA/components/xls-steps/index.vue";
	import xlsMerchantState from "./components/xls-merchant-state.vue";
	import xlsNewHand from "./components/xls-new-hand.vue";
	import xlsDataNul from "./components/xls-data-null.vue";
	import {
		merchantController
	} from '@/api/index.js';
	export default {
		components: {
			xlsSteps,
			xlsMerchantState,
			xlsNewHand,
			xlsDataNul,
		},
		data() {
			return {
				activeItem: 2,
				dataList: [],
				authorizeStatusList: [],
			}
		},
		created() {
			this.getList();
		},
		computed: {
			getKey(index) {
				return `main${index}`;
			},
			getDataNull() {
				return (this.authorizeStatusList.length == 0 && this.activeItem == 2) || (this.authorizeStatusList
					.length == this.dataList[0].length && this.activeItem == 1)
			},
		},
		methods: {
			goTo(params, type) {
				let route = '/pages/subpackages/merchant/authentication/detail';
				if (type === 1) route = '/pages/subpackages/merchant/frequentlyQuestion/index';
				this.$goTo(route, 'navigateTo', {
					params
				})
			},
			getList() {
				this.$loading();
				merchantController.authorizeQuery().then(res => {
					this.$hideLoading();
					res.data[0].authInfoList.forEach((item, index) => {
						if (item.appPayType === 'WXPAY') {
							item['url'] = 'wx-pay.png';
						} else if (item.appPayType === 'ALIPAY') {
							item['url'] = 'zfb-pay.png';
							if (index === 2) {
								item['sort'] = '(一)';
							} else {
								item['sort'] = '(二)';
							}
						} else {
							item['url'] = 'pay-icon.png';
						}
						if (item.authorizeStatus === 2) {
							this.authorizeStatusList.push(item)
						}
					})
					this.dataList = res.data
				})
			},

		}
	}
</script>

<style lang="scss" scoped>
	@import 'index.scss';

	.xls-merchat-auth {
		display: flex;
		flex-direction: column;
		position: relative;

		.tabs-outside {
			background-color: #fff;
			border-radius: 24rpx 24rpx 0 0;
			flex-shrink: 0;
			margin-top: -40rpx;
			padding: 24rpx;

			.tabs-box {
				align-items: center;
				background-color: #f0f3f5;
				border-radius: 16rpx;
				display: flex;
				padding: 4rpx;
				box-sizing: border-box;

				.tab {
					color: #666;
					flex: 1;
					font-family: PingFangSC;
					font-size: 26rpx;
					font-weight: 400;
					height: 56rpx;
					line-height: 56rpx;
					text-align: center;
				}

				.tab:first-child {
					border-radius: 12rpx 0 0 12rpx;
				}

				.tab:last-child {
					border-radius: 0 12rpx 12rpx 0;
				}

				.active {
					background-color: #fff;
					color: #333;
					font-weight: 700;
				}

				.tab-text-wrapper {
					text-align: left;
					display: flex;
					color: #333;
					font-weight: 700;
				}
			}

			.box-color {
				background: #fff;
			}
		}
	}
</style>
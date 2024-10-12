<template>
	<view class="header">
		<view class="top-container">
			<view class="info-container">
				<view class="info-content">
					<view class="avatar">
						<image :src="userMsg.url" alt="" class="header" />
					</view>
					<view class="info">
						<view class="nickname">
							<span class="name van-ellipsis">{{ userMsg.name }}</span>
						</view>
						<view class="other-info">
							<view class="id">ID:{{ userMsg.id }}</view>
							<view class="copy" @click.stop="copyMemberId(userMsg.id)">
								<span class="text">复制</span>
							</view>
						</view>
					</view>
					<view class="declaration" @click="$refs.notice.showTips(1)">
						<p class="text">数据说明</p>
					</view>
					<notice-vue ref="notice" />
				</view>
				<view class="total-container">
					<view class="total-list">
						<view class="number">
							<view>{{ $formatAmount(userMsg.totalPay) }}</view>
						</view>
						<view class="name">
							<view class="text">累计支付(元)</view>
						</view>
					</view>
					<view class="total-list" @click="goTo('accountDetail', 'balance')">
						<view class="number">
							<view>{{ $formatAmount(userMsg.balance) }}</view>
						</view>
						<view class="name">
							<view class="text">余额(元)</view>
							<view class="arrow-icon"></view>
						</view>
					</view>
					<view class="total-list" @click="goTo('accountDetail', 'currency')">
						<view class="number">
							<view>{{ userMsg.currency }}</view>
						</view>
						<view class="name">
							<view class="text">余币(个)</view>
							<view class="arrow-icon"></view>
						</view>
					</view>
				</view>
				<view class="rights-container">
					<view class="rights-list">
						<view class="name"><span>会员卡</span></view>
						<view class="number">0</view>
					</view>
					<view class="line"></view>
					<view class="rights-list">
						<view class="name"><span>优惠卷</span></view>
						<view class="number">0</view>
					</view>
				</view>
			</view>
		</view>

		<view class="detail-content">
			<view class="menu-container">
				<view class="menu-list" @click="partWelfare = true">
					<u-icon name="rmb-circle" color="#5241FF" size="48" class="icon-tab" />
					<view class="name">派发福利</view>
				</view>
				<view class="menu-list" @click="goTo('userInfo', '')">
					<u-icon name="list-dot" color="#5241FF" size="48" class="icon-tab" />
					<view class="name">更多资料</view>
				</view>
			</view>

			<view class="statis-statistics">
				<view class="statis-item">
					<view class="statis-money">{{ $formatAmount(orderDetail.cumulativeRecharge) }}</view>
					<view class="statis-title">累计充值(元)</view>
				</view>
				<view class="statis-item">
					<view class="statis-money">{{ $formatAmount(orderDetail.startPayment) }}</view>
					<view class="statis-title">启动支付(元)</view>
				</view>
				<view class="statis-item">
					<view class="statis-money">{{ $formatAmount(orderDetail.balancePayment) }}</view>
					<view class="statis-title">余额支付(元)</view>
				</view>
				<view class="statis-item">
					<view class="statis-money">{{ orderDetail.cumulativeCoin||0 }}</view>
					<view class="statis-title">累计投币(个)</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import noticeVue from './notice.vue'
	import {
		copyEvent
	} from "@/plugins/formUtils"

	export default {
		name: "member-detail-header",
		components: {
			noticeVue
		},
		props: {
			userMsg: {
				type: Object,
				default: () => {
					return {}
				}
			},
			orderDetail: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		data() {
			return {

			}
		},
		methods: {
			goTo(route) {
				const params = {
					type: 'balance'
				}
				this.$goTo("accountDetail", "navigateTo", params)
			},
			copyMemberId(memberId) {
				copyEvent(memberId);
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../detail.scss';
</style>
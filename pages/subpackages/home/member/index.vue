<template>
	<z-paging ref="memberPaging" v-model="dataList" @query="queryList">
		<view slot="top">
			<xls-jy-navbar title="会员管理" bgColor="#f5f6f7"></xls-jy-navbar>
			<!-- <xls-statistics></xls-statistics> -->
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
													<xls-image :src="`${$baseUrl}appV4/member/Alipay.png`" alt=""
														class="img" v-if="item.memberOpenid * 1 > 0" />
													<xls-image :src="`${$baseUrl}appV4/member/WeChat2.png`" alt=""
														class="img" v-else />
												</view>
												<view class="nickname">{{ item.name }}</view>
											</view>
											<view class="desc">
												<span>
													最近消费:{{item.recentConsumption*1?item.recentConsumption+"天前":"今天"}}
												</span>
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
										<view class="number">{{ $formatAmount(item.totalPay) }}</view>
										<view class="name"><span>累计支付(元)</span></view>
									</view>
									<view class="data-list">
										<view class="number">{{ $formatAmount(item.balance) }}</view>
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
			</u-checkbox-group>
		</view>
		<xls-empty slot="empty" />
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
				this.$loading()
				memberController.getList({
					page: pageNo,
					size: pageSize,
				}).then(res => {
					this.$hideLoading()
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
	@import 'index.scss';
</style>
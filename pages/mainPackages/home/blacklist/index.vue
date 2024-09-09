<template>
	<z-paging ref="paging" v-model="blackList" @query="queryList">
		<view slot="top">
			<xls-jy-navbar title="黑名单管理"></xls-jy-navbar>
			<view class="input-content">
				<view class="input-wapper">
					<xls-search placeholder="输入用户ID/手机号" marLeft="-6em" @confirm="stratesSearch" />
				</view>
				<view class="add-black">
					<span class="opertation" v-hasPermi="['app:back:index:records']" @click="goTo()">操作记录>>
					</span>
					<span class="plus-circle" @click="addBlack()" v-hasPermi="['app:back:index:add']">
						<u-icon name="plus-circle" size="40" color="#5241FF" class="icon" />添加黑名单
					</span>
				</view>
			</view>
		</view>


		<view class="black-list-panel">
			<view class="black-item" v-for="(item, index) in blackList" :key="index">
				<view class="left">
					<image :src="item.img" alt="" class="avatar" mode="widthFix" />
				</view>
				<view class="middle">
					<p class="name">{{ item.nickName }}</p>
					<p class="info">
						ID: {{ item.memberId
					}}<span class="gender">
							{{sexDict[item.sex]}}
						</span>
					</p>
				</view>
				<view class="right">
					<view class="button" v-hasPermi="['app:back:index:detail']" @click="getMemberDetail(item.memberId)">
						详情
					</view>
					<view class="button" v-hasPermi="['app:back:index:delete']" @click="deleteBlackList(item.memberId)">
						剔除
					</view>
				</view>
			</view>
		</view>
		<xls-empty slot="empty" />
		<!-- member -->
		<xls-member-list-vue ref="memberlist" @updataMethod="stratesSearch"></xls-member-list-vue>
		<!-- detail -->
		<u-popup :show="blackDetail" round="20" mode="center">
			<view class="black-member black-detail">
				<view class="title-detail">详情</view>
				<view class="info-wapper">
					<view class="detail-content">
						<view class="top-content">
							<xls-image :src="memberDetail.img" alt="" class="img" />
							<view class="user-info">
								<p class="info-name">{{ memberDetail.nickName }}</p>
								<p class="info-id">
									<span>ID:{{ memberDetail.memberNumber }}-</span>
									<span>{{memberDetail.phone?`Tel:${memberDetail.phone}`:'Tel:用户未提供'}}</span>
								</p>
							</view>
						</view>

						<view class="center-container">
							<view class="item title-item">
								<!-- <span>累计消费</span>  -->
								<span>累计支付</span>
								<!-- <span>累计余额消费</span> -->
								<span>累计投币</span>
							</view>
							<view class="item value-text">
								<!-- <span>{{'--'}}元</span>  -->
								<span>{{ $formatAmount(memberDetail.totalPay) }}元</span>
								<span>{{ memberDetail.totalCoins }}个</span>
								<!-- <span>{{'--'}}元</span> -->
							</view>
							<view class="item title-item">
								<!-- <span>累计投币</span>  -->
								<span>余币</span>
								<span>余额</span>
								<!-- <span>积分</span> -->
							</view>
							<view class="item value-text">
								<span>{{ memberDetail.currency }}个</span>
								<span>{{ $formatAmount(memberDetail.balance) }}元</span>
								<!-- <span>{{'积分'}}</span> -->
							</view>
						</view>

						<view class="static-container" v-show="memberDetail.blackReason">
							<p>原因：</p>
							<p class="reason-value">
								{{ memberDetail.blackReason }}
							</p>
						</view>
					</view>
				</view>
				<view class="btn-wrapper">
					<view class="btn" @click="blackDetail = !blackDetail">我知道了</view>
				</view>
			</view>
		</u-popup>
	</z-paging>
</template>

<script>
	import {
		memberController
	} from '@/api/index.js';
	import xlsMemberListVue from './components/xls-member-list.vue';
	export default {
		components: {xlsMemberListVue},
		data() {
			return {
				blackList: [],
				sexDict: {
					1: '男',
					2: '女',
					undefined: ''
				},
				searchValue: "",
				memberDetail: {
					memberNumber: 0,
				},
				blackDetail: false,
			};
		},

		methods: {
			queryList(pageNo, pageSize) {
				memberController.getBlackPageList({
					page: pageNo,
					size: pageSize,
					...(this.searchValue && { search: encodeURIComponent(this.searchValue) }),
				}).then(res => {
					if (res.code === 200) {
						this.$refs.paging.complete(res.data);
					}
				})
			},
			//search
			stratesSearch(search) {
				this.searchValue = search;
				this.$refs.paging.reload();
			},
			goTo() {
				this.$goTo("/pages/mainPackages/home/blacklist/record")
			},
			addBlack() {
				this.$refs.memberlist.openPopup();
			},
			//剔除黑名单
			deleteBlackList(memberId) {
				this.$modal("是否将该客户剔除出黑名单列表，并恢复其支付权限？",{
						title: "剔除黑名单",
					})
					.then(() => {
						memberController.deleteBlackInfo({
								memberId,
							})
							.then((res) => {
								if (res.code == 200) {
									this.$toast("剔除成功");
									this.$refs.paging.reload();
								}
							})
							.catch((err) => {});
					});
			},
			//会员详情
			async getMemberDetail(memberId) {
				let res = await memberController.getMemberInfo({
					memberId,
				});
				if (res.code == 200) {
					this.blackDetail = true;
					this.memberDetail = res.data;
				}
			},
			
		},
	};
</script>

<style lang="scss" scoped>
	@import 'index.scss';
</style>
<template>
	<view>
		<u-popup :show="blackMember" round="20" mode="bottom" closeable @close="() => {
			blackMember = false
		}">
			<view class="black-member">
				<z-paging v-if="blackMember" :fixed="false" ref="memberPaging" v-model="memberList" @query="queryList">
					<view slot="top">
						<view class="title-detail">
							添加黑名单
							<u-icon name="question-circle" size="36" color="#cccccc" class="icon-o" @click="blackListTips" />
						</view>
						<xls-search placeholder="输入会员ID" marLeft="-6em" @confirm="stratesSearch" />
					</view>
					<view class="black-list-panel black-detail-panel">
						<view class="black-item" v-for="(memberDetail, index) in memberList" :key="index">
							<view class="left">
								<xls-image :src="memberDetail.url" alt="" class="avatar" />
							</view>
							<view class="middle">
								<p class="name text-over" :class="{'null-name':memberDetail.name}">
									{{memberDetail.name?memberDetail.name:"用户未提供"}}
								</p>
								<p class="info">
									ID: {{ memberDetail.memberNumber }}
									<span class="gender">{{sexDict[memberDetail.sex]}}</span>
								</p>
							</view>
							<view class="right">
								<!-- <view class="button" @click="getMemberDetail(memberDetail.memberNumber)">
									详情
								</view> -->
								<view class="button" @click="addBlackMethod(memberDetail)">
									添加
								</view>
							</view>
						</view>
					</view>
					<xls-empty slot="empty"></xls-empty>
				</z-paging>
			</view>
		</u-popup>
		<black-reason-vue ref="blackreason" @confirm="addBlackInfo"></black-reason-vue>
	</view>
</template>

<script>
	import {
		memberController
	} from "@/api/index.js";
	import blackReasonVue from "./black-reason.vue";
	export default {
		components: {blackReasonVue},
		data() {
			return {
				blackMember: false,
				memberList: [],
				searchValue: "",
				sexDict: {
					1: '男',
					2: '女',
					undefined: ''
				},
				member: {},
			}
		},
		methods: {
			queryList(pageNo, pageSize) {
				memberController.getList({
					page: pageNo,
					size: pageSize,
					...(this.searchValue && { search: encodeURIComponent(this.searchValue) }),
				}).then(res => {
					if (res.code === 200) {
						this.$refs.memberPaging.complete(res.data);
					}
				})
			},
			stratesSearch(value) {
				this.searchValue = value;
				this.$refs.memberPaging.reload();
			},
			openPopup() {
				this.blackMember = !this.blackMember;
			},
			addBlackMethod(member) {
				Object.assign(this.member, member);
				this.blackMember = !this.blackMember;
				this.$refs.blackreason.openPopup();
			},
			addBlackInfo(reason) {
				if (!reason) {
					return this.$toast("加入黑名单原因不能为空");
				}
				memberController.addBlackInfo({
					memberId: this.member.memberId, //会员ID
					remarks: reason, //加入黑名单原因
				}).then(res => {
					if(res.code == 200) {
						this.$toast("添加成功");
						this.blackMember = false;
						this.$refs.blackreason.openPopup();
						this.$emit('updataMethod', '');
					}
				})
			},
			getMemberDetail() {
				
			},
			//黑名单规则
			blackListTips() {
				this.$modal("场景:\n 针对部分玩家有损害商家运营的行为而推出的限制体验手段，可拒绝玩家支付 \n\n 使用说明：\n 1、商家定位到异常玩家的ID \n 2、商家将该玩家(ID)加入黑名单做黑名单限制",{
					title: "黑名单规则说明",
					showCancel: false,
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '../index.scss';
</style>
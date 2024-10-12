<template>
	<z-paging ref="paging" v-model="dataList" @query="queryList">
		<xls-jy-navbar title="设备故障" slot="top"></xls-jy-navbar>
		<xls-tabs :options="options" v-model="state" class="tab-style" @change="changeActiveName"></xls-tabs>
		<xls-search placeholder="请输入场地名称或设备编号" marLeft="-8em" @confirm="stratesSearch" />
		<u-checkbox-group v-model="checkGroup" placement="column" class="content-list">
			<view class="list-item" v-for="(item, index) in dataList" :key="index">
				<u-checkbox :name="item.id" activeColor="#5241FF" shape="circle" iconSize="32" labelSize="36" size="38"
					class="checkbox-class"></u-checkbox>
				<!-- <view class="delete-wrapper" v-if="item.state == 1" @click="deleteList([item.id])">
					<u-icon name="trash" size="40" color="#fff" />
				</view> -->
				<p>设备名称: {{ item.deviceNumber }}</p>
				<p>故障描述：{{ item.errorDescribe }}</p>
				<p>错误代码: {{ item.errorCode }}</p>
				<p>备注：{{ item.deviceNumber }}</p>
				<p>投放场地：{{ item.placeName }}</p>
				<p>反馈时间: {{ item.createTime }}</p>
				<span class="item-btn del-btn" v-if="item.state == 1" @click="deleteList([item.id])">删除</span>
				<span class="item-btn" :class="{'yet-style':state == 1}" v-else
					@click="dealWithFaulted([item.id], item.state)">{{stateDict[state]}}</span>
			</view>
		</u-checkbox-group>
		<xls-empty slot="empty"></xls-empty>
		<view class="bottom-wrapper" slot="bottom">
			<view class="all-check-list">
				<u-checkbox-group v-model="allCheckGroup" @change="allGroupChange">
					<u-checkbox activeColor="#5241FF" name="1" shape="circle" iconSize="32" labelSize="36" size="38">
					</u-checkbox>
					<text>全选 ({{ `${checkGroup.length} 个` }})</text>
				</u-checkbox-group>
				<view class="btn" :class="state==1?'del':''" @click="confirmMethod">
					确定{{state==0?'处理':'删除'}}
				</view>
			</view>
			<xls-tabbar-vue :activeType="2" ref="tabbar"></xls-tabbar-vue>
		</view>
	</z-paging>
</template>

<script>
	import xlsTabbarVue from "./components/xls-tabbar/xls-tabbar.vue";
	import {
		deviceController
	} from "@/api/index.js";
	export default {
		components: {
			xlsTabbarVue
		},
		data() {
			return {
				dataList: [],
				// tabs
				state: 0,
				stateDict: {
					0: '待处理',
					1: '已处理',
					2: '已删除',
					undefined: '其他'
				},
				options: [{
					key: 0,
					value: "待处理",
				}, {
					key: 1,
					value: "已处理",
				}],
				searchValue: "",
				checkGroup: [],
				allCheckGroup: [],
			}
		},
		methods: {
			queryList(pageNo, pageSize) {
				deviceController.getFaultList({
					page: pageNo,
					size: pageSize,
					state: this.state,
					...(this.searchValue && {
						search: encodeURIComponent(this.searchValue)
					})
				}).then(res => {
					this.$refs.paging.complete(res.data.dataList);
				})
			},
			changeActiveName() {
				this.checkGroup = []
				this.$refs.paging.reload()
			},
			stratesSearch(value) {
				this.searchValue = value
				this.$refs.paging.reload()
			},
			// 处理故障
			async dealWithFaulted(id, state) {
				if (state == 1) {
					return this.$toast("故障已处理~")
				}
				this.$modal("确定处理该设备故障吗？", {
					title: "温馨提示",
				}).then(() => {
					deviceController.dealWithFault({
						idList: id,
						state: 1, //处理状态 0:未处理，1：已处理，2，已删除
					}).then(res => {
						if (res.code == 200) {
							this.$toast("处理成功")
							this.$refs.paging.reload()
							this.$refs.tabbar.getFaultTotal()
						}
					}).catch(() => {})
				}).catch(() => {})
			},
			// 删除已处理故障
			deleteList(idList) {
				this.$modal(`确定删除选择的故障记录吗？`, {
					title: "温馨提示",
				}).then(() => {
					deviceController.dealWithFault({
						idList: idList,
						state: 2
					}).then((res) => {
						if (res.code == 200) {
							this.$toast("删除成功")
							this.$refs.paging.reload()
						}
					});
				}).catch(() => {});
			},
			allGroupChange(item) {
				if (item.length) {
					this.checkGroup = this.dataList.map(item => item.id)
				} else {
					this.checkGroup = []
				}
			},
			confirmMethod() {
				if(!this.checkGroup.length) {
					return this.$toast("请先选择~")
				}
				if(this.state == 1) {
					this.deleteList(this.checkGroup)
				} else {
					this.dealWithFaulted(this.checkGroup, 0)
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.content-list {
		padding: 10px;
		padding-bottom: 0px;

		.list-item {
			background: #fff;
			border-radius: 5px;
			margin-bottom: 10px;
			padding: 13px 10px;
			position: relative;

			.delete-wrapper {
				position: absolute;
				top: 5px;
				right: 30px;
				padding: 5px;
				border-radius: 50%;
				// background: #ffeff0;
				background: #ff7886;
			}

			p {
				color: #1a1a1a;
				margin-bottom: 5px;
				font-size: 14px;
			}

			.item-btn {
				align-items: center;
				background: #5241ff;
				border-radius: 5px;
				bottom: 15px;
				color: #fff;
				display: flex;
				flex-direction: row;
				flex-wrap: nowrap;
				font-size: 14px;
				height: 30px;
				justify-content: center;
				position: absolute;
				right: 10px;
				width: 70px;
			}
			
			.del-btn {
				background: #f56c6c;
			}

			.yet-style {
				background: #f5f6f7;
				color: #999;
			}

			.checkbox-class {
				position: absolute;
				top: 12px;
				right: 12px;
			}
		}
	}

	.bottom-wrapper {
		background-color: #fff;

		.all-check-list {
			padding: 8px 12px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 13px;

			.btn {
				padding: 5px 10px;
				border-radius: 4px;
				background-color: #5241ff;
				color: #fff;
			}
			
			.del {
				background-color: #f56c6c;
			}
			
			.btn:active {
				transform: scale(0.95);
			}
		}
	}
</style>
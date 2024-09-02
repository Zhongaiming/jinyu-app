<template>
	<z-paging ref="paging" v-model="dataList" @query="queryList">
		<template slot="top">
			<jy-navbar title="操作记录" bgColor="#f5f6f7"></jy-navbar>
			<xls-search @confirm="stratesSearch"></xls-search>
		</template>
		<view class="list-panel">
			<view class="panel-bd">
				<view class="list-item" v-for="(item, index) in dataList" :key="index">
					<span class="type" :class="[getTypeClass(item.operateType)]">
						{{ item.operateType }}
					</span>
					<p v-for="(item, key, index) of item.operateContent" :key="index">
						<span>{{ key }}</span><span>{{ item }}</span>
					</p>
					<!--type-1 设备转移 | type-2 设备注册 |  type-3 设备解绑 |  type-4 设置 -->
				</view>
			</view>
		</view>
		<xls-empty slot="empty"></xls-empty>
	</z-paging>
</template>

<script>
	import {
		deviceController
	} from "@/api/index.js";
	export default {
		data() {
			return {
				dataList: [],
				searchValue: "",
			};
		},
		methods: {
			stratesSearch(search) {
				this.searchValue = search;
				this.$refs.paging.reload();
			},
			queryList(pageNo, pageSize) {
				deviceController.getDeviceLogList({
					page: pageNo,
					size: pageSize,
					search: this.searchValue
				}).then(res => {
					this.$refs.paging.complete(res.data.dataList);
				})
			},
			getTypeClass(type) {
			    const typeMap = {
			        "禁用": 5,
			        "设置": 4,
			        "解绑": 3,
			        "注册": 2,
			        "转移": 1
			    };
			    let typeColor = Object.keys(typeMap).find(key => type.indexOf(key) > -1);
			    return typeColor ? `type-${typeMap[typeColor]}` : "type-0";
			},

		},
	};
</script>

<style lang="scss" scoped>
	.list-panel {
		margin-top: 20rpx;
		padding: 0 20rpx 31rpx 20rpx;

		.list-item {
			background: #fff;
			border-radius: 10rpx;
			padding: 16rpx 0;
			position: relative;
			margin-bottom: 10rpx;

			.type {
				border-radius: 0 14rpx 14rpx 0;
				color: #fff;
				display: inline-block;
				font-size: 24rpx;
				line-height: 40rpx;
				padding: 2rpx 5rpx;
				position: absolute;
				right: 0;
				text-align: center;
				top: 0;
			}

			.type-5 { background-color: #ec6a6a; }
			.type-4 { background-color: #4ab0ff; }
			.type-3 { background-color: #858c9b; }
			.type-2 { background-color: #4d7ae1; }
			.type-1 { background-color: #7d4de1; }
			.type-0 { background-color: #b2c7eb; }

			p {
				display: flex;
				font-size: 28rpx;
				padding: 0 10rpx;

				:nth-child(1) {
					color: #585858;
					flex: 0.8;
					-webkit-flex: 0.8;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				:nth-child(2) {
					color: #191919;
					flex: 2;
					-webkit-flex: 2;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}

			// 与p同级
			p:not(:nth-child(2)) {
				padding-top: 2rpx;
			}
		}
	}
</style>
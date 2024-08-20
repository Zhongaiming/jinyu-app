<template>
	<view class="handleRecord">
		<jy-navbar title="操作记录" bgColor="#f5f6f7"></jy-navbar>
		<xls-search-input @stratesSearch="stratesSearch"></xls-search-input>
		<view class="list-panel home-family">
			<view class="panel-bd">
				<view class="list-item" v-for="(item, index) in recondList" :key="index">
					<span class="type" :class="testOperateType(item.operateType)">
						{{ item.operateType }}
					</span>
					<p v-for="(item, key, index) of item.operateContent" :key="index">
						<span>{{ key }}</span><span>{{ item }}</span>
					</p>
					<!--type-1 设备转移 | type-2 设备注册 |  type-3 设备解绑 |  type-4 设置 -->
				</view>
				<xls-empty v-show="!recondList.length"></xls-empty>
				<xls-bottom v-show="onEarth" />
			</view>
		</view>
	</view>
</template>

<script>
	import {
		debounceFun,
		throttleFun
	} from "@/plugins/debounceOrthrottle";
	export default {
		data() {
			return {
				inputFocus: false,
				inputEnter: "",
				showClear: false,
				recondList: [{
					"operateType": "设备转移",
					"operateContent": {
						"设备编码": "30000009-扭蛋机",
						"转出场地": "V0021修改测试11",
						"转入场地": "四月场地四月场地",
						"操作人": "前端",
						"操作时间": "2024-04-08 11:41:04"
					}
				}],
				page: 1,
				onEarth: true,
				searchValue: "",
			};
		},
		// created() {
		//   window.addEventListener("scroll", this.getScorll);
		//   this.getRecondList();
		// },
		// beforeDestroy() {
		//   window.removeEventListener("scroll", this.getScorll);
		// },
		methods: {
			getScorll() {
				var scrollTop =
					document.documentElement.scrollTop ||
					window.pageYOffset ||
					document.body.scrollTop;
				var scrollHeight = document.documentElement.scrollHeight;
				var clientHeight = document.documentElement.clientHeight;
				if (scrollTop + clientHeight + 50 >= scrollHeight) {
					if (this.onEarth == false) {
						this.getMoreRecond();
					}
				}
			},
			testOperateType(type) {
				let typeColor;
				type.indexOf("禁用") > -1 ? (typeColor = 5) : "";
				type.indexOf("设置") > -1 ? (typeColor = 4) : "";
				type.indexOf("解绑") > -1 ? (typeColor = 3) : "";
				type.indexOf("注册") > -1 ? (typeColor = 2) : "";
				type.indexOf("转移") > -1 ? (typeColor = 1) : "";
				switch (typeColor) {
					case 5:
						return "type-5";
						break;
					case 4:
						return "type-4";
						break;
					case 3:
						return "type-3";
						break;
					case 2:
						return "type-2";
						break;
					case 1:
						return "type-1";
						break;
					default:
						return "type-0";
						break;
				}
			},
			async getRecondList() {
				return
				this.page = 1;
				this.onEarth = false;
				let res = await getDeviceLogList({
					page: 1,
					size: 18,
					search: this.searchValue,
				});
				if (res.data.code == 0 || res.data.msg == "ok") {
					if (res.data.data) {
						this.recondList = res.data.data;
					} else {
						this.recondList = [];
					}
				}
			},
			getMoreRecond: debounceFun(async function() {
				let res = await getDeviceLogList({
					page: ++this.page,
					size: 18,
					search: this.searchValue,
				});
				if (!res.data.data) {
					return (this.onEarth = true);
				}
				this.recondList = [...this.recondList, ...res.data.data];
			}, 500),
			stratesSearch(search) {
				this.searchValue = search;
				this.getRecondList();
			},
		},
	};
</script>

<style lang="scss" scoped>
	.handleRecord {
		width: 100%;
	}

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
				border-bottom-left-radius: 14rpx;
				border-top-right-radius: 14rpx;
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

			.type-5 {
				background-color: #ec6a6a;
			}

			.type-4 {
				background-color: #4ab0ff;
			}

			.type-3 {
				background-color: #858c9b;
			}

			.type-2 {
				background-color: #4d7ae1;
			}

			.type-1 {
				background-color: #7d4de1;
			}

			.type-0 {
				background-color: #b2c7eb;
			}

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
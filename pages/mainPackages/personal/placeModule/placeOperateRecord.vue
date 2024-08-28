<template>
	<z-paging ref="paging" v-model="dataList" @query="queryList">
		<view slot="top" class="xls-place-operate-record">
			<jy-navbar title="场地操作记录" bgColor="#f5f6f7"></jy-navbar>
			<view class="search-style">
				<view class="search-style-main">
					<view class="left">
						<!-- <zb-dropdown-menu active-color="#5241FF">
								<zb-dropdown-item name="first" v-model="value1" :options="option1" @change="beOndutyState" />
							</zb-dropdown-menu> -->
					</view>
					<u-icon name="search" size="46" @click="iconSearch"></u-icon>
					<input type="text" :placeholder="'输入' + typeName" v-model="searchValue" @keyup.13="iconSearch"
						@blur="iconSearchBlur" />
				</view>
			</view>
		</view>
		
		<view class="xls-place-operate-record">
			<view v-for="(item, index) in dataList" :key="index" class="xls-list-item">
				<!-- 操作类型 1添加，2修改，3删除 -->
				<view :class="[`bgCass${item.operationType}`]" @click="goTo(item)"></view>
				<view class="header">
					<span>{{ item.placeName }}</span><u-icon name="arrow-right" size="26"></u-icon>
				</view>
				<view class="line">
					<span class="point blue"></span>
					<span class="label">场地ID:</span>
					<span class="label value">{{ item.placeId }}</span>
				</view>

				<view class="line">
					<span class="point blue"></span>
					<span class="label">操作人:</span>
					<span class="label value">{{ item.operationName }}</span>
				</view>

				<view class="line">
					<span class="point green"></span>
					<span class="label">操作时间:</span>
					<span class="label value">{{ item.operationTime }}</span>
				</view>
			</view>
		</view>
		<xls-empty slot="empty"></xls-empty>
	</z-paging>
</template>

<script>
	// import TopTab from "../putPlaceComps/topTab";
	// import { getPlaceLogPage } from "@/utils/api/place";
	// import { debounceFun, throttleFun } from "@/plugins/debounceOrthrottle";
	// import { getSeparateBillsLogPage } from "@/utils/api/separateBills";
	import {
		placeController
	} from "@/api/index.js";
	export default {
		// components: {
		// 	TopTab
		// },
		data() {
			return {
				//
				value1: 0,
				option1: [{
						text: "场地名称",
						value: 0
					},
					{
						text: "场地ID",
						value: 1
					},
				],
				typeName: "场地名称",
				searchValue: "",
				dataList: [],
				//
				fromType: 1,
				uListHeight: 200,
			};
		},
		// created() {
		//   // console.log(this.$route.query.fromType)//undefined || 分账
		//   if (this.$route.query.fromType) {
		//     this.fromType = 0;
		//   } else {
		//     this.fromType = 1;
		//   }
		//   this.getRepresent();
		// },

		methods: {
			queryList(pageNo, pageSize) {
				placeController.getPlaceLogPage({
					page: pageNo,
					size: pageSize,
					// search: this.searchValue
				}).then(res => {
					this.$refs.paging.complete(res.data);
				})
			},
			goTo(item) {
				this.$goTo('/pages/mainPackages/personal/placeModule/placeOperateRecordDetail', 'navigateTo', {
					id: item.id
				})
			},

			beOndutyState(text) {
				this.searchValue = "";
				if (text) {
					this.typeName = "场地ID";
				} else {
					this.typeName = "场地名称";
				}
			},
			scrolltolower() {
				console.log("???触底")
			},

			// getRepresent: throttleFun(async function() {
			// 	let res;
			// 	if (this.fromType) {
			// 		res = await getPlaceLogPage({
			// 			page: ++this.page,
			// 			size: 8,
			// 			placeName: this.typeName == "场地名称" ?
			// 				encodeURIComponent(this.searchValue) :
			// 				"",
			// 			placeId: this.typeName == "场地ID" ? this.searchValue : "",
			// 		});
			// 	} else {
			// 		res = await getSeparateBillsLogPage({
			// 			page: ++this.page,
			// 			size: 8,
			// 			placeName: this.typeName == "场地名称" ?
			// 				encodeURIComponent(this.searchValue) :
			// 				"",
			// 			placeId: this.typeName == "场地ID" ? this.searchValue : "",
			// 		});
			// 	}
			// 	if (res.data.code == 0 || res.data.msg == "ok") {
			// 		if (res.data.data.records.length == 0) {
			// 			this.onEarth = true;
			// 		} else {
			// 			this.onEarth = false;
			// 		}
			// 		if (res.data.data.records != null) {
			// 			if (this.page > 1) {
			// 				this.dataList = [...this.dataList, ...res.data.data.records];
			// 			} else {
			// 				this.dataList = [];
			// 				this.dataList = res.data.data.records;
			// 				if (res.data.data.records.length < 8) {
			// 					this.onEarth = true;
			// 				} else {
			// 					this.onEarth = false;
			// 				}
			// 			}
			// 		}
			// 	}
			// }, 1000),
			iconSearch() {
				this.page = 0;
				this.onEarth = false;
				this.getRepresent();
			},
			iconSearchBlur() {
				if (this.searchValue == "") {
					this.page = 0;
					this.onEarth = false;
					this.getRepresent();
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.xls-place-operate-record {
		padding: 0 20rpx;

		.search-style {
			padding: 12rpx 0;

			&-main {
				width: 100%;
				display: inline-flex;
				height: 64rpx;
				align-items: center;
				background: #fff;
				border-radius: 16rpx;
			}

			.left {
				color: #333;
				font-size: 26rpx;

				span {
					padding: 0 10rpx 0 20rpx;
				}

				.icons {
					transform: rotate(90deg);
				}
			}

			input {
				color: #333;
				font-size: 26rpx;
				width: 100%;
				padding-right: 24rpx;
				box-sizing: border-box;
				text-align: left;
				appearance: none;
				background: none;
				border: none;
				outline: none;
				margin: 0;
				padding: 0;
			}

			input[type="text"]::-webkit-input-placeholder {
				color: #c5c5c5;
				font-size: 26rpx;
			}
		}
	}

	.xls-list {
		flex: 1;

		.xls-list-item {
			background: #fff;
			border-radius: 16rpx;
			margin-top: 16rpx;
			padding: 24rpx;
			position: relative;

			.header {
				color: #333;
				font-size: 28rpx;
				font-weight: 700;
				margin-bottom: 24rpx;
				text-align: left;
				display: flex;
				align-items: center;
			}

			.line {
				margin-top: 8rpx;
				display: flex;
				align-items: center;
				font-size: 0;
				height: 36rpx;

				.point {
					border-radius: 4rpx;
					height: 8rpx;
					width: 8rpx;
				}

				.blue {
					background: #5241FF;
				}

				.green {
					background: #15d193;
				}

				.label {
					color: #999;
					font-size: 26rpx;
					margin: 0 16rpx;
					text-align: left;
				}

				.value {
					color: #333;
				}
			}
		}

	}

	// ::-webkit-scrollbar {
	// 	display: none; // 去掉滚动条
	// }

	@mixin bg-image($url) {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background-image: url(#{$baseUrl}#{$url});
		background-position: 95% 0;
		background-repeat: no-repeat;
		background-size: 128rpx 128rpx;
	}

	.bgCass1 {
		@include bg-image('appV4/place_image/delete.png');
	}

	.bgCass2 {
		@include bg-image('appV4/place_image/edit.png');
	}

	.bgCass3 {
		@include bg-image('appV4/place_image/delete.png');
	}
</style>
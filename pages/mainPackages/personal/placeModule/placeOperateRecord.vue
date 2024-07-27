<template>
	<view class="xls-place-operate-record">
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

		<u-list @scrolltolower="scrolltolower" class="xls-list" :height="`${uListHeight}px`">
			<u-list-item v-for="(item, index) in dataList" :key="index" class="xls-list-item">
				<!-- 操作类型 1添加，2修改，3删除 -->
				<view :class="`bgCass${item.operationType}`" @click="goTo(item)"></view>
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
			</u-list-item>
			<xls-bottom />
		</u-list>
		<xls-empty v-if="!dataList.length"></xls-empty>


	</view>

</template>

<script>
	// import TopTab from "../putPlaceComps/topTab";
	// import { getPlaceLogPage } from "@/utils/api/place";
	// import { debounceFun, throttleFun } from "@/plugins/debounceOrthrottle";
	// import { getSeparateBillsLogPage } from "@/utils/api/separateBills";

	export default {
		name: "operatingRecord",
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
				//
				page: 0,
				onEarth: false,
				dataList: [{
						"id": 7253,
						"placeId": 2448,
						"placeName": "射水测试场地",
						"operationType": 2,
						"operationBeforeText": "{\"场地名称\":\"射水测试场地\",\"所在地区\":\"北京市北京市东城区\",\"详细地址\":\"射水测试场地\",\"场地类型\":\"酒吧\",\"是否为默认场地\":\"否\"}",
						"operationText": "{\"场地名称\":\"射水测试场地\",\"所在地区\":\"北京市北京市东城区\",\"详细地址\":\"射水测试场地\",\"场地类型\":\"酒吧\",\"是否为默认场地\":\"是\"}",
						"operationId": 506,
						"operationName": "前端测试",
						"operationTime": "2024-07-25 10:32:46"
					},
					{
						"id": 7254,
						"placeId": 2486,
						"placeName": "地心测试机",
						"operationType": 2,
						"operationBeforeText": "{\"场地名称\":\"地心测试机\",\"所在地区\":\"广东省广州市番禺区\",\"详细地址\":\"旧水坑\",\"场地类型\":\"其他\",\"是否为默认场地\":\"是\"}",
						"operationText": "{\"场地名称\":\"地心测试机\",\"所在地区\":\"广东省广州市番禺区\",\"详细地址\":\"旧水坑\",\"场地类型\":\"其他\",\"是否为默认场地\":\"否\"}",
						"operationId": 506,
						"operationName": "前端测试",
						"operationTime": "2024-07-25 10:32:46"
					},
					{
						"id": 7251,
						"placeId": 2486,
						"placeName": "地心测试机",
						"operationType": 2,
						"operationBeforeText": "{\"场地名称\":\"地心测试机\",\"所在地区\":\"广东省广州市番禺区\",\"详细地址\":\"旧水坑\",\"场地类型\":\"其他\",\"是否为默认场地\":\"否\"}",
						"operationText": "{\"场地名称\":\"地心测试机\",\"所在地区\":\"广东省广州市番禺区\",\"详细地址\":\"旧水坑\",\"场地类型\":\"其他\",\"是否为默认场地\":\"是\"}",
						"operationId": 506,
						"operationName": "前端测试",
						"operationTime": "2024-07-25 10:32:43"
					},
					{
						"id": 7252,
						"placeId": 1082,
						"placeName": "中土物联-513",
						"operationType": 2,
						"operationBeforeText": "{\"场地名称\":\"中土物联-513\",\"所在地区\":\"北京市北京市东城区\",\"详细地址\":\"详细地址\",\"场地类型\":\"餐饮店\",\"是否为默认场地\":\"是\"}",
						"operationText": "{\"场地名称\":\"中土物联-513\",\"所在地区\":\"北京市北京市东城区\",\"详细地址\":\"详细地址\",\"场地类型\":\"餐饮店\",\"是否为默认场地\":\"否\"}",
						"operationId": 506,
						"operationName": "前端测试",
						"operationTime": "2024-07-25 10:32:43"
					},
					{
						"id": 5623,
						"placeId": 2038,
						"placeName": "场地名称002",
						"operationType": 2,
						"operationBeforeText": "{\"场地名称\":\"场地名称\",\"所在地区\":\"北京市北京市东城区\",\"详细地址\":\"详细地址\",\"场地类型\":\"KTV\",\"是否为默认场地\":\"否\"}",
						"operationText": "{\"场地名称\":\"场地名称002\",\"所在地区\":\"北京市北京市东城区\",\"详细地址\":\"详细地址\",\"场地类型\":\"KTV\",\"是否为默认场地\":\"否\"}",
						"operationId": 506,
						"operationName": "前端测试",
						"operationTime": "2024-04-08 14:16:32"
					},
					{
						"id": 5611,
						"placeId": 2038,
						"placeName": "场地名称",
						"operationType": 1,
						"operationText": "{\"场地名称\":\"场地名称\",\"所在地区\":\"北京市北京市东城区\",\"详细地址\":\"详细地址\",\"场地类型\":\"KTV\",\"是否为默认场地\":\"否\"}",
						"operationId": 506,
						"operationName": "前端测试",
						"operationTime": "2024-04-08 12:28:21"
					},
					{
						"id": 3927,
						"placeId": 1319,
						"placeName": "V0019广州万达店",
						"operationType": 2,
						"operationBeforeText": "{\"场地名称\":\"V0019广州万达店\",\"所在地区\":\"广东省广州市海珠区\",\"详细地址\":\"万达广场四楼119号\",\"场地类型\":\"商场\",\"是否为默认场地\":\"否\"}",
						"operationText": "{\"场地名称\":\"V0019广州万达店\",\"所在地区\":\"广东省广州市海珠区\",\"详细地址\":\"万达广场四楼119号\",\"场地类型\":\"商场\",\"是否为默认场地\":\"否\"}",
						"operationId": 506,
						"operationName": "前端测试",
						"operationTime": "2023-10-09 11:35:09"
					},
					{
						"id": 3926,
						"placeId": 1319,
						"placeName": "V0019广州万达店",
						"operationType": 2,
						"operationBeforeText": "{\"场地名称\":\"V0019广州万达店\",\"所在地区\":\"广东省广州市海珠区\",\"详细地址\":\"万达广场四楼119号\",\"场地类型\":\"商场\",\"是否为默认场地\":\"否\"}",
						"operationText": "{\"场地名称\":\"V0019广州万达店\",\"所在地区\":\"广东省广州市海珠区\",\"详细地址\":\"万达广场四楼119号\",\"场地类型\":\"商场\",\"是否为默认场地\":\"否\"}",
						"operationId": 506,
						"operationName": "前端测试",
						"operationTime": "2023-10-09 11:33:21"
					}
				],
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
		onReady() {
			uni.createSelectorQuery().select('.search-style').boundingClientRect(data => {
				this.uListHeight = this.excludeNavbarHeight - data.height;
				console.log("剩余高度", data)
			}).exec();
		},

		methods: {

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
			//监听滚动
			getMoretype(elm) {
				var scrollTop = elm.target.scrollTop;
				var scrollHeight = elm.target.scrollHeight;
				var clientHeight = elm.target.clientHeight;
				if (scrollTop + clientHeight + 50 >= scrollHeight) {
					if (this.onEarth == false) {
						this.getRepresent();
					}
				}
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
		font-family: PingFangSC, PingFangSC-Regular;
		height: 100%;
		width: 100%;
		// height: 100vh;
		// display: flex;
		// flex-direction: column;
		// overflow: hidden;

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
		background-image: url(#{$prefix}#{$url});
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
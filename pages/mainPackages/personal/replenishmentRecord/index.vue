<template>
	<z-paging ref="paging" v-model="dataList" @query="queryList">
		<jy-navbar title="补货记录" bgColor="#f5f6f7" slot="top"></jy-navbar>
		<view class="search-wrapper">
			<!-- <view class="left">
				<van-dropdown-menu active-color="#5241FF">
					<van-dropdown-item v-model="value" :options="option" @change="alterState" />
				</van-dropdown-menu>
			</view> -->
			<xls-image :src="`${$baseUrl}appV4/img/icons/search.png`" alt="" style="padding-right: 10px"
				@click="alterSearch" class="image" />
			<input type="text" :placeholder="'输入' + typeName" v-model="searchValue" @keyup.13="alterSearch"
				@blur="searchByBlur" @confirm="alterSearch" />
		</view>
		<view class="detail-header">
			<view class="site-wrapper" @click="$refs.placeList.showPlacePopup(placeId)">
				<view class="title">场地</view>
				<view class="info s-viewide-user">{{ placeName }}</view>
				<u-icon name="arrow-right" size="36" color="#999" />
			</view>
			<view class="site-wrapper" @click="pickerTime = !pickerTime">
				<view class="title">时间</view>
				<view class="info s-viewide-user">{{ date }}</view>
				<u-icon name="arrow-right" size="36" color="#999" />
			</view>
		</view>
		<!-- place -->
		<xls-place-radio ref="placeList" @getPlaceId="pickerPlace" showAllCheck></xls-place-radio>
		<!-- calendar -->
		<xls-calendar :show="pickerTime" @close="() => { pickerTime = false }" @confirm="onConfirm"></xls-calendar>
		

		<view v-for="(item, index) in dataList" :key="index" class="replen-wrapper">
			<view class="list-item">
				<p>
					<span>补货设备</span><span>{{ item.deviceNumber }}-{{ item.shippingSpace }}-{{item.railNumber}}</span>
				</p>
				<p>
					<span>补货场地</span><span>{{ item.placeName }}</span>
				</p>
				<p>
					<span>补货数量</span>
					<span :style="{color:item.nowQuantity<0?'red':''}">{{item.nowQuantity }}</span>
				</p>
				<p>
					<span>补货前商品</span><span>{{ item.beforeCommodityName }}</span>
				</p>
				<p>
					<span>补货后商品</span><span>{{ item.afterCommodityName }}</span>
				</p>
				<p>
					<span>补货前容量</span><span>{{ item.rbeforeCapacity }}</span>
				</p>
				<p>
					<span>补货后容量</span><span>{{ item.rafterCapacity }}</span>
				</p>
				<p>
					<span>补货前库存</span><span>{{ item.rbeforeInventory }}</span>
				</p>
				<p>
					<span>补货后库存</span><span>{{ item.rafterInventory }}</span>
				</p>
				<p>
					<span>补货操作人</span><span>{{ item.nickName }}</span>
				</p>
				<p>
					<span>补货时间</span><span>{{ item.time }}</span>
				</p>
			</view>
		</view>
		<xls-empty slot="empty"></xls-empty>
	</z-paging>
</template>

<script>
	import {
		deviceController
	} from "@/api/index.js";
	import {
		getDateAll
	} from "@/plugins/utilityClass";
	export default {
		
		data() {
			return {
				dataList: [],
				//place
				placeId: null,
				placeName: "全部场地",
				//time
				pickerTime: false,
				date: getDateAll(0) + "\u2002至\u2002今天",
				//开始结束时间
				startTime: getDateAll(0),
				endTime: getDateAll(0),
				
				//search
				value: 0,
				option: [{
						text: "设备编号",
						value: 0
					},
					{
						text: "商品名称",
						value: 1
					},
				],
				typeName: "设备编号",
				searchValue: null,
				
				
				
				
			};
		},
		methods: {
			queryList(pageNo, pageSize) {
				deviceController.replenishmentList({
					page: pageNo,
					size: pageSize,
					placeId: this.placeId,
					startTime: this.startTime,
					endTime: this.endTime,
					search: this.typeName == "设备编号" ? this.searchValue : null,
					searchs: this.typeName == "商品名称" ?
						encodeURIComponent(this.searchValue) : null,
				}).then(res => {
					this.$refs.paging.complete(res.data.dataList);
				})
			},
			//选择场地
			pickerPlace(place) {
				if (place == -1) {
					this.placeId = null;
					this.placeName = "全部场地";
				} else {
					this.placeId = place.placeId;
					this.placeName = place.placeName;
				}
				this.reset();
			},
			reset() {
				this.$refs.paging.reload();
			},
			//选择日期
			onConfirm(date) {
				const [startTime, endTime] = date;
				this.pickerTime = false;
				this.date = `${startTime} 至 ${endTime}`;
				this.startTime = startTime;
				this.endTime = endTime;
				this.reset();
			},
			
			//搜索
			alterState(text) {
				if (text) {
					this.typeName = "商品名称";
				} else {
					this.typeName = "设备编号";
				}
			},
			alterSearch() {
				this.reset();
			},
			searchByBlur() {
				if (this.searchValue == "") {
					this.reset();
				}
			},
			
			
			
		},
	};
</script>

<style lang="scss" scoped>
	.detail-header {
		padding: 0 10px;
		background: #fff;
		margin-bottom: 10px;
	}

	.site-wrapper {
		display: flex;
		height: 44px;
		line-height: 44px;
		display: flex;
		font-size: 15px;
		align-items: center;
		border-top: 1px solid #f1eeee;

		.title {
			color: #7a7a7a;
		}

		.s-viewide-user {
			color: #5241FF;
			-webkit-box-flex: 1;
			flex: 1;
			text-align: right;
			position: relative;
			padding: 0 8px;
		}
	}

	.search-wrapper {
		align-items: center;
		background: #fff;
		display: inline-flex;
		height: 45px;
		width: 100%;

		.left {
			color: #333;
			font-size: 13px;
			font-weight: 400;

			span {
				padding: 0 5px 0 10px;
			}

			.icons {
				transform: rotate(90deg);
			}
		}

		.image {
			height: 16px;
			width: 16px;
			margin: 0 4px 0 16px;
		}

		input {
			color: #333;
			font-size: 13px;
			width: 100%;
			padding-right: 12px;
			box-sizing: border-box;
			font-weight: 400;
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
			font-size: 13px;
		}
	}

	::v-deep .van-dropdown-menu__bar {
		height: 22px;
		background: #fff;
		box-shadow: 0 0 0 #fff;
	}

	::v-deep .van-dropdown-menu__title {
		font-size: 13px;
	}

	::v-deep .van-popup--top {
		top: 10px;
	}

	::v-deep .van-overlay {
		top: 10px;
	}

	.replen-wrapper {
		padding: 0 12px;

		.list-item {
			background: #fff;
			border-radius: 5px;
			padding: 8px 0;
			position: relative;
			margin-bottom: 5px;

			p {
				display: flex;
				font-size: 14px;
				padding: 0 5px;

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
				padding-top: 1px;
			}
		}
	}
</style>
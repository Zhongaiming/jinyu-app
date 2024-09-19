<template>
	<z-paging ref="dataPaging" v-model="dataList" @query="queryList" @scroll="scrollXls">
		<view class="xls-device-condition-wrapper">
			<view class="detail" :class="{'detail-none':transitionTop}">
				<xls-dd-header-vue @getSearch="getSearch"></xls-dd-header-vue>
				<xls-quick-date @getCondition="getCondition" placeCheck="radio"></xls-quick-date>
			</view>
			<xls-simple-header-vue v-if="transitionTop" :params="params"></xls-simple-header-vue>
		</view>
		<xls-list-vue :dataList="dataList" :giftCount="giftCount" :params="params"></xls-list-vue>
		<xls-empty slot="empty"></xls-empty>
		<view class="btn" @click="goTo" v-if="deviceType != 4" slot="bottom">
			<span>商品设置</span>
		</view>
	</z-paging>
</template>

<script>
	import {
		deviceDataController
	} from "@/api/index.js";
	import xlsListVue from "./components/xls-list.vue";
	import xlsDdHeaderVue from "./components/xls-dd-header.vue";
	import xlsSimpleHeaderVue from "./components/xls-simple-header.vue";
	// import GiftSetting from "./giftComps/giftSetting";
	
	export default {
		components: {
			xlsListVue,
			xlsDdHeaderVue,
			xlsSimpleHeaderVue,
			// GiftSetting
		},
		data() {
			return {
				deviceType: null,
				dataList: [],
				giftCount: {},
				params: {
					startTime: "",
					endTime: "",
					search: "",
					pickerPlace: "",
					placeIdList: "",
				},
				transitionTop: false,
			}
		},
		onLoad(option) {
			// shj 传4
			if (JSON.parse(option.params)) {
				this.deviceType = JSON.parse(option.params).deviceType
			}
		},
		methods: {
			queryList(pageNo, pageSize) {
				const params = {
					startTime: this.params.startTime,
					endTime: this.params.endTime,
					...(this.params.search && { search: encodeURIComponent(this.params.search) }),
					...(this.params.placeIdList && { placeId: this.params.placeIdList }),
					...(this.deviceType && { deviceType: this.deviceType })
				};
				deviceDataController.getPresentList({
					page: pageNo,
					size: pageSize,
					...params
				}).then(res => {
					if(res.code == 200) {
						this.giftCount = res.data.outPresentData;
						this.$refs.dataPaging.complete(res.data.outPresentPlaceList);
					}
				})
			},
			goTo() {
				this.$goTo();
			},
			scrollXls(e) {
				const scrollTop = e.detail.scrollTop
				if (scrollTop > 100) {
					this.transitionTop = true;
				}
				if (scrollTop <= 0) {
					this.transitionTop = false;
				}
			},
			getCondition(params) {
				Object.assign(this.params, params);
				this.$refs.dataPaging.reload();
			},
			getSearch(value) {
				this.params.search = value;
				this.$refs.dataPaging.reload();
			},
		},
	};
</script>

<style lang="scss" scoped>
	.xls-device-condition-wrapper {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 99999;

		.detail {
			height: 406rpx;
			overflow: hidden;
			transition: height 0.5s;
			-webkit-transition: height 0.5s;
		}

		.detail-none {
			height: 0;
		}
	}

	.btn {
		width: 100%;
		height: 50px;
		font-size: 17px;
		color: #fff;
		background: #5241ff;
		@include center-flex();
	}
</style>
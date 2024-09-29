<template>
	<view class="content">
		<jy-navbar title="品牌信息设置"></jy-navbar>
		<view class="center-warp">
			<view class="txt">基础设置</view>
			<u-cell-group>
				<u-cell v-hasPermi="['app:brand:index:service']" title="场地客服"
					url="/pages/subpackages/personal/placeService/index" isLink />
				<!-- <u-cell title="首页标题" isLink url="/blrandInfo/titleSet" v-hasPermi="['app:brand:title:read']" /> -->
			</u-cell-group>
			<!-- <view class="txt block">个性化设置</view>
			<u-cell-group>
				<u-cell title="首页消息通知" isLink url="/blrandInfo/infoNotify"
					v-hasPermi="['app:brand:notification:read']" />
				<u-cell title="皮肤主题" isLink v-hasPermi="['app:brand:skin:read']" />
				<u-cell title="商户品牌名称" :value="businessName" isLink url="/blrandInfo/businessName"
					v-hasPermi="['app:brand:name:read']" />
				<u-cell title="游戏币名称" :value="currencyName" isLink url="/blrandInfo/gameCurrencySetting"
					v-hasPermi="['app:brand:coinName:read']" />
				<u-cell title="轮播图设置" isLink @click="goTo(1)" v-hasPermi="['app:brand:swiper:read']" />
				<u-cell title="广告图设置" isLink @click="goTo(2)" v-hasPermi="['app:brand:swiper:read']" />
			</u-cell-group> -->
		</view>
	</view>
</template>

<script>
	// import api from "@/utils/api/brand";
	export default {
		data() {
			return {
				businessName: "未设置",
				currencyName: "未设置",
			};
		},
		// created() {
		// 	this.getBusiness();
		// },
		methods: {
			goTo(type) {
				this.$goTo("xx", undefined, {
					type
				})
			},
			async getBusiness() {
				let res = await api.getBusinessName();
				if (res.code == 200 || res.data.msg == "ok") {
					this.businessName = res.data.data.businessName ?
						res.data.data.businessName :
						"未设置";
					this.currencyName = res.data.data.currencyName ?
						res.data.data.currencyName :
						"未设置";
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.content {
		.center-warp {
			padding: 10px 10px 68px;
			position: relative;
			z-index: 2;

			.txt {
				padding-bottom: 10px;
				font-size: 14px;
				color: gray;
			}

			.block {
				margin-top: 20px;
			}
		}
	}
</style>
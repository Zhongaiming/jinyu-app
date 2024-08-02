<template>
	<view class="xls-three">
		<view v-for="item in dataList" :key="item.id" class="xls-three-item" v-hasPermi="[`${item.permissions}`]"
			:class="item.class" @click="goTo(item.route)">
			<image :src="item.imgUrl" alt="" class="xls-three-image" mode="widthFix" />
			<view class="xls-three-title">{{item.title}}</view>
			<view class="xls-three-subheading">{{item.subheading}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "threeOptions",
		data() {
			return {
				dataList: [{
						id: 0,
						title: '设备管理',
						subheading: '在线 0 / 0 台',
						route: '/deviceManagement',
						imgUrl: `${this.$baseUrl}homeImages/threeOptions/device.png`,
						permissions: 'app:device:index',
						class: 'xls-bg-left'
					},
					{
						id: 1,
						title: '经营统计',
						subheading: '经营数据统计',
						route: '/earningStat',
						imgUrl: `${this.$baseUrl}homeImages/threeOptions/acount.png`,
						permissions: 'app:operate:index',
						class: 'xls-bg-center'
					},
					{
						id: 2,
						title: '会员管理',
						subheading: '会员消费记录',
						route: '/pages/subpackages/home/member/index',
						imgUrl: `${this.$baseUrl}homeImages/threeOptions/member.png`,
						permissions: 'app:member:index',
						class: 'xls-bg-right'
					}
				]
			};
		},
		methods: {
			goTo(route) {
				this.$goTo(route)
			}
		},
	};
</script>

<style lang="less" scoped>
	@prefix: "https://xls-ui-file.oss-cn-hangzhou.aliyuncs.com/appui/";

	.xls-three {
		width: 100%;
		display: flex;
		align-items: center;
		background: #fff;
		padding: 32rpx 0;

		&-item {
			border-radius: 24rpx;
			width: 30%;
			margin-left: 2.5%;
			height: 150rpx;
			padding-top: 60rpx;
			font-size: 28rpx;
			box-sizing: border-box;
			position: relative;
		}

		&-image {
			position: absolute;
			top: 0;
			left: -30rpx;
			width: 120rpx;
			width: 120rpx;
		}

		&-title {
			font-size: 32rpx;
			margin: 0rpx 0rpx 0rpx 30rpx;
			font-weight: 700;
		}

		&-subheading {
			margin: 0rpx 0rpx 0rpx 30rpx;
			font-size: 20rpx;
			font-weight: 700;
			color: #737275;
		}

	}

	.xls-bg-left {
		.base-bg-style("@{prefix}homeImages/threeOptions/left.png");
		color: #2c2084;
	}

	.xls-bg-center {
		.base-bg-style("@{prefix}homeImages/threeOptions/center.png");
		color: #0d319e;
	}

	.xls-bg-right {
		.base-bg-style("@{prefix}homeImages/threeOptions/right.png");
		color: #7f4805;
	}
	
	.base-bg-style(@url) {
	  background-image: url(@url);
	  background-repeat: no-repeat;
	  background-size: 102% 100%;
	}
</style>
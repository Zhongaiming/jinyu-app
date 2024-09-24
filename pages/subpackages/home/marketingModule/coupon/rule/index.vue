<template>
	<view class="coupon_wrapper">
		<xls-jy-navbar title="规则说明" bgColor="#f5f6f7"></xls-jy-navbar>
		<view class="panel-image">
			<view class="demo-images-wrap">
				<img v-for="(item, index) in imgList" :key="index" :src="item" alt="" class="image-style"
					@click="imgView(imgList, index)" />
			</view>
		</view>
		<!-- 前 -->
		<view class="desc-content" v-if="type == 2">
			<b>规则说明（支付前派发）：</b><br />
			1、支付立减券（支付前派发），是指用户在支付消费前，可无条件获赠优惠券。活动成本由商家承担。<br />
			2、领券方式：<br />
			（1）方式一：链接。商家将领券链接分享出去，用户通过点击领券链接，领取优惠券。<br />
			（2）方式二：二维码。商家将领券二维码分享或者打印成物料展示在活动现场，用户通过扫码领取优惠券。<br />
			<!-- （3）方式三：自动派发。商家设置成自动派发，用户只要登录进入C端首页，系统就会自动派发优惠券。（自动派发功能仅支持
      按摩椅、足疗机、按摩垫、游戏机）。<br /> -->
			<!-- 3、券有效期为领取后7天内。<br /> -->
			3、券有效期由商家创建活动时设定，详情点击“立即新建活动”按钮。<br />
			<br />
			<!-- <b>适用设备：</b><br />
      售货机、按摩椅、足疗机、按摩垫、游戏机。<br /> -->
		</view>
		<!-- 后 -->
		<view class="desc-content" :class="{'hidden':hidden}" v-if="type == 3">
			<b>规则说明（支付后派发）：</b><br />
			1、支付立减券（支付后派发），是指支付完成的订单，原始金额只要达到门槛，即可获得一张下次使用的立减券，顾客二次支付达到使用条件时，即可立减。活动成本由商家承担。<br />
			<!-- 2、同一场地同一种设备类型只能创建一个立减券活动。为了保障商家利益，同一场地内的相同设备，开启
      “立减券” 活动后，对于娃娃机、兑币机，将不能同时开启 “送币券”
      活动，两者互斥。<br /> -->
			2、同一场地同一种设备类型只能创建一个立减券活动。<br />
			<br />
			<b>用途：</b><br />
			可以有效提升活动期间场地客单价以及复购频次，从而提升场地整体营收。<br />
			<br />
			<!-- <b>使用设备：</b><br />
      娃娃机、兑币机、售货机、按摩椅、足疗机、按摩垫、游戏机。<br /> -->
			<span class="btn-more" v-if="hidden && type == 3" @click="hidden = !hidden">展开</span>
		</view>

		<view class="fixed-bottom">
			<view class="btn" @click="$router.push('/marketing/coupon_add')">
				立即新建活动
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 2,
				hidden: true,
				before: [
					"https://xls-ui-file.oss-cn-hangzhou.aliyuncs.com/appui/homeImages/couple/couple03.png",
					"https://xls-ui-file.oss-cn-hangzhou.aliyuncs.com/appui/homeImages/couple/couple02.png",
					"https://xls-ui-file.oss-cn-hangzhou.aliyuncs.com/appui/homeImages/couple/couple01.png",
				],
				after: [
					"https://xls-ui-file.oss-cn-hangzhou.aliyuncs.com/appui/homeImages/couple/couple01.png",
					"https://xls-ui-file.oss-cn-hangzhou.aliyuncs.com/appui/homeImages/couple/couple02.png",
					"https://xls-ui-file.oss-cn-hangzhou.aliyuncs.com/appui/homeImages/couple/couple04.png",
					"https://xls-ui-file.oss-cn-hangzhou.aliyuncs.com/appui/homeImages/couple/couple05.png",
				],
				imgList: [],
			};
		},
		onLoad(option) {
			if (option.params) {
				const {
					type
				} = JSON.parse(option.params)
				this.type = type;
				this.imgList = type == 3 ? this.after : this.before
			}
		},
		methods: {
			imgView(urlList, index) {
				uni.previewImage({
				    current: index,
				    urls: urlList
				})
			},
		},
	};
</script>

<style lang="scss" scoped>
	.coupon_wrapper {
		width: 100%;
		padding-bottom: 70px;
		background: #fff;

		.panel-image {
			padding: 15px 10px 10px;

			.demo-images-wrap {
				display: flex;
				align-items: center;
				width: 100%;
				overflow-x: scroll;
				padding-bottom: 10px;

				.image-style {
					width: 120px;
					height: 205px;
				}

				.image-style:not(:last-child) {
					margin-right: 8px;
				}
			}
		}

		.desc-content {
			color: #3a3d44;
			font-size: 13px;
			background: #fff;
			padding: 5px 10px 15px;
			line-height: 21px;
			text-align: justify;
			position: relative;
		}

		.hidden {
			height: 90px;
			overflow: hidden;
		}

		.btn-more {
			background-color: #fff;
			bottom: 0;
			color: #5241ff;
			font-size: 13px;
			padding: 0 14px 0 10px;
			position: absolute;
			right: 0;
		}

		.btn-more:after {
			border-bottom: 1px solid #5241ff;
			border-right: 1px solid #5241ff;
			content: "";
			height: 6px;
			opacity: 0.6;
			position: absolute;
			right: 5px;
			top: 5px;
			transform: rotate(45deg);
			width: 6px;
		}

		.fixed-bottom {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			padding: 10px;
			background-color: #fff;

			.btn {
				background-color: #5241ff;
				color: #fff;
				font-size: 17px;
				line-height: 50px;
				border-radius: 6px;
				text-align: center;
			}
		}
	}
</style>
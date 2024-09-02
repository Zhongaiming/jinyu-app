<template>
	<view class="xls-personal">
		<view class="xls-personal-bg"></view>
		<view class="xls-personal-main">
			<view class="xls-personal-main-header">
				<view class="xls-personal-main-header-image">
					<image class="image" :src="`${$baseUrl}login_image/user-header.png`" alt="" mode="widthFix" />
					<view class="camera-wrapper">
						<image class="camera" :src="`${$baseUrl}appV4/my_img/camera.png`" alt="" mode="widthFix" />
					</view>
				</view>
				<view class="xls-personal-main-header-info">
					<view class="user-name">{{loginInfo.nickName}}</view>
					<view class="user-phone">{{loginInfo.username}}</view>
				</view>
				<view class="xls-personal-main-header-btn" @click="goToUser">
					账号设置、切换
				</view>
			</view>
			<!-- 功能选项 -->
			<view class="xls-personal-options" v-for="option in dataList" :key="option.id"
				v-hasPermi="[...option.permissions]">
				<view class="options-wrapper" v-for="item in option.dataList" :key="item.id"
					v-hasPermi="[...item.permissions]" @click="goTo(item.route)">
					<image class="image" :src="item.imgUrl" mode="widthFix"></image>
					<span class="text">{{item.title}}</span>
					<view class="right-value">{{item.subheading}}</view>
				</view>
			</view>
			<view class="version-style">
				version：{{version_number}}
			</view>
		</view>
		<jy-tabbar :selected="1"></jy-tabbar>
	</view>
</template>

<script>
	import {
		getInfo
	} from '@/common/auth.js'
	export default {
		data() {
			return {
				loginInfo: {},
				version_number: "",
				dataList: [{
						id: 1,
						permissions: ['app:bing:index', 'app:brand:index', 'app:inform:index'],
						dataList: [{
								id: 11,
								title: '钱包',
								imgUrl: `${this.$baseUrl}appV4/my_img/wallet.png`,
								route: '/pages/mainPackages/personal/userWallet/index',
								permissions: ['app:payBag:index'],
								subheading: '', // 余额 0.00 元
							},
							{
								id: 12,
								title: '品牌信息设置',
								imgUrl: `${this.$baseUrl}appV4/my_img/info-inform.png`,
								route: '/pages/subpackages/personal/brandMessage/index',
								permissions: ['app:brand:index'],
								subheading: '',
							},
							{
								id: 13,
								title: '通知设置',
								imgUrl: `${this.$baseUrl}appV4/my_img/ic_notice.png`,
								route: '/pages/subpackages/personal/noticeSet/index',
								permissions: ['app:inform:index'],
								subheading: '离线、故障、流控、库存通知',
							}
						]
					}, {
						id: 2,
						permissions: ['app:account:index', 'app:account:index:read', 'app:material:index'],
						dataList: [
							{
								id: 21,
								title: '子账号管理',
								imgUrl: `${this.$baseUrl}appV4/my_img/sub-account.png`,
								route: '/pages/mainPackages/personal/subAccountManagement/index',
								permissions: ['app:account:index', 'app:account:index:read'],
								subheading: '',
							},
							// {
							// 	id: 22,
							// 	title: '物料管理',
							// 	imgUrl: `${this.$baseUrl}appV4/my_img/download.png`,
							// 	route: '/setMealing',
							// 	permissions: ['app:material:index'],
							// 	subheading: '生成二维码、下载物料',
							// },
						]
					}, {
						id: 3,
						permissions: ['app:shopType:index', 'app:replenishment:index'],
						dataList: [{
								id: 31,
								title: '商品配置信息管理',
								imgUrl: `${this.$baseUrl}appV4/my_img/commodity.png`,
								route: '/pages/mainPackages/personal/commodityType/index',
								permissions: ['app:shopType:index'],
								subheading: '',
							},
							// {
							// 	id: 32,
							// 	title: '快捷补货管理',
							// 	imgUrl: `${this.$baseUrl}appV4/my_img/replenishment.png`,
							// 	route: '/quickReplenishment',
							// 	permissions: ['app:replenishment:index'],
							// 	subheading: '生成二维码、下载物料',
							// },
						]
					}, {
						id: 4,
						permissions: ['app:place:index', 'app:records:index', 'app:system:replenishmentRecord',
							'app:wifi:index'
						],
						dataList: [{
								id: 41,
								title: '投放场地',
								imgUrl: `${this.$baseUrl}appV4/my_img/place.png`,
								route: '/pages/mainPackages/personal/placeModule/index',
								permissions: ['app:place:index'],
								subheading: '',
							},
							{
								id: 411,
								title: '场地配置信息管理',
								imgUrl: `${this.$baseUrl}appV4/my_img/place.png`,
								route: '/pages/mainPackages/personal/placeConfigure/index',
								permissions: ['app:place:index'],
								subheading: '',
							},
							{
								id: 42,
								title: '操作记录',
								imgUrl: `${this.$baseUrl}appV4/my_img/option.png`,
								route: '/pages/mainPackages/personal/handleRecord/index',
								permissions: ['app:records:index'],
								subheading: '',
							},
							{
								id: 43,
								title: '补货记录',
								imgUrl: `${this.$baseUrl}appV4/my_img/record.png`,
								route: '/pages/mainPackages/personal/replenishmentRecord/index',
								permissions: ['app:system:replenishmentRecord'],
								subheading: '',
							},
							// {
							// 	id: 44,
							// 	title: 'wifi配网',
							// 	imgUrl: `${this.$baseUrl}appV4/my_img/wifi-icon.png`,
							// 	route: '/setMealing',
							// 	permissions: ['app:wifi:index'],
							// 	subheading: '',
							// },
						]
					},
					// {
					// 	id: 5,
					// 	permissions: ['app:serviceCharge:index'],
					// 	dataList: [{
					// 		id: 51,
					// 		title: '服务费收费',
					// 		imgUrl: `${this.$baseUrl}service-charge/service_charge.png`,
					// 		route: '/service/service-index',
					// 		permissions: ['app:serviceCharge:index'],
					// 		subheading: '',
					// 	}, ]
					// }, {
					// 	id: 6,
					// 	permissions: ['app:stockUp:index'],
					// 	dataList: [{
					// 		id: 61,
					// 		title: '我的备货单',
					// 		imgUrl: `${this.$baseUrl}appV4/my_img/pick.png`,
					// 		route: '/myPickingList',
					// 		permissions: ['app:serviceCharge:index'],
					// 		subheading: '',
					// 	}, ]
					// },
				]
			}
		},
		created() {
			this.loginInfo = getInfo();
			// 获取当前app的版本
			const systemInfo = uni.getSystemInfoSync();
			// #ifdef H5
			this.version_number = systemInfo.appVersion;
			// #endif
			// #ifdef APP
			this.version_number = systemInfo.appWgtVersion;
			// #endif
			// 条件编辑只在微信小程序显示
			// #ifdef MP-WEIXIN
			const accountInfo = wx.getAccountInfoSync();
			this.version_number = accountInfo.miniProgram.version // 小程序 版本号
			console.log(accountInfo.miniProgram.version, '小程序版本号')
			// #endif
		},
		methods: {
			goTo(params) {
				this.$goTo(params)
			},
			goToUser() {
				this.$goTo("/pages/loginAndReg/userAccount");
			},
		}
	}
</script>

<style lang="scss" scoped>
	.xls-personal {
		position: relative;
		overflow-x: hidden;

		&-bg {
			width: 140%;
			height: 210px;
			position: absolute;
			z-index: 0;
			top: 0;
			left: 50%;
			transform: translateX(-50%);
			background-color: $xls-color-primary;
			border-bottom-left-radius: 50%;
			border-bottom-right-radius: 50%;
		}

		&-main {
			padding: 20rpx 20rpx 40rpx 20rpx;
		}

		&-main-header {
			padding: 30rpx 0 40rpx 30rpx;
			display: flex;
			align-items: center;
			color: #fff;
			position: relative;

			&-image {
				width: 110rpx;
				height: 110rpx;
				box-sizing: border-box;
				border-radius: 20rpx;
				margin-right: 20rpx;
				position: relative;
				overflow: hidden;

				.image {
					width: 110rpx;
				}

				.camera-wrapper {
					display: flex;
					align-items: center;
					justify-content: center;
					position: absolute;
					right: 0;
					bottom: 0;
					width: 40rpx;
					height: 40rpx;
					background: rgba(0, 0, 0, 0.5);
					border-top-left-radius: 6rpx;
					border-bottom-right-radius: 6rpx;
				}

				.camera {
					width: 29rpx;
				}
			}

			&-info {
				min-width: 284rpx;
				font-size: 32rpx;
				flex: 1;

				.user-name {
					font-weight: 700;
				}

				.user-phone {
					margin-top: 20rpx;
					width: 100%;
					font-size: 28rpx;
				}
			}

			&-btn {
				font-size: 24rpx;
				font-weight: 700;
				padding: 16rpx 24rpx;
				border-radius: 40rpx;
				background: #fff;
				color: #000;
			}
		}

		&-options {
			position: relative;
			background: #fff;
			border-radius: 16rpx;
			box-shadow: 4rpx 6rpx 4rpx 0 rgba(98, 113, 186, 0.2);
		}

		&-options:not(:last-child) {
			margin-bottom: 40rpx;
		}

		.options-wrapper {
			height: 100rpx;
			padding: 0 60rpx 0 30rpx;
			display: flex;
			align-items: center;
			position: relative;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			border-top: 2rpx solid #E6E5E5;
			border-radius: 16rpx;

			.image {
				width: 40rpx;

				margin-right: 20rpx;
			}

			.text {
				font-size: 32rpx;
				color: #000;
			}

			.right-value {
				flex: 1;
				text-align: right;
				font-size: 28rpx;
				color: #878787;
			}
		}

		.options-wrapper::after {
			content: "";
			position: absolute;
			right: 20rpx;
			top: 50%;
			transform: translateY(-50%) rotate(45deg);
			border-right: 2rpx solid #7f7d7d;
			border-top: 2rpx solid #7f7d7d;
			width: 18rpx;
			height: 18rpx;
		}
		
		.version-style {
			color: #cacaca;
			font-size: 24rpx;
			text-align: center;
		}
	}
</style>
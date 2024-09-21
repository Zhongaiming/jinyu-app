<template>
	<view class="xls-options">
		<view class="xls-options-list" v-for="option in dataList" :key="option.id" v-if="getModuleShow(option)">
			<view class="xls-options-list-title" v-hasPermi="[...option.permissions]" v-if="option.title">
				{{option.title}}
			</view>
			<view class="xls-options-list-content">
				<view class="xls-options-list-main" v-for="item in option.dataList" :key="item.id"
					v-hasPermi="[...item.permissions]" @click="goTo(item)" v-if="getTypeShow(item)">
					<view class="xls-options-list-image">
						<image class="image" :src="item.imgUrl" mode="widthFix"></image>
						<span class="status" v-if="item.id==42&&coupleNum>0">{{coupleNum}}</span>
					</view>
					<view class="xls-options-list-main-text">
						{{item.title}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex';
	export default {
		name: "homeOptions",
		props: {
			coupleNum: {
				type: Number,
				default: 0
			}
		},
		computed: {
			...mapGetters([
				'deviceTypeIdList'
			])
		},
		data() {
			return {
				dataList: [{
					id: 1,
					title: '',
					permissions: ['app:bing:index', 'app:meal:index'],
					dataList: [{
							id: 11,
							title: '设备绑定',
							imgUrl: `${this.$baseUrl}homeImages/fristList/one.png`,
							route: '/pages/mainPackages/home/deviceModule/deviceBind',
							permissions: ['app:bing:index'],
							status: 0
						},
						{
							id: 12,
							title: '套餐设置',
							imgUrl: `${this.$baseUrl}homeImages/fristList/two.png`,
							route: '/pages/mainPackages/home/packageModule/index',
							permissions: ['app:meal:index'],
							status: 0
						},
						{
							id: 13,
							title: '订单查询',
							imgUrl: `${this.$baseUrl}homeImages/fristList/three.png`,
							route: '/pages/mainPackages/home/order/index',
							permissions: ['app:order:index'],
							status: 0
						},
						{
							id: 14,
							title: '远程启动',
							imgUrl: `${this.$baseUrl}homeImages/fristList/four.png`,
							route: '/pages/mainPackages/home/remote/index',
							permissions: ['app:remoteboot:index'],
							status: 0
						},
						// {
						// 	id: 15,
						// 	title: '营销工具',
						// 	imgUrl: `${this.$baseUrl}homeImages/fristList/five.png`,
						// 	route: '/pages/mainPackages/home/marketingModule/index',
						// 	permissions: ['app:marketing:index'],
						// 	status: 0
						// }
					]
				}, 
				{
					id: 2,
					title: '售货机',
					permissions: ['app:shj:statistics:read', 'app:shj:stockUp:read', 'app:shj:data:read',
						'app:shj:replenish:read', 'app:shj:commodity:read'
					],
					deviceType: 4,
					dataList: [{
							id: 21,
							title: '出货统计',
							imgUrl: `${this.$baseUrl}homeImages/secondList/one.png`,
							route: '/pages/mainPackages/home/shipmentStatistics/index',
							params: {
								deviceType: 4
							},
							permissions: ['app:shj:statistics:read'],
							status: 0
						},
						{
							id: 22,
							title: '缺货备货',
							imgUrl: `${this.$baseUrl}homeImages/secondList/two.png`,
							route: '/pages/subpackages/home/shjModule/shjStock/index',
							permissions: ['app:shj:stockUp:read'],
							status: 0
						},
						{
							id: 23,
							title: '数据分析',
							imgUrl: `${this.$baseUrl}homeImages/secondList/three.png`,
							route: '/pages/subpackages/home/shjModule/shjAnalyse/index',
							permissions: ['app:shj:data:read'],
							status: 0
						},
						{
							id: 24,
							title: '补货管理',
							imgUrl: `${this.$baseUrl}homeImages/secondList/four.png`,
							route: '/pages/subpackages/home/shjModule/shjReplenishment/index',
							permissions: ['app:shj:replenish:read'],
							status: 0
						},
						{
							id: 25,
							title: '商品管理',
							imgUrl: `${this.$baseUrl}homeImages/secondList/five.png`,
							route: '/pages/mainPackages/home/commodity/index',
							permissions: ['app:shj:commodity:read'],
							status: 0
						}
					]
				}, 
				{
					id: 3,
					title: '礼品机',
					permissions: ['app:gift:index', 'app:shop:index', 'app:ndj:index',
						'app:pay:index', 'app:dbj:index:read', 'app:meituan:index:read'
					],
					dataList: [{
							id: 31,
							title: '礼品统计',
							imgUrl: `${this.$baseUrl}homeImages/threeList/one.png`,
							route: '/pages/mainPackages/home/shipmentStatistics/index',
							params: {
								deviceType: null
							},
							permissions: ['app:gift:index'],
							status: 0
						},
						{
							id: 32,
							title: '商品管理',
							imgUrl: `${this.$baseUrl}homeImages/threeList/five.png`,
							route: '/pages/mainPackages/home/commodity/index',
							permissions: ['app:shop:index'],
							status: 0
						},
						{
							id: 33,
							title: '扭蛋机数据',
							imgUrl: `${this.$baseUrl}homeImages/threeList/six.png`,
							route: '/pages/mainPackages/home/ndjData/index',
							permissions: ['app:ndj:index'],
							status: 0,
							result: 0,
							deviceType: 2
						},
						// {
						// 	id: 34,
						// 	title: '付款',
						// 	imgUrl: `${this.$baseUrl}homeImages/threeList/eight.png`,
						// 	route: '',
						// 	permissions: ['app:pay:index'],
						// 	status: 0
						// },
						{
							id: 35,
							title: '兑币机数据',
							imgUrl: `${this.$baseUrl}homeImages/threeList/dbj.png`,
							route: '/pages/mainPackages/home/dbjData/index',
							permissions: ['app:dbj:index:read'],
							status: 0,
							deviceType: 5,
						},
						{
							id: 36,
							title: '美团核销',
							imgUrl: `${this.$baseUrl}homeImages/threeList/meituan.png`,
							route: '/pages/subpackages/home/meituanWriteOff/add',
							permissions: ['app:meituan:index:read'],
							status: 0,
							result: 0,
							deviceType: 5,
						},
						{
							id: 37,
							title: '抖音核销',
							imgUrl: `${this.$baseUrl}homeImages/threeList/douyin.png`,
							route: '/pages/subpackages/home/douyinWriteOff/index',
							permissions: 'app:meituan:index:read',
							status: 0,
							result: 0,
							deviceType: 5,
						}
					]
				}, {
					id: 4,
					title: '功能插件',
					permissions: ['app:subaccounts:index', 'app:couple:index', 'app:tag:index',
						'app:pay:index'
					],
					dataList: [{
							id: 41,
							title: '自动分账',
							imgUrl: `${this.$baseUrl}homeImages/fourList/second.png`,
							route: '/pages/mainPackages/home/separateAccounts/index',
							permissions: ['app:subaccounts:index'],
							status: 0
						},
						{
							id: 42,
							title: '申诉反馈',
							imgUrl: `${this.$baseUrl}homeImages/fourList/four.png`,
							route: '/pages/mainPackages/home/appealFeedback/index',
							permissions: ['app:couple:index'],
							status: 0
						},
						// {
						// 	id: 43,
						// 	title: '标签管理',
						// 	imgUrl: `${this.$baseUrl}homeImages/fourList/five.png`,
						// 	route: '/setMealing',
						// 	permissions: ['app:tag:index'],
						// 	status: 0,
						// },
						{
							id: 44,
							title: '黑名单管理',
							imgUrl: `${this.$baseUrl}homeImages/fourList/nine.png`,
							route: '/pages/mainPackages/home/blacklist/index',
							permissions: ['app:back:index'],
							status: 0
						},
					]
				}]
			}
		},
		methods: {
			goTo(route) {
				this.$goTo(route.route, undefined, route.params)
			},
			getModuleShow(item) {
				const filtrationList = [2];
				if(!filtrationList.includes(item.id)) {
					return true
				} else {
					return this.deviceTypeIdList.includes(item.deviceType)
				}
			},
			getTypeShow(item) {
				const filtrationList = [33, 35];
				if(!filtrationList.includes(item.id)) {
					return true
				} else {
					return this.deviceTypeIdList.includes(item.deviceType)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.xls-options {
		&-list {
			&-title {
				background: #fff;
				margin-top: 15px;
				padding: 15px 10px 5px 10px;
				font-size: 15px;
				font-weight: 600;
			}

			&-content {
				display: flex;
				flex-wrap: wrap;
				background: #fff;
				width: 100%;
				overflow: hidden;
			}

			&-main {
				width: 20%;
				font-size: 28rpx;
				height: 160rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				position: relative;
			}

			&-image {
				width: 92rpx;
				height: 92rpx;
				display: inline-block;
				position: relative;

				.image {
					width: 150rpx;
					position: absolute;
					top: 8rpx;
					left: 50%;
					transform: translateX(-50%);
				}

				.status {
					background: #ff4747;
					border-radius: 14rpx 14rpx 14rpx 8rpx;
					box-sizing: content-box;
					color: #fff;
					font-size: 20rpx;
					font-weight: 400;
					height: 28rpx;
					line-height: 28rpx;
					min-width: 28rpx;
					padding: 0 5rpx;
					position: absolute;
					text-align: center;
					top: 0rpx;
					right: -26rpx;
				}
			}
		}
	}
	
</style>
<template>
	<view class="page_mark_wrapper">
		<xls-jy-navbar title="营销工具" bgColor="#f5f6f7"></xls-jy-navbar>
		<view class="tool_item_wrapper" v-for="item in toolList" :key="item.id" v-hasPermi="[`${item.permissions}`]">
			<view class="title">{{ item.title }}</view>
			<view class="block_wrapper">
				<view class="tool_style" v-for="list in item.moduleList" :key="list.id" @click="nextPage(list)"
					v-hasPermi="[`${list.permissions}`]">
					<view class="icon_box">
						<xls-image :src="list.imgUrl" v-if="list.imgUrl" mode="heightFix"></xls-image>
						<u-icon :name="list.icon" class="icon" :color="list.color" size="80" v-else/>
						<view class="animat-shake" v-if="list.shake">{{ list.shake }}</view>
					</view>
					<view class="tool_text text-over">{{ list.title }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "mark_index",
		data() {
			return {
				toolList: [{
						id: 1,
						title: "提升客流",
						permissions: "app:marketing:index:passenger",
						moduleList: [{
								id: 4,
								title: "闲时套餐",
								icon: "clock-o",
								color: "#5241ff",
								shake: "",
								path: "/marketing/leiList",
								query: {},
								permissions: "-",
							},
							{
								id: 5,
								title: "拼团购币",
								icon: "comment-circle-o",
								color: "#5241ff",
								shake: "",
								path: "",
								query: {},
								permissions: "-",
							},
							{
								id: 8,
								title: "新用户特惠",
								icon: "account-fill",
								imgUrl: `${this.$baseUrl}appV4/marketingModule/newUser.png`,
								color: "#5241ff",
								shake: "",
								path: "/pages/subpackages/home/marketingModule/newUser/indexList/index",
								query: {},
								permissions: "app:marketing:passenger:list",
							},
							{
								id: 9,
								title: "智慧营销",
								icon: "smile-o",
								color: "#5241ff",
								shake: "增收",
								path: "",
								query: {},
								permissions: "-",
							},
						],
					},
					{
						id: 2,
						title: "场地促销",
						permissions: "app:marketing:index:promotion",
						moduleList: [{
								id: 10,
								title: "升单宝",
								icon: "warning-o",
								color: "#ff9500",
								shake: "火爆",
								path: "",
								query: {},
								permissions: "-",
							},
							{
								id: 12,
								title: "随机立减",
								icon: "rmb-circle-fill",
								imgUrl: `${this.$baseUrl}appV4/marketingModule/random.png`,
								color: "#ff9500",
								shake: "",
								path: "/pages/subpackages/home/marketingModule/random/list/index",
								query: {},
								permissions: "app:marketing:coupon:list",
							},
							{
								id: 14,
								title: "支付立减劵",
								icon: "coupon-fill",
								imgUrl: `${this.$baseUrl}appV4/marketingModule/couple.png`,
								color: "#ff9500",
								shake: "火爆",
								path: "/pages/subpackages/home/marketingModule/coupon/list/index",
								query: {},
								permissions: "app:marketing:coupon:list",
							},
							{
								id: 16,
								title: "限时优惠",
								icon: "certificate",
								imgUrl: `${this.$baseUrl}appV4/marketingModule/limited.png`,
								color: "#ff9500",
								shake: "",
								path: "/marketing/coupon_list",
								query: {},
								permissions: "-",
							},
						],
					},
					{
						id: 3,
						title: "找回顾客",
						permissions: "-",
						moduleList: [{
							id: 18,
							title: "游戏币红包",
							icon: "gold-coin-o",
							imgUrl: `${this.$baseUrl}appV4/marketingModule/currency.png`,
							color: "#f93b3b",
							shake: "",
							path: "",
							permissions: "-",
							query: {},
						}, ],
					},
				],
			};
		},
		methods: {
			nextPage(list) {
				if (!list.path) {
					return this.$toast("火速开发中");
				}
				this.$goTo(list.path, "navigateTo", {
					...list.query
				});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.tool_item_wrapper {
		margin-bottom: 10px;
		background: #fff;

		.title {
			color: #1e2021;
			font-size: 16px;
			font-family: PingFangSC-Medium;
			padding-top: 13px;
			padding-left: 10px;
			font-weight: 700;
		}

		.block_wrapper {
			display: flex;
			flex-wrap: wrap;
			padding: 20px 0;

			.tool_style {
				position: relative;
				margin-bottom: 15px;
				text-align: center;
				flex: 0 0 25%;
				font-size: 0;

				.icon_box {
					height: 50px;
					display: flex;
					justify-content: space-around;

					.icon {
						font-size: 50px;
						color: #5241ff;
					}
				}

				.tool_text {
					margin-top: 10px;
					font-size: 14px;
					font-weight: 700;
					line-height: 15px;
					width: 100%;
				}

				.animat-shake {
					position: absolute;
					right: -7px;
					top: -7px;
					font-size: 11px;
					line-height: 11px;
					color: #fff;
					background-color: #f33;
					border-radius: 14px 14px 14px 2px;
					padding: 2.5px 5px;
					transform-origin: 0 100% 0;
					animation: shakeDrew 1s ease-in-out infinite;
				}

				@keyframes shakeDrew {
					0% {
						transform: rotate(0);
					}

					75% {
						transform: rotate(-15deg);
					}

					85% {
						transform: rotate(0);
					}
				}
			}
		}
	}
</style>
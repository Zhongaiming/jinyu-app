<template>
	<div class="page_mark_wrapper">
		<jy-navbar title="营销工具"></jy-navbar>
		<div class="tool_item_wrapper" v-for="item in toolList" :key="item.id" v-hasPermi="[`${item.permissions}`]">
			<div class="title">{{ item.title }}</div>
			<div class="block_wrapper">
				<div class="tool_style" v-for="list in item.moduleList" :key="list.id" @click="nextPage(list)"
					v-hasPermi="[`${list.permissions}`]">
					<div class="icon_box">
						<u-icon :name="list.icon" size="100" :color="list.color" />
						<div class="animat-shake" v-if="list.shake">{{ list.shake }}</div>
					</div>
					<div class="tool_text text-over">{{ list.title }}</div>
				</div>
			</div>
		</div>
	</div>
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
								icon: "tags",
								color: "#5241ff",
								shake: "",
								path: "/marketing/leiList",
								query: {},
								permissions: "-",
							},
							{
								id: 5,
								title: "拼团购币",
								icon: "shopping-cart",
								color: "#5241ff",
								shake: "",
								path: "",
								query: {},
								permissions: "-",
							},
							{
								id: 8,
								title: "新用户特惠",
								icon: "account",
								color: "#5241ff",
								shake: "",
								path: "/marketing/user",
								query: {},
								permissions: "app:marketing:passenger:list",
							},
							{
								id: 9,
								title: "智慧营销",
								icon: "gift",
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
								icon: "man-add",
								color: "#ff9500",
								shake: "火爆",
								path: "",
								query: {},
								permissions: "-",
							},
							{
								id: 12,
								title: "随机立减",
								icon: "rmb-circle",
								color: "#ff9500",
								shake: "火爆",
								path: "/marketing/random_list",
								query: {},
								permissions: "app:marketing:coupon:list",
							},
							{
								id: 14,
								title: "支付立减劵",
								icon: "coupon",
								color: "#ff9500",
								shake: "",
								path: "/marketing/coupon_list",
								query: {},
								permissions: "app:marketing:coupon:list",
							},
							{
								id: 16,
								title: "限时优惠",
								icon: "hourglass",
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
							icon: "red-packet",
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
				this.$router.push({
					path: list.path,
					query: list.query,
				});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.tool_item_wrapper {
		margin-bottom: 10px;
		background: #fff;
		font-family: PingFangSC-Medium;

		.title {
			color: #1e2021;
			font-size: 16px;
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
					line-height: 15px;
					width: 100%;
				}

				.animat-shake {
					position: absolute;
					right: 3px;
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
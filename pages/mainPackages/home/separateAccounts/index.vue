<template>
	<view class="subAccount">
		<xls-jy-navbar title="自动分账"></xls-jy-navbar>
		<view class="hint-panel">
			<u-icon name="checkmark-circle-fill" color="#5241FF" /><span class="success">欢迎使用自动分账！</span>
		</view>
		<view class="type-wrapper">

			<view class="type-list" v-hasPermi="['app:subacounts:index:person']" @click="goTo('person')">
				<view class="icon">
					<image :src="`${$baseUrl}appV4/my/account_image/ico_member.png`" alt="" class="image"
						mode="widthFix">
				</view>
				<view class="name">分成人员管理</view>
				<view class="status memberstatus">共{{ total }}人</view>
			</view>

			<view class="type-list isviewided" v-hasPermi="['app:subacounts:index:ratio']" @click="goTo('setup')">
				<view class="icon">
					<image :src="`${$baseUrl}appV4/my/account_image/ico_site.png`" alt="" class="image" mode="widthFix">
				</view>
				<view class="name">分成比例设置</view>
				<view class="status"></view>
			</view>

			<view class="type-list" v-hasPermi="['app:subaccounts:index:earn']" @click="goTo('income')">
				<view class="icon">
					<image :src="`${$baseUrl}appV4/my/account_image/ico_search.png`" alt="" class="image"
						mode="widthFix">
				</view>
				<view class="name">收益分成查询</view>
				<view class="status">分成统计</view>
			</view>
		</view>
		<view class="foot-wrapper">
			<view class="foot-tips">
				<p class="J_shj_tips">
					提示：开启了自动分账的场地，不支持“部分退款”，只支持“全额退款”。
				</p>
			</view>
		</view>
	</view>

</template>

<script>
	import {
		separateController
	} from '@/api/index.js';
	export default {
		data() {
			return {
				total: 0,
				dataList: [],
			};
		},
		async created() {
			let res = await separateController.getSeparatePerson({
				pageParam: {
					pageNum: 1,
					pageSize: 1
				}
			});
			if (res.code == 200) {
				this.total = res.data.totalCount;
				this.dataList = res.data.dataList;
			}
		},
		methods: {
			goTo(route) {
				this.$goTo(`/pages/mainPackages/home/separateAccounts/${route}/index`);
			}
		},
	};
</script>

<style lang="scss" scoped>
	.subAccount {
		font-family: "Helvetica Neue", Helvetica, sans-serif;
	}

	.type-wrapper {
		padding: 10px;

		.type-list {
			display: flex;
			align-items: center;
			margin-bottom: 10px;
			height: 55px;
			border-radius: 5px;
			box-shadow: 0 2px 15px #9297a333;

			.icon_member {
				background-image: url(#{$baseUrl}appV4/my/account_image/ico_member.png);
			}

			.setRatio-icon {
				background-image: url(#{$baseUrl}appV4/my/account_image/ico_site.png);
			}

			.query-icon {
				background-image: url(#{$baseUrl}appV4/my/account_image/ico_search.png);
			}

			.weixin-icon {
				background-image: url(#{$baseUrl}appV4/my/account_image/icon_weixin.png);
			}

			.icon {
				background-size: 100% 100%;
				background-repeat: no-repeat;
				margin-top: 15px;

				.image {
					width: 58px;
				}
			}

			.name {
				font-size: 16px;
				color: #000;
			}

			.status {
				font-size: 14px;
				color: #9a9a9a;
				flex: 1;
				text-align: right;
				margin-right: 10px;
				position: relative;
				padding-right: 10px;
			}

			.status:after {
				content: "";
				display: block;
				position: absolute;
				right: 0;
				top: 50%;
				margin-top: -4.5px;
				width: 9px;
				height: 9px;
				border-top: 1px solid #999;
				border-right: 1px solid #999;
				opacity: 0.6;
				-webkit-transform: rotate(45deg);
				transform: rotate(45deg);
			}
		}
	}

	.hint-panel {
		padding: 0 10px;
		height: 36px;
		background: #F5F6F7;
		display: flex;
		line-height: 36px;
		font-size: 13px;
		color: #5241FF;

		.success {
			margin-left: 5px;
		}

		.operate-btn {
			position: relative;
			padding-right: 12px;
			color: #5241FF;
		}

		.operate-btn:after {
			content: "";
			display: block;
			position: absolute;
			right: 0;
			top: 50%;
			margin-top: -4px;
			width: 8px;
			height: 8px;
			border-top: 1px solid #5241FF;
			border-right: 1px solid #5241FF;
			opacity: 0.6;
			-webkit-transform: rotate(45deg);
			transform: rotate(45deg);
		}
	}

	.foot-wrapper {
		position: fixed;
		bottom: 20px;
		width: 100%;

		.foot-tips {
			margin: 0 15px 15px;

			.J_shj_tips {
				margin: 0;
				padding: 5px 10px;
				border-radius: 5px;
				background-color: #E6E4FE;
				color: #333;
				font-size: 14px;
			}
		}

		.foot-btn {
			text-align: center;
			background: #fff;

			.s-close-btn {
				color: #5241FF;
				display: inline-block;
				font-size: 14px;
				line-height: 19px;
				border-bottom: 1px solid #5241FF;
			}
		}
	}
</style>
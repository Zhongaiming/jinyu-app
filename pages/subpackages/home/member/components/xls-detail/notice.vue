<template>
	<u-popup :show="showNotice" mode="center" round="20">
		<view class="noticeTips">
			<view class="member-title">
				<span v-show="!nextTips">统计</span>数据说明
			</view>
			<ol class="explain-ol" v-show="!nextTips">
				<li class="explain-li">
					<span class="explain-text">
						数据统计截止至前一日凌晨24时,每天凌晨更新一次。
					</span>
				</li>
				<li class="explain-li">
					<view class="explain-circle"></view>
					<span class="explain-text">用户总数：</span><span>扫过码的用户数量</span>
				</li>
				<li class="explain-li">
					<view class="explain-circle"></view>
					<span class="explain-text">累计支付：</span><span>所有用户充值和启动设备所支付的金额总和</span>
				</li>
				<li class="explain-li">
					<view class="explain-circle"></view>
					<span class="explain-text">总余额：</span><span>所有用户剩余余额的总和</span>
				</li>
				<li class="explain-li">
					<view class="explain-circle"></view>
					<span class="explain-text">总余币：</span><span>所有用户剩余余币的总和</span>
				</li>
			</ol>
			<view class="declaration-content" v-if="nextTips">
				<view class="declaration-item">
					累计支付:用户充值+启动设备+购买商品所支付的金额。
				</view>
				<view class="declaration-item">余额:当前用户剩余余额。</view>
				<view class="declaration-item">余币:当前用户剩余余币。</view>
				<view class="declaration-item">累计充值:用户充值所支付的金额。</view>
				<view class="declaration-item">
					启动支付:用户启动设备+购买商品所支付的金额。
				</view>
				<view class="declaration-item">余额支付:用户累计消耗的余额。</view>
				<view class="declaration-item">累计投币:用户累计的消耗的余币。</view>
				<view class="declaration-item">
					支付用户:筛选条件下有数据的用户数量。
				</view>
			</view>
			<view class="bottom-btn" @click="showNotice = false">确定</view>
		</view>
	</u-popup>
</template>

<script>
	export default {
		name: "noticeTips",
		data() {
			return {
				showNotice: false,
				nextTips: false,
			};
		},
		methods: {
			showTips(params) {
				this.showNotice = !this.showNotice
				this.nextTips = params == 1
			},
		},
	};
</script>

<style lang="scss" scoped>
	.noticeTips {
		width: 280px;
		padding: 20px;

		.member-title {
			color: #333;
			font-size: 17px;
			font-weight: 700;
			text-align: center;
		}

		.bottom-btn {
			width: 100%;
			height: 44px;
			border-radius: 8px;
			background: #5241FF;
			color: #fff;
			line-height: 44px;
			text-align: center;
			font-size: 15px;
		}

		.explain-ol {
			font-size: 13px;
			padding: 12px 0;

			.explain-li {
				padding-left: 12px;
				position: relative;

				.explain-text {
					font-weight: 700;
				}

				.explain-circle {
					position: absolute;
					width: 4px;
					height: 4px;
					border-radius: 50%;
					left: 0;
					top: 50%;
					margin-top: -2px;
					background: #000;
				}
			}
		}

		.declaration-content {
			padding: 12px 0;

			.declaration-item {
				font-size: 13px;
				line-height: 20px;
				color: #333;
				padding-left: 8px;
				position: relative;
				text-align: justify;
				white-space: normal;
			}

			.declaration-item:before {
				position: absolute;
				content: "";
				width: 4px;
				height: 4px;
				left: 0;
				top: 8px;
				border-radius: 50%;
				background: #000;
				display: inline-block;
				white-space: normal;
			}
		}
	}
</style>
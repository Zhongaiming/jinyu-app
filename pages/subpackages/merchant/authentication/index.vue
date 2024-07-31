<template>
	<view class="xls-merchat-auth">
		<xls-jy-navbar title="审核进度" bgColor="#5241FF" titleStyle="color: #fff"></xls-jy-navbar>
		<xls-steps :current="6"></xls-steps>
		<div class="tabs-outside">

			<div class="tabs-box box-color">
				<div class="tab tab-text-wrapper">
					中国银行 <u-icon name="arrow-right"></u-icon>
				</div>
			</div>

			<div class="tabs-box">
				<div class="tab" @click="activeItem = 0" :class="{active: activeItem === 0}">
					<p class="tab-text">待认证</p>
				</div>
				<div class="tab" @click="activeItem = 1" :class="{active: activeItem === 1}">
					<p class="tab-text">已认证</p>
				</div>
			</div>

		</div>
	</view>
</template>

<script>
	import xlsSteps from "../merchantCA/components/xls-steps/index.vue";
	export default {
		components: {
			xlsSteps
		},
		data() {
			return {
				activeItem: 0,
			}
		},
	}
</script>

<style lang="scss" scoped>
	.xls-merchat-auth {
		display: flex;
		flex-direction: column;
		position: relative;

		.tabs-outside {
			background-color: #fff;
			border-radius: 12px 12px 0 0;
			flex-shrink: 0;
			margin-top: -20px;
			padding: 12px;

			.tabs-box {
				align-items: center;
				background-color: #f0f3f5;
				border-radius: 8px;
				display: flex;
				padding: 2px;
				box-sizing: border-box;

				.tab {
					color: #666;
					flex: 1;
					font-family: PingFangSC;
					font-size: 13px;
					font-weight: 400;
					height: 28px;
					line-height: 28px;
					text-align: center;
				}

				.tab:first-child {
					border-radius: 6px 0 0 6px;
				}

				.tab:last-child {
					border-radius: 0 6px 6px 0;
				}

				.active {
					background-color: #fff;
					color: #333;
					font-weight: 700;
				}

				.tab-text-wrapper {
					text-align: left;
					display: flex;
					color: #333;
					font-weight: 700;
				}
			}

			.box-color {
				background: #fff;
			}
		}


	}
</style>
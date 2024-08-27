<template>
	<view>
		<!-- 搜索 -->
		<view class="header-wrapper">
			<view class="manager-header">
				<view class="center" @click="goTo()">
					<u-icon name="search" size="36" class="search-icon" />
					<view class="info">搜索昵称/会员ID</view>
				</view>
				<view class="right">
					<view class="btn" @click="setMember = !setMember" :style="{ color:setMember?'#5241FF':''}">
						<u-icon name="setting" size="30" />
						<span v-html="setMember ? '退出' : '设置'"></span>
					</view>
				</view>
			</view>
		</view>
		<!-- 条件 -->
		<view class="sidder-condition">
			
		</view>
	</view>
</template>

<script>
	export default { 
		data() {
			return {
				setMember: false,
			}
		},
		methods: {
			goTo() {
				this.$goTo('/pages/subpackages/home/member/search')
			},
		}
	}
</script>

<style lang="scss" scoped>
	.header-wrapper {
		width: 100%;

		.manager-header {
			display: flex;
			background: #f5f6f7;
			align-items: center;
			height: 84rpx;
			width: 100%;

			.center {
				height: 56rpx;
				border-radius: 16rpx;
				background: #fff;
				margin-left: 16rpx;
				flex: 1;
				display: flex;
				align-items: center;
				color: #bbb;

				.search-icon {
					margin: 0 16rpx;
				}

				.info {
					font-size: 26rpx;
				}
			}

			.right {
				display: flex;
				padding: 0 16rpx;
				color: #666;
				font-size: 24rpx;

				.btn {
					padding: 0 16rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
				}
			}
		}
	}
</style>
<template>
	<!-- 分账人 -->
	<u-popup :show="showPeople" position="bottom" :style="{ height: '60%' }">
		<view class="person-list">
			<span class="title">请选择分成人员</span>
			<search-input placeholder="请输入场地名称" marLeft="-5.5em" @stratesSearch="stratesSearch"></search-input>
			<view class="list-content">
				<view class="item" v-for="(item, index) in searchBillList" :key="index" @click="pickerPerson(item)">
					<span class="person-name">{{ item.nickName
	      }}<span class="person-phone">&nbsp;&nbsp;({{ item.username }})</span></span>
					<span>&gt;</span>
				</view>
				<view class="on-earth">到底了~</view>
			</view>
		</view>
	</u-popup>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.person-list {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;

		.title {
			text-align: center;
			border-bottom: 1rpx solid #e6e2e2;
			line-height: 50rpx;
			font-size: 16rpx;
		}

		.list-content {
			flex: 1;
			overflow-y: auto;
			padding-bottom: 10rpx;
			box-sizing: border-box;
			font-size: 15rpx;
			padding: 0 12rpx;

			.item {
				display: flex;
				line-height: 40rpx;
				border-bottom: 1rpx solid #f5f5f5;

				.person-name {
					display: inline-block;
					font-weight: 600;
					flex: 1;
				}

				.person-phone {
					font-size: 10rpx;
					color: #999;
				}
			}
		}

		.on-earth {
			text-align: center;
			color: #999;
			font-size: 10rpx;
			padding: 5rpx 0;
		}
	}
</style>
<template>
	<u-popup :show="havePersontips">
		<view class="noPersontips havePersontips">
			<view class="title-name title-name-have">分成设置</view>
			<view class="content-person">
				<view class="items">
					<view class="title">分成人员：</view>
					<view class="item-con" :style="editOradd ? { 'pointer-events': 'none' } : ''"
						@click="showPeople = true">
						<span class="main-text" :style="
	          billsPeople == '请选择分成人员' ? { color: '#c8c9cc' } : ''
	        ">
							{{ billsPeople }}
							<span v-show="editOradd" style="color: #c8c9cc; font-size: 10rpx">(不可编辑)</span>
						</span>
						<u-icon name="arrow-down" class="icon" size="20" color="#c8c9cc" />
					</view>
				</view>
				<view class="items">
					<view class="title">分成比例：</view>
					<view class="item-con">
						<u-field type="number" v-model="proportion" placeholder="请输入给合作方的分成比例" maxlength="5"
							clearable />
						<span class="icon">%</span>
					</view>
				</view>
				<view class="items" v-show="editOradd">
					<view class="title">是否主分账人员：</view>
					<view class="right">
						<u-switch v-model="checked" size="24rpx" active-color="#5241FF" />
					</view>
				</view>
				<view class="items">
					<view class="title">合作方银行卡号：</view>
					<span class="next-txt">自动读取</span>
				</view>
			</view>
			<view class="bottom-btn">
				<view class="btn" @click="havePersontips = !havePersontips">取消</view>
				<view class="btn" @click="addOreditPeople">确定</view>
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
	.havePersontips {
		padding: 0;

		.bottom-btn {
			display: flex;
			border-top: 1rpx solid rgba(229, 229, 229, 1);

			.btn {
				flex: 1;
				text-align: center;
				line-height: 50rpx;
				font-size: 16rpx;
				color: #5241ff;
			}

			.btn:not(:first-child) {
				border-left: 1rpx solid rgba(229, 229, 229, 1);
			}
		}

		.content-person {
			padding: 12rpx;

			.items {
				display: flex;
				align-items: center;
				font-size: 15rpx;
				margin-bottom: 12rpx;

				.title {
					font-weight: 600;
				}

				.next-txt {
					font-size: 14rpx;
					color: #999;
				}

				.right {
					flex: 1;
					display: flex;
					justify-content: flex-end;
				}

				.item-con {
					flex: 1;
					margin-left: 12rpx;
					padding: 0 10rpx;
					line-height: 44rpx;
					border: 1rpx solid #d0d0d0;
					border-radius: 6rpx;
					display: flex;
					align-items: center;
					position: relative;

					.input {
						font-size: 15rpx;
						flex: 1;
						padding: 0;
						margin: 0;
						box-sizing: border-box;
						border: 0;
						margin-bottom: 0;
						line-height: 44rpx;
						outline: 0;
						background-color: #fff;
						appearance: none;
					}

					.icon {
						font-size: 16rpx;
						padding-left: 8rpx;
					}

					.main-text {
						flex: 1;
						width: 100%;
					}
				}
			}
		}
	}
</style>
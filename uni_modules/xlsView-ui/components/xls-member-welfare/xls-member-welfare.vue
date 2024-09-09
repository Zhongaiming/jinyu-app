<template>
	<!-- 派发福利 -->
	<u-popup :show="partWelfare" round="20" mode="center">
		<view class="part-welfare">
			<view class="member-dialog-title">派福利给会员</view>
			<view class="member-dialog-card-content">
				<xls-field v-model="welfareForm.operationCurrency" label="送游戏币" type="digit" placeholder="请输入数量(选填)">
					<template #extra>
						<text class="text">个</text>
					</template>
				</xls-field>
				<xls-field v-model="welfareForm.operationBalance" label="送会员余额" type="number" placeholder="请输入金额(选填)">
					<template #extra>
						<text class="text">元</text>
					</template>
				</xls-field>
				<xls-field label="备注" disabled />
				<xls-field v-model="welfareForm.operationRemark" rows="2" autosize type="textarea" maxlength="20"
					placeholder="请输入备注信息" show-word-limit style="background: #fafafa; border: 1px solid #ebebeb" />
			</view>
			<view class="member-dialog-button-group">
				<view class="btn" @click="partWelfare = false">取消</view>
				<view class="btn btn-last-child" @click="confirmWelfare">确定</view>
			</view>
		</view>
	</u-popup>
</template>

<script>
	export default {
		name: "xls-member-welfare",
		data() {
			return {
				partWelfare: true,
				welfareForm: {
					operationCurrency: null,
					operationBalance: null,
					operationRemark: null,
				}
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.part-welfare {
		padding: 40rpx;
		width: 640rpx;

		.member-dialog-title {
			color: #333;
			font-size: 34rpx;
			font-weight: 700;
			text-align: center;
		}

		.member-dialog-button-group {
			display: flex;
			align-items: center;

			.btn {
				font-size: 32rpx;
				font-weight: 400;
				border-radius: 16rpx;
				height: 88rpx;
				flex: 1;
				border: none;
				background: #f5f5f5;
				color: #333;
				line-height: 88rpx;
				text-align: center;
			}

			.btn-last-child {
				background: #5241ff;
				color: #fff;
				margin-left: 16rpx;
			}
		}

		.member-dialog-card-content {
			padding: 24rpx 0;
		}

		::v-deep .xls-field__label {
			font-weight: 700;
			color: #333;
			font-size: 28rpx;
		}
	}
</style>
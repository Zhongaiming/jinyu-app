<template>
	<!-- 派发福利 -->
	<u-popup :show="partWelfare" :round="20" mode="center">
		<div class="part-welfare">
			<div class="member-dialog-title">派福利给会员</div>
			<div class="member-dialog-card-content">
				<van-field v-model="welfareForm.operationCurrency" label="送游戏币" type="digit" placeholder="请输入数量(选填)"
					style="padding: 10px 0">
					<template #extra>
						<span>个</span>
					</template>
				</van-field>
				<van-field v-model="welfareForm.operationBalance" label="送会员余额" type="number" placeholder="请输入金额(选填)"
					style="padding: 10px 0">
					<template #extra>
						<span>元</span>
					</template>
				</van-field>
				<van-field label="备注" style="padding: 10px 0" disabled />
				<van-field v-model="welfareForm.operationRemark" rows="2" autosize type="textarea" maxlength="20"
					placeholder="请输入备注信息" show-word-limit style="background: #fafafa; border: 1px solid #ebebeb" />
			</div>
			<div class="member-dialog-button-group">
				<div class="btn" @click="partWelfare = false">取消</div>
				<div class="btn btn-last-child" @click="confirmWelfare">确定</div>
			</div>
		</div>
	</u-popup>
</template>

<script>
</script>

<style lang="scss" scoped>
	// 派发福利
	.part-welfare {
		padding: 20px;
		width: 280px;

		.member-dialog-title {
			color: #333;
			font-size: 17px;
			font-weight: 700;
			text-align: center;
		}

		.member-dialog-button-group {
			display: flex;
			align-items: center;

			.btn {
				font-size: 16px;
				font-weight: 400;
				border-radius: 8px;
				height: 44px;
				flex: 1;
				border: none;
				background: #f5f5f5;
				color: #333;
				line-height: 44px;
				text-align: center;
			}

			.btn-last-child {
				background: #5241ff;
				color: #fff;
				margin-left: 8px;
			}
		}

		.member-dialog-card-content {
			padding: 12px 0;
		}

		::v-deep .van-field__label {
			font-weight: 700;
			color: #333;
			font-size: 14px;
		}
	}
</style>
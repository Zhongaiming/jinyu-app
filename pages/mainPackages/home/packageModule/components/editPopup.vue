<template>
	<u-popup :show="editPopup" :round="20" mode="center">
		<view class="edit-content home-family">
			<view class="popup-title">套餐{{ operType }}</view>
			<slot></slot>
			<view class="btn-wrapper">
				<view class="btn cancel-btn" @click="editPopup = !editPopup">取消</view>
				<view class="btn" @click="confirmOper">确定</view>
			</view>
		</view>
	</u-popup>
</template>

<script>
	export default {
		props: ["confirmOper"],
		data() {
			return {
				editPopup: false,
				operType: "编辑",
			};
		},
		methods: {
			showPopup(type) {
				this.editPopup = true;
				if (type == "add") {
					this.operType = "添加";
				} else if (type == "all") {
					this.operType = "批量设置";
				} else {
					this.operType = "编辑";
				}
			},
			showYlc(type) {
				this.editPopup = true;
				if (type == "add") {
					this.operType = "添加";
				} else if (type == "all") {
					this.operType = "批量设置";
				} else {
					this.operType = "编辑";
				}
			},
			hiddenPopup() {
				this.editPopup = false;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.edit-content {
		width: 290px;

		.popup-title {
			color: #262626;
			font-size: 19px;
			font-weight: 700;
			margin-top: 20px;
			text-align: center;
		}

		.btn-wrapper {
			border-top: 1px solid #e6e6e6;
			display: flex;
			box-sizing: border-box;
			font-size: 18px;

			.btn {
				flex: 1;
				line-height: 50px;
				text-align: center;
				box-sizing: border-box;
				color: #5241FF;
			}

			.cancel-btn {
				border-right: 1px solid #e6e6e6;
				color: #595959;
			}
		}
	}
</style>
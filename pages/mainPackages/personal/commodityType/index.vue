<template>
	<view class="xls-commodity-type">
		<jy-navbar title="商品类型管理" bgColor="#f5f6f7"></jy-navbar>
		<u-list @scrolltolower="scrolltolower" class="xls-list">
			<u-list-item v-for="(item, index) in dataList" :key="index" class="xls-list-item">
				<u-row>
					<u-col span="7">
						<view class="text-box">
							<view class="name">{{ item.name }}</view>
							<view class="remark">{{ item.remark }}</view>
						</view>
					</u-col>

					<u-col span="5">
						<view class="button-box">
							<view class="btn" v-hasPermi="['app:shopType:index:edit']" @click="editComtype(item)">
								编辑
							</view>
							<view class="btn" v-hasPermi="['app:shopType:index:delete']" @click="deleteComtype(item)">
								删除
							</view>
						</view>
					</u-col>
				</u-row>
			</u-list-item>
			<u-divider text="已经到底啦~" :dashed="true" text-size="28"></u-divider>
		</u-list>
		<view class="xls-bottom-btn-box" v-hasPermi="['app:shopType:index:add']">
			<view class="icon-button-style">
				<image :src="`${$baseUrl}appV4/common/add-icon.png`" alt="" mode="widthFix" class="image">
					<view>新建类型</view>
			</view>
		</view>
		<!-- 弹出层 -->
		<u-popup :show="variablePopup" :round="10" mode="center">
			<view class="xls-popup">
				<view class="title">分类编辑</view>
				<view class="popup-content">
					<view class="mian-content">
						<view class="nth-txt">商品类型</view>
						<view class="top-input">
							<input type="text" placeholder="请输入商品类型" v-model="actionItems.name" ref="inputTitle" />
						</view>
						<view class="nth-txt">备注</view>
						<view class="bottom-input">
							<input type="text" placeholder="非必填项,长度控制在15字内" v-model="actionItems.remark" />
						</view>
					</view>
				</view>
				<view class="footer">
					<view class="txtBox" @click="cancel">取消</view>
					<view class="txtBox footer-two" @click="sureAdd">确认</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList: [{
					"id": 212,
					"name": "批量导入",
					"wight": 1,
					"createType": 1,
					"commercialNumber": "ZTWL_20220617111542006",
					"remark": "批量导入自动创建",
					"createId": 18,
					"createTime": "2024-02-28 15:42:15",
					"updateId": 1,
					"updateTime": "2024-02-29 16:57:12"
				}, {
					"id": 212,
					"name": "批量导入",
					"wight": 1,
					"createType": 1,
					"commercialNumber": "ZTWL_20220617111542006",
					"remark": "批量导入自动创建",
					"createId": 18,
					"createTime": "2024-02-28 15:42:15",
					"updateId": 1,
					"updateTime": "2024-02-29 16:57:12"
				}],
				variablePopup: true,
				actionItems: {}
			}
		},
		methods: {
			scrolltolower() {

			}
		}
	}
</script>

<style lang="scss" scoped>
	.xls-commodity-type {
		background: #f6f6f6;
		padding-bottom: 160rpx;

		.xls-list {
			&-item {
				height: 160rpx;
				padding: 24rpx;
				background: #fff;
				border-bottom: #e6e6e6 1px solid;

				.text-box {

					.name {
						height: 60rpx;
						width: 100%;
						font-size: 32rpx;
					}

					.remark {
						height: 50rpx;
						width: 100%;
						font-size: 28rpx;
						color: #a09d9d;
					}
				}

				.button-box {
					display: flex;
					justify-content: flex-end;
					padding-bottom: 50rpx;

					.btn {
						width: 120rpx;
						padding: 4rpx 0;
						border: #e6e6e6 2rpx solid;
						font-size: 26rpx;
						border-radius: 10rpx;
						text-align: center;
						color: #9b9898;
					}

					.btn:not(:first-child) {
						margin-left: 24rpx;
					}
				}
			}
		}

		.xls-bottom-btn-box {
			padding: 20rpx;
			width: 100%;
			background: #fff;
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			box-sizing: border-box;

			.icon-button-style {
				line-height: 92rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				background: #5241FF;
				border-radius: 12rpx;
				font-size: 32rpx;
				color: #fff;

				.image {
					width: 44rpx;
					margin-right: 12rpx;
				}
			}
		}

		.xls-popup {
			width: 540rpx;
			height: 560rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.title {
				width: 100%;
				margin-top: 40rpx;
				text-align: center;
				font-size: 38rpx;
				font-weight: 700;
			}

			.popup-content {
				width: 100%;
				height: 496rpx;
				display: flex;
				justify-content: center;
				align-items: center;

				.mian-content {
					width: 460rpx;
					height: 322.62rpx;

					.nth-txt {
						width: 100%;
						height: 37.2rpx;
						font-size: 28rpx;
						color: #7e7878;
						margin-bottom: 12rpx;
					}

					.top-input {
						width: 100%;
						height: 106rpx;

						input {
							height: 70%;
							width: 96%;
							border: 2rpx #e6e6e6 solid;
							border-radius: 12rpx;
							font-size: 32rpx;
							color: #000;

							box-sizing: border-box;
							padding-left: 20rpx;
						}

						input[type="text"]::-webkit-input-placeholder {
							color: #7e7878;
							font-size: 32rpx;
							box-sizing: border-box;
						}
					}

					.bottom-input {
						width: 100%;
						height: 142rpx;
						border-color: #e6e6e6;

						input {
							height: 70%;
							width: 96%;
							border: 2rpx #e6e6e6 solid;
							border-radius: 12rpx;
							font-size: 32rpx;
							color: #000;

							box-sizing: border-box;
							padding-left: 20rpx;
						}

						input[type="text"]::-webkit-input-placeholder {
							color: #7e7878;
							font-size: 32rpx;
						}
					}
				}
			}

			.footer {
				height: 100rpx;
				width: 100%;
				border-top: 2rpx #e6e6e6 solid;
				display: flex;

				.footer-two {
					color: #5241FF;
					border-left: 2rpx #e6e6e6 solid;
				}

				.txtBox {
					flex: 1;
					height: 100rpx;
					width: 50%;
					font-size: 34rpx;

					text-align: center;
					line-height: 100rpx;
				}
			}
		}
	}
</style>
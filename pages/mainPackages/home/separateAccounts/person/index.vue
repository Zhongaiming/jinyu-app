<template>
	<z-paging ref="sPersonPaging" v-model="dataList" @query="queryList">
		<view slot="top">
			<xls-jy-navbar title="分成人员管理"></xls-jy-navbar>
			<xls-search placeholder="输入名字/电话搜索" marLeft="-6.5em" @confirm="searchMethod"></xls-search>
			<view class="top-wrapper">
				<view class="title-name">
					分成人员管理<u-icon name="question-circle" size="36" color="#797979" class="icon" @click="questionTips" />
				</view>
				<view class="add-person-btn" @click="openPopup">
					+ 添加人员
				</view>
			</view>
		</view>

		<view class="person-item" v-for="(people, index) in dataList" :key="index">
			<view class="row">
				<view class="flex-left">
					<span class="name">{{ people.nickName }}</span>
					<span class="tel">({{ people.username }})</span>
				</view>
				<span class="s-del-btn" @click="deletePerson(people.id)">删除</span>
			</view>
			<view class="row">
				<view class="flex">
					<span class="name">商户号</span>
				</view>
				<view class="right-number text-over">
					{{ people.accountCommercialNumber }}
				</view>
			</view>
			<view class="row">
				<view class="flex">
					<span class="name">分账账号(E码)</span>
				</view>
				<view class="right-number text-over">{{ people.accountNumber }}</view>
			</view>
			<view class="row">
				<view class="flex-left">
					<span class="name">分成场地</span>
				</view>
				<view class="right-txt" @click="readPersonPlace(people.id)">
					{{ people.placeNum || 0}}个<u-icon name="arrow-right" size="36" color="#999" />
				</view>
			</view>
		</view>
		<xls-empty slot="empty"></xls-empty>

		<!-- 查找分账人 -->
		<u-popup :show="pickerPerson" round="20" mode="center">
			<view class="picker-person">
				<view class="title-name">添加分成人员</view>
				<view class="info-panel">
					<view class="ipt-title"><span class="red-tips">*</span>手机号码</view>
					<view class="search-box">
						<input maxlength="11" class="input" type="tel" placeholder="请输入手机号" v-model="personPhone" />
						<view class="search-btn" @click="checkPerson">查询</view>
					</view>
				</view>
				<view class="person-info" v-show="person.nickName">
					<text>* 温馨提示：</text>
					<text class="txt">确定添加姓名为：<span style="color: #5241ff">{{ person.nickName }}</span>
						手机号码为：<span style="color: #5241ff">{{
		          person.userPhone
		        }}</span>
						的用户为分账人吗？
					</text>
				</view>
				<view class="bom-btn-panel">
					<view class="btn cancel-btn" @click="pickerPerson = false">
						取消
					</view>
					<view class="btn s-save-btn" @click="addPerson">确定</view>
				</view>
			</view>
		</u-popup>

	</z-paging>
</template>

<script>
	import {
		separateController
	} from '@/api/index.js';
	export default {
		data() {
			return {
				pickerPerson: false,
				personPhone: "",
				person: {
					appMerchantCode: "",
					nickName: "",
					userPhone: "",
					username: "",
				},
				dataList: [],
			}
		},
		methods: {
			searchMethod() {

			},
			queryList(pageNo, pageSize) {
				separateController.getSeparatePerson({
					pageParam: {
						pageNum: pageNo,
						pageSize: pageSize
					}
				}).then(res => {
					this.$refs.sPersonPaging.complete(res.data.dataList);
				})
			},
			questionTips() {
				this.$model("添加分成人员后，需绑定银行卡。银行卡绑定成功以后，才能给该分成人员设置分成场地和分成比例。", {
						confirmText: "我知道了",
					})
					.then(() => {});
			},
			//删除
			deletePerson(id) {
				this.$modal("删除后，该分成人员绑定的分账信息也会同步删除，确定要删除该人员吗？", {
						confirmText: "删除",
						confirmColor: "#f73e3e",
					})
					.then(() => {
						separateController.deleteSeparatePerson({
								id
							})
							.then((res) => {
								if (res.code == 200) {
									this.$toast("删除成功");
									this.$refs.sPersonPaging.reload();
								}
							})
							.catch(() => {});
					})
					.catch(() => {});
			},
			async checkPerson() {
				if (!this.personPhone) {
					return this.$toast("请填写查询手机号~");
				} else if (this.personPhone.length != 11) {
					return this.$toast("请填写正确的手机号~");
				}
				let res = await separateController.getUserInfoByPhone({
					phone: this.personPhone
				});
				if (res.code == 200) {
					if (res.data != "UN_AUTH_MERCHANT_TO_REG" && res.data != "") {
						this.person = res.data;
					}
				} else {
					return this.$toast("查无此人");
				}
			},
			openPopup() {
				this.personPhone = ""
				this.person = {
					appMerchantCode: "",
					nickName: "",
					userPhone: "",
					username: "",
				}
				this.pickerPerson = true
			},
			async addPerson() {
				if (
					!this.person.username ||
					!this.person.nickName ||
					!this.person.appMerchantCode
				) {
					return this.$toast("请确保信息完整后再添加~");
				}
				let res = await separateController.addSeparatePerson({
					dto: {
						username: this.person.username, //分账人登录用户名
						nickName: this.person.nickName, //名称
						channel: "QF", //分账渠道;（趣付: QF，合利宝: HLB，汇付: HF，乐刷: LS
						accountNumber: this.person.appMerchantCode, //分账账号（趣付号）
					}
				});
				if (res.code == 200) {
					this.pickerPerson = false;
					this.$toast("添加成功");
					this.$refs.sPersonPaging.reload();
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top-wrapper {
		padding: 0 20rpx;
		display: flex;
		font-size: 30rpx;
		line-height: 80rpx;

		.title-name {
			flex: 1;
			display: flex;
			align-items: center;

			.icon {
				margin-left: 10rpx;
			}
		}

		.add-person-btn {
			color: #5241ff;
		}
	}

	.person-item {
		padding: 0 20rpx;
		margin-bottom: 20rpx;
		border-bottom: 2rpx solid #ebeceb;
		background-color: #fff;

		.row {
			line-height: 90rpx;
			position: relative;
			display: flex;
		}

		.row:not(:last-child) {
			border-bottom: 2rpx solid #f5f6f7;
		}

		.flex-left {
			flex: 1;
			margin-right: 20rpx;
			display: flex;
			align-items: center;
		}

		.s-del-btn {
			width: 108rpx;
			height: 56rpx;
			text-align: center;
			line-height: 56rpx;
			border: 2rpx solid #d0d0d0;
			margin: 16rpx 0;
			border-radius: 8rpx;
			-webkit-border-radius: 8rpx;
		}

		.name {
			font-weight: 500;
			display: inline-block;
			height: 100%;
			vertical-align: middle;
			max-width: 300rpx;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			margin-right: 10rpx;
		}

		.tel {
			color: #999;
			font-size: 24rpx;
		}

		.right-txt {
			display: flex;
			align-items: center;
			max-width: 300rpx;
		}

		.right-number {
			flex: 1;
			text-align: right;
		}
	}

	.picker-person {
		width: 640rpx;
		box-sizing: border-box;

		.title-name {
			color: #1b1b1b;
			margin-top: 30rpx;
			margin-bottom: 40rpx;
			text-align: center;
			font-size: 36rpx;
			font-weight: 700;
		}

		.bom-btn-panel {
			border-top: 2rpx solid #dedede;
			display: flex;
			text-align: center;

			.btn {
				font-size: 32rpx;
				flex: 1;
				line-height: 100rpx;
				color: #676767;
			}

			.s-save-btn {
				color: #5241ff;
				border-left: 2rpx solid #dedede;
			}
		}

		.info-panel {
			padding: 0 24rpx 24px;

			.ipt-title {
				font-weight: 700;
				margin-bottom: 20rpx;
			}

			.red-tips {
				color: red;
				margin-right: 10rpx;
			}

			.search-box {
				display: flex;
				align-items: center;
				padding-left: 40rpx;
				width: 100%;
				box-sizing: border-box;

				.input {
					font-size: 30rpx;
					flex: 1;
					padding: 10rpx 20rpx;
					margin: 0 16rpx;
					border: 2rpx solid #d0d0d0;
					margin-bottom: 0;
					border-radius: 6rpx;
					line-height: 80rpx;
					height: 80rpx;
					outline: 0;
					background-color: #fff;
					appearance: none;
					box-sizing: border-box;
				}

				.search-btn {
					padding: 10rpx 20rpx;
					background: #5241ff;
					color: #fff;
					font-size: 28rpx;
					border-radius: 8rpx;
					white-space: nowrap;
				}

				.search-btn:active {
					opacity: 0.7;
				}
			}
		}

		.person-info {
			padding: 0 24rpx 48rpx;
			color: #8c8c8c;
			font-size: 28rpx;

			.txt {
				padding-left: 40rpx;
				text-align: center;
			}
		}
	}
</style>
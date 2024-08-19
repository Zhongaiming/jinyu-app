<template>
	<z-paging ref="paging" v-model="dataList" @query="queryList">
		<view class="page-top-wrapper" slot="top">
			<xls-jy-navbar title="场地配置信息管理"></xls-jy-navbar>
			<view class="tab-wrapper">
				<u-subsection :list="list" :current="current" activeColor="#5241ff" keyName="name" fontSize="28"
					@change="changeTabMethod" mode="subsection">
				</u-subsection>
			</view>
		</view>

		<view class="xls-list">
			<view v-for="(item, index) in dataList" :key="index" class="xls-list-item">
				<u-row>
					<u-col span="7">
						<view class="text-box">
							<view class="name">{{ item.name }}</view>
							<view class="remark">{{ item.remark }}</view>
						</view>
					</u-col>

					<u-col span="5">
						<view class="button-box">
							<view class="btn" v-hasPermi="['app:shopType:index:edit']" @click="operateMethod(item)">
								编辑
							</view>
							<view class="btn" v-hasPermi="['app:shopType:index:delete']" @click="deleteMethod(item.id)">
								删除
							</view>
						</view>
					</u-col>
				</u-row>
			</view>
		</view>
		<xls-empty slot="empty" />
		<xls-p-botn slot="bottom" :text="`新建${list[current].name}`" @operateMethod="operateMethod"></xls-p-botn>
		<!-- 弹出层 -->
		<u-popup :show="variablePopup" :round="10" mode="center">
			<view class="xls-popup">
				<view class="title">{{ title }}</view>
				<view class="popup-content">
					<view class="mian-content">
						<view class="nth-txt">{{ `商品${list[current].name}` }}</view>
						<view class="top-input">
							<input type="text" placeholder="请输入" v-model="operate.name" ref="inputTitle" />
						</view>
						<view class="nth-txt">备注</view>
						<view class="bottom-input">
							<input type="text" placeholder="非必填项,长度控制在15字内" v-model="operate.remark" />
						</view>
					</view>
				</view>
				<view class="footer">
					<view class="txtBox" @click="cancel">取消</view>
					<view class="txtBox footer-two" @click="confirm">确认</view>
				</view>
			</view>
		</u-popup>

	</z-paging>
</template>

<script>
	import xlsPBotn from "./components/xls-pBotn";
	import {
		placeController
	} from "@/api/index.js";
	export default {
		components: {
			xlsPBotn,
		},
		data() {
			return {
				dataList: [],
				variablePopup: false,
				operate: {},
				operateType: 'addPlace',
				title: '添加区域',
				current: 0,
				searchValue: "",
				list: [{
						name: "区域",
						value: "Area"
					},
					{
						name: "分类",
						value: "Classify"
					},
					{
						name: "组别",
						value: "Group"
					},
				],
			}
		},
		methods: {
			changeTabMethod(index) {
				this.current = index;
				this.$refs.paging.reload();
			},
			queryList(pageNo, pageSize) {
				placeController[`getPlace${this.list[this.current].value}`]({
					page: pageNo,
					size: pageSize,
					// name: this.searchValue
				}).then(res => {
					this.$refs.paging.complete(res.data);
				})
			},
			async operateMethod(type) {
				if (type === 'add') {
					this.operateType = 'addPlace'
					this.title = `添加${this.list[this.current].name}`
					this.operate = {
						name: "",
						remark: ""
					}
					this.variablePopup = true;
					return
				}
				Object.assign(this.operate, type);
				this.title = `编辑${this.list[this.current].name}`
				this.operateType = 'updatePlace';
				this.variablePopup = true;
				// await placeController[`get${this.list[this.current].value}View`]({
				// 	id: type
				// }).then(res => {
				// 	if (res.code === 200) {
				// 		this.operate = res.data;
				// 		this.title = `编辑${this.list[this.current].name}`
				// 		this.operateType = 'update';
				// 		this.variablePopup = true;
				// 	}
				// })

			},
			cancel() {
				this.variablePopup = false;
			},
			confirm() {
				if (!this.operate.name) {
					return this.$toast("请填写~")
				}
				placeController[`${this.operateType}${this.list[this.current].value}`](this.operate).then(res => {
					if (res.code === 200) {
						this.cancel();
						this.$refs.paging.reload();
					}
				})
			},
			deleteMethod(id) {
				this.$modal(`确定要删除${this.list[this.current].name}吗？`, {
					title: `删除${this.list[this.current].name}`,
					confirmText: "删除"
				}).then(() => {
					placeController[`delete${this.list[this.current].value}`]({
						id
					}).then(res => {
						if (res.code === 200) {
							this.$refs.paging.reload();
						}
					})
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.page-top-wrapper {
		.tab-wrapper {
			padding: 16rpx 24rpx;
		}
	}

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
</style>
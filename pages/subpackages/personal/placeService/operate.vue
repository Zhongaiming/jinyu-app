<template>
	<view class="setServiceDetail">
		<xls-jy-navbar :title="`${operTypeName}客服`"></xls-jy-navbar>
		<view class="cs-wechat-set">
			<view class="cs-name">
				<span class="name"><span style="color: rgb(255, 71, 71); margin-right: 0.08rem">*</span>客服名称</span>
				<view class="sub">提示:限8个字符</view>
				<view class="input-wrapper">
					<input type="text" placeholder="输入客服名称，如：平台客服微信" maxlength="8" v-model="serviceMsg.name"
						class="input" />
				</view>
			</view>
			<view class="cs-name padding-top">
				<span class="name"><span style="color: rgb(255, 71, 71); margin-right: 0.08rem">*</span>客服手机号</span>
				<view class="input-wrapper">
					<input type="text" placeholder="请输入客服手机号" v-model="serviceMsg.phone" class="input" />
				</view>
			</view>
			<view class="cs-name padding-top">
				<span class="name"><span style="color: rgb(255, 71, 71); margin-right: 0.08rem">*</span>客服二维码</span>
				<view class="sub">提示:文件小于200kb</view>
				<view class="uploader">
					<u-upload :previewFullImage="true" :fileList="image.qrCodeList" name="qrCode" @afterRead="afterRead"
						@delete="deletePic" :maxCount="1" width="160" height="160"></u-upload>
					<view class="descript">
						<view class="header" @click="examplePopup = !examplePopup">
							[ 规范样例 ]
						</view>
						<view class="content">
							注意：图片只能包含着正方形的二维码，不能有其它信息或空白，请参考规范样例。
						</view>
					</view>
				</view>
			</view>
			<view class="cs-name switch" style="border-top: 1rpx solid #f5f5f5">
				<span class="name"><span style="color: rgb(255, 71, 71); margin-right: 0.08rem">*</span>默认客服</span>
				<view class="switch-btn">
					<u-switch v-model="defaultSwitch" active-color="#5241FF" size="50" />
				</view>
			</view>
		</view>

		<view class="footer-btn">
			<view class="inline-flex" @click="showPreview">
				<image :src="`${$baseUrl}appV4/common/eye-o.png`" alt="" class="image eye-o" mode="widthFix" />
				<view class="text">预览效果</view>
			</view>
			<view class="inline-flex left" @click="clearEnter">
				<image :src="`${$baseUrl}appV4/common/brush-o.png`" alt="" class="image" mode="widthFix" />
				<view class="text">清除设置</view>
			</view>
			<view class="btn" @click="comfirmOpertion">
				<view class="ft-btn">保存</view>
			</view>
		</view>
		<transition name="transition" mode="out-in">
			<view class="example-popup" v-show="examplePopup">
				<view class="content">
					<p>规范的二维码图片</p>
					<image :src="`${$baseUrl}appV4/service/example.png`" alt="" mode="widthFix" />
				</view>
				<u-icon name="close" color="#fff" size="38" class="close-icon" @click="examplePopup = !examplePopup" />
			</view>
		</transition>
		<u-popup :show="previewService" mode="bottom">
			<view class="previewService">
				<view class="modal-header">
					<view class="text">客服预览</view>
					<span class="close-btn" @click="previewService = false">关闭</span>
				</view>
				<view class="view-main">
					<p>{{ serviceMsg.name }}</p>
					<image :src="serviceMsg.qrCode" alt="" class="image" mode="widthFix" />
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		uploadFilePromise
	} from "@/common/upload.js";
	import {
		placeController
	} from "@/api/index.js";
	export default {
		data() {
			return {
				operTypeName: "添加",
				image: {
					qrCodeList: [],
				},
				defaultSwitch: true,
				serviceMsg: {
					id: null,
					name: "",
					phone: "",
					qrCode: "",
					defaultCustomerService: 0,
				},
				previewService: false,
				examplePopup: false,
			};
		},
		onLoad(option) {
			let params = {};
			if (option.params) {
				params = JSON.parse(option.params);
			}
			this.startMethod(params);
		},
		methods: {
			startMethod(params) {
				Object.assign(this.serviceMsg, params);
				this.operTypeName = params.id ? "编辑" : "添加";
				this.defaultSwitch = this.serviceMsg.defaultCustomerService == 1;
				if (params.qrCode) {
					this.image.qrCodeList = this.updateList(this.image.qrCodeList, params.qrCode);
				}
			},
			updateList(list, url) {
				list = [];
				list.push({
					status: 'success', // uploading
					message: '上传成功', // 上传中
					url
				});
				return list;
			},
			async afterRead(event) {
				const {
					file,
					index,
					name
				} = event;
				this.image[`${name}List`].push({
					...file,
					status: 'uploading',
					message: '上传中'
				})
				let res = await uploadFilePromise(file)
				this.image[`${name}List`] = []
				this.image[`${name}List`].push({
					status: 'success',
					message: '上传成功',
					url: res.data.downloadUri
				})
				this.serviceMsg[`${name}`] = res.data.downloadUri;

			},
			deletePic(event) {
				const {
					file,
					index,
					name
				} = event;
				this.image[`${name}List`].splice(index, 1);
				this.serviceMsg[`${name}`] = "";
			},
			async comfirmOpertion() {
				let params = {
					id: this.serviceMsg.id,
					name: this.serviceMsg.name,
					phone: this.serviceMsg.phone,
					qrCode: this.serviceMsg.qrCode,
					defaultCustomerService: this.defaultSwitch ? 1 : 0,
				}
				if (params.id) {
					let res = await placeController.editStaff(params);
					if (res.code == 200) {
						this.$toast("编辑成功");
						this.$goBack();
					}
				} else {
					let res = await placeController.addStaff(params);
					if (res.code == 200) {
						this.$toast("添加成功");
						this.$goBack();
					}
				}
			},
			//清除
			clearEnter() {
				this.$modal("确定要清除输入吗？", {
						confirmButtonText: "删除",
						confirmButtonColor: "#f73e3e",
					})
					.then(() => {
						let msg = {
							name: "",
							phone: "",
							qrCode: "",
							defaultCustomerService: 0,
						};
						Object.assign(this.serviceMsg, msg);
						this.image.qrCodeList = [];
						this.defaultSwitch = false;
					})
					.catch(() => {});
			},
			showPreview() {
				if (!this.serviceMsg.name) {
					return this.$toast("请输入客服名称");
				}
				if (!this.serviceMsg.qrCode) {
					return this.$toast("请上传客服微信二维码");
				}
				this.previewService = !this.previewService;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.cs-wechat-set {
		padding: 24rpx 0rpx 10rpx;
		border-radius: 0 0 24rpx 24rpx;
		background: #fff;
		border-top: 1rpx dashed #e8e9eb;

		.cs-name {
			border-radius: 12rpx;
			padding: 20rpx;

			.name {
				font-size: 28rpx;
				color: #333;
			}

			.sub {
				color: #999;
				font-size: 24rpx;
				margin-top: 8rpx;
			}

			.input-wrapper {
				border-bottom: 1rpx solid #f5f5f5;
				margin-top: 22rpx;
				padding-bottom: 22rpx;

				.input {
					color: #333;
					font-family: PingFang SC;
					font-size: 32rpx;
					height: 44rpx;
					line-height: 44rpx;
					padding: 0 16rpx;
					box-sizing: border-box;
					border: 0;
					width: 100%;
				}
			}
		}

		.padding-top {
			padding-top: 0;
		}

		.switch {
			display: flex;
			align-items: center;

			.switch-btn {
				flex: 1;
				display: flex;
				justify-content: flex-end;
			}
		}

		.uploader {
			display: flex;
			align-items: center;
			margin-top: 16rpx;

			.uploader {
				flex: 1;
			}

			.descript {
				background: rgba(230, 247, 255, 0.56);
				border-radius: 16rpx 16rpx 16rpx 0;
				margin-left: 24rpx;
				padding: 24rpx;
				width: 440rpx;

				.header {
					color: #5241ff;
					font-family: PingFang SC;
					font-size: 26rpx;
				}

				.content {
					color: #333;
					font-family: PingFang SC;
					font-size: 26rpx;
					margin-top: 16rpx;
				}
			}
		}
	}

	.footer-btn {
		align-items: center;
		background: #fff;
		border-top: 1rpx solid #ebebeb;
		bottom: 0;
		display: flex;
		left: 0;
		padding: 16rpx 24rpx;
		position: fixed;
		box-sizing: border-box;
		width: 100%;

		.inline-flex {
			align-items: center;
			display: inline-flex;
			flex-direction: column;

			.image {
				width: 48rpx;
			}

			.eye-o {
				width: 60rpx;
				margin-bottom: 8rpx;
			}

			.text {
				color: #333;
				font-family: PingFang SC;
				font-size: 22rpx;
				margin-top: 8rpx;
			}
		}

		.left {
			padding: 0 24rpx;
		}

		.brush-o {
			transform: rotate(180deg);
		}

		.btn {
			display: flex;
			flex: 1;
			justify-content: flex-end;
		}

		.ft-btn {
			background: #5241ff;
			border-radius: 16rpx;
			color: #fff;
			font-size: 32rpx;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			width: 440rpx;
		}
	}

	.previewService {
		width: 100%;
		display: flex;
		flex-direction: column;

		.modal-header {
			align-items: center;
			background: #fff;
			border-bottom: 1rpx solid #e6e6e6;
			display: flex;
			height: 90rpx;
			padding: 0 20rpx;
			font-size: 30rpx;
			position: relative;
			justify-content: flex-end;

			.text {
				color: #000;
				font-size: 34rpx;
				left: 50%;
				position: absolute;
				top: 50%;
				transform: translate(-50%, -50%);
			}

			.close-btn {
				color: #5241ff;
			}
		}

		.view-main {
			padding: 120rpx 0 100rpx;
			background: #f5f6f7;
			align-items: center;
			display: flex;
			flex-direction: column;
			justify-content: center;
			font-size: 30rpx;

			.image {
				width: 384rpx;
				margin-top: 24rpx;
			}
		}
	}

	.example-popup {
		height: 100vh;
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.5);
		@include center-flex();

		.content {
			align-items: center;
			background: #fff;
			border-radius: 24rpx;
			display: flex;
			flex-direction: column;
			font-size: 40rpx;
			padding: 40rpx 0;
			width: 640rpx;
		}

		.image {
			width: 384rpx;
			margin-top: 24rpx;
		}

		.close-icon {
			position: absolute;
			bottom: 160rpx;
			left: 50%;
			transform: translateX(-50%);
		}
	}

	.transition-enter-active,
	.transition-leave-active {
		transition: all 0.3s linear;
	}

	.transition-enter,
	.transition-leave-active {
		transform: translate3d(0rpx, 100%, 0);
		opacity: 0;
	}
</style>
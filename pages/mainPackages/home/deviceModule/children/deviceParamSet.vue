<template>
	<view>
		<xls-jy-navbar title="设备参数"></xls-jy-navbar>
		<view class="ter-main-wrapper">
			<!-- 基础参数 -->
			<view v-for="(item, index) in basicParams" :key="index" class="ter-item-style" v-if="item.listVisible == 1"
				@click.stop="item.dataType == 1 ? '' : $refs.params.openSet(item)">
				{{ item.functionName }}
				<span class="text-style">
					<view v-if="item.dataType == 1" @click.stop="changeSwitch(item, index)" class="switch-basic-style"
						:class="{'switch-basic-open':item.bools.open == item.arr}">
						<view class="switch-node" :class="{'switch-node-open':item.bools.open == item.arr}">
						</view>
					</view>

					<span v-else>{{ dealWith(item) }}</span>
				</span>
			</view>
			<!-- 终端参数 -->
			<h5 class="mui-content-padded" v-if="terminalList.length">
				设备操作
			</h5>
			<view v-for="item in terminalList" :key="item.id" class="ter-item-style" @click="terminalSetParams(item)">
				{{ item.functionName }}
			</view>
		</view>
		
		<view class="btn-wrapper" v-if="basicParams.length">
			<view class="re-fresh" @click="refresh()">刷新</view>
			<view class="bottom-btn" @click="setParams()">保存设置</view>
		</view>
		<amend-param ref="params"></amend-param>
	</view>
</template>

<script>
	import cache from '@/common/cache.js';
	import {
		deviceController
	} from "@/api/index.js";
	import amendParam from "./components/amend-param.vue";
	import qs from "qs";
	
	export default {
		components: {
			amendParam
		},
		data() {
			return {
				basicParams: [],
				terminalList: [],
				uuid: "",
				loginId: "",
			};
		},
		async onLoad() {
			let option = cache.getCache("deviceLogin");
			if (option.uuid) {
				this.uuid = option.uuid;
				this.loginId = option.loginId;
			}
			// let params = qs.stringify({
			// 	productKey: "a1RrYPsjzAn",
			// 	// productKey: "a1eUldLZaNe",
			// 	imei: this.uuid,
			// });
			let params = {
				productKey: "a1RrYPsjzAn",
				// productKey: "a1eUldLZaNe",
				imei: this.uuid,
			};
			let res = await deviceController.queryParam(params);
			this.getBoardList();
			this.getTer();
		},
		methods: {
			//刷新
			refresh() {
				// this.$router.go(0);
			},
			//处理数据类型
			dealWith(item) {
				//  `data_type` int(11) DEFAULT NULL COMMENT '数据类型：1:布尔类型，2:整数型，3:浮点型，4:枚举型，5字符型',
				if (item.dataType == 1) {
					return item.arr;
				} else if (item.dataType == 2) {
					return `${item.arr}${item.ints ? item.ints.unit || "" : ""}`;
				} else if (item.dataType == 3) {
					return `${item.arr}${item.floats ? item.floats.unit || "" : ""}`;
				} else if (item.dataType == 4) {
					let obj = {};
					item.openParameterSetEnum.forEach((element) => {
						if (element.enumValueNumerical == item.arr) {
							obj = element;
						}
					});
					return obj.enumValueNumerical != null ?
						`${obj.enumValueDescribe}` :
						"无";
				} else if (item.dataType == 5) {
					// 字符型 0 GBK; 1 GB2312; 2 UTF-8; item.chars.encodingType
					return item.arr == 0 ? "GBK" : item.arr == 1 ? "GB2312" : "UTF-8";
				} else {
					return "未知类型";
				}
			},
			//终端
			async getTer() {
				let res = await deviceController.getTerminal({
					loginId: this.loginId
				});
				if (res.code == 200) {
					this.terminalList = res.data;
				}
			},
			//从redis获取基础参数数据
			async getBoardList() {
				let res = await deviceController.getRedisList({
					loginId: this.loginId,
					imei: this.uuid,
					cmd: "5",
				});
				if (res.code == 200) {
					this.basicParams = res.data.data;
				}
			},
			//布尔型
			changeSwitch(item, index) {
				if (item.disabled == 1) {
					return this.$toast("禁止修改~");
				}
				this.basicParams[index].arr =
					item.arr == item.bools.open ? item.bools.close : item.bools.open;
			},
			//设置保存自定义参数
			async setParams() {
				this.$modal("修改后将无法恢复，确定要保存修改吗？",{
						title: "温馨提示",
						confirmText: "保存",
						confirmColor: "#5241FF",
					})
					.then(() => {
						let array = [];
						this.basicParams.forEach((element) => {
							array.push(element.arr);
						});
						deviceController.sendCmd({
							cmd: "06" * 1, //基础 06 终端 53
							date: array,
							productKey: "a1RrYPsjzAn",
							// productKey: "a1eUldLZaNe",
							imei: this.uuid,
							loginId: this.loginId * 1,
						}).then((res) => {
							if (res.code == 200) {
								// this.$toast.clear();
								this.$modal("修改可能需要一点时间，请您稍后刷新查看最新设置~",{
									title: "修改成功",
									confirmText: "我知道了",
									confirmColor: "#5241FF",
									showCancel: false
								});
							}
						});
					})
					.catch(() => {});
			},
			//终端参数设置
			terminalSetParams(item) {
				if (item.parameterType == 1) {
					this.$goTo("/pages/mainPackages/home/deviceModule/children/paramSetDetail", "navigateTo", {
						id: item.id,
						cmd: item.queryCommand,
						uuid: this.uuid,
						set: item.setCommand,
					});
				} else {
					if (item.setDisabled == 1) {
						return this.$toast("已设置禁用");
					}
					this.$modal(`确定要 ${item.functionName} 吗？`,{
							title: "温馨提示",
							confirmColor: "#5241FF",
						})
						.then(() => {
							deviceController.updateValue({
								id: item.id,
								date: [],
								cmdVo: {
									imei: this.uuid,
									cmd: item.setCommand,
								},
							}).then((res) => {
								if (res.code == 200) {
									// this.$toast.clear();
									this.$modal("修改可能需要一点时间，请您稍后刷新查看最新设置~",{
										title: "修改成功",
										confirmText: "我知道了",
										confirmColor: "#5241FF",
										showCancel: false
									});
								}
							});
						})
						.catch(() => {});
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.ter-main-wrapper {
		.ter-item-style {
			border-bottom: 1px solid #e6e6e6;
			padding: 0px 15px;
			font-size: 16px;
			background: #fff;
			white-space: nowrap;
			text-overflow: ellipsis;
			min-height: 46px;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.text-style {
				color: rgba(0, 0, 0, 0.6);
				font-size: 14px;
			}

			.switch-basic-style {
				position: relative;
				display: inline-block;
				box-sizing: content-box;
				width: 2em;
				height: 1em;
				font-size: 30px;
				background-color: #fff;
				border: 1px solid rgba(0, 0, 0, 0.1);
				border-radius: 1em;
				cursor: pointer;
				-webkit-transition: background-color 0.3s;
				transition: background-color 0.3s;

				.switch-node {
					position: absolute;
					top: 0;
					left: 0;
					width: 1em;
					height: 1em;
					font-size: inherit;
					background-color: #fff;
					border-radius: 100%;
					box-shadow: 0 3px 1px 0 rgba(0, 0, 0, 0.05),
						0 2px 2px 0 rgba(0, 0, 0, 0.1), 0 3px 3px 0 rgba(0, 0, 0, 0.05);
					transition: transform 0.3s cubic-bezier(0.3, 1.05, 0.4, 1.05),
						-webkit-transform 0.3s cubic-bezier(0.3, 1.05, 0.4, 1.05);
				}
			}

			.switch-basic-open {
				background-color: #5241ff;
			}

			.switch-node-open {
				transform: translateX(1em);
			}
		}

		.mui-content-padded {
			color: #8c8c8c;
			font-size: 14px;
			font-weight: 400;
			margin: 10px;
		}
	}

	.btn-wrapper {
		position: fixed;
		background-color: #fff;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 44px;
		text-align: center;
		line-height: 44px;
		font-weight: 400;
		font-size: 16px;
		display: flex;

		.re-fresh {
			width: 90px;
			color: #5241ff;
		}

		.bottom-btn {
			flex: 1;
			background: #5241ff;
			color: #fff;
		}
	}
</style>
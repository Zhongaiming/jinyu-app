<template>
	<!-- 终端参数 -->
	<view class="terminal-params">
		<h5 class="mui-content-padded">{{ terParams.functionName }}</h5>
		<view v-for="(item, index) in terParams.openProjectVo" :key="index" class="ter-item-style"
			@click="item.dataType == 1 ? '' : $refs.params.openSet(item)" v-if="item.listVisible == 1">
			{{ item.functionName }}
			<span class="text-style">
				<view v-if="item.dataType == 1" @click.stop="changeSwitch(item, index)" class="switch-basic-style"
					:class="{'switch-basic-open':item.bools.open == item.arr}">
					<view class="switch-node" :class="{'switch-node-open':item.bools.open == item.arr}"></view>
				</view>
				<span v-else>{{ dealWith(item) }}</span>
			</span>
		</view>
		<view class="btn-wrapper" v-if="terParams.setDisabled == 0">
			<view class="re-fresh" @click="refresh()">刷新</view>
			<view class="bottom-btn" @click="setParams()">保存设置</view>
		</view>
		<amend-param ref="params"></amend-param>
	</view>
</template>

<script>
	import {
		deviceController
	} from "@/api/index.js";
	import amendParam from "./components/amend-param.vue";
	export default {
		components: {
			amendParam
		},
		data() {
			return {
				terParams: {
					functionName: "",
				},
				uuid: "861714055498251",
				cmd: "19",
				id: "52",
				set: "63",
			};
		},
		onLoad(option) {
			if (option.params) {
				const {id, uuid, cmd, set} = JSON.parse(option.params);
				this.id = id;
				this.uuid = uuid;
				this.cmd = cmd;
				this.set = set;
			}
			this.getParams();
		},
		methods: {
			refresh() {},
			//根据终端的id查询他的数据
			async getParams() {
				let msg = await deviceController.updateValue({
					id: this.id,
					date: null,
					cmdVo: {
						imei: this.uuid,
						cmd: this.cmd,
					},
				});
				let res = await deviceController.getRedisOne({
					imei: this.uuid, //设备编号
					id: this.id, //终端的id
					cmd: this.cmd,
				});
				if (res.code == 200) {
					this.terParams = res.data;
				}
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
			//布尔型
			changeSwitch(item, index) {
				if (item.disabled == 1) {
					return this.$toast("禁止修改~");
				}
				this.terParams.openProjectVo[index].arr =
					item.arr == item.bools.open ? item.bools.close : item.bools.open;
			},
			//设置自定义参数
			async setParams() {
				this.$modal("修改后将无法恢复，确定要保存修改吗？",{
						title: "温馨提示",
						confirmText: "保存",
						confirmColor: "#5241FF",
					})
					.then(() => {
						let array = [];
						this.terParams.openProjectVo.forEach((element) => {
							array.push(element.arr);
						});
						deviceController.updateValue({
							id: this.id,
							date: array,
							cmdVo: {
								imei: this.uuid,
								cmd: this.set,
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
			},
		},
	};
</script>

<style lang="scss" scoped>
	.terminal-params {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0px;
		background-color: #f5f6f7;
		z-index: 999;
		padding-bottom: 80px;
		box-sizing: border-box;
		overflow-y: scroll;
	}

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
			color: #000;
		}

		.bottom-btn {
			flex: 1;
			background: #09bb07;
			color: #fff;
		}
	}
</style>
<template>
	<view class="shj-classify">
		<nav-bar>商品分类设置</nav-bar>
		<view class="classify-wrapper">
			<view class="classify-switch-wrapper">
				<span>商品分类开启</span>
				<u-switch v-model="classifySwitch" size="24px" active-color="#5241FF" @change="handleUpdata" />
			</view>
			<view class="classify-item-p" v-for="(item, index) in typeList" :key="item.id">
				<view class="classify-item">
					<view class="classify-info">
						<span class="classify-index">{{ index + 1 }}</span>
						<span>{{ item.name }}</span>
					</view>
					<view class="handle-button-panel">
						<span class="edit-classify" @click="beforeEdit(item)">
							<u-icon name="edit" size="18" />编辑
						</span>
						<span class="edit-classify" @click="handleCommodity(item)">
							<u-icon name="expand-o" size="18" />关联商品
						</span>
						<span class="edit-classify" @click="handleDelete(item.id)">
							<u-icon name="clear" color="#D8D8D8" size="20" />
						</span>
					</view>
				</view>
				<view class="img-flex-list">
					<view class="img-flex-box" v-for="(rail, index) in item.typeList" :key="index">
						<xls-image :src="rail.commodityImg" alt="" class="goods-img" v-if="rail.commodityImg" />
						<xls-image :src="`${$baseUrl}/img/goods.png`" alt="" class="goods-img" v-else />
						<span>{{rail.commodityVendingMachineName}}</span>
					</view>
					<view class="null-text-c" v-show="!item.typeList.length">
						暂未关联商品
					</view>
				</view>
			</view>
		</view>
		<view class="goods-classify-footer">
			<view class="text-btn" @click="beforeAdd">添加商品分类</view>
		</view>
		<!-- 添加、编辑 -->
		<u-popup v-model="classifyPopup" round>
			<view class="dialog-title">{{ dataMsg.id ? "编辑" : "添加" }}商品分类</view>
			<view class="input-group">
				<view class="title">分类名称</view>
				<u-field v-model="dataMsg.name" placeholder="请输入分类名称" clearable class="input-style" />
				<view class="title">分类说明</view>
				<u-field v-model="dataMsg.remark" placeholder="非必填项，字数控制在20个字符内" maxlength="20" clearable
					class="input-style" />
			</view>
			<view class="handle-panel">
				<view class="handle-button" @click="classifyPopup = false">取消</view>
				<view class="handle-button save-button" @click="confirmMethed">保存</view>
			</view>
		</u-popup>
		<shj-commodity @getShjCommodity="getShjCommodity" ref="commodity" />
	</view>
</template>

<script>
	import {
		shjController
	} from '@/api/index.js';
	// import {
	// 	addType
	// } from "@/utils/api/commodity";
	// import ShjCommodity from "./components/shjCommodity.vue";
	export default {
		name: "shj-classify",
		components: {
			ShjCommodity
		},
		data() {
			return {
				classifySwitch: false,
				classifyPopup: false,
				dataMsg: {
					id: null,
					name: null,
					remark: null,
					createType: 6,
				},
				typeList: [],
				railCom: {
					vendingMachineIdList: [], //售货机商品表id
					deviceNumber: null,
					commodityTypeId: null, //商品类型id
				},
				business: {},
			};
		},
		// async created() {
		// 	if (this.$route.query.deviceNumber) {
		// 		this.getList();
		// 		this.getType();
		// 	}
		// },
		methods: {
			//查询
			async getType() {
				let deviceNumber = this.$route.query.deviceNumber;
				let res = await api.businessOne({
					deviceNumber
				});
				if (res.data.code == 0) {
					this.business = res.data.data;
					this.classifySwitch =
						this.business.commodityClassification == 1;
				}
			},
			//修改开关
			async handleUpdata() {
				this.business.commodityClassification = this.classifySwitch ?
					1 :
					0;
				let res = await api.updBusinessOne(this.business);
				if (res.data.code == 0) {
					this.$toast("操作成功~");
					this.getType();
				} else {
					this.classifySwitch = !this.classifySwitch;
				}
			},
			async getList() {
				let deviceNumber = this.$route.query.deviceNumber;
				let res = await api.vendingMachineList({
					deviceNumber
				});
				if (res.data.code == 0) {
					this.typeList = res.data.data;
				}
			},
			handleDelete(id) {
				this.$dialog
					.confirm({
						title: "温馨提示",
						message: "确定删除该分类吗？",
						confirmButtonText: "删除",
						confirmButtonColor: "#5241FF",
						width: 280,
					})
					.then(() => {
						let deviceNumber = this.$route.query.deviceNumber;
						api
							.delVendingMachineType({
								commodityTypeId: id,
								deviceNumber,
							})
							.then((res) => {
								if (res.data.code == 0) {
									this.getList();
									this.$toast("删除成功~");
								}
							});
					})
					.catch(() => {});
			},
			beforeAdd() {
				this.dataMsg = {
					name: null,
					remark: null,
					createType: 6,
				};
				this.classifyPopup = true;
			},
			beforeEdit(item) {
				this.dataMsg = {
					id: item.id,
					name: item.name,
					remark: item.remark,
				};
				this.classifyPopup = true;
			},
			confirmMethed() {
				if (!this.dataMsg.name) {
					return this.$toast("分类名称不能为空~");
				}
				if (this.dataMsg.id) {
					api.updVendingMachineType(this.dataMsg).then((res) => {
						if (res.data.code == 0) {
							this.getList();
							this.classifyPopup = false;
							this.$toast("编辑成功~");
						}
					});
				} else {
					addType(this.dataMsg).then((res) => {
						if (res.data.code == 0) {
							this.getList();
							this.classifyPopup = false;
							this.$toast("添加成功~");
						}
					});
				}
			},
			handleCommodity(item) {
				this.railCom.commodityTypeId = item.id;
				let arr = [];
				if (item.typeList.length) {
					item.typeList.forEach((element) => {
						arr.push(element.commodityVendingMachineId);
						if (arr.length == item.typeList.length) {
							this.$refs.commodity.showCommodity(arr);
						}
					});
				} else {
					this.$refs.commodity.showCommodity(arr);
				}
			},
			async getShjCommodity(arr) {
				this.railCom.vendingMachineIdList = arr;
				let deviceNumber = this.$route.query.deviceNumber;
				this.railCom.deviceNumber = deviceNumber;
				let res = await api.bindItems(this.railCom);
				if (res.data.code == 0) {
					this.getList();
					this.$toast("商品关联成功~");
				}
			},
		},
	};
</script>

<style lang="less" scoped>
	.shj-classify {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 999;
		background: #f5f6f7;
		height: 100vh;
		width: 100%;
		display: flex;
		flex-direction: column;

		.classify-wrapper {
			flex: 1;
			overflow-y: scroll;
			padding: 10px 12px 70px;

			.classify-switch-wrapper {
				padding: 10px;
				display: flex;
				font-size: 15px;
				align-items: center;
				justify-content: space-between;
				background-color: #fff;
				border-radius: 5px;
			}

			.classify-item-p {
				margin-top: 10px;
				background: #fff;
				padding: 0 10px;
				border-radius: 5px;

				.classify-item {
					padding: 10px 0;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.classify-info {
						color: #1a1a1a;
						font-size: 15px;
						line-height: 18px;
						max-width: 120px;
						display: flex;

						.classify-index {
							margin-right: 10px;
							width: 20px;
							height: 20px;
							border-radius: 10px;
							background-color: #f4f4f4;
							text-align: center;
							font-size: 14px;
							line-height: 20px;
							color: #4c4c4c;
						}
					}
				}

				.handle-button-panel {
					display: flex;
					align-items: center;
					font-size: 15px;

					.edit-classify {
						margin-left: 15px;
						color: #5241FF;
						display: flex;
						align-items: center;
					}
				}

				.img-flex-list {
					display: flex;
					flex-wrap: wrap;

					.img-flex-box {
						text-align: center;
						width: 24%;
						font-size: 12px;
						margin-bottom: 10px;
						margin-right: 1%;

						.goods-img {
							border-radius: 2px;
							width: 100%;
							height: 81px;
							margin-bottom: 3px;
							border: 1px solid #f5f5f5;
						}
					}

					.null-text-c {
						font-style: 15px;
						line-height: 26px;
					}
				}
			}
		}

		.goods-classify-footer {
			width: 100%;
			position: fixed;
			bottom: 0;
			left: 0;
			padding: 0 10px 10px;
			box-sizing: border-box;
			background-color: #f0eff5;
			z-index: 999;

			.text-btn {
				line-height: 45px;
				font-size: 16px;
				border-radius: 5px;
				width: 100%;
				color: #fff;
				background: #5241FF;
				text-align: center;
			}
		}

		// 添加 编辑
		.dialog-title {
			line-height: 46px;
			text-align: center;
			font-size: 18px;
			width: 310px;
		}

		.input-group {
			width: 280px;
			padding: 0 15px;
			font-size: 15px;

			.title {
				line-height: 28px;
			}

			.input-style {
				border: 1px solid rgba(0, 0, 0, 0.15);
				border-radius: 6px;
				margin-bottom: 20px;
			}
		}

		.handle-panel {
			display: flex;
			width: 310px;
			border-top: 1px solid #e5e5e5;
			align-items: center;

			.handle-button {
				line-height: 50px;
				text-align: center;
				font-size: 15px;
				flex: 1;
			}

			.save-button {
				border-left: 1px solid #e5e5e5;
				color: #5241FF;
			}
		}
	}
</style>
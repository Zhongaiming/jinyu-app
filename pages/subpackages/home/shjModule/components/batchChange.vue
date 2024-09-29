<template>
	<view>
		<!-- 货道编辑 -->
		<u-popup :show="railEdit" mode="bottom" @close="() => {
			cancel()
		}">
			<view class="edit-cargoroad">
				<view class="popup-header">
					<span @click="cancel">取消</span>
					<span class="popup-title">{{ title }}</span>
					<span @click="confirmSet">保存</span>
				</view>
				<!-- 全部 -->
				<view class="popup-content" v-if="railMsg.type == 1">
					<view class="edit-panel" @click="(railEdit = false), $refs.shjRail.openRailModule()">
						<span>货道选择</span>
						<span class="product-name" :style="{color:railMsg.railIds.length?'#5241FF':'#969799'}">
							{{railMsg.railIds.length?`已选择${railMsg.railIds.length}条货道`:"请选择货道"}}
						</span>
					</view>
					<view class="edit-panel" @click="(railEdit = false),$refs.commodity.openMethod()">
						<span>商品选择</span>
						<span class="product-name" :style="{color: commodityName == '请选择商品'?'#969799':'#5241FF' }">
							{{ commodityName }}
						</span>
					</view>
					<view class="edit-panel">
						<span>商品售卖价格</span>
						<view class="input-wrapper">
							<xls-field placeholder="请输入商品售卖价格" v-model="railMsg.price" type="number"
								input-align="right" />
						</view>
						<span>元/个</span>
					</view>
					<view class="edit-panel">
						<span>现有库存</span>
						<u-number-box v-model="railMsg.railRepertory" integer input-width="75px" button-size="40px"
							min="0" iconStyle="fontSize: 17px" />
					</view>
					<view class="edit-panel">
						<span>货道容量</span>
						<view class="input-wrapper">
							<xls-field v-model="railMsg.railCapacity" type="digit" placeholder="请输入货道容量"
								input-align="right" />
						</view>
					</view>
				</view>
				<view class="popup-content" v-else-if="railMsg.type == 2">
					<view class="edit-panel" @click="(railEdit = false), $refs.shjRail.openRailModule()">
						<span>货道选择</span>
						<span class="product-name" :style="{color:railMsg.railIds.length?'#5241FF':'#969799'}">
							{{railMsg.railIds.length?`已选择${railMsg.railIds.length}条货道`:"请选择货道"}}
						</span>
					</view>
					<view class="edit-panel">
						<span>商品售卖价格</span>
						<view class="input-wrapper">
							<xls-field placeholder="请输入商品售卖价格" v-model="railMsg.price" type="number"
								input-align="right" />
						</view>
						<span>元/个</span>
					</view>
				</view>
				<view class="popup-content" v-else-if="railMsg.type == 3">
					<view class="edit-panel" @click="(railEdit = false), $refs.shjRail.openRailModule()">
						<span>货道选择</span>
						<span class="product-name" :style="{color:railMsg.railIds.length?'#5241FF':'#969799'}">
							{{railMsg.railIds.length?`已选择${railMsg.railIds.length}条货道`:"请选择货道"}}
						</span>
					</view>
					<view class="edit-panel">
						<span>现有库存</span>
						<u-number-box v-model="railMsg.railRepertory" integer input-width="75px" button-size="40px"
							min="0" iconStyle="fontSize: 17px" />
					</view>
					<view class="edit-panel">
						<span>货道容量</span>
						<view class="input-wrapper">
							<xls-field v-model="railMsg.railCapacity" type="digit" placeholder="请输入货道容量"
								input-align="right" />
						</view>
					</view>
				</view>
				
				<!-- 容量 -->
				<view class="popup-content" v-else-if="railSet.type == 2">
					<view class="edit-panel" @click="(railEdit = false), $refs.shjRail.openRailModule()">
						<span>货道选择</span>
						<span class="product-name" :style="{color:railSet.railIds.length?'#5241FF':'#969799'}">
							{{railSet.railIds.length?`已选择${railSet.railIds.length}条货道`:"请选择货道"}}
						</span>
					</view>
					<view class="edit-panel">
						<span>货道容量</span>
						<view class="input-wrapper">
							<xls-field v-model="railSet.railCapacity" type="digit" placeholder="请输入货道容量"
								input-align="right" />
						</view>
					</view>
				</view>
				<!-- 状态 -->
				<view class="popup-content" v-else-if="railSet.type == 3">
					<view class="edit-panel" @click="(railEdit = false), $refs.shjRail.openRailModule()">
						<span>货道选择</span>
						<span class="product-name" :style="{color:railSet.railIds.length?'#5241FF':'#969799'}">
							{{railSet.railIds.length?`已选择${railSet.railIds.length}条货道`:"请选择货道"}}
						</span>
					</view>
					<view class="edit-panel">
						<span>货道状态</span>
						<u-switch v-model="railEnable" activeColor="#5241FF" size="50" />
					</view>
				</view>
			</view>
		</u-popup>
		<xls-commodity :commodityId="railMsg.commodityId" @confirm="getShjCommodity" ref="commodity"></xls-commodity>
		<shj-rails ref="shjRail" @getShjRail="getShjRail" @setRailEdit="setRailEdit" />
	</view>
</template>

<script>
	import {
		shjController
	} from '@/api/index.js';
	import ShjRails from "./shjRails.vue";
	export default {
		name: "batchChange",
		emits: ['setBatchSet', 'getDetail'],
		components: {
			ShjRails
		},
		data() {
			return {
				railEdit: false,
				//商品上架
				railMsg: {
					type: 0, //1=批量修改商品   2=批量修改价格   3=批量修改库存
					railIds: [],
					commodityId: null,
					price: null, //价格
					railRepertory: null, //现有库存
					railCapacity: null, //货道容量
				},
				commodityName: "",
				title: "",
				//货道设置
				railSet: {
					type: 0, //1=货道测试 2=货道容量设置 3=货道状态设置
					railIds: [],
					railCapacity: null,
					railEnable: 0, //货道是否启用,0未启用1启用
				},
				railEnable: true,
			};
		},
		methods: {
			//商品上架
			handleEdit(item) {
				this.title = item.title
				this.railSet.type = 0
				this.commodityName = "请选择商品"
				this.railMsg = {
					type: item.type,
					railIds: [],
					commodityId: null,
					price: null, //价格
					railRepertory: null, //现有库存
					railCapacity: null, //货道容量
				};
				this.$emit('setBatchSet', false)
				this.railEdit = true
			},
			// 取消
			cancel() {
				this.railEdit = false
				this.$emit('setBatchSet', true)
			},
			setRailEdit(result) {
				this.railEdit = result
			},
			//货道设置
			handleRail(item) {
				this.title = item.title
				this.railMsg.type = 0
				this.railSet = {
					type: item.type, //1=货道测试 2=货道容量设置 3=货道状态设置
					railIds: [],
					railCapacity: null,
					railEnable: 0, //货道是否启用,0未启用1启用
				}
				this.railEnable = true
				this.$emit('setBatchSet', false)
				this.railEdit = true
			},
			getShjRail(rail) {
				this.railMsg.railIds = rail
				this.railSet.railIds = rail
				this.railEdit = true
			},
			getShjCommodity(commodity) {
				this.railMsg.commodityId = commodity.commodityId
				this.railMsg.price = commodity.suggestRetailPrice
				this.commodityName = commodity.commodityName
				this.railEdit = true
			},

			async confirmSet() {
				if (!this.railMsg.railIds.length || !this.railSet.railIds.length) {
					return this.$toast("请选择设置的货道~");
				}
				if (this.railMsg.type) {
					shjController.goodsOnTheShelfList(this.railMsg).then((res) => {
						if (res.code == 200) {
							this.$toast("修改成功~")
							this.$emit('getDetail')
							this.railEdit = false
						}
					})
				} else if (this.railSet.type) {
					if (this.railSet.type == 2 && this.railSet.railCapacity == "") {
						return this.$toast("请您输入货道容量~")
					}
					this.railSet.railEnable = this.railEnable ? 1 : 0
					shjController.updCargoLaneList(this.railSet).then((res) => {
						if (res.code == 200) {
							this.$toast("修改成功~")
							this.$emit('getDetail')
							this.railEdit = false
						}
					});
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.edit-cargoroad {
		background: #fff;
		width: 100%;
		height: 60vh;
		max-height: 1000rpx;

		.popup-header {
			align-items: center;
			background: #f4f5f7;
			color: #5241FF;
			display: flex;
			font-size: 16px;
			height: 45px;
			justify-content: space-between;
			padding: 0 10px;

			.popup-title {
				color: #000;
			}
		}

		.popup-content {
			font-size: 15px;

			.edit-panel {
				align-items: center;
				border-bottom: 1px solid #e5e5e5;
				display: flex;
				height: 50px;
				justify-content: space-between;
				padding: 0 10px;

				.input-wrapper {
					flex: 1;
				}
			}

			.product-name {
				padding-right: 20px;
			}

			.product-name:after {
				border-right: 1px solid #4c4c4c;
				border-top: 1px solid #4c4c4c;
				content: "";
				height: 9px;
				margin-top: 5px;
				opacity: 0.6;
				position: absolute;
				right: 13px;
				transform: rotate(45deg);
				width: 9px;
			}
		}
	}
</style>
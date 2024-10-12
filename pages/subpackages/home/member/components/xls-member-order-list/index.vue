<template>
	<!-- 订单列表 -->
	<view class="cell-container-list">
		<view class="order-item" v-for="(item, index) in memberList" :key="index" @click="goTo(item)">
			<view class="text-main">
				<view class="top-list">
					<view class="left">
						<span v-if="payType">{{ typeDict[item.type] }}</span>
						<span v-else>{{ operationTypeDict[item.operationType] }}</span>
					</view>
					<view class="right" v-if="payType">
						<span class="error" v-if="item.hasOwnProperty('refundState')">
							{{ refundStateDict[item.refundState] }}
							{{ refundDict[item.refundType] }}
						</span>
						<span class="success" v-else>
							{{item.state==0?"待支付":"交易成功"}}
						</span>
					</view>
					<view class="right" v-else>
						{{ operationDataTypeDict[item.operationDataType] }}
					</view>
				</view>
				<view class="info-list">
					<view class="left">
						<span class="item" v-if="payType">{{item.payType==0?'微信付款':'支付宝付款'}}</span>
						<span class="item">{{ item.createTime }}</span>
					</view>
					<view class="right">
						<span class="price" v-if="payType">{{ item.amountTotal }}元</span>
						<span class="price" v-if="!payType && item.operationCurrency != null"
							:style="{color:item.operationCurrency<0?'red':''}">
							{{item.operationCurrency > 0? "+" + item.operationCurrency: item.operationCurrency}}
						</span>
						<span class="price" v-if="!payType && item.operationBalance != null" :style=" {color:item.operationBalance<0?'red':''}">
							{{item.operationBalance > 0? "+" + item.operationBalance: item.operationBalance}}
						</span>
						{{ operationDataTypeUnitDict[item.operationDataType] }}
					</view>
				</view>
				<view class="info-list" v-if="item.deviceNumber">
					<span class="store-name">
						{{item.placeName ? item.placeName : item.transactionPlaceName}}-<span>
							{{item.deviceTypeName ? item.deviceTypeName : item.typeName}}</span>
						<span>
							{{ item.deviceNumber }}-{{item.railSpace? item.railSpace: item.shippingSpace || "1"}}-{{ item.railNumber }}
						</span>
					</span>
				</view>
				<view class="info-list" v-if="item.operationRemark">
					<span class="store-name">
						备注：{{ item.operationRemark }}
					</span>
				</view>
			</view>
			<u-icon name="arrow-right" size="32" color="#969799" style="padding: 3px 0 0 6px" v-if="payType" />
		</view>
		<xls-bottom v-if="(payType && memberList.length)||(onEarth && !payType && memberList.length)" />
		<xls-empty v-if="!memberList.length" />
	</view>
</template>

<script>
	export default {
		name: 'xlsMemberOrderList',
		props: {
			memberList: {
				type: Array,
				default: () => []
			},
			payType: {
				type: [String, Number, Boolean],
				default: true
			}
		},
		data() {
			return {
				typeDict: {
					1: "充值余币",
					2: "设备启动",
					3: "余币购买",
					4: "余额购买",
					5: "充值余额",
					undefined: "其他类型",
				},
				refundDict: {
					0: "出货失败，自动退款",
					1: "出货失败，部分退款",
					2: "人工退款（全额）",
					3: "通讯失败，自动退款",
					4: "人工退款（部分商品）",
					5: "人工退款（指定金额）",
					undefined: "其他",
				},
				refundStateDict: {
					"-1": "退款异常",
					0: "退款失败",
					1: "退款成功",
					2: "退款中",
					undefined: "其他",
				},
				// 余额、余币
				operationTypeDict: {
					1: "设备启动",
					2: "启动失败退回",
					3: "商家操作",
					4: "会员充值",
					undefined: "活动",
				},
				operationDataTypeDict: {
					1: "余额",
					2: "余币",
					3: "积分",
					4: "彩票",
					undefined: "其他",
				},
				operationDataTypeUnitDict: {
					1: "元",
					2: "币",
					3: "分",
					4: "张",
					undefined: "",
				},
			}
		},
		methods: {
			goTo(item) {
				if (this.payType) {
					this.$goTo('', 'navigateTo', {
						...item
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
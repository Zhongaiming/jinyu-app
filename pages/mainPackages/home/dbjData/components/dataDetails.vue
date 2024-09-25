<template>
	<view class="block-row-box">
		<view class="block-row">
			<view class="block-cell">
				<view class="cell-top" @click.stop="illustrate('income')">
					在线收益
					<u-icon name="question-circle" size="30" color="#c8cacb" class="icon" />
				</view>
				<view class="cell-bottom">{{ $formatAmount(item.onlineIncome) }}</view>
			</view>
			<view class="block-cell">
				<view class="cell-top">充值支付</view>
				<view class="cell-bottom">{{ $formatAmount(item.rechargePayIncome) }}</view>
			</view>
			<view class="block-cell">
				<view class="cell-top">线上启动</view>
				<view class="cell-bottom">{{ $formatAmount(item.onlineStartUpIncome) }}</view>
			</view>
			<view class="block-cell"></view>
		</view>
		<view class="block-row">
			<view class="block-cell">
				<view class="cell-top">现金收益</view>
				<view class="cell-bottom">{{ item.cashIncome }}</view>
			</view>
			<view class="block-cell">
				<view class="cell-top">美团核销</view>
				<view class="cell-bottom">{{ $formatAmount(item.mtIncome) }}</view>
			</view>
			<view class="block-cell">
				<view class="cell-top">抖音核销</view>
				<view class="cell-bottom">{{ $formatAmount(item.dyIncome) }}</view>
			</view>
			<view class="block-cell">
				<view class="cell-top">口碑核销</view>
				<view class="cell-bottom">{{ $formatAmount(item.kbIncome) }}</view>
			</view>
		</view>
		<view class="block-row">
			<view class="block-cell" @click.stop="illustrate('number')">
				<view class="cell-top">
					取币总数
					<u-icon name="question-circle" size="30" color="#c8cacb" class="icon" />
				</view>
				<view class="cell-bottom">{{ item.exchangeNumber }}</view>
			</view>
			<view class="block-cell">
				<view class="cell-top">实际出币</view>
				<view class="cell-bottom">{{ item.outPresentNumber }}</view>
			</view>
			<view class="block-cell">
				<view class="cell-top">充值币数</view>
				<view class="cell-bottom">{{ item.rechargeNumber }}</view>
			</view>
			<view class="block-cell"></view>
		</view>
		<view class="block-row">
			<view class="block-cell">
				<view class="cell-top">线上启动取币</view>
				<view class="cell-bottom">{{ item.onlineStartUpExchangeNumber }}</view>
			</view>
			<view class="block-cell">
				<view class="cell-top">会员取币</view>
				<view class="cell-bottom">{{ item.memberExchangeNumber }}</view>
			</view>
			<view class="block-cell">
				<view class="cell-top">美团核销取币</view>
				<view class="cell-bottom">{{ item.mtExchangeNumber }}</view>
			</view>
			<view class="block-cell">
				<view class="cell-top">抖音核销取币</view>
				<view class="cell-bottom">{{ item.dyExchangeNumber }}</view>
			</view>
		</view>
		<view class="block-row">
			<view class="block-cell">
				<view class="cell-top">口碑核销取币</view>
				<view class="cell-bottom">{{ item.kbExchangeNumber }}</view>
			</view>
			<view class="block-cell">
				<view class="cell-top">现金购币</view>
				<view class="cell-bottom">{{ item.cashExchangeNumber }}</view>
			</view>
			<view class="block-cell">
				<view class="cell-top">远程启动取币</view>
				<view class="cell-bottom">{{ item.remoteStartExchangeNumber }}</view>
			</view>
			<view class="block-cell"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "dataDetail",
		props: {
			item: {
				type: Object,
				default: () => {}
			}
		},
		methods: {
			illustrate(type) {
				this.$emit('illustrateMethod', type)
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '../index.scss';
</style>
<template>
	<!-- 历史数据 -->
	<u-popup :show="downExplain" round="20" mode="center" @close="downExplain = false"> 
		<view class="container-wrapper">
			<view class="title">温馨提示</view>
			<view class="text-content">
				<view class="p-text">
					<span class="serial-number">1、</span>
					<span>由于兑币机设备不会主动上传实际取币数给系统，因此，此处的“取币数”是根据商家设置的充值套餐“M元N币”的N值来统计取币数。所以，“现有库存”数据，可能跟实际的库存有偏差，此数据仅供参考，请以机器的实际库存量为准。</span>
				</view>
				<view class="p-text">
					<span class="serial-number">2、</span>
					<span>取币数-统计依据：</span>
				</view>
				<view class="p-text">
					<span class="serial-number"></span>
					<span>①线上取币(个)：指筛选时段内，该兑币机设备、在线支付等线上所发生的取币数量。根据在线支付直接出币的套餐（比如10元=20个币），以及大额储值、赠币、场地通用币等的取币数量，来统计在线支付的出币数。</span>
				</view>
				<view class="p-text">
					<span class="serial-number"></span>
					<span>②纸钞取币(个)：指筛选时段内，该兑币机设备、纸钞现金所发生的取币数量。根据在商家在B端设置的套餐（比如10元=20个币），将对应的纸钞现金收益与同等金额的套餐对应，然后统计纸钞的出币数。举例：假设“现金收益”中有20元现金，而且，同一交易时间内，商家在B端设置的套餐有20元=10个币，那么，统计的“纸钞取币”数量为10个币。</span>
				</view>
				<view class="p-text">
					<span class="serial-number"></span>
					<span>③合计取币=线上取币+纸钞取币</span>
				</view>
			</view>
			<view class="share-btn" @click="downExplain = false">
				<view class="btn">我知道了</view>
			</view>
		</view>
	</u-popup>
</template>

<script>
	export default {
		name: "explainPage",
		data() {
			return {
				downExplain: false,
			};
		},
	};
</script>

<style lang="scss" scoped>
	/** 历史数据 */
	.container-wrapper {
		width: 300px;
		padding: 16px 0;

		.title {
			font-size: 16px;
			font-weight: 700;
			line-height: 40px;
			text-align: center;
		}

		.share-btn {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 16px;

			.btn {
				flex: 1;
				line-height: 42px;
				border: 1px solid #5241ff;
				border-radius: 8px;
				text-align: center;
				font-size: 15px;
				font-weight: 700;
				color: #5241ff;
			}
		}

		.text-content {
			padding: 8px 16px 24px;
			color: #848f99;
			font-size: 14px;
			line-height: 20px;
			text-align: justify;
			overflow-y: scroll;
			max-height: 60vh;

			.p-text {
				padding-left: 20px;
				position: relative;

				.serial-number {
					position: absolute;
					top: 0;
					left: 0;
				}
			}
		}
	}
</style>
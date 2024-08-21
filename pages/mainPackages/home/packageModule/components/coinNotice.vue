<template>
	<u-popup :show="coinNotice" round="20" mode="center"> 
		<div class="coinNotice">
			<div class="modal-header">解释说明</div>
			<div class="con-out">
				<div class="h3">以下内容适用于扫码支付和刷脸支付的兑币机</div>
				<div class="con">
					<div class="step">
						<div class="h4">套餐类型</div>
						<p>标准套餐：与纸钞对等金额的套餐</p>
						<p>自定义：商户自行设置的其他金额套餐</p>
					</div>
					<div class="step">
						<div class="h4">展示状态</div>
						<p>已启用：设备上已设置的套餐,且用户扫码可以看到并购买</p>
						<p class="red-ff">禁用：设备上没有设置的套餐，且用户扫码看不到</p>
						<p class="yellow-ff">
							活动专用:设备上主要用于商户使用营销工具搞活动时,系统可发送指令,执行送币。如抽奖送币,升单送币。适用于原本禁闭1元1币、5元5币的商户。
						</p>
					</div>
				</div>
				<div class="btn-ok" @click="coinNotice = !coinNotice">好的</div>
			</div>
		</div>
	</u-popup>
</template>

<script>
	export default {
		data() {
			return {
				coinNotice: false,
			};
		},
		methods: {
			showNotice() {
				this.coinNotice = !this.coinNotice;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.coinNotice {
		width: 320px;

		p {
			padding: 0;
			margin: 0;
		}

		.modal-header {
			background: linear-gradient(90deg, #E6E4FE, #5241FF 67%);
			color: #fff;
			font-family: PingFangSC, PingFangSC-Regular;
			font-size: 18px;
			font-weight: 400;
			height: 60px;
			line-height: 60px;
			text-align: center;
		}

		.con-out {
			font-family: PingFangSC, PingFangSC-Semibold;
			padding: 0 15px 15px;
			font-size: 14px;

			.h3 {
				border-bottom: 1px solid #e6e6e6;
				color: #333;
				font-weight: 600;
				padding: 10px 0;
			}

			.con {
				.step {
					padding-bottom: 13px;
					padding-top: 10px;

					.h4 {
						color: #333;
						font-size: 13px;
						font-weight: 600;
					}

					p {
						color: #888;
						font-size: 13px;
						font-weight: 400;
						margin: 0;
						padding: 0;
						padding-left: 15px;
						padding-top: 5px;
						position: relative;
					}
				}
			}

			.btn-ok {
				background: #5241FF;
				border-radius: 5px;
				color: #fff;
				font-family: PingFangSC, PingFangSC-Regular;
				font-size: 16px;
				font-weight: 400;
				height: 47px;
				line-height: 47px;
				text-align: center;
			}
		}
	}
</style>
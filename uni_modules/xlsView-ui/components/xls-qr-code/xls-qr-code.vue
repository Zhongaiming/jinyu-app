<template>
	<view class="xls-qrcode">
		<canvas canvas-id="qrcode" :style="{width: `${width}`, height: `${height}`}"
			class="xls-qrcode__canvas"></canvas>
		<xls-image :src="uQrcodeUrl" :style="{width: `${width}`, height: `${height}`}" v-if="uQrcodeUrl"></xls-image>
	</view>
</template>

<script>
	import uQRCode from '@/common/uqrcode.js';
	export default {
		name: 'xls-qr-code',
		props: {
			qsUrl: {
				type: String,
				require: true
			},
			size: {
				type: Number,
				default: 180
			},
			width: {
				type: [String, Number],
				default: '360rpx'
			},
			height: {
				type: [String, Number],
				default: '360rpx'
			}
		},
		data() {
			return {
				uQrcodeUrl: "",
			}
		},
		watch: {
			qsUrl: {
				immediate: true, // 立即调用一次
				handler(newValue) {
					this.qrFun()
				}
			}
		},
		methods: {
			/** 生成二维码 */
			qrFun() {
				uQRCode.make({
					canvasId: 'qrcode',
					componentInstance: this,
					text: this.qsUrl,
					size: this.size,
					margin: 10,
					backgroundColor: '#ffffff',
					foregroundColor: '#000000',
					success: res => {
						this.uQrcodeUrl = res
						this.$emit('getQrcodeUrl', res)
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.xls-qrcode {
		display: flex;
		justify-content: center;
		position: relative;

		&__canvas {
			position: absolute;
			left: 0;
			z-index: -10;
			opacity: 0;
		}
	}
</style>
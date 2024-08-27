<template>
	<view class="qs-wrapper">
		<image :src="imgUrl" alt="" mode="widthFix" class="image" />
	</view>
</template>

<script>
	import {
		qrcanvas
	} from "qrcanvas";
	import {
		deviceController
	} from "@/api/index.js";
	export default {
		props: ["deviceNumber", "shippingSpace", "railNumber", "decideType"],
		data() {
			return {
				imgBox: "",
				imgUrl: "",
			};
		},
		async mounted() {
			let railNumber;
			if (
				this.decideType == "售货机" ||
				this.decideType == "兑币机" ||
				this.decideType == "游乐车"
			) {
				railNumber = String("支付ID:" + this.deviceNumber);
			} else {
				console.log("===", this.shippingSpace||1, this.railNumber)
				railNumber = String(
					"支付ID:" +
					this.deviceNumber +
					"-" +
					(this.shippingSpace || 1) +
					"/" +
					(this.railNumber || 1)
				);
			}
			let url = await deviceController.getOrderQR({
				deviceNumber: this.deviceNumber,
				shippingSpace: this.shippingSpace || 1,
				railNumber: this.railNumber || 1,
			});
			let hrefUrl;
			if (url.code == 200) {
				console.log(url.data);
				if (
					this.decideType == "售货机" ||
					this.decideType == "兑币机" ||
					this.decideType == "游乐车"
				) {
					hrefUrl = url.data.split("-")[0];
				} else {
					hrefUrl = url.data;
				}
			} else {
				return;
			}
			this.$nextTick(() => {
				const canvas = qrcanvas({
					size: 230,
					padding: 25,
					// typeNumber:3-40,
					// correctLevel:'Q',
					// resize:true,
					typeNumber: 4,
					data: hrefUrl,
					// effect: {
					//   type: "fusion",
					// },
					// logo: {
					//   text: railNumber,
					// //   // w:150,
					// //   // h:20,
					// //   // x:120,
					// //   // y:50,
					// //   // style:'font-size:50px',
					//   options: {
					//     color: "#000",
					// //     // fontSize:50,
					// //     // fontStyle:'font-size:50px',
					//     fontFamily: "PingFangSC-Regular",
					//     padColor: "rgb(241, 238, 238)",
					// //     // mode:1,
					// //     // padding
					// //     // pad:10
					//   },
					// },
				});
				this.imgBox = canvas.toDataURL("image/png");
				this.newImage(railNumber);
			});
		},
		methods: {
			newImage(text) {
				// 创建画布
				let canvas = document.createElement("canvas");
				// 绘制文字环境
				var cxt = canvas.getContext("2d");
				cxt.mozImageSmoothingEnabled = false;
				cxt.webkitImageSmoothingEnabled = false;
				cxt.msImageSmoothingEnabled = false;
				cxt.imageSmoothingEnabled = false;
				// 画布宽度
				canvas.width = 230;
				// 画布高度
				canvas.height = 230;
				var img = new Image();
				img.src = this.imgBox;

				// 图片加载完成，才可处理
				img.onload = () => {
					// 画图(这里画布与图片等宽高)
					cxt.drawImage(img, 0, 0);
					// 设置字体大小
					cxt.font = "16px Microsoft YaHei";
					// 更改字号后，必须重置对齐方式，否则居中麻烦。设置文本的垂直对齐方式
					cxt.textBaseline = "middle";
					cxt.textAlign = "center";
					// 距离左边的位置
					var left = canvas.width / 2;
					// 距离上边的位置 (图片高-文字距离图片底部的距离)
					var top = canvas.height - 13;
					// 文字颜色
					cxt.fillStyle = "#000";
					// 文字在画布的位置
					cxt.fillText(text, left, top);
					this.imgUrl = canvas.toDataURL("image/png", 1);
				};
			},
		},
	};
</script>

<style scoped>
	.qs-wrapper {
		height: 460rpx;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-bottom: 24rpx;
	}

	.image {
		width: 460rpx;
		height: 460rpx;
		display: inline-block;
	}
</style>
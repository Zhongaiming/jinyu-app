<template>
	<!-- 朴素版-验证码 -->
	<view class="ranCon" :style="{ color: changColor }" @click="refreshCode">
		{{ identifyCode }}
	</view>
</template>

<script>
	export default {
		name: "ranCode",
		data() {
			return {
				//生成验证码的字符范围
				identifyCodes: "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789",
				//生成的验证码
				identifyCode: "",
				changColor: "",
			};
		},
		//初始验证码
		mounted() {
			this.identifyCode = "";
			this.$nextTick(() => {
				this.makeCode(this.identifyCodes, 5);
			});
		},
		methods: {
			//生成随机数
			randomNum(min, max) {
				return Math.floor(Math.random() * (max - min) + min);
				//Math.floor()该函数是减少最接近的整数
			},
			//刷新验证码
			refreshCode() {
				let _this = this;
				uni.$u.throttle(() => {
					_this.identifyCode = "";
					_this.makeCode(_this.identifyCodes, 5);
					//生成随机颜色
					var str1 = "#";
					for (var i = 0; i < 6; i++) {
						str1 += Math.floor(Math.random() * 9);
					}
					//在控制器中显示出随机生成的颜色(可以删除,无影响)
					//返回随机生成的颜色
					// return str1;
					_this.changColor = str1;
				}, 500);
			},
			//生成验证码，l为生成验证码的长度
			makeCode(o, l) {
				for (let i = 0; i < l; i++) {
					//随机字符串拼接
					this.identifyCode +=
						o[
							//字符串序列号 拿到返回值
							this.randomNum(0, o.length)
						];
				}
				this.$emit("getRancode", this.identifyCode);
			},
		},
	};
</script>

<style scoped>
	.ranCon {
		height: 52rpx;
		padding: 0 10rpx;
		background: #e6e2e2;
		text-align: center;
		text-align: right;
		font-size: 36rpx;
		line-height: 60rpx;
	}
</style>
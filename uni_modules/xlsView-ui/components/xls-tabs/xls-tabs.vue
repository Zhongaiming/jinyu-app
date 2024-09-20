<template>
	<view class="xls-tabs">
		<view class="xls-tabs__wrap">
			<view class="xls-tabs__nav xls-tabs__nav--line">
				<view class="xls-tab" v-for="item in options" :key="item.key"
					:class="{'xls-tab--active':val===item.key}" @click="changeMethod(item)">
					<span class="xls-tab__text xls-tab__text--ellipsis" :id="`title${item.key}`">{{item.value}}</span>
				</view>
				<view class="xls-tabs__line" :style="lineStyle"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "xls-tabs",
		emits: ['input', 'update:modelValue', 'change'],
		props: {
			options: {
				type: Array,
				default: []
			},
			// value
			value: {
				type: [Number, String],
				default: ''
			},
			// #ifdef VUE3
			modelValue: {
				type: [Number, String],
				default: ''
			},
			// #endif
		},
		watch: {
			// #ifdef VUE3
			modelValue(newVal) {
				this.val = newVal
			},
			// #endif
			value(newVal) {
				this.val = newVal
			}
		},
		created() {
			setTimeout(() => {
				// #ifndef VUE3
				this.val = this.value
				// #endif

				// #ifdef VUE3
				if (this.value && !this.modelValue) {
					this.val = this.value
				} else {
					this.val = this.modelValue
				}
				// #endif
				this.getElementInfo();
			}, 50)
		},
		data() {
			return {
				val: '',
				lineStyle: {}
			}
		},
		methods: {
			changeMethod(item) {
				if (item.key === this.val) {
					return
				}
				this.val = item.key
				this.getElementInfo()
				this.$emit('change', item)
				// TODO　兼容　vue2
				this.$emit('input', this.val)
				// TODO　兼容　vue3
				// #ifdef VUE3
				this.$emit('update:modelValue', this.val)
				// #endif
			},
			getElementInfo() {
				// 创建选择器查询实例
				const query = uni.createSelectorQuery()

				// 选择目标元素
				query.select(`#title${this.val}`).boundingClientRect((rect) => {
					if (rect) {
						// 获取元素的 offsetLeft 和 offsetWidth
						const offsetLeft = rect.left; // 相对于页面的左边距
						const offsetWidth = rect.width; // 元素的宽度
						
						var left = offsetLeft + offsetWidth / 2;
						var lineStyle = {
						  transform: "translateX(" + left + "px) translateX(-50%)",
						};
						
						this.lineStyle = lineStyle;
					}
				}).exec();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.xls-tabs {
		position: relative;

		&__wrap {
			overflow: hidden;
			height: 88rpx;
		}

		.xls-tabs__nav {
			position: relative;
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
			background-color: #fff;
			-webkit-user-select: none;
			user-select: none;
		}

		.xls-tabs__nav--line {
			box-sizing: content-box;
			height: 100%;
		}

		.xls-tab--active {
			color: #323233;
			font-weight: 500;
		}

		.xls-tab {
			position: relative;
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
			-webkit-box-flex: 1;
			-webkit-flex: 1;
			flex: 1;
			-webkit-box-align: center;
			-webkit-align-items: center;
			align-items: center;
			-webkit-box-pack: center;
			-webkit-justify-content: center;
			justify-content: center;
			box-sizing: border-box;
			padding: 0 6rpx;
			color: #646566;
			font-size: 28rpx;
			line-height: 88rpx;
			cursor: pointer;
		}

		.xls-tab__text--ellipsis {
			display: -webkit-box;
			overflow: hidden;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
		}

		.xls-tab--active {
			color: #323233;
			font-weight: 500;
		}

		.xls-tabs__line {
			position: absolute;
			bottom: 4rpx;
			left: 0;
			z-index: 1;
			width: 80rpx;
			height: 6rpx;
			background-color: #5241ff;
			border-radius: 6rpx;
			transition: transform 0.3s ease;
		}
	}
</style>
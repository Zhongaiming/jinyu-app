<template>
	<u-popup :show="showPlaceType" :round="20" mode="bottom">
		<view class="type-popop">
			<view class="type-popop-header">
				<view class="cancel" @click="showPlaceType = false">
					<u-icon name="close-circle-fill" size="40" color="#999" />
				</view>
				<view class="title">请选择场地类型</view>
				<view class="confirm" @click="confirm">确定</view>
			</view>

			<view class="type-popop-body">
				<view class="item-style" v-for="(item, index) in placeTypeList" :key="item.id"
					@click="clickMethod(item)" :class="{'active': active.id == item.id}">
					{{ item.name }}
				</view>
			</view>
		</view>
	</u-popup>
</template>

<script>
	import {
		placeController
	} from "@/api/index.js";
	export default {
		props: {
			// #ifdef VUE2
			value: {
				type: [String, Number, Array],
				default: ""
			},
			// #endif
			// #ifdef VUE3
			modelValue: {
				type: [String, Number, Array],
				default: ""
			},
			// #endif
		},
		data() {
			return {
				showPlaceType: false,
				placeTypeList: [],
				active: {
					id: 0,
					name: ''
				},
			}
		},
		watch: {
			// #ifdef VUE2
			value:
				// #endif
				// #ifdef VUE3
				modelValue:
				// #endif  
				{
					handler(v) {
						const item = this.placeTypeList.find(e => e.id === v)
						if (item) {
							this.active = item;
							this.confirm();
						} else {
							this.active = {
								id: 0,
								name: ''
							}
						}
					},
					immediate: true
				},
		},
		created() {
			placeController.getPlaceType().then(res => {
				this.placeTypeList = res.data;
			})
		},
		methods: {
			confirm() {
				this.showPlaceType = false;
				this.$emit('confirm', this.active);
			},
			clickMethod(item) {
				this.active.id = item.id;
				this.active.name = item.name;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.type-popop {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;

		&-header {
			height: 100rpx;
			width: 100%;
			display: flex;
			align-items: center;
			text-align: center;

			.cancel {
				width: 120rpx;
				line-height: 100rpx;
				@include center-flex();
			}

			.title {
				color: #333;
				font-size: 32rpx;
				font-weight: 600;
				flex: 1;
			}

			.confirm {
				font-size: 28rpx;
				color: #5241ff;
				line-height: 100rpx;
				width: 120rpx;
			}
		}

		&-body {
			width: 100%;
			overflow: auto;
			flex: 1;
			padding-bottom: 32rpx;
			padding: 24rpx;
			padding-top: 0;
			display: flex;
			flex-wrap: wrap;

			.item-style {
				width: 30%;
				height: 64rpx;
				background: #f4f4f4;
				border-radius: 16rpx;
				color: #666;
				font-size: 26rpx;
				font-weight: 400;
				overflow: hidden;
				margin-top: 20rpx;
				text-align: center;
				line-height: 64rpx;
				margin-right: 3%;
			}

			.active {
				color: #fff;
				background: #5241FF;
			}

			.btn {
				width: 45%;
				height: 64rpx;
			}
		}
	}
</style>
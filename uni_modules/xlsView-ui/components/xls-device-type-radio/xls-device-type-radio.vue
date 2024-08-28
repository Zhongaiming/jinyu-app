<template>
	<!-- 设备类型-单选 -->
	<u-popup :show="showDeviceType" mode="bottom" closeable @close="() => {
		showDeviceType = false
	}">
		<view class="type-content">
			<view class="panel-title">
				<span class="title">请选择设备类型</span>
			</view>
			<view class="panel-body" v-if="deviceTypeList.length">
				<view class="item-type" :class="{'active': activeItem == -1}" @click="pickItem(0, -1)" v-if="optionAll">
					<view class="field text-over">全部设备</view>
					<view class="value text-over">
						<u-icon name="checkmark-circle-fill" size="36" color="#5241FF" v-show="activeItem == -1" />
					</view>
				</view>
				<view class="item-type" v-for="(item, index) in deviceTypeList" :key="index"
					:class="{'active':activeItem == index}" @click="pickItem(item, index)">
					<view class="field text-over">{{ item.typeName }}</view>
					<view class="value text-over">
						<u-icon name="checkmark-circle-fill" size="36" color="#5241FF" v-show="activeItem == index" />
					</view>
				</view>
				<xls-bottom></xls-bottom>
			</view>
			xls-emp
			<view class="modal-footer" @click="showDeviceType = !showDeviceType">
				<view class="cancel-btn">关闭</view>
			</view>
		</view>
	</u-popup>
</template>

<script>
	import {
		mapGetters
	} from 'vuex';
	export default {
		props: {
			optionAll: {
				type: Boolean,
				default: true
			},
			clickOverlay: {
				type: Boolean,
				default: true,
			},
		},
		data() {
			return {
				showDeviceType: false,
				activeItem: -1,
			};
		},
		computed: {
			...mapGetters([
				'deviceTypeList',
				'deviceTypeDict'
			])
		},
		async created() {
			this.$store.dispatch('config/getList');
		},
		methods: {
			async showDeviceTypelist() {
				this.showDeviceType = !this.showDeviceType;
			},
			pickItem(item, index) {
				var typeInfo = {
					typeName: item.typeName,
					deviceTypeId: item.id,
				};
				if (item == 0) {
					var typeInfo = {
						typeName: "全部设备",
						deviceTypeId: "",
					};
				}
				this.$emit("changDeviceType", typeInfo);
				this.activeItem = index;
				this.showDeviceType = !this.showDeviceType;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.type-content {
		width: 100%;
		height: 60vh;
		max-height: 1000rpx;
		display: flex;
		flex-direction: column;
		position: relative;
		font-family: "Microsoft JhengHei", "Microsoft YaHei";

		.panel-title {
			text-align: center;
			background: #fafafa;
			border-bottom: 1rpx solid #eee;

			.title {
				display: inline-block;
				height: 88rpx;
				line-height: 88rpx;
				font-size: 28rpx;
				color: rgba(0, 0, 0, 0.9);
			}
		}

		.panel-body {
			flex: 1;
			padding-bottom: 100rpx;
			overflow-y: auto;

			.item-type {
				display: flex;
				align-items: center;
				min-height: 100rpx;
				padding: 0 20rpx;
				box-sizing: border-box;

				.field {
					flex: 2;
					font-size: 30rpx;
				}

				.value {
					flex: 1;
					display: flex;
					justify-content: flex-end;
					font-size: 40rpx !important;
				}
			}

			.item-type:not(:last-child) {
				border-bottom: 1rpx solid #eee;
			}

			.active {
				color: #5241FF;
			}
		}

		.modal-footer {
			position: absolute;
			left: 0;
			bottom: 0;
			border-top: 1rpx solid #e0e0e0;
			width: 100%;

			.cancel-btn {
				height: 88rpx;
				width: 100%;
				line-height: 88rpx;
				text-align: center;
				font-size: 32rpx;
				color: #000;
				background: #fff;
			}
		}
	}
</style>
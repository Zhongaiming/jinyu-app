<template>
	<view class="xls-remote-page">
		<xls-jy-navbar title="操作记录" :showRight="false"></xls-jy-navbar>
		<view class="content">
			<u-radio-group v-model="deviceTypeId">
				<view class="item-box box-sizing">
					<view class="item box-sizing" v-for="(item, index) in deviceTypeList" :key="index"
						@click="pickDeviceType(item, index)">
						<span>{{ item.typeName }}</span>
						<u-radio :name="item.id" size="36" iconSize="28" activeColor="#5241ff"></u-radio>
					</view>
				</view>
			</u-radio-group>
		</view>
		<xls-bottom v-if="deviceTypeList.length"/>
		<xls-empty v-else />
		<view class="btnB">
			<view class="link" v-hasPermi="['app:remoteboot:index:records']" @click="goTo">
				远程启动记录 >>
			</view>
			<view class="mainB">
				<view class="btn" @click="$toast('敬请期待~')">扫一扫</view>
				<view class="btn" @click="nextStep()">下一步</view>
			</view>
		</view>
	</view>

</template>

<script>
	import {
		mapGetters
	} from 'vuex';

	export default {
		data() {
			return {
				deviceTypeId: -1,
				typeName: "",
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
			goTo() {
				this.$goTo("/pages/mainPackages/home/remote/record")
			},
			pickDeviceType(item, index) {
				this.deviceTypeId = item.id;
				this.typeName = item.typeName;
			},
			nextStep() {
				if (this.deviceTypeId != -1) {
					this.$goTo("/pages/mainPackages/home/remote/operate", "navigateTo", {
						deviceTypeId: this.deviceTypeId,
						typeName: this.typeName,
					})
				} else {
					this.$toast("请选择设备类型");
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.xls-remote-page {}

	.content {
		display: flex;
		justify-content: center;
		margin-top: 20rpx;
		padding: 0 24rpx;

		.item-box {
			width: 100%;
			padding: 0 20rpx;
			background: #fff;
			border-radius: 16rpx;
			overflow: hidden;
		}

		.item {
			height: 88rpx;
			width: 100%;
			font-size: 28rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.item:not(:last-child) {
			border-bottom: 1rpx solid #f5f5f5;
		}
	}

	.bottomTxt {
		text-align: center;
		width: 95%;
		margin: 0 auto;
		padding-top: 24rpx;
		font-size: 20rpx;
		color: rgba(192, 189, 189, 0.6);
	}

	.btnB {
		height: 120rpx;
		width: 100%;
		background: #fff;
		position: fixed;
		bottom: 0;
		z-index: 99;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.link {
			position: absolute;
			width: 100%;
			line-height: 70rpx;
			top: -70rpx;
			left: 0;
			font-size: 30rpx;
			text-align: center;
			background: #fff;
			color: #5241ff;
			border-bottom: 1rpx #ddd dashed;
		}

		.mainB {
			height: 88rpx;
			width: 95%;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			overflow: hidden;
		}

		.btn {
			background-color: #5241ff;
			border-radius: 16rpx;
			color: #fff;
			font-size: 32rpx;
			height: 88rpx;
			line-height: 88rpx;
			text-align: center;
			width: 334rpx;
		}
	}
</style>
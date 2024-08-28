<template>
	<view class="xls-dd-header-wrapper">
		<u-row>
			<u-col :span="1.5">
				<view class="xls-side-wrapper" @click="goBack">
					<xls-image :src="`${$baseUrl}appV4/img/icons/back.png`" alt="" class="image" />
				</view>
			</u-col>
			<u-col :span="10">
				<u-search searchIconSize="44" :actionStyle="{color:' #5241ff'}" v-model="enterValue" height="66"
					placeholder="输入设备唯一码、场地或备注" shape="square" :showAction="true" actionText="取消" :animation="true"
					@search="onSearch" @custom="onCancel" />
			</u-col>
			<u-col :span="0.5"></u-col>
		</u-row>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				enterValue: "",
			};
		},
		methods: {
			goBack() {
				this.$goBack();
			},
			onSearch() {

			},
			onCancel() {
				this.enterValue = "";
			},
		},
	};
</script>

<style lang="scss" scoped>
	.xls-dd-header-wrapper {
		width: 100%;
		height: 100rpx;
		background: #fff;
		overflow: hidden;
	}

	.xls-side-wrapper {
		min-height: 100rpx;
		width: 100%;
		@include center-flex();

		.image {
			width: 36rpx;
		}
	}
</style>
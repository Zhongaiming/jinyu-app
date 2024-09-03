<template>
	<view class="shiftDeviceContent">
		<xls-jy-navbar title="转移设备"></xls-jy-navbar>
		<view class="top-title">
			<span class="left">设备唯一码</span>
			<span class="right">{{ deviceNumber }}</span>
		</view>
		<view class="top-title">
			<span class="left">设备类型</span>
			<span class="right">{{ deviceTypeName }}</span>
		</view>
		<view class="top-title" @click="$refs.placeList.showPlacePopup(placeId)">
			<span class="left">投放场地</span>
			<span class="right">{{ placeName}}
				<u-icon name="arrow-right" size="36" color="#8d8d8d" style="margin-left: 8px" />
			</span>
		</view>
		<!-- 售货机 -->
		<!-- <view style="margin-top:12px"><put-place/></view> -->
		<!-- 娃娃机 -->
		<!-- <crane-machine></crane-machine> -->
		<!-- 兑币机 -->
		<!-- <coin-machine/> -->
		<!-- placeList -->
		<xls-place-radio ref="placeList" @getPlaceId="pitchonPlace"></xls-place-radio>
		<view class="btn-comfirm" @click="comfrimMove">
			<view class="btn Center">保存</view>
		</view>
	</view>
</template>

<script>
	// import CraneMachine from "./childrenComps/craneMachine";
	// import CoinMachine from "./childrenComps/coinMachine";
	// import PlaceList from "@/components/commonComps/placeList";
	import {
		deviceController
	} from "@/api/index.js";
	export default {
		// components: {
		// 	CraneMachine,
		// 	CoinMachine,
		// 	PlaceList,
		// },
		data() {
			return {
				deviceNumber: "",
				deviceTypeName: "",
				placeName: "",
				placeId: 0,
			};
		},
		onLoad(option) {
			if(option.params) {
				const {deviceNumber, decideType, placeName, placeId} = JSON.parse(option.params);
				this.deviceNumber = deviceNumber;
				this.deviceTypeName = decideType;
				this.placeName = placeName;
				this.placeId = placeId;
			}
		},
		methods: {
			pitchonPlace(place) {
				this.placeName = place.placeName;
				this.placeId = place.placeId;
			},
			async comfrimMove() {
				let res = await deviceController.moveDevice({
					deviceNumber: this.deviceNumber,
					placeId: this.placeId,
				});
				if (res.code == 200) {
					this.$toast("转移成功");
					setTimeout(() => {
						this.$goBack();
					}, 1000);
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.top-title {
		height: 44px;
		background: #fff;
		box-sizing: border-box;
		border-bottom: 1px solid #e6e6e6;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 16px;

		.left {
			width: 40%;
			padding-left: 12px;
		}

		.right {
			width: 50%;
			height: 100%;
			padding-right: 15px;
			font-size: 14px;
			display: flex;
			align-items: center;
			justify-content: flex-end;
		}
	}

	.btn-comfirm {
		padding: 10px;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 65px;
		box-sizing: border-box;
		background: #fff;

		.btn {
			background: #5241ff;
			color: #fff;
			font-size: 18px;
			height: 100%;
			width: 100%;
			border-radius: 10px;
		}
	}
</style>
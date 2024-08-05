<template>
	<div class="xls-remote-page">
		<xls-jy-navbar title="操作记录" :showRight="false"></xls-jy-navbar>
		<div class="content">
			<u-radio-group v-if="typeList" v-model="deviceTypeId">
				<div class="item-box box-sizing">
					<div class="item box-sizing" v-for="(item, index) in typeList" :key="index"
						@click="pickDeviceType(item, index)">
						<span>{{ item.typeName }}</span>
						<u-radio :name="item.id" size="36" iconSize="28" activeColor="#5241ff"></u-radio>
					</div>
				</div>
			</u-radio-group>
			<xls-empty v-else />
		</div>
		<xls-bottom />
		<div class="btnB">
			<div class="link" v-hasPermi="['app:remoteboot:index:records']"
				@click="$router.push('/remoteBoot/processRecord')">
				远程启动记录 >>
			</div>
			<div class="mainB">
				<div class="btn" @click="$toast('敬请期待~')">扫一扫</div>
				<div class="btn" @click="nextStep()">下一步</div>
			</div>
		</div>
	</div>

</template>

<script>
	// import {
	// 	getDevicetype
	// } from "@/utils/api/device";

	export default {
		name: "remoteBoot",
		data() {
			return {
				deviceTypeId: -1,
				typeList: [{
						"id": 1,
						"typeName": "娃娃机",
						"typeNumber": "1",
						"wight": 1,
						"serviceCharge": 10,
						"createId": 1,
						"createTime": "2022-03-09 20:21:31",
						"updateId": 1,
						"updateTime": "2022-03-18 20:21:35"
					},
					{
						"id": 2,
						"typeName": "扭蛋机",
						"typeNumber": "2",
						"wight": 1,
						"serviceCharge": 10,
						"createId": 1,
						"createTime": "2022-03-18 20:21:49",
						"updateId": 1,
						"updateTime": "2022-03-18 20:21:44"
					},
					{
						"id": 3,
						"typeName": "游乐车",
						"typeNumber": "3",
						"wight": 1,
						"serviceCharge": 10,
						"createId": 1,
						"createTime": "2022-03-18 20:21:49",
						"updateId": 1,
						"updateTime": "2022-03-18 20:21:44"
					},
					{
						"id": 4,
						"typeName": "售货机",
						"typeNumber": "4",
						"wight": 1,
						"serviceCharge": 10,
						"createId": 1,
						"createTime": "2022-03-18 20:22:42",
						"updateId": 1,
						"updateTime": "2022-03-18 20:23:17"
					},
					{
						"id": 5,
						"typeName": "兑币机",
						"typeNumber": "5",
						"wight": 1,
						"serviceCharge": 10,
						"createId": 1,
						"createTime": "2022-03-18 20:23:56",
						"updateId": 1,
						"updateTime": "2022-03-18 20:24:02"
					},
					{
						"id": 6,
						"typeName": "儿童类",
						"typeNumber": "6",
						"wight": 1,
						"serviceCharge": 10,
						"createId": 1,
						"createTime": "2023-04-18 09:02:11",
						"updateId": 1,
						"updateTime": "2023-04-18 09:02:14"
					},
					{
						"id": 7,
						"typeName": "游戏类",
						"typeNumber": "7",
						"wight": 1,
						"serviceCharge": 10,
						"createId": 1,
						"createTime": "2023-05-22 09:59:31",
						"updateId": 1,
						"updateTime": "2023-05-22 09:59:33"
					}
				],
				typeName: "",
			};
		},
		// async created() {
		// 	let type = await getDevicetype();
		// 	if (type.data.code == 0 || type.data.msg == "ok") {
		// 		this.typeList = type.data.data;
		// 	}
		// },
		methods: {
			pickDeviceType(item, index) {
				this.deviceTypeId = item.id;
				this.typeName = item.typeName;
			},
			nextStep() {
				if (this.deviceTypeId != -1) {
					this.$router.push({
						name: "deviceStartup",
						query: {
							deviceTypeId: this.deviceTypeId,
							typeName: this.typeName,
						},
					});
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
		margin-top: 10px;
		padding: 12px;

		.item-box {
			width: 100%;
			padding: 0 10px;
			background: #fff;
			border-radius: 8px;
			overflow: hidden;
		}

		.item {
			height: 44px;
			width: 100%;
			font-size: 14px;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.item:not(:last-child) {
			border-bottom: 1px solid #f5f5f5;
		}
	}

	.bottomTxt {
		text-align: center;
		width: 95%;
		margin: 0 auto;
		padding-top: 12px;
		font-size: 10px;
		color: rgba(192, 189, 189, 0.6);
	}

	.btnB {
		height: 60px;
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
			line-height: 35px;
			top: -35px;
			left: 0;
			font-size: 15px;
			text-align: center;
			background: #fff;
			color: #5241ff;
			border-bottom: 1px #ddd dashed;
		}

		.mainB {
			height: 44px;
			width: 95%;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			overflow: hidden;
		}

		.btn {
			background-color: #5241ff;
			border-radius: 8px;
			color: #fff;
			font-size: 16px;
			height: 44px;
			line-height: 44px;
			text-align: center;
			width: 167px;
		}
	}
</style>
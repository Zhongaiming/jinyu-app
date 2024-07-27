<template>
	<view class="xls-place-operate">
		<jy-navbar :title="`${operateValue}场地`" bgColor="#f5f6f7"></jy-navbar>
		<view class="xls-place-operate-content">
			<view class="name">
				<view class="left"><span>*</span>场地名称</view>
				<view class="right">
					<input type="text" placeholder="例如:广州万达店(字数低于18个最优)" v-model="placeInfo.placeName" />
				</view>
			</view>

			<view class="name" @click="showPopup = !showPopup">
				<view class="left"><span>*</span>&nbsp;所在地区</view>
				<view class="right">
					<view class="txt" :style="placeInfo.city == '' ? { color: '#999' } : ''">
						{{ placeInfo.province }}{{placeInfo.city}}{{ placeInfo.region }}
					</view>
					<u-icon name="map-fill" size="42" color="#5241FF" />
				</view>
			</view>

			<view class="detail">
				<view class="left"><span>*</span>&nbsp;详细地址</view>
				<view class="right">
					<textarea rows="3" type="text" maxlength="50" placeholder="街道、楼牌号等"
						v-model="placeInfo.placeDetails"></textarea>
				</view>
			</view>

			<view class="name" @click="showPlaceType = !showPlaceType">
				<view class="left"><span>*</span>&nbsp;场地类型</view>
				<view class="right">
					<view class="txt" :style="placeInfo.placeTypeName == '例如:商场' ? { color: '#999' } : ''">
						{{ placeInfo.placeTypeName }}
					</view>
					<u-icon name="arrow-right" size="36" color="rgb(153, 153, 153)" />
				</view>
			</view>

			<view class="name">
				<view class="left">&nbsp;场地编码</view>
				<view class="right">
					<input type="text" placeholder="请输入(选填)" v-model="placeInfo.placeNumber" />
				</view>
			</view>

			<view class="name">
				<view class="left">&nbsp;区域</view>
				<view class="right">
					<input type="text" placeholder="请输入(选填)" v-model="placeInfo.area" />
				</view>
			</view>

			<view style="height: 8rpx; background: #f5f6f7"></view>

			<view class="name de-switch" style="border: 0">
				<view class="left">设置默认场地</view>
				<view>
					<u-switch v-model="defaultPlace" active-color="#5241FF" size="50" />
				</view>
			</view>
			<view class="notice">提醒：每次注册会默认推荐使用该场地</view>
		</view>



		<xls-p-botn @goTo="changeMethods" :text="`保存${operateValue}`"></xls-p-botn>
		<!-- placeTypeList -->
		<u-popup :show="showPlaceType" :round="20" mode="bottom">
			<view class="place-type">
				<view class="top-warpper">
					<view class="cancel" @click="showPlaceType = !showPlaceType">
						<u-icon name="close-circle-fill" size="40" color="#999" />
					</view>
					<view class="title">请选择场地类型</view>
					<view class="makeSure" @click="showPlaceType = !showPlaceType">
						确定
					</view>
				</view>
				<view class="typeCon">
					<view class="itemCon">
						<view class="typeItem" v-for="(item, index) in placeTypeList" :key="item.id" :style="item.id == placeInfo.placeTypeId
      ? { color: '#fff', background: '#5241FF' }
      : ''
      " :class="index == placeTypeList.length - 2
      ? 'btn'
      : '' || index == placeTypeList.length - 1
        ? 'btn'
        : ''
      " @click="
      (placeInfo.placeTypeId = item.id),
      (placeInfo.placeTypeName = item.name)
      ">
							{{ item.name }}
						</view>
					</view>
				</view>
			</view>
		</u-popup>

		<!-- address -->
		<!-- <u-popup v-model="showPopup" round position="bottom">
			<van-area title="请选择地区" :area-list="areaList" :columns-placeholder="['请选择', '请选择', '请选择']" @confirm="sure"
				@cancel="showPopup = !showPopup" value="110101" />
		</u-popup> -->
	</view>
</template>

<script>
	// import BottomBtn from "../putPlaceComps/bottomBtn";
	// import {
	// 	areaList
	// } from "@vant/area-data";
	// import {
	// 	addPlace,
	// 	editPlace,
	// 	getPlacetype,
	// 	getPlace,
	// 	getPlaceById,
	// } from "@/utils/api/place";
	// import {
	// 	entered
	// } from "../order/index";
	import xlsPBotn from "./components/xls-pBotn";
	export default {
		// name: "addPlace",
		components: {
			xlsPBotn
		},
		// directives: {
		// 	entered
		// },
		// inject: ["reload"],
		data() {
			return {
				//add or edit
				operateValue: "添加",
				//place
				placeInfo: {
					id: "",
					placeName: "",
					province: "省市区县、乡镇等",
					city: "",
					region: "",
					placeDetails: "",
					placeTypeName: "例如:商场",
					placeTypeId: "",
					wight: 0,
					placeNumber: "",
					store: "",
					area: "",
					remark: "place",
				},
				//改默认
				placeEditInfo: {},
				//地区
				showPopup: false,
				// areaList,
				//类型
				showPlaceType: false,
				placeTypeList: [{
						"id": 9,
						"name": "餐饮店",
						"remark": ""
					},
					{
						"id": 13,
						"name": "网吧"
					},
					{
						"id": 14,
						"name": "酒吧"
					},
					{
						"id": 15,
						"name": "会所"
					},
					{
						"id": 16,
						"name": "咖啡馆"
					},
					{
						"id": 17,
						"name": "奶茶店"
					},
					{
						"id": 18,
						"name": "夜总会"
					},
					{
						"id": 19,
						"name": "书报亭"
					},
					{
						"id": 20,
						"name": "商场"
					},
					{
						"id": 21,
						"name": "电影院"
					},
					{
						"id": 22,
						"name": "KTV"
					},
					{
						"id": 23,
						"name": "游艺厅"
					},
					{
						"id": 24,
						"name": "酒店"
					},
					{
						"id": 25,
						"name": "步行街"
					},
					{
						"id": 26,
						"name": "4S店"
					},
					{
						"id": 27,
						"name": "旅游景点"
					},
					{
						"id": 28,
						"name": "机场"
					},
					{
						"id": 29,
						"name": "火车站"
					},
					{
						"id": 30,
						"name": "汽车站"
					},
					{
						"id": 31,
						"name": "地铁站"
					},
					{
						"id": 32,
						"name": "工厂"
					},
					{
						"id": 33,
						"name": "社区"
					},
					{
						"id": 34,
						"name": "办公楼"
					},
					{
						"id": 35,
						"name": "医院"
					},
					{
						"id": 36,
						"name": "政府机构"
					},
					{
						"id": 37,
						"name": "大学"
					},
					{
						"id": 38,
						"name": "初中"
					},
					{
						"id": 39,
						"name": "小学"
					},
					{
						"id": 40,
						"name": "幼儿园"
					},
					{
						"id": 43,
						"name": "培训机构"
					},
					{
						"id": 44,
						"name": "高中&职业技术学院"
					},
					{
						"id": 45,
						"name": "商超"
					},
					{
						"id": 47,
						"name": "儿童乐园"
					},
					{
						"id": 100,
						"name": "其他"
					}
				],
				//默认
				defaultPlace: false,
			};
		},
		// created() {
		// 	this.addOredit();
		// 	this.chooseType();
		// },
		// watch: {
		// 	defaultPlace(newV) {
		// 		this.placeInfo.wight = newV ? 1 : 0;
		// 	},
		// },
		onLoad(option) {
			const params = JSON.parse(option.params);
			console.log("传参", params)
			this.operateValue = params.type === "add" ? "添加" : "编辑";
		},
		methods: {
			addOredit() {
				if (!this.$route.query.placeId) {
					this.operateValue = "添加";
				} else {
					this.operateValue = "编辑";
					let placeId = this.$route.query.placeId;
					this.setDefaultplace(placeId);
				}
			},
			//查一个场地 设为默认值
			setDefaultplace(placeId) {
				getPlaceById({
						placeId
					})
					.then((res) => {
						this.placeInfo = res.data.data;
						/*
						if (this.placeInfo.placeNumber != null) {
						  this.placeInfo.placeName = this.placeInfo.placeName
						    .split(this.placeInfo.placeNumber)
						    .join("");
						}
						*/
						this.defaultPlace = this.placeInfo.wight === 1;
					})
					.catch((res) => {});
			},
			//改权重
			changWight(wig) {
				let params = JSON.parse(JSON.stringify(this.placeEditInfo));
				params = Object.assign(params, {
					wight: wig
				});
				editPlace(params)
					.then((res) => {})
					.catch((err) => {});
			},
			//添加与编辑
			async changeMethods() {
				if (this.placeInfo.placeName == "") {
					return this.$toast("请填写场地名称");
				}
				if (this.placeInfo.province == "") {
					return this.$toast("请选择所在地区");
				}
				if (this.placeInfo.placeDetails == "") {
					return this.$toast("请填写详细地址");
				}
				if (this.placeInfo.placeTypeId == "") {
					return this.$toast("请选择场地类型");
				}
				if (this.placeInfo.wight) {
					//取消原默认场地
					let res = await getPlace({
						page: 1,
						size: 1
					});
					if (res.data.data.records[0]) {
						this.placeEditInfo = res.data.data.records[0];
						this.changWight(0);
					}
				}
				if (this.$route.query.placeId) {
					/*
       if (this.placeInfo.placeNumber != null) {
         this.placeInfo.placeName = this.placeInfo.placeName
           .split(this.placeInfo.placeNumber)
           .join("");
       }
       */
					//编辑
					await editPlace(this.placeInfo)
						.then((res) => {
							if (res.data.code == 0 || res.data.msg == "ok") {
								this.$toast("编辑成功");
							}
						})
						.catch((err) => {});
				} else {
					await addPlace(this.placeInfo)
						.then((res) => {
							if (res.data.code == 0 || res.data.msg == "ok") {
								this.$toast("添加成功");
							}
						})
						.catch((res) => {});
				}
				setTimeout(() => {
					this.reload();
					this.$nextTick(() => {
						this.$router.back();
					});
				}, 1000);
			},
			//省市区
			sure(params) {
				if (params[0].name == "") {
					this.$toast("请选择完整的省市区");
				}
				if (params[0].name != "") {
					if (params[1].name == "") {
						this.$toast("请选择完整的省市区");
					} else if (params[2].name == "") {
						this.$toast("请选择具体到区");
					} else {
						this.placeInfo.province = params[0].name;
						this.placeInfo.city = params[1].name;
						this.placeInfo.region = params[2].name;
						this.showPopup = false;
					}
				}
			},
			//场地类型列表
			chooseType() {
				getPlacetype()
					.then((res) => {
						this.placeTypeList = res.data.data;
					})
					.catch(() => {});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.xls-place-operate {
		background: #f5f6f7;
		font-family: PingFangSC, PingFangSC-Regular;

		&-content {
			background: #fff;
			padding: 0 24rpx;

			.name {
				height: 100rpx;
				width: 100%;
				display: flex;
				border-bottom: 2rpx solid #e5e5e5;
				display: flex;
				align-items: center;

				.left {
					width: 30%;
					height: 100rpx;
					line-height: 100rpx;
					color: #333;
					font-size: 28rpx;
					font-weight: 400;
					text-align: left;
				}

				.right {
					width: 70%;
					display: flex;

					.txt {
						flex: 1;
						font-size: 28rpx;
						font-weight: 400;
						color: #333;
					}
				}

				.sides {
					display: flex;
					justify-content: flex-end;
				}
			}

			span {
				color: red;
				margin-right: 8rpx;
			}

			input {
				height: 60rpx;
				width: 100%;
				border: 0;
				padding: 0;
				outline: none;
				font-size: 28rpx;
				background: none;
				appearance: none;
				color: #191919;
				font-weight: 400;
				line-height: 60rpx;
			}

			::-webkit-input-placeholder {
				color: #999;
				font-size: 28rpx;
				font-weight: 400;
			}


			.de-switch {
				display: flex;
				align-items: center;
				justify-content: space-between;
			}

			.notice {
				color: #999;
				font-size: 24rpx;
				font-weight: 400;
				margin-top: -21rpx;
				padding-bottom: 20rpx;
			}

			.detail {
				height: 140rpx;
				width: 100%;
				display: flex;
				border-bottom: 2rpx solid #e5e5e5;

				.left {
					height: 100rpx;
					width: 30%;
					line-height: 100rpx;
					color: #333;
					font-size: 28rpx;
					font-weight: 400;
				}

				.right {
					width: 70%;
					height: 140rpx;
					display: flex;

					textarea {
						border: 0;
						flex: 1;
						font-size: 28rpx;
						height: 80rpx;
						line-height: 40rpx;
						margin: 30rpx 0;
						text-align: left;
						resize: none;
					}
				}
			}
		}
	}

	.place-type {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;

		.top-warpper {
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

			.makeSure {
				font-size: 28rpx;
				color: #5241ff;
				line-height: 100rpx;
				width: 120rpx;
			}
		}

		.typeCon {
			width: 100%;
			overflow: scroll;
			flex: 1;
			padding-bottom: 32rpx;

			.itemCon {
				width: 92%;
				margin: 0 auto;
				display: flex;
				align-items: center;
				justify-content: space-between;
				flex-wrap: wrap;
			}

			.typeItem {
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
			}

			.btn {
				width: 45%;
				height: 64rpx;
			}
		}
	}
</style>
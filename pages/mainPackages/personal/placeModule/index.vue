<template>
	<view class="xls-place-list-warpper">
		<xls-p-navbar @stratesSearch="stratesSearch"></xls-p-navbar>
		<view class="xls-list-place" v-if="placeList.length">
			<u-radio-group v-model="defaultPlace">
				<view class="xls-list-place-item" v-for="(item, index) in placeList" :key="index">
					<view class="header">
						<span class="group-name text-clamp">
							{{ $placeNameRule(item.placeName, item.placeNumber) }}
						</span>

						<span class="equipmentCount">{{ item.deviceNum }}台</span>
					</view>
					<view class="body">
						<view class="itemText">
							<span class="base-tips isDefault" v-show="item.id == defaultPlace">默认</span>
							<span class="base-tips addressType">{{
                  item.placeTypeName
                }}</span>
							<span class="item-place">{{ item.province }}{{ item.city }}{{ item.region
                  }}{{ item.placeDetail }}</span>
						</view>
						<view class="edit-btn" v-hasPermi="['app:place:index:edit']" @click="goTo('edit', item.id)">
							<u-icon name="edit-pen" size="40" color="#999"></u-icon>
						</view>
					</view>
					<view class="footer">
						<view class="default-set">
							<view class="default-set-btn">
								<view class="radio" :class="item.id == defaultPlace ? 'unclick' : ''">
									<u-radio :name="item.id" activeColor="#5241FF" @click="setDefaultplace(item.id)"
										size="36" iconSize="30"></u-radio>
								</view>
								<span class="text">默认场地</span>
							</view>
						</view>
						<span v-hasPermi="['app:place:index:delete']" class="dele-btn"
							@click="deleteType(item)">删除</span>
					</view>
				</view>
			</u-radio-group>
			<xls-bottom v-show="onEarth" />
		</view>
		<xls-empty v-else></xls-empty>
		<xls-p-botn @goTo="goTo"></xls-p-botn>
	</view>
</template>

<script>
	// import {
	// 	getPlace,
	// 	deletePlace,
	// 	editPlace,
	// 	getPlaceById,
	// } from "@/utils/api/place";
	import xlsPBotn from "./components/xls-pBotn";
	import xlsPNavbar from "./components/xls-pNavbar";
	import {
		debounceFun,
		throttleFun
	} from "@/plugins/debounceOrthrottle";

	export default {
		components: {
			xlsPBotn,
			xlsPNavbar
		},
		data() {
			return {
				page: 1,
				placeList: [{
					"id": 2448,
					"placeName": "射水测试场地",
					"placeNumber": "",
					"province": "北京市",
					"city": "北京市",
					"region": "东城区",
					"placeDetails": "射水测试场地",
					"placeTypeId": 14,
					"wight": 1,
					"state": 1,
					"commercialNumber": "ZTWL_20220617111542006",
					"remark": "place",
					"createId": 18,
					"createTime": "2024-06-24 14:45:40",
					"updateId": 506,
					"updateTime": "2024-07-25 10:32:46",
					"placeTypeName": "酒吧",
					"deviceNum": 0,
					"area": "",
					"store": ""
				}],
				onEarth: false,
				//默认值
				defaultPlace: 2448,
				//查场地
				placeInfo: [],
				searchValue: "",
				// 操作的场地
				place: {},
			};
		},
		// created() {
		// 	this.getPlacelist();
		// },
		methods: {
			// 去编辑
			goTo(type = 'add', placeId) {
				this.$goTo('/pages/mainPackages/personal/placeModule/placeOperate', 'navigateTo', {
					type,
					placeId
				})
			},

			//获取场地
			async getPlacelist() {
				this.onEarth = false;
				this.page = 1;
				this.loading();
				getPlace({
						page: this.page,
						size: 100,
						search: this.searchValue ? encodeURIComponent(this.searchValue) : null,
					})
					.then((res) => {
						this.clearing();
						if (res.data.code == 0 || res.data.msg == "ok") {
							if (res.data.data.records) {
								if (res.data.data.records.length < 100) {
									this.onEarth = true;
								} else {
									this.onEarth = false;
								}
								this.placeList = res.data.data.records;
								if (this.placeList[0].wight == 1) {
									this.defaultPlace = this.placeList[0].id;
								} else {
									this.defaultPlace = -1;
								}
							}
						}
					})
					.catch((res) => {});
			},
			stratesSearch(search) {
				this.searchValue = search;
				this.getPlacelist();
			},
			//获取更多场地
			scorllMoreplace(parameter) {
				if (
					parameter.srcElement.scrollHeight - parameter.target.offsetHeight <=
					parameter.target.scrollTop + 50
				) {
					if (this.onEarth == false) {
						this.getMoreplace();
					}
				}
			},
			getMoreplace: debounceFun(function() {
				this.loading();
				getPlace({
						page: ++this.page,
						//先自增一
						size: 100,
						search: encodeURIComponent(this.searchValue),
					})
					.then((res) => {
						this.clearing();
						this.placeList = [...this.placeList, ...res.data.data.records];
						if (res.data.data.records.length == 0) {
							this.onEarth = true;
						}
					})
					.catch((res) => {});
			}, 500),
			//删除
			deleteType(item) {
				var _that = this;
				this.$dialog
					.confirm({
						title: "温馨提示",
						message: "确定删除投放场地？",
						confirmButtonColor: "rgb(247, 62, 62)",
					})
					.then(() => {
						if (item.deviceNum) {
							this.$dialog
								.confirm({
									title: "温馨提示",
									message: "该场地有" + this.page + "台设备需要解绑后才能删除该场地",
									confirmButtonText: "前往解绑",
									confirmButtonColor: "#5241FF",
								})
								.then(() => {
									this.$router.replace("/deviceManagement");
								})
								.catch(() => {});
						} else {
							deletePlace({
									id: item.id
								})
								.then((res) => {
									if (res.data.code == 0 || res.data.msg == "ok") {
										_that.placeList = _that.placeList.filter((option) => {
											return option.id != item.id;
										});
										_that.$toast("删除成功~");
									}
								})
								.catch((err) => {});
						}
					})
					.catch(() => {});
			},
			//取消原默认场地
			cancelDefault() {
				getPlace({
						page: 1,
						size: 1,
					})
					.then((res) => {
						if (res.data.data.records[0].wight == 1) {
							this.placeInfo = res.data.data.records[0];
							this.changWight(0);
						}
					})
					.catch((res) => {});
			},
			//查一个场地 设为默认值
			async setDefaultplace(placeId) {
				this.cancelDefault();
				getPlaceById({
						placeId: placeId,
					})
					.then((res) => {
						this.placeInfo = res.data.data;
						this.changWight(1);
					})
					.catch((res) => {});
			},
			//改权重
			changWight(parameter) {
				editPlace({
						id: this.placeInfo.id,
						placeName: this.placeInfo.placeName,
						province: this.placeInfo.province,
						city: this.placeInfo.city,
						region: this.placeInfo.region,
						placeDetails: this.placeInfo.placeDetails,
						placeTypeId: this.placeInfo.placeTypeId,
						wight: parameter,
					})
					.then((res) => {
						if (res.data.code == 0 || res.data.msg == "ok") {
							this.$toast("设置成功");
						} else {
							this.defaultPlace = -1;
						}
					})
					.catch((err) => {});
			},


		},
	};
</script>

<style lang="scss" scoped>
	.xls-place-list-warpper {
		width: 100%;
		background: #f5f6f7;
		font-family: PingFangSC, PingFangSC-Semibold;
	}

	.xls-list-place {
		padding: 20rpx;

		&-item {
			width: 100%;
			background: #fff;
			border-radius: 24rpx;
			margin-bottom: 16rpx;
			padding: 32rpx 24rpx 24rpx;

			.header {
				min-height: 44rpx;
				display: flex;
				align-items: center;
				width: 100%;

				.group-name {
					color: #333;
					font-size: 32rpx;
					font-weight: 600;
				}

				.equipmentCount {
					background: #5241ff;
					border-radius: 22rpx;
					color: #fff;
					display: flex;
					font-size: 22rpx;
					font-weight: 400;
					height: 32rpx;
					line-height: 32rpx;
					margin-left: 8rpx;
					padding: 0 16rpx;
					text-align: left;
					white-space: nowrap;
				}
			}

			.body {
				align-items: center;
				border-bottom: 2rpx solid #e5e5e5;
				display: flex;
				margin-top: 20rpx;
				min-height: 36rpx;
				padding-bottom: 24rpx;

				.itemText {
					flex: 1;

					.base-tips {
						border-radius: 22rpx;
						font-size: 22rpx;
						font-weight: 400;
						height: 32rpx;
						margin-right: 8rpx;
						padding: 0 18rpx;
					}

					.isDefault {
						background: #f5f6f7;
						color: #5241ff;
					}

					.addressType {
						background: #fff7e6;
						color: #ff8d1a;
					}

					.item-place {
						color: #333;
						font-size: 26rpx;
						font-weight: 400;
						margin-left: 8rpx;
						text-align: left;
					}
				}

				.edit-btn {
					height: 40rpx;
					margin-left: 26rpx;
					width: 40rpx;
				}
			}

			.footer {
				align-items: center;
				display: flex;
				height: 36rpx;
				margin-top: 23rpx;

				.default-set {
					align-items: center;
					display: flex;
					flex: 1;
					height: 100%;

					.default-set-btn {
						align-items: center;
						display: flex;
						height: 100%;

						.radio {
							font-size: 42rpx;
							margin-right: 36rpx;
						}

						.unclick {
							pointer-events: none;
						}

						.text {
							color: #999;
							font-size: 26rpx;
							font-weight: 400;
						}
					}
				}

				.dele-btn {
					color: #999;
					font-size: 24rpx;
					font-weight: 400;
					text-align: right;
				}
			}
		}
	}
</style>
<template>
	<div class="shj-commodity">
		<xls-jy-navbar title="商品管理"></xls-jy-navbar>
		<xls-search placeholder="搜索商品名称" marLeft="-5.0em"></xls-search>
		<u-list v-model="loading" :finished="onEarth" finished-text="没有更多了" @load="getCommodity"
			v-show="dataList.length">
			<div class="outSides-center-wrapper" v-for="item in dataList" :key="item.commodityId">
				<image :src="item.commodityImg" alt="" v-show="item.commodityImg" class="left-img" />
				<image :src="`${$baseUrl}appV4/commodity/goods.png`" alt="" v-show="!item.commodityImg"
					class="left-img" />
				<div class="right-main-wrapper">
					<div class="titleB text-over">
						<span v-if="item.barCode && searchCommodity">{{ item.barCode }}-</span>{{ item.commodityName }}
					</div>
					<div class="main-wrapper">
						<div class="centerT">
							<div class="countB">
								￥&nbsp; <span>{{ item.referenceSellingPrice }}</span>
							</div>
							<div class="centerB">
								编码: &nbsp; <span>{{ item.barCode }}</span>
							</div>
						</div>
						<div class="right-wapper">
							<div class="right center" v-hasPermi="['app:shj:commodity:delete']">
								<div @click="deleteCommodity(item.id)" class="button-div">删除</div>
							</div>
							<div class="right center" v-hasPermi="['app:shj:commodity:edit']">
								<div @click="handleUpdate(item)" class="button-div">编辑</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<router-link v-hasPermi="['app:shj:commodity:add']" to="/shjCommodity/addCommodity">
				<div class="addB">
					<div class="addShop center">
						<image :src="`${$baseUrl}appV4/common/add-icon.png`" alt="" class="image" mode="widthFix" />
						<div>添加商品</div>
					</div>
				</div>
			</router-link>
		</u-list>
		<!-- 无商品展示 -->
		<!-- <un-commodity v-show="!dataList.length" /> -->
	</div>
</template>

<script>
	// import InputItem from "./components/inputItem";
	// import TopTab from "./components/topTab";
	// import UnCommodity from "./components/unCommodity";
	// import api from "@/utils/shjApi";
	export default {
		components: {
			// TopTab,
			// InputItem,
			// UnCommodity,
		},
		data() {
			return {
				loading: false,
				onEarth: false,
				searchCommodity: null,
				page: 0,
				dataList: [{
						"id": 4,
						"commodityName": "茅台",
						"costPrice": 0.01,
						"referenceSellingPrice": 0.02,
						"commodityImg": "https://xls-app-file.oss-cn-shanghai.aliyuncs.com/commodity/xlsv3_app/2024-05-17_BjcirFLrAypbFgqwGAw7r.jpeg",
						"barCode": "586855",
						"commodityState": 1,
						"commercialNumber": "ZTWL_20220617111542006",
						"createUserId": 426,
						"createTime": "2023-02-27 19:09:11"
					},
					{
						"id": 28,
						"commodityName": "主板",
						"costPrice": 1,
						"referenceSellingPrice": 2,
						"commodityImg": "https://xls-app-file.oss-cn-shanghai.aliyuncs.com/commodity/xlsv3_app/2023-06-16_2E6BTCBP6t9oRIJyTZBX7.jpg",
						"barCode": "001",
						"commodityState": 1,
						"commercialNumber": "ZTWL_20220617111542006",
						"createUserId": 426,
						"createTime": "2023-03-02 14:36:40"
					},
					{
						"id": 29,
						"commodityName": "贴纸",
						"costPrice": 1,
						"referenceSellingPrice": 2,
						"commodityImg": "https://xls-app-file.oss-cn-shanghai.aliyuncs.com/commodity/xlsv3_app/2023-06-16_Wbhqf2hbMAytJPQ8auahP.jpeg",
						"commodityState": 1,
						"commercialNumber": "ZTWL_20220617111542006",
						"createUserId": 426,
						"createTime": "2023-03-02 14:36:41"
					},
					{
						"id": 37,
						"commodityName": "车子",
						"costPrice": 0.01,
						"referenceSellingPrice": 0.02,
						"commodityImg": "http://xls-app-file.oss-cn-shanghai.aliyuncs.com/commodity/xlsv3_app/2023-06-16_fOojwwvyeQ9we0viyKB0c.jpg",
						"commodityState": 1,
						"commercialNumber": "ZTWL_20220617111542006",
						"createUserId": 426,
						"createTime": "2023-03-02 14:36:42"
					},
					{
						"id": 55,
						"commodityName": "中土测试",
						"costPrice": 0.01,
						"referenceSellingPrice": 0.01,
						"commodityImg": "https://xls-app-file.oss-cn-shanghai.aliyuncs.com/commodity/xlsv3_app/2023-06-16_TVy36VZmb1fH9CQXTqiMO.jpg",
						"barCode": "",
						"commodityState": 1,
						"commercialNumber": "ZTWL_20220617111542006",
						"createUserId": 426,
						"createTime": "2023-03-07 11:55:32"
					},
					{
						"id": 111,
						"commodityName": "测试",
						"costPrice": 0.01,
						"referenceSellingPrice": 0.01,
						"commodityImg": "https://xls-app-file.oss-cn-shanghai.aliyuncs.com/commodity/xlsv3_app/2023-06-16__37XhuOPOU9t8Msj5dWHH.jpg",
						"barCode": "123",
						"commodityState": 1,
						"commercialNumber": "ZTWL_20220617111542006",
						"createUserId": 506,
						"createTime": "2023-05-07 19:21:39"
					},
					{
						"id": 112,
						"commodityName": "12",
						"costPrice": 1,
						"referenceSellingPrice": 1,
						"commodityImg": "https://xls-app-file.oss-cn-shanghai.aliyuncs.com/commodity/xlsv3_app/2023-06-16_AX8p-aAaUGDYob-0RZl2q.06",
						"barCode": "1",
						"commodityState": 1,
						"commercialNumber": "ZTWL_20220617111542006",
						"createUserId": 506,
						"createTime": "2023-05-07 19:24:54"
					},
					{
						"id": 423,
						"commodityName": "12",
						"costPrice": 5,
						"referenceSellingPrice": 0.01,
						"commodityImg": "https://xls-app-file.oss-cn-shanghai.aliyuncs.com/commodity/xlsv3_app/2023-06-16_I6VILCbMe7rGlMsfc8fQP.png",
						"barCode": "",
						"commodityState": 1,
						"commercialNumber": "ZTWL_20220617111542006",
						"createUserId": 506,
						"createTime": "2023-06-15 21:38:28"
					},
					{
						"id": 427,
						"commodityName": "测试商品",
						"costPrice": 0.01,
						"referenceSellingPrice": 0.01,
						"commodityImg": "https://xls-app-file.oss-cn-shanghai.aliyuncs.com/commodity/xlsv3_app/2023-06-19_it-qxsPxqPwKjqozwjbhK.jpg",
						"barCode": "",
						"commodityState": 1,
						"commercialNumber": "ZTWL_20220617111542006",
						"createUserId": 18,
						"createTime": "2023-06-19 14:32:32"
					},
					{
						"id": 437,
						"commodityName": "1",
						"costPrice": 1,
						"referenceSellingPrice": 1,
						"commodityImg": "http://xls-app-file.oss-cn-shanghai.aliyuncs.com/commodity/xlsv3_app/2023-07-04_9kWbqcXLSQ8vlkEN7fKCs.jpeg",
						"barCode": "1",
						"commodityState": 1,
						"commercialNumber": "ZTWL_20220617111542006",
						"createUserId": 506,
						"createTime": "2023-07-04 16:26:21"
					}
				],
			};
		},
		// created() {
		// 	this.getCommodity();
		// },
		methods: {
			searchCom(name) {
				this.searchCommodity = name;
				this.page = 0;
				this.onEarth = false;
				this.getCommodity();
			},
			async getCommodity() {
				this.loading = true;
				let res = await api.shjCommodity({
					page: ++this.page,
					size: 10,
					search: this.searchCommodity ?
						encodeURIComponent(this.searchCommodity) : null,
				});
				this.loading = false;
				if (res.data.code == 0 || res.data.msg == "ok") {
					if (res.data.data != null) {
						if (res.data.data.records.length < 10) {
							this.onEarth = true;
						} else {
							this.onEarth = false;
						}
						if (this.page > 1) {
							this.dataList = [
								...this.dataList,
								...res.data.data.records,
							];
						} else {
							this.dataList = res.data.data.records;
						}
					}
				}
			},
			handleUpdate(item) {
				this.$router.push({
					path: "/shjCommodity/addCommodity",
					query: {
						commodity: JSON.stringify(item),
					},
				});
			},
			//删除
			deleteCommodity(id) {
				this.$dialog
					.confirm({
						title: "温馨提示",
						message: "如果该商品有正在关联的设备，那么，在此处删除该商品后，对于正在关联该商品的设备仍然可以正常使用；只是今后将无法在商品列表中选择使用该商品。<br/>确定要删除该商品吗？",
						confirmButtonColor: "#5241FF",
					})
					.then(() => {
						api
							.deleteCommodity({
								id
							})
							.then((res) => {
								if (res.data.code == 0) {
									this.$toast("删除成功");
									this.dataList = this.dataList.filter((item) => {
										return item.id != id;
									});
								}
							})
							.catch((res) => {});
					})
					.catch(() => {});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.shj-commodity {
		width: 100%;

		.center {
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.outSides-center-wrapper {
			width: 95%;
			margin: 0 auto;
			background: #fff;
			padding: 8px;
			box-sizing: border-box;
			border-radius: 10px;
			margin-bottom: 8px;
			display: flex;

			.left-img {
				width: 80px;
				height: 80px;
				margin-right: 10px;
			}

			.right-main-wrapper {
				flex: 1;

				.titleB {
					max-width: 260px;
					font-size: 15px;
					font-weight: 500;
					margin-bottom: 5px;
				}

				.main-wrapper {
					display: flex;
				}
			}

			.centerT {
				flex: 1;
				white-space: nowrap; //不换行
				overflow: hidden;
				text-overflow: ellipsis;

				.centerB {
					font-size: 13px;
					color: #999;
				}

				.countB {
					font-size: 13px;
					color: red;
					line-height: 22px;
				}
			}

			.right-wapper {
				margin-left: 10px;
				display: flex;
				justify-content: flex-end;
			}

			.right {
				width: 62px;

				.button-div {
					width: 50px;
					border: 1px solid #999;
					border-radius: 5px;
					font-size: 13px;
					text-align: center;
					height: 25px;
					line-height: 25px;
					background: #fff;
					color: #999;
				}
			}
		}

		.addB {
			width: 100%;
			display: flex;
			justify-content: center;

			.addShop {
				width: 126px;
				height: 40px;
				background: #5241ff;
				border-radius: 25px;
				font-size: 14px;
				font-weight: 500;
				color: #fff;
				position: fixed;
				bottom: 50px;

				.image {
					width: 20px;
				}

				:nth-child(2) {
					padding-left: 6px;
				}
			}
		}
	}
</style>
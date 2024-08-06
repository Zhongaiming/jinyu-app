<template>
	<div class="xls-revenue-page">
		<jy-navbar title="扭蛋机数据"></jy-navbar>
		<div class="lyyCell">
			<div class="data-table" ref="choose">
				<!-- <top-choose @getEarndata="getEarndata" /> -->
				<div class="data-summary">
					<div class="container">
						<div class="data-item">
							<p class="data">
								{{
                  eggEarnMsg.totalInsertCoins
                    ? keepFixed(eggEarnMsg.totalInsertCoins)
                    : 0
                }}
							</p>
							<p class="title Center">合计投币(个)</p>
						</div>
						<div class="data-item">
							<p class="data">
								{{
                  eggEarnMsg.onlinePayAmount
                    ? keepFixed(eggEarnMsg.onlinePayAmount)
                    : 0
                }}
							</p>
							<p class="title Center">在线支付(元)</p>
						</div>
						<div class="data-item">
							<p class="data">
								{{
                  eggEarnMsg.outPresentCount
                    ? keepFixed(eggEarnMsg.outPresentCount)
                    : 0
                }}
							</p>
							<p class="title Center">出货总数</p>
						</div>
					</div>
				</div>
				<!-- <derive-watch leftTit="按货道" rightTit="按日期" @aisleOrdate="aisleOrdate"
					@downloadExl="downloadExl"></derive-watch> -->
			</div>
			<div class="table-container" @scroll="crossSlip($event)">
				<div class="thead-fixed show" v-show="topTitle">
					<table border="0">
						<thead :style="
                listType == 1
                  ? { left: '-' + scrollLeft + 'px' }
                  : { left: '0px', width: '100%' }
              ">
							<tr>
								<th class="tex-center" v-show="listType == 1">
									<p style="width: 85px">设备编号</p>
								</th>
								<th class="tex-center" v-show="listType == 1">
									<p style="width: 100px">商品名称</p>
								</th>
								<th class="tex-center" v-show="listType == 1">
									<p style="width: 60px">出货数</p>
								</th>
								<th class="tex-center" v-show="listType == 1">
									<p style="width: 60px">现有库存</p>
								</th>
								<th class="tex-center" v-show="listType == 1">
									<p style="width: 60px">启动单价</p>
									<p style="width: 60px" class="desc">(元/次)</p>
								</th>

								<th class="tex-center" v-show="listType == 2">
									<p style="width: 28vw">日期</p>
								</th>
								<th class="tex-center">
									<p :style="
                      listType == 1 ? { width: '60px' } : { width: '16vw' }
                    ">
										线下投币
									</p>
									<p :style="
                      listType == 1 ? { width: '60px' } : { width: '16vw' }
                    " class="desc">
										(个)
									</p>
								</th>
								<th class="tex-center">
									<p :style="
                      listType == 1 ? { width: '60px' } : { width: '16vw' }
                    ">
										线上投币
									</p>
									<p :style="
                      listType == 1 ? { width: '60px' } : { width: '16vw' }
                    " class="desc">
										(个)
									</p>
								</th>
								<th class="tex-center">
									<p :style="
                      listType == 1 ? { width: '70px' } : { width: '19vw' }
                    ">
										在线支付
									</p>
									<p :style="
                      listType == 1 ? { width: '70px' } : { width: '19vw' }
                    " class="desc">
										(元)
									</p>
								</th>
								<th class="tex-center" v-show="listType == 2">
									<p style="width: 16vw">出货数</p>
								</th>

								<th class="tex-center" v-show="listType == 1">
									<p style="width: 100px">货道号</p>
								</th>
								<th style="text-align: left" v-show="listType == 1">
									<p style="width: 150px">场地名称</p>
								</th>
							</tr>
						</thead>
					</table>
				</div>
				<table border="0" id="table-gash">
					<thead>
						<tr>
							<th class="tex-center" v-if="listType == 1">
								<p style="width: 85px">设备编号</p>
							</th>
							<th class="tex-center" v-if="listType == 1">
								<p style="width: 100px">商品名称</p>
							</th>
							<th class="tex-center" v-if="listType == 1">
								<p style="width: 60px">出货数</p>
							</th>
							<th class="tex-center" v-if="listType == 1">
								<p style="width: 60px">现有库存</p>
							</th>
							<th class="tex-center" v-if="listType == 1">
								<p style="width: 60px">启动单价</p>
								<p style="width: 60px" class="desc">(元/次)</p>
							</th>

							<th class="tex-center" v-if="listType == 2">
								<p style="width: 28vw">日期</p>
							</th>
							<th class="tex-center">
								<p :style="listType == 1 ? { width: '60px' } : { width: '16vw' }">
									线下投币
								</p>
								<p :style="listType == 1 ? { width: '60px' } : { width: '16vw' }" class="desc">
									(个)
								</p>
							</th>
							<th class="tex-center">
								<p :style="listType == 1 ? { width: '60px' } : { width: '16vw' }">
									线上投币
								</p>
								<p :style="listType == 1 ? { width: '60px' } : { width: '16vw' }" class="desc">
									(个)
								</p>
							</th>
							<th class="tex-center">
								<p :style="listType == 1 ? { width: '70px' } : { width: '19vw' }">
									在线支付
								</p>
								<p :style="listType == 1 ? { width: '70px' } : { width: '19vw' }" class="desc">
									(元)
								</p>
							</th>
							<th class="tex-center" v-if="listType == 2">
								<p style="width: 16vw">出货数</p>
							</th>

							<th class="tex-center" v-if="listType == 1">
								<p style="width: 100px">货道号</p>
							</th>
							<th style="text-align: left" v-if="listType == 1">
								<p style="width: 150px">场地名称</p>
							</th>
						</tr>
					</thead>
					<tbody v-if="eggRailList.length">
						<tr v-for="(item, index) in eggRailList" :key="index">
							<!-- 设备编号 -->
							<td class="tex-center" v-if="listType == 1">
								<p>
									<span style="max-width: 85px">{{ item.deviceNumber }}</span>
								</p>
							</td>
							<!-- 商品名称 -->
							<td class="tex-center" v-if="listType == 1">
								<p>
									<span style="max-width: 100px" v-html="
                      item.commodityName
                        ? item.commodityName
                        : item.commodityState == 2
                        ? '未设置商品'
                        : '未知'
                    "></span>
									<span class="text-history" v-if="item.commodityState === 0">(历史)</span>
								</p>
							</td>
							<!-- 出货数 -->
							<td class="tex-center" v-if="listType == 1">
								<p>
									<span style="max-width: 60px">{{
                    item.outPresentCount
                  }}</span>
								</p>
							</td>
							<!-- 现有库存 -->
							<td class="tex-center" v-if="listType == 1">
								<p>
									<span style="max-width: 60px">{{ item.railRepertory }}</span>
								</p>
							</td>
							<!-- 投币单价 -->
							<td class="tex-center" v-if="listType == 1">
								<p>
									<span style="max-width: 60px">{{ item.price }}</span>
								</p>
							</td>
							<!-- 日期 -->
							<td class="tex-center" v-if="listType == 2">
								<p>
									<span style="max-width: 105px">{{ item.date }}</span>
								</p>
							</td>
							<!-- 线下投币 -->
							<td class="tex-center">
								<p>
									<span style="max-width: 60px">{{
                    listType == 1
                      ? item.offlineOutTokenCount
                      : item.offline_count || 0
                  }}</span>
								</p>
							</td>
							<!-- 线上投币 -->
							<td class="tex-center">
								<p>
									<span style="max-width: 60px">{{
                    listType == 1 ? item.onlineOutTokenCount : item.online_count
                  }}</span>
								</p>
							</td>
							<!-- 在线支付 -->
							<td class="tex-center">
								<p>
									<span style="max-width: 70px">{{
                    listType == 1
                      ? item.orderMoney || 0
                      : item.amount_total || 0
                  }}</span>
								</p>
							</td>
							<!-- 出货数 -->
							<td class="tex-center" v-if="listType == 2">
								<p>
									<span style="max-width: 60px">{{
                    item.out_present_count
                  }}</span>
								</p>
							</td>
							<!-- 货道号 -->
							<td class="tex-center" v-if="listType == 1">
								<p>
									<span style="max-width: 100px">{{ item.railNumber }}</span>
								</p>
							</td>
							<!-- 场地名称 -->
							<td style="text-align: left" v-if="listType == 1">
								<p>
									<span style="max-width: 150px">{{ item.placeName }}</span>
								</p>
							</td>
						</tr>
					</tbody>
				</table>
				<div class="loading" v-if="!eggRailList">
					<van-loading>加载中...</van-loading>
				</div>
			</div>

			<div v-show="noData ? false : onEarth" class="bottom-txt">
				---到底了---
			</div>
		</div>
		<xls-empty v-if="noData"></xls-empty>
	</div>
</template>

<script>
	// import DeriveWatch from "../gashComps/deriveWatch";
	// import TopChoose from "../gashComps/topChoose";
	// import {
	// 	getTwistedEggInfo,
	// 	getSumByDate
	// } from "@/utils/api/orderShipment";
	// import {
	// 	getOrderSum,
	// 	getCoinSum,
	// 	getOutPresentSum,
	// } from "@/utils/api/orderShipment";
	// import {
	// 	getDateAll
	// } from "@/plugins/utilityClass";
	// import OMS from "@/plugins/tool";
	import {
		debounceFun,
		throttleFun
	} from "@/plugins/debounceOrthrottle";
	// import XLSX from 'xlsx';//注意版本-0.16.0
	// import { openDownloadDialog, sheet2blob} from './tableExls';

	export default {
		components: {
			// DeriveWatch,
			// TopChoose,
		},
		data() {
			return {
				dataList: [{
						count: 1371,
						tit: "合计投币(个)"
					},
					{
						count: 27.03,
						tit: "在线支付(元)"
					},
					{
						count: 144,
						tit: "出货总数"
					},
				],
				scrollLeft: 0,
				topTitle: false,
				//参数
				listType: 1,
				startTime: 0,
				endTime: 0,
				placeId: "",
				placeIds: null,
				//数据
				eggEarnMsg: {},
				eggRailList: [{
						"deviceNumber": "30000028",
						"shippingSpace": 1,
						"railNumber": 1,
						"railRepertory": 0,
						"railSpareRepertory": 0,
						"price": 0.01,
						"commercialNumber": "ZTWL_20220617111542006",
						"commodityId": 843,
						"commodityName": "K212",
						"placeName": "中土物联-513",
						"outPresentCount": 0,
						"outTokenCount": 0,
						"onlineOutTokenCount": 0,
						"offlineOutTokenCount": 0
					},
					{
						"deviceNumber": "30001270",
						"shippingSpace": 1,
						"railNumber": 31,
						"railRepertory": 0,
						"railSpareRepertory": 0,
						"price": 30,
						"commercialNumber": "ZTWL_20220617111542006",
						"commodityId": 843,
						"commodityName": "K212",
						"placeName": "中土物联-513",
						"outPresentCount": 0,
						"outTokenCount": 0,
						"onlineOutTokenCount": 0,
						"offlineOutTokenCount": 0
					},
					{
						"deviceNumber": "30001933",
						"shippingSpace": 1,
						"railNumber": 1,
						"railRepertory": 0,
						"railSpareRepertory": 0,
						"price": 0.02,
						"commercialNumber": "ZTWL_20220617111542006",
						"commodityId": 103,
						"commodityName": "测试",
						"placeName": "中土物联-513",
						"outPresentCount": 0,
						"outTokenCount": 0,
						"onlineOutTokenCount": 0,
						"offlineOutTokenCount": 0
					},
					{
						"deviceNumber": "30000522",
						"shippingSpace": 1,
						"railNumber": 1,
						"railRepertory": 0,
						"railSpareRepertory": 0,
						"price": 30,
						"commercialNumber": "ZTWL_20220617111542006",
						"commodityId": 467,
						"commodityName": "游戏币",
						"placeName": "中土515",
						"outPresentCount": 0,
						"outTokenCount": 0,
						"onlineOutTokenCount": 0,
						"offlineOutTokenCount": 0
					},
					{
						"deviceNumber": "30000522",
						"shippingSpace": 1,
						"railNumber": 2,
						"railRepertory": 3,
						"railSpareRepertory": 0,
						"price": 0.01,
						"commercialNumber": "ZTWL_20220617111542006",
						"commodityId": 467,
						"commodityName": "游戏币",
						"placeName": "中土515",
						"outPresentCount": 0,
						"outTokenCount": 0,
						"onlineOutTokenCount": 0,
						"offlineOutTokenCount": 0
					},
					{
						"deviceNumber": "30000522",
						"shippingSpace": 1,
						"railNumber": 3,
						"railRepertory": 0,
						"railSpareRepertory": 0,
						"price": 0.02,
						"commercialNumber": "ZTWL_20220617111542006",
						"commodityId": 103,
						"commodityName": "测试",
						"placeName": "中土515",
						"outPresentCount": 0,
						"outTokenCount": 0,
						"onlineOutTokenCount": 0,
						"offlineOutTokenCount": 0
					},
					{
						"deviceNumber": "30000522",
						"shippingSpace": 1,
						"railNumber": 4,
						"railRepertory": 0,
						"railSpareRepertory": 0,
						"price": 0.02,
						"commercialNumber": "ZTWL_20220617111542006",
						"commodityId": 103,
						"commodityName": "测试",
						"placeName": "中土515",
						"outPresentCount": 0,
						"outTokenCount": 0,
						"onlineOutTokenCount": 0,
						"offlineOutTokenCount": 0
					},
					{
						"deviceNumber": "30000522",
						"shippingSpace": 1,
						"railNumber": 5,
						"railRepertory": 0,
						"railSpareRepertory": 0,
						"price": 0.02,
						"commercialNumber": "ZTWL_20220617111542006",
						"commodityId": 103,
						"commodityName": "测试",
						"placeName": "中土515",
						"outPresentCount": 0,
						"outTokenCount": 0,
						"onlineOutTokenCount": 0,
						"offlineOutTokenCount": 0
					},
					{
						"deviceNumber": "30000522",
						"shippingSpace": 1,
						"railNumber": 6,
						"railRepertory": 0,
						"railSpareRepertory": 0,
						"price": 0.02,
						"commercialNumber": "ZTWL_20220617111542006",
						"commodityId": 103,
						"commodityName": "测试",
						"placeName": "中土515",
						"outPresentCount": 0,
						"outTokenCount": 0,
						"onlineOutTokenCount": 0,
						"offlineOutTokenCount": 0
					},
					{
						"deviceNumber": "30000522",
						"shippingSpace": 1,
						"railNumber": 7,
						"railRepertory": 0,
						"railSpareRepertory": 0,
						"price": 0.02,
						"commercialNumber": "ZTWL_20220617111542006",
						"commodityId": 103,
						"commodityName": "测试",
						"placeName": "中土515",
						"outPresentCount": 0,
						"outTokenCount": 0,
						"onlineOutTokenCount": 0,
						"offlineOutTokenCount": 0
					},
					{
						"deviceNumber": "30000522",
						"shippingSpace": 1,
						"railNumber": 8,
						"railRepertory": 0,
						"railSpareRepertory": 0,
						"price": 0.02,
						"commercialNumber": "ZTWL_20220617111542006",
						"commodityId": 103,
						"commodityName": "测试",
						"placeName": "中土515",
						"outPresentCount": 0,
						"outTokenCount": 0,
						"onlineOutTokenCount": 0,
						"offlineOutTokenCount": 0
					},
					{
						"deviceNumber": "30000653",
						"shippingSpace": 1,
						"railNumber": 1,
						"railRepertory": 0,
						"railSpareRepertory": 0,
						"price": 1,
						"commercialNumber": "ZTWL_20220617111542006",
						"commodityId": 1006,
						"commodityName": "72757-6 3款無殼扭蛋造型系列 之 迪士尼公主人偶 愛麗絲 奇妙仙子 貝兒公主異色版",
						"placeName": "1楼，测试",
						"outPresentCount": 0,
						"outTokenCount": 0,
						"onlineOutTokenCount": 0,
						"offlineOutTokenCount": 0
					},
					{
						"deviceNumber": "30000025",
						"shippingSpace": 1,
						"railNumber": 1,
						"railRepertory": 0,
						"railSpareRepertory": 1,
						"price": 0.01,
						"commercialNumber": "ZTWL_20220617111542006",
						"commodityId": 103,
						"commodityName": "测试",
						"placeName": "V0016售货机横屏工厂测试",
						"outPresentCount": 0,
						"outTokenCount": 0,
						"onlineOutTokenCount": 0,
						"offlineOutTokenCount": 0
					},
					{
						"deviceNumber": "30000028",
						"shippingSpace": 1,
						"railNumber": 1,
						"railRepertory": 0,
						"railSpareRepertory": 0,
						"price": 0.01,
						"commercialNumber": "ZTWL_20220617111542006",
						"commodityId": 843,
						"commodityName": "K212",
						"placeName": "中土物联-513",
						"outPresentCount": 0,
						"outTokenCount": 0,
						"onlineOutTokenCount": 0,
						"offlineOutTokenCount": 0
					},
					{
						"deviceNumber": "30001270",
						"shippingSpace": 1,
						"railNumber": 31,
						"railRepertory": 0,
						"railSpareRepertory": 0,
						"price": 30,
						"commercialNumber": "ZTWL_20220617111542006",
						"commodityId": 843,
						"commodityName": "K212",
						"placeName": "中土物联-513",
						"outPresentCount": 0,
						"outTokenCount": 0,
						"onlineOutTokenCount": 0,
						"offlineOutTokenCount": 0
					},
					{
						"deviceNumber": "30001933",
						"shippingSpace": 1,
						"railNumber": 1,
						"railRepertory": 0,
						"railSpareRepertory": 0,
						"price": 0.02,
						"commercialNumber": "ZTWL_20220617111542006",
						"commodityId": 103,
						"commodityName": "测试",
						"placeName": "中土物联-513",
						"outPresentCount": 0,
						"outTokenCount": 0,
						"onlineOutTokenCount": 0,
						"offlineOutTokenCount": 0
					},
					{
						"deviceNumber": "30000522",
						"shippingSpace": 1,
						"railNumber": 1,
						"railRepertory": 0,
						"railSpareRepertory": 0,
						"price": 30,
						"commercialNumber": "ZTWL_20220617111542006",
						"commodityId": 467,
						"commodityName": "游戏币",
						"placeName": "中土515",
						"outPresentCount": 0,
						"outTokenCount": 0,
						"onlineOutTokenCount": 0,
						"offlineOutTokenCount": 0
					},
					{
						"deviceNumber": "30000522",
						"shippingSpace": 1,
						"railNumber": 2,
						"railRepertory": 3,
						"railSpareRepertory": 0,
						"price": 0.01,
						"commercialNumber": "ZTWL_20220617111542006",
						"commodityId": 467,
						"commodityName": "游戏币",
						"placeName": "中土515",
						"outPresentCount": 0,
						"outTokenCount": 0,
						"onlineOutTokenCount": 0,
						"offlineOutTokenCount": 0
					},
					{
						"deviceNumber": "30000522",
						"shippingSpace": 1,
						"railNumber": 3,
						"railRepertory": 0,
						"railSpareRepertory": 0,
						"price": 0.02,
						"commercialNumber": "ZTWL_20220617111542006",
						"commodityId": 103,
						"commodityName": "测试",
						"placeName": "中土515",
						"outPresentCount": 0,
						"outTokenCount": 0,
						"onlineOutTokenCount": 0,
						"offlineOutTokenCount": 0
					},
					{
						"deviceNumber": "30000522",
						"shippingSpace": 1,
						"railNumber": 4,
						"railRepertory": 0,
						"railSpareRepertory": 0,
						"price": 0.02,
						"commercialNumber": "ZTWL_20220617111542006",
						"commodityId": 103,
						"commodityName": "测试",
						"placeName": "中土515",
						"outPresentCount": 0,
						"outTokenCount": 0,
						"onlineOutTokenCount": 0,
						"offlineOutTokenCount": 0
					},
					{
						"deviceNumber": "30000522",
						"shippingSpace": 1,
						"railNumber": 5,
						"railRepertory": 0,
						"railSpareRepertory": 0,
						"price": 0.02,
						"commercialNumber": "ZTWL_20220617111542006",
						"commodityId": 103,
						"commodityName": "测试",
						"placeName": "中土515",
						"outPresentCount": 0,
						"outTokenCount": 0,
						"onlineOutTokenCount": 0,
						"offlineOutTokenCount": 0
					},
					{
						"deviceNumber": "30000522",
						"shippingSpace": 1,
						"railNumber": 6,
						"railRepertory": 0,
						"railSpareRepertory": 0,
						"price": 0.02,
						"commercialNumber": "ZTWL_20220617111542006",
						"commodityId": 103,
						"commodityName": "测试",
						"placeName": "中土515",
						"outPresentCount": 0,
						"outTokenCount": 0,
						"onlineOutTokenCount": 0,
						"offlineOutTokenCount": 0
					},
					{
						"deviceNumber": "30000522",
						"shippingSpace": 1,
						"railNumber": 7,
						"railRepertory": 0,
						"railSpareRepertory": 0,
						"price": 0.02,
						"commercialNumber": "ZTWL_20220617111542006",
						"commodityId": 103,
						"commodityName": "测试",
						"placeName": "中土515",
						"outPresentCount": 0,
						"outTokenCount": 0,
						"onlineOutTokenCount": 0,
						"offlineOutTokenCount": 0
					},
					{
						"deviceNumber": "30000522",
						"shippingSpace": 1,
						"railNumber": 8,
						"railRepertory": 0,
						"railSpareRepertory": 0,
						"price": 0.02,
						"commercialNumber": "ZTWL_20220617111542006",
						"commodityId": 103,
						"commodityName": "测试",
						"placeName": "中土515",
						"outPresentCount": 0,
						"outTokenCount": 0,
						"onlineOutTokenCount": 0,
						"offlineOutTokenCount": 0
					},
					{
						"deviceNumber": "30000653",
						"shippingSpace": 1,
						"railNumber": 1,
						"railRepertory": 0,
						"railSpareRepertory": 0,
						"price": 1,
						"commercialNumber": "ZTWL_20220617111542006",
						"commodityId": 1006,
						"commodityName": "72757-6 3款無殼扭蛋造型系列 之 迪士尼公主人偶 愛麗絲 奇妙仙子 貝兒公主異色版",
						"placeName": "1楼，测试",
						"outPresentCount": 0,
						"outTokenCount": 0,
						"onlineOutTokenCount": 0,
						"offlineOutTokenCount": 0
					},
					{
						"deviceNumber": "30000025",
						"shippingSpace": 1,
						"railNumber": 1,
						"railRepertory": 0,
						"railSpareRepertory": 1,
						"price": 0.01,
						"commercialNumber": "ZTWL_20220617111542006",
						"commodityId": 103,
						"commodityName": "测试",
						"placeName": "V0016售货机横屏工厂测试",
						"outPresentCount": 0,
						"outTokenCount": 0,
						"onlineOutTokenCount": 0,
						"offlineOutTokenCount": 0
					}
				],
				//null
				noData: false,
				page: 0,
				onEarth: false,
			};
		},
		// created() {
		// 	this.getEarndata();
		// 	this.getAcount();
		// 	window.addEventListener("scroll", this.screenSlide);
		// },
		// beforeDestroy() {
		// 	window.removeEventListener("scroll", this.screenSlide);
		// },
		methods: {
			keepFixed(item) {
				return item > 10000 ? (item / 10000).toFixed(2) + "万" : item;
			},
			//数据转化
			changeData(data) {
				let placeList = [];
				let accountList = [];
				data.forEach((item) => {
					if (item.length) {
						item.forEach((element) => {
							if (element.placeName) {
								placeList.push(element);
							} else {
								accountList.push(element);
							}
						});
					}
				});
				let arrList = [];
				placeList.forEach((place) => {
					accountList.forEach((account) => {
						if (
							account.deviceNumber == place.deviceNumber &&
							account.railNumber == place.railNumber
						) {
							arrList.push(Object.assign(account, place));
						}
					});
				});
				return arrList;
			},
			//统计搜索
			getAcount() {
				//支付总数
				getOrderSum({
					startTime: `${this.startTime} 00:00:00`,
					endTime: `${this.endTime} 23:59:59`,
					placeId: this.placeIds,
				}).then((res) => {
					this.eggEarnMsg.onlinePayAmount = res.data.data ?
						res.data.data.orderMoney :
						0;
				});
				//投币总数
				getCoinSum({
					startTime: `${this.startTime} 00:00:00`,
					endTime: `${this.endTime} 23:59:59`,
					placeId: this.placeIds,
				}).then((res) => {
					this.eggEarnMsg.totalInsertCoins = res.data.data ?
						res.data.data.orderMoney :
						0;
				});
				//出礼总数
				getOutPresentSum({
					startTime: `${this.startTime} 00:00:00`,
					endTime: `${this.endTime} 23:59:59`,
					placeId: this.placeIds,
				}).then((res) => {
					this.eggEarnMsg.outPresentCount = res.data.data ?
						res.data.data.orderMoney :
						0;
				});
			},
			//营收数据
			getEarndata: debounceFun(async function(Msg) {
				if (Msg) {
					this.page = 0;
					this.onEarth = false;
					this.noData = false;
					this.startTime = Msg.startTime;
					this.endTime = Msg.endTime;
					this.placeId = Msg.placeId;
					console.log(Msg);
					this.placeIds = Msg.placeId.length ? Msg.placeId : null;
					this.getAcount();
				} else {
					this.placeId = "";
				}
				this.loading();
				if (this.listType == 1) {
					getTwistedEggInfo({
						page: ++this.page,
						size: 50,
						startTime: `${this.startTime} 00:00:00`,
						endTime: `${this.endTime} 23:59:59`,
						placeId: String(this.placeId),
					}).then((res) => {
						this.clearing();
						if (res.data.data != null) {
							if (res.data.data.length < 50) {
								this.onEarth = true;
							} else {
								this.onEarth = false;
							}
							if (this.page > 1) {
								this.eggRailList = [...this.eggRailList, ...res.data.data];
							} else {
								this.eggRailList = res.data.data;
								if (res.data.data.length) {
									this.noData = false;
								} else {
									this.noData = true;
								}
							}
						}
					});
				} else {
					getSumByDate({
						page: ++this.page,
						size: 50,
						startTime: `${this.startTime} 00:00:00`,
						endTime: `${this.endTime} 23:59:59`,
						placeId: this.placeIds,
					}).then((res) => {
						this.clearing();
						if (res.data.data != null) {
							if (res.data.data.length < 50) {
								this.onEarth = true;
							} else {
								this.onEarth = false;
							}
							if (this.page > 1) {
								this.eggRailList = [...this.eggRailList, ...res.data.data];
							} else {
								this.eggRailList = res.data.data;
								if (res.data.data.length) {
									this.noData = false;
								} else {
									this.noData = true;
								}
							}
						}
					});
				}
			}, 500),
			//按货道或日期
			aisleOrdate(params) {
				if (params) {
					this.listType = 2;
				} else {
					this.listType = 1;
				}
				this.page = 0;
				this.noData = false;
				this.onEarth = false;
				this.eggRailList = [];
				this.getEarndata();
			},
			//纵向
			screenSlide() {
				let scrollTop =
					document.documentElement.scrollTop ||
					document.body.scrollTop ||
					window.pageYOffset;
				var scrollHeight = document.documentElement.scrollHeight; // 元素高度
				var clientHeight = document.documentElement.clientHeight; // 视口高度
				if (scrollTop + clientHeight + 50 >= scrollHeight) {
					if (this.onEarth == false) {
						this.getEarndata();
					}
				}
				this.topTitle = scrollTop >= this.$refs.choose.scrollHeight + 48;
			},
			//横向滚动
			crossSlip(event) {
				this.scrollLeft = event.target.scrollLeft;
			},
			downloadExl() {
				this.$dialog
					.confirm({
						title: "温馨提示",
						message: `确定要导出当前${this.eggRailList.length}条订单记录?`,
						width: "280",
					})
					.then(() => {
						if (this.listType == 1) {
							OMS.downLoadXlsx({
								dom: "table-gash", //获取表格dom，然后拿出数据，所以我需要知道解析哪一个表格
								name: `扭蛋机-按货道_${getDateAll(0)}`, //excel名字
								ColumnWdth: [20, 30, 15, 15, 15, 15, 15, 20, 15, 30], //每一列的宽度，需要直接指定，接受数字
							});
						} else {
							OMS.downLoadXlsx({
								dom: "table-gash", //获取表格dom，然后拿出数据，所以我需要知道解析哪一个表格
								name: `扭蛋机-按日期_${getDateAll(0)}`, //excel名字
								ColumnWdth: [30, 20, 20, 20, 20], //每一列的宽度，需要直接指定，接受数字
							});
						}
					})
					.catch(() => {});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.xls-revenue-page {
		width: 100%;
		height: 100%;
		font-family: PingFangSC-Medium;
		position: relative;
		overflow-x: auto;
	}

	.lyyCell {
		background: #fff;

		.data-summary {
			background: #fff;
			overflow: auto;
			padding: 0 10px;

			.container {
				align-items: center;
				background: #5241ff;
				border-radius: 5px;
				display: flex;
				height: 63px;
				justify-content: space-around;
				margin: 14px 0 16px;
				text-align: center;

				.data-item {
					color: #fff;
					flex: 1;

					.data {
						font-size: 17px;
						font-weight: 500;
						line-height: 17px;
					}

					.title {
						font-size: 13px;
						font-weight: 400;
						line-height: 18px;
					}
				}
			}
		}

		.table-container {
			overflow-x: auto;
			box-sizing: content-box;
			width: 100%;
			position: relative;
			z-index: 1000;
			background: #fff;

			.loading {
				padding-left: 150px;
			}

			table {
				font-size: 14px;
				overflow: hidden;
				text-align: center;
				text-overflow: ellipsis;
				white-space: nowrap;
				width: 100%;
				border-collapse: collapse;
				border-spacing: 0;
				text-indent: initial;

				thead {
					background: #e6e4fe;
					font-size: 11px;

					th {
						height: 40px;
						margin-left: 20px;
						padding: 0 2px;
					}

					p {
						box-sizing: content-box;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}

					.desc {
						color: #ccc;
						font-size: 10px;
						text-align: center;
					}

					.txt-center {
						text-align: center;
					}
				}

				tbody {
					tr {
						border-bottom: 1px solid #e6e6e6;
						height: 40px;

						td {
							padding: 0 2px;

							span {
								display: inline-block;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
								font-size: 14px;
								font-family: PingFangSC-Regular;
							}

							.text-history {
								color: #f60;
								display: block !important;
								font-size: 10px;
								margin-top: -5px;
								text-align: center;
							}
						}
					}
				}
			}

			.thead-fixed {
				display: none;

				thead {
					position: fixed;
					top: 0;
					z-index: 99999;
				}
			}

			.show {
				display: block;
			}
		}

		.table-container::-webkit-scrollbar {
			display: none;
		}

		.data-table * {
			box-sizing: content-box;
		}

		.bottom-txt {
			line-height: 40px;
			text-align: center;
			font-size: 14px;
			background: #f5f6f7;
			color: #999;
		}
	}
</style>
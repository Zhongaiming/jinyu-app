<template>
	<u-popup :show="showPeople" mode="bottom" round="20" @close="() => {
		showPeople = false
	}" closeable>
		<view class="person-list">
			<span class="title">请选择分成人员</span>
			<xls-search placeholder="请输入场地名称" marLeft="-5.5em" @confirm="stratesSearch"></xls-search>
			<view class="list-content" v-if="searchBillList.length">
				<view class="item" v-for="(item, index) in searchBillList" :key="index" @click="pickerPerson(item)">
					<span class="person-name">{{ item.nickName}}
						<span class="person-phone">&nbsp;&nbsp;({{ item.username }})</span></span>
					<span>&gt;</span>
				</view>
				<view class="on-earth">到底了~</view>
			</view>
			<xls-empty v-else></xls-empty>
		</view>
	</u-popup>
</template>

<script>
	import {
		separateController
	} from '@/api/index.js';
	export default {
		data() {
			return {
				showPeople: false,
				searchBillList: [],
			}
		},
		mounted() {
			this.stratesSearch(null)
		},
		methods: {
			async stratesSearch(search) {
				let res = await separateController.getSeparatePerson({
					search: encodeURIComponent(search)
				});
				if (res.code == 200) {
					this.searchBillList = res.data;
				}
			},
			//选择分成人员
			pickerPerson(item) {
				this.showPeople = false;
				this.billsPeople = item.nickName;
				this.separateBillsId = item.id;
			},
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
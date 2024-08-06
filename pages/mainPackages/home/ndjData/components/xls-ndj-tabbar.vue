<template>
	<u-tabbar :value="value1" @change="change1" :fixed="false" :placeholder="false" :safeAreaInsetBottom="false">
		<u-tabbar-item text="首页" icon="home" @click="click1"></u-tabbar-item>
		<u-tabbar-item text="放映厅" icon="photo" @click="click1"></u-tabbar-item>
	</u-tabbar>
</template>

<script>
	export default {
		data() {
			return {
				value1: 0,
			}
		},
		methods: {
			click1(e) {
				console.log('click1', e);
			}
		}
	}
</script>

<style>
</style>
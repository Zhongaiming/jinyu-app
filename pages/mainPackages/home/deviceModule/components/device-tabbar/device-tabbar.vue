<template>
	<u-tabbar
		:value="value1"
		@change="change1"
		:fixed="false"
		:placeholder="false"
		:safeAreaInsetBottom="false"
	>
		<u-tabbar-item text="设备管理" icon="home" @click="click1" ></u-tabbar-item>
		<u-tabbar-item text="设备故障" icon="photo" @click="click1" ></u-tabbar-item>
	</u-tabbar>
</template>

<script>
	export default {
		name: 'tabbar',
	}
</script>

<style>
</style>
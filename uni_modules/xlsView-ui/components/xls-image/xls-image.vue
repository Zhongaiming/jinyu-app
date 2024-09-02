<template>
	<image :src="imageUrl" :mode="mode" class="className" @click="clickMethod"></image>
</template>

<script>
	export default {
		props: {
			src: {
				type: String,
				require: true
			},
			mode: {
				type: String,
				default: "widthFix",
			},
		},
		data() {
			return {
				imageUrl: ""
			}
		},
		mounted() {
			this.imageUrl = this.src;
			// #ifdef MP
			const url = this.imageUrl.replace('undefined', '');
			this.imageUrl = `${this.$baseUrl}${url}`;
			// #endif
		},
		methods: {
			clickMethod() {
				this.$emit('clickMethod');
			},
		}
	};
</script>

<style scoped>
	.className {
		width: inherit;
		height: inherit;
	}
</style>
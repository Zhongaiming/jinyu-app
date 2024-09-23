<template>
	<view class="xls-image" ref="box">
		<view :style="getStyle"></view>
		<img :src="src" alt="" />
	</view>
</template>

<script>
	export default {
		name: 'xls-image',
		props: {
			/**
			 * aspectFit: 保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。
			 * widthFix: 宽度不变，高度自动变化，保持原图宽高比不变。
			 * heightFix：高度不变，宽度自动变化，保持原图宽高比不变。
			 */
			mode: {
				type: String,
				default: 'aspectFit'
			},
			src: {
				type: String,
				require: true
			}
		},
		computed: {
			getStyle() {
				if (this.mode === 'aspectFit') {
					return {
						'background-image': `url(${this.src})`,
						'background-position': 'center center',
						'background-size': 'contain',
						'background-repeat': 'no-repeat'
					}
				}
			}
		},
		mounted() {

		},
		methods: {

			getWHLength() {
				this.getImageAspectRatio(this.src)
					.then(ratio => {
						console.log('长宽比:', ratio);
						const box = this.$refs.box;
						if (box) {
							const width = box.clientWidth;
							const height = box.clientHeight;
							console.log(`宽: ${width}px, 高: ${height}px`);
						} else {
							console.log('元素未找到');
						}
					})
					.catch(error => {
						console.error(error);
					});
			},

			getImageAspectRatio(src) {
				return new Promise((resolve, reject) => {
					const img = new Image();
					img.src = src;

					img.onload = () => {
						const aspectRatio = img.width / img.height;
						resolve(aspectRatio);
					};

					img.onerror = () => {
						reject('图片加载失败');
					};
				});
			},

		}
	}
</script>

<style scoped>
	.xls-image {
		width: 320px;
		height: 240px;
		display: inline-block;
		overflow: hidden;
		position: relative;
	}

	.xls-image div {
		width: 100%;
		height: 100%;
	}

	.xls-image img {
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-moz-user-select: none;
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0;
		width: 100%;
		height: 100%;
	}
</style>
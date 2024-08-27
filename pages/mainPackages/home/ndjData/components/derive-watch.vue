<template>
	<view class="deriveWatch">
		<!-- 数据渲染条件控制 -->
		<view class="content">
			<view class="main">
				<view class="iconBox">
					<view>
						<xls-image :src="`${$baseUrl}appV4/example/uncheck.png`" alt="" v-show="ischeck"
							@click="ischeck = !ischeck" class="image" />
						<xls-image :src="`${$baseUrl}appV4/example/check.png`" alt="" v-show="!ischeck"
							@click="ischeck = !ischeck" class="image" />
					</view>
					<span class="txt" @click="ischeck = !ischeck">{{ leftTit }}</span>

					<view class="position">
						<xls-image :src="`${$baseUrl}appV4/example/uncheck.png`" alt="" v-show="!ischeck"
							@click="ischeck = !ischeck" class="image" />
						<xls-image :src="`${$baseUrl}appV4/example/check.png`" alt="" v-show="ischeck"
							@click="ischeck = !ischeck" class="image" />
					</view>
					<span class="txt" @click="ischeck = !ischeck">{{ rightTit }}</span>
				</view>
				<!-- <view class="derive" @click="exportExel">导出</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "deriveWatch",
		props: {
			leftTit: {
				type: String,
				default: "按货道",
			},
			rightTit: {
				type: String,
				default: "按日期",
			},
		},
		data() {
			return {
				ischeck: false,
			};
		},
		watch: {
			ischeck(newV) {
				if (newV) {
					this.$emit("aisleOrdate", true);
				} else {
					this.$emit("aisleOrdate", false);
				}
			},
		},
		methods: {
			exportExel() {
				this.$emit("downloadExl");
			},
		},
	};
</script>

<style lang="scss" scoped>
	.deriveWatch {
		width: 100%;
	}

	.content {
		width: 100%;
		height: 47px;
		display: flex;
		align-items: center;
		justify-content: center;

		.main {
			width: 95%;
			display: flex;
			justify-content: space-between;

			.position {
				margin-left: 15%;
			}

			.iconBox {
				height: 25px;
				width: 60%;
				display: flex;
				align-items: center;
				font-size: 14px;

				.image {
					height: 17px;
					width: 17px;
					display: block;
				}

				.txt {
					line-height: 25px;
					margin-left: 3%;
				}
			}

			.derive {
				height: 25px;
				width: 60px;
				border: 1px solid #5241FF;
				color: #5241FF;
				font-size: 13px;
				font-weight: 400;
				border-radius: 6px;
				line-height: 25px;
				text-align: center;
			}
		}
	}
</style>
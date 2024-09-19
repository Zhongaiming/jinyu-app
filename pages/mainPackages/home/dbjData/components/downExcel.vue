<template>
	<!-- 导出数据 -->
	<u-popup :show="downloadEcexl" round="20" mode="center" @close="downloadEcexl = false">
		<view class="container-wrapper">
			<view class="title">导出数据</view>
			<view class="text-content">
				<view class="p-text">
					<span class="serial-number">1、</span>
					<span>“复制下载链接”可将下载链接分享出去，被分享人打开下载链接即可下载，链接15分钟内有效</span>
				</view>
				<view class="p-text">
					<span class="serial-number">2、</span>
					<span>下载文件需要一定时间，请耐心等候</span>
				</view>
				<view class="p-text">
					<span class="serial-number">3、</span>
					<span>更多详细数据，可登录PC端进行查询</span>
				</view>
			</view>
			<view class="share-btn">
				<!-- <view class="btn left">直接下载</view> -->
				<view class="btn right" @click="copyMemberId($parent.indexUrl)">复制下载链接</view>
			</view>
		</view>
	</u-popup>
</template>

<script>
	import {
		copyEvent
	} from "@/plugins/formUtils";
	export default {
		name: "downExcel",
		data() {
			return {
				downloadEcexl: false,
			};
		},
		methods: {
			copyMemberId(memberId) {
				copyEvent(memberId);
			},
		},
	};
</script>

<style lang="scss" scoped>
	/** 导出数据 */
	.container-wrapper {
		width: 280px;
		padding: 16px;

		.title {
			font-size: 16px;
			font-weight: 700;
			line-height: 40px;
			text-align: center;
		}

		.share-btn {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.btn {
				flex: 1;
				line-height: 42px;
				border: 1px solid #5241ff;
				border-radius: 8px;
				text-align: center;
				font-size: 15px;
				font-weight: 700;
			}

			.left {
				margin-right: 15px;
				color: #5241ff;
			}

			.right {
				background: #5241ff;
				color: #fff;
			}
		}

		.text-content {
			padding: 8px 0 24px;
			color: #848f99;
			font-size: 14px;
			line-height: 20px;
			text-align: justify;

			.p-text {
				padding-left: 20px;
				position: relative;

				.serial-number {
					position: absolute;
					top: 0;
					left: 0;
				}
			}
		}
	}
</style>
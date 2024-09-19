<template>
	<!-- 导出数据 -->
	<u-popup :show="downloadData" round="20" @close="downloadData = false" mode="center">
		<view class="container-wrapper">
			<view class="title">导出数据</view>

			<p class="text-content">
				{{ $parent.historyUrl }}
			</p>

			<view class="share-btn">
				<view class="btn right" @click="copyMemberId($parent.historyUrl)">
					一键复制
				</view>
			</view>
			<p class="desc">
				请复制此链接，然后在PC端浏览器打开，即可下载excel表到电脑上。（30分钟内有效）
			</p>
		</view>
	</u-popup>
</template>

<script>
	import {
		copyEvent
	} from "@/plugins/formUtils";
	export default {
		name: "downData",
		data() {
			return {
				downloadData: false,
			};
		},
		methods: {
			//copy
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
		padding: 20px;

		.title {
			font-size: 19px;
			font-weight: 700;
			text-align: center;
		}

		.share-btn {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.btn {
				flex: 1;
				line-height: 46px;
				border: 1px solid #5241ff;
				border-radius: 8px;
				text-align: center;
				font-size: 17px;
			}

			.right {
				background: #5241ff;
				color: #fff;
			}
		}

		.desc {
			color: #333;
			font-size: 13px;
			font-weight: 400;
			line-height: 18px;
			margin-top: 20px;
			text-align: justify;
		}

		.text-content {
			background: #f5f5f5;
			border-radius: 5px;
			height: 130px;
			margin: 20px 0;
			padding: 15px 8px;
			font-size: 15px;
			word-wrap: break-word;
			width: 100%;
			box-sizing: border-box;
			text-align: justify;
			overflow: scroll;
		}
	}
</style>
<template>
	<!-- 渠道认证 -->
	<view class="channelAttent">
		<xls-jy-navbar title="渠道认证" bgColor="#5241FF" titleStyle="color: #fff"></xls-jy-navbar>

		<view class="stay-attestation">
			<!-- 微信 -->
			<view class="screenshot-contanier">
				<view class="logo-index">
					<image :src="`${$baseUrl}appV4/authentications/svg/${parsms.url}`" alt="" class="image"
						mode="heightFix" />
				</view>
				<view class="main-wrapper">
					<view class="content-text">
						<view class="title" v-if="parsms.authorizeStatus == 2">
							待{{ parsms.merchantName }}实名认证{{ parsms.sort }}
						</view>
						<view class="title" v-else>已完成实名认证</view>
						<view class="content-block-guide">
							<view class="info">
								<span class="label">渠道商户号：</span>
								<view class="value value-plus">
									<view class="text text-over">
										{{ parsms.threePartnerNo }}
									</view>
									<view class="copy-box">
										<p class="copy-text" @click="copyEvent(parsms.threePartnerNo)">
											复制
										</p>
									</view>
								</view>
							</view>
							<view class="info">
								<span class="label">商户名称：</span>
								<span class="value"> {{ parsms.merchantName }} </span>
							</view>
							<view class="info">
								<span class="label">法人姓名：</span>
								<span class="value">{{ parsms.legalPerson }}</span>
							</view>
						</view>
					</view>
					<xls-merchant-state :state="parsms.state" v-if="parsms.state"></xls-merchant-state>
					<!-- 图片 -->
					<view class="picture__qrCode" v-else>
						<image
							:src="`${$baseUrl}appV4/authentications/svg/${parsms.appPayType==='ALIPAY' ? 'zfb-channel.png' : 'wx-channel.jpg'}`"
							alt="" />
					</view>
				</view>
			</view>

			<!-- 操作指南 -->
			<view class="tip-message">
				<view class="tip-message-inner" v-if="parsms.appPayType === 'WXPAY'">
					<view class="title">操作指南</view>
					<ul class="content">
						<li>
							<span class="space"></span>
							<span class="step">第一步：</span>
							<span class="name">点击“复制”按钮，复制您的商户号，以备后用。</span>
						</li>
						<li>
							<span class="space"></span>
							<span class="step">第二步：</span>
							<span class="name">长按二维码图案，弹出选项后，请选择“微信支付商家助手”，前往认证。</span>
						</li>
					</ul>
				</view>
				<view class="tip-message-inner" v-if="parsms.appPayType === 'ALIPAY'">
					<view class="title">操作指南</view>
					<ul class="content">
						<li>
							<span class="space"></span>
							<span class="step">第一步：</span>
							<span class="name">点击“复制”按钮，复制您的商户号，以备后用。</span>
						</li>
						<li>
							<span class="space"></span>
							<span class="step">第二步：</span>
							<span class="name">长按二维码图案，弹出选项后，请选择“保存到手机”。</span>
						</li>
						<li>
							<span class="space"></span>
							<span class="step">第三步：</span>
							<span class="name">打开支付宝，选择“扫一扫”扫描您上一步保存的二维码图片，前往认证。</span>
						</li>
					</ul>
				</view>
			</view>
		</view>
		<!-- 侧边新手指引 -->
		<xls-new-hand></xls-new-hand>
	</view>
</template>

<script>
	import xlsNewHand from "./components/xls-new-hand.vue";
	import xlsMerchantState from "./components/xls-merchant-state.vue";
	export default {
		components: {
			xlsNewHand,
			xlsMerchantState
		},
		data() {
			return {
				parsms: {
					id: 3,
					appPayType: 'ZFB',
					state: 1,
					threePartnerNo: '123456789',
					signName: '商户名称',
					legalPerson: '法人名称',
					url: 'zfb-pay.png',
					sort: '(一)'
				}
			};
		},
		onLoad(option) {
			console.log("传参", JSON.parse(option.params))
			this.parsms = JSON.parse(option.params).params;
		},
		methods: {
			copyEvent(copyValue) {
				// 手动创建 textarea 标签
				const textarea = document.createElement("textarea");
				// 将该 textarea 设为 readonly禁止输入 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
				textarea.readOnly = "readonly";
				textarea.style.position = "absolute";
				textarea.style.left = "-9999px";
				// 将要 copy 的值赋给 textarea 标签的 value 属性
				textarea.value = copyValue;
				// 将 textarea 插入到 body 中
				document.body.appendChild(textarea);
				// 选中值并复制
				textarea.select();
				document.execCommand("Copy");
				document.body.removeChild(textarea);
				this.$toast("复制成功");
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import 'index.scss';
</style>
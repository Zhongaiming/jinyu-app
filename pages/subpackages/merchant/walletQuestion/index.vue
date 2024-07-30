<template>
	<view class="xls-wallet-question">
		<xls-jy-navbar title="钱包的常见问题" bgColor="#f5f6f7"></xls-jy-navbar>

		<u-collapse :value="'1'" accordion>
			<u-collapse-item title="一、手续费怎么收？" name="1">
				<view class="collapse-content">
					<p>
						目前手续费按每一笔交易订单收取0.6%的手续费,每一笔手续费四舍五入精确到两位小数。单笔手续费不足0.01元的,统一按0.01元收取。
					</p>
					<p class="example">
						举例，以下是某商户同一天的收入，金额单位为元。
					</p>
					<table border="1" cellspacing="0">
						<thead>
							<tr>
								<th>在线支付金额</th>
								<th>应扣手续费</th>
								<th>实际扣除手续费</th>
								<th>实际到账金额</th>
								<th>合计到账金额</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>1</td>
								<td>0.006</td>
								<td>0.01</td>
								<td>0.99</td>
								<td rowspan="4">17.89</td>
							</tr>
							<tr>
								<td>2</td>
								<td>0.012</td>
								<td>0.01</td>
								<td>1.99</td>
							</tr>
							<tr>
								<td>5</td>
								<td>0.03</td>
								<td>0.03</td>
								<td>4.97</td>
							</tr>
							<tr>
								<td>10</td>
								<td>0.06</td>
								<td>0.06</td>
								<td>9.94</td>
							</tr>
						</tbody>
					</table>
				</view>
			</u-collapse-item>
			<u-collapse-item title="二、绑银行卡前的收益如何提现？" name="2">
				<view class="content">
					<p>提现步骤如下</p>
					<p>
						a、在管理后台点击【我的】-&gt;【钱包】-&gt;【立即提现】进入提现界面；
					</p>
					<p>b、输入提现金额,点击提现；</p>
					<p>
						c、提现成功后,资金立即到账关联的微信【钱包】里面,可在【微信支付】公众号收到到账提醒。
					</p>
				</view>
			</u-collapse-item>
			<u-collapse-item title="三、平台补贴怎么没有到我绑定的银行卡呢？" name="3">
				<view class="content">
					<p>
						平台补贴需要系统审核，审核通过后的隔日到账，目前需在平台管理后台-我的-钱包手动提现到关联的微信【钱包】里面。
					</p>
				</view>
			</u-collapse-item>
			<u-collapse-item title="四、平台账户余额的提现申请有什么条件?" name="4">
				<view class="content">
					<p>
						提现金额不得大于钱包余额,单笔提现不得小于1元,单笔单日限额20000元,每日提现次数不超过4次,不支持微信未实名认证用户。
					</p>
				</view>
			</u-collapse-item>
			<u-collapse-item title="五、钱包余额提现后，钱是直接打到我的银行卡吗？" name="5">
				<view class="content">
					<p>
						不是的，钱包余额提现的金额，直接到账您的微信零钱里。如遇微信处理延迟或其他原因，有可能导致提现不到账。请联系我们客服处理。
					</p>
				</view>
			</u-collapse-item>
		</u-collapse>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.collapse-content {
		.example {
			color: #1a1a1a;
		}

		table {
			text-align: center;
			border-collapse: collapse;
			border-spacing: 0;
			border-color: grey;
			color: #000;
		}
	}

	::v-deep .u-cell {
		background-color: #E6E4FE !important;
		color: #202020;
		font-size: 28rpx;
		font-weight: 700;
	}
</style>
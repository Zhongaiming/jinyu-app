<template>
	<view class="pro-content-26">
		<xls-jy-navbar title="实名认证" bgColor="#f5f6f7"></xls-jy-navbar>
		<view class="list-wrapper">
			<u-collapse :value="'1'" accordion>
				<u-collapse-item title="一、扫小程序码进去之后需要注册商户？ " name="1">
					<view class="example-detail">
						<!-- <view class="title">扫小程序进去之后需要注册商户？</view> -->
						<view class="sub-title">【 报错原因 】</view>
						<view class="text">
							您扫微信实名签约码的微信
							<span class="text-point">不是商户法人身份证绑定的微信</span> 。
						</view>
						<view class="img-wrapper">
							<image :src="`${$baseUrl}appV4/authentications/example/01.png`" alt="" class="img-style"
								mode="widthFix" />
						</view>
						<p class="sub-title">【 解决方案 】</p>
						<p class="text">
							1、绑卡时【商户类型】如果是【个人】，则用商户法人微信扫瞄微信实名签约码，即可正常进入微信实名页面进行后续操作。
						</p>
						<p class="text">
							2、绑卡时【商户类型】如果是【个体工商户/企业/党政、机关及事业单位/其他组织】，则用商户法人微信或联系人微信扫瞄微信实名签约码，即可正常进入微信实名页面进行后续操作。或者您拿到设备管理后台绑卡时所填写的资料，点击上图中的【开始注册】按钮进行资料填写。提交成功后再扫实名小程序码就可以关联出来待实名的商户号。
						</p>
					</view>
				</u-collapse-item>
				<u-collapse-item title="二、如何选择主体类型？ " name="2">
					<view class="example-detail">
						<!-- <view class="title">如何选择主体类型？</view> -->
						<view class="sub-title">【 说明 】</view>
						<p class="text">
							在设备后台绑卡时，【商户类型】有如下图所示几种类型，请选择相对应的“主体类型”。
							<br /><span class="text-point">
								切记“商户类型要选择正确，否则后面实名不了”
							</span>
							。
						</p>
						<view class="img-wrapper">
							<image :src="`${$baseUrl}appV4/authentications/example/02.png`" alt="" class="img-style"
								mode="widthFix" />
						</view>
					</view>
				</u-collapse-item>
				<u-collapse-item title="三、该主体已完成过商家注册，无需重复注册… " name="3">
					<view class="example-detail">
						<view class="title">
							该主体已完成过商家注册，无需重复注册，请撤销该申请单并联系管理员进行商户号授权，错误码：-9
						</view>
						<p class="sub-title">【 解决方法 】</p>
						<p class="text">
							出现这种提示请先点击弹框【我知道了】按钮，再点击左上角【首页】图标按钮，去撤销申请单。撤销之后去设备管理平台联系客服索要实名码，即可扫码进入实名操作页。
						</p>
						<view class="img-wrapper">
							<image :src="`${$baseUrl}appV4/authentications/example/03.png`" alt="" class="img-style"
								mode="widthFix" />
						</view>
					</view>
				</u-collapse-item>
				<u-collapse-item title="四、注册商户时提交资料失败，如何处理？ " name="4">
					<view class="example-detail">
						<view class="sub-title">【 解决方法 】</view>
						<p class="text">
							商户在“微信支付商家注册”页面提交资料的时候，无法提交（前提：确保提交的资料完全正确）。这种情况下请使用小程序重复操作三次，系统驳回三次后在小程序上有“人工审核”提交入口，通过【人工审核】来提交相关商户资料。请按照下图进行处理：
						</p>
						<image :src="`${$baseUrl}appV4/authentications/example/04.png`" alt="" class="img-style"
							mode="widthFix" />
					</view>
				</u-collapse-item>
				<u-collapse-item title="五、实名时找不到需要确认的商户号？ " name="5">
					<view class="example-detail">
						<view class="sub-title">【 解决方法 】</view>
						<p class="text">
							在下图所示页面中，核对签约的【商户名称】。 <br />
							1、若不正确，点击【商户名称】右边“箭头”进行切换。 <br />
							2、若正确，但没有找到正确的商户号，请【点击搜索】，直接搜索查询商户号。
						</p>
						<view class="img-wrapper">
							<image :src="`${$baseUrl}appV4/authentications/example/05.png`" alt="" class="img-style"
								mode="widthFix" />
						</view>
					</view>
				</u-collapse-item>
				<u-collapse-item title="六、已确认商户号过多，请稍后重试。错误码：-1  " name="6">
					<view class="example-detail">
						<p class="sub-title">【 解决方法 】</p>
						<p class="text">在实名过程中出现图中所示提示语（下图所示）,</p>
						<view class="img-wrapper">
							<image :src="`${$baseUrl}appV4/authentications/example/06-1.png`" alt="" class="img-style"
								mode="widthFix" />
						</view>
						<p class="text mg-t-24">
							请点击【01】页面下方的【查看已确认商户号】，进入【02】页面查看商户号关联列表。
							<br />
							1、若商户号已经关联了，即代表已经实名确认； <br />
							2、若没有关联则代表没有实名确认。 <br />
							需要实名的商户号没有在关联列表中，这时就需要商户将不用的一个商户号【取消关联】（
							<span class="text-point">切记此操作要谨慎</span> ）。 <br />
							然后再扫微信实名签约码进行实名操作。
						</p>
						<view class="img-wrapper">
							<image :src="`${$baseUrl}appV4/authentications/example/06-2.png`" alt="" class="img-style"
								mode="widthFix" />
						</view>
					</view>
				</u-collapse-item>
				<u-collapse-item title="七、该微信号质量偏低，请更换微信号重试 " name="7">
					<view class="example-detail">
						<p class="sub-title">【 解决方法 】</p>
						<p class="text">
							如扫描微信实名码出现下图提示页，请注册新的微信，且新注册的微信需要绑定个人身份证和银行卡。然后用新的微信扫描微信实名签约码进行实名确认。
						</p>
						<view class="img-wrapper">
							<image :src="`${$baseUrl}appV4/authentications/example/07.png`" alt="" class="img-style"
								mode="widthFix" />
						</view>
					</view>
				</u-collapse-item>
				<u-collapse-item title="八、我已经实名的商户号在哪里查看？ " name="8">
					<view class="example-detail">
						<p class="sub-title">【 解决方法 】</p>
						<p class="text">
							在下图中，点击【查看已确认商户号】入口，即可看到名下所有已经完成实名的商户号。
						</p>
						<view class="img-wrapper">
							<image :src="`${$baseUrl}appV4/authentications/example/06-2.png`" alt="" class="img-style"
								mode="widthFix" />
						</view>
					</view>
				</u-collapse-item>
			</u-collapse>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.pro-content-26 {
		background: #f6f6f6;
		width: 100%;
		height: 100vh;
		font-size: 28rpx;
		box-sizing: border-box;
		overflow-y: scroll;

		.list-wrapper {
			padding: 0 20rpx;
			position: relative;

			.example-detail {
				color: #333;

				.title {
					font-size: 36rpx;
					font-weight: 600;
					text-align: justify;
					padding-bottom: 20rpx;
					border-bottom: 2rpx solid #ebebeb;
				}

				.sub-title {
					font-size: 32rpx;
					font-weight: 600;
					margin-top: 20rpx;
				}

				.text {
					font-weight: 500;
					font-size: 28rpx;
					margin-top: 20rpx;
				}

				.text-point {
					color: #ff4747;
					font-weight: 700;
				}

				.img-wrapper {
					padding: 0 60rpx;
				}

				.img-style {
					margin-top: 40rpx;
					width: 100%;
				}
			}
		}
	}

	::v-deep .u-cell {
		background-color: #E6E4FE !important;
		color: #202020;
		font-size: 28rpx;
		font-weight: 700;
	}
</style>
<template>
	<u-popup :show="blackReason" round="20" mode="center">
		<view class="black-member black-detail black-reason">
			<view class="title-detail">加入黑名单</view>
			<view class="info-wapper">
				<view>
					<u-radio-group v-model="pickerReason" class="reason-group">
						<u-radio :name="item.id" checked-color="#5241FF" class="reason-radio-item"
							v-for="(item, index) in reasonList.slice(0, lengthAll)" :key="index"
							@change="remarks = item.resMsg" size="40" iconSize="32" activeColor="#5241FF"
							labelSize="28">{{ item.resTitle }}</u-radio>
					</u-radio-group>
					<p class="show-more" @click="lengthAll = reasonList.length" v-show="lengthAll == 6">
						查看更多&gt;&gt;
					</p>
					<textarea placeholder="请输入加入黑名单原因,限30字" v-model="remarks" class="area-content"
						:disabled="pickerReason != 10 "></textarea>
				</view>
			</view>
			<view class="btn-wrapper">
				<view class="btn" @click="blackReason = false">取消</view>
				<view class="btn comfirm-btn" @click="addBlackMember">确定</view>
			</view>
		</view>
	</u-popup>
</template>

<script>
	export default {
		data() {
			return {
				blackReason: false,
				pickerReason: 0,
				remarks: "",
				lengthAll: 6,
				reasonList: [{
						id: 1,
						resTitle: "恶意损坏",
						resMsg: "暴力使用，敲打，搬弄设备，导致设备系统故障或者受损行为。",
					},
					{
						id: 2,
						resTitle: "刷单/刷分/偷分",
						resMsg: "通过系统漏洞，规则漏洞，非法外挂，恶意刷单/刷分/偷分获取不当利益的行为。",
					},
					{
						id: 3,
						resTitle: "偷盗",
						resMsg: "通过不当操作，设备漏洞对设备内物品进行多拿，偷拿，盗取的行为。",
					},
					{
						id: 4,
						resTitle: "恶意捣乱",
						resMsg: "对设备规则以及游戏玩法不满，通过语言和行为阻挠场地正常经营的行为。",
					},
					{
						id: 5,
						resTitle: "恶意投诉",
						resMsg: "对消费和服务不满，为达到利益或情绪目的的不当投诉行为。",
					},
					{
						id: 6,
						resTitle: "恶意退款",
						resMsg: "消费后对消费不满进行物理退款，或者多次购买后又多次退款的无效消费行为。",
					},
					{
						id: 7,
						resTitle: "恶意兑换",
						resMsg: "通过兑换漏洞，规则漏洞，或者活动漏洞，进行多次兑换，造成经济损失的行为。",
					},
					{
						id: 8,
						resTitle: "态度恶劣",
						resMsg: "顾客再消费交流期间，存在肢体或语言冲突，态度较为恶劣的行为。",
					},
					{
						id: 9,
						resTitle: "恶意获利",
						resMsg: "通过软件外挂，物理外挂，系统漏洞，活动漏洞，获取不当利益的的行为。",
					},
					{
						id: 10,
						resTitle: "其他",
						resMsg: ""
					},
				],
			}
		},
		methods: {
			openPopup() {
				this.blackReason = !this.blackReason;
			},
			addBlackMember() {
				this.$emit('confirm', this.remarks)
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '../index.scss';
</style>
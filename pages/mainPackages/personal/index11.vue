<template>
迈尔斯迈大厨精心制作的“五谷大饼”和“绝味鸡汤”。
让彦祖吃到满满当当、舒舒服服的。
最终达成共识，彦祖不主动惹事，并且迈尔斯表示会给球队招募一个镇得住场子的球员。
俗称打手。
那还有什么好说的，彦祖点头如捣蒜。
谁没事喜欢打架的，安安静静打打球，到点打卡下班，不香吗？
事情谈妥，彦祖告别迈尔斯经理，分手离去。
夜幕降临。
金州开始显露她的繁花瑰丽。
某处高楼内的高级餐厅内。
灯光柔和没有刺眼的明亮，幽幽的月光透过高大的窗玻璃洒落，柔和的音乐从四周缓缓流入耳朵，置身其中不禁感受到旖旎的气息。
令人不自觉放松。
最后靠窗的角落位置。
一对帅哥美女正靠坐在一起，不时发出轻快而响亮的笑声。
仿佛要将周围的所有单身狗斩杀殆尽。
走进一看。
那帅哥身材异常高大，目测2米10多，上身穿着合身的
男孩身穿修身的西装，五官英俊，头发微微向后梳起。
他面前的餐盘里摆放着美味的意大利面，而女孩则身穿一袭优雅的晚礼服，长发披肩，眼中闪烁着调皮的光芒。
“你敢再加一点盐吗？”
女孩故作严肃地说道，指着男孩的盘子。
男孩抬头，嘴角勾起一抹玩味的笑容，“为什么？你觉得我的厨艺不够好吗？”
“当然！这是我亲自教你的！”
她假装生气，用叉子轻轻戳了戳他的手臂。
两人相视而笑，随即男孩迅速反击：“那就来试试，看谁的厨艺更好！”
他急忙抓住一根意大利面，轻轻在女孩的盘子里扒拉。
没想到，女孩机灵地闪开，结果面条竟然飞到了旁边的桌子上，引得几个食客惊讶地朝他们看去。
“看吧，我赢了！”男孩得意洋洋，双手叉着腰。
“哼，我不会就这样认输的！”
女孩决定反击，迅速用自己的叉子夹了一块香嫩的鸡肉，瞄准男孩的脸，
但又在最后一刻停了下来，故作神秘地问：“你觉得这一口是咸的还是甜的？”
男孩眯起眼睛，火速做出判断：“绝对是甜的——因为这是你做的。”
她忍不住笑出声，最后还是把鸡肉放回了盘子，不愿意真的将美味扔掉。
“你这人太狡猾了！”
女孩拨弄着自己的长发，心里却已经满是甜蜜。
两人的打闹在静谧中交织着温馨，让周遭的豪华环境显得格外平易近人。
此时此刻，他们只属于彼此。


	<view class="user">
		<jy-scroll :height="excludeNavbarHeight">
			<view class="user_bg">
				<view class="user_content">
					<u--image :showLoading="true" src="https://cdn.uviewui.com/uview/album/1.jpg" width="70px" height="70px" shape="circle"></u--image>
					<view class="right">
						<view style="flex: 1;display: flex;flex-direction: column;justify-content: space-between">
							<view>我是账号</view>
							<u-text size="23" :lines="2" text="我还不知道这里要放什么东西" style="margin-top: 15rpx;"></u-text>
						</view>
					</view>
				</view>
			</view>
			<view class="personal_cell">
				<u-cell-group :customStyle="{backgroundColor: '#ffffff',marginTop: '20rpx'}">
					<u-cell @click="goTo('aboutUs')":rightIconStyle="{fontSize: iconFontSize}" :isLink="true" size="large">
						<view slot="title" style="display: flex;align-items: center;">
							<u-image :src="require('../../../static/personal/aboutUs.png')" :height="iconFontSize" :width="iconFontSize"></u-image>
							<text class="u-cell-text">{{$t("personal.aboutUs")}}</text>
						</view>
					</u-cell>
					<u-cell @click="goTo('userTerms')" :rightIconStyle="{fontSize: iconFontSize}" :isLink="true" size="large">
						<view slot="title" style="display: flex;align-items: center;">
							<u-image :src="require('../../../static/personal/userTerms.png')" :height="iconFontSize" :width="iconFontSize"></u-image>
							<text class="u-cell-text">{{$t("personal.userTerms")}}</text>
						</view>
					</u-cell>
					<u-cell @click="goTo('version')" :rightIconStyle="{fontSize: iconFontSize}" :isLink="true" size="large">
						<view slot="title" style="display: flex;align-items: center;">
							<u-image :src="require('../../../static/personal/version.png')" :height="iconFontSize" :width="iconFontSize"></u-image>
							<text class="u-cell-text">{{$t("personal.version")}}</text>
						</view>
					</u-cell>
				</u-cell-group>
			
				<u-cell-group :customStyle="{backgroundColor: '#ffffff',marginTop: '20rpx'}">
					<u-cell @click="goTo('setting')" icon="setting" :rightIconStyle="{fontSize: iconFontSize}" size="large"
					:iconStyle="{color: '#78CDFF', fontSize: iconFontSize}" :title="$t('personal.setUp')" :isLink="true"></u-cell>
				</u-cell-group>
			</view>
		</jy-scroll>
	
		<jy-tabbar :selected="1"></jy-tabbar>
	</view>
</template>

<script>

	export default {
		components: {
		},
		data() {
			return {
				iconFontSize: '32rpx'
			}
		},
		methods: {
			layout() {
				this.$modal('确定要退出登录吗？').then(res => {
					removeToken()
					removeInfo()
					this.$goTo('/pages/loginAndReg/login', 'reLaunch')
				})
			},
			goTo(item) {
				console.log('点击', `/pages/subpackages/personal/${item}/index`)
				this.$goTo(`/pages/subpackages/personal/${item}/index`)
			}
		}
	}
</script>

<style scoped lang="scss">
.user_bg {
	background-color: #ffffff;
	height: 300rpx;
	position: relative;
	.user_content {
		width: 100%;
		display: flex;
		justify-content: space-between;
		position: absolute;
		bottom: 40rpx;
		left: 20rpx;
		right: 10rpx;
		.right {
			flex: 1;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-left: 30rpx;
			.layout_btn {
				width: 150rpx;
				margin-right: 40rpx;
				margin-left: 6rpx;
				font-size: 20rpx;
				// position: absolute;
				// right: 50rpx;
			}
		}
	}
}
.personal_cell {
	.u-cell-text {
		margin-left: 10rpx;
	}
}

</style>

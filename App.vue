<script>
	// #ifdef APP-PLUS
	import APPUpdate from '@/uni_modules/zhouWei-APPUpdate/js_sdk/appUpdate.js'
	// #endif
	// #ifdef H5
	import wx from "weixin-jsapi";
	import {
		baseController
	} from '@/api/index.js';
	// #endif
	export default {
		onLaunch: function() {
			// 微信公众号
			// #ifdef H5
			if (/MicroMessenger/.test(window.navigator.userAgent)) {
				this.getWxConfig();
			}
			// #endif
			// 动态菜单需要隐藏系统自带菜单
			// #ifdef APP-PLUS
			APPUpdate()
			uni.getPushClientId({
				success: (res) => {
					let push_clientid = res.cid
					console.log('客户端推送标识:', push_clientid)
				},
				fail(err) {
					console.log(err)
				}
			})
			uni.onPushMessage((res) => {
				console.log("收到推送消息：", res) //监听推送消息
			})

			// plus.push.addEventListener("click", function(msg) {
			// 	console.log(msg);
			// 	uni.switchTab({
			// 		url:'/pages/user/index'
			// 	})
			// }, false);
			// uni.getPushClientId({
			// 	success: res => {
			// 		console.log(res.cid);
			// 	}
			// })
			// this.getQuanxian()
			// #endif
		},
		onShow: function() {},
		onHide: function() {},
		methods: {
			//获取微信公众号权限
			async getWxConfig() {
				let address = window.location.href;
				let url = address.substring(0, address.indexOf("#"));
				let res = await baseController.getJsApi({
					url
				});
				const {
					appId,
					timestamp,
					nonceStr,
					signature
				} = res.data;
				wx.config({
					debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，
					// 可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: appId, // 必填，公众号的唯一标识
					timestamp: timestamp, // 必填，生成签名的时间戳
					nonceStr: nonceStr, // 必填，生成签名的随机串
					signature: signature, // 必填，签名，见附录1
					jsApiList: ["scanQRCode"],
				});
				wx.error(function(res) {
					// config信息验证失败会执行error函数，
					// 如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，
					// 也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
				});
			},
			getQuanxian() {
				let platform = uni.getSystemInfoSync().platform; //首先判断app是安卓还是ios
				console.log(platform);
				if (platform == "ios") { //这里是ios的方法
					console.log("我是iOS");
					var UIApplication = plus.ios.import("UIApplication");
					var app = UIApplication.sharedApplication();
					var enabledTypes = 0;
					if (app.currentUserNotificationSettings) {
						var settings = app.currentUserNotificationSettings();
						enabledTypes = settings.plusGetAttribute("types");
						console.log("enabledTypes1:" + enabledTypes);
						if (enabledTypes == 0) { //如果enabledTypes = 0 就是通知权限没有开启
							uni.showModal({
								title: '提示',
								content: '是否前往打开通知权限',
								success: res => {
									if (res.confirm) {
										this.openTongZhi()
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
							});
						} else {
							uni.showToast({
								title: '已开启',
								icon: "none"
							})
						}
					}
					plus.ios.deleteObject(settings);
				} else if (platform == "android") { //下面是安卓的方法
					console.log("我是安卓", plus.android);
					var main = plus.android.runtimeMainActivity();
					var pkName = main.getPackageName();
					var uid = main.getApplicationInfo().plusGetAttribute("uid");
					var NotificationManagerCompat = plus.android.importClass(
						"android.support.v4.app.NotificationManagerCompat"
					);
					//android.support.v4升级为androidx
					if (NotificationManagerCompat == null) {
						NotificationManagerCompat = plus.android.importClass(
							"androidx.core.app.NotificationManagerCompat"
						);
					}
					var areNotificationsEnabled =
						NotificationManagerCompat.from(main).areNotificationsEnabled();
					console.log(areNotificationsEnabled);
					// 未开通‘允许通知’权限，则弹窗提醒开通，并点击确认后，跳转到系统设置页面进行设置
					if (!areNotificationsEnabled) {
						this.tongzhi = true; //这里也一样未开启权限，弹出弹窗
					}
					if (areNotificationsEnabled) {
						uni.showToast({
							title: '已开启',
							icon: "none"
						})
					} else {
						uni.showModal({
							title: '提示',
							content: '是否前往打开通知权限',
							success: res => {
								if (res.confirm) {
									this.openTongZhi()
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
		background-color: #F6F6F6;
		font-family: "Microsoft JhengHei", "Microsoft YaHei";
	}

	/*每个页面公共css */
	/* 导入图标字体 */
	* {
		box-sizing: border-box;
		padding: 0;
		margin: 0;
		// direction: rtl;
	}

	.Center {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.text-over {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	// #ifdef H5
	uni-image {
		pointer-events: auto;
	}
	// #endif
	
	@import '@/uni_modules/uview-ui/index.scss';
	@import './static/styles/index.scss';
</style>
'use strict';  
const uniPush = uniCloud.getPushManager({  
appId: "__UNI__F2C6000"  
})

exports.main = async (event) => { 
	console.log('2222111', event)
	let obj = JSON.parse(event.body)  //这是重点 解析json字符串
			const res = await uniPush.sendMessage({  
			"push_clientid": obj.cids, // 设备id，支持多个以数组的形式指定多个设备，如["cid-1","cid-2"]，数组长度不大于1000  
			"title": obj.title, // 标题  
			"content": obj.content, // 内容  
			"payload": obj.data, // 数据  
			"force_notification": true, // 服务端推送 需要加这一句  
			"request_id": obj.request_id ,//请求唯一标识号，10-32位之间；如果request_id重复，会导致消息丢失  
			"options":obj.options //消息分类，没申请可以不传这个参数  
	})  
	return res;  
}

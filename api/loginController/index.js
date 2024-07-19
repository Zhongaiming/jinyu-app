import http from '../../core/http/index.js'
import api from "../serve.js";
let login = api.login;

export default class loginAndRegController {

	// 登录
	static loginXls(data) {
		return http.request({
			url: login + "/login",
			method: 'POST',
			data,
			custom: {
				header: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Access-Control-Allow-Origin': '*'
				}
			}
		})
	}
}
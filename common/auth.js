import cache from '@/common/cache.js'
import JSEncrypt from 'jsencrypt';

let TOKEN_KEY = "xlsV4_token"
let INFO_KEY = "xlsV4_info"
let PERMISSIONS_KEY = "xlsV4_permissions"
let LOGIN_KEY = "xlsV4_login"
let LOGIN_USERNAME = "xlsV4_username"
let LOGIN_PASSWORD = "xlsV4_password"
/**
 * 存储token
 */
export function getToken() {
	return cache.getCache(TOKEN_KEY)
}
export function setToken(data) {
	cache.setCache(TOKEN_KEY, data)
}
export function removeToken() {
	cache.removeCache(TOKEN_KEY)
}

/**
 * 存储用户信息
 */
export function getInfo() {
	return cache.getCache(INFO_KEY)
}
export function setInfo(data) {
	cache.setCache(INFO_KEY, data)
}
export function removeInfo() {
	cache.removeCache(INFO_KEY)
}

/**
 * 存储用户权限
 */
export function getPermissions() {
	return cache.getCache(PERMISSIONS_KEY)
}
export function setPermissions(data) {
	cache.setCache(PERMISSIONS_KEY, data)
}
export function removePermissions() {
	cache.removeCache(PERMISSIONS_KEY)
}

/**
 * 登录记住密码功能
 */
export function getLoginInfo() {
	return {
		username: decrypt(cache.getCache(LOGIN_USERNAME)),
		password: decrypt(cache.getCache(LOGIN_PASSWORD))
	}
}
export function setLoginInfo(username, password) {
	cache.setCache(LOGIN_USERNAME, encrypt(username))
	cache.setCache(LOGIN_PASSWORD, encrypt(password))
}
export function removeLoginInfo() {
	// cache.removeCache(LOGIN_USERNAME)
	cache.removeCache(LOGIN_PASSWORD)
}

const publicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCWw7XVChJzIwDPLCSdnnTDa2ukSRSZMkqveTaAMSiV/bA00WFYIcNL4S7l7UaB3+cFy+naZ7ll7uAkNOOqNrLpTeq9UFw3DWtG41NZU+eg/l/55SRx1JIGdOj+kkyEz0KrNY14ZCwfNPydf08D4/EZmUnP1lmYEHkyQpDSqEhl8wIDAQAB";
const privateKey = "MIICXQIBAAKBgQCWw7XVChJzIwDPLCSdnnTDa2ukSRSZMkqveTaAMSiV/bA00WFYIcNL4S7l7UaB3+cFy+naZ7ll7uAkNOOqNrLpTeq9UFw3DWtG41NZU+eg/l/55SRx1JIGdOj+kkyEz0KrNY14ZCwfNPydf08D4/EZmUnP1lmYEHkyQpDSqEhl8wIDAQABAoGABuIIeyFqljcS4mJxiYCidAmDcIyllBjnr/sosdGMuMxMLx0gBJYGBIDTU0vx3BwMwAb/NilmHXE6amy/uBWnNU2WWfwcit0HaPcj/qf7Nh7MhLZOoobXVvxn3NIXCGv/dPI07r0jxPFF91Mjfo1MocTbJblwDQCB2ePtfhQ/bAECQQDLby8Hwv1yhd9djyo7/Apdh/lOpe5XisKAeZG7WKHUrK6uaFqfG4nlYh0ZjAIXQI4xcVGGQspl2FLEVjVOUtqTAkEAvbiDHvh1BXt6z/OaN+59IU1vO9rZRA5L2Sdy1UEE8bKngjFbMl5v6rv9kKS+psUotiRAUPbECS+6CTvP2tuDIQJBAJNu2J6/af79louvneQrHTf7u2qMRtea8Ks7b6pe6anAHDi52DNHOgDLwlspZLqFRof+oB61eQmmZRV1hNxmn5ECQQC8H27dUe7vrb5c36gHWBN550eqKVsREcACJwzGCz/0znstLPXKHzyInTpUqBdoVM4GtjGUVuySU2H8b/Ouh8YhAkBsKXPcrjFqp055DHrBz8VicjD1bYFtqYVexyLm83MCVBSYFcgeKVC+z+DkG1LOJph08TIr+TBKNkDhJtTRwq0d";
// 解密
function decrypt(value) {
  const encrypt = new JSEncrypt();
  encrypt.setPrivateKey(privateKey);
  return encrypt.decrypt(value);
}
// 加密
function encrypt(value) {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);
  return encrypt.encrypt(value);
}


export {
	TOKEN_KEY,
	INFO_KEY,
	PERMISSIONS_KEY,
	LOGIN_KEY,
}
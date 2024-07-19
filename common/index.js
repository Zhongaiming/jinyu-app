import JSEncrypt from 'jsencrypt'
	
// 是否为空对象
export function isEmptyObject(object) {
	return Object.keys(object).length === 0
}
	
	
/**
 * 密码加密
 * @param {*} value 要加密的字符串
 */
const publicKey =
'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDJsM1FpsbLmYJFd6+N8iwCCIygO5+4ltkI9hYvbc3kTuj8Cgo/LrUrZUZejvGfiQMpFu7D6w7eanam6+EPKX4qmXK9hCxK/mHi9pthWBOzsvg1c0DRrbm+WVDu82rbfzyvCKez/+SSSLA+wtRoS+22Wd5MvQhkiqJarfAAPqqkPQIDAQAB';
	export function encrypt(value) {
	  if (value == null || value === '') return null;
	  const encrypt = new JSEncrypt();
	  encrypt.setPublicKey(publicKey);
	  return encodeURIComponent(encrypt.encrypt(value));
	}


/**
 * 生成随机数字
 */
export function getRandomNumber(max = 1000) {
	return Math.floor(Math.random() * max) + 1
}

/**
 * 小写字母装大写
 */
export function changeToUpperCase(value) {
	return value.toUpperCase()
}

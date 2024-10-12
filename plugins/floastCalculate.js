let _boundaryCheckingState = true; // 是否进行越界检查的全局开关

/**
 * 把错误的数据转正
 * @private
 * @example strip(0.09999999999999998)=0.1
 */
function strip(num, precision = 15) {
	return +parseFloat(Number(num).toPrecision(precision));
}

/**
 * Return digits length of a number
 * @private
 * @param {*number} num Input number
 */
function digitLength(num) {
	// Get digit length of e
	const eSplit = num.toString().split(/[eE]/);
	const len = (eSplit[0].split(".")[1] || "").length - +(eSplit[1] || 0);
	return len > 0 ? len : 0;
}

/**
 * 把小数转成整数,如果是小数则放大成整数
 * @private
 * @param {*number} num 输入数
 */
function float2Fixed(num) {
	if (num.toString().indexOf("e") === -1) {
		return Number(num.toString().replace(".", ""));
	}
	const dLen = digitLength(num);
	return dLen > 0 ? strip(Number(num) * Math.pow(10, dLen)) : Number(num);
}

/**
 * 检测数字是否越界，如果越界给出提示
 * @private
 * @param {*number} num 输入数
 */
function checkBoundary(num) {
	if (_boundaryCheckingState) {
		if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
			console.warn(`${num} 超出了精度限制，结果可能不正确`);
		}
	}
}

/**
 * 把递归操作扁平迭代化
 * @param {number[]} arr 要操作的数字数组
 * @param {function} operation 迭代操作
 * @private
 */
function iteratorOperation(arr, operation) {
	const [num1, num2, ...others] = arr;
	let res = operation(num1, num2);

	others.forEach((num) => {
		res = operation(res, num);
	});

	return res;
}

/**
 * 高精度乘法
 * @export
 */
export function times(...nums) {
	if (nums.length > 2) {
		return iteratorOperation(nums, times);
	}

	const [num1, num2] = nums;
	const num1Changed = float2Fixed(num1);
	const num2Changed = float2Fixed(num2);
	const baseNum = digitLength(num1) + digitLength(num2);
	const leftValue = num1Changed * num2Changed;

	checkBoundary(leftValue);

	return leftValue / Math.pow(10, baseNum);
}

/**
 * 高精度加法
 * @export
 */
export function plus(...nums) {
	if (nums.length > 2) {
		return iteratorOperation(nums, plus);
	}

	const [num1, num2] = nums;
	// 取最大的小数位
	const baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
	// 把小数都转为整数然后再计算
	return (times(num1, baseNum) + times(num2, baseNum)) / baseNum;
}

/**
 * 高精度减法
 * @export
 */
export function minus(...nums) {
	if (nums.length > 2) {
		return iteratorOperation(nums, minus);
	}

	const [num1, num2] = nums;
	const baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
	return (times(num1, baseNum) - times(num2, baseNum)) / baseNum;
}

/**
 * 高精度除法
 * @export
 */
export function divide(...nums) {
	if (nums.length > 2) {
		return iteratorOperation(nums, divide);
	}

	const [num1, num2] = nums;
	const num1Changed = float2Fixed(num1);
	const num2Changed = float2Fixed(num2);
	checkBoundary(num1Changed);
	checkBoundary(num2Changed);
	// 重要，这里必须用strip进行修正
	return times(
		num1Changed / num2Changed,
		strip(Math.pow(10, digitLength(num2) - digitLength(num1)))
	);
}

/**
 * 四舍五入
 * @export
 */
export function round(num, ratio) {
	const base = Math.pow(10, ratio);
	let result = divide(Math.round(Math.abs(times(num, base))), base);
	if (num < 0 && result !== 0) {
		result = times(result, -1);
	}
	// 位数不足则补0
	return result;
}

/**
 * 是否进行边界检查，默认开启
 * @param flag 标记开关，true 为开启，false 为关闭，默认为 true
 * @export
 */
export function enableBoundaryChecking(flag = true) {
	_boundaryCheckingState = flag;
}

export default {
	plus, //加
	minus, //减
	times, //乘
	divide, //除
	round,
	enableBoundaryChecking,
	add: plus,
	subtract: minus,
	multiply: times,
	divide: divide,
	addFloast: plus, //方案二 优先
	subFloast: minus,
	mulFloast: times,
	divFloast: divide,
	numToCapital,
	toChinesNum,
	changeNumToHan,
	formatAmount,
};

//数字转中文
export function toChinesNum(num) {
	let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
	let unit = ['', '十', '百', '千', '万']
	num = parseInt(num)
	let getWan = (temp) => {
		let strArr = temp.toString().split('').reverse()
		let newNum = ''
		let newArr = []
		strArr.forEach((item, index) => {
			newArr.unshift(item === '0' ? changeNum[item] : changeNum[item] + unit[index])
		})
		let numArr = []
		newArr.forEach((m, n) => {
			if (m !== '零') numArr.push(n)
		})
		if (newArr.length > 1) {
			newArr.forEach((m, n) => {
				if (newArr[newArr.length - 1] === '零') {
					if (n <= numArr[numArr.length - 1]) {
						newNum += m
					}
				} else {
					newNum += m
				}
			})
		} else {
			newNum = newArr[0]
		}
		return newNum
	}
	let overWan = Math.floor(num / 10000)
	let noWan = num % 10000
	if (noWan.toString().length < 4) {
		noWan = '0' + noWan
	}
	return overWan ? getWan(overWan) + '万' + getWan(noWan) : getWan(num)
}

export function changeNumToHan(num) {
	var arr1 = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
	var arr2 = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万', '十', '百', '千', '亿']
	if (!num || isNaN(num)) return '零'
	var english = num.toString().split('')
	var result = ''
	for (var i = 0; i < english.length; i++) {
		var des_i = english.length - 1 - i // 倒序排列设值
		result = arr2[i] + result
		var arr1_index = english[des_i]
		result = arr1[arr1_index] + result
	}
	result = result.replace(/零(千|百|十)/g, '零').replace(/十零/g, '十') // 将【零千、零百】换成【零】 【十零】换成【十】
	result = result.replace(/零+/g, '零') // 合并中间多个零为一个零
	result = result.replace(/零亿/g, '亿').replace(/零万/g, '万') // 将【零亿】换成【亿】【零万】换成【万】
	result = result.replace(/亿万/g, '亿') // 将【亿万】换成【亿】
	result = result.replace(/零+$/, '') // 移除末尾的零
	// 将【一十】换成【十】
	result = result.replace(/^一十/g, '十')
	return result
}

//阿拉伯数字转大写，整数转大写
const numToCapital = (num, type = '') => {
	if (!num) return 0
	const strNum = Number((num + '').replace(/[,，]*/g, '')) + '' // 记录字符
	num = parseInt(Number(strNum)) // 转为整数，
	let capitalAr = '零一二三四五六七八九十'
	let unitAr = ['十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千']
	if (type) {
		capitalAr = '零壹贰叁肆伍陆柒捌玖拾'
		unitAr = ['拾', '佰', '仟', '万', '拾', '佰', '仟', '亿', '拾', '佰', '仟'] // 单位
	}
	const resultAr = [] // 记录结果，后边json.in就可
	let index = strNum.length - 1 //记录位数
	let idx = 0 // 记录单位
	let percent = 10
	const turnNum = (num, percent, index) => {
		const unit = num / percent
		const capital = capitalAr[Number(strNum[index])]
		if (unit < 1) {
			resultAr.push(capital)
			// 出现11【一十一】这种情况
			if (Number(strNum[index]) === 1 && (strNum.length === 2 || strNum.length === 6 || strNum.length ===
					10)) {
				resultAr.pop()
			}
			return false //结束递归
		} else {
			if (capital === '零') {
				// 万和亿单位不删除
				if (!['万', '亿'].includes(resultAr[resultAr.length - 1])) {
					resultAr.pop()
				}
				// 前面有零在删掉一个零
				if (resultAr[resultAr.length - 1] === '零') {
					resultAr.pop()
				}
			}
			resultAr.push(capital)
			// 过滤存在【零万】【零亿】这种情况
			if (['万', '亿'].includes(resultAr[resultAr.length - 2]) && capital === '零') {
				resultAr.pop()
			}
			// 过滤【1亿万】这种情况
			if (resultAr[0] === '万' && resultAr[1] === '亿') {
				resultAr.shift()
			}
			// 末尾【零】删掉
			if (resultAr[0] === '零') {
				resultAr.pop()
			}
			resultAr.push(unitAr[idx++])
			turnNum(num, percent * 10, --index)
		}
	}
	turnNum(num, percent, index)
	return resultAr.reverse().join('')
}

// 壹拾伍亿壹仟贰佰叁拾肆万伍仟陆佰柒拾贰

/**
 * 格式化金额为保留两位小数的字符串
 * @param {number|string} amount - 输入的金额
 * @returns {string} - 格式化后的金额
 */
function formatAmount(amount) {
	// 将输入的金额转换为浮点数
	const num = parseFloat(amount);

	// 如果转换失败，则返回 '0.00'
	if (isNaN(num)) {
		return '0.00';
	}

	// 使用 toFixed 方法保留两位小数
	return num.toFixed(2);
}
/**
 * 原因分析：
 * 0.1 + 0.2 = 0.30000000000000004。
 * 计算精度误差问题（和二进制相关）
 * 0.1 转二进制 无限循环 
 * 双精度浮点数的小数部分最多支持 52 位
 * 因浮点数小数位的限制而截断的二进制数字造成误差
 */

/*
 * 判断obj是否为一个整数
 */
function isInteger(obj) {
    return Math.floor(obj) === obj
}

/*
 * 将一个浮点数转成整数，返回整数和倍数。如 3.14 >> 314，倍数是 100
 * @param floatNum {number} 小数
 * @return {object}
 *   {times:100, num: 314}
 */
function toInteger(floatNum) {
    var ret = { times: 1, num: 0 };
    if (isInteger(floatNum)) {
        ret.num = floatNum;
        return ret
    }
    var strfi = floatNum + '';
    var dotPos = strfi.indexOf('.');
    var len = strfi.substr(dotPos + 1).length;
    var times = Math.pow(10, len);
    var intNum = parseInt(floatNum * times + 0.5, 10);
    ret.times = times;
    ret.num = intNum;
    return ret
}

/*
 * 核心方法，实现加减乘除运算，确保不丢失精度
 * 思路：把小数放大为整数（乘），进行算术运算，再缩小为小数（除）
 *
 * @param a {number} 运算数1
 * @param b {number} 运算数2
 * @param op {string} 运算类型，有加减乘除（add/subtract/multiply/divide）
 *
 */
function operation(a, b, op) {
    var o1 = toInteger(a);
    var o2 = toInteger(b);
    var n1 = o1.num;
    var n2 = o2.num;
    var t1 = o1.times;
    var t2 = o2.times;
    var max = t1 > t2 ? t1 : t2;
    var result = null;
    switch (op) {
        case 'add':
            if (t1 === t2) { // 两个小数位数相同
                result = n1 + n2
            } else if (t1 > t2) { // o1 小数位 大于 o2
                result = n1 + n2 * (t1 / t2)
            } else { // o1 小数位 小于 o2
                result = n1 * (t2 / t1) + n2
            }
            return result / max;
        case 'subtract':
            if (t1 === t2) {
                result = n1 - n2
            } else if (t1 > t2) {
                result = n1 - n2 * (t1 / t2)
            } else {
                result = n1 * (t2 / t1) - n2
            }
            return result / max;
        case 'multiply':
            result = (n1 * n2) / (t1 * t2);
            return result;
        case 'divide':
            result = (n1 / n2) * (t2 / t1);
            return result
    }
}

// 加 有误差了 -7.36 + 0.02 = -7.32 bug
// function add(a, b) {
//     return operation(a, b, 'add')
// }
function add(a, b) {
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (mulFloast(a, e) + mulFloast(b, e)) / e;
}
// 减
function subtract(a, b) {
    return operation(a, b, 'subtract')
}
// 乘
function multiply(a, b) {
    return operation(a, b, 'multiply')
}
// 除
function divide(a, b) {
    return operation(a, b, 'divide')
}

export default {
    add,
    subtract,
    multiply,
    divide,
    addFloast,//方案二 更准确
    subFloast,
    mulFloast,
    divFloast,
    numToCapital,
    toChinesNum,
    changeNumToHan,
	formatAmount,
}

/*
 * @param a {number} 运算数1
 * @param b {number} 运算数2
 */
// 精确运算 加
function addFloast(a, b) {
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (mulFloast(a, e) + mulFloast(b, e)) / e;
}

// 精确运算 减
function subFloast(a, b) {
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (mulFloast(a, e) - mulFloast(b, e)) / e;
}

// 精确运算 乘
function mulFloast(a, b) {
    var c = 0,
        d = a.toString(),
        e = b.toString();
    try {
        c += d.split(".")[1].length;
    } catch (f) { }
    try {
        c += e.split(".")[1].length;
    } catch (f) { }
    return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
}

// 精确运算 除
function divFloast(a, b) {
    var c, d, e = 0,
        f = 0;
    try {
        e = a.toString().split(".")[1].length;
    } catch (g) { }
    try {
        f = b.toString().split(".")[1].length;
    } catch (g) { }
    return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), mulFloast(c / d, Math.pow(10, f - e));
}

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
        var des_i = english.length - 1 - i// 倒序排列设值
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
            if (Number(strNum[index]) === 1 && (strNum.length === 2 || strNum.length === 6 || strNum.length === 10)) {
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
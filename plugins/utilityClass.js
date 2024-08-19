
/**
 * 获取当前月天数
 * @param {String} year 年份
 * @param {String} month 月份
 */
export const getMonthNum = (month) => {
    let year = new Date().getFullYear()
    var d = new Date(year, month, 0)
    return d.getDate()
}

//往前往后多少天
export function getDateAll(elm) {
    function getDay(num, str) {
        var today = new Date();
        var nowTime = today.getTime();
        var ms = 24 * 3600 * 1000 * num;
        today.setTime(parseInt(nowTime + ms));
        var oYear = today.getFullYear();
        var oMoth = (today.getMonth() + 1).toString();
        if (oMoth.length <= 1) oMoth = '0' + oMoth;
        var oDay = today.getDate().toString();
        if (oDay.length <= 1) oDay = '0' + oDay;
        return oYear + str + oMoth + str + oDay;
    }
    var chooseData = getDay(-elm, '-'); //-1 代表前一天，-2前两天...
    return chooseData
}


//获取上周起始时间结束时间、下周起始时间结束时间开始时间和本周起始时间结束时间;（西方）
export function getTime(n) {
    var now = new Date();
    var year = now.getFullYear();
    //因为月份是从0开始的,所以获取这个月的月份数要加1才行
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var day = now.getDay();
    //判断是否为周日,如果不是的话,就让今天的day-1(例如星期二就是2-1)
    if (day !== 0) {
        n = n + (day - 1);
    } else {
        n = n + day;
    }
    if (day) {
        //这个判断是为了解决跨年的问题
        if (month > 1) {
            month = month;
        }
        //这个判断是为了解决跨年的问题,月份是从0开始的
        else {
            year = year - 1;
            month = 12;
        }
    }
    now.setDate(now.getDate() - n);
    year = now.getFullYear();
    month = now.getMonth() + 1;
    date = now.getDate();
    var s = year + "-" + (month < 10 ? ('0' + month) : month) + "-" + (date < 10 ? ('0' + date) : date);
    return s;
}

//参数都以周一为基准的
//上周的开始时间
// console.log(getTime(7));
//上周的结束时间
// console.log(getTime(1));
//本周的开始时间
// console.log(getTime(0));
//本周的结束时间
// console.log(getTime(-6));
//下周的开始时间
// console.log(getTime(-7));
//下周结束时间
// console.log(getTime(-13));

//时间戳


//转换成时间戳
export function getTimestamp(tamp) {
    return new Date(tamp).getTime()
    // var timestamp2 = Date.parse(new Date(start_time))
    //var timestamp = (new Date()).valueOf();
}

//时间戳转时间
export function format(dataString, type = 'year') {
    //dataString是整数，否则要parseInt转换
    var time = new Date(dataString);
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var day = time.getDate();
    var hour = time.getHours();
    var minute = time.getMinutes();
    var second = time.getSeconds();
	if(type === 'year') return year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day)
    return year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day) + ' ' + (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute) + ':' + (second < 10 ? '0' + second : second)
}
//时间戳时间差
export function calculateDiffTime(start_time, end_time) {
    var startTime = 0, endTime = 0
    if (start_time < end_time) {
        startTime = start_time
        endTime = end_time
    } else {
        startTime = end_time
        endTime = start_time
    }
    var timeDiff = (endTime - startTime) / 1000
    //计算天数
    // var year = Math.floor(timeDiff / 86400 / 365);
    // timeDiff = timeDiff % (86400 * 365);
    // var month = Math.floor(timeDiff / 86400 / 30);
    // timeDiff = timeDiff % (86400 * 30);
    // var day = Math.floor(timeDiff / 86400);
    // timeDiff = timeDiff % 86400;
    // var hour = Math.floor(timeDiff / 3600);
    // timeDiff = timeDiff % 3600;
    // var minute = Math.floor(timeDiff / 60);
    // timeDiff = timeDiff % 60;
    // var second = timeDiff;
    // return [year, month, day, hour, minute, second]
    var hour = Math.floor(timeDiff / 3600);
    timeDiff = timeDiff % 3600;
    var minute = Math.floor(timeDiff / 60);
    timeDiff = timeDiff % 60;
    var second = timeDiff;
    return [hour, minute, second]
}


export function UTCformat(utc) {
    var date = new Date(utc),
        year = date.getFullYear(),
        month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + parseInt(date.getMonth() + 1),
        day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate(),
        hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours(),
        minutes = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes(),
        seconds = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds();
    var res = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
    return res;
}

// 将2021-10-14T03:32:00.000+00:00转换成当前日期 差8个小时
// 输出的是：2021-10-14 11:30:01 格式

export function renderTime(date) {
    var dateee = new Date(date).toJSON();
    return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
}

/**
 * @description 获取当前时间
 * @return string
 */
export function getTimeState() {
    // 获取当前时间
    let timeNow = new Date();
    // 获取当前小时
    let hours = timeNow.getHours();
    // 判断当前时间段
    if (hours >= 0 && hours <= 6) return `凌晨好，别熬夜了！🌛`;
    if (hours >= 6 && hours <= 9) return `早上好，开始美好的一天！⛅`;
    if (hours >= 9 && hours <= 12) return `上午好，加油工作！⛅`;
    if (hours >= 12 && hours <= 14) return `中午好，吃好休息好！🌞`;
    if (hours >= 14 && hours <= 18) return `下午好，继续努力工作！🌞`;
    if (hours >= 18 && hours <= 24) return `晚上好，放松心情！🌛`;
}
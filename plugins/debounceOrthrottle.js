
/**
 * 定义防抖函数
 * fu：传入一个函数，事件不再持续触发时会调用该函数
 * delay:定义持续多久后执行传入的回调函数
 */
export function debounceFun(fn, delay) {
    var delay = delay || 200;
    var timer;
    return function () {
        var th = this;
        var args = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            timer = null;
            // fn.apply(this, arguments) JavaScript 中的一个函数调用方式，用于调用函数 fn 并指定函数内部的 this 值和参数列表
            // 将 this 设置为 person 对象，参数列表为 ['Hello'] person = { name: 'xxx' }
            // greet.apply(person, ['Hello']); 变体 call()
            fn.apply(th, args);
        }, delay);
    };
}

/**
 * 定义节流函数
 * 在事件持续触发的前提下，保证一定时间段内只调用一次事件处理函数
 */
export function throttleFun(fn, interval) {
    var last;
    var timer;
    var interval = interval || 200;
    return function () {
        var th = this;
        var args = arguments;
        var now = +new Date();
        if (last && now - last < interval) {
            clearTimeout(timer);
            timer = setTimeout(function () {
                last = now;
                fn.apply(th, args);
            }, interval);
        } else {
            last = now;
            fn.apply(th, args);
        }
    }
}

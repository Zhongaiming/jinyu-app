
var vueMoves = true;
var vueLeave = true;
var longTouch = true;
var vueTouches = { x: 0, y: 0 };
var time;
var touchType;
var resultMethod;

function vueCallBack() {
    if (resultMethod) {
        resultMethod(touchType);
    }
}

export function startMethod(e) {
    vueMoves = true;
    vueLeave = true;
    longTouch = true;
    vueTouches = { x: e.changedTouches[0].pageX, y: e.changedTouches[0].pageY };
    time = setTimeout(() => {
        if (vueLeave && vueMoves) {
            // 长按
            touchType = "longtap";
            longTouch = false;
            vueCallBack();
        };
    }, 1000);
}

export function moveMethod(e) {
    vueMoves = false;
}

export function endMethod(e, fu) {
    var disX = e.changedTouches[0].pageX - vueTouches.x;
    var disY = e.changedTouches[0].pageY - vueTouches.y;
    resultMethod = fu;
    clearTimeout(time);
    if (Math.abs(disX) > 10 || Math.abs(disY) > 100) {
        // 滑动    
        if (Math.abs(disX) > Math.abs(disY)) {
            if (disX > 10) {
                // 右滑
                touchType = "swiperight";
                vueCallBack();
            };
            if (disX < -10) {
                // 左滑
                touchType = "swipeleft";
                vueCallBack();
            };
        } else {
            if (disY > 10) {
                // 下滑
                touchType = "swipedown";
                vueCallBack();
            };
            if (disY < -10) {
                // 上滑
                touchType = "swipeup";
                vueCallBack();
            };
        };
    } else {
        if (longTouch && vueMoves) {
            // 点击
            touchType = "tap";
            vueCallBack();
            vueLeave = false
        };
    };
};

/**
 * 
 * import {
    startMethod,
    moveMethod,
    endMethod,
   } from "@/directive/touch/touchClass";
    Vue 的模板（template）中是无法直接调用 JavaScript 模块中的方法的。
    模板只用于渲染视图，不直接与 JavaScript 模块进行交互。
 * @touchstart="startTouch" 
 * @touchmove="moveTouch" 
 * @touchend="endTouch"
 * 
 *  startTouch(e) {
 *    startMethod(e);
 *   },
 *
 *  moveTouch(e) {
 *    moveMethod(e);
 *  },
 *
 *  endTouch(e) {
 *    endMethod(e, (params) => {
 *      console.log("参数", params)
 *    });
 *  },
 * 
 * */ 
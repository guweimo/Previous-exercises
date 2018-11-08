
// 浏览器检测
(function(){
    window.sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.match(/msie ([\d.]+)/)) ? sys.ie = s[1] :
    (s = ua.match(/firefox\/([\d.]+)/)) ? sys.firefox = s[1] :
    (s = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = s[1] :
    (s = ua.match(/opera\/.*version\/([\d.]+)/)) ? sys.opera = s[1] :
    (s = ua.match(/version\/([\d.]+).*safari/)) ? sys.safari = s[1] : 0;

    if (/webkit/.test(ua)) sys.webkit = ua.match(/webkit\/([\d]+)/)[1];
})();

// DOm加载
function addDomLoaded(fn) {
    var isReady = false;
    var timer = null;
    function doReady() {
        if (timer) clearInterval(timer);
        if (isReady) return;
        isReady = true;
        fn();
    }
    
    if ((sys.opera && sys.opera < 9) || (sys.firefox && sys.firefox < 3) || (sys.webkit && sys.webkit < 525)){
        /*timer = setInterval(function() {
            if(/loaded|complete/.test(document.readyState)) {
                doReady(fn);
            }
        }, 1);*/

        timer = setInterval(function () {
            if (document && document.getElementById && document.getElementsByTagName && document.body && document.getElementsByClassName){
                doReady();
            }
        }, 1);
    } else if (document.addEventListener) {
        addEvent(document, 'DOMContentLoaded', function(){
            fn();
            removeEvent(document, 'DOMContentLoaded', arguments.callee);
        });
    } else if (sys.ie && sys.ie < 9) {
        var timer = null;
        timer = setInterval(function() {
            try{
                document.documentElement.doScroll('left');
                doReady();
            } catch (e) {};
        }, 1); 
    }
}



function getInner() {
    if (typeof window.innerWidth != 'undefined') {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    } else {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    }
}

// 阻止默认行为
function preDef(event) {
    var e = event || window.event;
    if (typeof e.preventDefault != 'undefined'){
        e.preventDefault();
    } else {
        e.returnValue = false;
    }
}

function getStyle(element, attr) {
    var value;
    if (typeof window.getComputedStyle != 'undefined') {
        value = window.getComputedStyle(element, null)[attr];
    } else if (typeof element.currentStyle != 'undefined') {
        value = element.currentStyle[attr];
    }
    return value;
}


// 跨浏览器事件绑定
function addEvent(obj, type, fn) {
    if (typeof obj.addEventListener != 'undefined') {
        obj.addEventListener(type, fn, false);
    }else {
        // 创建一个存放事件的哈希表（散列表）
        if(!obj.events) obj.events = {};
        // 第一次执行时执行
        if (!obj.events[type]){
            // 创建一个存放事件处理函数的数组
            obj.events[type] = [];
            // 把第一次的事件处理函数先储存到第一个位置上
            if(obj['on' + type]) obj.events[type][0] = fn;
        } else {
            if (addEvent.equal(obj.events[type], fn) == true) return false;
        }
        // 从第二次开始我们用事件计数器来存储
        obj.events[type][addEvent.ID++] = fn;
        // 执行事件处理函数
        obj['on' + type] = addEvent.exec;
    }
}

// 为每个事件分配一个计数器
addEvent.ID = 1;

// 执行事件处理函数
addEvent.exec = function (event) {
    var e = event || addEvent.fixEvent(window.event);
    for (var i in this.events[e.type]) {
        this.events[e.type][i].call(this, e);
    }
}

// 同一个注册函数进行屏蔽
addEvent.equal = function(es, fn) {
    for (var i in es) {
        if(es[i] == fn) return false;
        return true;
    }
}

// 把IE常用的Event兑现配对到W3C中去
addEvent.fixEvent = function(event) {
    event.preventDefault = addEvent.fixEvent.preventDefault;
    event.stopPropagation = addEvent.fixEvent.stopPropagation;
    event.target = event.srcElement;
    return event;
}

// IE阻止默认行为
addEvent.fixEvent.preventDefault = function() {
  this.returnValue = false;  
};

// IE取消冒泡
addEvent.fixEvent.stopPropagation = function() {
    this.cancelBubble = true;
}

// 跨浏览器删除事件
function removeEvent(obj, type, fn) {
    if (typeof obj.removeEventListener != 'undefined') {
        obj.removeEventListener(type, fn, false);
    }else{
        if(obj.events){
            for(var i in obj.events[type]) {
                if(obj.event[type][i] == fn) {
                    delete obj.events[type][i];
                }
            }
        }
    }
}

// 跨浏览器获取滚动条位置
function getScroll() {
    return {
        top: document.documentElement.scrollTop || document.body.scrollTop,
        left: document.documentElement.scrollLeft || document.body.scrollLeft
    }
}

// 跨浏览器获取innerText
function getInnerText(element){
    return (typeof element.textContent == 'string') ? element.textContent:element.getInnerText;
}

// 跨浏览器设置innerText
function setInnerText(element, text) {
    if(typeof element.textContent == 'string') {
        element.textContent = text;
    } else {
        element.innerText = text;
    }
}

// 获取某一个元素到最外层顶点的位置
function offsetTop(element) {
    var top = element.offsetTop;
    var parent = element.offsetParent;
    while (parent != null) {
        top += parent.offsetTop;
        parent = parent.offsetParent;
    }
    return top;
}


// 删除左后空格
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, '');
}

// 某一个值是否存在某一个数组中
function inArray(array, value) {
    for (var i in array) {
        if (array[i] === value) {
            return true;
        }
    }
    return false;
}

// 滚动条清零 
function scrollTop() {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
}

// 获取某一个节点的上一个节点的索引
function prevIndex(current, parent) {
    var length = parent.children.length;
    if (current == 0) return length - 1;
    return parseInt(current) - 1;
}

// 获取某一个节点的下一个节点的索引
function nextIndex(current, parent) {
    var length = parent.children.length;
    if (current == length - 1) return 0;
    return parseInt(current) + 1;
}

// 阻止默认行为
function predef(e) {
    e.preventDefault();
}
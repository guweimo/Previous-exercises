
/* 函数式 
function $(name){
    if(name[0] === '#'){
        name = name.substring(1);
        return document.getElementById(name);
    }else if (name[0] === '.') {
        name = name.substring(1);
        return document.getElementsByClassName(name);
    }else{
        return document.getElementsByTagName(name);
    }
}
对象式
 window = {
    $:function(name){
        if(name[0] === '#'){
            name = name.substring(1);
            return document.getElementById(name);
        }else if (name[0] === '.') {
            name = name.substring(1);
            return document.getElementsByClassName(name);
        }else{
            return document.getElementsByTagName(name);
        }
    }
}*/


// 基础库
$_fn=function(args){
    this.elements = [];
    if (typeof args == 'string'){
        if(args.indexOf(' ') != -1){
            var element = args.split(' ');
            var childElements = [];         // 存放临时节点对象的数组
            var node = [];                  // 用来存放父节点
            for (var i = 0; i < element.length; i++) {
                if(node.length == 0) node.push(document);       // 如果没有父节点，就把document放进去。
                switch (element[i].charAt(0)) {
                    case '#': 
                        childElements = [];     // 清理掉临时节点，以便父节点失效，子节点有效。
                        childElements.push(this.getId(element[i].substring(1)));
                        node = childElements;
                        break;
                    case '.':
                        childElements = [];
                        for (var j = 0; j < node.length; j++) {
                            var temps = this.getClass(element[i].substring(1), node[j]);
                            for (var k = 0; k < temps.length; k++) {
                                childElements.push(temps[k]);
                            }
                        }
                        node = childElements;
                        break;
                    default:
                        childElements = [];
                        for (var j = 0; j < node.length; j++) {
                            var temps = this.getTagName(element[i], node[j]);
                            for (var k = 0; k < temps.length; k++) {
                                childElements.push(temps[k]);
                            }
                        }
                        node = childElements;
                }
            }
            this.elements = childElements;
        }
        else {
            switch (args.charAt(0)) {
                case '#': 
                    this.elements.push(this.getId(args.substring(1)));
                    break;
                case '.':
                    this.elements = this.getClass(args.substring(1));
                    break;
                default:
                    this.elements = this.getTagName(args);
            }
        }   
    } else if(typeof args == 'object') {
        if(args != undefined) {
            this.elements[0] = args;
        } 
    }else if (typeof args == 'function') {
        this.ready(args);
    }
}

// DOM加载
$_fn.prototype.ready = function (fn) {
    addDomLoaded(fn);
}

// 获取ID节点
$_fn.prototype.getId = function(id) {
    return document.getElementById(id);
}

// 获取class节点数组
$_fn.prototype.getClass = function(clsName, parentNode) {
    var node = null;
    var temps = [];
    if(parentNode != undefined) {
        node = parentNode;
    }else {
        node = document;
    }
    var cls = node.getElementsByClassName(clsName);
    
    for (var i = 0; i < cls.length; i++){
        temps.push(cls[i]);
    }
    return temps;
}

// 获取元素节点数组
$_fn.prototype.getTagName = function(tag, parentNode){
    var node = null;
    var temps = [];
    if(parentNode != undefined) {
        node = parentNode;
    }else {
        node = document;
    }
    var tags = node.getElementsByTagName(tag);
    for (var i = 0; i < tags.length; i++) {
        temps.push(tags[i]);
    }
    return temps; 
}

// 设置css选择器子节点
$_fn.prototype.find = function(str) {
    var childElements = [];
    for (var i = 0; i < this.elements.length; i++) {
        switch (str.charAt(0)) {
            case '#': 
                childElements.push(this.getId(str.substring(1)));
                break;
            case '.':
                var temps = this.getClass(str.substring(1), this.elements[i]);
                for (var j = 0; j < temps.length; j++){
                    childElements.push(temps[j]);
                } 
                break;
                /*var cls = this.elements[i].getElementsByTagName('*');
                for (var j = 0; j < cls.length; j++){
                    if (cls[i].className == str.substring(1)){
                        childElements.push(cls[j]);
                    }
                }*/
            default:
                /*var tags = this.elements[i].getElementsByTagName(str);
                for (var j = 0; j < tags.length; j++){
                    childElements.push(tags[j]);
                }*/
                var temps = this.getTagName(str, this.elements[i]);
                for (var j = 0; j < temps.length; j++){
                    childElements.push(temps[j]);
                }
        }
    }
    this.elements = childElements;
    return this;
}



// 获取某一个的节点
$_fn.prototype.ge = function(num) {
    return this.elements[num];
}

// 获取首个节点，并返回这个节点对象
$_fn.prototype.first = function () {
    return this.elements[0];
}

// 获取末个节点，并返回这个节点对象
$_fn.prototype.last = function () {
    return this.elements[this.elements.length - 1];
}

// 获取某组节点的数量
$_fn.prototype.length = function () {
    return this.elements.length;
}

// 获取某一个节点的属性
$_fn.prototype.attr = function (attr, value) {
    for (var i = 0; i < this.elements.length; i ++) {
        if(arguments.length == 1) {
            return this.elements[0].getAttribute(attr);
        } else if (arguments.length == 2) {
            this.elements[i].setAttribute(attr, value);
        }
    }
    return this;
}

// 后去某一个节点在整个节点组中是第几个索引
$_fn.prototype.index = function() {
    var children = this.elements[0].parentNode.children;
    for (var i = 0; i < children.length; i ++) {
        if (this.elements[0] == children[i]) {
            return i;
        }
    }
}

// 获取某一个的节点
$_fn.prototype.eq = function(num) {
    var element = this.elements[num];
    this.elements = [];
    this.elements[0] = element;
    return this;
}


// 添加class
$_fn.prototype.addClass = function (className) {
    for (var i = 0; i < this.elements.length; i++) {
        if (!this.elements[i].className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))){
            this.elements[i].className += className + ' ';
        }
    }
    return this;
}

// 移出class

$_fn.prototype.removeClass = function (className) {
    for (var i = 0; i < this.elements.length; i++) {
        if (this.elements[i].className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))) {
            this.elements[i].className = this.elements[i].className.replace(
                new RegExp('(\\s|^)' + className + '(\\s|$)'), '');
        }
    }
    return this;
}

// 添加link或style的CSS规则
$_fn.prototype.addRule = function (num, selectorText, cssText, position) {
    var sheet = document.styleSheets[num];
    if (typeof sheet.insertRule != 'undefined'){
        sheet.insertRule(selectorText + '{' + cssText + '}', position);
    } else if (typeof sheet.addRule != 'undefined') {
        sheet.addRule(selectorText, cssText, position);
    }
    return this;
}

// 移出link或style的css规则
$_fn.prototype.removeRule = function (num, index) {
    var sheet = document.styleSheets[num];
    if (typeof sheet.deleteRule != 'undefined') {
        sheet.deleteRule(index);
    }else if (typeof sheet.removeRule != 'undefined'){
        sheet.removeRule(index);
    }
    return this;
}

// 获取当前节点的下一个元素节点
$_fn.prototype.next = function() {
    for(var i = 0; i < this.elements.length; i++) {
        this.elements[i] = this.elements[i].nextSibling;
        if(this.elements[i] == null) throw new Error("找不到下一个同级元素节点");
        if(this.elements[i].nodeType == 3) this.next(); 
    }
    return this;
}

// 获取当前节点的上一个元素节点
$_fn.prototype.prev = function() {
    for(var i = 0; i < this.elements.length; i++) {
        this.elements[i] = this.elements[i].previousSibling;
        if(this.elements[i] == null) throw new Error("找不到上一个同级元素节点");
        if(this.elements[i].nodeType == 3) this.prev(); 
    }
    return this;
}

// 设置表单字段元素
$_fn.prototype.form = function(name) {
    for (var i = 0; i < this.elements.length; i++){
        this.elements[i] = this.elements[i][name];
    }
    return this;
}

// 设置表单字段内容获取
$_fn.prototype.value = function(str){
    
    for (var i = 0; i < this.elements.length; i++){
        if(arguments.length == 0){
            return this.elements[i].value;
        }
        this.elements[i].value = str;
    }
    return this;
}

// 设置html
$_fn.prototype.html = function(html){
    
    for (var i = 0; i < this.elements.length; i++){
        if(arguments.length == 0){
            return this.elements[i].innerHTML;
        }
        this.elements[i].innerHTML = html;
    }
    return this;
}

// 设置innerText
$_fn.prototype.text = function(str){
    for (var i = 0; i < this.elements.length; i++){
        if(arguments.length == 0){
            return getInnerText(this.elements[i]);
        }
        setInnerText(this.elements[i], str);
    }
    return this;
}

// 设置css
$_fn.prototype.css = function(attr, value){
    for (var i = 0; i < this.elements.length; i++){
        if (arguments.length == 1) { 
            if (typeof window.getComputedStyle != 'undefined') {
                return window.getComputedStyle(this.elements[i], null)[attr];
            } else if (typeof this.elements[i].currentStyle != 'undefined'){
                return this.elements[i].currentStyle[attr];
            }
        }
        this.elements[i].style[attr] = value;
    }
    return this;
}

// 触发点击事件
$_fn.prototype.click = function(fn) {
    for (var i=0; i < this.elements.length; i++) {
        this.elements[i].onclick = fn;
    }
    return this;
}

// 设置时间发生器
$_fn.prototype.bind = function (event, fn) {
    for(var i = 0; i < this.elements.length; i++){
        addEvent(this.elements[i], event, fn);
    }
    return this;
}

// 触发鼠标移入移出
$_fn.prototype.hover = function(over, out){
    for(var i = 0; i < this.elements.length; i++){
        // this.elements[i].onmouseover = over;
        // this.elements[i].onmouseout = out;
        addEvent(this.elements[i], 'mouseover', over);
        addEvent(this.elements[i], 'mouseout', out);
    }
    return this;
}

// 设置点击切换方法
$_fn.prototype.toggle = function () {
    for(var i = 0; i < this.elements.length; i++){
        tog(this.elements[i], arguments);
    }
    return this;
}

function tog(element, args) {
    var count = 0;
    addEvent(element, 'click', function () {
        args[count++ % args.length].call(this);
    });
}

// 设置显示
$_fn.prototype.show = function() {
    for(var i = 0; i < this.elements.length; i++){
        this.elements[i].style.display = 'block';
    }
    return this;
}

// 设置隐藏
$_fn.prototype.hide = function() {
    for(var i = 0; i < this.elements.length; i++){
        this.elements[i].style.display = 'none';
    }
    return this;
}

// 设置物体居中
$_fn.prototype.center = function(width, height){
    var top = (document.documentElement.clientHeight - height) / 2 + getScroll().top;
    var left = (document.documentElement.clientWidth - width) / 2 + getScroll().left;
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].style.top = top + 'px';
        this.elements[i].style.left = left + 'px';
    }
    return this;
}

// 锁屏功能
$_fn.prototype.lock = function() {
    for(var i = 0; i < this.elements.length; i++) {
        this.elements[i].style.width = getInner().width + getScroll().left + 'px';
        this.elements[i].style.height = getInner().height + getScroll().top  + 'px';
        this.elements[i].style.display = 'block';
        parseFloat(sys.firefox) < 4 ? document.body.style.overflow = 'hidden' : document.documentElement.style.overflow = 'hidden';
        addEvent(this.elements[i], 'mousedown', predef);
        addEvent(this.elements[i], 'mouseup', predef);
        addEvent(this.elements[i], 'selectstart', predef);
    }
    return this;
}

$_fn.prototype.unlock = function() {
    for(var i = 0; i < this.elements.length; i++) {
        this.elements[i].style.display = 'none';
        parseFloat(sys.firefox) < 4 ? document.body.style.overflow = 'auto' : document.documentElement.style.overflow = 'auto';
        removeEvent(this.elements[i], 'mousedown', predef);
        removeEvent(this.elements[i], 'mouseup', predef);
        removeEvent(this.elements[i], 'selectstart', predef);
    }
    return this;
}

// 触发浏览器窗口事件
$_fn.prototype.resize = function(fn) {
    for(var i = 0; i < this.elements.length; i++) {
        var element = this.elements[i];
        /*
        window.onresize = function() {
            fn();
            if (element.offsetLeft > getInner().width - element.offsetWidth){
                element.style.left = getInner().width - element.offsetWidth + 'px';
            }
            if (element.offsetTop > getInner().height - element.offsetHeight) {
                element.style.top = getInner().height - element.offsetHeight + 'px';
            }
        }*/
        addEvent(window, 'resize', function(){
            fn();
            if (element.offsetLeft > getInner().width + getScroll().left - element.offsetWidth){
                element.style.left = getInner().width + getScroll().left - element.offsetWidth + 'px';
                if (element.offsetLeft <= 0 + getScroll().left) {
                    element.style.left = 0 + getScroll().left + 'px';
                }
            }
            if (element.offsetTop > getInner().height + getScroll().top - element.offsetHeight) {
                element.style.top = getInner().height + getScroll().top - element.offsetHeight + 'px';
                if (element.offsetTop <= 0 + getScroll().top) {
                    element.style.top = 0 + getScroll().top + 'px';
                }
            } 
        });
    }
    return this;
}

// 设置动画
$_fn.prototype.animate = function(obj) {
    for(var i = 0; i < this.elements.length; i++) {
        
        var element = this.elements[i]
        var attr = obj['attr'] == 'x' ? 'left' : obj['attr'] == 'y' ? 'top' : 
                   obj['attr'] == 'w' ? 'width' : obj['attr'] == 'h' ? 'height' : 
                   obj['attr'] == 'o' ? 'opacity' : obj['attr'] != undefined ? obj['attr'] : 'left';
        var start = obj['attr'] != undefined ? obj['start'] : 
                    attr == 'opacity' ? parseFloat(getStyle(element, attr)) * 100 : 
                    parseInt(getStyle(element, attr));
        var t = obj['t'] != undefined ? obj['t'] : 20;
        var step = obj['step'] != undefined ? obj['step'] : 10;
        
        var alter = obj['alter'];
        var target = obj['target'];
        var mul = obj['mul'];

        var speed = obj['speed'] != undefined ? obj['speed'] : 6;
        var type = obj['type'] == 0 ? 'constant' : obj['type'] == 1 ? 'buffer': 'buffer';

        if (alter != undefined && target == undefined){
            target = alter + start;
        } else if (alter == undefined && target == undefined && mul == undefined){
            throw new Eoor('alter增量或target目标量必须传一个!');
        }

        if (start > target) step = -step;
        if(attr == 'opacity') {
            element.style.opacity = start / 100;
        }
        /*else {
            // element.style[attr] = start + 'px';
        }*/

        if (mul == undefined){
            mul = {};
            mul[attr] = target;
        }

        clearInterval(element.timer);

        element.timer = setInterval(function (){

            // 创建一个布尔值
            var flag= true;

            for(var i in mul){
                attr = i == 'x' ? 'left' : i == 'y' ? 'top' : i == 'w' ? 'width' : i == 'h' ? 
                    'height' : i == 'o' ? 'opacity' : i != undefined ? i : 'left';
                target = mul[i];
            
                if (type == 'buffer') {
                    step = attr == 'opacity' ? (target - parseFloat(getStyle(element, attr)*100)) / speed : 
                                            (target - parseInt(getStyle(element, attr))) / speed;
                    step = step > 0 ? Math.ceil(step) : Math.floor(step);
                }

                if (attr == 'opacity') {
                    if (step == 0 ){
                        setOpacity();
                    }else if (step > 0 && Math.abs(parseFloat(getStyle(element, attr)*100) - target) <= step){
                        setOpacity();
                    }else if (step < 0 && (parseFloat(getStyle(element, attr)*100) - target) <= Math.abs(step)) {
                        setOpacity();
                    } else {
                        var temp =  parseFloat(getStyle(element, attr)) * 100;
                        element.style.opacity = parseInt(temp + step) / 100;
                    }

                    if(parseInt(target) != parseInt(parseFloat(getStyle(element, attr)) * 100)) flag = false;
                    
                }else {
                    if (step == 0 ){
                        setTarget();
                    }else if (step > 0 && Math.abs(parseInt(getStyle(element, attr)) - target) <= step){
                        setTarget();
                    }else if (step < 0 && (parseInt(getStyle(element, attr)) - target) <= Math.abs(step)) {
                        setTarget();
                    } else {
                        element.style[attr] = parseInt(getStyle(element, attr)) + step + 'px';
                    }

                    if(parseInt(target) != parseInt(getStyle(element, attr))) {
                        flag = false;
                    }
                }
            }

            if(flag) {
                clearInterval(element.timer);
                if (obj.fn != undefined) {
                    obj.fn();
                }
            }
        }, t);
        function setTarget() {
            element.style[attr] = target + 'px';
            
        }

        function setOpacity() {
            element.style.opacity = parseInt(target) / 100;
        }
    }
    return this;
}

// 插件入口
$_fn.prototype.extend = function(name, fn) {
    $_fn.prototype[name] = fn; 
}

/*// 拖拽功能
$_fn.prototype.drag = function() {
    
}*/

// 调用
window.$ = function(args){return new $_fn(args);};//获取智能对象



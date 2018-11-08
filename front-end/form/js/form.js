window.onload = function () {
    // 获得各个ID的元素
    var bold = document.getElementById('bold');
    var italic = document.getElementById('italic');
    var underline = document.getElementById('underline');
    var through = document.getElementById('through');
    var text = document.getElementById('text');

    window.length = 2;

    // 点击事件'
    toggle(bold, 'toolbar-button-click');

    toggle(italic, 'toolbar-button-click');

    toggle(underline, 'toolbar-button-click');

    toggle(through, 'toolbar-button-click');

    text.onkeyup = function() {
        text.innerHTML = '<b>' + text.innerText + '</b>';
    };

    // 当移动到加粗时，移除和添加class
    bold.onmouseover = function() {
        bold.className += ' toolbar-button-hover';
    };
    bold.onmouseout = function() {
        bold.className = removeClass(bold.className, 'toolbar-button-hover');
    };

    // 当移动到斜体时，移除和添加class    
    italic.onmouseover = function() {
        italic.className += ' toolbar-button-hover';
    };
    italic.onmouseout = function() {
        italic.className = removeClass(italic.className, 'toolbar-button-hover');
    };

    // 当移动到下划线时，移除和添加class    
    underline.onmouseover = function() {
        underline.className += ' toolbar-button-hover';
    };
    underline.onmouseout = function() {
        underline.className = removeClass(underline.className, 'toolbar-button-hover');
    };

    // 当移动到删除线时，移除和添加class    
    through.onmouseover = function() {
        through.className += ' toolbar-button-hover';
    };
    through.onmouseout = function() {
        through.className = removeClass(through.className, 'toolbar-button-hover');
    };
    text.focus();


    function toggle(element, className) {
        var count = 0;
        element.onclick = function () {
            if (count % length == 0) {
                if (!element.className.match(new RegExp(className))) {
                    element.className += ' ' + className;
                    count++;
                    
                }
            } else if (count % length == 1) {
                element.className = removeClass(element.className, className);
                count = 0;
            }
        }
    }

};

// 移除某个class
function removeClass(cls, className) {
    if(cls.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))) {
        cls = cls.replace(new RegExp('(\\s|^)' + className), '');
    }
    return cls
}

var count = 0;

function click(cls, className) {
    if (count % length == 0) {
        if (!cls.match(new RegExp(className))) {
            cls += ' ' + className;
            count ++;
        }
    } else if (count % length == 1) {
        cls = removeClass(cls, className);
        count = 0;
    }
    return cls;
}




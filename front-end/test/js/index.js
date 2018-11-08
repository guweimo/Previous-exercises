

// JavaScript

window.onload = function () {
    var b_img = document.getElementsByClassName('banner')[0].getElementsByTagName('img');
    var b_li = document.getElementsByClassName('banner')[0].getElementsByTagName('li');
    var b_span = document.getElementsByClassName('banner')[0].getElementsByTagName('span')[0];

    for (var i = 0; i < b_img.length; i++) {
        b_img[i].style.opacity = 0;
    }
    b_img[0].style.opacity = 1;
    b_li[0].style.color = '#333';
    b_span.innerHTML = b_img[0].alt;
    
    var banner_index = 1;

    var banner_timer = setInterval(banner_fn, 3000);

    for(var i = 0; i < b_li.length; i++) {
        b_li[i].onmouseover = function() {
            clearInterval(banner_timer);
            if(this.style.color != 'rag(51, 51, 51)') {
                banner(this, banner_index == 0 ? b_li.length - 1 : banner_index - 1);
            }
        };
        b_li[i].onmouseout = function () {
            banner_index = parseInt(array(b_li, this)) + 1;
            banner_timer = setInterval(banner_fn, 3000);
        }
    }

    function banner(obj, prev) {
        for(var i = 0; i < b_li.length; i++) {
            b_li[i].style.color = '#999';
        }
        obj.style.color = '#333';
        b_span.innerHTML = b_img[array(b_li, obj)].alt;
        b_img[prev].style.opacity = 0;
        b_img[prev].style.zIndex = 1;
        b_img[array(b_li, obj)].style.opacity = 1;
        b_img[array(b_li, obj)].style.zIndex = 2;
    }

    function banner_fn() {
        if (banner_index >= b_li.length) {
            banner_index = 0;
        }
        banner(b_li[banner_index], banner_index == 0 ? b_li.length - 1 : banner_index - 1);
        banner_index ++;
    }

    function array(obj, obj2) {
        for( var i in obj) {
            if (obj[i] == obj2) {
                return i;
            }
        }
    }

    // 图片集
    de = document.documentElement;
    var p_s = document.getElementsByClassName('screen')[0];
    p_s.style.height = window.innerHeight + de.scrollTop + 'px';
    p_s.style.width = window.innerWidth + de.scrollLeft - (window.innerWidth - de.scrollWidth) + 'px';
    p_lump = document.getElementsByClassName('photo-lump');
    wait_load = document.getElementsByClassName('wait-load');
    for (var i = 0; i < p_lump.length; i++) {
        wait_load[i].alt = '第' + parseInt(i+1) + '张';
        p_lump[i].getElementsByTagName('span')[0].innerHTML = wait_load[i].alt;
    }

    // 关闭图集
    p_img = document.getElementsByClassName('photo-img')[0];
    p_close = p_img.getElementsByClassName('close')[0];
    big_img = document.getElementsByClassName('big-img')[0];
    img = big_img.getElementsByTagName('img')[0];
    em = big_img.getElementsByTagName('em')[0];
    p_close.onclick = function() {
        p_s.style.display = 'none';
        p_img.style.display = 'none';
    };
    // 点击阴影部分关闭图集
    p_s.onclick = function () {
        p_s.style.display = 'none';
        p_img.style.display = 'none';
    }

    
    // 点击图片打开图片原图
    for(var i = 0; i < wait_load.length; i++) {
        wait_load[i].onclick = function () {
            p_s.style.display = 'block';
            p_img.style.display = 'block';
            img.src = this.src;
            var j = check_img();
            em.innerHTML = (j+1) + '/' + wait_load.length;
            p_img_position();
        }
        
    }

    // 左右方向的显示
    pl = document.getElementsByClassName('pl')[0];
    pr = document.getElementsByClassName('pr')[0];
    left = document.getElementsByClassName('left')[0];
    right = document.getElementsByClassName('right')[0];

    left.onmouseover = function() {
        pl.style.display = 'block';
        pr.style.display = 'none';
    };
    left.onmouseout = l_out = function() {       
        pl.style.display = 'none';
        pr.style.display = 'none';
    };

    right.onmouseover = r_over = function() {
        pl.style.display = 'none';
        pr.style.display = 'block';
    };
    right.onmouseout = r_out = function() {
        pl.style.display = 'none';
        pr.style.display = 'none';
    };
    
    window.onscroll = function() {
        if(de.scrollTop + de.clientHeight >= de.offsetHeight){
            p_s.style.height = de.offsetHeight + 'px';
            p_img_position();
        } else {
            p_s.style.height = window.innerHeight + de.scrollTop + 'px';
            p_s.style.width = window.innerWidth + de.scrollLeft - (window.innerWidth - de.scrollWidth) + 'px';
            p_img_position();
        } 
    }

    // 拉伸浏览器发生的事件
    /*window.onresize = function () {
        p_img.style.top = window.innerHeight + de.scrollTop - p_img.clientWidth + 'px';
        p_img.style.left = window.innerWidth + de.scrollLeft - p_img.clientWidth - (window.innerWidth - de.scrollWidth)+ 'px';
    }*/

    // p_img图集的绝对定位的上和左边的调整
    function p_img_position() {
        p_img.style.top =  (de.clientHeight - p_img.clientHeight) / 2 + de.scrollTop + 'px';
        p_img.style.left = (window.innerWidth - (window.innerWidth - de.scrollWidth) - p_img.clientWidth) / 2  + 'px';
    }

    // 上一张
    left.onclick = function() {
        var i = check_img();
        i --;
        if(i < 0) {
            i = wait_load.length - 1;
        }
        img.src = wait_load[i].src;
        em.innerHTML = (i+1) + '/' + wait_load.length;
    }

    // 下一张
    right.onclick = function() {
        var i = check_img();
        i ++;
        if(i >= wait_load.length) {
            i = 0;
        }
        img.src = wait_load[i].src;
        em.innerHTML = (i+1) + '/' + wait_load.length;
    }

    function check_img() {
        for (var i = 0; i < wait_load.length; i++) {
            if(wait_load[i].src == img.src) {
                return i;
            }
        }
    }
};


// jquery
/*
$(function() {
    $('.banner img').css('opacity', '0');
    $('.banner img').eq(0).css('opacity', '1');
    $('.banner ul li').eq(0).css('color', '#333');
    $('.banner span').html($('.banner img').eq(0).attr('alt'));

    var banner_index = 1;

    var banner_timer = setInterval(banner_fn, 5000);

    $('.banner ul li').hover(function() {
        clearInterval(banner_timer);
        if ($(this).css('color') != 'rag(51, 51, 51)') {
            banner(this, banner_index == 0 ? $('.banner ul li').length - 1 : banner_index - 1);
        }
    }, function() {
        banner_index = $(this).index() + 1;
        banner_timer = setInterval(banner_fn, 2000);
    });

    function banner(obj, prev) {
        $('.banner ul li').css('color', '#999');
        $(obj).css('color', '#333');
        $('.banner span').html($('.banner img').eq($(obj).index()).attr('alt'));
        $('.banner img').eq(prev).animate({
            opacity: '0'
        }).css('zIndex', '1');
        $('.banner img').eq($(obj).index()).animate({
            opacity: '1'
        }).css('zIndex', '2');
    }

    function banner_fn() {
        if (banner_index >= $('.banner ul li').length) {
            banner_index = 0;
        }
        banner($('.banner ul li').eq(banner_index),
            banner_index == 0 ? $('.banner ul li').length - 1 : banner_index - 1);
        banner_index ++;
    }

});*/


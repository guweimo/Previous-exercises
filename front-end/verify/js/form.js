/*

// 原生JavaScript
window.onload = function () {

    // 获取input元素
    username = document.getElementsByClassName('sign-form')[0]['username'];
    pass = document.getElementsByClassName('sign-form')[0]['pass'];
    repass = document.getElementsByClassName('sign-form')[0]['repass'];
    email = document.getElementsByClassName('sign-form')[0]['email'];
    sub = document.getElementsByClassName('sign-form')[0]['sub'];

    // 获取input元素下的p元素
    username_p = document.getElementsByClassName('username')[0].getElementsByTagName('p')[0];
    pass_p = document.getElementsByClassName('password')[0].getElementsByTagName('p')[0]; 
    repass_p = document.getElementsByClassName('repass')[0].getElementsByTagName('p')[0]; 
    email_p = document.getElementsByClassName('email')[0].getElementsByTagName('p')[0];      

    // 账号的验证
    username.onblur = function() {
        check_username();
    };
    username.onfocus = function () {
        username_p.innerHTML = '';
        removeClass(username, 'error-input');
    };

    function check_username() {
        if (username.value == "" || username.value == null ) {
            username_p.innerHTML = '账号不能为空';
            addClass(username, 'error-input');
        } else if (username.value.length < 5 || username.value.length > 20) {
            username_p.innerHTML = '账号不能少于5位数，多于20位数';
            addClass(username, 'error-input');
        } else {
            username_p.innerHTML = '';
            removeClass(username, 'error-input');
            return true;
        }
        return false;
    }

    // 密码的验证
    pass.onblur = function () {
        check_pass();
    };
    pass.onfocus = function () {
        pass_p.innerHTML = '';
        removeClass(pass, 'error-input');
    };

    function check_pass() {
        if (pass.value == '' || pass.value == null) {
            pass_p.innerHTML = '密码不能为空';
            addClass(pass, 'error-input');
        } else if (pass.value.length < 6 || username.value.length > 20) {
            pass_p.innerHTML = '密码不能少于6位，多于20位';
            addClass(pass, 'error-input');
        } else {
            pass_p.innerHTML = '';
            removeClass(pass, 'error-input');
            return true;
        }
        return false;
    }

    // 确认密码的验证
    repass.onblur = function () {
        check_repass();
    };
    repass.onfocus = function () {
        repass_p.innerHTML = '';
        removeClass(repass, 'error-input');
    };

    function check_repass() {
        if (repass.value == '' || repass.value == null) {
            repass_p.innerHTML = '确认密码不能为空';
            addClass(repass, 'error-input');
        } else if (repass.value != pass.value) {
            repass_p.innerHTML = '两次密码不相同，请重新输入';
            addClass(repass, 'error-input');            
        } else {
            repass_p.innerHTML = '';
            removeClass(repass, 'error-input');
            return true;
        }
        return false;
    }


    // 电子邮箱的验证
    email.onblur = function () {
        check_email();
        all_email.style.display = 'none';
    };
    email.onfocus = function () {
        email_p.innerHTML = '';
        removeClass(email, 'error-input');
    };

    function check_email() {
        if (email.value == '' || email.value == null) {
            email_p.innerHTML = '电子邮箱不能为空';
            addClass(email, 'error-input');
        } else if (!/^[A-Za-z0-9\-]+@[A-Za-z0-9\-]+(\.[a-zA-Z]{2,4}){1,2}$/.test(email.value)) {
            email_p.innerHTML = '电子邮箱格式不对，请输入正确的电子邮箱';
            addClass(email, 'error-input');            
        } else {
            email_p.innerHTML = '';
            removeClass(email, 'error-input');
            return true;
        }
        return false;
    }

    // 电子邮箱补全键入
    all_email = document.getElementsByClassName('all_email')[0];
    all_li = all_email.getElementsByTagName('li');
    email.onkeyup = function (event) {
        if(email.value.indexOf('@') == -1 || email.value.length == '') {
            all_email.style.display = 'block';
            var s = all_email.getElementsByTagName('span');
            for (var i = 0; i < s.length; i++) {
                s[i].innerHTML = email.value;
            }
        } else {
            all_email.style.display = 'none';
        }


        for(var i = 0; i < all_li.length; i++) {
            removeClass(all_li[i], 'li-keyup-color')
            addClass(all_li[i], 'li-default-color');
        }

        var lgth = all_li.length;
        // 按下向下键
        if(event.keyCode == 40) {
            if (this.index == undefined || this.index >= lgth - 1) {
                this.index = 0;
            } else {
                this.index ++;
            }
            removeClass(all_li[this.index], 'li-default-color');
            addClass(all_li[this.index], 'li-keyup-color');
        }

        // 按下向上键
        if (event.keyCode == 38) {
            if (this.index == undefined || this.index <= 0) {
                this.index = lgth - 1;
            } else {
                this.index --;
            }
            removeClass(all_li[this.index], 'li-default-color');            
            addClass(all_li[this.index], 'li-keyup-color');
        }
        
        if (this.index != undefined) {
            removeClass(all_li[this.index], 'li-default-color');            
            addClass(all_li[this.index], 'li-keyup-color');
        }
      

        // 按下回车键
        if (event.keyCode == 13) {
            email.value = all_li[this.index].innerText;
            all_email.style.display = 'none';
            this.index = undefined;
        }
        

        // 按下删除键
        if (event.keyCode == 8) {
            if (email.value == '') {
                all_email.style.display = 'none';
            }
        }


    }
    // 电子邮件补全点击获取
    for (var i = 0; i < all_li.length; i++) {
        all_li[i].onmousedown = function () {
            email.value = this.innerText;
            all_email.style.display = 'none';
        }
    }
    

    // 注册按钮验证
    an_form = document.getElementsByClassName('sign-form')[0];
    sub.onclick = function () {
        if(!check_username() && !check_pass() && !check_repass() && !check_email()){
            
        } else {
            an_form.submit();
        }
    }


};

function addClass(name, classname) {
    if(!name.className.match(new RegExp('(\\s|^)' + classname + '(\\s|$)'))) {
        if (name.className == '') {
            name.className = classname;
        } else {
            name.className = name.className + ' ' + classname;
        }
    }
}

function removeClass(name, classname) {
    if (name.className.match('(\\s|^)' + classname + '(\\s|$)')) {
        name.className = name.className.replace(new RegExp('(\\s|^)' + classname), '');
    }
}*/

// Jquery
$(function() {

    // 获取每个input元素
    username = $(".sign-form input[name='username']");
    pass = $('.sign-form input[name="pass"]');
    repass = $('.sign-form input[name="repass"]');
    email = $('.sign-form input[name="email"]');
    sub = $('.sign-form input[name="sub"]');

    // 获取每个input发生错误时发出信息的元素。
    username_p = $('.username p');
    pass_p = $('.password p');
    repass_p = $('.repass p');
    email_p = $('.email p');

    // 账号的验证
    var error_input = 'error-input';
    username.blur(function(){
        check_username();
    }).focus(function(){
        username_p.empty();
        username.removeClass(error_input);
    });
    function check_username() {
        if(username.val() == '' || username.val() == null) {
            username_p.html('账号不能为空');
            username.addClass(error_input);
        } else if (username.val().length < 5 || username.val().length > 20) {
            username_p.html('账号不能少于5位，多于20位');
            username.addClass(error_input);
        } else {
            username_p.empty();
            username.removeClass(error_input);
            return true;
        }
        return false;
    }

    // 密码验证
    pass.blur(function() {
        check_pass();
    }).focus(function(){
        pass_p.empty();
        pass.removeClass(error_input);
    });
    function check_pass() {
        if(pass.val() == '' || pass.val() == null) {
            pass_p.html('密码不能为空');
            pass.addClass(error_input)
        } else if (pass.val().length < 6 && pass.val().length > 20) {
            pass_p.html('密码不能少于6位，多于20位');
            pass.addClass(error_input);
        } else {
            pass_p.empty();
            pass.removeClass(error_input);
            return true;
        }
        return false;
    }

    // 确认密码验证
    repass.blur(function () {
        check_repass();
    }).focus(function(){
        repass_p.empty();
        repass.removeClass(error_input);
    });
    function check_repass() {
        if (repass.val().length == '' || repass.val().length == null) {
            repass_p.html('确认密码不能为空');
            repass.addClass(error_input);
        } else if (repass.val() != pass.val()) {
            repass_p.html('两次密码不相同，请重新确认');
            repass.addClass(error_input);
        } else {
            repass_p.empty();
            repass.removeClass(error_input);
            return true;
        }
        return false;
    }

    // 电子邮箱的验证
    email.blur(function() {
        check_email();
        all_email.css('display', 'none');
    }).focus(function(){
        email_p.empty();
        email.removeClass(error_input);
    });

    function check_email() {
        if (email.val() == '' || email.val() == null) {
            email_p.html('电子邮箱不能为空');
            email.addClass(error_input);
        } else if (!/^[A-Za-z0-9\-]+@[a-zA-z0-9\-]+(\.[a-zA-Z]{2,4}){1,2}$/.test(email.val())) {
            email_p.html('电子邮箱格式不正确');
            email.addClass(error_input);
        } else {
            email_p.empty();
            email.removeClass(error_input);
            return true;
        }
        return false;
    }

    // 电子邮箱补全键入
    var li_default = 'li-default-color';
    var li_keyup = 'li-keyup-color';
    all_email = $('.all_email');
    all_li = $('.all_email li');
    all_span = $('.all_email li span');
    email.keyup(function(event) {
        if (email.val().indexOf('@') == -1) {
            all_email.css('display', 'block');
            all_span.html(email.val());
        } else {
            all_email.css('display', 'none');
        }

        if(email.val() == '') {
            all_email.css('display', 'none');            
        }

        all_li.addClass(li_default);

        if(event.keyCode == 40) {
            if (this.index == undefined || this.index >= all_li.length - 1) {
                this.index = 0;
            } else {
                this.index ++;
            }
            all_li.eq(this.index).removeClass(li_default);
            all_li.eq(this.index).addClass(li_keyup);
        }
        if(event.keyCode == 38) {
            if (this.index == undefined || this.index <= 0) {
                this.index = all_li.length - 1;
            } else {
                this.index --;
            }
            all_li.eq(this.index).removeClass(li_default);
            all_li.eq(this.index).addClass(li_keyup);
        }
        if (this.index != undefined) {
            all_li.eq(this.index).removeClass(li_default);
            all_li.eq(this.index).addClass(li_keyup);
        }
        
        if(event.keyCode == 13) {
            email.val(all_li.eq(this.index).text());
            all_email.css('display', 'none');
            this.index = undefined;
        }
        if(event.keyCode == 8) {
            if(email.val() == '' || email.val().length == 0) {
                all_email.css('display', 'none');
            }
        }
    });

    all_li.mousedown(function() {
        email.val($(this).text());
        all_email.css('display', 'none');
    });

    sub.click(function() {
        if(check_username() & check_pass() & check_repass() & check_email()) {
            $('.sign-form').submit();
        }
    });

});
$(document).ready( function(){
        var v1, v2;
        function validate($dom){
            var v = $dom.val();
            var id = $dom.attr("id");
            switch(id) {
                case "w":
                    if(v == ""){
                        $("#name").text("账号不能为空哦~");
                        return false;
                    } else if (v.length < 5 || v.length > 16){
                        $("#name").text("账号长度不能少于5位，多于16位");
                        return false;
                    } else {
                        $("#name").empty();
                        return true;
                    }
                case "a":
                    if(v == ""){
                        $("#pwd").text("密码不能为空哦~");
                        return false;
                    } else if (v.length < 6 || v.length > 16) {
                        $("#pwd").text("密码不能少于6位，多于16位哦~");
                        return false;
                    } else {
                        $("#pwd").empty();
                        return true;
                    }
            }
        }
        
        $("#w").focus( function() {
            $("#name").empty();
        }).blur(function() {
            v1 = validate($(this));
        });

        $("#a").focus( function() {
            $("#pwd").empty();
        }).blur( function() {
            v2 = validate($(this));
        });

         $("#register").click(
            function () {
                if (v1 && v2) {
                    return true;
                }
                else {
                    alert('注册失败');
                    validate($("#w"));
                    validate($("#a"));
                    return false;
                }
            }
        );
    $(".main-form").append("<ul><li class='main-dsfsad'>111</li></ul>");
    $(".main-form").prepend("<span>111</span>");
    $(".main-form").before("<span>333</span>");
    $("<span>222</span>").insertAfter(".main-form");
    
});


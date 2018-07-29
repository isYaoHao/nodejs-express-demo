require(["config"], function () {
    require(["jquery", "md5", "jquery.validation", "additional.methods", "idcode"], function () {
        //鼠标移入二维码事件;
        $(".login_body").on("mouseover", function () {
            $("#loginIdcode").stop().animate({height: 120, width: 120, left: 20, top: 70}, 400)
            $("#loginIdcodeLeft").stop().animate({opacity: 1}, 400)
        }).mouseleave(function () {

            $("#loginIdcode").stop().animate({height: 180, width: 180, left: 65, top: 46}, 400)
            $("#loginIdcodeLeft").stop().animate({opacity: 0}, 400)
        })


        $(".login_top").children().on("click", function () {
            var index = $(this).index();
            $(".login_top").children().children("a").css("color", "black")
            $(this).children("a").css("color", "orange");
            $(".login_body").children().attr("style", "display:none")
            $(".login_body").children().eq(index).attr("style", "display:block")
        });
        $.idcode.setCode();
        //表单;
        $("#myform").validate({

            submitHandler: function () {
                if ($.idcode.validateCode()) {


                    $.ajax({
                        url: "/users/login",
                        data: {
                            uname: $("[name=uname]").val(),
                            upwd: $.md5($("[name=upwd]").val())

                        },
                        dataType: "json",
                        type: "POST"


                    }).then(function (res) {

                        if (res.status == 1) {

                            window.sessionStorage.setItem("user", JSON.stringify(res.data))
                            window.location.href = "/"
                        } else {
                            alert(res.msg)
                        }
                    })

                } else {
                    alert("验证码错误")
                }
                return false;

            }


        })


    })
})
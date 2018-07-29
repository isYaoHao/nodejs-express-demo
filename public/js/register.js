require(["config"], function () {
    require(["jquery", "md5", "jquery.validation", "additional.methods", "idcode"], function () {


        console.log();


        $(function () {



            $(".header").load('indexheader.html');
            $(".footer").load('indexfoot.html');
            console.log($("#myform"));

            $("#myform").validate({
                submitHandler: function () {


                    if ($('#ckb').prop("checked")) {

                        $.ajax({
                            data:{
                                uname:$("[name=uname]").val(),
                                upwd:$.md5($("[name=upwd]").val())
                            },
                            dataType:"json",
                            url:"/users/reg",
                            type:"POST"
                        }).then(function (res) {

                            if(res.status==1){
                                alert(res.msg)
                                window.location.href="login.html"


                            } else {
                                alert(res.msg)
                            }



                        })



                    } else {
                        alert("已阅读并同意《寺库网用户注册协议》")
                    }
                    return false;


                },
                rules: {
                    uname: {
                        required: true,
                        rangelength: [5, 10],
                        word: true,
                        remote: {
                            url: "/users/isrename",
                            dataType: "json",
                            type: "get"
                        }

                    },
                    upwd: {
                        required: true,
                        rangelength: [5, 10],
                    },
                    rupwd: {
                        equalTo: $("#upwd")
                    }
                },
                messages: {
                    uname: {
                        required: "用户名必填",
                        rangelength: "用户名长度必须6-18之间",
                        remote: "该用户名已经存在"
                    },
                    upwd: {
                        required: "密码必填",
                        rangelength: "密码长度必须6-18之间"
                    },
                    rupwd: {
                        equalTo: "两次密码不一致"
                    }
                }


            })

        })

        $.validator.addMethod("word", function (str) {
            return /^[a-zA-Z]+\w/.test(str)


        }, "必须是字母或数字,且首字为字母");


    })

})
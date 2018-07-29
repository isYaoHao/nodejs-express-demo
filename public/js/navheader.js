$(function () {


    //li标签切换功能;
    $(".nav_list").children("li").on("mouseover", function () {
        $(".nav_list").children("li").children("div").css("display", "none")
        $(this).children("div").css("display", "block");
        $(".list").css("display", "block")

    }).mouseout(function () {
        $(".nav_list").children("li").children("div").css("display", "none")

    })
    $(".list").mouseover(function () {
        $(".list").css("display", "block")

    })
    $(".nav").mouseout(function () {
        $(".list").css("display", "none")
    })

    //未登录游客状态
    window.localStorage.setItem("user",JSON.stringify({uname:"游客"}))


    //登录信息加载;
    if (sessionStorage.length >= 1) {
        var userData = JSON.parse(window.sessionStorage.getItem("user"))
        console.log(userData.uname);
        $("#navList li").eq(0).html(`您好,<a href="javascript:">${userData.uname}</a>`)


        $.ajax({
            data: {username: userData.uname},
            type: "POST",
            url: "http://10.41.151.12/php01/secoonet/server/buycart.php",
            dataType: "json"

        }).then(function (res) {

            if(res){
                $("#cartNum").text(res.sumb)
            } else {
                $("#cartNum").text(0)
            }

        })


    } else {



        var userData = JSON.parse(window.localStorage.getItem("user"))
        console.log(userData.uname);
        $("#navList li").eq(0).html(`<a href="login.html">${userData.uname}</a>点击登录`)

        console.log(userData);


        $.ajax({
            data: {username:"游客"},
            type: "POST",
            url: "http://10.41.151.12/php01/secoonet/server/buycart.php",
            dataType: "json"

        }).then(function (res) {




            if(res){
                $("#cartNum").text(res.sumb)
            } else {
                $("#cartNum").text(0)
            }





        })


    }


    //


})
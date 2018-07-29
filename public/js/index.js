require(["config"], function () {
    require(["jquery"], function () {

        var time;
        var num = 0;
        var suq = 0;

        $(".header").load("navheader.html",function () {
            jQuery.getScript("js/navheader.js")
        })

/*        //li标签切换功能;
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
        })*/

        //小箭头出现事件
        $(".bodyer_top").on("mouseover", function () {
            $(".bodyer_top>img").stop().fadeIn(100)

            clearInterval(time);


        }).mouseout(function () {
            $(".bodyer_top>img").stop().fadeOut(100)

            time = setInterval(function () {
                num++;
                num = num > $(".bodyer_top>ul>li").length - 1 ? 0 : num;
                $(".bodyer_top>ul>li").fadeOut(300);
                $(".bodyer_top>ul>li").eq(num).fadeIn(600);

                suq++;
                suq = suq > $(".bodyer_top>ul>li").length - 1 ? 0 : suq;
                $(".bodyer_top>ol>li").css("background", "wheat")
                $(".bodyer_top>ol>li").eq(suq).css("background", "orange")

            }, 3000)

        })

        $(".bodyer_top>img").eq(0).on("click", function () {
            num--;

            num = num < 0 ? $(".bodyer_top>ul>li").length - 1 : num;
            suq = num;
            $(".bodyer_top>ul>li").fadeOut(300);
            $(".bodyer_top>ul>li").eq(num).fadeIn(600);
            $(".bodyer_top>ol>li").css("background", "wheat")
            $(".bodyer_top>ol>li").eq(suq).css("background", "orange")


        })

        $(".bodyer_top>img").eq(1).on("click", function () {
            num++;

            num = num > $(".bodyer_top>ul>li").length - 1 ? 0 : num;
            suq = num;
            $(".bodyer_top>ul>li").fadeOut(300);
            $(".bodyer_top>ul>li").eq(num).fadeIn(600);
            $(".bodyer_top>ol>li").css("background", "wheat")
            $(".bodyer_top>ol>li").eq(suq).css("background", "orange")


        })


        //自动轮播

        time = setInterval(function () {
            num++;
            num = num > $(".bodyer_top>ul>li").length - 1 ? 0 : num;
            $(".bodyer_top>ul>li").fadeOut(300);
            $(".bodyer_top>ul>li").eq(num).fadeIn(600);

            suq++;
            suq = suq > $(".bodyer_top>ul>li").length - 1 ? 0 : suq;
            $(".bodyer_top>ol>li").css("background", "wheat")
            $(".bodyer_top>ol>li").eq(suq).css("background", "orange")

        }, 3000)


        //图片自动变大

        $(".bodyer_list ul li").on("mouseenter", function () {
            console.log(1);
            $(this).children().children("div").css("border-bottom", "6px solid orange")
            $(this).children().children("h2").css("color", "orange")

            $(this).children().stop(true).children("div").children("img").animate({
                height: 363, width: 640
            }, 200, "swing")


        }).mouseleave(function () {
            $(this).children().children("div").css("border-bottom", "none")

            $(this).stop(true).children().children("div").children("img").animate({
                height: 343, width: 630
            }, 200, "swing")
            $(this).children().children("h2").css("color", "black")


        })


        //底部引用
        $(".foot").load("indexfoot.html");

        //like轮播图;

        var timer;
        var n = 0;
        var q = 0

        $(".bodyer_like").on("mouseenter", function () {
            clearInterval(timer)

            $(".bodyer_like").children("img").show(200)

        }).mouseleave(function () {
            $(".bodyer_like").children("img").hide(200)

            timer = setInterval(function () {
                n++;
                if (n == 5) {
                    n = 1;
                    $(".bodyer_like>div").css("left", "0")

                }
                $(".bodyer_like>div").stop().animate({
                    left: -1300 * n
                }, 500)

                q++;

                q = q == 5 ? 0 : q;
                $(".bodyer_like ol li").css("background", "wheat").eq(q).css("background", "orange")


            }, 3000)


        });

        $(".bodyer_like>img").eq(0).on("click", function () {
            n--;
            if (n < 0) {
                n = 4;
                $(".bodyer_like>div").css("left", `-${1300 * 5}px`)

            }
            $(".bodyer_like>div").stop().animate({
                left: -1300 * n
            }, 500)

            q--;

            q = q < 0 ? 4 : q
            $(".bodyer_like ol li").css("background", "wheat").eq(q).css("background", "orange")


        })

        $(".bodyer_like>img").eq(1).on("click", function () {
            n++;
            if (n == 5) {
                n = 1;
                $(".bodyer_like>div").css("left", "0")

            }
            $(".bodyer_like>div").stop().animate({
                left: -1300 * n
            }, 500)

            q++;

            q = q == 5 ? 0 : q
            $(".bodyer_like ol li").css("background", "wheat").eq(q).css("background", "orange")


        })

        //自动轮播;


        timer = setInterval(function () {
            n++;
            if (n == 5) {
                n = 1;
                $(".bodyer_like>div").css("left", "0")

            }
            $(".bodyer_like>div").stop().animate({
                left: -1300 * n
            }, 500)

            q++;

            q = q == 5 ? 0 : q
            $(".bodyer_like ol li").css("background", "wheat").eq(q).css("background", "orange")


        }, 3000)

        //点击进入详情页;

        $("#bodyList li").on("click",function () {

            localStorage.setItem("datalist",$(this).children("a").data("info"))
            location="/goods";

        })





    })

})
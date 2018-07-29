require(["config"], function () {
    require(["jquery"], function () {

        //加载头部;
        $(".header").load("navheader.html",function () {
            jQuery.getScript("js/navheader.js")
        })

        $(".footer").load("indexfoot.html")
        //

        $(window).ready(function () {


            console.log($(".nav_list"));


            //分割区----------------------------------------------------------------------


            //动态显示大图 的默认显示
            $(".data_left_big img").attr("src", $(".data_left_list ul li").eq(0).children("img").attr("src"))


            //动态显示大图;

            $(".data_left_list ul li").on("mouseenter", function () {
                $(this).css("border", "1px dashed #666666 ");

                console.log($(this).children("img").attr("src"));

                $(".data_left_big img").attr("src", $(this).children("img").attr("src"))

            }).mouseleave(function () {
                $(this).css("border-style", "none");

            })

            //颜色选择框
            $("#bodyColor span").eq(0).addClass("selectcolor")
            $("#bodyColor span").on("click", function () {
                console.log($(this).toggleClass("selectcolor").siblings().removeClass("selectcolor"));

            })
            //字体选择框
            //默认选择框
            $("#bodyFont a").eq(0).addClass("selectcolor")
            $("#bodyFont a").on("click", function () {
                console.log($(this).toggleClass("selectcolor").siblings().removeClass("selectcolor"));

            })

            //购物车加减
            $("#reduce").on("click", function () {

                $(this).next().val(Number($(this).next().val()) < 1 ? 0 : Number($(this).next().val()) - 1);


            })
            $("#add").on("click", function () {
                $(this).prev().val(Number($(this).prev().val()) + 1);


            })

            //大家都在买部分动画
            $(".bodyer_foot_left li").on("mouseenter", function () {
                $(this).children("div").children("img").animate({
                    width: 80, height: 80

                }, 100);

            }).mouseleave(function () {

                $(this).children("div").children("img").animate({
                    width: 64, height: 64

                }, 100);
            })




        })


    })

})
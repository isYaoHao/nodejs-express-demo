require(["config"], function () {
    require(["jquery"], function () {

        //加载头部;
        $(".header").load("navheader.html", function () {
            jQuery.getScript("js/navheader.js")
        })

        $(".footer").load("indexfoot.html")

        var dataList = window.localStorage.getItem("datalist");


        $.ajax({
            data: {
                datalist: dataList
            },
            url: "/goods/datalist",
            dataType: "json",
            type: "GET"
        }).then(function (res) {

            $(".bodyer_list_top a").eq(2).text(res.goodsname1);
            $(".bodyer_list_top a").eq(3).text(res.goodsname2);
            $(".bodyer_list_top a").eq(4).text(res.goodsname3);

            $(".bodyer_list_top span i").html(`&nbsp;&nbsp;&nbsp;${res.goodsid}`);

            $(".data_left_list ul li img").eq(0).prop("src", res.goodspt1);
            $(".data_left_list ul li img").eq(1).prop("src", res.goodspt2);
            $(".data_left_list ul li img").eq(2).prop("src", res.goodspt3);

            $(".data_left_big img").prop("src", res.goodspt1);

            $(".bodyer_data_right h4").eq(0).text(res.goodsname3)
            $(".bodyer_data_right p").eq(0).children("i").text(res.goodsprice)

            $("#detaillist li img").eq(0).prop("src", res.goodspt1);
            $("#detaillist li img").eq(1).prop("src", res.goodspt2);
            $("#detaillist li img").eq(2).prop("src", res.goodspt3);

        })


        //

        $(window).ready(function () {


            $(".nav_list");


            //分割区----------------------------------------------------------------------


            //动态显示大图 的默认显示
            $(".data_left_big img").attr("src", $(".data_left_list ul li").eq(0).children("img").attr("src"))


            //动态显示大图;

            $(".data_left_list ul li").on("mouseenter", function () {
                $(this).css("border", "1px dashed #666666 ");

                $(this).children("img").attr("src");

                $(".data_left_big img").attr("src", $(this).children("img").attr("src"))

                $("#leftBox img").prop("src",$(".data_left_big img").prop("src"))

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

            //放大镜功能;


            $(".data_left_big img").eq(0).prop("src")
            $("#leftBox").css("display","none");
            $("#moveBox").hide();
            $("#leftBox img").attr("src",$(".data_left_big img").attr("src"))



            var moveBoxWidth = $("#moveBox").width(),
                moveBoxHeight = $("#moveBox").height(),
                bigBoxWigth = $(".data_left_big").width(),
                bigBoxHeight = $(".data_left_big").height(),

                bigWidth = $('#big').width(),//放大图片盒子的宽度
                bigHeight = $('#big').height(),//放大图片盒子的高度


                rateX = bigWidth/moveBoxWidth,//放大区和遮罩层的宽度比例
                rateY = bigHeight/moveBoxHeight;//放大区和遮罩层的高度比例




            $(".data_left_big").hover(function (evt) {

                $("#moveBox").show();
                $("#leftBox").css("display","flex");


                $("#big").show();


            },function () {

                $("#moveBox").hide();
                $("#big").hide();
                $("#leftBox").css("display","none");


            }).mousemove(function (e) {
                $("#leftBox img").attr("src",$(".data_left_big img").attr("src"))
                var x = e.pageX,
                    y = e.pageY;
                $("#moveBox").offset({
                    left:e.pageX - moveBoxWidth / 2,
                    top: e.pageY - moveBoxHeight / 2
                })
                //获取遮罩层相对父元素的位置
                var cur = $('#moveBox').position(),
                    _top = cur.top,
                    _left = cur.left,
                    hdiffer = bigBoxHeight - moveBoxHeight,
                    wdiffer = bigBoxWigth - moveBoxWidth;
                console.log(_left);
                if (_top < 0) _top = 0;
                else if (_top > hdiffer) _top = hdiffer;
                if (_left < 0) _left = 0;
                else if (_left > wdiffer) _left =wdiffer;
                console.log(rateY);
                console.log(-rateX);

                //判断完成后设置遮罩层的范围
                $('#moveBox').css({
                    top: _top,
                    left: _left
                });

                //设置放大区图片移动
                $('#moveIMG').css({
                    top: - rateY*_top*0.63,
                    left: - rateX*_left*0.63
                });



            })
            //封装的改变图片显示的函数





        //购物车点击事件
            
            $("#payBox").on("click",function () {

                //判断是否登录
                if(sessionStorage.getItem("user") || localStorage.getItem("user")){

                    var datauser=JSON.parse(sessionStorage.getItem("user") || localStorage.getItem("user"))
                    var pid=$.trim($("#pid").text())
                    var paynum=$("#paynum").val();

                    console.log(datauser.uname);
                    console.log(pid);
                    console.log(paynum);

                    $.ajax({
                        data:{
                            username:datauser.uname,
                            goodsid:pid,
                            goodsnum:paynum
                        },
                        url:"http://10.41.151.12/php01/secoonet/server/paydata.php",
                        type:"POST",
                        dataType:"json"
                    }).then(function (res) {

                        console.log(res);
                        location="paydata.html"

                    })





                }
                
            })

            //添加购物车事件

            $("#cartBox").on("click",function () {

                if(sessionStorage.getItem("user") || localStorage.getItem("user")){

                    var datauser=JSON.parse(sessionStorage.getItem("user") || localStorage.getItem("user"))
                    var pid=$.trim($("#pid").text())
                    var paynum=$("#paynum").val();


                    $.ajax({
                        data:{
                            username:datauser.uname,
                            goodsid:pid,
                            goodsnum:paynum
                        },
                        url:"http://10.41.151.12/php01/secoonet/server/paydata.php",
                        type:"POST",
                        dataType:"json"
                    }).then(function (res) {



                    })


                }



                if(sessionStorage.getItem("user") || localStorage.getItem("user") ){
                    var userData=JSON.parse(window.sessionStorage.getItem("user") ||window.localStorage.getItem("user"))



                    $.ajax({
                        data:{username:userData.uname},
                        type:"POST",
                        url:"http://10.41.151.12/php01/secoonet/server/buycart.php",
                        dataType:"json"

                    }).then(function (res) {

                        if(res){
                            $("#cartNum").text(res.sumb)
                        } else {
                            $("#cartNum").text(0)
                        }

                    })


                }

            })

            




        })


    })

})
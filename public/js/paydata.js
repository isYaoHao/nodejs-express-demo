require(["config"], function () {
    require(["jquery"], function () {

        if (sessionStorage.getItem("user") || localStorage.getItem("user") ||{}) {
            var datauser = JSON.parse(sessionStorage.getItem("user") || localStorage.getItem("user") ||{})

            //登录退出按钮
            $(".bodyer_header").html(`${datauser.uname}<a id="loginout" href="javascript:">  退出</a>`);

            $("#loginout").on("click", function () {

                sessionStorage.clear("user");
                window.location.href = "login.html"

            })
            //请求数据


            $.ajax({
                data: {
                    uesername: datauser.uname
                },
                url: "http://10.41.151.12/php01/secoonet/server/paylist.php",
                type: "get",
                dataType: "json"

            }).then(function (res) {
                console.log(res);
                var sum=0;
                $("#tab").text("");

                //动态加载内容;
                $.map(res, function (ele, index) {



                    var str = "";

                    var total = Number(ele.goodsnum) * Number(ele.goodsprice)

                    console.log(total);

                    str += `<tr class="infodata" data-info=${JSON.stringify(ele.goodsid)}>`

                    str += `<td><input type="checkbox" class="cbox"></td>`
                    str += `<td class="tdbox"><img src=${ele.goodspt1} ><span>${ele.goodsname3}</span></td>`
                    str += `<td>中国大陆</td>`
                    str += `<td >¥<span class="goodsprice">${ele.goodsprice}</span></td>`
                    str += `<td><button class="reduce">-</button><input class="goodsnum" value=${Number(ele.goodsnum)}><button class="add">+</button></td>`
                    str += `<td>¥<span class="total">${total}</span>元</td>`
                    str += `<td><a href="javascript:" class="deleteone">删除</a> </td>`


                    sum+=total
                    $("#foottotal").text(`¥${sum}元`);


                    $("#tab").append(str);


                })

                str = "<div class='bodyer_delete'><input class='check' type='checkbox'> 全选 <a href='javascript:' class='deleteall'>删除选中商品</a></div> ";

                $(".bodyer_tab").append(str);


                //checkbox全选;

                $(".check").on("click", function () {

                    $("input:checkbox").prop("checked", $(this).prop("checked"));


                })

                //删除功能;


                //加减购物车数量


                //减
                $(".reduce").on("click", function () {

                    var index = $(this).index(".reduce");
                    console.log(index);

                    $(this).next().val(($(this).next().val() - 1) > 0 ? ($(this).next().val() - 1) : 0)

                    console.log(Number($(".total").eq(index).text()));
                    ;

                    $(".total").eq(index).text(Number($(".goodsprice").eq(index).text()) * Number($(".goodsnum").eq(index).val()));

                    reSet($(this))



                })
                //添加
                $(".add").on("click", function () {
                    var index = $(this).index(".add");

                    /*
                                        console.log(index);
                    */



                    $(this).prev().val($(this).prev().val() - 0 + 1);

                    $(".total").eq(index).text(Number($(".goodsprice").eq(index).text()) * Number($(".goodsnum").eq(index).val()));

                    reSet($(this))

                })
                //数值改变
                $(".goodsnum").on("input", function () {

                    var index = $(this).index(".goodsnum");

                    $(".total").eq(index).text(Number($(".goodsprice").eq(index).text()) * Number($(".goodsnum").eq(index).val()));

                    reSet($(this))


                })


                //删除操作;

                $(".deleteone").on("click", function () {

                    var index = $(this).index(".deleteone");
                    $(this).parents("tr").find(".goodsnum").val(0);
                    $(this).parents("tr").remove();

                    reSet($(this))



                })

                //全部删除

                $(".deleteall").on("click", function () {

                    $(".cbox:checked").parents("tr").find(".goodsnum").val('0');

                    $.map($(".cbox:checked").parents("tr").find(".goodsnum"),function (ele, index) {
                        reSet($(ele))
                    })

                    console.log($(".cbox:checked").parents("tr").remove());





                })





            })





        } else {

            $(".bodyer_header").html("<a href='login.html'>登录</a> 才能付款哦")
        }


        //封装局部刷新方法;
        function reSet(obj) {


            $.ajax({
                url:"http://10.41.151.12/php01/secoonet/server/resetdata.php",

                data: {
                    username:datauser.uname,
                    goodsid:obj.parents("tr").data("info"),
                    goodsnum:obj.parents("tr").find(".goodsnum").val()

                },
                type:"POST",
                dataType:"json"


            }).then(function (res) {

                $("#tab").text("");
                $("#foottotal").text("0元");
                console.log(res);

                var sum=0;

                console.log(Boolean(res));

                $.map(res || {}, function (ele, index) {
                    var str = "";

                    var total = Number(ele.goodsnum) * Number(ele.goodsprice)




                    str += `<tr class="infodata" data-info=${JSON.stringify(ele.goodsid)}>`

                    str += `<td><input type="checkbox" class="cbox"></td>`
                    str += `<td class="tdbox"><img src=${ele.goodspt1} ><span>${ele.goodsname3}</span></td>`
                    str += `<td>中国大陆</td>`
                    str += `<td >¥<span class="goodsprice">${ele.goodsprice}</span></td>`
                    str += `<td><button class="reduce">-</button><input class="goodsnum" value=${Number(ele.goodsnum)}><button class="add">+</button></td>`
                    str += `<td>¥<span class="total">${total}</span>元</td>`
                    str += `<td><a href="javascript:" class="deleteone">删除</a> </td>`

                    sum+=total;
                    $("#foottotal").text(`¥${sum}元`);




                    $("#tab").append(str);


                })

                //增加
                $(".add").on("click", function () {
                    var index = $(this).index(".add");
                    $(this).prev().val($(this).prev().val() - 0 + 1);

                    $(".total").eq(index).text(Number($(".goodsprice").eq(index).text()) * Number($(".goodsnum").eq(index).val()));

                    reSet($(this))

                })

                //数值改变change
                //数值改变
                $(".goodsnum").on("input", function () {

                    var index = $(this).index(".goodsnum");

                    $(".total").eq(index).text(Number($(".goodsprice").eq(index).text()) * Number($(".goodsnum").eq(index).val()));

                    reSet($(this))


                })

                //减
                $(".reduce").on("click", function () {

                    var index = $(this).index(".reduce");
                    console.log(index);

                    $(this).next().val(($(this).next().val() - 1) > 0 ? ($(this).next().val() - 1) : 0)

                    console.log(Number($(".total").eq(index).text()));
                    ;

                    $(".total").eq(index).text(Number($(".goodsprice").eq(index).text()) * Number($(".goodsnum").eq(index).val()));

                    reSet($(this))



                })

                //删除操作;

                $(".deleteone").on("click", function () {

                    var index = $(this).index(".deleteone");
                    $(this).parents("tr").find(".goodsnum").val(0);
                    $(this).parents("tr").remove();
                    reSet($(this))
                });


                //全部删除

                $(".deleteall").on("click", function () {

                    $(".cbox:checked").parents("tr").find(".goodsnum").val(0);

                    $.map($(".cbox:checked").parents("tr").find(".goodsnum"),function (ele, index) {
                        reSet($(ele))
                    })

                    console.log($(".cbox:checked").parents("tr").remove());

                })



            })


        }



    })

})


//config配置;
define("config",function () {

    require.config({
        urlArgs:"v="+new Date().getTime(),
        baseUrl:"./js",
        paths:{
            "jquery":["lib/jquery-1.11.1.min"],
            "md5":["lib/jquery.md5"],
            "jquery.validation":["lib/jquery-validation/jquery.validate"],
            "additional.methods":["lib/jquery-validation/additional-methods"],
            "idcode":["lib/idcode/jquery.idcode"]
        },
        shim:{
            "md5":{
                deps:["jquery"]
            },
            "idcode":{
                deps:["jquery"]
            }

        }
    })

})
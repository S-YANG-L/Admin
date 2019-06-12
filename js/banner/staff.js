var tmpl = '<li id="" class="weui-uploader__file eid" style="background-image:url(#url#)"></li>';
summerready = function() {
    summer.ajax({
        "header" : {
            Authorization : "OAuth2: token"
        },
        "type" : "POST",
        "url" : summer.getAppStorage('imgurl') + "/uploadfile/getfileinfo",
        "async" : "false",
        "param" : {
            token : summer.getAppStorage("tokenEntity").token,
            batchno : summer.getStorage("batchnum")
        },
    }, function(response) {//成功回调
        response.data = JSON.parse(response.data);
        var jsonArray1 = $summer.strToJson(response.data.message);
        $gallery = $("#gallery"),
        $galleryImg = $("#galleryImg"),
        $uploaderInput = $("#uploaderInput"),
        $uploaderFiles = $("#uploaderFiles");
        for ( i = 0; i < jsonArray1.length; i++) {
            var imgPathWS = jsonArray1[i].filePath;
            amgId = jsonArray1[i].fileId;
            $uploaderFiles.append($(tmpl.replace('#url#', imgPathWS)));
        }
        var index;
        var indexcount = 0;
        $uploaderFiles.on("click", "li", function() {
            index = $(this).index();
            indexcount = index + 1;
            $galleryImg.attr("style", this.getAttribute("style"));
            $gallery.fadeIn(100);
        });
        $gallery.on("click", function() {
            $gallery.fadeOut(100);
        });
        //删除图片
        $(".weui-gallery__del").click(function() {
            if (indexcount > jsonArray1.length) {
                $uploaderFiles.find("li").eq(index).remove();
                var num = index - jsonArray1.length;
                delte(num)
            } else if (amgId != '' || amgId != null) {
                delet(amgId)
                $uploaderFiles.find("li").eq(index).remove();
            }
        });
    }, function(response) {//失败回调
        alert("请联系管理员！");
    });
}
function openPhotoAlbum() {
    var params = ["android.permission.READ_EXTERNAL_STORAGE"];
    commonFunc(params, openPhotoAlbum_common);
}

function commonFunc(params, common) {
    if ($summer.os == "android") {
        summer.getPermission(params, function(response) {//成功回调
            common();
        }, function(response) {//失败回调
            alert("请联系管理员！");
        });
    } else {
        common();
    }
}

var imgPathes = [];

function delte(num) {
    imgPathes.splice(num, 1);
}

//打开系统相册，选择多张图片
var openPhotoAlbum_common = function() {
    summer.openPhotoAlbum({
        type : "multiple", //支持选多张图片
        maxCount : 9,
        callback : function(args) {
            imgPathes = args.imgPaths;
            $gallery = $("#gallery"),
            $galleryImg = $("#galleryImg"),
            $uploaderInput = $("#uploaderInput"),
            $uploaderFiles = $("#uploaderFiles");
            for ( i = 0; i < args.imgPaths.length; i++) {
                var imgPathWS = args.imgPaths[i].imgPath;
                $uploaderFiles.append($(tmpl.replace('#url#', imgPathWS)));
            }
        }
    });
}
function multiUploadCallback(args) {
    //$summer.alert(args);
    //$summer.alert("multiUpload,成功回调:" + JSON.stringify(args));
    summer.toast({
        "msg" : "图片上传成功"
    })
    summer.closeWin({});
}

function multiUploadErrCallback(args) {
    //$summer.alert(args);
    //$summer.alert("multiUpload,失败回调:" + args.error);
    summer.toast({
        "msg" : "图片上传失败"
    })
}

function submit() {
    if (imgPathes.length > 0) {
        //imagePaths为数组
        for ( i = 0; i < imgPathes.length; i++) {
            var imgPathWS = imgPathes[i].imgPath;
            //多文件上传，5秒超时
            summer.multiUpload({
                fileArray : [{//文件列表，数组
                    fileURL : imgPathWS, //需要上传的文件路径
                    type : "image/jpeg", //上传文件的类型 > 例：图片为"image/jpeg"
                    name : "imgs" //后台取图片的Key
                }],
                params : {
                    token : summer.getAppStorage("tokenEntity").token,
                    batchno : summer.getStorage("batchnum")
                }, //上传参数
                //headers : {},
                SERVER : summer.getAppStorage("imgurl") + "/uploadfile/uploadfilestoapp", //服务器地址
                timeout : 5
            }, "multiUploadCallback(args)", "multiUploadErrCallback(args)");
        }
    } else {
        summer.toast({
            "msg" : "无新照片上传!"
        })
    }
}

function delet(aid) {
    summer.ajax({
        "header" : {
            Authorization : "OAuth2: token"
        },
        "type" : "POST",
        "url" : summer.getAppStorage("imgurl") + "/uploadfile/deleteuploadimage",
        "async" : "false",
        "param" : {
            token : summer.getAppStorage("tokenEntity").token,
            key : aid
        },
    }, function(response) {//成功回调
        summer.toast({
            "msg" : "删除成功!"
        })
        summer.closeWin({});
    }, function(response) {//失败回调
        alert("请联系管理员！");
    });

}

function backClick() {
    summer.closeWin({});
}
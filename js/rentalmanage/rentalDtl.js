var tmpl = '<li id="" class="weui-uploader__file eid" style="background-image:url(#url#)"></li>';
summerready = function() {

    rentpd()
    house();
}
function rentpd() {
    var ad = summer.getStorage('roomStatus');
    if (ad == "不可租") {
        document.getElementById("1").setAttribute("selected", "selected");
    } else {
        document.getElementById("1").removeAttribute("selected");
    }
    if (ad == "一级租控") {
        document.getElementById("2").setAttribute("selected", "selected");
    } else {
        document.getElementById("2").removeAttribute("selected");
    }
    if (ad == "二级租控") {
        document.getElementById("3").setAttribute("selected", "selected");
    } else {
        document.getElementById("3").removeAttribute("selected");
    }
    if (ad == "已租") {
        document.getElementById("4").setAttribute("selected", "selected");
    } else {
        document.getElementById("4").removeAttribute("selected");
    }
    if (ad == "锁定") {
        document.getElementById("5").setAttribute("selected", "selected");
    } else {
        document.getElementById("5").removeAttribute("selected");
    }
}

var ViewModel = function() {
};
//Knockout绑定
var viewModel = new ViewModel();
function house() {
    summer.ajax({
        "header" : {
            Authorization : "OAuth2: token"
        },
        "type" : "POST",
        "url" : summer.getAppStorage('url') + "/lease/listLease",
        "async" : "false",
        "param" : {
            token : summer.getAppStorage("tokenEntity").token,
            tenantId : summer.getAppStorage("tenantId"),
            id : summer.getStorage('houseId')
        },
    }, function(response) {//成功回调
        response.data = JSON.parse(response.data);
        var jsonArray1 = response.data.listLease;
        viewModel.house = ko.observableArray(jsonArray1);
        ko.applyBindings(viewModel);
        tupian();
    }, function(response) {//失败回调
        alert("请联系管理员！");
    });
}

function backClick() {
    summer.closeWin({});
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
                    batchno : summer.getStorage('apartmentPhoto')
                }, //上传参数
                //headers : {},
                SERVER : summer.getAppStorage('imgurl') + "/uploadfile/uploadfilestoapp", //服务器地址
                timeout : 5
            }, "multiUploadCallback(args)", "multiUploadErrCallback(args)");
        }
    } else {
        summer.toast({
            "msg" : "无新照片上传!"
        })
    }
    var statis;
    if ($("#zlzt").val() == "不可租") {
        statis = "0";
    } else if ($("#zlzt").val() == "一级租控") {
        statis = "1";
    } else if ($("#zlzt").val() == "二级租控") {
        statis = "2";
    } else if ($("#zlzt").val() == "已租") {
        statis = "3";
    } else if ($("#zlzt").val() == "锁定") {
        statis = "4";
    }
    summer.ajax({
        "header" : {
            Authorization : "OAuth2: token"
        },
        "type" : "POST",
        "url" : summer.getAppStorage('url') + "/lease/saveLease",
        "param" : {
            token : summer.getAppStorage("tokenEntity").token,
            id : summer.getStorage('houseId'),
            houseRemark : $("#remark").val(),
            roomStatus : statis
        },
    }, function(response) {//成功回调
        summer.toast({
            "msg" : "保存成功"
        })
        summer.closeWin({});
    }, function(response) {//失败回调
        alert("请联系管理员！");
    });
}

function delet(aid) {
    summer.ajax({
        "header" : {
            Authorization : "OAuth2: token"
        },
        "type" : "POST",
        "url" : summer.getAppStorage('imgurl') + "/uploadfile/deleteuploadimage",
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

function tupian() {
    summer.ajax({
        "header" : {
            Authorization : "OAuth2: token"
        },
        "type" : "POST",
        "url" : summer.getAppStorage('imgurl') + "/uploadfile/getfileinfo",
        "async" : "false",
        "param" : {
            token : summer.getAppStorage("tokenEntity").token,
            batchno : summer.getStorage('apartmentPhoto')
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
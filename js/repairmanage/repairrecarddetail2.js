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
            batchno : summer.getStorage('repairImage1')
        },
    }, function(response) {//成功回调
        response.data = JSON.parse(response.data);
        var jsonArray1 = $summer.strToJson(response.data.message);
        $gallery = $("#gallery"),
        $galleryImg = $("#galleryImg"),
        $uploaderFiles = $("#uploaderFiles");
        for ( i = 0; i < jsonArray1.length; i++) {
            var imgPathWS = jsonArray1[i].filePath;
            $uploaderFiles.append($(tmpl.replace('#url#', imgPathWS)));
        }
        var index;
        $uploaderFiles.on("click", "li", function() {
            index = $(this).index();
            $galleryImg.attr("style", this.getAttribute("style"));
            $gallery.fadeIn(100);
        });
        $gallery.on("click", function() {
            $gallery.fadeOut(100);
        });
    }, function(response) {//失败回调
        alert("请联系管理员！");
    });
    summer.ajax({
        "header" : {
            Authorization : "OAuth2: token"
        },
        "type" : "POST",
        "url" : summer.getAppStorage('imgurl') + "/uploadfile/getfileinfo",
        "async" : "false",
        "param" : {
            token : summer.getAppStorage("tokenEntity").token,
            batchno : summer.getStorage('processPicture')
        },
    }, function(response) {//成功回调
        response.data = JSON.parse(response.data);
        var jsonArray1 = $summer.strToJson(response.data.message);
        $gallery = $("#gallery1"),
        $galleryImg = $("#galleryImg1"),
        $uploaderFiles = $("#uploaderFiles1");
        for ( i = 0; i < jsonArray1.length; i++) {
            var imgPathWS = jsonArray1[i].filePath;
            $uploaderFiles.append($(tmpl.replace('#url#', imgPathWS)));
        }
        var index;
        $uploaderFiles.on("click", "li", function() {
            index = $(this).index();
            $galleryImg.attr("style", this.getAttribute("style"));
            $gallery.fadeIn(100);
        });
        $gallery.on("click", function() {
            $gallery.fadeOut(100);
        });
    }, function(response) {//失败回调
        alert("请联系管理员！");
    });
    dasources();
}
var ViewModel = function() {
};
//Knockout绑定
var viewModel = new ViewModel();
function dasources() {
    summer.ajax({
        "header" : {
            Authorization : "OAuth2: token"
        },
        "type" : "POST",
        "url" : summer.getAppStorage('url') + "/workOrder/listOrderRcd",
        "param" : {
            token : summer.getAppStorage("tokenEntity").token,
            tenantId : summer.getAppStorage("tenantId"),
            id : summer.getStorage("repairrecarddetailId")
        },
    }, function(response) {//成功回调
        response.data = JSON.parse(response.data);
        var jsonArray = response.data.listOrderRcd;
        viewModel.data = ko.observableArray(jsonArray);
        ko.applyBindings(viewModel);
    }, function(response) {//失败回调
        alert(response.data);
        alert(response.error);
    });
}

function backClick() {
    summer.closeWin({});
}
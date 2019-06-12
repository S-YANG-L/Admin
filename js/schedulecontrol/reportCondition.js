var tmpl = '<li id="" class="weui-uploader__file eid" style="background-image:url(#url#)"></li>';
summerready = function() {
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
        "url" : summer.getAppStorage('url') + "/inspectionPlan/listReport",
        "param" : {
            token : summer.getAppStorage("tokenEntity").token,
            tenantId : summer.getAppStorage("tenantId"),
            prgInspectionAllId : summer.getStorage('prgInspectionAllId'),
            inspectionId : summer.getStorage('inspectionId')
        },
    }, function(response) {//成功回调
        response.data = JSON.parse(response.data);
        var jsonArray = response.data.listReport;
        if (jsonArray.length == 0) {

            //隐藏
            //$summer.css("listview", 'display:none');
            summer.toast({
                "msg" : "暂无上报信息"
            })
        } else {
            document.getElementById("listview").style.display = "";
            for (var i = 0; i < jsonArray.length; i++) {
                var imgId = jsonArray[i].picture;
                tupian(imgId);
            }
            viewModel.data = ko.observableArray(jsonArray);
            ko.applyBindings(viewModel);
        }
    }, function(response) {//失败回调
        alert("请联系管理员");
    });
}

function tupian(imgId) {
    summer.ajax({
        "header" : {
            Authorization : "OAuth2: token"
        },
        "type" : "POST",
        "url" : summer.getAppStorage('imgurl') + "/uploadfile/getfileinfo",
        "async" : "false",
        "param" : {
            token : summer.getAppStorage("tokenEntity").token,
            batchno : imgId
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
}

function backClick() {
    summer.closeWin({});
}
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
            batchno : summer.getStorage('repairImage')
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
    dasources();
}
var ViewModel = function() {
};
//Knockout绑定
var viewModel = new ViewModel();
//详情数据
function dasources() {
    summer.ajax({
        "header" : {
            Authorization : "OAuth2: token"
        },
        "type" : "POST",
        "url" : summer.getAppStorage('url') + "/workOrder/listOrder",
        "param" : {
            token : summer.getAppStorage("tokenEntity").token,
            tenantId : summer.getAppStorage("tenantId"),
            id : summer.getStorage("repairinfodetailId")
        },
    }, function(response) {//成功回调
        response.data = JSON.parse(response.data);
        var jsonArray = response.data.listOrder;
        viewModel.data = ko.observableArray(jsonArray);
        ko.applyBindings(viewModel);
    }, function(response) {//失败回调
        alert(response.data);
        alert(response.error);
    });
    dasources2()
}

//获取接单人
function dasources2() {
    $("#tzry").empty();
    summer.ajax({
        "header" : {
            Authorization : "OAuth2: token"
        },
        "type" : "POST",
        "url" : summer.getAppStorage('url') + "/contact/listStaff",
        "async" : true,
        "param" : {
            token : summer.getAppStorage("tokenEntity").token,
            tenantId : summer.getAppStorage("tenantId")
        },
    }, function(response) {//成功回调
        response.data = JSON.parse(response.data);
        var code = response.data.code;
        var listStaff = response.data.listStaff;
        if (code == "200") {
            for (var i = 0; i < listStaff.length; i++) {
                var Staff = listStaff[i];
                var $option = $('<option value="' + Staff.id + '">' + Staff.name + '</option>');
                $option.appendTo($("#jdr"));
            }
        }
    }, function(response) {//失败回调
        alert(response.data);
        alert(response.error);
    });
}

function submit() {
    summer.ajax({
        "header" : {
            Authorization : "OAuth2: token"
        },
        "type" : "POST",
        "url" : summer.getAppStorage('url') + "/workOrder/saveOrder",
        "param" : {
            token : summer.getAppStorage("tokenEntity").token,
            id : summer.getStorage("repairinfodetailId"),
            orderStatus : "7",
            singleId : $("#jdr").val()
        },
    }, function(response) {//成功回调
        summer.toast({
            "msg" : "派单成功!"
        })
        summer.rmStorage("repairinfodetailId");
        var t = (new Date()).valueOf();
        summer.openWin({
            "id" : "repairman" + t,
            "url" : "html/repairmanage/repairman.html"
        });
    }, function(response) {//失败回调
        alert("保存失败")
        alert(response.data);
        alert(response.error);
    });
}

function backClick() {
    summer.closeWin({});
}
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
        "url" : summer.getAppStorage('url') + "/inspectionPlan/listDecorationReg",
        "param" : {
            token : summer.getAppStorage("tokenEntity").token,
            tenantId : summer.getAppStorage("tenantId"),
            parentId : summer.getStorage('zxxj').id
        },
    }, function(response) {//成功回调
        response.data = JSON.parse(response.data);
        var jsonArray = response.data.listDecorationReg;
        var jsonArray2 = [{
            frequency : summer.getStorage('zxxj').frequency,
            inspectionPerson : summer.getStorage('zxxj').inspectionPerson,
            inspection : summer.getStorage('zxxj').inspection,
            inspectionStartTime : summer.getStorage('zxxj').inspectionStartTime,
            inspectionEndTime : summer.getStorage('zxxj').inspectionEndTime
        }]
        viewModel.data = ko.observableArray(jsonArray);
        viewModel.zxxj = ko.observableArray(jsonArray2);
        ko.applyBindings(viewModel);
    }, function(response) {//失败回调
        alert(response.data);
        alert(response.error);
    });
    dasources2();
}

//获取巡检人
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
                var $option = $('<option value="' + Staff.id + '" id="xunzhong' + i + '">' + Staff.name + '</option>');
                $option.appendTo($("#xjr"));
                if (summer.getStorage('zxxj').inspectionPersonId == Staff.id) {
                    document.getElementById("xunzhong" + i).setAttribute("selected", "selected")
                } else {
                    document.getElementById("xunzhong" + i).removeAttribute("selected")
                }
            }
        }
    }, function(response) {//失败回调i
        alert(response.data);
        alert(response.error);
    });
}

function publish() {
    summer.ajax({
        "header" : {
            Authorization : "OAuth2: token"
        },
        "type" : "POST",
        "url" : summer.getAppStorage('url') + "/inspectionPlan/saveInspectionPlan",
        "param" : {
            token : summer.getAppStorage("tokenEntity").token,
            id : summer.getStorage('zxxj').id,
            effectStatus : "1",
            inspectionPersonId : $("#xjr").val()
        },

    }, function(response) {//成功回调
        summer.toast({
            "msg" : "发布成功!"
        })
        open();
        summer.rmStorage('zxxj');
    }, function(response) {//失败回调
        alert("参数有误！");
    });
}

function open() {
    var t = (new Date()).valueOf();
    summer.openWin({
        id : 'workorder' + t,
        url : 'html/schedulecontrol/workorder.html'
    });
}

function backClick() {
    summer.closeWin({});
}
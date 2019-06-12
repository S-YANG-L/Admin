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
        "url" : summer.getAppStorage('url') + "/inspectionPlan/listInspectionMana",
        "param" : {
            token : summer.getAppStorage("tokenEntity").token,
            tenantId : summer.getAppStorage("tenantId"),
            parentId : summer.getStorage('yqxj').id
        },
    }, function(response) {//成功回调
        response.data = JSON.parse(response.data);
        var jsonArray = response.data.listInspectionMana;
        var jsonArray1 = [{
            frequency : summer.getStorage('yqxj').frequency,
            inspectionPerson : summer.getStorage('yqxj').inspectionPerson,
            inspection : summer.getStorage('yqxj').inspection,
            inspectionStartTime : summer.getStorage('yqxj').inspectionStartTime,
            inspectionEndTime : summer.getStorage('yqxj').inspectionEndTime
        }]
        viewModel.data = ko.observableArray(jsonArray);
        viewModel.yqxj = ko.observableArray(jsonArray1);
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

                if (summer.getStorage('yqxj').inspectionPersonId == Staff.id) {
                    document.getElementById("xunzhong" + i).setAttribute("selected", "selected")
                } else {
                    document.getElementById("xunzhong" + i).removeAttribute("selected")
                }
            }
        }
    }, function(response) {//失败回调
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
            id : summer.getStorage('yqxj').id,
            effectStatus : "1",
            inspectionPersonId : $("#xjr").val()
        },
    }, function(response) {//成功回调
        summer.toast({
            "msg" : "发布成功!"
        })
        open();
        summer.rmStorage('yqxj');
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
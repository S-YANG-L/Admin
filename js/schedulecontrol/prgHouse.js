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
        "url" : summer.getAppStorage('url') + "/inspectionPlan/listPrgHouse",
        "param" : {
            token : summer.getAppStorage("tokenEntity").token,
            tenantId : summer.getAppStorage("tenantId"),
            parentId : summer.getStorage('kgxj').id
        },
    }, function(response) {//成功回调
        response.data = JSON.parse(response.data);
        var jsonArray = response.data.listPrgHouse;
        var jsonArray1 = [{
            frequency : summer.getStorage('kgxj').frequency,
            inspectionPerson : summer.getStorage('kgxj').inspectionPerson,
            inspection : summer.getStorage('kgxj').inspection,
            inspectionStartTime : summer.getStorage('kgxj').inspectionStartTime,
            inspectionEndTime : summer.getStorage('kgxj').inspectionEndTime
        }]
        viewModel.data = ko.observableArray(jsonArray);
        viewModel.kgxj = ko.observableArray(jsonArray1);
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

                if (summer.getStorage('kgxj').inspectionPersonId == Staff.id) {
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
            id : summer.getStorage('kgxj').id,
            effectStatus : "1",
            inspectionPersonId : $("#xjr").val()
        },
    }, function(response) {//成功回调
        summer.toast({
            "msg" : "发布成功!"
        })
        open();
        summer.rmStorage('kgxj');
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
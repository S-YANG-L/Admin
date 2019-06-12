summerready = function() {
    dasources();
    dasources2()
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
        "url" : summer.getAppStorage('url') + "/appointment/listAppointment",
        "param" : {
            token : summer.getAppStorage("tokenEntity").token,
            tenantId : summer.getAppStorage("tenantId"),
            id : summer.getStorage('appointmentId')
        },
    }, function(response) {//成功回调
        response.data = JSON.parse(response.data);
        var jsonArray = response.data.listAppointment;
        viewModel.data = ko.observableArray(jsonArray);
        ko.applyBindings(viewModel);
    }, function(response) {//失败回调
        alert(response.error);
    });
}

//获取接待人
function dasources2() {
    $("#jdr").empty();
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

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "/";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

function agree() {
    if (summer.getStorage('billStatus') == "已审批" || summer.getStorage('billStatus') == "已拒绝") {
        summer.toast({
            "msg" : "已审批,不可重复进行!"
        })
    } else if (summer.getStorage('billStatus') == "待审批") {
        summer.ajax({
            "header" : {
                Authorization : "OAuth2: token"
            },
            "type" : "POST",
            "url" : summer.getAppStorage('url') + "/appointment/agree",
            "param" : {
                token : summer.getAppStorage("tokenEntity").token,
                id : summer.getStorage('appointmentId'),
                receiverId : $("#jdr").val(),
                billStatus : "1"
            },
        }, function(response) {//成功回调
            noticeAgree();
        }, function(response) {//失败回调
            alert(response.error);
        });
    }
}

function noticeAgree() {
    var curdate = getNowFormatDate();
    summer.ajax({
        "header" : {
            Authorization : "OAuth2: token"
        },
        "type" : "POST",
        "url" : summer.getAppStorage('url') + "/notice/saveNotice",
        "param" : {
            token : summer.getAppStorage("tokenEntity").token,
            tenantId : summer.getAppStorage("tenantId"),
            title : "预约看房",
            url : "",
            content : "您的预约已通过，请于" + summer.pageParam.applicantDate + "携带有效证件前来看房",
            customerId : summer.pageParam.applicantId,
            publisher : summer.getAppStorage("userName"),
            publishDate : curdate,
            type : "2"
        },
    }, function(response) {//成功回调
        summer.toast({
            "msg" : "审批同意"
        })
        summer.closeWin({});
    }, function(response) {//失败回调
        alert("参数有误！");
    });
}

function refuse() {
    if (summer.getStorage('billStatus') == "已审批" || summer.getStorage('billStatus') == "已拒绝") {
        summer.toast({
            "msg" : "已审批,不可重复进行!"
        })
    } else if (summer.getStorage('billStatus') == "待审批") {
        summer.ajax({
            "header" : {
                Authorization : "OAuth2: token"
            },
            "type" : "POST",
            "url" : summer.getAppStorage('url') + "/appointment/agree",
            "param" : {
                token : summer.getAppStorage("tokenEntity").token,
                id : summer.getStorage('appointmentId'),
                billStatus : "2"
            },
        }, function(response) {//成功回调
            noticeRefuse()
        }, function(response) {//失败回调
            alert(response.error);
        });
    }

}

function noticeRefuse() {
    var curdate = getNowFormatDate();
    summer.ajax({
        "header" : {
            Authorization : "OAuth2: token"
        },
        "type" : "POST",
        "url" : summer.getAppStorage('url') + "/notice/saveNotice",
        "param" : {
            token : summer.getAppStorage("tokenEntity").token,
            tenantId : summer.getAppStorage("tenantId"),
            title : "预约看房",
            url : "",
            content : "您的预约被拒绝，原因是:" + $("#zw").val(),
            customerId : summer.pageParam.applicantId,
            publisher : summer.getAppStorage("userName"),
            publishDate : curdate,
            type : "2"
        },
    }, function(response) {//成功回调
        summer.openWin({
            "id" : "refuse",
            "url" : "html/appointment/refuse.html",
            "pageParam" : {
                "id" : summer.getStorage('appointmentId')
            }
        });
    }, function(response) {//失败回调
        alert("参数有误！");
    });
}

function backClick() {
    summer.closeWin({});
}
summerready = function() {
    myFunction();
};
function myFunction() {
    summer.ajax({
        "header" : {
            Authorization : "OAuth2: token"
        },
        "type" : "POST",
        "url" : summer.getAppStorage('imgurl') + "/uploadfile/getfileinfo",
        "async" : "false",
        "param" : {
            token : summer.getAppStorage("tokenEntity").token,
            batchno : summer.getAppStorage("batchnumm")
        },
    }, function(response) {//成功回调
        response.data = JSON.parse(response.data);
        var jsonArray1 = $summer.strToJson(response.data.message);
        var list = jsonArray1;
        var islider = new iSlider({
            type : 'pic',
            data : list,
            dom : document.getElementById("iSlider-wrapper"),
            isLooping : true,
            animateType : 'default',
            isAutoplay : true,
            animateTime : 800
        });
        islider.addDot();
    }, function(response) {//失败回调
        alert("请联系管理员！");
    });
}

//房屋管理
function house() {
    var t = (new Date()).valueOf();
    summer.openWin({
        id : 'propertyInfo' + t,
        url : 'html/rentalmanage/propertyInfo.html',
    });
}

//物业缴费
function customers() {
    var t = (new Date()).valueOf();
    summer.openWin({
        id : 'customers' + t,
        url : 'html/customers/customerList.html',
    });
}

//工单管理
function repair() {
    var t = (new Date()).valueOf();
    summer.openWin({
        id : 'repairman' + t,
        url : 'html/repairmanage/repairman.html',
    });
}

//考勤管理
function attendance() {
    getJingwei();
}

function getJingwei() {
    UM.showLoadingBar({
        text : "位置更新中......",
        icons : 'ti-loading',
    });
    var onSuccess = function(position) {
        summer.setStorage('longitude', position.coords.longitude);
        //经度
        summer.setStorage('latitude', position.coords.latitude);
        //维度
        goAttendance();
    };
    function onError(error) {
        UM.toast({
            text : '获取位置信息失败'
        });
        goAttendance();
    }


    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

//跳向签到
function goAttendance() {
    UM.hideLoadingBar();
    //关闭提示
    var t = (new Date()).valueOf();
    summer.openWin({
        id : 'attendance_check' + t,
        url : 'html/attendance/attendance_check.html',
    });
}

//租赁管理
function rental() {
    var t = (new Date()).valueOf();
    summer.openWin({
        id : 'customers' + t,
        url : 'html/buildingmanage/village.html',
    });
}

//功程管理
function schedule() {
    var t = (new Date()).valueOf();
    summer.openWin({
        id : 'workorder' + t,
        url : 'html/schedulecontrol/workorder.html',
    });
}

function contract() {
    var t = (new Date()).valueOf();
    summer.openWin({
        "id" : "contractList" + t,
        "url" : "html/contract/contractList.html"
    });
}

function appointment() {
    var t = (new Date()).valueOf();
    summer.openWin({
        "id" : "appointmentList" + t,
        "url" : "html/appointment/appointmentList.html"
    });
}
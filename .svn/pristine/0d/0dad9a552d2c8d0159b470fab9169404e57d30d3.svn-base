//保存外勤打卡信息
function outwork(t) {
    summer.post(summer.getAppStorage('url') + "/checkingin/itinerancy", {
        "officeHours" : $("#startTime").val(), //开始时间
        "closingTime" : $("#end").val(), //结束时间
        "name" : summer.getAppStorage("userName"), //发起人
        "location" : $("#location").val(), //地点
        "outworkCause" : $("#outworkCause").val(), //申请原因
        "userId" : summer.getAppStorage("userId"), //员工id
        "tenantId" : summer.getAppStorage("tenantId"), //租户id
        "token" : summer.getAppStorage("tokenEntity").token
    }, {
        Authorization : "OAuth2:token"
    }, function(response) {
        summer.toast({
            "msg" : "上报成功"
        })//response.data = JSON.parse(response.data);
        //var restate=response.data.state;
        //alert(restate);
        summer.closeWin({});
    }, function(response) {
        summer.toast({
            "msg" : "上报失败"
        })
    });

}

function backClick() {
    summer.closeWin({});
}
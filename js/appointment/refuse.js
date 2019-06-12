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
            "url" : summer.getAppStorage('url') + "/appointment/save",
            "param" : {
                token : summer.getAppStorage("tokenEntity").token,
                id : summer.pageParam.id,
                reason : $("#zw").val()
            },
        }, function(response) {//成功回调
            summer.toast({
                "msg" : "审批拒绝"
            });
            var t = (new Date()).valueOf();
            summer.openWin({
                "id" : "appointmentList" + t,
                "url" : "html/appointment/appointmentList.html"
            });
            summer.closeWin({});
            summer.closeWin("appointmentDtl")
        }, function(response) {//失败回调
            alert(response.error);
        });
    }

}

function backClick() {
    summer.closeWin({});
}
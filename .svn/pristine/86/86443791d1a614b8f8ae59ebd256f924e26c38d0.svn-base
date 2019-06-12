//修改密码
function updatematerial() {
    var loginId = summer.getAppStorage("loginId");
    var oldPass = $("#old").val();
    var newPass = $("#new").val() + "";
    var newsPass = $("#news").val() + "";
    if (oldPass == "" || newPass == "" || newsPass == "") {
        UM.toast({
            text : '请输入密码'
        });
    } else if (newPass !== newsPass) {
        UM.toast({
            text : '新密码输入不一致'
        });
    } else {
        summer.post(summer.getAppStorage("url") + "/CustodianLongin/updateMaterisl", {
            "token" : summer.getAppStorage("tokenEntity").token,
            "loginId" : loginId,
            "oldPassword" : oldPass,
            "newPassword" : newPass
        }, {
            Authorization : "OAuth2: token"
        }, function(response) {
            if ("Token已过期，请重新登录" == response.data) {
                UM.toast({
                    text : '登录已失效，请重新登录'
                });
                var t = (new Date()).valueOf();
                summer.setAppStorage("tokenEntity", "");
                summer.openWin({
                    "id" : "signin" + t,
                    "url" : "/html/signin.html"
                });
            }
            response.data = JSON.parse(response.data);
            var code = response.data.code;
            if (code == 200) {
                UM.toast({
                    text : '修改密码成功'
                });
                var user = response.data.user;
                var userId = user.id;
                //ID
                var userName = user.name;
                //姓名
                var loginId = user.loginId;
                //登录名
                var tenantid = user.tenantid;
                //租户id
                var password = user.password;
                //密码
                var tokenEntity = response.data.tokenEntity;
                //        	var jsonStr = JSON.stringify(tokenEntity);
                //       	alert("jsonStr=="+jsonStr);
                //        	alert(userId+","+userName+","+userPhone+","+userPassword);
                //保存到localServer
                summer.setAppStorage("userId", userId);
                summer.setAppStorage("userName", userName);
                summer.setAppStorage("loginId", loginId);
                summer.setAppStorage("tenantId", tenantid);
                //        	summer.setAppStorage("userPassword",userPassword);
                summer.setAppStorage("tokenEntity", tokenEntity);

                summer.setAppStorage("tokenEntity", "");
                summer.openWin({
                    "id" : "signin" + t,
                    "url" : '/html/signin.html'
                });
            } else if (202 == code) {
                UM.toast({
                    text : '旧密码错误'
                });
            }
        }, function(response) {
            //alert(response.error);
        });
    }
}
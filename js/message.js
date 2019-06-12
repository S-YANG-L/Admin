﻿summerready = function() {
    async2();
}
var ViewModel = function() {
};
//Knockout绑定
var viewModel = new ViewModel();
function async2() {
    summer.ajax({
        "header" : {
            Authorization : "OAuth2: token"
        },
        "type" : "POST",
        "url" : summer.getAppStorage('url') + '/order/getbacklog',
        "param" : {
            "token" : summer.getAppStorage("tokenEntity").token,
            "singleId" : summer.getAppStorage("userId"),
            "tenantId" : summer.getAppStorage("tenantId")
        },
    }, function(response) {//成功回调
        response.data = JSON.parse(response.data);
        var jsonArray1 = response.data.order;
        var length = jsonArray1.length;
        if (length > 0) {
            document.getElementById("s1").style.display = "block";
        }
        var jsonArray2 = [{
            msgNum : length
        }];
        viewModel.listTodo = ko.observableArray(jsonArray2);
        ko.applyBindings(viewModel);
    }, function(response) {//失败回调
        alert(response.data);
        alert(response.error);
    });
}

function notice() {
    var t = (new Date()).valueOf();
    summer.openWin({
        id : 'repairinfodetail' + t,
        url : '/html/memomange/memorecord.html'
    });

}

function deal() {
    var t = (new Date()).valueOf();
    summer.openWin({
        id : 'work_order' + t,
        url : '/html/messagemanage/work_order.html'
    });
}
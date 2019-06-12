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
        "url" : summer.getAppStorage('url') + "/workOrder/listOrderRcd",
        "param" : {
            token : summer.getAppStorage("tokenEntity").token,
            tenantId : summer.getAppStorage("tenantId"),
            id : summer.getStorage('repairrecarddetailId')
        },
    }, function(response) {//成功回调
        response.data = JSON.parse(response.data);
        var jsonArray = response.data.listOrderRcd;
        viewModel.data = ko.observableArray(jsonArray);
        ko.applyBindings(viewModel);
    }, function(response) {//失败回调
        alert("请联系管理员解决！");
    });
}

function backClick() {
    summer.closeWin({});
}
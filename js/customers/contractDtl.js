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
        "url" : summer.getAppStorage('url') + "/contract/listContract",
        "param" : {
            token : summer.getAppStorage("tokenEntity").token,
            tenantId : summer.getAppStorage("tenantId"),
            contractNumber : summer.getStorage('contractId')
        },
    }, function(response) {//成功回调
        response.data = JSON.parse(response.data);
        var jsonArray = response.data.listContract;
        viewModel.data = ko.observableArray(jsonArray);
        ko.applyBindings(viewModel);
    }, function(response) {//失败回调
        alert(response.error);
    });
}

function backClick() {
    summer.closeWin({});
}
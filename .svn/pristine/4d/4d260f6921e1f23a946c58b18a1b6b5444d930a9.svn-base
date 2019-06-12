summerready = function() {
    async1();
}
var ViewModel = function() {
};
//Knockout绑定
var viewModel = new ViewModel();
function async1() {
    summer.ajax({
        "header" : {
            "Content-Type" : "application/json"
        },
        "type" : "POST",
        "url" : summer.getAppStorage('url') + "/contact/listClientP",
        "async" : false,
        "param" : {
            tenantId : 1
        },
    }, function(response) {//成功回调
        response.data = JSON.parse(response.data);
        var jsonArray2 = response.data.listClientP;
        var jsonArray3 = response.data.listClientG;
        viewModel.listClientP = ko.observableArray(jsonArray2);
        viewModel.listClientG = ko.observableArray(jsonArray3);
        ko.applyBindings(viewModel);
    }, function(response) {//失败回调
        alert("请联系管理员解决！");
    });
    async2();
}

function async2() {
    summer.ajax({
        "header" : {
            "Content-Type" : "application/json"
        },
        "type" : "POST",
        "url" : summer.getAppStorage('url') + "/contact/listStaff",
        "param" : {
            tenantId : 1
        },
    }, function(response) {//成功回调
        response.data = JSON.parse(response.data);
        var jsonArray1 = response.data.listStaff;
        summer.setStorage('jsonArray1', jsonArray1)
        viewModel.listStaff = ko.observableArray(summer.getStorage('jsonArray1'));
        ko.tasks.runEarly();
        ko.applyBindings(viewModel);
    }, function(response) {//失败回调
        alert("请联系管理员解决！");
    });
}
function backClick() {
    summer.closeWin({});
}
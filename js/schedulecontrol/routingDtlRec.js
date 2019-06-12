var ViewModel = function() {
};
//Knockout绑定
var viewModel = new ViewModel();
summerready = function() {
    summer.ajax({
        "header" : {
            Authorization : "OAuth2: token"
        },
        "type" : "POST",
        "url" : summer.getAppStorage('url') + "/inspectionPlan/listDeviceInspection",
        "param" : {
            token : summer.getAppStorage("tokenEntity").token,
            tenantId : summer.getAppStorage("tenantId"),
            parentId : summer.getStorage('sbxj').id
        },
    }, function(response) {//成功回调
        response.data = JSON.parse(response.data);
        var jsonArray = response.data.listDeviceInspection;
        var jsonArray1 = [{
            frequency : summer.getStorage('sbxj').frequency,
            finishNumber : summer.getStorage('sbxj').finishNumber,
            inspectionPerson : summer.getStorage('sbxj').inspectionPerson,
            inspection : summer.getStorage('sbxj').inspection,
            inspectionStartTime : summer.getStorage('sbxj').inspectionStartTime,
            inspectionEndTime : summer.getStorage('sbxj').inspectionEndTime
        }]
        viewModel.data = ko.observableArray(jsonArray);
        viewModel.sbxj = ko.observableArray(jsonArray1);
        ko.applyBindings(viewModel);
    }, function(response) {//失败回调
        alert("请联系管理员解决");
    });
}
var listview = UM.listview("#listview");
listview.on("itemClick", function(sender, args) {
    //这里可以处理行点击事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
    var item = viewModel.data()[args.rowIndex];
    summer.setStorage('inspectionId', item.id)
    summer.setStorage('prgInspectionAllId', item.parentId)
    var t = (new Date()).valueOf();
    summer.openWin({
        id : 'reportCondition' + t,
        url : 'html/schedulecontrol/reportCondition.html'
    });
});
function backClick() {
    summer.closeWin({});
}
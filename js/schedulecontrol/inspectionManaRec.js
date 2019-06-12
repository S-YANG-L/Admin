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
        "url" : summer.getAppStorage('url') + "/inspectionPlan/listInspectionMana",
        "param" : {
            token : summer.getAppStorage("tokenEntity").token,
            tenantId : summer.getAppStorage("tenantId"),
            parentId : summer.getStorage('yqxj').id
        },
    }, function(response) {//成功回调
        response.data = JSON.parse(response.data);
        var jsonArray = response.data.listInspectionMana;
        var jsonArray1 = [{
            frequency : summer.getStorage('yqxj').frequency,
            finishNumber : summer.getStorage('yqxj').finishNumber,
            inspectionPerson : summer.getStorage('yqxj').inspectionPerson,
            inspection : summer.getStorage('yqxj').inspection,
            inspectionStartTime : summer.getStorage('yqxj').inspectionStartTime,
            inspectionEndTime : summer.getStorage('yqxj').inspectionEndTime
        }]
        viewModel.data = ko.observableArray(jsonArray);
        viewModel.yqxj = ko.observableArray(jsonArray1);
        ko.applyBindings(viewModel);
    }, function(response) {//失败回调
        alert(response.data);
        alert(response.error);
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
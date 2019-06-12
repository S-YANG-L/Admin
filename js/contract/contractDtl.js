summerready = function() {
    dasources();
    var listview = UM.listview("#listview");
    listview.on("itemClick", function(sender, args) {
        //这里可以处理行点击事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
        var item = viewModel.data1()[args.rowIndex];
        var fId = item.id;
        var fName = item.fileName;
        downloadFile(fId, fName);
    });
}
//附件下载
function downloadFile(fId, fName) {
    cordova.InAppBrowser.open(summer.getAppStorage('imgurl') + '/base?cmd=downloadAffixForMobile&fid=' + fId, '_system', 'location=yes,toolbar=yes,toolbarposition=top,closebuttoncaption=关闭');
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
            customerId : summer.getStorage('customerId'),
            contractNumber : summer.getStorage('contractId')
        },
    }, function(response) {//成功回调
        response.data = JSON.parse(response.data);
        var jsonArray = response.data.listContract;
        var jsonArray1 = response.data.listContract[0].documentFiles;
        viewModel.data = ko.observableArray(jsonArray);
        viewModel.data1 = ko.observableArray(jsonArray1);
        ko.applyBindings(viewModel);
    }, function(response) {//失败回调
        alert(response.error);
    });
}

function backClick() {
    summer.closeWin({});
}
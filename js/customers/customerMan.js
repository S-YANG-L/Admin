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
            Authorization : "OAuth2: token"
        },
        "type" : "POST",
        "url" : summer.getAppStorage('url') + "/customers/listBill",
        "async" : true,
        "param" : {
            token : summer.getAppStorage("tokenEntity").token,
            tenantId : summer.getAppStorage("tenantId"),
            customerId : summer.getStorage('customerId')
        },
    }, function(response) {//成功回调
        response.data = JSON.parse(response.data);
        var jsonArray1 = response.data.listBills;
        if (jsonArray1.length < 1) {
            $summer.css("listview1", 'display:none');
        }
        viewModel.listBills = ko.observableArray(jsonArray1);
        ko.applyBindings(viewModel);
    }, function(response) {//失败回调
        alert(response.data);
        alert(response.error);
    });
}

window.setTimeout(function() {
    summer.ajax({
        "header" : {
            Authorization : "OAuth2: token"
        },
        "type" : "POST",
        "url" : summer.getAppStorage('url') + "/customers/listContract",
        "async" : true,
        "param" : {
            token : summer.getAppStorage("tokenEntity").token,
            tenantId : summer.getAppStorage("tenantId"),
            customerId : summer.getStorage('customerId')
        },
    }, function(response) {//成功回调
        response.data = JSON.parse(response.data);
        var jsonArray1 = response.data.listContract;
        summer.setStorage('jsonArray1', jsonArray1)
        viewModel.listContract = ko.observableArray(summer.getStorage('jsonArray1'));
        ko.applyBindings(viewModel);
    }, function(response) {//失败回调
        alert(response.data);
        alert(response.error);
    });
}, 500);

$(function() {
    var listview = UM.listview("#listview");
    //添加控件方法
    listview.on("itemClick", function(sender, args) {
        //这里可以处理行点击事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
        var item = viewModel.listContract()[args.rowIndex];
        summer.setStorage('contractNumber', item.contractNumber)
        var t = (new Date()).valueOf();
        summer.openWin({
            id : 'contractDtl' + t,
            url : '/html/customers/contractDtl.html'
        });

    });
});
$(function() {
    var listview = UM.listview("#listview1");
    //添加控件方法
    listview.on("itemClick", function(sender, args) {
        //这里可以处理行点击事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
        var item = viewModel.listBills()[args.rowIndex];
        summer.setStorage('billId', item.id)
        summer.getStorage('customerId')
        var t = (new Date()).valueOf();
        summer.openWin({
            id : 'payType' + t,
            url : '/html/customers/payType.html',
            pageParam : {
                userId : summer.getStorage('customerId')
            }
        });

    });
});
function backClick() {
    summer.closeWin({});
}
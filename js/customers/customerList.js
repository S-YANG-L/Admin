var ViewModel = function() {
};
var viewModel = new ViewModel();
var title = "";
summerready = function() {
    netService(title, 0);
    viewModel.data = ko.observableArray([]);
    ko.applyBindings(viewModel);
    var listview = UM.listview("#listview");
    listview.on("itemClick", function(sender, args) {
        //这里可以处理行点击事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
        var item = viewModel.data()[args.rowIndex];
        var t = (new Date()).valueOf();
        summer.openWin({
            id : 'customerMan' + t,
            url : 'html/customers/customerMan.html'
        });
        summer.setStorage('customerId', item.customerId)
        summer.setStorage('customerName', item.customerName)
    });
}
//搜索的方法
function searchClick() {
    title = document.getElementById("sear").value;
    //请求页置为0
    netService(title, 0);
}

//网络请求
function netService(title, type) {
    summer.ajax({
        "header" : {
            Authorization : "OAuth2: token"
        },
        "type" : "POST",
        "url" : summer.getAppStorage('url') + "/customers/listCustomers",
        "param" : {
            "token" : summer.getAppStorage("tokenEntity").token,
            "tenantId" : summer.getAppStorage("tenantId"),
            "customerName" : title
        },
    }, function(response) {//成功回调
        var data = JSON.parse(response.data);
        if (type == 0) {//下拉刷新
            viewModel.data.removeAll();
        }
        if (data.code == "200") {
            var jsonArray = data.listCustomers;
            for (var i = 0; i < jsonArray.length; i++) {
                var entity = jsonArray[i];
                viewModel.data.push(entity)
            }
        }
    }, function(response) {//失败回调
        alert("请联系管理员解决！");
    });
}

function backClick() {
    summer.closeWin({});
}
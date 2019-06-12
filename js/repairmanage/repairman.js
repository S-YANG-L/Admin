var ViewModel = function() {
};
var viewModel = new ViewModel();
var title = "";
var start = 0;
summerready = function() {
    netService(title, 0);
    viewModel.data = ko.observableArray([]);
    viewModel.data1 = ko.observableArray([]);
    ko.applyBindings(viewModel);
    var listview = UM.listview("#listview");
    listview.on("itemClick", function(sender, args) {
        //这里可以处理行点击事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
        var item = viewModel.data()[args.rowIndex];
        summer.setStorage('repairinfodetailId', item.id)
        summer.setStorage('repairImage', item.repairImage)
        //投诉、咨询
        if (item.orderType == "投诉、咨询类") {
            var t = (new Date()).valueOf();
            summer.openWin({
                id : 'repairinfodetail' + t,
                url : '/html/repairmanage/repairinfodetail.html'
            });
        } else if (item.orderType == "报修类") {
            //报修
            var t = (new Date()).valueOf();
            summer.openWin({
                id : 'repairinfodetail2' + t,
                url : '/html/repairmanage/repairinfodetail2.html'
            });
        } else if (item.orderType == "预约类") {
            //预约
            var t = (new Date()).valueOf();
            summer.openWin({
                id : 'repairinfodetail3' + t,
                url : '/html/repairmanage/repairinfodetail3.html'
            });
        }
    });
    var listview1 = UM.listview("#listview1");
    listview1.on("itemClick", function(sender, args) {
        //这里可以处理行点击事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
        var item = viewModel.data1()[args.rowIndex];
        summer.setStorage('repairrecarddetailId', item.id)
        summer.setStorage('repairImage1', item.repairImage)
        summer.setStorage('processPicture', item.processPicture)
        if (item.orderType == "投诉、咨询类") {
            var t = (new Date()).valueOf();
            summer.openWin({
                id : 'repairrecarddetail' + t,
                url : '/html/repairmanage/repairrecarddetail.html'
            });
        } else if (item.orderType == "报修类") {
            //报修
            var t = (new Date()).valueOf();
            summer.openWin({
                id : 'repairrecarddetail2' + t,
                url : '/html/repairmanage/repairrecarddetail2.html'
            });
        } else if (item.orderType == "预约类") {
            //预约
            var t = (new Date()).valueOf();
            summer.openWin({
                id : 'repairrecarddetail3' + t,
                url : '/html/repairmanage/repairrecarddetail3.html'
            });
        }
    });
    listview.on("pullUp", function(sender) {
        start += 10;
        //这是可以编写列表上拉加载逻辑，参数sender即为当前列表实例对象
        summer.ajax({
            "header" : {
                Authorization : "OAuth2: token"
            },
            "type" : "POST",
            "url" : summer.getAppStorage('url') + "/workOrder/listOrder",
            "param" : {
                "token" : summer.getAppStorage("tokenEntity").token,
                "tenantId" : summer.getAppStorage("tenantId"),
                "orderContent" : title,
                "start" : start
            },
        }, function(response) {//成功回调
            var data = JSON.parse(response.data);
            if (data.code == "200") {
                var jsonArray = data.listOrder;
                if (jsonArray.length > 0) {
                    for (var i = 0; i < jsonArray.length; i++) {
                        var entity = jsonArray[i];
                        viewModel.data.push(entity)
                        sender.refresh();
                    }
                } else {
                    viewModel.data.push()
                    sender.refresh();
                    summer.toast({
                        "msg" : "数据已全部加载"
                    })
                }
            }
        }, function(response) {//失败回调
            alert("请联系管理员解决！");
        });
    });
    listview1.on("pullUp", function(sender) {
        start += 10;
        //这是可以编写列表上拉加载逻辑，参数sender即为当前列表实例对象
        summer.ajax({
            "header" : {
                Authorization : "OAuth2: token"
            },
            "type" : "POST",
            "url" : summer.getAppStorage('url') + "/workOrder/listOrderRcd",
            "param" : {
                "token" : summer.getAppStorage("tokenEntity").token,
                "tenantId" : summer.getAppStorage("tenantId"),
                "orderContent" : title,
                "start" : start
            },
        }, function(response) {//成功回调
            var data = JSON.parse(response.data);
            if (data.code == "200") {
                var jsonArray = data.listOrderRcd;
                if (jsonArray.length > 0) {
                    for (var i = 0; i < jsonArray.length; i++) {
                        var entity = jsonArray[i];
                        viewModel.data1.push(entity)
                        sender.refresh();
                    }
                } else {
                    viewModel.data.push()
                    sender.refresh();
                    summer.toast({
                        "msg" : "数据已全部加载"
                    })
                }
            }
        }, function(response) {//失败回调
            alert("请联系管理员解决！");
        });
    });
}
//搜索的方法
function searchClick() {
    title = document.getElementById("sear").value;
    start = 0;
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
        "url" : summer.getAppStorage('url') + "/workOrder/listOrder",
        "param" : {
            "token" : summer.getAppStorage("tokenEntity").token,
            "tenantId" : summer.getAppStorage("tenantId"),
            "orderContent" : title,
            "start" : start
        },
    }, function(response) {//成功回调
        var data = JSON.parse(response.data);
        if (type == 0) {//下拉刷新
            viewModel.data.removeAll();
        }
        if (data.code == "200") {
            var jsonArray = data.listOrder;
            if (jsonArray.length > 0) {
                for (var i = 0; i < jsonArray.length; i++) {
                    var entity = jsonArray[i];
                    viewModel.data.push(entity)
                }
            } else {
                summer.toast({
                    "msg" : "暂无工单信息"
                })
            }
        }
    }, function(response) {//失败回调
        alert("请联系管理员解决！");
    });
}

//搜索的方法
function searchClick1() {
    title = document.getElementById("sear1").value;
    start = 0;
    //请求页置为0
    netService1(title, 0);
}

//网络请求
function netService1(title, type) {
    summer.ajax({
        "header" : {
            Authorization : "OAuth2: token"
        },
        "type" : "POST",
        "url" : summer.getAppStorage('url') + "/workOrder/listOrderRcd",
        "param" : {
            "token" : summer.getAppStorage("tokenEntity").token,
            "tenantId" : summer.getAppStorage("tenantId"),
            "orderContent" : title,
            "start" : start
        },
    }, function(response) {//成功回调
        var data = JSON.parse(response.data);
        if (type == 0) {//下拉刷新
            viewModel.data1.removeAll();
        }
        if (data.code == "200") {
            var jsonArray = data.listOrderRcd;
            if (jsonArray.length > 0) {
                for (var i = 0; i < jsonArray.length; i++) {
                    var entity = jsonArray[i];
                    viewModel.data1.push(entity)
                }
            } else {
                summer.toast({
                    "msg" : "暂无工单记录"
                })
            }

        }
    }, function(response) {//失败回调
        alert("请联系管理员解决！");
    });
}

function backClick() {
    summer.closeWin({});
}
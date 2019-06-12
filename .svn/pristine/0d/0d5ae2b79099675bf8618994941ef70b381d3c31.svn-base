var ViewModel = function() {
};
var viewModel = new ViewModel();
var title = "";
var start = 0;
summerready = function() {
    netService(title, 0);
    viewModel.data = ko.observableArray([]);
    ko.applyBindings(viewModel);
    var listview = UM.listview("#listview2");
    listview.on("itemClick", function(sender, args) {
        //这里可以处理行点击事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
        var item = viewModel.data()[args.rowIndex];
        summer.setStorage('cust2Id', item.id)
        var t = (new Date()).valueOf();
        summer.openWin({
            id : 'custDtl2' + t,
            url : '/html/custDtl2.html'
        });
    });
    listview.on("pullUp", function(sender) {
        start += 10;
        //这是可以编写列表上拉加载逻辑，参数sender即为当前列表实例对象
        summer.ajax({
            "header" : {
                Authorization : "OAuth2: token"
            },
            "type" : "POST",
            "url" : summer.getAppStorage('url') + "/contact/listClientG",
            "param" : {
                "token" : summer.getAppStorage("tokenEntity").token,
                "tenantId" : summer.getAppStorage("tenantId"),
                "name" : title,
                "start" : start
            },
        }, function(response) {//成功回调
            var data = JSON.parse(response.data);
            if (data.code == "200") {
                var jsonArray = data.listClientG;
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
        "url" : summer.getAppStorage('url') + "/contact/listClientG",
        "param" : {
            "token" : summer.getAppStorage("tokenEntity").token,
            "tenantId" : summer.getAppStorage("tenantId"),
            "companyName" : title,
            "start" : start
        },
    }, function(response) {//成功回调
        var data = JSON.parse(response.data);
        if (type == 0) {//下拉刷新
            viewModel.data.removeAll();
        }
        if (data.code == "200") {
            var jsonArray = data.listClientG;
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
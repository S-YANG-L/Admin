var ViewModel = function() {
};
var viewModel = new ViewModel();
var title = "";
summerready = function() {
    netService(title, 0);
    viewModel.data = ko.observableArray([]);
    viewModel.data1 = ko.observableArray([]);
    ko.applyBindings(viewModel);
}
function searchClick() {
    title = "";
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
        "url" : summer.getAppStorage('url') + "/house/rPeople",
        "param" : {
            token : summer.getAppStorage("tokenEntity").token,
            tenantId : summer.getAppStorage("tenantId"),
            baseHouseId : summer.getStorage('houseId')
        },
    }, function(response) {//成功回调
        var data = JSON.parse(response.data);
        if (type == 0) {//下拉刷新
            viewModel.data.removeAll();
        }
        if (data.code == "200") {
            var jsonArray = data.rentPeoples;
            if (jsonArray.length == 0) {
                $summer.css("listview1", 'display:none');
                summer.toast({
                    "msg" : "暂无出租信息"
                })
            } else {
                for (var i = 0; i < jsonArray.length; i++) {
                    var entity = jsonArray[i];
                    viewModel.data.push(entity)
                }
            }

        }
    }, function(response) {//失败回调
        alert("请联系管理员解决！");
    });
}
function searchClick1() {
    title = "";
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
        "url" : summer.getAppStorage('url') + "/house/rPeopleRec",
        "param" : {
            token : summer.getAppStorage("tokenEntity").token,
            tenantId : summer.getAppStorage("tenantId"),
            baseHouseId : summer.getStorage('houseId')
        },
    }, function(response) {//成功回调
        var data = JSON.parse(response.data);
        if (type == 0) {//下拉刷新
            viewModel.data.removeAll();
        }
        if (data.code == "200") {
            var jsonArray = data.rPeopleRec;
            if (jsonArray.length == 0) {
                $summer.css("listview2", 'display:none');
                summer.toast({
                    "msg" : "暂无租客记录"
                })
            } else {
                for (var i = 0; i < jsonArray.length; i++) {
                    var entity = jsonArray[i];
                    viewModel.data1.push(entity)
                }
            }
        }
    }, function(response) {//失败回调
        alert("请联系管理员解决！");
    });
}

function backClick() {
    summer.closeWin({});
}
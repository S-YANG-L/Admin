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
        "url" : summer.getAppStorage('url') + "/waitingCenter/listDone",
        "async" : true,
        "param" : {
            token : summer.getAppStorage("tokenEntity").token,
            needUserId : summer.getAppStorage("userId")
        },
    }, function(response) {//成功回调
        response.data = JSON.parse(response.data);
        var jsonArray2 = response.data.listDone;
        viewModel.listDone = ko.observableArray(jsonArray2);
        ko.applyBindings(viewModel);
    }, function(response) {//失败回调
        alert(response.data);
        alert(response.error);
    });
    async2()
}

function async2() {
    summer.ajax({
        "header" : {
            Authorization : "OAuth2: token"
        },
        "type" : "POST",
        "url" : summer.getAppStorage('url') + "/waitingCenter/listTodo",
        "async" : true,
        "param" : {
            token : summer.getAppStorage("tokenEntity").token,
            needUserId : summer.getAppStorage("userId")
        },
    }, function(response) {//成功回调
        response.data = JSON.parse(response.data);
        var jsonArray1 = response.data.listTodo;
        viewModel.listTodo = ko.observableArray(jsonArray1);
        ko.applyBindings(viewModel);
    }, function(response) {//失败回调
        alert(response.data);
        alert(response.error);
    });
}

$(function() {
    var listview = UM.listview("#listview");
    //添加控件方法
    listview.on("itemClick", function(sender, args) {
        //这里可以处理行点击事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
        var item = viewModel.listTodo()[args.rowIndex];
        summer.setStorage('repairinfodetailId', item.busId)
        summer.setStorage('todoId', item.id)
        var t = (new Date()).valueOf();
        summer.openWin({
            id : 'todoDtl' + t,
            url : '/html/messagemanage/todoDtl.html'
        });
    });
});
$(function() {
    var listview = UM.listview("#listview1");
    //添加控件方法
    listview.on("itemClick", function(sender, args) {
        //这里可以处理行点击事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
        var item = viewModel.listDone()[args.rowIndex];
        summer.setStorage('repairrecarddetailId', item.busId)
        summer.setStorage('doneId', item.id)
        var t = (new Date()).valueOf();
        summer.openWin({
            id : 'doneDtl' + t,
            url : '/html/messagemanage/doneDtl.html'
        });
    });
});
function backClick() {
    summer.closeWin({});
}

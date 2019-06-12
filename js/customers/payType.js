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
        "url" : summer.getAppStorage('url') + "/customers/listBillDtl",
        "param" : {
            token : summer.getAppStorage("tokenEntity").token,
            tenantId : summer.getAppStorage("tenantId"),
            billId : summer.getStorage('billId')
        },
    }, function(response) {//成功回调
        response.data = JSON.parse(response.data);
        var code = response.data.code;
        var jsonArray = response.data.listBillDtl;
        var account = 0;
        for (var i = 0; i < jsonArray.length; i++) {
            var num = jsonArray[i];
            account += num.plannedReceiptAmount;
        }
        var jsonArray1 = [{
            customerName : summer.getStorage("customerName"),
            account : account,
            billId : summer.getStorage('billId')
        }]
        viewModel.data = ko.observableArray(jsonArray);
        viewModel.data1 = ko.observableArray(jsonArray1);
        ko.applyBindings(viewModel);
    }, function(response) {//失败回调
        alert(response.data);
        alert(response.error);
    });
}

function submit() {
    var curdate = getNowFormatDate();
    summer.ajax({
        "header" : {
            Authorization : "OAuth2: token"
        },
        "type" : "POST",
        "url" : summer.getAppStorage('url') + "/notice/saveNotice",
        "param" : {
            token : summer.getAppStorage("tokenEntity").token,
            tenantId : summer.getAppStorage("tenantId"),
            title : "账单催缴",
            url : "",
            content : "您有账单未清缴，请及时处理！！！",
            customerId : summer.pageParam.userId,
            publisher : summer.getAppStorage("userName"),
            publishDate : curdate,
            type : "2"
        },
    }, function(response) {//成功回调
        summer.toast({
            "msg" : "催缴成功!"
        })
        summer.closeWin({});
    }, function(response) {//失败回调
        alert("参数有误！");
    });
}

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "/";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

function backClick() {
    summer.closeWin({});
}
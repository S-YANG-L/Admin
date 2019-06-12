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
        "url" : summer.getAppStorage('url') + "/contact/listClientP",
        "param" : {
            token : summer.getAppStorage("tokenEntity").token,
            tenantId : summer.getAppStorage("tenantId"),
            id : summer.getStorage('custId')
        },
    }, function(response) {//成功回调
        response.data = JSON.parse(response.data);
        var jsonArray = response.data.listClientP;
        viewModel.data = ko.observableArray(jsonArray);
        ko.applyBindings(viewModel);
    }, function(response) {//失败回调
        alert("请联系管理员解决！");
    });
}

function backClick() {
    summer.closeWin({});
}

function callphone() {
    //判断是否进行通话
    UM.confirm({
        title : '提示',
        text : '您正在进行通话操作,是否继续',
        btnText : ["取消", "确定"],
        overlay : true,
        ok : function() {
            var number = document.getElementById("phone").innerHTML;
            summer.callPhone(number);
        },
        cancle : function() {
            //$this.css('backgroundColor', '#007aff');
        }
    });
}
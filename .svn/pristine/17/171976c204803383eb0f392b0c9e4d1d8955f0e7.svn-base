var ViewModel = function() {
};
var viewModel = new ViewModel();
var title = "";
var start = 0;
summerready = function() {
    netService(title, 0);
    viewModel.data = ko.observableArray([]);
    ko.applyBindings(viewModel);
    var listview = UM.listview("#listview");
    //添加控件方法
    listview.on("itemClick", function(sender, args) {
        //这里可以处理行点击事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
        var xjjh = viewModel.data()[args.rowIndex];
        if (xjjh.inspection == "设备巡检") {
            summer.setStorage('sbxj', xjjh);
            //设备巡检
            var t = (new Date()).valueOf();
            summer.openWin({
                id : 'routingDtl' + t,
                url : 'html/schedulecontrol/routingDtl.html'
            });
        } else if (xjjh.inspection == "装修巡检") {
            summer.setStorage('zxxj', xjjh);
            //装修巡检
            var t = (new Date()).valueOf();
            summer.openWin({
                id : 'decorationReg' + t,
                url : 'html/schedulecontrol/decorationReg.html'
            });
        } else if (xjjh.inspection == "空关巡检") {
            summer.setStorage('kgxj', xjjh);
            //空关巡检
            var t = (new Date()).valueOf();
            summer.openWin({
                id : 'prgHouse' + t,
                url : 'html/schedulecontrol/prgHouse.html'
            });
        } else if (xjjh.inspection == "园区楼宇巡检") {
            summer.setStorage('yqxj', xjjh);
            //园区巡检
            var t = (new Date()).valueOf();
            summer.openWin({
                id : 'inspectionMana' + t,
                url : 'html/schedulecontrol/inspectionMana.html'
            });
        }
    });
    listview.on("pullUp", function(sender) {
        start += 10;
        var dstart = $("#start").val();
        var dend = $("#end").val();
        var startDate = "";
        var endDate = "";
        if (dstart == "" || dstart == null) {
            startDate = "1000/01/01";
        } else {
            startDate = dstart.replace(/\s[\x00-\xff]*/g, '');
        }
        if (dend == "" || dend == null) {
            endDate = "9999/12/31";
        } else {
            endDate = dend.replace(/\s[\x00-\xff]*/g, '');
        }
        //这是可以编写列表上拉加载逻辑，参数sender即为当前列表实例对象
        summer.ajax({
            "header" : {
                Authorization : "OAuth2: token"
            },
            "type" : "POST",
            "url" : summer.getAppStorage('url') + "/inspectionPlan/listInspectionPlan",
            "param" : {
                token : summer.getAppStorage("tokenEntity").token,
                tenantId : summer.getAppStorage("tenantId"),
                effectStatus : 0,
                title : title,
                inspectionStartTime : startDate,
                inspectionEndTime : endDate,
                start : start
            },
        }, function(response) {//成功回调
            var data = JSON.parse(response.data);
            if (data.code == "200") {
                var jsonArray = data.listInspectionPlan;
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

//筛选的方法
function check() {
    title = '';
    start = 0;
    //请求页置为0
    netService(title, 0);
}

//网络请求
function netService(title, type) {
    var dstart = $("#start").val();
    var dend = $("#end").val();
    var startDate = "";
    var endDate = "";
    if (dstart == "" || dstart == null) {
        startDate = "1000/01/01";
    } else {
        startDate = dstart.replace(/\s[\x00-\xff]*/g, '');
    }
    if (dend == "" || dend == null) {
        endDate = "9999/12/31";
    } else {
        endDate = dend.replace(/\s[\x00-\xff]*/g, '');
    }
    summer.ajax({
        "header" : {
            Authorization : "OAuth2: token"
        },
        "type" : "POST",
        "url" : summer.getAppStorage('url') + "/inspectionPlan/listInspectionPlan",
        "param" : {
            token : summer.getAppStorage("tokenEntity").token,
            tenantId : summer.getAppStorage("tenantId"),
            effectStatus : 0,
            title : title,
            inspectionStartTime : startDate,
            inspectionEndTime : endDate,
            start : start
        },
    }, function(response) {//成功回调
        var data = JSON.parse(response.data);
        if (type == 0) {//下拉刷新
            viewModel.data.removeAll();
        }
        if (data.code == "200") {
            var jsonArray = data.listInspectionPlan;
            if (jsonArray.length == 0) {
                summer.toast({
                    "msg" : "暂无巡检计划"
                })
            } else {
                for (var i = 0; i < jsonArray.length; i++) {
                    var entity = jsonArray[i];
                    viewModel.data.push(entity)
                }
            }

        }
        document.getElementById("start").value = "";
        document.getElementById("end").value = "";
        $('.um-dark').fadeOut(100);
        $('.um-screenbox').slideUp(200);
    }, function(response) {//失败回调
        alert("请联系管理员解决！");
    });
}

function routingrecord() {
    var t = (new Date()).valueOf();
    summer.openWin({
        "id" : "workorderRec" + t,
        "url" : "html/schedulecontrol/workorderRec.html"
    });
}

//筛选内容重置
function formReset() {
    document.getElementById("start").value = "";
    document.getElementById("end").value = "";

}

function backClick() {
    summer.closeWin({});
}
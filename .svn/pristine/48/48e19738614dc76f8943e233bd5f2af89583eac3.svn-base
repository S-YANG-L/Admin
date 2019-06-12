function work_order_info(t, i) {
    //获取id
    var id = $("#orderID" + i).val();
    var timestamp = (new Date()).valueOf();
    //var t = (new Date()).valueOf();
    summer.openWin({//55
        "id" : "work_order_info" + timestamp,
        "url" : "/html/messagemanage/work_order_info.html?id=" + id
    });
}

//跳向已完成工单详情页面
function result_feedback(t, i) {
    //获取id
    var id = $("#recordID" + i).val();
    var t = (new Date()).valueOf();
    summer.openWin({
        id : 'result_feedback' + t,
        url : '/html/messagemanage/result_feedback.html?id=' + id
    });
}

//已接单跳向工作记录
function work_record(t, i) {
    var id = $("#recordID" + i).val();
    var t = (new Date()).valueOf();
    summer.openWin({//57
        "id" : "work_record" + t,
        "url" : "/html/messagemanage/work_record.html?id=" + id
    });
}

//代办事项
function commission() {
    $("#orderCommission0").empty();
    $("#commission1").val("");
    $("#commission2").val("");
    summer.ajax({
        type : 'post',
        url : summer.getAppStorage('url') + '/order/getbacklog',
        param : {
            "token" : summer.getAppStorage("tokenEntity").token,
            "singleId" : summer.getAppStorage("userId"),
            "tenantId" : summer.getAppStorage("tenantId")
        },
        header : {
            Authorization : "OAuth2: token"
        }
    }, function(response) {
        response.data = JSON.parse(response.data);
        var state = response.data.state;
        var orderList = response.data.order;
        //alert(state);
        if (state == "200") {
            for (var i = 0; i < orderList.length; i++) {
                var order = orderList[i];
                //投诉咨询
                if (order.orderType == "0") {
                    var $li = $('<li>' + '<a href="#" class="btn" onclick="work_order_info(this,' + i + ')">' + '<input type="hidden" value="' + order.idString + '" id="orderID' + i + '" />' + '<div class="center-icon">' + '<img alt="" src="../../img/bill-icon.png">' + '</div>' + '<div class="um-media-body">' + '<h4 class="um-media-heading um-mobilebt32">' + order.orderContent + '</h4>' + '<p class="um-mobilebthui"> 联系人:' + order.realEstateCustomer + '</p>' + '<p class="um-mobilebthui"> 电话:' + order.contactNumber + '</p>' + '<p class="um-mobilebthui"> 制单日期:' + order.draftDate + '</p>' + '</div>' + '</a>' + '</li>');
                    $li.appendTo($("#orderCommission0"));
                }
                //报修
                if (order.orderType == "1") {
                    var $li = $('<li>' + '<a href="#" class="btn" onclick="work_order_info(this,' + i + ')">' + '<input type="hidden" value="' + order.idString + '" id="orderID' + i + '" />' + '<div class="center-icon">' + '<img alt="" src="../../img/bill-icon.png">' + '</div>' + '<div class="um-media-body">' + '<h4 class="um-media-heading um-mobilebt32">' + order.orderContent + '</h4>' + '<p class="um-mobilebthui"> 报修人:' + order.repairPeople + '</p>' + '<p class="um-mobilebthui"> 电话:' + order.contactNumber + '</p>' + '<p class="um-mobilebthui"> 制单日期:' + order.draftDate + '</p>' + '</div>' + '</a>' + '</li>');
                    $li.appendTo($("#orderCommission0"));
                }
                //预约
                if (order.orderType == "2") {
                    var $li = $('<li>' + '<a href="#" class="btn" onclick="work_order_info(this,' + i + ')">' + '<input type="hidden" value="' + order.idString + '" id="orderID' + i + '" />' + '<div class="center-icon">' + '<img alt="" src="../../img/bill-icon.png">' + '</div>' + '<div class="um-media-body">' + '<h4 class="um-media-heading um-mobilebt32">' + order.orderContent + '</h4>' + '<p class="um-mobilebthui"> 联系人:' + order.realEstateCustomer + '</p>' + '<p class="um-mobilebthui"> 电话:' + order.contactNumber + '</p>' + '<p class="um-mobilebthui"> 制单日期:' + order.draftDate + '</p>' + '</div>' + '</a>' + '</li>');
                    $li.appendTo($("#orderCommission0"));
                }

            }
        } else {
            summer.toast({
                "msg" : state
            })
        }

    });
}

//已接单
function alreadyTakeOrders() {
    $("#orderCommission1").empty();
    $("#commission0").val("");
    $("#commission2").val("");
    summer.ajax({
        type : 'post',
        url : summer.getAppStorage('url') + '/order/gettakeorders',
        param : {
            "token" : summer.getAppStorage("tokenEntity").token,
            "singleId" : summer.getAppStorage("userId"),
            "tenantId" : summer.getAppStorage("tenantId")
        },
        header : {
            Authorization : "OAuth2: token"
        }
    }, function(response) {
        response.data = JSON.parse(response.data);
        var state = response.data.state;
        var orderList = response.data.order;
        //alert(state);
        if (state == "200") {
            for (var i = 0; i < orderList.length; i++) {
                var order = orderList[i];
                //alert(order.orderType);
                //投诉咨询
                if (order.orderType == "0") {
                    var $li = $('<li>' + '<a href="#" class="btn" onclick="work_record(this,' + i + ')">' + '<input type="hidden" value="' + order.idString + '" id="recordID' + i + '" />' + '<div class="center-icon">' + '<img alt="" src="../../img/bill-icon.png">' + '</div>' + '<div class="um-media-body">' + '<h4 class="um-media-heading um-mobilebt32">' + order.orderContent + '</h4>' + '<p class="um-mobilebthui"> 联系人:' + order.realEstateCustomer + '</p>' + '<p class="um-mobilebthui"> 电话:' + order.contactNumber + '</p>' + '<p class="um-mobilebthui"> 制单日期:' + order.draftDate + '</p>' + '</div>' + '</a>' + '</li>');
                    $li.appendTo($("#orderCommission1"));
                }
                //报修
                if (order.orderType == "1") {
                    var $li = $('<li>' + '<a href="#" class="btn" onclick="work_record(this,' + i + ')">' + '<input type="hidden" value="' + order.idString + '" id="recordID' + i + '" />' + '<div class="center-icon">' + '<img alt="" src="../../img/bill-icon.png">' + '</div>' + '<div class="um-media-body">' + '<h4 class="um-media-heading um-mobilebt32">' + order.orderContent + '</h4>' + '<p class="um-mobilebthui"> 报修人:' + order.repairPeople + '</p>' + '<p class="um-mobilebthui"> 电话:' + order.contactNumber + '</p>' + '<p class="um-mobilebthui"> 制单日期:' + order.draftDate + '</p>' + '</div>' + '</a>' + '</li>');
                    $li.appendTo($("#orderCommission1"));
                }
                //预约
                if (order.orderType == "2") {
                    var $li = $('<li>' + '<a href="#" class="btn" onclick="work_record(this,' + i + ')">' + '<input type="hidden" value="' + order.idString + '" id="recordID' + i + '" />' + '<div class="center-icon">' + '<img alt="" src="../../img/bill-icon.png">' + '</div>' + '<div class="um-media-body">' + '<h4 class="um-media-heading um-mobilebt32">' + order.orderContent + '</h4>' + '<p class="um-mobilebthui"> 联系人:' + order.realEstateCustomer + '</p>' + '<p class="um-mobilebthui"> 电话:' + order.contactNumber + '</p>' + '<p class="um-mobilebthui"> 制单日期:' + order.draftDate + '</p>' + '</div>' + '</a>' + '</li>');
                    $li.appendTo($("#orderCommission1"));
                }
            }
        } else {
            summer.toast({
                "msg" : state
            })
        }
    });
}

//模糊查询已接单
function takeOrders() {
    var orderContent = $("#commission1").val();
    $("#orderCommission1").empty();
    summer.ajax({
        type : 'post',
        url : summer.getAppStorage('url') + '/order/obscure',
        param : {
            "token" : summer.getAppStorage("tokenEntity").token,
            "singleId" : summer.getAppStorage("userId"),
            "tenantId" : summer.getAppStorage("tenantId"),
            "orderContent" : orderContent,
            "state" : 1

        },
        header : {
            Authorization : "OAuth2: token"
        }
    }, function(response) {
        response.data = JSON.parse(response.data);
        var state = response.data.state;
        var orderList = response.data.order;
        //alert(state);
        if (state == "200") {
            for (var i = 0; i < orderList.length; i++) {
                var order = orderList[i];
                //投诉咨询
                if (order.orderType == "0") {
                    var $li = $('<li>' + '<a href="#" class="btn" onclick="work_record(this,' + i + ')">' + '<input type="hidden" value="' + order.idString + '" id="recordID' + i + '" />' + '<div class="center-icon">' + '<img alt="" src="../../img/bill-icon.png">' + '</div>' + '<div class="um-media-body">' + '<h4 class="um-media-heading um-mobilebt32">' + order.orderContent + '</h4>' + '<p class="um-mobilebthui"> 联系人:' + order.realEstateCustomer + '</p>' + '<p class="um-mobilebthui"> 电话:' + order.contactNumber + '</p>' + '<p class="um-mobilebthui"> 制单日期:' + order.draftDate + '</p>' + '</div>' + '</a>' + '</li>');
                    $li.appendTo($("#orderCommission1"));
                }
                //报修
                if (order.orderType == "1") {
                    var $li = $('<li>' + '<a href="#" class="btn" onclick="work_record(this,' + i + ')">' + '<input type="hidden" value="' + order.idString + '" id="recordID' + i + '" />' + '<div class="center-icon">' + '<img alt="" src="../../img/bill-icon.png">' + '</div>' + '<div class="um-media-body">' + '<h4 class="um-media-heading um-mobilebt32">' + order.orderContent + '</h4>' + '<p class="um-mobilebthui"> 报修人:' + order.repairPeople + '</p>' + '<p class="um-mobilebthui"> 电话:' + order.contactNumber + '</p>' + '<p class="um-mobilebthui"> 制单日期:' + order.draftDate + '</p>' + '</div>' + '</a>' + '</li>');
                    $li.appendTo($("#orderCommission1"));
                }
                //预约
                if (order.orderType == "2") {
                    var $li = $('<li>' + '<a href="#" class="btn" onclick="work_record(this,' + i + ')">' + '<input type="hidden" value="' + order.idString + '" id="recordID' + i + '" />' + '<div class="center-icon">' + '<img alt="" src="../../img/bill-icon.png">' + '</div>' + '<div class="um-media-body">' + '<h4 class="um-media-heading um-mobilebt32">' + order.orderContent + '</h4>' + '<p class="um-mobilebthui"> 联系人:' + order.realEstateCustomer + '</p>' + '<p class="um-mobilebthui"> 电话:' + order.contactNumber + '</p>' + '<p class="um-mobilebthui"> 制单日期:' + order.draftDate + '</p>' + '</div>' + '</a>' + '</li>');
                    $li.appendTo($("#orderCommission1"));
                }
            }
        } else {
            summer.toast({
                "msg" : state
            })
        }
    });
}

//根据工单模糊查询
function obscure() {
    var orderContent = $("#commission0").val();
    $("#orderCommission0").empty();
    summer.ajax({
        type : 'post',
        url : summer.getAppStorage('url') + '/order/obscure',
        param : {
            "token" : summer.getAppStorage("tokenEntity").token,
            "singleId" : summer.getAppStorage("userId"),
            "tenantId" : summer.getAppStorage("tenantId"),
            "orderContent" : orderContent,
            "state" : 0
        },
        header : {
            Authorization : "OAuth2: token"
        }
    }, function(response) {
        response.data = JSON.parse(response.data);
        var state = response.data.state;
        var orderList = response.data.order;
        //alert(state);
        if (state == "200") {
            for (var i = 0; i < orderList.length; i++) {
                var order = orderList[i];
                //投诉咨询
                if (order.orderType == "0") {
                    var $li = $('<li>' + '<a href="#" class="btn" onclick="work_order_info(this,' + i + ')">' + '<input type="hidden" value="' + order.idString + '" id="orderID' + i + '" />' + '<div class="center-icon">' + '<img alt="" src="../../img/bill-icon.png">' + '</div>' + '<div class="um-media-body">' + '<h4 class="um-media-heading um-mobilebt32">' + order.orderContent + '</h4>' + '<p class="um-mobilebthui"> 联系人:' + order.realEstateCustomer + '</p>' + '<p class="um-mobilebthui"> 电话:' + order.contactNumber + '</p>' + '<p class="um-mobilebthui"> 制单日期:' + order.draftDate + '</p>' + '</div>' + '</a>' + '</li>');
                    $li.appendTo($("#orderCommission0"));
                }
                //报修
                if (order.orderType == "1") {
                    var $li = $('<li>' + '<a href="#" class="btn" onclick="work_order_info(this,' + i + ')">' + '<input type="hidden" value="' + order.idString + '" id="orderID' + i + '" />' + '<div class="center-icon">' + '<img alt="" src="../../img/bill-icon.png">' + '</div>' + '<div class="um-media-body">' + '<h4 class="um-media-heading um-mobilebt32">' + order.orderContent + '</h4>' + '<p class="um-mobilebthui"> 报修人:' + order.repairPeople + '</p>' + '<p class="um-mobilebthui"> 电话:' + order.contactNumber + '</p>' + '<p class="um-mobilebthui"> 制单日期:' + order.draftDate + '</p>' + '</div>' + '</a>' + '</li>');
                    $li.appendTo($("#orderCommission0"));
                }
                //预约
                if (order.orderType == "2") {
                    var $li = $('<li>' + '<a href="#" class="btn" onclick="work_order_info(this,' + i + ')">' + '<input type="hidden" value="' + order.idString + '" id="orderID' + i + '" />' + '<div class="center-icon">' + '<img alt="" src="../../img/bill-icon.png">' + '</div>' + '<div class="um-media-body">' + '<h4 class="um-media-heading um-mobilebt32">' + order.orderContent + '</h4>' + '<p class="um-mobilebthui"> 联系人:' + order.realEstateCustomer + '</p>' + '<p class="um-mobilebthui"> 电话:' + order.contactNumber + '</p>' + '<p class="um-mobilebthui"> 制单日期:' + order.draftDate + '</p>' + '</div>' + '</a>' + '</li>');
                    $li.appendTo($("#orderCommission0"));
                }
            }
        } else {
            summer.toast({
                "msg" : state
            })
        }
    });
}

//获取已完成
function accomplish() {
    //alert("1111");
    $("#orderCommission2").empty();
    $("#commission0").val("");
    $("#commission1").val("");
    summer.ajax({
        type : 'post',
        url : summer.getAppStorage('url') + '/order/getaccomplish',
        param : {
            "token" : summer.getAppStorage("tokenEntity").token,
            "singleId" : summer.getAppStorage("userId"),
            "tenantId" : summer.getAppStorage("tenantId")
        },
        header : {
            Authorization : "OAuth2: token"
        }
    }, function(response) {
        response.data = JSON.parse(response.data);
        var state = response.data.state;
        var orderList = response.data.order;
        //alert(state);
        if (state == "200") {
            for (var i = 0; i < orderList.length; i++) {
                var order = orderList[i];
                //投诉咨询
                if (order.orderType == "0") {
                    var $li = $('<li>' + '<a href="#" class="btn" onclick="result_feedback(this,' + i + ')">' + '<input type="hidden" value="' + order.idString + '" id="recordID' + i + '" />' + '<div class="center-icon">' + '<img alt="" src="../../img/bill-icon.png">' + '</div>' + '<div class="um-media-body">' + '<h4 class="um-media-heading um-mobilebt32">' + order.orderContent + '</h4>' + '<p class="um-mobilebthui"> 联系人:' + order.realEstateCustomer + '</p>' + '<p class="um-mobilebthui"> 电话:' + order.contactNumber + '</p>' + '<p class="um-mobilebthui"> 制单日期:' + order.draftDate + '</p>' + '</div>' + '</a>' + '</li>');
                    $li.appendTo($("#orderCommission2"));
                }
                //报修
                if (order.orderType == "1") {
                    var $li = $('<li>' + '<a href="#" class="btn" onclick="result_feedback(this,' + i + ')">' + '<input type="hidden" value="' + order.idString + '" id="recordID' + i + '" />' + '<div class="center-icon">' + '<img alt="" src="../../img/bill-icon.png">' + '</div>' + '<div class="um-media-body">' + '<h4 class="um-media-heading um-mobilebt32">' + order.orderContent + '</h4>' + '<p class="um-mobilebthui"> 报修人:' + order.repairPeople + '</p>' + '<p class="um-mobilebthui"> 电话:' + order.contactNumber + '</p>' + '<p class="um-mobilebthui"> 制单日期:' + order.draftDate + '</p>' + '</div>' + '</a>' + '</li>');
                    $li.appendTo($("#orderCommission2"));
                }
                //预约
                if (order.orderType == "2") {
                    var $li = $('<li>' + '<a href="#" class="btn" onclick="result_feedback(this,' + i + ')">' + '<input type="hidden" value="' + order.idString + '" id="recordID' + i + '" />' + '<div class="center-icon">' + '<img alt="" src="../../img/bill-icon.png">' + '</div>' + '<div class="um-media-body">' + '<h4 class="um-media-heading um-mobilebt32">' + order.orderContent + '</h4>' + '<p class="um-mobilebthui"> 联系人:' + order.realEstateCustomer + '</p>' + '<p class="um-mobilebthui"> 电话:' + order.contactNumber + '</p>' + '<p class="um-mobilebthui"> 制单日期:' + order.draftDate + '</p>' + '</div>' + '</a>' + '</li>');
                    $li.appendTo($("#orderCommission2"));
                }
            }
        } else {
            summer.toast({
                "msg" : state
            })
        }
    });
}

//模糊已完成
function endOrders() {
    var orderContent = $("#commission2").val();
    $("#orderCommission2").empty();
    summer.ajax({
        type : 'post',
        url : summer.getAppStorage('url') + '/order/obscure',
        param : {
            "token" : summer.getAppStorage("tokenEntity").token,
            "singleId" : summer.getAppStorage("userId"),
            "tenantId" : summer.getAppStorage("tenantId"),
            "orderContent" : orderContent,
            "state" : 2
        },
        header : {
            Authorization : "OAuth2: token"
        }
    }, function(response) {
        response.data = JSON.parse(response.data);
        var state = response.data.state;
        var orderList = response.data.order;
        //alert(state);
        if (state == "200") {
            for (var i = 0; i < orderList.length; i++) {
                var order = orderList[i];
                //投诉咨询
                if (order.orderType == "0") {
                    var $li = $('<li>' + '<a href="#" class="btn" onclick="result_feedback(this,' + i + ')">' + '<input type="hidden" value="' + order.idString + '" id="recordID' + i + '" />' + '<div class="center-icon">' + '<img alt="" src="../../img/bill-icon.png">' + '</div>' + '<div class="um-media-body">' + '<h4 class="um-media-heading um-mobilebt32">' + order.orderContent + '</h4>' + '<p class="um-mobilebthui"> 联系人:' + order.realEstateCustomer + '</p>' + '<p class="um-mobilebthui"> 电话:' + order.contactNumber + '</p>' + '<p class="um-mobilebthui"> 制单日期:' + order.draftDate + '</p>' + '</div>' + '</a>' + '</li>');
                    $li.appendTo($("#orderCommission2"));
                }
                //报修
                if (order.orderType == "1") {
                    var $li = $('<li>' + '<a href="#" class="btn" onclick="result_feedback(this,' + i + ')">' + '<input type="hidden" value="' + order.idString + '" id="recordID' + i + '" />' + '<div class="center-icon">' + '<img alt="" src="../../img/bill-icon.png">' + '</div>' + '<div class="um-media-body">' + '<h4 class="um-media-heading um-mobilebt32">' + order.orderContent + '</h4>' + '<p class="um-mobilebthui"> 报修人:' + order.repairPeople + '</p>' + '<p class="um-mobilebthui"> 电话:' + order.contactNumber + '</p>' + '<p class="um-mobilebthui"> 制单日期:' + order.draftDate + '</p>' + '</div>' + '</a>' + '</li>');
                    $li.appendTo($("#orderCommission2"));
                }
                //预约
                if (order.orderType == "2") {
                    var $li = $('<li>' + '<a href="#" class="btn" onclick="result_feedback(this,' + i + ')">' + '<input type="hidden" value="' + order.idString + '" id="recordID' + i + '" />' + '<div class="center-icon">' + '<img alt="" src="../../img/bill-icon.png">' + '</div>' + '<div class="um-media-body">' + '<h4 class="um-media-heading um-mobilebt32">' + order.orderContent + '</h4>' + '<p class="um-mobilebthui"> 联系人:' + order.realEstateCustomer + '</p>' + '<p class="um-mobilebthui"> 电话:' + order.contactNumber + '</p>' + '<p class="um-mobilebthui"> 制单日期:' + order.draftDate + '</p>' + '</div>' + '</a>' + '</li>');
                    $li.appendTo($("#orderCommission2"));
                }
            }
        } else {
            summer.toast({
                "msg" : state
            })
        }
    });
}

//显示搜索按钮
function showSeek() {
    $("#seek").attr("style", "");
}

function fanhui() {
    var t = (new Date()).valueOf();
    summer.openWin({
        "id" : "index" + t,
        "url" : "index.html"
    });
}

//初始化执行
summerready = function() {
    commission();
}


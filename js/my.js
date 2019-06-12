summerready = function() {
    var userName = summer.getStorage("userName");
    var organizationName = summer.getStorage("organizationName");
    var headImageUrl = summer.getStorage("headImageUrl");
    $("#userName").text(userName);
    $("#organizationName").text(organizationName);
    if (headImageUrl == null || headImageUrl == "") {
        $("#imgid").attr("src", "../img/org1.png");
    } else {
        $("#imgid").attr("src", headImageUrl);
    }

}
function btn0_click() {
    UM.confirm({
        title : '警告',
        text : '您正在退出应用,是否继续',
        btnText : ["取消", "确定"],
        overlay : true,
        ok : function() {
            goLogOff();
        },
        cancle : function() {
            //$this.css('backgroundColor', '#007aff');
        }
    });

}

//退出登录
function goLogOff() {
    summer.setAppStorage("tokenEntity", "");
    var t = (new Date()).valueOf();
    summer.openWin({
        id : "signin" + t,
        url : '/html/signin.html'
    });
}

//判断是否进行修改资料
function UPmaterial() {
    UM.confirm({
        title : '警告',
        text : '您正在进行修改密码操作,是否继续',
        btnText : ["取消", "确定"],
        overlay : true,
        ok : function() {
            goUPmaterial();
        },
        cancle : function() {
            //$this.css('backgroundColor', '#007aff');
        }
    });
}

function goUPmaterial() {
    var t = (new Date()).valueOf();
    summer.openWin({
        "id" : "newMaterial" + t,
        "url" : '/html/newMaterial.html'
    });
}

function Banner() {
    var t = (new Date()).valueOf();
    summer.openWin({
        "id" : "bannerList" + t,
        "url" : "/html/banner/bannerList.html"
    });
}
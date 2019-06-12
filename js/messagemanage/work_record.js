var RaNum = '';
//获取参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
}

//回显工单
function selectOrder() {
    var id = getQueryString("id");
    $("#orderID").val(id);
    summer.ajax({
        type : 'post',
        url : summer.getAppStorage('url') + '/order/selectOrder',
        param : {
            "token" : summer.getAppStorage("tokenEntity").token,
            "id" : id
        },
        header : {
            Authorization : "OAuth2: token"
        }
    }, function(response) {
        response.data = JSON.parse(response.data);
        var state = response.data.state;
        var orderBusinessDraft = response.data.orderBusinessDraft;
        if (state == "200") {
            document.getElementById("theme").innerHTML = orderBusinessDraft.orderContent;
            document.getElementById("serialNumber").innerHTML = orderBusinessDraft.billNumber;
            //alert(orderBusinessDraft.processPicture);
            RaNum = orderBusinessDraft.processPicture;
            var batchnoImage = orderBusinessDraft.repairImage;
            //报修图片
            //alert(batchnoImage);
            getRepairImage(batchnoImage);
            $("#batchno").val(orderBusinessDraft.processPicture);
            //投诉咨询
            if (orderBusinessDraft.orderType == "0") {
                //客户名称
                document.getElementById("REAL_ESTATE_CUSTOMER1").style.display = "";
                document.getElementById("REAL_ESTATE_CUSTOMER").innerHTML = orderBusinessDraft.realEstateCustomer;
                //联系人姓名
                document.getElementById("CONTACTS1").style.display = "";
                document.getElementById("CONTACTS").innerHTML = orderBusinessDraft.contacts;
                //报修项目
                document.getElementById("ORDER_CONTENT1").style.display = "";
                document.getElementById("ORDER_CONTENT").innerHTML = orderBusinessDraft.orderContent;
                //房间名称
                document.getElementById("HOUSE_NAME1").style.display = "";
                document.getElementById("HOUSE_NAME").innerHTML = orderBusinessDraft.houseName;
                //联系电话
                document.getElementById("CONTACT_NUMBER1").style.display = "";
                document.getElementById("CONTACT_NUMBER").innerHTML = orderBusinessDraft.contactNumber;
                //联系地址
                document.getElementById("CONTACT_ADDRESS1").style.display = "";
                document.getElementById("CONTACT_ADDRESS").innerHTML = orderBusinessDraft.contactAddress;
                //投诉人
                document.getElementById("COMPLAINT_PEOPLE1").style.display = "";
                document.getElementById("COMPLAINT_PEOPLE").innerHTML = orderBusinessDraft.complaintPeople;
                //投诉ren电话
                document.getElementById("COMPLAINT_PHONE1").style.display = "";
                document.getElementById("COMPLAINT_PHONE").innerHTML = orderBusinessDraft.complaintPhone;
                //客服事件
                document.getElementById("CUSTOMER_EVENT1").style.display = "";
                document.getElementById("CUSTOMER_EVENT").innerHTML = orderBusinessDraft.customerEvent;
                //客服事件来源
                document.getElementById("CUSTOMER_EVENT_SOURCE1").style.display = "";
                document.getElementById("CUSTOMER_EVENT_SOURCE").innerHTML = orderBusinessDraft.customerEventSource;
                //投诉内容
                document.getElementById("COMPLAINT_CONTENT1").style.display = "";
                document.getElementById("COMPLAINT_CONTENT").innerHTML = orderBusinessDraft.complaintContent;
                //制单日期
                document.getElementById("DRAFT_DATE1").style.display = "";
                document.getElementById("DRAFT_DATE").innerHTML = orderBusinessDraft.draftDate;
                //备注
                document.getElementById("REMARK1").style.display = "";
                if (null != orderBusinessDraft.remark) {
                    document.getElementById("REMARK").innerHTML = orderBusinessDraft.remark;
                }
            }

            //报修
            if (orderBusinessDraft.orderType == "1") {
                //客户姓名
                document.getElementById("REAL_ESTATE_CUSTOMER1").style.display = "";
                document.getElementById("REAL_ESTATE_CUSTOMER").innerHTML = orderBusinessDraft.realEstateCustomer;
                //联系人姓名
                document.getElementById("CONTACTS1").style.display = "";
                document.getElementById("CONTACTS").innerHTML = orderBusinessDraft.contacts;
                //报修项
                document.getElementById("ORDER_CONTENT1").style.display = "";
                document.getElementById("ORDER_CONTENT").innerHTML = orderBusinessDraft.orderContent;
                //房间名称
                document.getElementById("HOUSE_NAME1").style.display = "";
                document.getElementById("HOUSE_NAME").innerHTML = orderBusinessDraft.houseName;
                //联系电话
                document.getElementById("CONTACT_NUMBER1").style.display = "";
                document.getElementById("CONTACT_NUMBER").innerHTML = orderBusinessDraft.contactNumber;
                //联系地址
                document.getElementById("CONTACT_ADDRESS1").style.display = "";
                document.getElementById("CONTACT_ADDRESS").innerHTML = orderBusinessDraft.contactAddress;
                //报修人
                document.getElementById("REPAIR_PEOPLE1").style.display = "";
                document.getElementById("REPAIR_PEOPLE").innerHTML = orderBusinessDraft.repairPeople;
                //报修位置
                //图片
                document.getElementById("repairImage").style.display = "";
                //document.getElementById("REPAIR_POSITION").innerHTML= orderBusinessDraft.repairPosition;
                //制单日期
                document.getElementById("DRAFT_DATE1").style.display = "";
                document.getElementById("DRAFT_DATE").innerHTML = orderBusinessDraft.draftDate;
                //备注
                document.getElementById("REMARK1").style.display = "";
                if (null != orderBusinessDraft.remark) {
                    document.getElementById("REMARK").innerHTML = orderBusinessDraft.remark;
                }
            }

            //预约
            if (orderBusinessDraft.orderType == "2") {
                //客户姓名
                document.getElementById("REAL_ESTATE_CUSTOMER1").style.display = "";
                document.getElementById("REAL_ESTATE_CUSTOMER").innerHTML = orderBusinessDraft.realEstateCustomer;
                //联系人姓名
                document.getElementById("CONTACTS1").style.display = "";
                document.getElementById("CONTACTS").innerHTML = orderBusinessDraft.contacts;
                //报修项
                document.getElementById("ORDER_CONTENT1").style.display = "";
                document.getElementById("ORDER_CONTENT").innerHTML = orderBusinessDraft.orderContent;
                //房间名称
                document.getElementById("HOUSE_NAME1").style.display = "";
                document.getElementById("HOUSE_NAME").innerHTML = orderBusinessDraft.houseName;
                //联系电话
                document.getElementById("CONTACT_NUMBER1").style.display = "";
                document.getElementById("CONTACT_NUMBER").innerHTML = orderBusinessDraft.contactNumber;
                //联系地址
                document.getElementById("CONTACT_ADDRESS1").style.display = "";
                document.getElementById("CONTACT_ADDRESS").innerHTML = orderBusinessDraft.contactAddress;
                //预约日期
                document.getElementById("APPOINTMENT_DATE1").style.display = "";
                document.getElementById("APPOINTMENT_DATE").innerHTML = orderBusinessDraft.appointmentDate;
                //服务地址
                document.getElementById("SERVICE_ADDRESS1").style.display = "";
                document.getElementById("SERVICE_ADDRESS").innerHTML = orderBusinessDraft.serviceAddress;
                //服务内容
                document.getElementById("SERVICE_CONTENT1").style.display = "";
                document.getElementById("SERVICE_CONTENT").innerHTML = orderBusinessDraft.serviceContent;
                //服务类型
                document.getElementById("SERVICE_TYPE1").style.display = "";
                document.getElementById("SERVICE_TYPE").innerHTML = orderBusinessDraft.serviceType;
                //制单日期
                document.getElementById("DRAFT_DATE1").style.display = "";
                document.getElementById("DRAFT_DATE").innerHTML = orderBusinessDraft.draftDate;
                //备注
                document.getElementById("REMARK1").style.display = "";
                if (null != orderBusinessDraft.remark) {
                    document.getElementById("REMARK").innerHTML = orderBusinessDraft.remark;
                }
            }
        } else {
            summer.toast({
                "msg" : response.data.state
            })
        }
    });
}

//提交工作记录
function submitParticulars() {
    var id = $("#orderID").val();
    //var isAccomplish = $("#isAccomplish").val();
    var workFlow = $("#workFlow").val();
    summer.ajax({
        type : 'post',
        url : summer.getAppStorage('url') + '/order/disposeachieve',
        param : {
            "token" : summer.getAppStorage("tokenEntity").token,
            "id" : id,
            //"isAccomplish" : isAccomplish,
            "workFlow" : workFlow
        },
        header : {
            Authorization : "OAuth2: token"
        }
    }, function(response) {
        response.data = JSON.parse(response.data);
        var state = response.data.state;
        if (state == "200") {
            summer.toast({
                text : "提交成功 请耐心等待客户对您的评价"
            });
            var t = (new Date()).valueOf();
            summer.openWin({
                "id" : "work_order" + t,
                "url" : "html/messagemanage/work_order.html"
            });
        } else {
            summer.toast({
                "msg" : response.data.state
            })
        }
    });

    //imagePaths为数组
    for ( i = 0; i < imgPathes.length; i++) {
        var imgPathWS = imgPathes[i].imgPath;
        //多文件上传，5秒超时
        summer.multiUpload({
            fileArray : [{//文件列表，数组
                fileURL : imgPathWS, //需要上传的文件路径
                type : "image/jpeg", //上传文件的类型 > 例：图片为"image/jpeg"
                name : "imgs" //后台取图片的Key
            }],
            params : {
                token : summer.getAppStorage("tokenEntity").token,
                batchno : RaNum
            }, //上传参数
            //headers : {},
            SERVER : summer.getAppStorage('imgurl') + "/uploadfile/uploadfilestoapp", //服务器地址
            timeout : 5
        }, "multiUploadCallback(args)", "multiUploadErrCallback(args)");
    }
}

//选择图片权限授予
function openPhotoAlbum() {
    var params = ["android.permission.READ_EXTERNAL_STORAGE"];
    commonFunc(params, openPhotoAlbum_common);
}

//选择图片权限授予
function commonFunc(params, common) {
    if ($summer.os == "android") {
        summer.getPermission(params, function(response) {//成功回调
            common();
        }, function(response) {//失败回调
            //alert(response);
        });
    } else {
        common();
    }
}

var imgPathes;
//打开系统相册，选择多张图片
var openPhotoAlbum_common = function() {
    summer.openPhotoAlbum({
        type : "multiple", //支持选多张图片
        maxCount : 9,
        callback : function(args) {
            imgPathes = args.imgPaths;
            var tmpl = '<li id="' + RaNum + '" class="weui-uploader__file" style="background-image:url(#url#)"></li>',
                $gallery = $("#gallery"),
                $galleryImg = $("#galleryImg"),
                $uploaderInput = $("#uploaderInput"),
                $uploaderFiles = $("#uploaderFiles");
            for ( i = 0; i < args.imgPaths.length; i++) {
                var imgPathWS = args.imgPaths[i].imgPath;
                $uploaderFiles.append($(tmpl.replace('#url#', imgPathWS)));
            }
            $uploaderFiles.on("click", "li", function() {
                $galleryImg.attr("style", this.getAttribute("style"));
                $gallery.fadeIn(100);
            });
            $gallery.on("click", function() {
                $gallery.fadeOut(100);
            });
            //删除图片
            $(".weui-gallery__del").click(function() {
                //alert(RaNum);
                //alert("删除")
                //delet(RaNum)
                //$uploaderFiles.find("li").eq(index).remove();
            });
        }
    });
}
function multiUploadCallback(args) {
    //$summer.alert(args);
    //$summer.alert("multiUpload,成功回调:" + JSON.stringify(args));
}

function multiUploadErrCallback(args) {
    //$summer.alert(args);
    //$summer.alert("multiUpload,失败回调:" + args.error);
}

function delet(RaNum) {
    summer.ajax({
        "header" : {
            Authorization : "OAuth2: token"
        },
        "type" : "POST",
        "url" : summer.getAppStorage("imgurl") + "/uploadfile/deleteuploadimage",
        "async" : "false",
        "param" : {
            token : summer.getAppStorage("tokenEntity").token,
            key : '201905146000000258'
        },
    }, function(response) {//成功回调
        summer.toast({
            "msg" : "删除成功!"
        })
    }, function(response) {//失败回调
        //alert("请联系管理员！");
    });
}

//获取报修图片
function getRepairImage(batchnoImage) {
    summer.ajax({
        "header" : {
            Authorization : "OAuth2: token"
        },
        "type" : "POST",
        "url" : summer.getAppStorage('imgurl') + "/uploadfile/getfileinfo",
        "async" : "false",
        "param" : {
            token : summer.getAppStorage("tokenEntity").token,
            batchno : batchnoImage
        },
    }, function(response) {//成功回调
        //alert(response.data);
        response.data = JSON.parse(response.data);
        var jsonArray1 = $summer.strToJson(response.data.message);
        var tmpl = '<li  class="weui-uploader__file" style="background-image:url(#url#)"></li>',
            $gallery = $("#gallery1"),
            $galleryImg = $("#galleryImg1"),
            $uploaderInput = $("#uploaderInput1"),
            $uploaderFiles = $("#uploaderFiles1");
        for ( i = 0; i < jsonArray1.length; i++) {
            var imgPathWS = jsonArray1[i].filePath;
            amgId = jsonArray1[i].fileId;
            $uploaderFiles.append($(tmpl.replace('#url#', imgPathWS)));
        }
        //大小图
        $uploaderFiles.on("click", "li", function() {
            $galleryImg.attr("style", this.getAttribute("style"));
            $gallery.fadeIn(100);
        });
        $gallery.on("click", function() {
            $gallery.fadeOut(100);
        });

    }, function(response) {//失败回调
        //alert("请联系管理员！");
    });
}

function fanhui() {
    summer.closeWin({});
}

//初始化执行
summerready = function() {
    selectOrder();
}
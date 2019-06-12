function staff() {
    var t = (new Date()).valueOf();
    summer.openWin({
        id : 'mail_list' + t,
        url : '/html/mail_list.html'
    });

}

function customerP() {
    var t = (new Date()).valueOf();
    summer.openWin({
        id : 'cust' + t,
        url : '/html/cust.html'
    });
}

function customerG() {
    var t = (new Date()).valueOf();
    summer.openWin({
        id : 'cust2' + t,
        url : '/html/cust2.html'
    });
}
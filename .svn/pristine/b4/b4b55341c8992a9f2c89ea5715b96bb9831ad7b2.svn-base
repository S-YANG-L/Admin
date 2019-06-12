$(function () {
/*日期控件*/
    UM.picker(".um-scroller-date", {preset:"date"});
    UM.picker(".um-scroller-datetime", {preset:"datetime"});
    UM.picker(".um-scroller-time", {preset:"time"});
    UM.picker(".um-scroller-select", {preset:"select"});

    $('.go-dest-cost').on('click', function () {
        UM.page.changePage({
            target: "#goDest",
            isReverse: 0,
            transition: "um"
        })
    });
    $('.go-back-company').on('click', function () {
        UM.page.changePage({
            target: "#goBack",
            isReverse: 0,
            transition: "um"
        })
    });
    $('#main .select-company').on('click', function () {
        UM.page.changePage({
            target: "#select-company",
            isReverse: 0,
            transition: "um"
        })
    })
    $('#select-company .um-back').on('click',function(){
    	UM.page.back();
    });
    $('.um-check-group .um-check-group-item').on('click', function () {
        var text=$('#select-company input[name="um-radio"]:checked').siblings('.um-black').text();
        console.log(text);
        $('#main .go-next-page .form-control').val(text);
         UM.page.back();   
    });
     $('#goDest .um-back').on('click', function () {
         UM.page.back();
     })
    $('#goBack .um-back').on('click', function () {
        UM.page.back();
    })
     $('.um-tabbar-underline li').on('click', function () {
         $('.um-tabbar-underline li').removeClass('active');
         $(this).addClass('active');
         var index=$('.um-tabbar-underline li').index($(this));
         if(index==0){
             $('#transportation').show();
             $('#cost').hide();
             $('#subsidy').hide();
         }else if(index==1){
             $('#transportation').hide();
             $('#cost').show();
             $('#subsidy').hide();
         }else if(index==2){
             $('#transportation').hide();
             $('#cost').hide();
             $('#subsidy').show();
         }

     })
     $('#goDest .btn-style').on('click', function () {
         var goDestCount=0;
         $.each($('#goDest .go-dest-money'),function (i,item) {

             var val= $(item).val() ==''? '0':$(item).val();
             console.log(val);
             goDestCount=goDestCount+ parseInt(val)
         });
         $('#transportation .go-dest-cost .um-gray').text(goDestCount.toFixed(2));
         UM.page.back();
     });
    $('#goBack .btn-style').on('click', function () {
        var backComCount=0;
        $.each($('#goBack .back-company-money'), function (i, item) {
            var val= $(item).val() ==''? '0':$(item).val();
            backComCount=backComCount+ parseInt(val);
        })
        $('#transportation .go-back-company .um-gray').text(backComCount.toFixed(2));
        UM.page.back();
    })
    $('#transportation .money-count').on('DOMNodeInserted', function () {
       var count=parseFloat( $('#transportation .money-count').eq(0).text())+parseFloat( $('#transportation .money-count').eq(1).text());
        console.log(count);
        $('#index .total-money').val(parseFloat(count).toFixed(2));
    });

})


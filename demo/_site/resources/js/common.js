Zepto(function($){
    //点击报名 ，校验，弹窗提示
    $("#apply-btn").click(function () {
        $("#popup-part").show();
    });
    //关闭弹窗
    $("#popup-part button").on("click",function(){
        $("#popup-part").hide('slow');
    });
});
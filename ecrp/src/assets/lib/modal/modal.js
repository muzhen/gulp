/**
 * Created by ao.xiang on 2015/10/28.
 */
/*
 配置说明
 modalType:   满屏模式 值:fullScreen 默认值: null
 title:       弹出标题 默认值: 您好!,
 message:     弹出内容 默认值: null  ,
 hideFooter:  弹出底部工具是否隐藏 true | false 默认值 false
 url:         AJAX加载弹出内容 默认值: null
 width:       宽度 0%至100% 默认值600px
 height:      度度 0%至100% 默认值auto
 shown:       弹出显示完回调 默认值 null,
 cancelCallback: 点取消回调 默认值 null,
 cancelText:  取消按钮显示文字 默认值 取消 ,
 cancelClass: 取消按钮 class 默认值 null,
 autoCloseDone:点击下一步按钮是否自动关闭弹出, true | false 默认值 true, 注:开启后可在 doneCallback回调中 用  e.hide()  方法关闭弹出
 hideCanceBtn:是否隐藏取消按钮 true | false
 hideDoneBtn:是否隐藏下一步按钮 true | false
 customBtn:添加自定义按钮 默认值 null
 doneText:    下一步显示文字 默认值 下一步 ,
 doneClass:   下一步 class 默认值 null,
 doneCallback:点下一步回调 默认值 null,
 addCssClass:弹出窗口自定义样式,

 */
$(function () {
    $('#alert1').click(function () {
        apus.ui.modal({
            url: ctx + '/pages/uidemo/postData/tempData2.html',
            title: '商品详细页',
            width: '100%',
            shown: function () {
                // alert('显示完成');
            },
            cancelCallback: function () {
                //alert('点了取消');
            }, doneCallback: function () {
                // alert('点了下一步');
            },
            modalType: 'fullScreen'
            //height: '300px'
        });
    });

    $('#alert2').click(function () {
        apus.ui.modal({
            message: '请选择是否',
            autoCloseDone: false,
            doneCallback: function (e) { 
            	 alert('点了下一步');
            },
	        cancelCallback: function (e) {
	            alert('点了取消');
	        }
        });
    });


    $('#alert4').click(function () {
        var msg = '<div class="row">' +
            '<div class="col-md-6">' +
            '<div class="form-group">' +
            '<label for="field-1" class="control-label">Name</label>' +
            '<input type="text" class="form-control" id="field-1" placeholder="John">' +
            '</div>' +
            '</div>' +
            '<div class="col-md-6">' +
            '<div class="form-group">' +
            '<label for="field-2" class="control-label">Surname</label>' +
            '<input type="text" class="form-control" id="field-2" placeholder="Doe">' +
            '</div>' +
            '</div>' +
            '</div>'
        apus.ui.modal({
            title: '请输入',
            message: msg,
            cancelCallback: function () {
                alert('点了取消');
            }, doneCallback: function () {
                alert('点了下一步');
            },
            hideCanceBtn: true
        });
    });
});

function openMany() {
    apus.ui.modal({
        title: '客户详情',
        url: '/uidemo/multiModel2',
        width: '70%'
    });

}


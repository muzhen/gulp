/**
 * Created by ao.xiang on 2015/8/28.
 */
var apus = {};
var ctx = ctx||'';
apus.namespace = function () {
    var D, e;
    var E = arguments[0];

    e = E.split(".");
    D = window[e[0]] = window[e[0]] || {};
    $.each(e.slice(1), function (idx, F) {
        D = D[F] = D[F] || {}
    });

    return D;
};

apus.namespace('apus.app.test.a');// todo 测试 a应用函数
apus.namespace('apus.app.test.b');// todo 测试 b应用函数
apus.namespace('apus.app.test.c');// todo 测试 c应用函数
apus.namespace('apus.app.test.d');// todo 测试2 d应用函数


/* 系统函数开始 */
apus.namespace('apus.log.info');// 日志信息
apus.namespace('apus.ajax'); //AJAX 处理


/* 工具类 */
apus.namespace('apus.utils');// 工具类
apus.namespace('apus.utils.moment'); //日期格式化
apus.namespace('apus.ajaxFileUpload');//图片上传

/* UI函数开始 */
apus.namespace('apus.ui.daterangepicker');// 时间控件
apus.namespace('apus.ui.dataTables');// 表格
apus.namespace('apus.ui.modal');// 弹窗
apus.namespace('apus.ui.toastr');// 提示
apus.namespace('apus.ui.validation');// 验证
apus.namespace('apus.ui.productSelection');// 商品选择
apus.namespace('apus.ui.maskLlock');// 锁屏
apus.namespace('apus.ui.submitLock');// 提交锁定
apus.namespace('apus.ui.loading');//特定位置锁屏





/* 插件函数开始 */
apus.namespace('apus.app.selectArea');//地区三级联动
apus.namespace('apus.app.selectArea');//地区三级联动
apus.namespace('apus.app.sign'); // 签到应用函数
apus.namespace('apus.app.uidemo');// DEMO 调用
apus.namespace('apus.app.ihdPush');// 推送











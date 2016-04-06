/**
 * Created by ao.xiang on 2015/11/17.
 */
apus.ui.daterangepicker = function (dom, config, callback, initComplete) {
    var params = {
        // startDate: apus.utils.moment().startOf('day'),
        //endDate: apus.utils.moment(),
        //minDate: '01/01/2012',    //最小时间
        // maxDate : apus.utils.moment(), //最大时间
        // dateLimit : {
        //  days : 360
        // }, //起止时间的最大间隔
        // showDropdowns : true,
        // showWeekNumbers : false, //是否显示第几周
        // timePicker : true, //是否显示小时和分钟
        // timePickerIncrement : 60, //时间的增量，单位为分钟
        // timePicker12Hour : false, //是否使用12小时制来显示时间
        "locale": {
            applyLabel: '确定',
            cancelLabel: '取消',
            fromLabel: '起始时间',
            toLabel: '结束时间',
            customRangeLabel: '自定义',
            daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
                '七月', '八月', '九月', '十月', '十一月', '十二月'],
            firstDay: 1,
            format: 'YYYY-MM-DD HH:mm:ss'
        },
        "timePicker24Hour": true,
        "format": "YYYY-MM-DD HH:mm:ss",
        autoApply: false,
    };
    callback = callback || function (start, end, label) {
            console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
        }
    /*   var initCompleteFn = initComplete || function (start, end, label) {
     start = apus.utils.moment().startOf('day'), apus.utils.moment().format('YYYY-MM-DD HH:mm:ss');
     end = apus.utils.moment().startOf('day'), apus.utils.moment().format('YYYY-MM-DD HH:mm:ss')];
     $('#startTime').val(start);
     $('#endTime').val(end);
     }*/

    return $(dom).daterangepicker($.extend(true, {}, params, config), callback);
};


$(function () {

    if ($.isFunction($.fn.daterangepicker)) {
        $('[data-init="daterangepicker"]').each(function () {
            var $el = $(this),
                timeType = $el.attr('data-timetype'),
                startTime = $el.attr('data-start'),
                endTime = $el.attr('data-end'),
                startTimeVal=$el.siblings('[data-daterangepicker="startTime"]'),
                endTimeVal=$el.siblings('[data-daterangepicker="endTime"]'),
                params = {
                    "startDate": startTime ? startTime : apus.utils.moment(),
                    "endDate": endTime ? endTime : apus.utils.moment().startOf('day').format('YYYY-MM-DD') + '23:59:59.000',
                    "timePicker": true,
                    "singleDatePicker": false,
                    "timePickerSeconds": true,
                },
                callback = function (start, end, label) {//格式化日期显示框
                    startTimeVal.val(start.format('YYYY-MM-DD HH:mm:ss'));
                    endTimeVal.val(end.format('YYYY-MM-DD HH:mm:ss'));
                   // console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
                };
            if (timeType == 'new') {
                params.ranges = {
                    '今日': [apus.utils.moment().startOf('day'), apus.utils.moment()],
                    '7天': [apus.utils.moment(), apus.utils.moment().subtract(-6, 'days')],
                    '30天': [apus.utils.moment(), apus.utils.moment().subtract(-29, 'days')]
                };
            } else if (timeType == 'out') {
                params.ranges = {
                    // '最近1小时': [apus.utils.moment().subtract('hours', 1), apus.utils.moment()],
                    '今日': [apus.utils.moment().startOf('day'), apus.utils.moment()],
                    '昨日': [apus.utils.moment().subtract('days', 1).startOf('day'), apus.utils.moment().subtract('days', 1).endOf('day')],
                    '最近7日': [apus.utils.moment().subtract('days', 6), apus.utils.moment()],
                    '最近30日': [apus.utils.moment().subtract('days', 29), apus.utils.moment()]
                };
            }

            apus.ui.daterangepicker($el, params, callback);
            if (!startTime) {
                $el.val('');
            } else {
                startTimeVal.val(startTime);
                endTimeVal.val(endTime);
            }
            //选择时间后触发重新加载的方法
             $el.on('apply.daterangepicker',function(ev,picker){
                 //console.log(picker.startDate.format('YYYY-MM-DD HH:mm:ss'));
                 //console.log(picker.endDate.format('YYYY-MM-DD HH:mm:ss'));
                 startTimeVal.val(picker.startDate.format('YYYY-MM-DD HH:mm:ss'));
                 endTimeVal.val(picker.endDate.format('YYYY-MM-DD HH:mm:ss'));
             });
        })
    }
    ;
});



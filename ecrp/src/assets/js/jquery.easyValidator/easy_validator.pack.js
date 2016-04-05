/*
	Copyright (C) 2009 - 2012
	WebSite:	Http://wangking717.javaeye.com/
	Author:		wangking
	
	JustBone 修改：
	2011-11-29  修改表单提交事件，改为插件外部触发
                修改提示框，只在初始化时附加一次，并修改内部结构
                修改提示框文字样式
                优化语句

*/
/* 不启用自动绑定
$(function(){
	InitValidate();
});
*/

function InitValidate() {
    var xOffset = -19; // x distance from mouse
    var yOffset = 10; // y distance from mouse

    //生成验证提示
    $('p#vtip').remove();
    $('body').append('<p id="vtip" style="display:none;"><img id="vtipArrow" src="'+ctx+'/resource/themes/xenon/assets/js/jquery.easyValidator/css/images/vtip_arrow.png"/><span></span></p>');

    //input action
    $("[reg],[url]:not([reg]),[tip]").unbind("hover").unbind("mousemove").unbind("blur").hover(
		function (e) {
		    var tip = $(this).attr('tip');
		    if (tip != undefined) {
		        var top = (e.pageY + yOffset) + 4;
		        var left = (e.pageX + xOffset);
		        var vtip = $('p#vtip');
		        vtip.find("span").html(tip);
		        vtip.css("top", top + "px").css("left", left + "px").show();
		    }
		},
		function () {
		    if ($(this).attr('tip') != undefined) {
		        $("p#vtip").hide();
		    }
		}
	).mousemove(
		function (e) {
		    if ($(this).attr('tip') != undefined) {
		        var top = (e.pageY + yOffset) + 4;
		        var left = (e.pageX + xOffset);
		        $("p#vtip").css("top", top + "px").css("left", left + "px");
		    }
		}
	).blur(function () {
	    var vale = $(this);
	    if (vale.attr("reg") != undefined) {
	        validate(vale);
	    }
	    else if (vale.attr("url") != undefined) {
	        ajax_validate(vale);
	    }
	});

    /*
	$("form").submit(function(){
		var isSubmit = true;
		$(this).find("[reg],[url]:not([reg])").each(function(){
			if($(this).attr("reg") == undefined){
				if(!ajax_validate($(this))){
					isSubmit = false;
				}
			}else{
				if(!validate($(this))){
					isSubmit = false;
				}
			}
		});
		if(typeof(isExtendsValidate) != "undefined"){
   			if(isSubmit && isExtendsValidate){
				return extendsValidate();
			}
   		}
		return isSubmit;
	});
    */

}

//外部调用验证
function CallValidate(validatePartID) {
    var result = true;
    var validatePart = $("#" + validatePartID);
    if (validatePart != null) {
        validatePart.find("[reg],[url]:not([reg])").each(function (i, item) {
            item = $(item);
            if (item.attr("reg") == undefined) {
                if (!ajax_validate(item)) {
                    result = false;
                }
            } else {
                if (!validate(item)) {
                    result = false;
                }
            }
        });
        if (typeof (isExtendsValidate) != "undefined") {
            if (result && isExtendsValidate) {
                return extendsValidate();
            }
        }
    }
    else {
        result = false;
    }
    return result;
}

function validate(obj) {
    var reg = new RegExp(obj.attr("reg"));
    //var objValue = obj.attr("value");
    var objValue = obj.val();
    if (!reg.test(objValue)) {
        change_error_style(obj, "add");
        change_tip(obj, null, "remove");
        return false;
    } else {
        if (obj.attr("url") == undefined) {
            change_error_style(obj, "remove");
            change_tip(obj, null, "remove");
            return true;
        } else {
            return ajax_validate(obj);
        }
    }
}

function ajax_validate(obj) {
    var url_str = obj.attr("url");
    if (url_str.indexOf("?") != -1) {
        url_str = url_str + "&" + obj.attr("name") + "=" + obj.attr("value");
    } else {
        url_str = url_str + "?" + obj.attr("name") + "=" + obj.attr("value");
    }
    var feed_back = $.ajax({ url: url_str, cache: false, async: false }).responseText;
    feed_back = feed_back.replace(/(^\s*)|(\s*$)/g, "");
    if (feed_back == 'success') {
        change_error_style(obj, "remove");
        change_tip(obj, null, "remove");
        return true;
    } else {
        change_error_style(obj, "add");
        change_tip(obj, feed_back, "add");
        return false;
    }
}

function change_tip(obj, msg, action_type) {

    if (obj.attr("tip") == undefined) {//初始化判断TIP是否为空
        obj.attr("is_tip_null", "yes");
    }
    if (action_type == "add") {
        if (obj.attr("is_tip_null") == "yes") {
            obj.attr("tip", msg);
        } else {
            if (msg != null) {
                if (obj.attr("tip_bak") == undefined) {
                    obj.attr("tip_bak", obj.attr("tip"));
                }
                obj.attr("tip", msg);
            }
        }
    } else {
        if (obj.attr("is_tip_null") == "yes") {
            obj.removeAttr("tip");
            obj.removeAttr("tip_bak");
        } else {
            obj.attr("tip", obj.attr("tip_bak"));
            obj.removeAttr("tip_bak");
        }
    }
}

function change_error_style(obj, action_type) {
    if (action_type == "add") {
        obj.addClass("input_validation-failed");
    } else {
        obj.removeClass("input_validation-failed");
    }
}

function IsHaveValidateFailed(form) {
    form = form || document;
    var isFailed = false;
    $(form).find("[reg],[url]:not([reg])").each(function () {
        if ($(this).attr("reg") == undefined) {
            if (!ajax_validate($(this))) {
                isFailed = true;
            }
        } else {
            if (!validate($(this))) {
                isFailed = true;
            }
        }
    });
    return isFailed;
}

$.fn.validate_callback = function (msg, action_type, options) {
    this.each(function () {
        if (action_type == "failed") {
            change_error_style($(this), "add");
            change_tip($(this), msg, "add");
        } else {
            change_error_style($(this), "remove");
            change_tip($(this), null, "remove");
        }
    });
};

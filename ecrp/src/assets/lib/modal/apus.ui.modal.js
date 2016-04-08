/**
 * Created by devin on 2015-4-30.
 */

(function ($, window, document, undefined) {
	//全局唯一标识符GUID,也称作UUID, 在理想情况下，任何计算机和计算机集群都不会生成两个相同的GUID
    var uuid = function () {
        var a = function () {
            return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
        };
        return a() + a() + "-" + a() + "-" + a() + "-" + a() + "-" + a() + a() + a()
    };
    //调用 弹出功能
    $.fn.popup = function (opts) {
        return new popup(this[0], opts);
    };
    //列队
    var queue = [];
    //弹出功能
    var popup = (function () {

        var popup = function (containerEl, opts) {
			//typeof 运算符 返回一个用来表示 表达式的数据类型 的字符串。 
			//typeof 返回值有六种可能： "number," "string," "boolean," "object," "function," 和 "undefined."
            //typeof(的)运算数未定义,返回(的)就是 "undefined". 
            //在使用 typeof 运算符时采用引用类型存储值会出现一个问题，无论引用的是什么类型的对象，它都返回 “object”。ECMAScript 引入了另一个 Java 运算符 instanceof 来解决这个问题。
            //instanceof 方法要求开发者明确地确认对象为某特定类型
            //instanceof它的作用是判断其左边对象是否为其右边类的实例，返回boolean类型的数据。可以用来判断继承中的子类的实例是否为父类的实现
            //在 typeof 方法返回 “object” 的情况下，instanceof 方法还是很有用的。
            if (typeof containerEl === "string" || containerEl instanceof String) {
                this.container = document.getElementById(containerEl);
            } else {
                this.container = containerEl;
            }
            //发现错误的容器弹出 是containerEl
            if (!this.container) {
                alert("Error finding container for popup " + containerEl);
                return;
            }
			//try{}catch{} 异常捕获
            try {
            	// === 如果类型不同，其结果就是不等
                if (typeof (opts) === "string" || typeof (opts) === "number")
                    opts = {
                        message: opts,
                        cancelOnly: "true",
                        cancelText: "确定"
                    };
                this.id = id = opts.id = opts.id || uuid(); //opts is passed by reference
                var self = this;
                // 有值传过来就获取，没有就置为空
                this.addCssClass = opts.addCssClass ? opts.addCssClass : "";
                this.modalType = opts.modalType ? opts.modalType : "";
                this.title = opts.suppressTitle ? "" : (opts.title || "您好!");//标题默认为您好
                this.message = opts.message || '';//判断一个变量是否已定义，如果没有定义就给他一个初始值
                this.url = opts.url || "";
                this.ajaxData = opts.ajaxData || '';
                this.modal = opts.modal || "";
                this.hideFooter = opts.hideFooter || false;
                this.hideCanceBtn = opts.hideCanceBtn || false;
                this.hideDoneBtn = opts.hideDoneBtn || false;
                this.width = opts.width || "440px";
                this.height = opts.height || "auto";
                this.zIndex = opts.zIndex || 1052 + (queue.length * 2);
                this.cancelOnly = opts.cancelOnly || false;
                this.onShow = opts.onShow || function () {
                    };
                this.shown = opts.shown || function () {
                    };
                this.autoCloseDone = opts.autoCloseDone !== undefined ? opts.autoCloseDone : true;
                this.cancelText = opts.cancelText || "取消";
                this.cancelClass = opts.cancelClass || "";
                this.cancelCallback = opts.cancelCallback || function () {
                    };
                this.doneText = opts.doneText || "下一步";
                this.doneClass = opts.doneClass || "";
                this.customBtn = opts.customBtn || "";
                this.doneCallback = opts.doneCallback || function (self) {
                    };
                this.backdrop = opts.backdrop || 'static';
                this.keyboard = opts.keyboard || false;
                this.top = opts.top;

                queue.push(this);
                // if (queue.length == 1)
                this.show();
            } catch (e) {
                console.log("error adding popup " + e);
            }

        };
		//prototype原型,使您有能力向对象添加属性和方法。
        popup.prototype = {
            id: null,
            addCssClass: null,
            modalType: null,
            title: null,
            message: null,
            cancelOnly: false,
            hideFooter: null,
            hideCanceBtn: null,
            hideDoneBtn: null,
            onShow: null,
            autoCloseDone: true,
            supressTitle: false,
            url: null,
            ajaxData: null,
            width: null,
            height: null,
            zIndex: null,
            shown: null,
            cancelCallback: null, cancelText: null,
            cancelClass: null,
            doneText: null,
            doneClass: null,
            doneCallback: null,
            customBtn: null,
            top: null,
            show: function () {
                var self = this, $el = $("#" + this.id);
                $('.modal.fade').each(function (index, element) {
                    if (!$(this).hasClass('in') && $(this).hasClass('createByJS')) {
                        this.remove()
                    }
                }) 
				//初始化的外框
                var markup = '<div class="modal fade createByJS ' + this.addCssClass + '" id="' + this.id + '" style="z-index:' + this.zIndex + '">' +
			                    '<div class="modal-dialog" style="width:' + self.width + '">' +
				                    '<div class="modal-content">' +
					                    '<div class="modal-header">' +
						                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
						                    '<h4 class="modal-title">' + this.title + '</h4>' +
				                  		'</div>' +
				                  		'<div class="modal-body" style="height:' + self.height + '">' + self.message + '</div>' +
					                    '<div class="modal-footer">' + this.customBtn +
						                    '<button type="button" id="cancel" class="btn btn-default' + this.cancelClass + '" data-dismiss="modal">' + this.cancelText + '</button>' +
						                    '<button type="button" id="action" class="btn btn-primary' + this.doneClass + '">' + this.doneText + '</button>' +
					                    '</div>' +
				                    '</div>' +
			                    '</div>' +
			                '</div>';


                $(this.container).append($(markup));

                $el = $("#" + this.id);

                var $elClass = $("#" + this.id).find(".sui-close");
                $elClass.bind("click", function () {
                    self.hide();
                });


                if (self.hideCanceBtn) {
                    $('#cancel').hide();
                }
                if (self.hideDoneBtn) {
                    $('#action').hide();
                }
                $el.find('button').each(function (i) {

                    var button = $(this);
                    button.bind('click', function (e) {
                        if (button.attr('id') == 'cancel') {
                            self.cancelCallback.call(self.cancelCallback, self);


                            self.hide();
                        } else if (button.attr('id') == 'action') {


                            self.doneCallback.call(self.doneCallback, self, $el);
                            if (self.autoCloseDone) {
                                self.hide();
                            } else {

                            }
                        }
                        e.preventDefault();
                    });
                });


                if (self.hideFooter) {
                    $el.find(".modal-footer").remove();
                    $el.find(".modal-dialog").css('bottom', '0px');
                }
                setTimeout(function () {
                    $el.modal(self);
                    self.positionPopup();
                }, 50);
                if (self.url) {
                    var popuploading = '<div class="loadingCircle-modal"><style>.loadingCircle-modal {margin-top:100px;min-height: 150px;}.circle{background-color:rgba(0,0,0,0);border:5px solid rgba(0,183,229,0.9);opacity:.9;border-right:5px solid rgba(0,0,0,0);border-left:5px solid rgba(0,0,0,0);border-radius:50px;box-shadow:0 0 35px #2187e7;width:50px;height:50px;margin:0 auto;-moz-animation:spinPulse 1s infinite ease-in-out;-webkit-animation:spinPulse 1s infinite linear}.circle1{background-color:rgba(0,0,0,0);border:5px solid rgba(0,183,229,0.9);opacity:.9;border-left:5px solid rgba(0,0,0,0);border-right:5px solid rgba(0,0,0,0);border-radius:50px;box-shadow:0 0 15px #2187e7;width:30px;height:30px;margin:0 auto;position:relative;top:-40px;-moz-animation:spinoffPulse 1s infinite linear;-webkit-animation:spinoffPulse 1s infinite linear}@-moz-keyframes spinPulse{0{-moz-transform:rotate(160deg);opacity:0;box-shadow:0 0 1px #2187e7}50%{-moz-transform:rotate(145deg);opacity:1}100%{-moz-transform:rotate(-320deg);opacity:0}}@-moz-keyframes spinoffPulse{0{-moz-transform:rotate(0)}100%{-moz-transform:rotate(360deg)}}@-webkit-keyframes spinPulse{0{-webkit-transform:rotate(160deg);opacity:0;box-shadow:0 0 1px #2187e7}50%{-webkit-transform:rotate(145deg);opacity:1}100%{-webkit-transform:rotate(-320deg);opacity:0}}@-webkit-keyframes spinoffPulse{0{-webkit-transform:rotate(0)}100%{-webkit-transform:rotate(360deg)}}.barlittle{background-color:#2187e7;background-image:-moz-linear-gradient(45deg,#2187e7 25%,#a0eaff);background-image:-webkit-linear-gradient(45deg,#2187e7 25%,#a0eaff);border-left:1px solid #111;border-top:1px solid #111;border-right:1px solid #333;border-bottom:1px solid #333;width:10px;height:10px;float:left;margin-left:5px;opacity:.1;-moz-transform:scale(0.7);-webkit-transform:scale(0.7);-moz-animation:move 1s infinite linear;-webkit-animation:move 1s infinite linear}#block_1{-moz-animation-delay:.4s;-webkit-animation-delay:.4s}#block_2{-moz-animation-delay:.3s;-webkit-animation-delay:.3s}#block_3{-moz-animation-delay:.2s;-webkit-animation-delay:.2s}#block_4{-moz-animation-delay:.3s;-webkit-animation-delay:.3s}#block_5{-moz-animation-delay:.4s;-webkit-animation-delay:.4s}@-moz-keyframes move{0{-moz-transform:scale(1.2);opacity:1}100%{-moz-transform:scale(0.7);opacity:.1}}@-webkit-keyframes move{0{-webkit-transform:scale(1.2);opacity:1}100%{-webkit-transform:scale(0.7);opacity:.1}}</style><div class="circle"></div> <div class="circle1"></div> </div>';
                    $el.find(".modal-body").append(popuploading);
                    $.get(self.url, self.ajaxData, function (content) {
                        $el.find(".modal-body").html(content);
                        setTimeout(function () {
                            self.shown.call(self.shown, self);
                        }, 50);
                        self.positionPopup();
                    })
                } else {
                    $el.bind(" shown.bs.modal", function () {
                        self.shown.call(self.shown, self);
                    });
                }
                ;
            },
            shown: function () {
            },
            hide: function () {
                var self = this, $el = $("#" + this.id);
                $el.modal('hide');
                $el.on('hidden.bs.modal', function () {
                    self.remove();
                })
                $(".modal-ot-wp").remove();
            },
            remove: function () {
                var self = this, $el = $("#" + self.id);
				//移除所有 el 元素的 close 事件处理器：
                $el.unbind("close");
                $el.find('BUTTON#action').unbind('click');
                $el.find('BUTTON#cancel').unbind('click');
                $el.remove();
                //splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。
                queue.splice((queue.length - 1), 1);
                if (queue.length > 0) {
                    $('body').addClass('modal-open');
                    // queue[0].show();
                }
            },
            positionPopup: function () {
            	//innerWidth()方法用于获得包括内边界（padding）的元素宽度
            	//outerWidth()方法用于获得包括内边界(padding)和边框(border)的元素宽度
            	//jQuery(window).height()代表了当前可见区域的大小
            	//jQuery(document).height()则代表了整个文档的高度，可视具体情况使用.
                var self = this,
                    $el = $("#" + self.id)
                    , eleH = $el.outerHeight()
                    , winH = $(window).height()
                    , mt = 0;
                if (eleH >= winH) {
                    mt = 120
                }
                else {
                    mt = (winH / 2) - (eleH / 2)
                }
/*                $el.css('margin-left', parseInt(-($el.outerWidth() / 2)))
                $el.css('top', parseInt((winH / 2) - (eleH / 2)));*/
                $el.nextAll('.modal-backdrop.fade').css('z-index', (self.zIndex - 1)).addClass("sui-modal-backdrop");
            }
        };

        return popup;
    })();
})(jQuery, window, document);


apus.ui.modal = function (config) {
    return new $('body').popup(config);
};


/*

 //插件一
 ; (function ($, window, document, undefined) {
 "use strict";
 //定义ConstructorName的构造函数
 var ConstructorName = function (ele, opt) {
 this.$element = ele,
 this.defaults = {
 'color': 'red',
 'fontSize': '12px',
 'textDecoration': 'none'
 },
 this.options = $.extend({}, this.defaults, opt)
 }
 //定义ConstructorName的方法
 ConstructorName.prototype = {
 init: function () {
 return this.$element.css({
 'color': this.options.color,
 'fontSize': this.options.fontSize,
 'textDecoration': this.options.textDecoration
 });
 }
 }
 //在插件中使用ConstructorName对象
 $.fn.myPlugin = function (options) {
 //创建ConstructorName的实体
 var constructorName = new ConstructorName(this, options);
 //调用其方法
 return constructorName.init();
 }
 })(jQuery, window, document);
 //$('a').myPlugin();

 */


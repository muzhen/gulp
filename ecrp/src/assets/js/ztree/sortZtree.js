(function ($, window, document, undefined) {
    var BeautifierSelectTheParent=true;
    var Beautifier = function (ele, opt) {
        this.$element = ele,
            this.defaults = {
                'dataUrl': '',
                'iconType': 'sort',
                'sortZtreeVal': 'sortZtreeVal',
                'jsonData': '',
                'selectTheParent': true,
                'selectCallback': function () {
                },
                'defaultVal': {name: null, id: null, pId: null}
            },
            this.options = $.extend(this.defaults, opt)
    };
    Beautifier.prototype = {
        beforeClick: function (treeId, treeNode) {
            var check = (treeNode && !treeNode.isParent);
            var zTree = $.fn.zTree.getZTreeObj("sortZtreeList");
            zTree.expandNode(treeNode);
            return check;
        },
        showIconForTree: function (treeId, treeNode) {
            return !treeNode.isParent;
        },
        onClick: function (e, treeId, treeNode) {
            var that = this;
            var zTree = $.fn.zTree.getZTreeObj("sortZtreeList"),
                nodes = zTree.getSelectedNodes(),
                v = "", n = '';
            if ( nodes.length==0) return;
            if (!BeautifierSelectTheParent && nodes[0].parent) return;
            nodes.sort(function compare(a, b) {
                return a.id - b.id;
            });
            if (v.length > 0) v = v.substring(0, v.length - 1);
            var cityObj = $("#sortZtreeVal");
            cityObj.val(treeNode.name);
            cityObj.attr("value", treeNode.name);
            cityObj.attr("categoryId", treeNode.id);
            cityObj.attr("parentId", treeNode.pId);
            var error = $('#sortZtreeVal-error');
            if (error.length < 1) {
                var getElementPosition = function () {
                    return $.extend({}, cityObj.position(), {
                        width: cityObj.get(0).offsetWidth,
                        height: cityObj.get(0).offsetHeight
                    });
                }
                var elementPos = getElementPosition();
                var getTargetPositin = function (elementPos, placement, targetWidth, targetHeight) {
                    var pos = elementPos,
                        elementW = cityObj.width(),
                        position = {},
                        arrowOffset = {},
                        arrowSize = true ? 0 : 0;
                    switch (placement) {
                        case 'bottom':
                            position = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - targetWidth / 2};
                            break;
                        case 'top':
                            position = {
                                top: pos.top - targetHeight - arrowSize,
                                left: pos.left + pos.width / 2 - targetWidth / 2
                            };
                            break;
                        case 'left':
                            position = {
                                top: pos.top + pos.height / 2 - targetHeight / 2,
                                left: pos.left - targetWidth - arrowSize
                            };
                            break;
                        case 'right':
                            position = {
                                top: pos.top + pos.height / 2 - targetHeight / 2,
                                left: (pos.left + pos.width) - 20
                            };
                            break;
                        case 'top-right':
                            position = {top: pos.top - targetHeight - arrowSize, left: pos.left};
                            arrowOffset = {left: elementW / 2};
                            break;
                        case 'top-left':
                            position = {
                                top: pos.top - targetHeight - arrowSize,
                                left: pos.left - targetWidth + pos.width
                            };
                            arrowOffset = {left: targetWidth - elementW / 2};
                            break;
                        case 'bottom-right':
                            position = {top: pos.top + pos.height, left: pos.left};
                            arrowOffset = {left: elementW / 2};
                            break;
                        case 'bottom-left':
                            position = {top: pos.top + pos.height, left: pos.left - targetWidth + pos.width};
                            arrowOffset = {left: targetWidth - elementW / 2};
                            break;
                    }
                    return {position: position, arrowOffset: arrowOffset};
                }
                var placement = 'right';
                var postionInfo = getTargetPositin(getElementPosition(), placement, 100, 30);
                error = $("<i>").attr({
                    'id': 'sortZtreeVal-error',
                    'class': 'sortZtreeError fa-remove'
                }).css(postionInfo.position).click(function () {
                    this.remove();
                    cityObj.val('');
                    cityObj.removeAttr('value');
                    cityObj.removeAttr('categoryid');
                    cityObj.removeAttr('parentid');
                    var treeObj = $.fn.zTree.getZTreeObj("sortZtreeList");
                    treeObj.cancelSelectedNode();
                    document.getElementById('sortZtreeVal').selectCallback();
                })
            }
            $('#sortZtreeVal').after(error)
            $("#sortZtreeBox").fadeOut("fast");
            $("body").unbind("mousedown", that.onBodyDown);
            document.getElementById('sortZtreeVal').selectCallback()
        },
        showMenu: function () {
            var that = this;
            var cityObj = that.$element;
            var cityOffset = that.$element.offset();
            $("#sortZtreeBox").css({
                left: cityOffset.left + "px",
                top: cityOffset.top + cityObj.outerHeight() + "px",
                width: cityObj.outerWidth() + "px"
            }).slideDown("fast");
            $("body").bind("mousedown", that.onBodyDown);

        },
        onBodyDown: function (event) {
            var that = this;
            //if (!(event.target.id == "menuBtn" || event.target.id == "sortZtreeVal" || $(event.target).parents("#sortZtreeList").length > 0)) {
            if (!(event.target.id == "sortZtreeBtn" || event.target.id == "sortZtreeVal" || event.target.id == "sortZtreeList" || $(event.target).parents("#sortZtreeBox").length > 0)) {
                $("#sortZtreeBox").fadeOut("fast");
                $("body").unbind("mousedown", $("#sortZtreeBox").fadeOut("fast"));
            }
        },
        theDefaultSelection: function () {
            var that = this;
            var treeObj = $.fn.zTree.getZTreeObj("sortZtreeList");
            var node = treeObj.getNodeByParam("id", that.options.defaultVal.id, null);
            if (node) {
                treeObj.selectNode(node, false);
                var cityObj = $("#sortZtreeVal");
                cityObj.attr("value", node.name);
                cityObj.attr("categoryId", node.id);
                cityObj.attr("parentId", node.pId);
            } else {
                if (that.options.defaultVal.id) {
                    that.$element.attr('categoryId', that.options.defaultVal.id)
                }
                ;
                if (that.options.defaultVal.pId) {
                    that.$element.attr('parentId', that.options.defaultVal.pId)
                }
                ;
                if (that.options.defaultVal.name) {
                    that.$element.val(that.options.defaultVal.name)
                }
            }
        },
        init: function () {
            var that = this;
           // if (!$('#sortZtreeBox').length > 0) {
            //删除之前的容器
                $('#sortZtreeBox').remove();
                var sortZtreeBoxStr = '<div id="sortZtreeBox" class="sortZtreeBox" style="display:none; position: absolute;z-index:199999;"><ul id="sortZtreeList" class="sortZtree ' + that.options.iconType + '"></ul></div>';
                $("body").append(sortZtreeBoxStr);
          //  }
            var setting = {
                async: {
                    enable: true,
                    url: that.options.dataUrl,
                    autoParam: ["id", "name"]
                },
                view: {
                    dblClickExpand: false
                },
                data: {
                    simpleData: {
                        enable: true
                    }
                },
                callback: {
                    beforeClick: that.beforeClick,
                    onClick: that.onClick
                }
            };
            if (that.options.selectTheParent) {

                console.log(BeautifierSelectTheParent);
                setting.callback.beforeClick = null;

            }
            ;
            BeautifierSelectTheParent=that.options.selectTheParent;
            $.fn.zTree.init($("#sortZtreeList"), setting, that.options.jsonData);
            //取消ztree所有的节点选择
            function CancelSelected(event) {
                var treeObj = $.fn.zTree.getZTreeObj("sortZtreeList");
                var nodes = treeObj.getNodes();

                for (var i = 0; i < nodes.length; i++) {
                    EachChildNodes(nodes[i], treeObj);
                }
            };
            //递归遍历取消子节点的选择
            function EachChildNodes(node, treeObj) {
                //首先取消当前节点的选择
                if (node.parent) {
                    if (node != null && node.children != null && node.children.length != null && node.children.length > 0) {
                        node.iconSkin = "folder";
                    }else{
                        node.iconSkin = "folder_on";
                    }
                    // treeObj.hideNode(node);
                    treeObj.updateNode(node);
                }
                ;
                //判断是否有子节点
                if (node != null && node.children != null && node.children.length != null && node.children.length > 0) {
                    for (var i = 0; i < node.children.length; i++) {
                        EachChildNodes(node.children[i], treeObj);
                    }
                }
            };


            that.$element.on('click', function () {
                that.showMenu();
                CancelSelected();
            });
            that.theDefaultSelection();
            document.getElementById('sortZtreeVal').selectCallback = that.options.selectCallback;
        }

    };
    $.fn.sortZtree = function (options) {
        var beautifier = new Beautifier(this, options);
        return beautifier.init();
    }
})(jQuery, window, document);

(function ($, window, document, undefined) {

    var Beautifier = function (ele, opt) {
        this.$element = ele,
            this.defaults = {
                'dataUrl': '',
                'iconType': 'sort',
                'sortZtreeVal': 'sortZtreeVal2',
                'jsonData': '',
                'selectTheParent': true,
                'selectCallback': function () {
                },
                'defaultVal': {name: null, id: null, pId: null}
            },
            this.options = $.extend(this.defaults, opt)
    };
    Beautifier.prototype = {
        beforeClick: function (treeId, treeNode) {
            var check = (treeNode && !treeNode.isParent);
            var zTree = $.fn.zTree.getZTreeObj("sortZtreeList");
            zTree.expandNode(treeNode);

            return check;
        },
        showIconForTree: function (treeId, treeNode) {
            return !treeNode.isParent;
        },
        onClick: function (e, treeId, treeNode) {
            var that = this;
            var zTree = $.fn.zTree.getZTreeObj("sortZtreeList"),
                nodes = zTree.getSelectedNodes(),
                v = "", n = '';
            if ( nodes.length==0) return;
            if (!BeautifierSelectTheParent && nodes[0].parent) return;
            nodes.sort(function compare(a, b) {
                return a.id - b.id;
            });
            if (v.length > 0) v = v.substring(0, v.length - 1);
            var cityObj = $("#sortZtreeVal2");
            cityObj.val(treeNode.name);
            cityObj.attr("value", treeNode.name);
            cityObj.attr("categoryId", treeNode.id);
            cityObj.attr("parentId", treeNode.pId);
            var error = $('#sortZtreeVal2-error');
            if (error.length < 1) {
                var getElementPosition = function () {
                    return $.extend({}, cityObj.position(), {
                        width: cityObj.get(0).offsetWidth,
                        height: cityObj.get(0).offsetHeight
                    });
                }
                var elementPos = getElementPosition();
                var getTargetPositin = function (elementPos, placement, targetWidth, targetHeight) {
                    var pos = elementPos,
                        elementW = cityObj.width(),
                        position = {},
                        arrowOffset = {},
                        arrowSize = true ? 0 : 0;
                    switch (placement) {
                        case 'bottom':
                            position = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - targetWidth / 2};
                            break;
                        case 'top':
                            position = {
                                top: pos.top - targetHeight - arrowSize,
                                left: pos.left + pos.width / 2 - targetWidth / 2
                            };
                            break;
                        case 'left':
                            position = {
                                top: pos.top + pos.height / 2 - targetHeight / 2,
                                left: pos.left - targetWidth - arrowSize
                            };
                            break;
                        case 'right':
                            position = {
                                top: pos.top + pos.height / 2 - targetHeight / 2,
                                left: (pos.left + pos.width) - 20
                            };
                            break;
                        case 'top-right':
                            position = {top: pos.top - targetHeight - arrowSize, left: pos.left};
                            arrowOffset = {left: elementW / 2};
                            break;
                        case 'top-left':
                            position = {
                                top: pos.top - targetHeight - arrowSize,
                                left: pos.left - targetWidth + pos.width
                            };
                            arrowOffset = {left: targetWidth - elementW / 2};
                            break;
                        case 'bottom-right':
                            position = {top: pos.top + pos.height, left: pos.left};
                            arrowOffset = {left: elementW / 2};
                            break;
                        case 'bottom-left':
                            position = {top: pos.top + pos.height, left: pos.left - targetWidth + pos.width};
                            arrowOffset = {left: targetWidth - elementW / 2};
                            break;
                    }
                    return {position: position, arrowOffset: arrowOffset};
                }
                var placement = 'right';
                var postionInfo = getTargetPositin(getElementPosition(), placement, 100, 30);
                error = $("<i>").attr({
                    'id': 'sortZtreeVal-error',
                    'class': 'sortZtreeError fa-remove'
                }).css(postionInfo.position).click(function () {
                    this.remove();
                    cityObj.val('');
                    cityObj.removeAttr('value');
                    cityObj.removeAttr('categoryid');
                    cityObj.removeAttr('parentid');
                    var treeObj = $.fn.zTree.getZTreeObj("sortZtreeList");
                    treeObj.cancelSelectedNode();
                    document.getElementById('sortZtreeVal2').selectCallback();
                })
            }
            $('#sortZtreeVal2').after(error)
            $("#sortZtreeBox").fadeOut("fast");
            $("body").unbind("mousedown", that.onBodyDown);
            document.getElementById('sortZtreeVal2').selectCallback()
        },
        showMenu: function () {
            var that = this;
            var cityObj = that.$element;
            var cityOffset = that.$element.offset();
            $("#sortZtreeBox").css({
                left: cityOffset.left + "px",
                top: cityOffset.top + cityObj.outerHeight() + "px",
                width: cityObj.outerWidth() + "px"
            }).slideDown("fast");
            $("body").bind("mousedown", that.onBodyDown);

        },
        onBodyDown: function (event) {
            var that = this;
            //if (!(event.target.id == "menuBtn" || event.target.id == "sortZtreeVal" || $(event.target).parents("#sortZtreeList").length > 0)) {
            if (!(event.target.id == "sortZtreeBtn" || event.target.id == "sortZtreeVal2" || event.target.id == "sortZtreeList" || $(event.target).parents("#sortZtreeBox").length > 0)) {
                $("#sortZtreeBox").fadeOut("fast");
                $("body").unbind("mousedown", $("#sortZtreeBox").fadeOut("fast"));
            }
        },
        theDefaultSelection: function () {
            var that = this;
            var treeObj = $.fn.zTree.getZTreeObj("sortZtreeList");
            var node = treeObj.getNodeByParam("id", that.options.defaultVal.id, null);
            if (node) {
                treeObj.selectNode(node, false);
                var cityObj = $("#sortZtreeVal2");
                cityObj.attr("value", node.name);
                cityObj.attr("categoryId", node.id);
                cityObj.attr("parentId", node.pId);
            } else {
                if (that.options.defaultVal.id) {
                    that.$element.attr('categoryId', that.options.defaultVal.id)
                }
                ;
                if (that.options.defaultVal.pId) {
                    that.$element.attr('parentId', that.options.defaultVal.pId)
                }
                ;
                if (that.options.defaultVal.name) {
                    that.$element.val(that.options.defaultVal.name)
                }
            }
        },
        init: function () {
            var that = this;
            if (!$('#sortZtreeBox').length > 0) {
                var sortZtreeBoxStr = '<div id="sortZtreeBox" class="sortZtreeBox" style="display:none; position: absolute;z-index:199999;"><ul id="sortZtreeList" class="sortZtree ' + that.options.iconType + '"></ul></div>';
                $("body").append(sortZtreeBoxStr);
            }
            var setting = {
                async: {
                    enable: true,
                    url: that.options.dataUrl,
                    autoParam: ["id", "name"]
                },
                view: {
                    dblClickExpand: false
                },
                data: {
                    simpleData: {
                        enable: true
                    }
                },
                callback: {
                    beforeClick: that.beforeClick,
                    onClick: that.onClick
                }
            };
            if (that.options.selectTheParent) {
                setting.callback.beforeClick = null;
            }
            ;

            BeautifierSelectTheParent=that.options.selectTheParent;
            $.fn.zTree.init($("#sortZtreeList"), setting, that.options.jsonData);
            //取消ztree所有的节点选择
            function CancelSelected(event) {
                var treeObj = $.fn.zTree.getZTreeObj("sortZtreeList");
                var nodes = treeObj.getNodes();

                for (var i = 0; i < nodes.length; i++) {
                    EachChildNodes(nodes[i], treeObj);
                }
            };
            //递归遍历取消子节点的选择
            function EachChildNodes(node, treeObj) {
                //首先取消当前节点的选择
                if (node.parent) {
                    if (node != null && node.children != null && node.children.length != null && node.children.length > 0) {
                        node.iconSkin = "folder";
                    }else{
                        node.iconSkin = "folder_on";
                    }
                    // treeObj.hideNode(node);
                    treeObj.updateNode(node);
                }
                ;
                //判断是否有子节点
                if (node != null && node.children != null && node.children.length != null && node.children.length > 0) {
                    for (var i = 0; i < node.children.length; i++) {
                        EachChildNodes(node.children[i], treeObj);
                    }
                }
            };


            that.$element.on('click', function () {
                that.showMenu();
                CancelSelected();
            });
            that.theDefaultSelection();
            document.getElementById('sortZtreeVal2').selectCallback = that.options.selectCallback;
        }

    };
    $.fn.sortZtree2 = function (options) {
        var beautifier = new Beautifier(this, options);
        return beautifier.init();
    }
})(jQuery, window, document);
(function ($, window, document, undefined) {
    var BeautifierSelectTheParent=true;
    var Beautifier = function (ele, opt) {
        this.$element = ele,
            this.defaults = {
                'dataUrl': '',
                'iconType': 'sort',
                'sortZtreeVal': 'sortZtreeVal',
                'jsonData': '',
                'selectTheParent': true,
                'selectCallback': function () {
                },
                'defaultVal': {name: null, id: null, pId: null}
            },
            this.options = $.extend(this.defaults, opt)
    };
    Beautifier.prototype = {
        beforeClick: function (treeId, treeNode) {
            var check = (treeNode && !treeNode.isParent);
            var zTree = $.fn.zTree.getZTreeObj("sortZtreeList");
            zTree.expandNode(treeNode);
            return check;
        },
        showIconForTree: function (treeId, treeNode) {
            return !treeNode.isParent;
        },
        onClick: function (e, treeId, treeNode) {
            var that = this;
            var zTree = $.fn.zTree.getZTreeObj("sortZtreeList"),
                nodes = zTree.getSelectedNodes(),
                v = "", n = '';
           // if (nodes[0].parent) return;
            nodes.sort(function compare(a, b) {
                return a.id - b.id;
            });
            if (v.length > 0) v = v.substring(0, v.length - 1);
            var cityObj = $("#sortZtreeVal");
            cityObj.val(treeNode.name);
            cityObj.attr("value", treeNode.name);
            cityObj.attr("categoryId", treeNode.id);
            cityObj.attr("parentId", treeNode.pId);
            var error = $('#sortZtreeVal-error');
            if (error.length < 1) {
                var getElementPosition = function () {
                    return $.extend({}, cityObj.position(), {
                        width: cityObj.get(0).offsetWidth,
                        height: cityObj.get(0).offsetHeight
                    });
                }
                var elementPos = getElementPosition();
                var getTargetPositin = function (elementPos, placement, targetWidth, targetHeight) {
                    var pos = elementPos,
                        elementW = cityObj.width(),
                        position = {},
                        arrowOffset = {},
                        arrowSize = true ? 0 : 0;
                    switch (placement) {
                        case 'bottom':
                            position = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - targetWidth / 2};
                            break;
                        case 'top':
                            position = {
                                top: pos.top - targetHeight - arrowSize,
                                left: pos.left + pos.width / 2 - targetWidth / 2
                            };
                            break;
                        case 'left':
                            position = {
                                top: pos.top + pos.height / 2 - targetHeight / 2,
                                left: pos.left - targetWidth - arrowSize
                            };
                            break;
                        case 'right':
                            position = {
                                top: pos.top + pos.height / 2 - targetHeight / 2,
                                left: (pos.left + pos.width) - 20
                            };
                            break;
                        case 'top-right':
                            position = {top: pos.top - targetHeight - arrowSize, left: pos.left};
                            arrowOffset = {left: elementW / 2};
                            break;
                        case 'top-left':
                            position = {
                                top: pos.top - targetHeight - arrowSize,
                                left: pos.left - targetWidth + pos.width
                            };
                            arrowOffset = {left: targetWidth - elementW / 2};
                            break;
                        case 'bottom-right':
                            position = {top: pos.top + pos.height, left: pos.left};
                            arrowOffset = {left: elementW / 2};
                            break;
                        case 'bottom-left':
                            position = {top: pos.top + pos.height, left: pos.left - targetWidth + pos.width};
                            arrowOffset = {left: targetWidth - elementW / 2};
                            break;
                    }
                    return {position: position, arrowOffset: arrowOffset};
                }
                var placement = 'right';
                var postionInfo = getTargetPositin(getElementPosition(), placement, 100, 30);
                error = $("<i>").attr({
                    'id': 'sortZtreeVal-error',
                    'class': 'sortZtreeError fa-remove'
                }).css(postionInfo.position).click(function () {
                    this.remove();
                    cityObj.val('');
                    cityObj.removeAttr('value');
                    cityObj.removeAttr('categoryid');
                    cityObj.removeAttr('parentid');
                    var treeObj = $.fn.zTree.getZTreeObj("sortZtreeList");
                    treeObj.cancelSelectedNode();
                    document.getElementById('sortZtreeVal').selectCallback();
                })
            }
            $('#sortZtreeVal').after(error)
            $("#sortZtreeBox").fadeOut("fast");
            $("body").unbind("mousedown", that.onBodyDown);
            document.getElementById('sortZtreeVal').selectCallback()
        },
        showMenu: function () {
            var that = this;
            var cityObj = that.$element;
            var cityOffset = that.$element.offset();
            $("#sortZtreeBox").css({
                left: cityOffset.left + "px",
                top: cityOffset.top + cityObj.outerHeight() + "px",
                width: cityObj.outerWidth() + "px"
            }).slideDown("fast");
            $("body").bind("mousedown", that.onBodyDown);

        },
        onBodyDown: function (event) {
            var that = this;
            //if (!(event.target.id == "menuBtn" || event.target.id == "sortZtreeVal" || $(event.target).parents("#sortZtreeList").length > 0)) {
            if (!(event.target.id == "sortZtreeBtn" || event.target.id == "sortZtreeVal" || event.target.id == "sortZtreeList" || $(event.target).parents("#sortZtreeBox").length > 0)) {
                $("#sortZtreeBox").fadeOut("fast");
                $("body").unbind("mousedown", $("#sortZtreeBox").fadeOut("fast"));
            }
        },
        theDefaultSelection: function () {
            var that = this;
            var treeObj = $.fn.zTree.getZTreeObj("sortZtreeList");
            var node = treeObj.getNodeByParam("id", that.options.defaultVal.id, null);
            if (node) {
                treeObj.selectNode(node, false);
                var cityObj = $("#sortZtreeVal");
                cityObj.attr("value", node.name);
                cityObj.attr("categoryId", node.id);
                cityObj.attr("parentId", node.pId);
            } else {
                if (that.options.defaultVal.id) {
                    that.$element.attr('categoryId', that.options.defaultVal.id)
                }
                ;
                if (that.options.defaultVal.pId) {
                    that.$element.attr('parentId', that.options.defaultVal.pId)
                }
                ;
                if (that.options.defaultVal.name) {
                    that.$element.val(that.options.defaultVal.name)
                }
            }
        },
        init: function () {
            var that = this;
            if (!$('#sortZtreeBox').length > 0) {
                var sortZtreeBoxStr = '<div id="sortZtreeBox" class="sortZtreeBox" style="display:none; position: absolute;z-index:199999;"><ul id="sortZtreeList" class="sortZtree ' + that.options.iconType + '"></ul></div>';
                $("body").append(sortZtreeBoxStr);
            }
            var setting = {
                async: {
                    enable: true,
                    url: that.options.dataUrl,
                    autoParam: ["id", "name"]
                },
                view: {
                    dblClickExpand: false
                },
                data: {
                    simpleData: {
                        enable: true
                    }
                },
                callback: {
                    beforeClick: that.beforeClick,
                    onClick: that.onClick
                }
            };
            if (that.options.selectTheParent) {
                setting.callback.beforeClick = null;

            }
            ;
            BeautifierSelectTheParent=that.options.selectTheParent;
            $.fn.zTree.init($("#sortZtreeList"), setting, that.options.jsonData);
            //取消ztree所有的节点选择
            function CancelSelected(event) {
                var treeObj = $.fn.zTree.getZTreeObj("sortZtreeList");
                var nodes = treeObj.getNodes();

                for (var i = 0; i < nodes.length; i++) {
                    EachChildNodes(nodes[i], treeObj);
                }
            };
            that.$element.on('click', function () {
                that.showMenu();
            });
            that.theDefaultSelection();
            document.getElementById('sortZtreeVal').selectCallback = that.options.selectCallback;
        }
    };
    $.fn.commoditySortZtree = function (options) {
        var beautifier = new Beautifier(this, options);
        return beautifier.init();
    }
})(jQuery, window, document);
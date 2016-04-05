//门店联动
apus.namespace('apus.ui.selectStore');
apus.ui.selectStore = function (config) {
    return new $.fn.selectStore(config);
};

;
(function ($, window, document, undefined) {
    "use strict";
    //定义ConstructorName的构造函数
    var ConstructorName = function (ele, opt) {
        this.$element = ele,
            this.defaults = {
                'doneCallback': function () {
                },
                'loc_storeLevel1': '#loc_storeLevel1',
                'loc_storeLevel2': '#loc_storeLevel2',
                'loc_storeLevel3': '#loc_storeLevel3',
                'defaultStore': null,
                'areaData': null,
                'checkbox': true,
                'allCheckbox': false
            },
            this.options = $.extend({}, this.defaults, opt)
    }
    //定义ConstructorName的方法
    ConstructorName.prototype = {
        init: function () {
            var self = this;
            self.options.loc_storeLevel1 = $(self.options.loc_storeLevel1);
            self.options.loc_storeLevel2 = $(self.options.loc_storeLevel2);
            self.options.loc_storeLevel3 = $(self.options.loc_storeLevel3);


            $.ajax({
                url: ctx + '/common/getPlatinfoTree',
                data: '',
                type: 'post',
                cache: false,
                dataType: 'json',
                success: function (data) {
                    self.options.areaData = data;
                    self.showLocation()
                },
                error: function () {
                    //alert("异常！");
                }
            })
        },
        showLocation: function (province, city, town) {
            var self = this;
            var title = ['请选择', '请选择', '请选择'];
            $.each(title, function (k, v) {
                title[k] = '<option value="">' + v + '</option>';
            })
            self.options.loc_storeLevel1.append(title[0]);
            self.options.loc_storeLevel2.append(title[1]);


            self.options.loc_storeLevel1.select2()
            self.options.loc_storeLevel2.select2()
            if (self.options.checkbox) {
                self.options.loc_storeLevel3.attr('multiple', 'multiple').select2({
                    placeholder: '点击选择门店',
                    allowClear: true
                }).on('select2-open', function () {
                    // Adding Custom Scrollbar
                    $(this).data('select2').results.addClass('overflow-hidden').perfectScrollbar();
                });
            } else {
                self.options.loc_storeLevel3.append(title[2]);
                self.options.loc_storeLevel3.select2()
            }


            self.options.loc_storeLevel1.change(function () {
                self.options.loc_storeLevel2.empty();
                self.options.loc_storeLevel2.append(title[1]);
                self.fillOption(self.options.loc_storeLevel2, 1, self.options.loc_storeLevel1.val());

                self.options.loc_storeLevel2.change();

                if (self.checkbox) {
                    if (!self.options.allCheckbox) {
                        self.options.loc_storeLevel3.append(title[2]);
                        self.options.loc_storeLevel3.find('option').remove()
                    }


                } else {
                    self.options.loc_storeLevel3.select2()
                }

            })

            self.options.loc_storeLevel2.change(function () {
                self.options.loc_storeLevel3.empty();

                if (self.checkbox) {

                } else {
                    self.options.loc_storeLevel3.append(title[2]);
                    self.options.loc_storeLevel3.select2()
                }

                self.fillOption(self.options.loc_storeLevel3, '2', self.options.loc_storeLevel1.val(), self.options.loc_storeLevel2.val());

            })
            self.options.loc_storeLevel3.change(function () {
                var data = {};
                data.storeLevel1 = {};
                data.storeLevel1.name = self.options.loc_storeLevel1.select2('data').text;
                data.storeLevel1.id = self.options.loc_storeLevel1.find('option:selected').attr('cid')
                data.storeLevel2 = {};
                data.storeLevel2.name = self.options.loc_storeLevel2.select2('data').text;
                data.storeLevel2.id = self.options.loc_storeLevel2.find('option:selected').attr('cid')
                data.storeLevel3 = {};
                /*                data.storeLevel3.name = self.options.loc_storeLevel3.select2('data').text;

                 data.storeLevel3.id = self.options.loc_storeLevel3.find('option:selected').attr('cid')*/
               // self.options.doneCallback.call(self.options.doneCallback, data)
                    var all=false;
                    self.options.loc_storeLevel3.find('option:selected').each(function(i,v){
                        if(v.text=='全选'){
                            all= true;
                            console.log(v.text);
                            return
                        }
                    })
                    if(all){
                        self.fillOption(self.options.loc_storeLevel3, '2', self.options.loc_storeLevel1.val(), self.options.loc_storeLevel2.val(),all);
                        self.options.doneCallback.call(self.options.doneCallback, data);
                    }else {
                        self.options.doneCallback.call(self.options.doneCallback, data);
                    };
            })

            if (self.options.defaultStore) {

                self.defaultFillOption(self.options.loc_storeLevel1, '0');
                self.defaultFillOption(self.options.loc_storeLevel2, '1', self.options.loc_storeLevel1.val());
                self.defaultFillOption(self.options.loc_storeLevel3, '2', self.options.loc_storeLevel1.val(), self.options.loc_storeLevel2.val());

            } else {
                self.fillOption(self.options.loc_storeLevel1, '0');
            }
        },
        defaultFillOption: function (el_id, loc_id, loc_storeLevel1, loc_storeLevel2) {

            var self = this, el = el_id, option = '';
            if (loc_id == 0) {
                $.each(self.options.areaData, function (k, v) {

                    if (v.id == self.options.defaultStore[0].id && self.options.defaultStore[0].id) {
                        var option = '<option selected value="' + k + '" cid="' + v.id + '" pid="' + v.pid + '">' + v.name + '</option>';
                        el.append(option);
                    } else {
                        var option = '<option value="' + k + '" cid="' + v.id + '" pid="' + v.pid + '">' + v.name + '</option>';
                        el.append(option);
                    }
                })
                el.select2({"val": self.options.defaultStore[0].id, "text": ""}).trigger("change");

            } else if (loc_id == 1 && loc_storeLevel1 && self.options.defaultStore[0].children[0].id) {


                $.each(self.options.areaData[loc_storeLevel1].children, function (k, v) {
                    if (v.id == self.options.defaultStore[0].children[0].id) {
                        var option = '<option selected value="' + k + '" cid="' + v.id + '" pid="' + v.pid + '">' + v.name + '</option>';
                        el.append(option);
                    } else {
                        var option = '<option value="' + k + '" cid="' + v.id + '" pid="' + v.pid + '">' + v.name + '</option>';
                        el.append(option);
                    }

                })

                el.select2({"val": self.options.defaultStore[0].children[0].id}).trigger("change");


            } else if (loc_id == 2 && loc_storeLevel2) {

                if (self.options.checkbox && (!self.options.allCheckbox)) {

                    var vl = function (id) {
                        var r = 0
                        $(self.options.defaultStore[0].children[0].children).each(function (index, val) {
                            if (id == val.id) {
                                r += 1;
                            } else {
                                // return false;
                            }
                        })
                        return r;
                    }
                    $.each(self.options.areaData[loc_storeLevel1].children[loc_storeLevel2].children, function (k, v) {
                        if (vl(v.id)) {
                            option += '<option selected value="' + k + '" cid="' + v.id + '" pid="' + v.pid + '">' + v.name + '</option>';
                        } else {
                            option += '<option value="' + k + '" cid="' + v.id + '" pid="' + v.pid + '">' + v.name + '</option>';
                        }
                    })
                    el.html(option).select2({
                        placeholder: '请选择',
                        allowClear: true
                    }).on('select2-open', function () {
                        // Adding Custom Scrollbar
                        $(this).data('select2').results.addClass('overflow-hidden').perfectScrollbar();
                    });
                } else {
                    $.each(self.options.areaData[loc_storeLevel1].children[loc_storeLevel2].children, function (k, v) {
                        if (v.id == self.options.defaultStore[0].children[0].children[0].id) {
                            var option = '<option selected value="' + k + '" cid="' + v.id + '" pid="' + v.pid + '">' + v.name + '</option>';
                            el.append(option);
                        } else {
                            var option = '<option value="' + k + '" cid="' + v.id + '" pid="' + v.pid + '">' + v.name + '</option>';
                            el.append(option);
                        }

                    })
                    el.select2({"val": self.options.defaultStore[0].children[0].children[0].id}).trigger("change");
                }


            }

        },
        fillOption: function (el_id, loc_id, loc_storeLevel1, loc_storeLevel2,loc_storeLevel3_allSelectedType) {
            var self = this, el = el_id, option = '';
            if (loc_id == 0) {
                $.each(self.options.areaData, function (k, v) {
                    var option = '<option value="' + k + '" cid="' + v.id + '" pid="' + v.pid + '">' + v.name + '</option>';

                    el.append(option);
                })
                el.select2("val", "");
            } else if (loc_id == 1 && loc_storeLevel1) {


                $.each(self.options.areaData[loc_storeLevel1].children, function (k, v) {
                    var option = '<option value="' + k + '" cid="' + v.id + '" pid="' + v.pid + '">' + v.name + '</option>';
                    el.append(option);

                })


            } else if (loc_id == 2 && loc_storeLevel2) {

                if (self.options.checkbox && (!self.options.allCheckbox)) {
                    if(self.options.areaData[loc_storeLevel1].children[loc_storeLevel2].children.length>0){

                        option += '<option >全选</option>';
                    }
                    $.each(self.options.areaData[loc_storeLevel1].children[loc_storeLevel2].children, function (k, v) {
                        if(loc_storeLevel3_allSelectedType){
                            console.log(1);
                            option += '<option  selected  value="' + k + '" cid="' + v.id + '" pid="' + v.pid + '">' + v.name + '</option>';
                        }else{
                            console.log(2);
                            option += '<option value="' + k + '" cid="' + v.id + '" pid="' + v.pid + '">' + v.name + '</option>';
                        }

                    })
                        el.html(option).select2({
                            placeholder: '请选择',
                            allowClear: true
                        });

                  /*  el.html(option).select2({
                        placeholder: '请选择',
                        allowClear: true
                    }).on('select2-open', function () {
                        // Adding Custom Scrollbar
                       // $(this).data('select2').results.addClass('overflow-hidden').perfectScrollbar();
                    });*/
                } else {
                    $.each(self.options.areaData[loc_storeLevel1].children[loc_storeLevel2].children, function (k, v) {
                        var option = '<option value="' + k + '" cid="' + v.id + '" pid="' + v.pid + '">' + v.name + '</option>';
                        el.append(option);
                    })
                }


            }

        }

    }
//在插件中使用ConstructorName对象
    $.fn.selectStore = function (options) {
        //创建ConstructorName的实体
        var constructorName = new ConstructorName(this, options);
        //调用其方法
        return constructorName.init();
    }
})(jQuery, window, document);

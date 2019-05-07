'use strict';
require('./index.css')

var _arvin     = require('util/arvin.js');

// 通用页面头部
var header = {
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    /*回填*/
    onLoad : function () {
        var keyword = _arvin.getUrlParam('keyword');
        //keyword存在，则回填输入框
        if(keyword){
            $('#search-input').val(keyword);
        }
    },

    bindEvent : function(){
        var _this = this;
        //点击搜索按钮以后，做搜索提交
        $('#search-bin').click(function () {
            _this.searchSubmit();
        });
        //输入回车后，做搜索提交
        $('#search-input').keyup(function(e){
            //13是回车键
            if(e.keyCode === 13){
                _this.searchSubmit();
            }
        });
    },
    /*搜索的提交*/
    searchSubmit : function () {
        var keyword = $.trim($('#search-input').val());
        if(keyword){
            window.location.href = './list.html?keyword=' + keyword;
        }
        //如果keyword为空，直接返回首页
        else {
            _arvin.goHome();
        }
    }
};

header.init();
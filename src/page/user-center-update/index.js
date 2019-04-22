'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide         = require('page/common/nav-side/index.js');
var _arvin          = require("util/arvin.js");
var _user           = require('service/user-service.js');
var templateIndex   = require('./index.string');

//page 逻辑部分
var page = {
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        //初始化左侧菜单
        navSide.init({
            name : 'user-center'
        });
        //加载用户信息
        this.loadUserInfo();
    },
    bindEvent : function () {
        var _this = this;
        //点击提交按钮后的动作
        //事件冒泡  on()事件代理
        $(document).on('click', '.btn-submit', function () {
            var userInfo = {
                phone       : $.trim($('#phone').val()),
                email       : $.trim($('#email').val()),
                question    : $.trim($('#question').val()),
                answer      : $.trim($('#answer').val()),
            },
                //验证
            validateResult = _this.validateForm(userInfo);
            if(validateResult.status){
                //更改用户信息
                _user.updateUserInfo(userInfo,function (res,msg) {
                    _arvin.successTips(msg);
                    window.location.href = './user-center.html';
                }, function (errMsg) {
                    _arvin.errorTips(validateResult.msg);
                });
            }
            else{
                _arvin.errorTips(validateResult.msg);
            }
        });
    },
    
    // 加载用户信息
    loadUserInfo : function(){
        var userHtml = '';
        _user.getUserInfo(function(res){
            userHtml = _arvin.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml);
        }, function(errMsg){
            _arvin.errorTips(errMsg);
        });
    },
    //验证字段信息
    validateForm :function (formData) {
        var result = {
            status : false,
            msg    :''
        };
        //验证手机号
        if(!_arvin.validate(formData.phone,'phone')){
            result.msg = '手机号格式不正确';
            return result;
        }
        //验证邮箱
        if(!_arvin.validate(formData.email,'email')){
            result.msg = '邮箱格式不正确';
            return result;
        }
        //验证密保问题
        if(!_arvin.validate(formData.question,'require')){
            result.msg = '密保问题不能为空';
            return result;
        }
        //通过密保答案
        if(!_arvin.validate(formData.answer,'require')){
            result.msg = '答案不能为空';
            return result;
        }
        result.status  = true;
        result.msg     = '验证通过';
        return result;
    }
};
$(function () {
    page.init();
});
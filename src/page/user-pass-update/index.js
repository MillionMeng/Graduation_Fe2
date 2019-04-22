'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide         = require('page/common/nav-side/index.js');
var _arvin          = require("util/arvin.js");
var _user           = require('service/user-service.js');


//page 逻辑部分
var page = {
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        //初始化左侧菜单
        navSide.init({
            name : 'user-pass-update'
        });
    },
    bindEvent : function () {
        var _this = this;
        //点击提交按钮后的动作
        //事件冒泡  on()事件代理
        $(document).on('click', '.btn-submit', function () {
            var userInfo = {
                    password            : $.trim($('#password').val()),
                    passwordNew         : $.trim($('#password-new').val()),
                    passwordConfirm     : $.trim($('#password-Confirm').val()),
                },
                //验证
                validateResult = _this.validateForm(userInfo);
            if(validateResult.status){
                //更改用户密码
                _user.updatePassword({
                    password : userInfo.password,
                    passwordNew : userInfo.passwordNew
                }, function (res,msg) {
                    _arvin.successTips(msg);
                }, function (errMsg) {
                    _arvin.errorTips(errMsg);
                });
            }
            else{
                _arvin.errorTips(validateResult.msg);
            }
        });
    },

    //验证字段信息
    validateForm :function (formData) {
        var result = {
            status : false,
            msg    :''
        };
        //验证原密码是否为空
        if(!_arvin.validate(formData.password,'require')){
            result.msg = '原密码不能为空';
            return result;
        }
        //验证新密码 长度
        if(!formData.passwordNew || formData.passwordNew.length < 6){
            result.msg = '密码长度不能小于6位';
            return result;
        }
        //验证两次密码是否一致
        if(formData.passwordNew !== formData.passwordConfirm){
            result.msg = '两次密码输入不一致';
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
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide         = require('page/common/nav-side/index.js');
var _arvin          = require('util/arvin.js');
var _order          = require('service/order-service.js');
var _address        = require('service/address-service.js');
var templateAddress = require('./index.string');
var addressModal    = require('../order-confirm/address-modal.js');

var page = {
    data : {
        selectedAddressId : null
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        //初始化左侧菜单
        navSide.init({
            name: 'user-address'
        });
        this.loadAddressList();
    },
    bindEvent : function(){

    },
    // 加载地址列表
    loadAddressList : function(){
        var _this       = this;
        //加一个loading图标
        $(".address-com").html('<div class="loading"></div>'); //获取地址列表
        _address.getAddressList(function (res) {
          /*  _this.addressFilter(res);*/
            var addressListHtml = _arvin.renderHtml(templateAddress,res);
            $(".address-com").html(addressListHtml);
        },function (errMsg) {
            $(".address-com").html('<p class="err-tip">地址加载失败，请重试</p>');
        })
    }
}

$(function () {
    page.init();
});
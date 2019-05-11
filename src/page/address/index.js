'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide         = require('page/common/nav-side/index.js');
var _arvin          = require('util/arvin.js');
var _address        = require('service/address-service.js');
var templateAddress = require('./index.string');
var addressModal    = require('./address-modal');

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
        var _this = this;
        //新建地址
        $(document).on('click','.arvin-address',function () {
            addressModal.show({
                isUpdate : false,
                onSuccess : function () {
                    _this.loadAddressList();
                }
            });
        });

        //按钮新建地址
        $('#new-address-btn').click(function () {
            addressModal.show({
                isUpdate : false,
                onSuccess : function () {
                    _this.loadAddressList();
                }
            });
        });


        //编辑收货地址
        $(document).on('click','.address-update1',function (e) {
            //阻止向上冒泡
            e.stopPropagation();
            var addressId =  $(this).parents('.arvin-address').data('id'); ;
           console.log(addressId);


            //先读取信息
            _address.getAddress(addressId,function (res) {
                addressModal.show({
                    isUpdate    : true,
                    data    : res,
                    onSuccess   : function () {
                        _this.loadAddressList();
                    }
                });
            },function (errMsg) {
                _arvin.errorTips(errMsg);
            });
            addressModal.show({
                isUpdate : false,
                onSuccess : function () {
                    _this.loadAddressList();
                }
            });
        });

        //删除地址
        $(document).on('click','.address-del',function (e) {
            //阻止向上冒泡
            e.stopPropagation();
            var addressId = $(this).parents('.arvin-address').data('id');
            if(window.confirm('是否删除改地址？')){
                _address.deleteAddress(addressId,function (res) {
                    _this.loadAddressList();
                },function (errMsg) {
                    _arvin.errorTips(errMsg);
                });
            }
        });
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
    },
}

$(function () {
    page.init();
});
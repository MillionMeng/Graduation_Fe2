'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _arvin          = require('util/arvin.js');
var _order          = require('service/order-service.js');
var _address        = require('service/address-service.js');
var templateProduct = require('./product-list.string');
var templateAddress = require('./address-list.string');
var addressModal    = require('./address-modal.js');

var page = {
    data : {
        selectedAddressId : null
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadAddressList();
        this.loadProductList();
    },
    bindEvent : function(){
        var _this = this;
        //地质的选择
        //选中当前的 把其他选中的边框去掉的清掉
        $(document).on('click','.address-item',function () {
            $(this).addClass('active').siblings('.address-item').removeClass('active');


            console.log($(this));
            console.log($(this).data('id'));
            _this.data.selectedAddressId = $(this).data('id');
        });
        //订单的提交
        $(document).on('click','.order-submit',function () {
            var addressId = _this.data.selectedAddressId;
            if(addressId){
                //创建订单
                _order.createOrder({
                    addressId : addressId
                }, function (res) {
                    window.location.href = './payment.html?orderNumber=' + res.orderNo;
                },function (errMsg) {
                    _arvin.errorTips(errMsg)
                });
            }
            else {
                _arvin.errorTips('请选择地址')
            }
        });
        //新建地址
        $(document).on('click','.address-add',function () {
            addressModal.show({
                isUpdate : false,
                onSuccess : function () {
                    _this.loadAddressList();
                }
            });
        });
        //编辑收货地址
        $(document).on('click','.address-update',function (e) {
            //阻止向上冒泡
            e.stopPropagation();
            var addressId = $(this).parents('.address-item').data('id');
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
            /*addressModal.show({
                isUpdate : false,
                onSuccess : function () {
                    _this.loadAddressList();
                }
            });*/
        });
        //删除地址
        $(document).on('click','.address-delete',function (e) {
           //阻止向上冒泡
           e.stopPropagation();
           var addressId = $(this).parents('.address-item').data('id');
           if(window.confirm('确认删除改地址吗')){
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
        $(".address-con").html('<div class="loading"></div>');
        //获取地址列表
        _address.getAddressList(function (res) {
            _this.addressFilter(res);
            var addressListHtml = _arvin.renderHtml(templateAddress,res);
            $(".address-con").html(addressListHtml);
        },function (errMsg) {
            $(".address-con").html('<p class="err-tip">地址加载失败，请重试</p>');
        })
    },
    //处理地址列表的选中状态
    addressFilter : function (data) {
        if(this.data.selectedAddressId){
            var selectedAddressIfFlag = false;
            for(var i = 0, length = data.list.length ; i < length ; i++){
                if(data.list[i].id === this.data.selectedAddressId){
                    data.list[i].isActive = true;
                    selectedAddressIfFlag = true;
                }
            };
            //如果以前选中的地址不在列表里，将其删除
            if(!selectedAddressIfFlag){
                this.data.selectedAddressId = null;
            }
        }
    },
    // 加载商品清单
    loadProductList : function(){
        var _this       = this;
        //加一个loading图标
        $(".product-con").html('<div class="loading"></div>');
        //获取地址列表
        _order.getProductList(function (res) {
            var productListHtml = _arvin.renderHtml(templateProduct,res);
            $(".product-con").html(productListHtml);
        },function (errMsg) {
            $(".product-con").html('<p class="err-tip">商品失败，请重试</p>');
        })
    },

    // 删除指定商品，支持批量，productId用逗号分割
    deleteCartProduct : function(productIds){
        var _this = this;
        _cart.deleteProduct(productIds, function(res){
            _this.renderCart(res);
        }, function(errMsg){
            _this.showCartError();
        });
    },
    // 数据匹配
    filter : function(data){
        data.notEmpty = !!data.cartProductVoList.length;
    },
    // 显示错误信息
    showCartError: function(){
        $('.page-wrap').html('<p class="err-tip">哪里不对了，刷新下试试吧。</p>');
    }
};
$(function(){
    page.init();
})
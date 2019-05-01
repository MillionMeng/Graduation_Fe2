'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');

var _arvin          = require("util/arvin.js");
var _payment        = require('service/payment-service.js');
var templateIndex   = require('./index.string');

//page 逻辑部分
var page = {
    data : {
        orderNumber : _arvin.getUrlParam('orderNumber')
    },
    init: function () {
        this.onLoad();
    },
    onLoad: function () {
        //加载detail数据
        this.loadPaymentInfo();

    },
    //加载订单列表
    loadPaymentInfo : function () {
        var _this             = this,
            paymentHtml       = '',
            $pageWrap          = $('.page-wrap');
        $pageWrap.html('<div class="loading"></div>');
        _payment.getPaymentInfo(this.data.orderNumber,function (res) {
            //渲染html
            paymentHtml = _arvin.renderHtml(templateIndex,res);
            $pageWrap.html(paymentHtml);
            //监听订单状态
            _this.listenOrderStatus();

        },function (errMsg) {
            $pageWrap.html('<p class="err-tip"> + errMsg + </p>')
        });
    },
    listenOrderStatus : function() {
        var _this = this;
        this.paymentTimer = window.setInterval(function(){
            _payment.getPaymentStatus(_this.data.orderNumber,function(res){
                if(res ==true){
                    window.location.href = './result.html?type=payment&orderNumber='+_this.data.orderNumber;
                }
            },function (errMsg) {

            });
        },5000)
},
};

$(function () {
    page.init();
});
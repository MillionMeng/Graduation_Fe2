'use strict';

var _arvin = require('util/arvin.js');

var _order = {
    // 创建订单时 获取订单商品列表
    getProductList : function(resolve, reject){
        _arvin.request({
            url     : _arvin.getServerUrl('/order/getorderproduct.do'),
            success : resolve,
            error   : reject
        });
    },
    // 提交订单
    createOrder : function(orderInfo, resolve, reject){
        _arvin.request({
            url     : _arvin.getServerUrl('/order/create'),
            data    : orderInfo,
            method  : 'POST',
            contentType    :'application/x-www-form-urlencoded',
            success : resolve,
            error   : reject
        });
    },
    // 获取订单列表
    getOrderList : function(listParam,resolve, reject){
        _arvin.request({
            url     : _arvin.getServerUrl('/order/list'),
            data    : listParam,
            success : resolve,
            error   : reject
        });
    },
    // 获取单个订单详情
    getOrderDetail : function(orderNumber,resolve, reject){
        _arvin.request({
            url     : _arvin.getServerUrl('/order/detail'),
            data    : {
                orderNo : orderNumber
            },
            success : resolve,
            error   : reject
        });
    },
    //取消订单
    cancelOrder: function(orderNumber,resolve, reject){
        _arvin.request({
            url         : _arvin.getServerUrl('/order/cancel'),
            data        : {
                orderNo : orderNumber
            },
            method      : 'POST',
            contentType :'application/x-www-form-urlencoded',
            success     : resolve,
            error       : reject
        });
    },
}
module.exports = _order;
'use strict';

var _arvin = require('util/arvin.js');

var _payment = {
    // 创建订单时 获取订单商品列表
    getPaymentInfo: function (orderNumber,resolve, reject) {
        _arvin.request({
            url         : _arvin.getServerUrl('/order/pay'),
            data        :{
                orderNo : orderNumber
            },
            method      : 'POST',
            contentType :'application/x-www-form-urlencoded',
            success     : resolve,
            error       : reject
        });
    },
    //获取订单支付状态
    getPaymentStatus : function (orderNumber,resolve, reject) {
        _arvin.request({
            url         : _arvin.getServerUrl('/order/get_order_pay_status'),
            data        :{
                orderNo : orderNumber
            },
            success     : resolve,
            error       : reject
        });
    }




}
module.exports = _payment;
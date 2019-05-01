'use strict'

require('./index.css');
require('page/common/nav-simple/index.js');
var _arvin = require("util/arvin.js");

$(function () {
    var type        = _arvin.getUrlParam('type') || 'default',
        $element    = $('.' + type + '-success');
    if(type === 'payment'){
        var orderNumber = _arvin.getUrlParam('orderNumber'),
            $orderNumber = $element.find('.order-number');
        console.log(123);
        $orderNumber.attr('href',$orderNumber.attr('href')+orderNumber);
        console.log(orderNumber);
    }
    //显示对应的提示
    $element.show();
    //下面写订单成功 等逻辑
})
'use strict'

require('./index.css');
require('page/common/nav-simple/index.js');
var _arvin = require("util/arvin.js");

$(function () {
    var type        = _arvin.getUrlParam('type') || 'default',
        $element    = $('.' + type + '-success');
    //显示对应的提示
    $element.show();
    //下面写订单成功 等逻辑
})
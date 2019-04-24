'use strict';

var _arvin= require('util/arvin.js');

/*
_arvin.request({
    url :'/product/list.do?keyword=1',
    success : function (res) {
        console.log(res);
    },
    error :function (errMsg) {
        console.log(errMsg);
    }
});*/
//console.log(_arvin.getUrlParam("test"));

require('./index.css')
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('util/slider/index.js');
var navSide         = require('page/common/nav-side/index.js');
var templateBanner  = require('./banner.string');
var _arvin          = require("util/arvin.js");


$(function () {
    //渲染banner的html


    var bannerHtml  = _arvin.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    //初始化banner
    var $slider     = $('.banner').unslider({
        dots:true
    });
    //事件绑定   前一张和后一张操作的事件绑定
    $('.banner-con .banner-arrow').click(function () {
        var forward = $(this).hasClass('prev') ? 'prev' : 'next';
        $slider.data('unslider')[forward]();
    })
});

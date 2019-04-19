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

require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _arvin = require("util/arvin.js");

navSide.init({
    name : 'user-center'
});

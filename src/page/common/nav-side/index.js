'use strict';
require('./index.css')

var _arvin          = require('util/arvin.js');
var templateIndex   = require('./index.string');

// 侧边导航
var navSide = {
    option : {
        name : '',
        navList : [
            {name: 'user-center',  desc: '个人中心'    ,href :'./user-center.html'},
            {name: 'user-address',  desc: '收货地址'    ,href :'./address.html'},
            {name: 'order-list',   desc: '我的订单'    ,href :'./order-list.html'},
            {name: 'user-pass-update',  desc: '修改密码'    ,href :'./user-pass-update.html'},
            {name: 'about',        desc: '关于IBuy'   ,href :'./about.html'}
        ]
    },
    init : function(option){
        //合并选项 jquery提供的方法 第二个参数是传进来的option
        //会把第一个参数里的东西改变  变成第二个参数里的   如果不想改变，在this.option 前加一个空对象 {},
        $.extend(this.option, option);
        this.renderNav();
    },
    //渲染导航菜单
    renderNav : function () {
        //计算active数据
        for(var i = 0, iLength = this.option.navList.length; i < iLength; i++){
            if(this.option.navList[i].name === this.option.name){
                this.option.navList[i].isActive = true;
            }
        };
        //渲染list数据
        var navHtml = _arvin.renderHtml(templateIndex, {
            navList : this.option.navList
        });
        //把HTML放入容器里
        $('.nav-side').html(navHtml);
    }
};

module.exports = navSide;
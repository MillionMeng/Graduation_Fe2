'use strict';

var _arvin = require('util/arvin.js');

var _collect = {
    // 我的收藏列表
    getCollectList: function (resolve, reject) {
        _arvin.request({
            url: _arvin.getServerUrl('/collect/list'),
            success: resolve,
            error: reject
        });
    },
    //删除收藏列表商品
    delCollectProduct : function (productIds,resolve, reject) {
        _arvin.request({
            url: _arvin.getServerUrl('/collect/det'),
            data    : {
                productId : productIds
            },
            method  : 'POST',
            contentType    :'application/x-www-form-urlencoded',
            success: resolve,
            error: reject
        });
    },
    //收藏商品
    addCollectProduct :  function (productId,resolve, reject) {
        _arvin.request({
            url: _arvin.getServerUrl('/collect/add'),
            data    :productId ,
            method  : 'POST',
            contentType    :'application/x-www-form-urlencoded',
            success: resolve,
            error: reject
        });
    },


}
module.exports = _collect;
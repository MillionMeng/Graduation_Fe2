/*
* @Author: Rosen
* @Date:   2017-05-17 18:55:04
* @Last Modified by:   Rosen
* @Last Modified time: 2017-06-02 17:51:15
*/

'use strict';

var _arvin = require('util/arvin.js');

var _cart = {
    // 获取购物车数量
    getCartCount : function(resolve, reject){
        _arvin.request({
            url     : _arvin.getServerUrl('/cart/getproductcount'),
            success : resolve,
            error   : reject
        });
    },
    // 添加到购物车
    addToCart : function(productInfo, resolve, reject){
        _arvin.request({
            url     : _arvin.getServerUrl('/cart/add'),
            data    : productInfo,
            method  : 'POST',
            contentType    :'application/x-www-form-urlencoded',
            success : resolve,
            error   : reject
        });
    },
    // 获取购物车列表
    getCartList : function(resolve, reject){
        _arvin.request({
            url     : _arvin.getServerUrl('/cart/list'),
            success : resolve,
            error   : reject
        });
    },
    // 选择购物车商品
    selectProduct : function(productId, resolve, reject){
        _arvin.request({
            url     : _arvin.getServerUrl('/cart/selectone'),
            data    : {
                productId : productId
            },
            method  : 'POST',
            contentType    :'application/x-www-form-urlencoded',
            success : resolve,
            error   : reject
        });
    },
    // 取消选择购物车商品
    unselectProduct : function(productId, resolve, reject){
        _arvin.request({
            url     : _arvin.getServerUrl('/cart/unselectone'),
            data    : {
                productId : productId
            },
            method  : 'POST',
            contentType    :'application/x-www-form-urlencoded',
            success : resolve,
            error   : reject
        });
    },
    // 选中全部商品
    selectAllProduct : function(resolve, reject){
        _arvin.request({
            url     : _arvin.getServerUrl('/cart/selectall'),
            success : resolve,
            method  : 'POST',
            contentType    :'application/x-www-form-urlencoded',
            error   : reject
        });
    },
    // 取消选中全部商品
    unselectAllProduct : function(resolve, reject){
        _arvin.request({
            url     : _arvin.getServerUrl('/cart/unselectall'),
            success : resolve,
            method  : 'POST',
            contentType    :'application/x-www-form-urlencoded',
            error   : reject
        });
    },
    // 更新购物车商品数量
    updateProduct : function(productInfo, resolve, reject){
        _arvin.request({
            url     : _arvin.getServerUrl('/cart/update'),
            data    : productInfo,
            method  : 'POST',
            contentType    :'application/x-www-form-urlencoded',
            success : resolve,
            error   : reject
        });
    },
    // 删除指定商品
    deleteProduct : function(productIds, resolve, reject){
        _arvin.request({
            url     : _arvin.getServerUrl('/cart/deleteproduct'),
            data    : {
                productIds : productIds
            },
            method  : 'POST',
            contentType    :'application/x-www-form-urlencoded',
            success : resolve,
            error   : reject
        });
    },
}
module.exports = _cart;
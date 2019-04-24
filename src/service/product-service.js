'use strict';

var _arvin = require('util/arvin.js');

var _product = {
    // 获取商品列表
    getProductList : function(listParam, resolve, reject){
        _arvin.request({
            url     : _arvin.getServerUrl('/productfe/list'),
            //data    : listParam,
            data    : {
                keyword         : listParam.keyword,
                categoryId      :  listParam.categoryId,
                pageNum         :  listParam.pageNum,
                pageSize        :  listParam.pageSize,
                orderBy         :  listParam.orderBy
            },
            success : resolve,
            error   : reject
        });
    },
    // 获取商品详细信息
    getProductDetail : function(productId, resolve, reject){
        _arvin.request({
            url     : _arvin.getServerUrl('/productfe/detail'),
            data    : {
                productId : productId
            },
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _product;
'use strict';

var _arvin = require('util/arvin.js');

var _address = {

    // 添加到购物车
    save : function(receiverInfo, resolve, reject){
        _arvin.request({
            url     : _arvin.getServerUrl('/address/add'),
           // data    : receiverInfo,
            data    : JSON.stringify({"receiverName":receiverInfo.receiverName,"receiverProvince":receiverInfo.receiverProvince,"receiverCity":receiverInfo.receiverCity,"receiverAddress":receiverInfo.receiverAddress,"receiverPhone":receiverInfo.receiverPhone,"receiverZip":receiverInfo.receiverZip}),
            method  : 'POST',
            //contentType    :'application/x-www-form-urlencoded',
            success : resolve,
            error   : reject
        });
    },
    // 获取地址列表
    getAddressList : function(resolve, reject){
        _arvin.request({
            url     : _arvin.getServerUrl('/address/list'),
            data    : {
                pageSize : 50
            },
            success : resolve,
            error   : reject
        });
    },
    //获取地址
    getAddress : function(addressId,resolve, reject){
        _arvin.request({
            url     : _arvin.getServerUrl('/address/select'),
            data    : {
                addressId  : addressId
            },
            success : resolve,
            error   : reject
        });
    },
    //获取地址
    updateAddress : function(receiverInfo,resolve, reject){
        _arvin.request({
            url     : _arvin.getServerUrl('/address/update'),
            data    : JSON.stringify({"id":receiverInfo.id,"receiverName":receiverInfo.receiverName,"receiverProvince":receiverInfo.receiverProvince,"receiverCity":receiverInfo.receiverCity,"receiverAddress":receiverInfo.receiverAddress,"receiverPhone":receiverInfo.receiverPhone,"receiverZip":receiverInfo.receiverZip}),
            method  : 'post',
            success : resolve,
            error   : reject
        });
    },
    //删除地址
    deleteAddress : function(addressId,resolve, reject){
        _arvin.request({
            url     : _arvin.getServerUrl('/address/del'),
            data    : {
                addressId : addressId
            },
            success : resolve,
            error   : reject
        });
    },

}
module.exports = _address;
'use strict';

var _arvin = require('util/arvin.js');

var _comment = {

    // 获取评论列表
    getCommentList : function(productId,resolve, reject){
        _arvin.request({
            url     : _arvin.getServerUrl('/comment/list'),
            data    : {
                productId : productId
            },
            success : resolve,
            error   : reject
        });
    },
    //新增评论
    addComment : function (commentInfo,resolve,reject) {
        _arvin.request({
            url     :_arvin.getServerUrl('/comment/add'),
            data    :JSON.stringify({"productId":commentInfo.productId, "content":commentInfo.content
            }),
          /*  data    : commentInfo,*/
            method  : 'POST',
            /*contentType    :'application/x-www-form-urlencoded',*/
            success : resolve,
            error   : reject
        /*JSON.stringify()*/
        })
    },
    //查看评论权限
    commentPermission : function(commentInfo,resolve, reject){
        _arvin.request({
            url     : _arvin.getServerUrl('/comment/Permission'),
            data    : commentInfo,
            success : resolve,
            error   : reject
        });
    },


}
module.exports = _comment;
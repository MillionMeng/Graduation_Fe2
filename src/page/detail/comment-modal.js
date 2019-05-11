
'use strict';

require('page/common/nav/index.js');
require('page/common/header/index.js');
var _arvin          = require('util/arvin.js');
var _comment        = require('service/comment-service.js');
var templateIndex   = require('./index.string');
var templateComment   = require('./comment.string');
var templateCommentModal   = require('./comment-modal.string');

var commentModal = {
    data : {
        productId : _arvin.getUrlParam('productId') || '',
    },
    show : function (option) {
       //第一步赋值 option赋到对象上
        this.option = option;
        this.$modalWrap = $('.modal-comment');
       //第二部 渲染页面
        this.loadCommentModal();
        //第三步 绑定事件
        this.bindEvent();
    },
    hide : function () {
        this.$modalWrap.empty();
    },
    loadCommentModal : function () {
        var _this =this;
        var commentModalHtml = _arvin.renderHtml(templateCommentModal,this.option.data);
        this.$modalWrap.html(commentModalHtml);
        
        this.$modalWrap.find('.comment-btn1').click(function () {
            var commentInfo = _this.getCommentInfo();
            if(commentInfo.status){
                _comment.addComment(commentInfo.data,function (res) {
                    _arvin.successTips("已添加一条评论~");
                    _this.hide();
                    //执行回调函数
                    typeof _this.option.onSuccess() === 'function'  && _this.option.onSuccess(res);
                },function (errMsg) {
                    _arvin.errorTips("添加评论失败~")
                })
            }else{
                _arvin.errorTips(commentInfo.errMsg);
            }
        })
    },

    bindEvent : function(){
        var _this = this;
        //关闭弹窗
        $(document).on('click', '.close', function(){
            _this.hide();
        });

    },
    //获取评论的相关数据 用来传给后端
    getCommentInfo :function () {
        var commentInfo = {},
            result      ={
                status : false
            };

        commentInfo.productId = this.data.productId;
        commentInfo.content = $.trim(this.$modalWrap.find('.form-item-comment').val());
        console.log(commentInfo.content);
        if(!commentInfo.content){
            result.errMsg = "请输入内容";
        }else{
            result.data = commentInfo;
            result.status = true;
        }
        return result;
    }
};

module.exports = commentModal;
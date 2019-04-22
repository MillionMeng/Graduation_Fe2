
'use strict';

var _arvin = require('util/arvin.js');

var _user = {
    // 用户登录
    login : function(user, resolve, reject){
        //console.log(username,password)
        _arvin.request({
            url     : _arvin.getServerUrl('/user/login'),
            data    : user,
            contentType    :'application/x-www-form-urlencoded',
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 检查用户名
    checkUsername : function(username, resolve, reject){
        _arvin.request({
            url     : _arvin.getServerUrl('/user/check'),
            data    : {
                type    : 'username',
                str     :  username
            },
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 用户注册
    register : function(user, resolve, reject){
        _arvin.request({
            url     : _arvin.getServerUrl('/user/register'),
            //data:user,
            data    : JSON.stringify({"username":user.username,"password":user.password,"phone":user.phone,"email":user.email,"question":user.question,"answer":user.answer}),
            method  : 'post',
            success : resolve,
            error   : reject
        });
    },
    // 检查登录状态
    checkLogin : function(resolve, reject){
        _arvin.request({
            url     : _arvin.getServerUrl('/user/loginfo'),
           // method  : 'POST',
            //withCredentials: true,
            headers: {'Cookie' : document.cookie },
            success : resolve,
            error   : reject
        });
    },
    // 获取用户密码提示问题
    getQuestion : function(username, resolve, reject){
        _arvin.request({
            url     : _arvin.getServerUrl('/user/forgetQuestion'),
            data    : {
                username : username
            },
            contentType    :'application/x-www-form-urlencoded',
            //method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 检查密码提示问题答案
    checkAnswer : function(userInfo, resolve, reject){
        _arvin.request({
            url             : _arvin.getServerUrl('/user/checkanswer'),
            data            : userInfo,
            method          : 'POST',
            contentType     :'application/x-www-form-urlencoded',
            success         : resolve,
            error           : reject
        });
    },
    // 重置密码
    resetPassword : function(userInfo, resolve, reject){
        _arvin.request({
            url     : _arvin.getServerUrl('/user/resetpassword'),
            data    : userInfo,
            method  : 'POST',
            contentType     :'application/x-www-form-urlencoded',
            success : resolve,
            error   : reject
        });
    },
    // 获取用户信息
    getUserInfo : function(resolve, reject){
        _arvin.request({
            url     : _arvin.getServerUrl('/user/getInformation'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 更新个人信息
    updateUserInfo : function(user, resolve, reject){
        _arvin.request({
            url     : _arvin.getServerUrl('/user/updateInfomation'),
            //data    : userInfo,
            data    : JSON.stringify({"username":user.username,"phone":user.phone,"email":user.email,"question":user.question,"answer":user.answer}),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 登录状态下更新密码
    updatePassword : function(userInfo, resolve, reject){
        _arvin.request({
            url     : _arvin.getServerUrl('/user/resetpasswordlogin'),
            data    : userInfo,
            method  : 'POST',
            contentType    :'application/x-www-form-urlencoded',
            success : resolve,
            error   : reject
        });
    },
    // 登出
    logout : function(resolve, reject){
        _arvin.request({
            url     : _arvin.getServerUrl('/user/logout'),
            //method  : 'POST',
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _user;
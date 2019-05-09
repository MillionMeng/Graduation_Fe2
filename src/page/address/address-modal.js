'use strict';

var _arvin                  = require('util/arvin.js');
var _address                = require('service/address-service.js');
var _cities                 = require('util/cities/index.js');
var templateAddressModal    = require('./address-modal.string');

var addressModal = {
    show: function (option) {
        /*第一步option赋值  option 的绑定*/
        this.option = option;
        this.option.data = option.data || {};
        this.$modalWrap = $('.modal-wrap');
        /*二 渲染页面*/
        this.loadModal();
        /*三 绑定事件*/
        this.bindEvent();
    },
    bindEvent : function () {
        var _this= this;
        //省份和城市的二级联动
        this.$modalWrap.find('#receiver-province').change(function () {
            var selectedProvince = $(this).val();
            _this.loadCity(selectedProvince);
        });

        //提交收货地址
        this.$modalWrap.find('.address-btn').click(function () {
            var receiverInfo = _this.getReceiverInfo1(),
                isUpdate     = _this.option.isUpdate;
            console.log(isUpdate,receiverInfo.status);
            //使用新地址。切验证通过
            if(!isUpdate && receiverInfo.status){
                _address.save(receiverInfo.data,function (res) {
                    _arvin.successTips('新建地址成功');
                    _this.hide();
                    //执行回调函数
                    typeof _this.option.onSuccess() === 'function'  && _this.option.onSuccess(res);
                },function (errMsg) {
                    _arvin.errorTips(errMsg);
                });
            }
            //更新地址
            else if(isUpdate && receiverInfo.status){
                _address.updateAddress(receiverInfo.data,function (res) {
                    _arvin.successTips('修改地址成功');
                    _this.hide();
                    typeof _this.option.onSuccess() === 'function'  && _this.option.onSuccess(res);
                },function (errMsg) {
                    _arvin.errorTips(errMsg);
                });

            }
            //验证失败
            else {
                _arvin.errorTips(receiverInfo.errMsg || '新建地址失败~ 好难过');
            }
        });
        //点x 或蒙版区域关闭弹窗
        this.$modalWrap.find('.close').click(function(){
            _this.hide();
        });
    },
    loadModal : function () {
        var addressModalHtml = _arvin.renderHtml(templateAddressModal,{
            isUpdate : this.option.isUpdate,
            data     : this.option.data    //用来回填
        });
        this.$modalWrap.html(addressModalHtml);
        //加载省份
        this.loadProvince();
        /*//加载城市
        this.loadCity();*/
    },
    //加载城市
    loadCity : function (provinceName) {
        var cities = _cities.getCities(provinceName) || [],
            $citySelect = this.$modalWrap.find('#receiver-city');
        console.log(cities);

        $citySelect.html(this.getSelection(cities));

        //如果是更新地址，并且有省份信息，做城市的回填
        if(this.option.isUpdate && this.option.data.receiverCity){
            $citySelect.val(this.option.data.receiverCity);
        }
    },
    //加载省份
    loadProvince : function(){
        var province       =_cities.getProvinces() || [],
            $provinceSelect = this.$modalWrap.find('#receiver-province');
        $provinceSelect.html(this.getSelection(province));
        //如果是更新地址，并且有省份信息，做省份回填
        if(this.option.isUpdate && this.option.data.receiverProvince){
            $provinceSelect.val(this.option.data.receiverProvince);
            this.loadCity(this.option.data.receiverProvince);
        }
    },
    //获取选择宽option的选项,输入array,输出HTML
    getSelection :function (optionArray) {
        var html = '<option value="">请选择</option>>';
        for(var i = 0,length = optionArray.length; i < length; i++){
            html +='<option value="' + optionArray[i] + '">' + optionArray[i] + '</option>>';
        }
        return html;
    },
    //获取表单里收件人信息的方法,并做表单的验证
    getReceiverInfo1 : function () {
        var receiverInfo    = {},
            result          ={
                status : false
            };
        receiverInfo.receiverName       = $.trim(this.$modalWrap.find('#receiver-name').val());
        receiverInfo.receiverProvince   = this.$modalWrap.find('#receiver-province').val();
        receiverInfo.receiverCity       =this.$modalWrap.find('#receiver-city').val();
        receiverInfo.receiverAddress    = $.trim(this.$modalWrap.find('#receiver-address').val());
        receiverInfo.receiverPhone      = $.trim(this.$modalWrap.find('#receiver-phone').val());
        receiverInfo.receiverZip        = $.trim(this.$modalWrap.find('#receiver-zip').val());
        if(this.option.isUpdate){
            receiverInfo.id = $.trim(this.$modalWrap.find('#receiver-id').val());

        }
        //表单验证
        if(!receiverInfo.receiverName){
            result.errMsg = '请输入收件人姓名';
        }else if(!receiverInfo.receiverProvince){
            result.errMsg = '请选择收件人所在省份';
        }else if(!receiverInfo.receiverCity){
            result.errMsg = '请选择收件人所在城市';
        }else if(!receiverInfo.receiverAddress){
            result.errMsg = '请输入收件人详细地址';
        }else if(!receiverInfo.receiverPhone){
            result.errMsg = '请输入收件人手机号';
        }
        //所有验证全部通过
        else {
            result.status   = true;
            result.data     = receiverInfo;
        }
        return result;
    },
    //关闭弹窗
    hide : function () {
        this.$modalWrap.empty();
    }
}

module.exports = addressModal;
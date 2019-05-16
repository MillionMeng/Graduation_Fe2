var webpack             = require('webpack');
var ExtractTextPlugin   = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin   = require("html-webpack-plugin");

//环境变量的配置  dev/online
var WEBPACK_ENV         = process.env.WEBPACK_ENV || 'dev';
//console.log(WEBPACK_ENV);
//获取html-webpack-pligin参数的方法
var getHtmlConfig = function (name,title) {
    return {
        //生成的文件所依赖的html文件模板，模板类型可以使html，jade，ejs等。
        template : './src/view/'+name+'.html',
        //目标文件位置 (文件名)
        filename : 'view/'+name+'.html',
        //文件的标题
        title    : title,
        //图标
        favicon  : './ibuy32.ico',
        // true 默认值，script标签位于html文件的 body 底部
        inject   : true,
        //是否生成hash添加在引入文件地址的末尾，这个可以避免缓存带来的麻烦。默认为true。
        hash     : true,
        //用于多入口文件，当有多个入口文件，编译后会生成多个打包文件，chunks用来选择使用的js文件
        chunks   : ['common',name]
    };
};
//webpack config
var config = {
    entry: {
        'common'                : ['./src/page/common/index.js'],
        'index'                 : ['./src/page/index/index.js'],
        'list'                  : ['./src/page/list/index.js'],
        'detail'                : ['./src/page/detail/index.js'],
        'cart'                  : ['./src/page/cart/index.js'],
        'cart-center'           : ['./src/page/cart-center/index.js'],
        'order-confirm'         : ['./src/page/order-confirm/index.js'],
        'order-list'            : ['./src/page/order-list/index.js'],
        'order-detail'          : ['./src/page/order-detail/index.js'],
        'payment'               : ['./src/page/payment/index.js'],
        'user_login'            : ['./src/page/user_login/index.js'],
        'user-register'         : ['./src/page/user-register/index.js'],
        'user-pass-reset'       : ['./src/page/user-pass-reset/index.js'],
        'user-center'           : ['./src/page/user-center/index.js'],
        'user-center-update'    : ['./src/page/user-center-update/index.js'],
        'user-pass-update'      : ['./src/page/user-pass-update/index.js'],
        'result'                : ['./src/page/result/index.js'],
        'about'                 : ['./src/page/about/index.js'],
        'address'                 : ['./src/page/address/index.js'],
    },
    output:{
        path: './dist', //目标文件要放的位置
        publicPath : '/dist',
        filename: 'js/[name].js'//文件名字
    },
    //外部依赖的声明
    externals : {
        'jquery' : 'window.jQuery'
    },
    //各种文件，各种loader
    module: {
      loaders:[
          { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },
          { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
          { test: /\.string$/, loader: 'html-loader'}
      ]
    },
    //配置别名
    resolve : {
        alias : {
            node_modules    : __dirname + '/node_modules',
            util            : __dirname + '/src/util',
            page            : __dirname + '/src/page',
            service         : __dirname + '/src/service',
            image           : __dirname + '/src/image'
        }
    },
    //插件
    plugins : [
        //独立通用模块到 js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        }),
        //把CSS单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),
        //html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
        new HtmlWebpackPlugin(getHtmlConfig('list','商品列表页')),
        new HtmlWebpackPlugin(getHtmlConfig('detail','商品详情页')),
        new HtmlWebpackPlugin(getHtmlConfig('cart','我的购物车')),
        new HtmlWebpackPlugin(getHtmlConfig('cart-center','购物车')),
        new HtmlWebpackPlugin(getHtmlConfig('order-confirm','订单确认页')),
        new HtmlWebpackPlugin(getHtmlConfig('order-list','订单列表页')),
        new HtmlWebpackPlugin(getHtmlConfig('order-detail','订单详情')),
        new HtmlWebpackPlugin(getHtmlConfig('payment','订单支付')),
        new HtmlWebpackPlugin(getHtmlConfig('user_login','用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register','用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset','找回密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center','个人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update','修改个人信息')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update','修改密码')),
        new HtmlWebpackPlugin(getHtmlConfig('result','操作结果')),
        new HtmlWebpackPlugin(getHtmlConfig('about','关于IBuy')),
        new HtmlWebpackPlugin(getHtmlConfig('address','收货地址')),
    ]
};

if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;

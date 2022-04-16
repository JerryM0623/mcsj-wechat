const MD5 = require('../../libs/crypto-js/md5');
const registerApis = require('../../apis/register.api');


Page({

    /**
     * 页面的初始数据
     */
    data: {
        username: '',
        password: '',
        passwordCheck: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    /**
     * 点击注册并且登录
     */
    registerAndLogin(){
        // 判断输入情况
        if(this.checkInput() === 'error1'){
            wx.showToast({
              title: '用户名长度为5-7之间',
              icon: 'none',
              
            })

            this.setData({
                username: '',
                password: '',
                passwordCheck: ''
            })

            return;
        }

        if(this.checkInput() === 'error2'){
            wx.showToast({
                title: '密码长度必须是6位及其以上',
                icon: 'none',
                
            })

            this.setData({
                password: '',
                passwordCheck: ''
            })

            return;
        }

        if(this.checkInput() === 'error3'){
            wx.showToast({
                title: '两次密码输入不一致',
                icon: 'none',
                
            })

            this.setData({
                passwordCheck: ''
            })

            return;
        }

        // 校验通过

        const hashPassword = MD5(this.data.password).toString();

        // 后台交互
        wx.request({
          url: registerApis.register,
          data: {
              username: this.data.username,
              hashPassword: hashPassword
          },
          method: 'POST',
          success(data){
            const { code, msg } = data.data;
            console.log(code);
            wx.showToast({
              title: msg,
              icon: code === 10004 || code === 10005 ? 'error' : 'success',
              success(){
                  // TODO: 实现登录
              }
            })
          },
          fail(error){
              console.log(error);
          }
        })
    },

    /**
     * 检查输入数据是否有误
     */
    checkInput(){

        const { username, password, passwordCheck } = this.data;

        if(username.trim().length < 5){
            return 'error1';
        }

        if(password.trim().length < 6){
            return 'error2';
        }

        if(passwordCheck !== password){
            return 'error3';
        }

        return 'pass';
    }
})
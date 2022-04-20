// pages/login/login.js
const MD5 = require('../../libs/crypto-js/md5');
const loginApis = require('../../apis/login.api');
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        username: '',
        password: ''
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
     * 跳转页面到注册
     */
    gotoRegister(){
        wx.navigateTo({
          url: '/pages/register/register',
        })
    },

    /**
     * 登录函数
     */
    login(){
        const { username, password } = this.data;

        // 验证
        if(username.trim().length < 5){
            wx.showToast({
              title: '用户名长度在5-7之间',
              icon: 'none'
            })
            return;
        }

        if(password.trim().length < 6){
            wx.showToast({
              title: '密码长度至少为6位',
              icon: 'none'
            })
            return;
        }

        // 验证通过
        const hashPassword = MD5(this.data.password).toString();

        // 发送请求
        wx.request({
          url: loginApis.login,
          data:{
              username: username,
              hashPassword: hashPassword
          },
          method: "POST",
          success(res){
              // 请求返回
              const { code, msg, data } = res.data;
              if(code !== 10009){
                  wx.showToast({
                    title: msg,
                    icon: 'none'
                  })
                  return;
              }
              // 建立缓存
              app.globalData.userinfo = data;
              wx.setStorage({
                  key: 'userinfo',
                  data: app.globalData.userinfo,
                  success(){
                      // 缓存建立成功，跳转用户信息页面，提示用户
                      wx.showToast({
                        title: '登录成功',
                        icon: 'none',
                        success(){
                          wx.switchTab({
                              url: '/pages/profile/profile',
                            })
                        }
                      })
                  }
              }) 
          },
          fail(){
              wx.showToast({
                title: '登录失败，请稍后重试',
                icon: 'none'
              })
          }
        })
    }
})
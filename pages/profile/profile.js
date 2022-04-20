// pages/profile/profile.js
const app = getApp();

Page({
    /**
     * 页面的初始数据
     */
    data: {
        // 用户信息对象
        userinfo: {
            username: '',
            userId: ''
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
      const {username, uuid} = app.globalData.userinfo;
      if (username !== ''){
        // 已经获取了登录信息
        this.setData({
          userinfo: {
            username: username,
            userId: uuid.substring(0, 8) + uuid.substring(9, 13)
          }
        })
      }
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
      console.log('hide');
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
      console.log('unload');
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
     * 前往登陆页面
     */
    gotoLogin(){
      wx.redirectTo({
        url: '/pages/login/login',
      })
    }
})
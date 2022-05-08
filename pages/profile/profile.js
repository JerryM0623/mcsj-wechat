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
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.autoLogin();
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.autoLogin();
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
     * 页面初次加载及隐藏后再次显示的自动登录函数
     */
    autoLogin(){
      const {username, uuid} = app.globalData.userinfo;
      if (username !== '' && username !== undefined){
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
     * 前往登陆页面
     */
    gotoLogin(){
      const list = [undefined, null, ''];
      console.log(list.indexOf(this.username));
      if(list.indexOf(this.username) !== -1){
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }
    },

    gotoLocations(){
      // 判断
      if(this.data.userinfo.username === ''){
        wx.showToast({
          title: '请先登录',
          icon: 'none'
        })
        return;
      }

      // 跳转
      wx.navigateTo({
        url: `/pages/locations/locations?id=${ app.globalData.userinfo.id }`,
      })
    },
    /**
     * 前往订单列表页面
     */
    gotoOrderList(){
        // 判断
        if(this.data.userinfo.username === ''){
            wx.showToast({
                title: '请先登录',
                icon: 'none'
            })
            return;
        }
        wx.navigateTo({
            url: `/pages/orderList/orderList?id=${ app.globalData.userinfo.id }`,
        })
    },
    /**
     * 前往退款订单页面
     */
    gotoRefundOrderList(){
        // 判断
        if(this.data.userinfo.username === ''){
            wx.showToast({
                title: '请先登录',
                icon: 'none'
            })
            return;
        }
        wx.navigateTo({
            url: `/pages/refundOrderList/refundOrderList?id=${ app.globalData.userinfo.id }`,
        })
    }
})
// pages/showLocationInfo/showLocationInfo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // 修改导航栏信息
        this.setNavigationBarTitle(options.type);
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },
    /**
     * 修改导航栏信息
     */
    setNavigationBarTitle(typeId){
        let pageTitle = '';
        if (typeId === '1') {
            pageTitle = '新增地址信息';
        } else {
            pageTitle = '修改地址信息';
        }
        // 修改导航栏标题
        wx.setNavigationBarTitle({
            title: pageTitle
        });
    }
})
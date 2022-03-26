const indexApis = require('../../apis/index.api');
const { showToastFail } = require('../../utils/showToast');

// pages/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        swiperList:[],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 获取 swiperList 并且更新到 data 中
        this.getSwiperList();
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

    // 获取 swiperList 方法
    getSwiperList: function(){
        wx.request({
            url: indexApis.getSwiperList,
            success: (response) => {
                this.setData({
                    swiperList: response.data.data
                })
            },
            fail: () => {
                showToastFail('数据获取失败');
            }
        })
    }
})
const indexApis = require('../../apis/index.api');
const { showToastFail } = require('../../utils/showToast');

// pages/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 轮播图列表
        swiperList: [],
        // 精彩推荐列表
        recommendList: [],
        // 页数
        pageNum: 1,
        // 每次查询的数量
        pageSize: 6,
        // 是否已获取全部的精彩推荐数据
        isAll: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 获取 swiperList 并且更新到 data 中
        this.getSwiperList();
        // 获取 recommendList 并且更新到 data 中
        this.getRecommendList();
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
        // 当没有加载所有数据的时候，请求后台
        if(!this.isAll){
            // 获取新的数据
            this.setData({
                pageNum: this.data.pageNum + 1
            })
            this.getRecommendList();
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    // 获取 swiperList 方法
    getSwiperList: function(){
        wx.request({
            url: indexApis.getSwiperListDev,
            success: (response) => {
                this.setData({
                    swiperList: response.data.data
                })
            },
            fail: () => {
                console.log(111);
            }
        })
    },

    // 加载精选推荐的方法(mock阶段)
    getRecommendList: function(){
        wx.request({
          url: indexApis.getRecommendListDev,
          data: {
              pageSize: this.data.pageSize,
              pageNum: this.data.pageNum
          },
          success: (response) => {
                this.setData({
                    recommendList: [...this.data.recommendList, ...response.data.data]
                })
          },
          fail: () => {
              console.log('error');
          }
        })
    }
})
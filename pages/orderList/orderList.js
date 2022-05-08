// pages/orderList/rList.js
const orderApis = require('../../apis/order.api');
const showToastUtil = require('../../utils/showToast');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userId: '',
        originDataList: [],
        reverseDataList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        if (options.id !== undefined && options.id !== null && options.id !== ''){
            this.setData({
                userId: options.id
            })
            // 获取数据
            this.getOrderList(options.id);
        }
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
     * 获取 orderList
     * @param userId
     */
    getOrderList(userId){
        const self = this;
        wx.request({
            url: orderApis.getOrderList,
            data: { userId },
            method: 'GET',
            success: (res) => {
                const data = res.data;
                if (data.code !== 10045){
                    showToastUtil.showToastNoIcon(data.msg);
                }else {
                    const originDataList = [...data.data];
                    const reverseDataList = data.data.reverse();
                    self.setData({
                        originDataList,
                        reverseDataList
                    })
                }
            },
            fail: () => {
                showToastUtil.showToastFail('无法获取数据');
            }
        })
    }
})
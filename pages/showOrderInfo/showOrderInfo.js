// pages/showOrderInfo/showOrderInfo.js
const orderApis = require('../../apis/order.api');
const showToastUtil = require('../../utils/showToast');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        productImgUrl: '',
        productName: '',
        buyNumber: '',
        buyPrice: '',
        locationName: '',
        locationPhone: '',
        location: '',
        status: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const { orderId } = options;
        if (orderId !== undefined && orderId !== null && orderId !== ''){
            this.getOrderDetailInfo(orderId);
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
     * 获取详细的订单详情
     * @param orderId
     */
    getOrderDetailInfo(orderId){
        const self = this;
        wx.request({
            url: orderApis.getOrderDetailInfo,
            data: { orderId },
            method: 'GET',
            success: (res) => {
                const data = res.data;
                if (data.code !== 10048){
                    showToastUtil.showToastNoIcon(data.msg);
                }else{
                    self.setData({
                        productImgUrl: data.data.productImgUrl,
                        productName: data.data.productName,
                        buyNumber: data.data.buyNumber,
                        buyPrice: data.data.buyPrice,
                        locationName: data.data.locationName,
                        locationPhone: data.data.locationPhone,
                        location: data.data.location,
                        status: data.data.status
                    })
                }
            },
            fail: () => {
                showToastUtil.showToastFail('数据获取失败')
            }
        })
    }
})
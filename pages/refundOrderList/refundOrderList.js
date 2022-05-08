// pages/refundOrderList/OrderList.js
const orderApis = require('../../apis/order.api');
const showToastUtil = require('../../utils/showToast');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userId: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const userId = options.id;
        if (userId !== undefined && userId !== null && userId !== ''){
            this.setData({
                userId
            })
            this.getRefundOrderList(userId);
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
     * 获取申请退款/退款成功/退款失败的订单信息
     * @param userId
     */
    getRefundOrderList(userId){
        wx.request({
            url: orderApis.getRefundOrderList,
            data: { userId },
            method: 'GET',
            success: (res) => {
                const data = res.data;
                if (data.code !== 10060){
                    showToastUtil.showToastNoIcon(data.msg);
                }else{
                    const originDataList = [...data.data];
                    const reverseDataList = data.data.reverse();
                    this.setData({
                        originDataList,
                        reverseDataList
                    })
                }
            },
            fail: () => {
                showToastUtil.showToastFail('获取数据失败');
            }
        })
    },
    /**
     * 前往订单详细页面
     */
    gotoOrderInfo(event){
        const { orderId } = event.currentTarget.dataset;
        if (orderId !== undefined && orderId !== null && orderId !== ''){
            wx.navigateTo({
                url: '/pages/showOrderInfo/showOrderInfo?orderId='+orderId
            })
        }
    },
    /**
     * 删除订单记录
     */
    deleteOrder(event){
        const self = this;
        wx.showModal({
            title: '警告',
            content: '你确定要删除这条订单记录吗?',
            confirmColor: '#cb141d',
            success (res) {
                if (res.confirm) {
                    const { orderId } = event.currentTarget.dataset;
                    if (orderId === undefined || orderId === null || orderId === ''){
                        showToastUtil.showToastFail('参数错误');
                    }else{
                        // 发送请求更新状态
                        wx.request({
                            url: orderApis.deleteOrder,
                            data: { orderId },
                            method: 'POST',
                            success: (res) => {
                                const data = res.data;
                                if (data.code !== 10057){
                                    showToastUtil.showToastNoIcon(data.msg);
                                }else{
                                    showToastUtil.showToastNoIcon(data.msg);
                                    setTimeout(() => {
                                        self.getOrderList(self.data.userId);
                                    }, 1000)
                                }
                            },
                            fail: () => {
                                showToastUtil.showToastFail('操作失败');
                            },
                        })
                    }
                }
            }
        })
    }
})
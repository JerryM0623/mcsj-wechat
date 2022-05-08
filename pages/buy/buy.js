// pages/order/order.js
const showToastUril = require('../..//utils/showToast');
const productApis = require('../..//apis/product.api');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        locationId: '',
        location: '',
        name: '',
        phone: '',

        productId: '',
        productUuid: '',
        productName: '',
        productPrice: '',
        productImgUrl: '',
        productNumber: '1',

        totalPrice: '',
        userId: '-1',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const userId = wx.getStorageSync('userinfo').id;
        const productUuid = options.uuid;
        if (productUuid === undefined || productUuid === null || productUuid.trim().length === 0){
            showToastUril.showToastFail('参数错误');
        }else{
            this.setData({
                userId,
                productUuid
            });
            // 请求商品信息
            this.getProductInfo(productUuid);
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
     * 根据uuid请求商品信息
     */
    getProductInfo(uuid){
        wx.request({
            url: productApis.getInfomation,
            data: {uuid},
            method: 'GET',
            success: (res) => {
                const data = res.data;
                if (data.code !== 10029){
                    showToastUril.showToastNoIcon(data.msg);
                }else{
                    this.setData({
                        productId: data.data.id,
                        productName: data.data.name,
                        productPrice: data.data.sale_price,
                        productImgUrl: data.data.img_url,
                        totalPrice: data.data.sale_price
                    })
                }
            },
            fail: () => {
                showToastUril.showToastNoIcon('系统错误,请稍后重试 ');
            }
        })
    },
    /**
     * 计算总价格
     */
    calculateTotalPrice(){
        if (this.data.productNumber !== ''){
            if(Number(this.data.productNumber) < 1){
                this.setData({
                    productNumber: 1
                });
                showToastUril.showToastNoIcon('请输入大于等于1的数字');
            }else{
                const totlaPrice = Number(this.data.productNumber) * Number(this.data.productPrice);
                // 四舍五入
                const result = (Math.round((totlaPrice * 100).toFixed(1)) / 100).toFixed(2);
                this.setData({
                    totalPrice: result
                })
            }
        }
    }
})
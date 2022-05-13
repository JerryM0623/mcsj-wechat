// pages/order/order.js
const showToastUril = require('../..//utils/showToast');
const productApis = require('../..//apis/product.api');
const orderApis = require('../../apis/order.api');

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
        userId: '',

        orderId: '',
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
                    productNumber: 1,
                    totalPrice: this.data.productPrice
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
    },
    /**
     * 选择/切换收货地址
     */
    chooseLocation(){
        wx.navigateTo({
            url: '/pages/locations/locations?type=choose&id='+this.data.userId,
            events: {
                selectLocationItem: (obj) => {
                    const { id, name, phone, location } = obj;
                    this.setData({
                        location,
                        locationId: id,
                        name,
                        phone
                    })
                }
            }
        })
    },
    /**
     * 去付款按钮
     */
    gotoPay(){
        const self = this;
        // 验证收货地址
        if (this.data.locationId === '' || this.data.location === '' ||
            this.data.name === '' || this.data.phone === ''){
            showToastUril.showToastFail('请选择收货地址');
            return;
        }
        // 验证商品信息
        // 验证价格信息等
        if (this.data.productId === '' || this.data.productUuid === '' || this.data.productName === '' ||
            this.data.productPrice === '' || this.data.productImgUrl === '' || this.data.productNumber === '' ||
            this.totalPrice === '' || this.data.userId === ''){
            showToastUril.showToastFail('参数错误');
            return;
        }
        // 创建订单
        wx.request({
            url: orderApis.createOrder,
            data: {
                userId: this.data.userId,
                locationName: this.data.name,
                locationPhone: this.data.phone,
                location: this.data.location,
                productId: this.data.productId,
                buyNumber: this.data.productNumber,
                buyPrice: this.data.totalPrice
            },
            method: 'POST',
            success: (res) => {
                const data = res.data;
                if (data.code !== 10039){
                    showToastUril.showToastNoIcon(data.msg);
                }else{
                    self.setData({
                        orderId: data.data
                    })
                    // 开启付款按钮
                    wx.showModal({
                        title: '提示',
                        content: '订单已创建成功,是否立刻支付'+self.data.totalPrice+'元',
                        confirmText: '立刻支付',
                        confirmColor: '#ff0000',
                        cancelText: '稍后支付',
                        success: (res) => {
                            if (res.confirm) {
                                // 模拟支付完成,修改订单状态为已付款
                                self.changeOrderStatusToPaid();
                            }
                        }
                    })
                }
            },
            fail: () => {
                showToastUril.showToastNoIcon('系统错误,请稍后再试!');
            }
        })
    },
    /**
     * 修改订单状态为已支付
     */
    changeOrderStatusToPaid(){
        wx.request({
            url: orderApis.changeOrderStatusToPaid,
            data: { orderId: this.data.orderId },
            method: 'post',
            success: (res) => {
                const data = res.data;
                if (data.code !== 10042){
                    showToastUril.showToastNoIcon(data.msg);
                }else{
                    showToastUril.showToastSuccess('支付成功');
                    setTimeout(() => {
                        wx.navigateBack();
                    }, 1000)
                }
            },
            fail: () => {
                showToastUril.showToastFail('支付失败');
            }
        })
    }
})
// pages/showProductInfo/showProductInfo.js
const productApis = require('../../apis/product.api');
const showToastUtil = require('../../utils/showToast');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        uuid: '',
        imgUrl: '',
        salePrice: '',
        originPrice: '',
        name: '',
        commentOneList: [],
        commentTwoList: [],
        commentThreeList: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        if (options.uuid !== undefined && options.uuid !== null && options.uuid.trim().length > 0){
            this.setData({
                uuid: options.uuid
            });
            // 获取数据
            this.getProductInfo(options.uuid);
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
     * 获取商品数据
     */
    getProductInfo(uuid){
        const self = this;
        wx.request({
            url: productApis.getInfomation,
            data: { uuid },
            method: 'GET',
            success: (res) => {
                const data = res.data;
                if (data.code !== 10029){
                    showToastUtil.showToastNoIcon(data.msg);
                }else{
                    let commentOneList = data.data.comment_1.split('|');
                    let commentTwoList = data.data.comment_2.split('|');
                    let commentThreeList = data.data.comment_3.split('|');

                    this.setData({
                        imgUrl: data.data.img_url,
                        salePrice: data.data.sale_price,
                        originPrice: data.data.origin_price,
                        name: data.data.name,
                        commentOneList,
                        commentTwoList,
                        commentThreeList
                    })
                }
            },
            fail: (error) => {
                console.log(error);
            }
        })
    },
    /**
     * 前往下单界面
     */
    gotoOrder(){
        // 验证账号是否登录
        const userinfo = wx.getStorageSync('userinfo');
        if (userinfo === null || userinfo === undefined || userinfo === ''){
            showToastUtil.showToastNoIcon('请登陆账号');
            setTimeout(() => {
                wx.navigateTo({
                    url: '/pages/login/login?type=back'
                })
            }, 1000)
        }else{
            wx.navigateTo({
                url: '/pages/buy/buy?uuid='+this.data.uuid
            })
        }
    }
})
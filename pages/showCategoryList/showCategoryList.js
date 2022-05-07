// pages/showCategoryList/showCategoryList.js
const categoryApis = require('../../apis/category.api');
const showToastUtil = require('../../utils/showToast');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        productList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const { seriesId, typeId, typeName } = options;
        wx.setNavigationBarTitle({
            title: `${ typeName }类商品列表`
        });
        this.getSeriesTypeProductInfo(seriesId, typeId);
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
     * 获得当前系列id和类别id下已上架的所有商品信息
     */
    getSeriesTypeProductInfo(seriesId, typeId){
        const self = this;

        if (seriesId === undefined || seriesId === null || seriesId === '' || typeId === undefined || typeId === null || typeId === ''){
            showToastUtil.showToastNoIcon('系统错误，请刷新重试');
            return;
        }
        wx.request({
            url: categoryApis.getSeriesTypeProductInfo,
            data: {seriesId, typeId},
            method: 'GET',
            success: (res) => {
                const data = res.data;
                if (data.code !== 10036){
                    showToastUtil.showToastNoIcon(data.msg);
                }else{
                    if(data.data.length === 0){
                        showToastUtil.showToastNoIcon('暂无商品数据');
                    }else{
                        self.setData({
                            productList: data.data
                        })
                    }
                }
            },
            fail: () => {
                showToastUtil.showToastNoIcon('系统错误，请重试');
            }
        })
    },
    /**
     * 前往商品详情页面
     */
    gotoProductInfo(event){
        const { uuid } = event.currentTarget.dataset;
        wx.navigateTo({
            url: '/pages/showProductInfo/showProductInfo?uuid='+uuid
        })
    }
})
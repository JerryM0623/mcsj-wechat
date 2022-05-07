// pages/category/category.js
const categaryApis = require('../../apis/category.api');
const showToastUtil = require('../../utils/showToast');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        seriesAndTypesList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.seriesRes = null;
        this.typesRes = null;
        this.getSeries();
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
    /**
     * 获取全部系列
     */
    getSeries(){
        const self = this;
        wx.request({
            url: categaryApis.getSeries,
            method: 'GET',
            success:(res) => {
                const data = res.data;
                if (data.code === 10030){
                    showToastUtil.showToastNoIcon(data.msg);
                }else{
                    self.seriesRes = data.data;
                    // 获取类别
                    self.getTypes();
                }
            },
            fail:() => {
                showToastUtil.showToastNoIcon('获取数据失败，请稍后重试！');
            }
        })
    },
    /**
     * 获取全部类别
     */
    getTypes(){
        const self = this;
        wx.request({
            url: categaryApis.getTypes,
            method: 'GET',
            success: (res) => {
                const data = res.data;
                if (data.code === 10032){
                    showToastUtil.showToastNoIcon(data.msg);
                }else{
                    self.typesRes = data.data;
                    // 拼接数据
                    self.dataTidy();
                }
            },
            fail: () => {
                showToastUtil.showToastNoIcon('获取数据失败，请稍后重试！');
            }
        })
    },
    /**
     * 拼接数据并更新数据
     */
    dataTidy(){
        // 验证数据
        const seriesData = this.seriesRes;
        const typesData = this.typesRes;
        if(seriesData.length === 0 || typesData.length === 0){
            showToastUtil.showToastFail('数据错误！');
            return;
        }
        // 开始编辑数据
        /*
        * [
        *   ['们系列', [
        *       {1},
        *       {2},
        *       {3},
        *       ...
        *   ]],
        *   ['窗系列', [
        *       {1},
        *       {2},
        *       {3},
        *       ...
        *   ]]
        * ]
        */
        let seriesAndTypesArr = [];
        for (let i = 0; i < seriesData.length; i++){
            let innerArr = [];
            let outterArr = [];
            for (let j = 0; j < typesData.length; j++){
                if(typesData[j].seriesId === seriesData[i].id){
                    innerArr.push(typesData[j]);
                }
            }
            outterArr.push(seriesData[i].name);
            outterArr.push(innerArr);
            seriesAndTypesArr.push(outterArr);
        }
        this.setData({
            seriesAndTypesList: seriesAndTypesArr
        })
    },
    /**
     * 前往类别商品列表页
     */
    gotoShowCategoryList(event){
        const {seriesId, typeId, typeName} = event.currentTarget.dataset;
        wx.navigateTo({
            url: `/pages/showCategoryList/showCategoryList?seriesId=${ seriesId }&typeId=${ typeId }&typeName=${ typeName }`
        })
    }
})
// pages/showLocationInfo/showLocationInfo.js
const locationApis = require('../../apis/locations.api');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        name: '',
        phone: '',
        location: '',
        type: '-1',
        userId: '-1'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(options);
        this.setData({
            type: options.type,
            userId: options.userId
        });
        // 修改导航栏信息
        this.setNavigationBarTitle(options.type);
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
     * 修改导航栏信息
     */
    setNavigationBarTitle(typeId) {
        let pageTitle = '';
        if (typeId === '1') {
            pageTitle = '新增地址信息';
        } else {
            pageTitle = '修改地址信息';
        }
        // 修改导航栏标题
        wx.setNavigationBarTitle({
            title: pageTitle
        });
    },
    /**
     * 添加新的地址信息
     */
    addLocationInfo() {
        // 验证
        const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
        if(this.data.name.trim().length === 0 || this.data.location.trim().length === 0){
            wx.showToast({
               title: '内容不可为空！',
               icon: 'none'
            });
            return;
        }
        if (!new RegExp(reg).test(this.data.phone.trim()) || this.data.phone.trim().length !== 11){
            wx.showToast({
                title: '请输入正确的11位电话号码！',
                icon: 'none'
            });
            return;
        }
        // 发送
        console.log('数据验证通过，可以全给后端');
        const { userId, name, phone, location } = this.data;
        wx.request({
            url: locationApis.addNewLocation,
            data: { userId, name, phone, location },
            method: 'POST',
            success(res){
                console.log('请求已收到');
                const data = res.data;
                wx.showToast({
                    title: data.msg,
                    icon: 'none',

                    success(){
                        setTimeout(function (){wx.navigateBack()}, 1000);
                    }
                });
            },
            fail(){
                wx.showToast({
                    title: '添加失败，请稍后重试',
                    icon: 'none'
                })
            },
        })
    },
    /**
     * 保存地址信息的修改内容
     */
    saveLocationEdit() {

    }
})
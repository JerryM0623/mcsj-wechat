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
        userId: '-1',
        itemId: '-1',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(options);
        this.setData({
            type: options.type,
            userId: options.userId,
            itemId: options.itemId ? options.itemId : '-1'
        });
        // 修改导航栏信息
        this.setNavigationBarTitle(options.type);
        if(options.type === '2'){
            // 获取单个地址的信息并展示
            this.getLocationInfoById();
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
        if (this.checkForm()){
            // 发送
            const { userId, name, phone, location } = this.data;
            wx.request({
                url: locationApis.addNewLocation,
                data: { userId, name, phone, location },
                method: 'POST',
                success(res){
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
        }
    },
    /**
     * 保存地址信息的修改内容
     */
    saveLocationEdit() {
        if (this.checkForm()){
            // 发送请求
            wx.request({
                url: locationApis.editLocationByLocationId,
                data: {
                    itemId: this.data.itemId,
                    name: this.data.name,
                    phone: this.data.phone,
                    location: this.data.location
                },
                method: 'POST',
                success: (res) => {
                    const data = res.data;
                    wx.showToast({
                        title: data.msg,
                        icon: 'none',
                        success: () => {
                            setTimeout(() => {
                                wx.navigateBack()
                            }, 1000)
                        }
                    })
                },
                fail: () => {
                    wx.showToast({
                        title: '修改失败，请重试!',
                        icon: 'none'
                    })
                }
            })
        }
    },
    /**
     * 获取id为x的地址详细信息
     */
    getLocationInfoById(){
        const itemId = this.data.itemId;
        if (itemId === '-1'){
            wx.showToast({
                title: '无法获取地址信息，请重试',
                icon: 'none'
            });
            return;
        }
        wx.request({
            url: locationApis.getLocationByLocationId,
            data: { itemId },
            method: 'GET',
            success: (res) => {
                const data = res.data;
                if (data.code !== 10017){
                    wx.showToast({
                        title: data.msg,
                        icon: 'none'
                    });
                    return;
                }else{
                    this.setData({
                        name: data.data[0].name,
                        phone: data.data[0].phone,
                        location: data.data[0].location
                    })
                }

            },
            fail(){
                wx.showToast({
                    title: '数据获取失败，请重试',
                    icon: 'none'
                })
            }
        })

    },
    /**
     * 校验表单数据
     */
    checkForm(){
        // 验证
        const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
        if(this.data.name.trim().length === 0 || this.data.location.trim().length === 0){
            wx.showToast({
                title: '内容不可为空！',
                icon: 'none'
            });
            return false;
        }
        if (!new RegExp(reg).test(this.data.phone.trim()) || this.data.phone.trim().length !== 11){
            wx.showToast({
                title: '请输入正确的11位电话号码！',
                icon: 'none'
            });
            return false;
        }
        return true;
    }
})
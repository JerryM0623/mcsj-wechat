const locationsApis = require('../../apis/locations.api');

// pages/locations/locations.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        type: 'check', // 从profile进入的话就是 check 从 buy进入就会被改成 choose
        id: -1, // 存储当前页面展示的用户的id
        locationsList: [],
        editLocationsList: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            id: options.id
        })
        // 获取数据
        this.getLocations();
        if (options.type === 'choose'){
            this.setData({
                type: options.type
            })
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
        this.getLocations();
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
     * 获取后台的地址数据
     */
    getLocations() {
        wx.request({
            url: locationsApis.getLocationsById,
            data: {
                id: this.data.id
            },
            success: (res) => {
                const data = res.data.data;
                this.setData({
                    locationsList: data
                });
                this.editLocationsInfo();
            },
            error: () => {
                wx.showToast({
                    title: '获取数据失败',
                    icon: none
                })
            }
        })
    },

    /**
     * 修改已经获得的数据
     */
    editLocationsInfo() {
        let locationsList = this.data.locationsList;
        locationsList.forEach(item => {
            const firstThreeNumber = item.phone.substring(0, 3);
            const lastFourNumber = item.phone.substring(7);
            item.phone = firstThreeNumber + '****' + lastFourNumber;
        })
        this.setData({
            editLocationsList: locationsList
        })
    },

    /**
     * 前往添加页面
     */
    addLocation() {
        wx.navigateTo({
            url: '/pages/showLocationInfo/showLocationInfo?type=1&userId=' + this.data.id,
        })
    },
    /**
     * 前往修改界面
     */
    editLocation(event){
        const itemId = event.target.dataset.itemId;
        wx.navigateTo({
            url: '/pages/showLocationInfo/showLocationInfo?type=2&userId=' + this.data.id + '&itemId=' + itemId,
        })
    },
    /**
     * 删除某一条地址信息
     */
    deleteLocation(event){
        const self = this;
        wx.showModal({
            title: '警告',
            content: '你确定要删除这个地址信息？',
            confirmColor: '#ff0000',
            success (res) {
                if (res.confirm) {
                    // 发送请求
                    wx.request({
                        url: locationsApis.deleteLocationByLocationId,
                        data: { itemId: event.target.dataset.itemId },
                        method: 'POST',
                        success: (res) => {
                            const data = res.data;
                            console.log(data);
                            wx.showToast({
                                title: data.msg,
                                icon: 'none',
                                success: () => {
                                    self.getLocations();
                                }
                            })
                        },
                        fail: () => {
                            wx.showToast({
                                title: '删除失败，请重试',
                                icon: 'none'
                            })
                        },
                    })
                }
            }
        })
    },
    /**
     * 选中地址
     */
    selectLocationItem(event){
        if (this.data.type !== 'choose'){
            return;
        }
        const eventChannel = this.getOpenerEventChannel();
        eventChannel.emit('selectLocationItem', event.currentTarget.dataset)
        wx.navigateBack();
    }
})
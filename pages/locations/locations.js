const locationsApis = require('../../apis/locations.api');

// pages/locations/locations.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
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
	editLocationsInfo(){
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
	addLocation(){
		wx.navigateTo({
		  url: '/pages/showLocationInfo/showLocationInfo?type=1',
		})
	}
})
// app.js
App({
    globalData:{
        userinfo: {
            username: '',
            uuid: '',
            token: ''
        }
    },
    onLaunch(){
      const userinfo = wx.getStorageSync('userinfo');
      if(userinfo !== null ||userinfo !== undefined || userinfo !== ''){
          this.globalData.userinfo = {
            username: userinfo.username,
            uuid: userinfo.uuid,
            token: userinfo.token
          }
      }
    }
})

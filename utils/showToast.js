const showToastSuccess = function(title){
    wx.showToast({
      title,
      icon: 'success'
    })
}

const showToastFail = function(title){
    wx.showToast({
      title,
      icon: "error"
    })
}

const showToastLoading = function(title){
    wx.showToast({
      title,
      icon: "loading"
    })
}

module.exports = {
    showToastSuccess,
    showToastLoading,
    showToastFail
}
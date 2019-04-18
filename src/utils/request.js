const IP = 'https://game.cqcetlab.com/computercultrue/'
const ajax = function (url, method, data, token = '') {
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: '加载中' // 数据请求前loading
    })
    wx.request({
      url: IP + url,
      method,
      data,
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'X-TOKEN': token
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 0) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        } else {
          resolve(res.data)
        }
      },
      fail (err) {
        console.log(err)
        wx.hideLoading()
        wx.showToast({
          title: '登陆失败，请稍后再试',
          icon: 'none',
          duration: 2000
        })
        reject(err)
      }
    })
  })
}
export default ajax

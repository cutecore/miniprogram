// app.js
//import md5 from "./utils/Mmd5";
App({
  showModal: function (t, e) {
    wx.showModal({
      title: t,
      content: e,
      showCancel: !1,
      cancelColor: "#000000",
      confirmColor: "#2e5aff",
      confirmText: "确定"
    });
  },
  onLaunch() {
    wx.login({
      success(res){
        console.log('wx.login 获取到code,发送到后端获取open_id,生成token,存储token。code:',res.code)
        //模拟一个token
       // let temp = md5.Mmd5().hex_md5(new Date().toLocaleString() + 'cutec.47')
        const token = 'token:cutec:' + '22'
        wx.setStorage({
          data: token,
          key: 'token',
        })
        const user = JSON.parse('{"uid":"001"}')
        wx.setStorage({
          data: user,
          key: 'user',
        })
      },
    })
  },
  globalData: {
    user: null,
    sk: null,
    userInfo: null,
    token: null,
    systemInfo: null,
  }
})

// app.js
//import md5 from "./utils/Mmd5";
App({

	globalData: {
		token: null,
		systemInfo: null,
		// server: 'http://127.0.0.1:81',
		server: 'https://www.switch-game-slack.top'
	},

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

	userlogin(){
		let _this = this
		wx.login({
			success(res) {
				wx.request({
					url: _this.globalData.server + '/login',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: {
						code: res.code
					},
					success(resp) {		
						wx.setStorage({
							data: resp.data,
							key: 'token',
						})
						_this.globalData.token = resp.data
					}
				})
			},
		})
	},
	onLaunch() {
		this.userlogin()
	}
	
})
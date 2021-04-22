// pages/mine/mine.js
// categoryTranslateMap.put("Music","音乐");


Page({

    /**
     * 页面的初始数据
     */
    data: {
        index_game_list: [],
        start: 0,
        limit: 15,
    },

    tap_game(e){
        let id = e.currentTarget.dataset.id
        wx.navigateTo({
          url: '/pages/switch/switch?id='+ id,
        })
        // let token = wx.getStorageSync('token')
        // let _this = this
        // let url = getApp().globalData.server + "/game-opt/hit/" + id;
        // wx.request({
        //     url: url,
        //     method: 'POST',
        //     header: {
        //         auth: token
        //     },
        //     success(res) {
        //         if (601 == res.statusCode) {
        //             getApp().userlogin()
        //         }

        //         if (200 == res.statusCode) {
        //             _this.setData({
        //                 index_game_list: res.data
        //             })
        //         }
        //     }
        // })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
    
        let token = wx.getStorageSync('token')
        let start = this.data.start
        let limit = this.data.limit
        let _this = this
        
        let url = getApp().globalData.server + "/index/sales/" + start + "/" + limit;
        wx.request({
            url: url,
            method: 'GET',
            header: {
                auth: token
            },
            success(res) {
                if (601 == res.statusCode) {
                    getApp().userlogin()
                }

                if (200 == res.statusCode) {
                    _this.setData({
                        index_game_list: res.data
                    })
                }
            }
        })


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

        let _old = this.data.index_game_list
        let type = this.data.check_tap
        let token = wx.getStorageSync('token')
        let limit = this.data.limit
        let start = this.data.start + limit
        this.setData({
            start
        })
        let _this = this
        // /index/{type}/{start}/{limit}
        let url = getApp().globalData.server + "/index/sales/" + start + "/" + limit;
        wx.request({
            url: url,
            method: 'GET',
            header: {
                auth: token
            },
            success(res) {
                if (601 == res.statusCode) {
                    getApp().userlogin()
                }
                if (200 == res.statusCode) {
                    let _new = _old.concat(res.data)
                    _this.setData({
                        index_game_list: _new
                    })
                }
            }
        })

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
// pages/switch/switch.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id:NaN,
        game:{},
        Hei:'500rpx'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options);
        this.setData({id:options.id})
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

        let id = this.data.id
        let token = wx.getStorageSync('token')
        let _this = this
        let url = getApp().globalData.server + "/game/" + id;
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

                    let game = res.data
                    game.gallery = game.gallery.replace(/,http/g,';http').split(';')

                    _this.setData({
                        game:game
                    })
                }
            }
        })

    },
    love(e){
        let game = this.data.game 
        game.userLike = !game.userLike 
        this.setData({
            game
        })

        let id = this.data.id
        let token = wx.getStorageSync('token')
        let _this = this
        let url = getApp().globalData.server + "/game-opt/like/" + id;
        wx.request({
            url: url,
            method: 'POST',
            header: {
                auth: token
            },
            success(res) {
                if (601 == res.statusCode) {
                    getApp().userlogin()
                }

                if (200 == res.statusCode) {

                    let game = res.data
                    game.gallery = game.gallery.replace(/,http/g,';http').split(';')

                    _this.setData({
                        game:game
                    })
                }
            }
        })

    },
    dislove(e){
        let game = this.data.game 
        game.userLike = !game.userLike 
        this.setData({
            game
        })

        let id = this.data.id
        let token = wx.getStorageSync('token')
        let _this = this
        let url = getApp().globalData.server + "/game-opt/dislike/" + id;
        wx.request({
            url: url,
            method: 'POST',
            header: {
                auth: token
            },
            success(res) {
                if (601 == res.statusCode) {
                    getApp().userlogin()
                }

                if (200 == res.statusCode) {

                    let game = res.data
                    game.gallery = game.gallery.replace(/,http/g,';http').split(';')

                    _this.setData({
                        game:game
                    })
                }
            }
        })
    },
    mark(e){
        let game = this.data.game 
        game.userMark = !game.userMark 
        this.setData({
            game
        })
    },
    dismark(e){
        let game = this.data.game 
        game.userMark = !game.userMark 
        this.setData({
            game
        })
    },
    have(e){
        let game = this.data.game 
        game.userHave = !game.userHave
        this.setData({
            game
        })
    },
    dishave(e){
        let game = this.data.game 
        game.userHave = !game.userHave
        this.setData({
            game
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
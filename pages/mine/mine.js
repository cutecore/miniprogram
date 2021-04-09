// pages/mine/mine.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        index: 1,
        hasUserInfo: false,
        userInfo: null,
        gameUserLike: []
    },
    bindgetuserinfo: function name(e) {
        // 请求 获取用户信息 授权
        if ("getUserInfo:ok" === e.detail.errMsg) {
            wx.setStorage({
                data: e.detail.userInfo,
                key: 'userInfo',
            })
        } else {
            //用户拒绝了 获取用户信息 授权
            getApp().showModal('...', '授权才能正常使用')
        }

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

    getUserLike(){
        let _this = this
        let token = wx.getStorageSync('token')

        let url = getApp().globalData.server +    '/user';

        wx.request({
            url:  url,
            method: 'GET',
            header: {
                auth: token
            },
            success(res) {
                if (601 == res.statusCode) {
                    getApp().userlogin()
                }

                if (200 == res.statusCode) {
                    console.log(res)
                    let likeGames = res.data.likeGames
                    if(likeGames){
                        let array = []
                        for (const game of likeGames) {
                            array.push({'id':game.id, 'title':game.title})
                        }
                        _this.setData({
                            gameUserLike: array
                        })
                    }
                }
            }
        })
    },
    onShow: function () {

        this.getUserLike()

        let _this = this
        wx.getSetting({
            success(res) {
                if (!res.authSetting['scope.userInfo']) {

                } else {
                    wx.getUserInfo({
                        lang: "zh_CN",
                        success(res) {
                            wx.setStorage({
                                data: res.userInfo,
                                key: 'userInfo',
                            })
                            _this.setData({
                                'hasUserInfo': true,
                                'userInfo': res.userInfo
                            })
                        }
                    })
                }
            }
        })


    },

    removeReq(gameId){

        let _this = this
        let token = wx.getStorageSync('token')

        let url = getApp().globalData.server +    '/dislike/' + gameId;

        wx.request({
            url:  url,
            method: 'POST',
            header: {
                auth: token
            },
            success(res) {
                if (601 == res.statusCode) {
                    getApp().userlogin()
                }

                if (200 == res.statusCode) {
                    console.log(res)
                   
                }
            }
        })

    },


    remove(e) {
        
        let id = e.target.dataset.id;

        this.removeReq(id)
        
        let gameUserLike = this.data.gameUserLike

        let _gameUserLike = gameUserLike.filter(t => t.id != id)

        
        this.setData({
            'gameUserLike': _gameUserLike
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
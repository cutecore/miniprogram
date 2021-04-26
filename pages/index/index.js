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
        categorys:[
            {'color':'#9BD4B2',type:"Role-Playing",name:"角色扮演"},
            {'color':'#9BD4B2',type:"Sports",name:"体育"},  
            {'color':'#2C4553',type:"Adventure",name:"冒险"},
            {'color':'#B5C228',type:"Indie",name:"独立"},
            {'color':'#738AF2',type:"Fighting",name:"格斗"},
            {'color':'#42406E',type:"Shooter",name:"射击"},
            {'color':'#AC2BE0',type:"Action",name:"动作"},
            {'color':'#9BD4B2',type:"First-Person",name:"第一人称"},
            {'color':'#9BD4B2',type:"Party",name:"聚会"},
            {'color':'#9BD4B2',type:"Multiplayer",name:"多人游戏"},
            {'color':'#9BD4B2',type:"Racing",name:"赛车"}
            ],
        click: '',
        test:1
    },
    tapCategory(e){
        console.log(e)
        let category = e.currentTarget.dataset.id
        let token = wx.getStorageSync('token')
        let start = this.data.start
        let limit = this.data.limit
        let _this = this

        this.setData({
            start:0,
            click:category
        })
        
        let url = getApp().globalData.server + "/index/sales/" + category + "/" + start + "/" + limit;
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
        let start = 0
        let limit = this.data.limit
        let _this = this

        this.setData({
            start:0,
            click:'Role-Playing'
        })

        
        let url = getApp().globalData.server + "/index/sales/Role-Playing/" + start + "/" + limit;
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
        let category = this.data.click
        let token = wx.getStorageSync('token')
        let limit = this.data.limit
        let start = this.data.start + limit
        this.setData({
            start
        })
        let _this = this
        // /index/{type}/{start}/{limit}
        let url = getApp().globalData.server + "/index/sales/" + category + "/" + start + "/" + limit;
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
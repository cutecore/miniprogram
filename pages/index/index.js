// pages/mine/mine.js
// categoryTranslateMap.put("Music","音乐");


Page({

    /**
     * 页面的初始数据
     */
    data: {
        input: "",
        categorys: [{
                'color': '#9BD4B2',
                type: "Role-Playing",
                name: "角色扮演"
            },
            {
                'color': '#9BD4B2',
                type: "Sports",
                name: "体育"
            },
            {
                'color': '#2C4553',
                type: "Adventure",
                name: "冒险"
            },
            {
                'color': '#B5C228',
                type: "Indie",
                name: "独立"
            },
            {
                'color': '#738AF2',
                type: "Fighting",
                name: "格斗"
            },
            {
                'color': '#42406E',
                type: "Shooter",
                name: "射击"
            },
            {
                'color': '#AC2BE0',
                type: "Action",
                name: "动作"
            },
            {
                'color': '#9BD4B2',
                type: "First-Person",
                name: "第一人称"
            },
            {
                'color': '#9BD4B2',
                type: "Party",
                name: "聚会"
            },
            {
                'color': '#9BD4B2',
                type: "Multiplayer",
                name: "多人游戏"
            },
            {
                'color': '#9BD4B2',
                type: "Racing",
                name: "赛车"
            }
        ],
        order: [{
            id: 1,
            name: '价格'
        }, {
            id: 2,
            name: '评价'
        },{
            id: 3,
            name: '标题'
        }],

        index_tab: [{
                name: "热门",
                type: "hot",
                color: "#86E3CE"
            },
            {
                name: "好评",
                type: "rate",
                color: "#D0E6A5"
            },
            {
                name: "打折",
                type: "sales",
                color: "#FFDD94"
            }
        ],
        check_order: "sales",
        check_tap: 'hot',
        index_game_list: [],
        start: 0,
        limit: 15,
        showTab: true,
        focus:""
    },
    input(e){
        let input = e.detail.value
        this.setData({
            input
        })
    },
    search(){
        let input = this.data.input
        let token = wx.getStorageSync('token')
        ///query-name/{name}
        let _this = this
        let url =  getApp().globalData.server + "/query-name/" + input
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
    change_index_game_category(e){
        let type = e.currentTarget.dataset.id
        let token = wx.getStorageSync('token')
        let start = this.data.start
        let limit = this.data.limit
        let _this = this
        ///query/{category}/{player}/{hasChinese}/{order}/{start}/{limit}
        let url = getApp().globalData.server + "/query/" + type + "/1/true/1/" + start + "/" + limit;
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
    change_index_type(e) {
        let type = e.currentTarget.dataset.id
        let token = wx.getStorageSync('token')
        let start = this.data.start
        let limit = this.data.limit
        let _this = this
        this.setData({
            check_tap: type
        })
        // /index/{type}/{start}/{limit}
        let url = getApp().globalData.server + "/index/" + type + "/" + start + "/" + limit;
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
    tap_game(e){

        console.log(e)
        let id = e.currentTarget.dataset.id
        let token = wx.getStorageSync('token')
       
        let _this = this
        let url = getApp().globalData.server + "/game-opt/hit/" + id;
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
        let type = this.data.check_tap
        let token = wx.getStorageSync('token')
        let start = this.data.start
        let limit = this.data.limit
        let _this = this
        this.setData({
            check_tap: type
        })
        // /index/{type}/{start}/{limit}
        let url = getApp().globalData.server + "/index/" + type + "/" + start + "/" + limit;
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
        let url = getApp().globalData.server + "/index/" + type + "/" + start + "/" + limit;
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
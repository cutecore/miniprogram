// pages/mine/mine.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        kfc: null,
        g_value: null
    },

    fund_search() {
        wx.navigateTo({
            url: '/pages/fund/fund',
        })
    },
    searchKfc: function (latitude, longitude) {
        let _this = this;
        let boundary = `nearby(${latitude},${longitude},1000)`
        wx.serviceMarket.invokeService({
            service: 'wxc1c68623b7bdea7b',
            api: 'poiSearch',
            data: {
                "boundary": boundary,
                "page_size": "20",
                "page_index": "1",
                "keyword": "KFC",
                "orderby": "_distance"
            },

        }).then(res => {
            console.log(res.data.data)
            _this.setData({
                "kfc": res.data.data
            })
        })
    },
    kfc_search() {
        let _this = this
        wx.getSetting({
            success(res) {
                if (!res.authSetting['scope.userLocation']) {
                    wx.authorize({
                        scope: 'scope.userLocation',
                        success() {
                            wx.getLocation({
                                type: 'wgs84',
                                success(res) {
                                    let latitude = res.latitude
                                    let longitude = res.longitude
                                    _this.searchKfc(latitude, longitude)
                                }
                            })
                        },
                        fail() {
                            wx.showModal({
                                title: '是否授权当前位置',
                                content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
                                success: function (resolve) {
                                    if (resolve.confirm) {
                                        wx.openSetting()
                                    }

                                }
                            })

                        }
                    })
                } else {
                    wx.getLocation({
                        type: 'wgs84',
                        success(res) {
                            let latitude = res.latitude
                            let longitude = res.longitude
                            _this.searchKfc(latitude, longitude)
                        }
                    })
                }
            }
        })

    },
    qrcode() {
        wx.scanCode({
            success(res) {
                wx.showModal({
                    title: '扫描结果',
                    content: res.result
                })
                wx.setClipboardData({
                    data: res.result,
                })
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
        // let _this = this;
        // wx.startGyroscope({
        //   "interval": "game",
        //   success(){
        //       console.log("1")
        //   }
        // })
        // wx.onGyroscopeChange(function(res){
        //     console.log(res)
        //     _this.setData({
        //         "g_value": res.x,

        //     })
        // })
    },
    goodinfosearch: function (e) {
        console.log(e)
        let _this = this
        if (!e.detail.value.input) {
            return
        }
        wx.serviceMarket.invokeService({
            service: 'wxcae50ba710ca29d3',
            api: 'goodinfo',
            data: {
                "q": e.detail.value.input,
            },

        }).then(res => {
            let text = ''

            for (let val of res.data.entities.product) {
                text += (val[0] + " " + val[1] + "")
            }

            _this.setData({
                "good": text
            })
        })
    },
    getInfo() {
        let _this = this
        wx.request({
            url: 'https://fundgz.1234567.com.cn/js/161706.js?rt=1463558676006',
            success: function (res) {
                if (res.data) {
                    let raw_json = res.data.replace('jsonpgz(', '').replace(');', '')
                    let obj = JSON.parse(raw_json)
                    obj.time = new Date().toLocaleString()

                    _this.setData({
                        part0: obj
                    })
                }
            }
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

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
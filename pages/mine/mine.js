// pages/mine/mine.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        index: 1,
        array: ['美国', '中国', '巴西', '日本'],
        hasUserInfo: false,
        userInfo: null,
        post: [1, 2, 4, 5, 6]
    },
    addpost(e) {
        console.log(e.detail.value.input)
        let input = e.detail.value.input;

        if (input) {
            let post = this.data.post
            post.push(input)
            this.setData({
                "post": post
            })
        }
    },
    bindPickerChange(e) {
        console.log(e)
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })
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




        wx.getNetworkType({
            success(res) {
                const networkType = res.networkType
                console.log(networkType)
            }
        })

        wx.getSystemInfo({
            success(res) {
                console.log(res.model)
                console.log(res.pixelRatio)
                console.log(res.windowWidth)
                console.log(res.windowHeight)
                console.log(res.language)
                console.log(res.version)
                console.log(res.platform)
                console.log(res.environment)
            }
        })

        wx.getWifiList({
            success(res) {
                console.log(res)
            }
        })

        wx.getConnectedWifi({
            success(res) {
                console.log(3)
                console.log(res)
            }
        })
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



        wx.request({
            url: 'https://www.epicgames.com/graphql',
            method: 'POST',
            data: {
                "query": "query searchStoreQuery($allowCountries: String, $category: String, $count: Int, $country: String!, $keywords: String, $locale: String, $namespace: String, $withMapping: Boolean = false, $itemNs: String, $sortBy: String, $sortDir: String, $start: Int, $tag: String, $releaseDate: String, $withPrice: Boolean = false, $withPromotions: Boolean = false, $priceRange: String, $freeGame: Boolean, $onSale: Boolean, $effectiveDate: String) {\n  Catalog {\n    searchStore(\n      allowCountries: $allowCountries\n      category: $category\n      count: $count\n      country: $country\n      keywords: $keywords\n      locale: $locale\n      namespace: $namespace\n      itemNs: $itemNs\n      sortBy: $sortBy\n      sortDir: $sortDir\n      releaseDate: $releaseDate\n      start: $start\n      tag: $tag\n      priceRange: $priceRange\n      freeGame: $freeGame\n      onSale: $onSale\n      effectiveDate: $effectiveDate\n    ) {\n      elements {\n        title\n        id\n        namespace\n        description\n        effectiveDate\n        keyImages {\n          type\n          url\n        }\n        currentPrice\n        seller {\n          id\n          name\n        }\n        productSlug\n        urlSlug\n        url\n        tags {\n          id\n        }\n        items {\n          id\n          namespace\n        }\n        customAttributes {\n          key\n          value\n        }\n        categories {\n          path\n        }\n        offerMappings @include(if: $withMapping) {\n          pageSlug\n          pageType\n        }\n        price(country: $country) @include(if: $withPrice) {\n          totalPrice {\n            discountPrice\n            originalPrice\n            voucherDiscount\n            discount\n            currencyCode\n            currencyInfo {\n              decimals\n            }\n            fmtPrice(locale: $locale) {\n              originalPrice\n              discountPrice\n              intermediatePrice\n            }\n          }\n          lineOffers {\n            appliedRules {\n              id\n              endDate\n              discountSetting {\n                discountType\n              }\n            }\n          }\n        }\n        promotions(category: $category) @include(if: $withPromotions) {\n          promotionalOffers {\n            promotionalOffers {\n              startDate\n              endDate\n              discountSetting {\n                discountType\n                discountPercentage\n              }\n            }\n          }\n          upcomingPromotionalOffers {\n            promotionalOffers {\n              startDate\n              endDate\n              discountSetting {\n                discountType\n                discountPercentage\n              }\n            }\n          }\n        }\n      }\n      paging {\n        count\n        total\n      }\n    }\n  }\n}\n",
                "variables": {
                    "category": "games/edition/base|bundles/games|editors|software/edition/base",
                    "count": 1000,
                    "country": "CN",
                    "keywords": "",
                    "locale": "zh-CN",
                    "sortBy": "releaseDate",
                    "sortDir": "DESC",
                    "allowCountries": "CN",
                    "start": 0,
                    "tag": "",
                    "releaseDate": "[,2021-03-22T09:17:24.759Z]",
                    "withMapping": false,
                    "withPrice": true
                }
            },
            success(res) {
                console.log(res)
                wx.setStorage({
                    data: res.data.data,
                    key: 'epic',
                    success: (res) => {},
                    fail: (res) => {},
                    complete: (res) => {},
                })

            }

        })



















        console.log(this.data)

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
    remove(e) {
        console.log(e)
        let id = e.target.dataset.id;
        console.log(id)
        let post = this.data.post
        post.splice(id, 1)
        console.log(post)
        this.setData({
            'post': post
        })
    },
    update(e) {
        let id = e.target.dataset.id;
        let _this = this
        wx.showModal({
            editable: true,
            cancelColor: 'cancelColor',
            success(res) {
                console.log(res)
                if ("showModal:ok" === res.errMsg && res.confirm == true) {
                    let content = res.content
                    let post = _this.data.post
                    post[id] = content
                    _this.setData({
                        'post': post
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
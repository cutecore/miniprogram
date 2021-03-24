// pages/search/search.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
        input: null,
        history: [],
        resp: {},
        mark: [],
        markSearch: [],
        icon: true
    },
    icon() {

        this.setData({
            icon: !this.data.icon
        })
    },
    cleanHistory() {
        this.setData({
            history: []
        })
        wx.setStorage({
            data: [],
            key: 'fund:history',
        })
    },
    removeMark(e) {
        let code = e.target.dataset.id
        let mark = this.data.mark;
        let _mark = new Set(mark);
        _mark.delete(code)
        mark = Array.from(_mark)

        let markSearch = this.data.markSearch

        let _markSearch = markSearch.filter(function (item) {
            console.log(item.fundcode !== code)
            return item.fundcode !== code
        })

        this.setData({
            markSearch:_markSearch
        })







        this.setData({
            mark: mark
        })

        wx.setStorage({
            data: mark,
            key: 'fund:mark',
        })




    },
    input(e) {
        let value = e.detail.value
        this.setData({
            'input': value
        })
    },
    mark(e) {
        let _this = this
        let code = e.target.dataset.id;
        let mark = this.data.mark
        let _mark = new Set(mark)
        if (_mark.has(code)) {
            return
        }
        _mark.add(code)
        mark = Array.from(_mark)

        wx.request({
            url: 'https://fundgz.1234567.com.cn/js/' + code + '.js?rt=1463558676006',
            success: function (res) {
                if (res.data) {
                    let raw_json = res.data.replace('jsonpgz(', '').replace(');', '')
                    let obj = JSON.parse(raw_json)
                    let markSearch = _this.data.markSearch
                    markSearch.push(obj)
                    _this.setData({
                        markSearch: markSearch
                    })


                }
            }
        })





        this.setData({
            mark: mark
        })
        wx.setStorage({
            data: mark,
            key: 'fund:mark',
        })

    },
    search() {
        let code = this.data.input
        let _this = this
        wx.request({
            url: 'https://fundgz.1234567.com.cn/js/' + code + '.js?rt=1463558676006',
            success: function (res) {
                if (res.statusCode == 404) {
                    wx.showToast({
                        title: '错误的基金代码',
                        icon: 'error'
                    })
                    return
                }
                if (res.data) {
                    let raw_json = res.data.replace('jsonpgz(', '').replace(');', '')
                    let obj = JSON.parse(raw_json)
                    obj.time = new Date().toLocaleString()
                    _this.setData({
                        'resp': obj
                    })

                    let history = _this.data.history
                    let _history = new Set(history)
                    _history.add(code)
                    history = Array.from(_history)
                    _this.setData({
                        'history': history
                    })

                    wx.setStorage({
                        data: history,
                        key: 'fund:history',
                    })
                }
            }
        })
    },
    searchFromHis(e) {
        console.log(e)
        let _this = this;
        let code = e.target.dataset.id;
        wx.request({
            url: 'https://fundgz.1234567.com.cn/js/' + code + '.js?rt=1463558676006',
            success: function (res) {
                if (res.data) {
                    let raw_json = res.data.replace('jsonpgz(', '').replace(');', '')
                    let obj = JSON.parse(raw_json)
                    obj.time = new Date().toLocaleString()
                    _this.setData({
                        'resp': obj
                    })
                }
            }
        })
    },
    onLoad() {
        let _this = this;
        wx.getStorage({
            key: 'fund:history',
            success(e) {
                console.log(e)
                _this.setData({
                    history: e.data
                })
            }
        })

        wx.getStorage({
            key: 'fund:mark',
            success(e) {
                console.log(e)
                _this.setData({
                    mark: e.data
                })
            }
        })
    },

    onShow: function () {

    },
    onReady: function () {
        let code = this.data.mark
        let _this = this;
        code.forEach(function (t) {
            console.log(t)
            wx.request({
                url: 'https://fundgz.1234567.com.cn/js/' + t + '.js?rt=1463558676006',
                success: function (res) {
                    if (res.data) {
                        let raw_json = res.data.replace('jsonpgz(', '').replace(');', '')
                        let obj = JSON.parse(raw_json)
                        obj.time = new Date().toLocaleString()

                        let markSearch = _this.data.markSearch
                        markSearch.push(obj)
                        _this.setData({
                            markSearch: markSearch
                        })
                        console.log(_this.data.markSearch)
                    }
                }
            })
        })
    }
})
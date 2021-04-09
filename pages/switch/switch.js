// pages/switch/switch.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        games:[],
        categorys:[
        {'color':'#9BD4B2',type:"Role-Playing",naem:"角色扮演"},
        {'color':'#9BD4B2',type:"Sports",naem:"体育"},  
        {'color':'#2C4553',type:"Adventure",naem:"冒险"},
        {'color':'#B5C228',type:"Indie",naem:"独立"},
        {'color':'#738AF2',type:"Fighting",naem:"格斗"},
        {'color':'#42406E',type:"Shooter",naem:"射击"},
        {'color':'#AC2BE0',type:"Action",naem:"动作"},
        {'color':'#9BD4B2',type:"First-Person",naem:"第一人称"},
        {'color':'#9BD4B2',type:"Party",naem:"聚会"},
        {'color':'#9BD4B2',type:"Multiplayer",naem:"多人游戏"},
        {'color':'#9BD4B2',type:"Racing",naem:"赛车"}
        ],
        order:[{id:1,name:'价格'},{id:2,name:'评价'}],
        click:null
    },


    dislike(e){

        console.log(e)
        let id = e.target.dataset.id


        let array = this.data.index
        for (let index = 0; index < array.length; index++) {
            
            if(array[index].id == id){
                array[index].like = false;
            } 
        }
        this.setData({
            index:array
        })

        let _this = this
        let token = wx.getStorageSync('token')

        let url = getApp().globalData.server +    '/dislike/' + id;

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


    like(e){
        console.log(e)
        let id = e.target.dataset.id


        let _this = this
        let token = wx.getStorageSync('token')


        let array = this.data.index
        for (let index = 0; index < array.length; index++) {
            
            if(array[index].id == id){
                array[index].like = true;
            } 
        }
        this.setData({
            index:array
        })

        let url = getApp().globalData.server +    '/like/' + id;

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
    tapItem(e){
        let id = e.currentTarget.dataset.id
        let array = this.data.index
        for (let index = 0; index < array.length; index++) {
            
            if(array[index].id == id){
                array[index].open = true;
                array[index].galleryArr =  array[index].gallery.split(',')
            }else{
                array[index].open = false;
            }
            
        }
        this.setData({
            index:array
        })
    
    },
    tapCategory(e){
        console.log(e)
        let id = e.target.dataset.id

        let start = (id-1) * 15
        let _this = this
        let token = wx.getStorageSync('token')

        let url = getApp().globalData.server + '/index/' + start +'/15'
        wx.request({
            url: url,
            method: 'GET',
            header: {
                auth: token,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success(res) {
                if (601 == res.statusCode) {
                    getApp().userlogin()
                }

                if (200 == res.statusCode) {
                    console.log(res)

                    _this.setData({
                        index:res.data
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
        
        
        
        let _this = this

        let token = wx.getStorageSync('token')

        let url = getApp().globalData.server + '/index/100/15'
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
                    console.log(res)

                    _this.setData({
                        index:res.data
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
        console.log(1)

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})

// 
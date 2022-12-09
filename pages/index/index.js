// pages/index/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: null,
  },
  onChoosePic(e){
    var page = this
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sizeType: ['original'],
      success(res){
        page.setData({
          avatarUrl: res.tempFiles[0].tempFilePath
        })
      }
    })
  },
  // 选择的头像和照片的尺寸只有132x132
  onChooseAvatar(e) {
    console.log(e)
    const { avatarUrl } = e.detail 
    this.setData({
      avatarUrl,
    })
  },
  nextPage(){
    app.globalData.avatarUrl=this.data.avatarUrl;
    wx.navigateTo({
      url: '../imageeditor/imageeditor',
    })
},
})
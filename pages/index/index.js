// pages/index/index.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: null,
  },
  onShareAppMessage: function (object) {
    console.log(object);
    // 页面被用户分享时执行
    // const promise = new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve({
    //       title: "自定义转发标题",
    //     });
    //   }, 2000);
    // });
    return {
      title: "快来制作节日头像吧",
      // path: "/page/user?id=123",
      // promise,
    };
  },
  onShareTimeline: function () {
    // 页面分享到朋友圈
    return {
      title: "快来制作节日头像吧",
      // query,
      // imageUrl,
    };
  },
  onChoosePic(e) {
    var page = this;
    wx.chooseMedia({
      count: 1,
      mediaType: ["image"],
      sizeType: ["original"],
      success(res) {
        page.setData({
          avatarUrl: res.tempFiles[0].tempFilePath,
        });
      },
    });
  },
  // 选择的头像和照片的尺寸只有132x132
  onChooseAvatar(e) {
    console.log(e);
    const { avatarUrl } = e.detail;
    this.setData({
      avatarUrl,
    });
  },
  nextPage() {
    app.globalData.avatarUrl = this.data.avatarUrl;
    wx.navigateTo({
      url: "../imageeditor/imageeditor",
    });
  },
});

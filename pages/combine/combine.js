// pages/combine/combine.js
const app = getApp();
Page({
  data: {},

  onLoad: function (options) {
    const page = this;
    wx.getImageInfo({
      src: app.globalData.avatarUrl,
      success: (res) => {
        this.avatarUrl = res.path;
        this.avatarWidth = res.width;
        this.avatarHeight = res.height;

        let currentHatId = app.globalData.currentHatId;
        wx.getImageInfo({
          src: "/image/" + currentHatId + ".png",
          success(res) {
            console.log(res.width);
            console.log(res.height);
            var hatWidth = 0;
            var hatHeight = 0;
            let scale = app.globalData.scale;
            const hat_size = 100 * scale;
            if (res.width > res.height) {
              hatWidth = hat_size;
              hatHeight = res.height * (hat_size / res.width);
            } else {
              hatHeight = hat_size;
              hatWidth = res.width * (hat_size / res.height);
            }
            page.draw(hatWidth, hatHeight);
          },
        });
      },
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  draw(hatWidth, hatHeight) {
    const dpr = wx.getWindowInfo().pixelRatio;
    let rotate = app.globalData.rotate;
    let hat_center_x = app.globalData.hat_center_x;
    let hat_center_y = app.globalData.hat_center_y;
    let currentHatId = app.globalData.currentHatId;
    const pc = wx.createCanvasContext("myCanvas");
    const windowWidth = wx.getSystemInfoSync().windowWidth;
    const windowHeight = wx.getSystemInfoSync().windowHeight;
    const margin = (windowWidth - 300) / 2;

    var x = 0;
    var y = 0;
    var side = 0;
    if (this.avatarWidth > this.avatarHeight) {
      side = this.avatarHeight;
      x = (this.avatarWidth - this.avatarHeight) / 2;
    } else {
      side = this.avatarWidth;
      y = (this.avatarHeight - this.avatarWidth) / 2;
    }

    pc.clearRect(0, 0, 300, 300);
    pc.drawImage(this.avatarUrl, x, y, side, side, 0, 0, 300, 300);
    pc.translate(hat_center_x - margin, hat_center_y - margin);
    pc.rotate((rotate * Math.PI) / 180);
    console.log(hatWidth);
    console.log(hatHeight);
    pc.drawImage(
      "/image/" + currentHatId + ".png",
      -hatWidth / 2,
      -hatHeight / 2,
      hatWidth,
      hatHeight
    );
    pc.draw();
  },
  savePic() {
    const windowWidth = wx.getSystemInfoSync().windowWidth;
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      height: 300,
      width: 300,
      canvasId: "myCanvas",
      success: (res) => {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: (res) => {
            wx.navigateTo({
              url: "../index/index",
              success: function (res) {},
              fail: function (res) {},
              complete: function (res) {},
            });
            console.log("success:" + res);
          },
          fail(e) {
            console.log("err:" + e);
          },
        });
      },
    });
  },
});

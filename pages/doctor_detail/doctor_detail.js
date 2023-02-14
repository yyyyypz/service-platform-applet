// pages/product_detail/product_detail.js
// 导入后端请求公共类
import {
  requestPubUtil,
  getBaseUrl
} from "../../utils/requestPubUtil.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 请求后端根路径
    baseUrl: '',
    // 商品对象
    product: {},
    // 点击事件切换索引
    activeIndex: 0,
  },
  productInfo: {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    /**
     * 获取后端请求根路径
     */
    const baseUrl = getBaseUrl();
    this.setData({
      baseUrl: baseUrl
    })
    // console.log("id=" + options.id); 
    this.getProductDetail(options.id);
  },

  // 获取商品详情
  async getProductDetail(id) {
    const result = await requestPubUtil({
      url: '/doctor/queryDoctorDetail?id=' + id,
      method: "GET"
    });
    this.productInfo = result.data.datas;
    this.setData({
      product: result.data.datas
    })
  },

  // tab点击事件
  handleItemTap(e) {
    const index = e.currentTarget.dataset.index;
    console.log(index)
    this.setData({
      activeIndex: index
    })
  },


  // 点击事件 房屋加入收藏
  handleCartAdd() {

    this.setCartadd();

    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true
    })
  },

  // 加入购物车
  setCartadd() {
    let booking = wx.getStorageSync('booking') || [];
    console.log("booking=" + booking);
    let index = booking.findIndex(v => v.id === this.productInfo.id);
    if (index === -1) { // 购物车里面不存在当前商品 
      this.productInfo.num = 1;
      this.productInfo.checked = true;
      booking.push(this.productInfo);
    } else { // 已经存在
      booking[index].num++;
    }
    wx.setStorageSync('booking', booking); // 把购物车添加到缓存中
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
// 导入request请求工具类
import {
  getBaseUrl,
  requestPubUtil
} from '../../utils/requestPubUtil.js';
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productList: [], // 商品数组
    inputValue: "", // 输入框的值
    isFocus: false // 取消 按钮 是否显示
  },

  TimeoutId: -1,

  // 处理input事件
  handleInput(e) {
    const {
      value
    } = e.detail;
    if (!value.trim()) {
      this.setData({
        productList: [],
        isFocus: false
      })
      return;
    }
    this.setData({
      isFocus: true
    })
    clearTimeout(this.TimeoutId);
    this.TimeoutId = setTimeout(() => {
      this.search(value)
    }, 1000)

  },

  /**
   * 获取商品详情
   */
  async search(queryParam) {
    const result = await requestPubUtil({
      url: '/product/search',
      data: {
        queryParam
      }
    });
    console.log(result)
    this.setData({
      productList: result.data.datas
    })
  },

  // 点击 取消按钮
  handleCancel() {
    this.setData({
      productList: [], // 商品数组
      inputValue: "", // 输入框的值
      isFocus: false // 取消 按钮 是否显示
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
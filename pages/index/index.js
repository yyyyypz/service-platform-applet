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
    // 轮播图数组
    swiperList: [],
    // 请求后端根路径
    baseUrl: '',
    // 所有商品大类
    bigTypeList: [],
    // 商品大类第一行
    bigTypeList_row1: [],
    // 商品大类第二行
    bigTypeList_row2: [],
    // 热卖商品
    hotProductList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.request({
    //   url: 'http://localhost:8088/product/querySwiper',
    //   method: "GET",
    //   success: (result) => {
    //     console.log(result);
    //     this.setData({
    //       swiperList: result.data.datas
    //     })
    //   }
    // })
    /**
     * 获取后端请求根路径
     */
    const baseUrl = getBaseUrl();
    this.setData({
      baseUrl: baseUrl
    })
    // 调用获取轮播图请求方法
    this.getSwiperList(baseUrl);
    // 调用获取商品大类请求方法
    this.getBigType(baseUrl);
    // 调用获取热卖商品方法
    this.getHotProduct(baseUrl);
  },

  // 功能模块点击事件
  bigTypeJump1(e) {
    // console.log(e);
    const index = e.currentTarget.dataset.index;
    // console.log("index=" + index);
    wx.switchTab({
      url: '/pages/catagory/catagory',
    })
  },
  bigTypeJump2(e) {
    // console.log(e);
    const index = e.currentTarget.dataset.index;
    // console.log("index=" + index);
    wx.navigateTo({
      url: '/pages/book/book',
    })
  },
  bigTypeJump3(e) {
    // console.log(e);
    const index = e.currentTarget.dataset.index;
    // console.log("index=" + index);
    wx.navigateTo({
      url: '/pages/product_detail/product_detail',
    })
  },
  bigTypeJump4(e) {
    // console.log(e);
    const index = e.currentTarget.dataset.index;
    // console.log("index=" + index);
    wx.navigateTo({
      url: '/pages/lease/lease',
    })
  },

  // async表示该请求是异步请求
  async getSwiperList(baseUrl) {
    // url和method封装为一个对象传到requestPubUtil中的params对象参数，then后面的第一个回调会成功，第二个为失败
    // requestPubUtil({
    //   // params对象
    //   url: baseUrl + '/product/querySwiper',
    //   method: "GET"
    //   // result为请求成功响应的数据
    // }).then(result => {
    //   this.setData({
    //     swiperList: result.datas
    //     // err为请求失败响应的数据
    //   }, (err) => {
    //     // 请求失败（rejected）
    //   })
    // })
    // await等待请求完成后才能继续执行后面的代码
    const result = await requestPubUtil({
      url: '/product/querySwiper',
      method: "GET"
    });
    this.setData({
      swiperList: result.data.datas
    })
  },

  async getBigType(baseUrl) {
    const result = await requestPubUtil({
      url: '/bigType/queryBigType',
      method: "GET"
    });
    // 获取所有商品大类
    const bigTypeList = result.data.datas;
    // 获取商品大类第一行数据
    const bigTypeList_row1 = result.data.datas.filter((item, index) => {
      return index < 5;
    })
    // 获取商品大类第二行数据
    const bigTypeList_row2 = result.data.datas.filter((item, index) => {
      return index >= 5;
    })
    // 初始化商品大类数据
    this.setData({
      bigTypeList: result.data.datas,
      bigTypeList_row1,
      bigTypeList_row2
    })
  },
  // 获取热卖商品
  async getHotProduct(baseUrl) {
    const result = await requestPubUtil({
      url: '/product/queryHotProduct',
      method: "GET"
    });
    this.setData({
      hotProductList: result.data.datas
    })
  }
})
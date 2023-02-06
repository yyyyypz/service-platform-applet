// pages/catagory/catagory.js
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
    // 左侧商品大类
    leftBigType: [],
    // 右侧商品小类
    rightSmallType: [],
    baseUrl: '',
    // 当前被选中索引
    currentIndex: 0,
    // 右侧滚动置顶
    scrollTop: 0
  },

  allData: [],

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
    this.getAllData();
  },

  // 获取所有商品分类
  async getAllData() {
    const result = await requestPubUtil({
      url: '/bigType/queryCategories',
      method: "GET"
    });
    // 用allData接收所有数据
    this.allData = result.data.datas;
    // 用map遍历allData并且只获取大类中的name
    let leftBigType = this.allData.map((value) => {
      return value.name;
    })
    // 获取小类当中的商品数据
    let rightSmallType = this.allData[0].smallTypeList;
    this.setData({
      leftBigType: leftBigType,
      rightSmallType: rightSmallType
    })
  },

  leftMenuChange(e) {
    // 左侧商品大类索引点击后切换
    const index = e.target.dataset.index;
    let rightSmallType = this.allData[index].smallTypeList;
    this.setData({
      currentIndex: index,
      rightSmallType: rightSmallType,
      scrollTop: 0
    })
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
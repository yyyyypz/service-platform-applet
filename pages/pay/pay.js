// 导入后端请求公共类
import {
  requestPubUtil,
  getBaseUrl,
  getWxLogin,
  getUserProfile,
} from "../../utils/requestPubUtil.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    baseUrl: '',
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const baseUrl = getBaseUrl();
    this.setData({
      baseUrl
    })
  },

  // 处理订单支付
  async handleOrderPay() {
    const token = wx.getStorageSync('token');
    if (!token) {
      Promise.all([getWxLogin(), getUserProfile()]).then((res) => {
        console.log(res[0].code);
        console.log(res[1].userInfo.nickName, res[1].userInfo.avatarUrl)
        let loginParam = {
          code: res[0].code,
          nickName: res[1].userInfo.nickName,
          avatarUrl: res[1].userInfo.avatarUrl
        }
        console.log(loginParam)
        wx.setStorageSync('userInfo', res[1].userInfo);
        this.wxlogin(loginParam);
      })
    } else {
      console.log("token存在：" + token);
      // 支付继续走，创建订单
      console.log("支付继续走，创建订单");
      this.createOrder();
    }
  },

  /**
   * 请求后端获取用户token
   * @param {*} loginParam 
   */
  async wxlogin(loginParam) {
    const result = await requestPubUtil({
      url: "/user/wxlogin",
      data: loginParam,
      method: "post"
    });
    console.log(result);
    const token = result.data.token;
    if (result.data.code == 200) {
      // 存储token到缓存
      wx.setStorageSync('token', token);
      // 支付继续走，创建订单
      console.log("支付继续走，创建订单");
      this.createOrder();
    }
  },

  async createOrder() {
      try {
        const totalPrice = this.data.totalPrice;
    const address = this.data.address.provinceName + this.data.address.cityName + this.data.address.countyName + this.data.address.detailInfo;
    const consignee = this.data.address.userName;
    const telNumber = this.data.address.telNumber;
    let goods = [];
    this.data.cart.forEach(v => goods.push({
      goodsId: v.id,
      goodsNumber: v.num,
      goodsPrice: v.price,
      goodsName: v.name,
      goodsPic: v.proPic
    }))
    const orderParam = {
      totalPrice,
      address,
      consignee,
      telNumber,
      goods
    }
    const res = await requestPubUtil({
      url: "/my/order/create",
      method: "POST",
      data: orderParam
    });
    // 获取订单号，根据订单号对订单进行支付，修改支付状态跳转至订单页面
    let orderNo = res.data.orderNo;
    console.log(orderNo);
    // 调用支付接口
    const payResult = await requestPubUtil({
      url: "/my/order/pay",
      method: "POST",
      data: orderNo
    })
    console.log(payResult);
    // 删除缓冲中，已经支付的商品
      // 获取缓存中的购物车
      let newCart=wx.getStorageSync('cart');
      // 过滤掉已经被支付的商品
      newCart=newCart.filter(v=>!v.checked);
      // 重新将购物车存到缓存当中
      wx.setStorageSync('cart', newCart);
      wx.showToast({
        title: '支付成功',
        icon:'none'
      })
      // 跳转到订单页面
      wx.navigateTo({
        url: '/pages/order/order?type=0'
      })
      } catch (error) {
        console.log(error);
          wx.showToast({
            title: '支付失败，请稍后重试',
            icon:'none'
          })
      }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("show")
    const address = wx.getStorageSync('address');
    let cart = wx.getStorageSync('cart') || [];
    cart = cart.filter(v => v.checked);
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      totalPrice += v.price * v.num;
      totalNum += v.num;
    })

    this.setData({
      cart,
      totalNum,
      address,
      totalPrice
    })
  }

})
/**
 * 
 * @param {请求后端公共类} params 
 */

// 定义请求根路径baseUrl
const baseUrl = "http://localhost:8088";
// 同时并发请求的次数
let ajaxTimes = 0;
/**
 * 
 * @param {返回请求根路径} params 
 */
export const getBaseUrl = () => {
  return baseUrl;
}

/**
 * wx login封装
 */
export const getWxLogin = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout: 5000,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  });
}

/**
 * wx getUserProfile封装
 */
export const getUserProfile = () => {
  return new Promise((resolve, reject) => {
    wx.getUserProfile({
      desc: '获取用户信息',
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  });
}

export const requestPubUtil = (params) => {
  // 根据路径是否带/my/判断是否是私有路径，如果是则带上header和token
  let header = {
    ...params.header
  };
  if (params.url.includes("/my/")) {
    // 拼接header带上token
    header["token"] = wx.getStorageSync('token')
  }
  var start = new Date().getTime();
  console.log(start)

  ajaxTimes++;

  wx.showLoading({
    title: '加载中...',
    mask: true
  })

  // 模拟网络延迟加载...
  while (true) {
    if (new Date().getTime() - start > 1 * 100) break;
  }
  return new Promise((resolve, reject) => {
    // 发送异步请求
    wx.request({
      // 解构请求的所有参数（请求路径及请求方式）
      url: baseUrl + params.url,
      method: params.method,
      header,
      data: params.data,
      // 请求成功调用resolve方法（fullfilled状态）
      success: (result) => {
        resolve(result)
      },
      // 请求失败调用reject方法（rejected状态）
      fail: (err) => {
        reject(err)
      },
      complete: () => {
        ajaxTimes--;
        if (ajaxTimes == 0) {
          wx.hideLoading(); // 关闭加载图标
        }

      }
    })
  });
}
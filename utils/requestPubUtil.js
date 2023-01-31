/**
 * 
 * @param {请求后端公共类} params 
 */

// 定义请求根路径baseUrl
const baseUrl = "http://localhost:8088"
/**
 * 
 * @param {返回请求根路径} params 
 */
export const getBaseUrl = () => {
  return baseUrl;
}
export const requestPubUtil = (params) => {
  return new Promise((resolve, reject) => {
    // 发送异步请求
    wx.request({
      // 解构请求的所有参数（请求路径及请求方式）
      url:baseUrl+params.url,
      method:params.method,
      // 请求成功调用resolve方法（fullfilled状态）
      success: (result) => {
        resolve(result)
      },
      // 请求失败调用reject方法（rejected状态）
      fail: (err) => {
        reject(err)
      }
    })
  });
}
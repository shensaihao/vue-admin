const baseUrl = process.env.VUE_APP_BASE_API
const api = {
  state: {
    // 图片上传
    imagesUploadApi: baseUrl + '/api/discount/applies/upload'
  }
}

export default api

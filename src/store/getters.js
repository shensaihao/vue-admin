const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.nam,
  roles: state => state.user.roles,
  imagesUploadApi: state => state.api.imagesUploadApi
}
export default getters

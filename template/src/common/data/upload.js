import store from '@/pages/admin/store'
import config from '@/common/config'

export default function uploadImage(url) {
  return {
    action: `${config.base_url}/${url}`,
    headers: {
      Authorization: `Bearer ${store.getters.token}`
    },
    responseFn(url) {
      return url
    }
  }
}

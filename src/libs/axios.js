import Vue from 'vue'
// axios
import axios from 'axios'

const axiosIns = axios.create({
  baseURL: "https://zignuts.dev/es-summer-quote-backend/api/v1",
    headers: {
       'Content-Type': 'application/json',
    }
})

Vue.prototype.$http = axiosIns

export default axiosIns

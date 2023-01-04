import axios from 'axios'

export default axios.create({
    baseURL: "https://zignuts.dev/es-summer-quote-backend/api/v1/",
    headers: {
       'Content-Type': 'application/json',
    }
})
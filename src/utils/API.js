import axios from 'axios'

const baseURL = ''

const request = function (method, url, data) {
    axios(
        {
            method,
            url: baseURL + url,
            data
        },
        {
            headers: {}
        }
    )
}

const API = {
    chatBI: () => request('POST', '/chat_bi', {})
}

export default API

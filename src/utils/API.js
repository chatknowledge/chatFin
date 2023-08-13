import axios from 'axios';

const baseURL = 'https://chatlaw.cloud/chatfin'

const axiosInstance = axios.create({
  baseURL
})

const API = {
  postChatAutoReport: (query) => axiosInstance.post('/chat_auto_report', { query }).then((res) => {
    console.log(res);
    return res
  }),
  postChatAutoBI: (query) => axiosInstance.post('/chat_auto_bi', { query })
}

// const API = {
//   postChatAutoReport: (query) => Promise.resolve(postChatAutoReportMock),
//   postChatAutoBI: (query) => Promise.resolve(postChatAutoBIMock)
// }

export default API

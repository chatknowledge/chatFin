import axios from 'axios';
import { postChatAutoBIMock, postChatAutoReportMock } from './mock';

const baseURL = 'https://chatlaw.cloud/chatfin'

const axiosInstance = axios.create({
  baseURL
})

const API = {
  postChatAutoReport: (query, code) => axiosInstance.post('/chat_auto_report', { query, code }).then((res) => {
    console.log(res);
    return res
  }),
  postChatAutoBI: (query, code) => axiosInstance.post('/chat_auto_bi', { query, code })
}

// const API = {
//   postChatAutoReport: (query, code) => new Promise((resolve, reject) => 
//     setTimeout(() => resolve(postChatAutoReportMock), 1000)
//   ),
//   postChatAutoBI: (query, code) => Promise.resolve(postChatAutoBIMock)
// }

export default API

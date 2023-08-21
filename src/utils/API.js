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
  postChatAutoBI: (query, code) => axiosInstance.post('/chat_auto_bi', { query, code }),
  getSearchCompany: (query) => Promise.resolve(
    Array.from({length: 4}, 
      () => ({
        name: "".concat(
          ...Array.from({length: 4}, () => ['歪', '比', '吧', '卜'].at(Math.floor(Math.random()*4)))
        ),
        code: Math.floor(Math.random()*1000000).toString(),
        value: Math.floor(Math.random()*1000).toFixed(2)
      })
    )
  )
}

// const API = {
//   postChatAutoReport: (query, code) => new Promise((resolve, reject) => 
//     setTimeout(() => resolve(postChatAutoReportMock), 1000)
//   ),
//   postChatAutoBI: (query, code) => Promise.resolve(postChatAutoBIMock)
// }

export default API

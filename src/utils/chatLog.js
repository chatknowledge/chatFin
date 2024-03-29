import { useState } from "react";
import API from "./API";

export function useChatLog() {
  const [chatLog, setChatLog] = useState([]);
  const [companyCode, setCompanyCode] = useState(undefined);
  const [companyData, setCompanyData] = useState({
    '000002': '万科A',
    '300676': '华大基因',
    '688981': '中芯国际'
  });
  const [isQuestAllowed, setIsQuestAllowed] = useState(true);

  /**
   * Send a question.
   * @param {string} quest The question string to send.
   */
  const sendQuest = (quest) => {
    setIsQuestAllowed(false);
    setChatLog(prev => [...prev, {
      type: "userLog",
      data: quest
    }, {
      type: "gptLog",
      data: {
        title: companyCode ? (companyData[companyCode] + `(${companyCode})`) : '未选择公司',
      }
    }]);

    const postChatAutoReportPromise = API.postChatAutoReport(quest, companyCode)
    .then(result => {
      setChatLog(prev => [...prev.slice(0, -1), 
        { 
          type: "gptLog",
          data: Object.assign(prev.at(-1).data , { answer: result.data.answer })
        }
      ]);
    });

    const postChatAutoBIPromise = API.postChatAutoBI(quest, companyCode)
    .then(result => ({
    // answer: results[0].data.answer,
    chartDatas: 
      Object.entries(result.data.result)
        .flatMap(item => 
          item[1].map(chart => (
            {
              name: item[0],
              type: Object.keys(chart)[0],
              data: Object.values(chart)[0].data
            })
          )
        ).map(item => item.type === 'stackbar'
          ? {
            ...item,
            data: item.data.map(value => ({
              ...value,
              sell_elg_amount: -value.sell_elg_amount,
              sell_elg_vol: -value.sell_elg_vol,
              sell_lg_amount: -value.sell_lg_amount,
              sell_lg_vol: -value.sell_lg_vol,
              sell_md_amount: -value.sell_md_amount,
              sell_md_vol: -value.sell_md_vol,
              sell_sm_amount: -value.sell_sm_amount,
              sell_sm_vol: -value.sell_sm_vol
            }))
          }
          : item
        )
    }))
    .then(data => 
      setChatLog(prev => [...prev.slice(0, -1), 
      { 
        type: "gptLog",
        data: Object.assign(prev.at(-1).data, data)
      }
    ]));

    Promise.all([postChatAutoReportPromise, postChatAutoBIPromise])
      .then(() => setIsQuestAllowed(true));
  }

  /**
   * Reset the chat dialogue.
   */
  const resetChatLog = () => {
    setChatLog([]);
  }

  /**
   * Change the chosen company.
   */
  const selectCompany = (code) => {
    setCompanyCode(code);
  }

  return { chatLog, companyCode, companyData, isQuestAllowed, sendQuest, resetChatLog, selectCompany }
}
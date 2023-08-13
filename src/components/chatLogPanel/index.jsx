import { useContext, useState } from "react";
import "./index.css";
import { ChatLogContext } from "../chatLogContext";
import { UserLog, GptLog, GptLoadingSign } from "./components";

import sendPNG from "../../assets/send.png";

export default function ChatLogPanel() {
  const { chatLog, sendQuest } = useContext(ChatLogContext);
  const [quest, setQuest] = useState("");

  return (
    <div className="chat_panel">
      <div className="chat_log_panel">
        {true && (
          <div className="chat_welcome">
            <div className="chat_header">
              <div className="chat_header_title">欢迎使用 ChatFinance</div>
              <div className="chat_header_subtitle">最先进的 AI 金融助手</div>
            </div>
            <div className="chat_sample">
              <div className="chat_sample_content">
                <div className="chat_sample_title">提出复杂问题</div>
                <div className="chat_sample_list">
                  <div className="chat_sample_item">
                    “腾讯最近三个月的走势。”
                  </div>
                  <div className="chat_sample_item">“阿里巴巴的财务报表。”</div>
                </div>
              </div>
              <div className="chat_sample_divider" />
              <div className="chat_sample_content">
                <div className="chat_sample_title">获得更好的答案</div>
                <div className="chat_sample_list">
                  <div className="chat_sample_item">“A股市场的最新动态。”</div>
                  <div className="chat_sample_item">“美国的最新经济数据。”</div>
                </div>
              </div>
              <div className="chat_sample_divider" />
              <div className="chat_sample_content">
                <div className="chat_sample_title">更高效地工作</div>
                <div className="chat_sample_list">
                  <div className="chat_sample_item">“我应该如何投资？”</div>
                  <div className="chat_sample_item">
                    “现在应该买入还是卖出？”
                  </div>
                </div>
              </div>
            </div>
            <div className="chat_warning">
              可能出现意外或错误，此版本不可查看历史记录，请及时复制数据备用
            </div>
          </div>
        )}
        {chatLog.map((log, index) =>
          log.type === "userLog" ? (
            <UserLog key={index} data={log.data} />
          ) : log.type === "gptLog" ? (
            <GptLog key={index} data={log.data} />
          ) : log.type === "gptLoadingSign" ? (
            <GptLoadingSign />
          ) : (
            <div>unsupported</div>
          )
        )}
      </div>
      <div className="chat_input_panel">
        <div className="chat_select_company">选择公司</div>
        <div className="chat_input_box">
          <input
            className="chat_input_text"
            type="text"
            value={quest}
            onChange={(e) => setQuest(e.target.value)}
            onSubmit={(e) => sendQuest(quest)}
          />
          <button className="chat_send_button" onClick={() => sendQuest(quest)}>
            <img className="chat_send_image" src={sendPNG} alt="发送" />
          </button>
        </div>
      </div>
    </div>
  );
}

import { useContext, useEffect, useState, useRef, useTransition as useTransitionReact } from "react";
import "./index.css";
import { ChatLogContext } from "../chatLogContext";
import { UserLog, GptLog, GptLoadingSign } from "./components";
import { useTransition, animated } from "@react-spring/web";

import { ReactComponent as SendLogo } from "../../assets/send.svg";
import { ReactComponent as SearchIcon } from "../../assets/search.svg";
import loadingSVG from "../../assets/loading.svg";
import chevronDownSVG from "../../assets/chevron-down.svg";
import API from "../../utils/API";

export default function ChatLogPanel() {
  const { chatLog } = useContext(ChatLogContext);

  const logRef = useRef(null);
  useEffect(() => {
    console.log(chatLog.length);
    if (chatLog.length) logRef.current.lastChild.scrollIntoView();
  }, [chatLog.length]);

  return (
    <div className="chat_panel">
      <div className="chat_log_panel" ref={logRef}>
        {chatLog.length === 0 && (
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
      <ChatInputPanel />
    </div>
  );
}

function ChatInputPanel() {
  const { sendQuest, isQuestAllowed } = useContext(ChatLogContext);
  const [quest, setQuest] = useState("");

  const handleSendQuest = () => {
    sendQuest(quest);
    setQuest("");
  };

  return (
    <div className="chat_input_panel">
      <ChatInputChooseCompany />
      <div className="chat_input_box">
        <input
          className="chat_input_text"
          type="text"
          value={quest}
          onChange={(e) => setQuest(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendQuest()}
        />
        <button
          className={
            "chat_send_button" +
            (isQuestAllowed && quest.length ? " active" : "")
          }
          onClick={handleSendQuest}
        >
          <SendLogo className="chat_send_image" alt="发送" />
        </button>
      </div>
    </div>
  );
}

function ChatInputChooseCompany() {
  const { companyCode, companyData, selectCompany } =
    useContext(ChatLogContext);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const [searchParams, setSearchParams] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const transition = useTransition(isPanelOpen, {
    from: { opacity: 0, transform: "translateY(10px)" },
    enter: { opacity: 1, transform: "translateY(0px)" },
    leave: { opacity: 0, transform: "translateY(10px)" },
  });

  const handleSearch = (params) => {
    API.getSearchCompany(params).then((res) => 
      setSearchResult(res)
    );
  };

  const handleSelectCompany = (code) => {
    setIsPanelOpen(false);
    selectCompany(code);
  };

  return (
    <div
      className="chat_select_company"
      onClick={() => setIsPanelOpen((v) => !v)}
    >
      <div className="chat_select_company_name">
        {companyCode ? companyData[companyCode] : "选择公司"}
      </div>
      <img className="chat_select_company_chevoron" src={chevronDownSVG} />
      {isPanelOpen && (
        <div className="chat_select_company_panel_background" onClick={(e) => {
          e.stopPropagation();
          setIsPanelOpen(false);
        }} />
      )}
      {transition((style, isOpen) =>
        isOpen ? (
          <animated.div
            key={1}
            className="chat_select_company_panel"
            style={style}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="chat_select_company_search">
              <SearchIcon className="chat_select_company_search_icon" />
              <input
                className="chat_select_company_search_input"
                type="text"
                placeholder="搜索公司名称"
                value={searchParams}
                onChange={(e) => setSearchParams(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch(searchParams)}
              />
            </div>
            <div className="chat_select_company_item_container">
              {searchParams ? (
                searchResult.map((item) => (
                  <div
                    className="chat_select_company_item"
                    onClick={() => handleSelectCompany(item.code)}
                  >
                    <div className="chat_select_company_item_name">
                      {item.name}
                    </div>
                    <div style={{ flexGrow: 1 }} />
                    <div className="chat_select_company_item_value">
                      总市值 {item.value} 亿
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div className="chat_select_company_type">
                    <div className="chat_select_company_type_item active">
                      股票推荐
                    </div>
                    <div className="chat_select_company_type_item">
                      行业推荐
                    </div>
                    <div style={{ flexGrow: 1 }} />
                    <img
                      className="chat_select_company_type_reload"
                      src={loadingSVG}
                    />
                  </div>
                  {[
                    { name: "万科A", code: "000002", value: "1705" },
                    { name: "华大基因", code: "300676", value: "227.2" },
                    { name: "中芯国际", code: "688981", value: "3766" },
                  ].map((item) => (
                    <div
                      className="chat_select_company_item"
                      onClick={() => handleSelectCompany(item.code)}
                    >
                      <div className="chat_select_company_item_name">
                        {item.name}
                      </div>
                      <div style={{ flexGrow: 1 }} />
                      <div className="chat_select_company_item_value">
                        总市值 {item.value} 亿
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </animated.div>
        ) : null
      )}
    </div>
  );
}

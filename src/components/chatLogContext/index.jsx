import { createContext } from "react";
import { useChatLog } from "../../utils/chatLog";

export const ChatLogContext = createContext();

export function ChatLogContextProvider({ children }) {
  const chatLogObject = useChatLog();

  return (
    <ChatLogContext.Provider value={ chatLogObject }>
      {children}
    </ChatLogContext.Provider>
  )
}
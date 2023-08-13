import React from 'react';
import ChatLogPanel from '../../components/chatLogPanel';
import { ChatLogContextProvider } from '../../components/chatLogContext';

const Index = () => {
  return <div className="page_chat">
    <ChatLogContextProvider>
      <ChatLogPanel />
    </ChatLogContextProvider>
  </div>
}

export default Index

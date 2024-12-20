import React from 'react';
import { message } from 'antd';
import { MessageInstance } from 'antd/es/message/interface';

export const MessageContext = React.createContext<MessageInstance | null>(null);

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <MessageContext.Provider value={messageApi}>
      {contextHolder}
      {children}
    </MessageContext.Provider>
  );
};
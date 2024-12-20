import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider } from 'antd';
import { MessageProvider } from './providers/MessageProvider';
import App from './App.tsx';
import './index.css';

const theme = {
  token: {
    colorPrimary: '#2563eb',
    borderRadius: 8,
  },
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider theme={theme}>
      <MessageProvider>
        <App />
      </MessageProvider>
    </ConfigProvider>
  </StrictMode>
);
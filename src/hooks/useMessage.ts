import { useContext } from 'react';
import { MessageContext } from '../providers/MessageProvider';

export const useMessage = () => {
  const messageApi = useContext(MessageContext);
  
  if (!messageApi) {
    throw new Error('useMessage must be used within MessageProvider');
  }
  
  return messageApi;
};
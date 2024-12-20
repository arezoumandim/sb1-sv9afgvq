import React from 'react';
import { Card } from 'antd';
import { ShareButtons } from '../../../components/ui/ShareButtons';

interface ShareSectionProps {
  url: string;
}

export const ShareSection: React.FC<ShareSectionProps> = ({ url }) => {
  return (
    <Card title="Share This Video">
      <ShareButtons url={url} />
    </Card>
  );
};
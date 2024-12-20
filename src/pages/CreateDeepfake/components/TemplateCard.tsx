import React from 'react';
import { Card, Button } from 'antd';
import { Play } from 'lucide-react';

interface TemplateCardProps {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  onSelect: (id: string) => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({
  id,
  title,
  thumbnail,
  duration,
  onSelect,
}) => {
  return (
    <Card
      hoverable
      className="h-full"
      cover={
        <div className="relative aspect-video group">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center">
            <Button
              type="primary"
              shape="circle"
              icon={<Play className="w-5 h-5" />}
              className="opacity-0 group-hover:opacity-100 transition-all"
            />
          </div>
        </div>
      }
    >
      <Card.Meta
        title={title}
        description={`Duration: ${duration}`}
      />
      <Button 
        type="primary"
        block
        className="mt-4"
        onClick={() => onSelect(id)}
      >
        Select Template
      </Button>
    </Card>
  );
};
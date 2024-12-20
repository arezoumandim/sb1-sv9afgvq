import React from 'react';
import { Button, Tooltip } from 'antd';
import { 
  Share2, 
  Instagram, 
  Send, 
  MessageCircle,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Download
} from 'lucide-react';
import { useMessage } from '../../hooks/useMessage';

interface ShareButtonsProps {
  url: string;
  title?: string;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ 
  url, 
  title = 'Check out my deepfake video!' 
}) => {
  const message = useMessage();

  const shareButtons = [
    {
      name: 'Instagram',
      icon: <Instagram className="w-5 h-5" />,
      onClick: () => {
        window.open(`instagram://share?url=${encodeURIComponent(url)}`);
      },
    },
    {
      name: 'Telegram',
      icon: <Send className="w-5 h-5" />,
      onClick: () => {
        window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`);
      },
    },
    {
      name: 'WhatsApp',
      icon: <MessageCircle className="w-5 h-5" />,
      onClick: () => {
        window.open(`whatsapp://send?text=${encodeURIComponent(title + ' ' + url)}`);
      },
    },
    {
      name: 'Facebook',
      icon: <Facebook className="w-5 h-5" />,
      onClick: () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
      },
    },
    {
      name: 'Twitter',
      icon: <Twitter className="w-5 h-5" />,
      onClick: () => {
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`);
      },
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-5 h-5" />,
      onClick: () => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
      },
    },
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      message.success('Link copied to clipboard!');
    } catch (error) {
      message.error('Failed to copy link');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {shareButtons.map((button) => (
          <Tooltip key={button.name} title={`Share on ${button.name}`}>
            <Button
              icon={button.icon}
              onClick={button.onClick}
              className="flex items-center justify-center"
            />
          </Tooltip>
        ))}
      </div>
      <div className="flex gap-2">
        <Button 
          block 
          icon={<Copy className="w-5 h-5" />}
          onClick={handleCopyLink}
        >
          Copy Link
        </Button>
        <Button 
          block 
          type="primary"
          icon={<Download className="w-5 h-5" />}
          onClick={() => {/* TODO: Implement download */}}
        >
          Download
        </Button>
      </div>
    </div>
  );
};
import React from 'react';
import { Card, Button, List } from 'antd';
import { Shield, Key, Smartphone } from 'lucide-react';

export const SecuritySettings: React.FC = () => {
  const securityItems = [
    {
      icon: <Key className="w-5 h-5" />,
      title: 'Change Password',
      description: 'Update your password regularly to keep your account secure',
      action: () => {/* TODO: Implement password change */},
    },
    {
      icon: <Smartphone className="w-5 h-5" />,
      title: 'Two-Factor Authentication',
      description: 'Add an extra layer of security to your account',
      action: () => {/* TODO: Implement 2FA */},
    },
  ];

  return (
    <Card
      title={
        <div className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-blue-600" />
          <span>Security Settings</span>
        </div>
      }
    >
      <List
        itemLayout="horizontal"
        dataSource={securityItems}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button key="action" onClick={item.action}>
                Manage
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={<div className="text-gray-600">{item.icon}</div>}
              title={item.title}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};
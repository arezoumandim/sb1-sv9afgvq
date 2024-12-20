import React from 'react';
import { Card, Switch, List } from 'antd';
import { Bell } from 'lucide-react';

export const NotificationSettings: React.FC = () => {
  const notificationItems = [
    {
      title: 'Email Notifications',
      description: 'Receive updates about your deepfake videos via email',
      defaultChecked: true,
    },
    {
      title: 'Processing Updates',
      description: 'Get notified when your video processing status changes',
      defaultChecked: true,
    },
    {
      title: 'Marketing Updates',
      description: 'Receive news about new features and special offers',
      defaultChecked: false,
    },
  ];

  return (
    <Card
      title={
        <div className="flex items-center space-x-2">
          <Bell className="w-5 h-5 text-blue-600" />
          <span>Notification Preferences</span>
        </div>
      }
    >
      <List
        itemLayout="horizontal"
        dataSource={notificationItems}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Switch
                key="switch"
                defaultChecked={item.defaultChecked}
                onChange={(checked) => {
                  // TODO: Implement notification settings update
                }}
              />,
            ]}
          >
            <List.Item.Meta
              title={item.title}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};
import React from 'react';
import { Card, Form, Input, Button, Upload, message } from 'antd';
import { User, Camera } from 'lucide-react';
import type { User as UserType } from '../../../types';

interface ProfileInfoProps {
  user: UserType;
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({ user }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    try {
      // TODO: Implement profile update
      message.success('Profile updated successfully');
    } catch (error) {
      message.error('Failed to update profile');
    }
  };

  return (
    <Card>
      <div className="flex items-center mb-6">
        <div className="relative">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className="w-8 h-8 text-gray-400" />
            )}
          </div>
          <Upload
            showUploadList={false}
            beforeUpload={() => false}
            className="absolute bottom-0 right-0"
          >
            <Button
              type="primary"
              shape="circle"
              size="small"
              icon={<Camera className="w-4 h-4" />}
              className="bg-blue-600"
            />
          </Upload>
        </div>
        <div className="ml-6">
          <h2 className="text-lg font-semibold">{user.fullName || 'User'}</h2>
          <p className="text-gray-500">{user.phone}</p>
        </div>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          fullName: user.fullName,
          email: user.email,
        }}
      >
        <Form.Item
          name="fullName"
          label="Full Name"
          rules={[{ required: true, message: 'Please enter your name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
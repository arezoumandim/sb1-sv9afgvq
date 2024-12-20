import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Video } from 'lucide-react';
import { Form, Input, Button, Card } from 'antd';
import { StepProgress } from '../components/ui/StepProgress';
import { useAuthStore } from '../store/authStore';
import { useMessage } from '../hooks/useMessage';
import { useOtpTimer } from '../hooks/useOtpTimer';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [form] = Form.useForm();
  const login = useAuthStore((state) => state.login);
  const [phone, setPhone] = useState('');
  const message = useMessage();
  const { timeLeft, isActive, startTimer } = useOtpTimer();

  const steps = [
    {
      title: 'Phone Number',
      description: 'Enter your phone number for verification',
    },
    {
      title: 'Verification',
      description: 'Enter the OTP sent to your phone',
    },
  ];

  const handleSubmitPhone = async (values: { phone: string }) => {
    try {
      setPhone(values.phone);
      message.success('Verification code sent!');
      setStep('otp');
      startTimer();
    } catch (error) {
      message.error('Failed to send verification code');
    }
  };

  const handleResendOtp = async () => {
    try {
      // TODO: Implement actual resend OTP API call
      message.success('New verification code sent!');
      startTimer();
    } catch (error) {
      message.error('Failed to resend verification code');
    }
  };

  const handleVerifyOtp = async (values: { otp: string }) => {
    try {
      await login(phone, values.otp);
      message.success('Successfully logged in!');
      navigate('/');
    } catch (error) {
      message.error('Invalid verification code');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Video className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">DeepFake Studio</h1>
          <p className="mt-2 text-gray-600">Create amazing deepfake videos</p>
        </div>

        <StepProgress current={step === 'phone' ? 0 : 1} steps={steps} />

        <Card className="mt-8 shadow-lg">
          {step === 'phone' ? (
            <Form form={form} onFinish={handleSubmitPhone} layout="vertical">
              <Form.Item
                label="Phone Number"
                name="phone"
                rules={[
                  { required: true, message: 'Please enter your phone number' },
                  { pattern: /^\+?[\d\s-]+$/, message: 'Invalid phone number' },
                ]}
              >
                <Input placeholder="+1234567890" size="large" />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  className="bg-gradient-to-r from-blue-600 to-indigo-600"
                >
                  Continue
                </Button>
              </Form.Item>
            </Form>
          ) : (
            <Form form={form} onFinish={handleVerifyOtp} layout="vertical">
              <Form.Item
                label="Verification Code"
                name="otp"
                rules={[
                  { required: true, message: 'Please enter the verification code' },
                  { len: 6, message: 'Please enter a 6-digit code' },
                ]}
              >
                <Input placeholder="Enter 6-digit code" size="large" maxLength={6} />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  className="bg-gradient-to-r from-blue-600 to-indigo-600"
                >
                  Verify
                </Button>
              </Form.Item>
              <div className="text-center">
                <Button
                  type="link"
                  disabled={isActive}
                  onClick={handleResendOtp}
                >
                  {isActive 
                    ? `Resend code in ${timeLeft}s` 
                    : 'Resend verification code'}
                </Button>
              </div>
            </Form>
          )}
        </Card>
      </div>
    </div>
  );
};
import React from 'react';
import { Button } from 'antd';
import { Video, Wand2, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-4 sm:p-8 md:p-12">
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <Video className="w-6 h-6 sm:w-8 sm:h-8" />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">DeepFake Studio</h1>
        </div>

        {/* Main content */}
        <div className="max-w-2xl mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 leading-tight">
            Transform Any Video with AI Magic
          </h2>
          <p className="text-base sm:text-lg text-blue-100 mb-4 sm:mb-6">
            Create stunning deepfake videos in minutes. Choose a template, add your face,
            record audio, and let AI do the magic.
          </p>

          {/* Features */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-6 sm:mb-8">
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <Wand2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-200" />
              <span>AI-Powered</span>
            </div>
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-blue-200" />
              <span>Professional Quality</span>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            type="primary"
            size="large"
            onClick={() => navigate('/create')}
            className="w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-50 border-none h-10 sm:h-12 px-4 sm:px-8 text-base sm:text-lg font-medium"
          >
            Create Your First Video
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {[
            { label: 'Templates', value: '50+' },
            { label: 'Videos Created', value: '10K+' },
            { label: 'Happy Users', value: '5K+' },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-2 sm:p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <div className="text-lg sm:text-2xl font-bold">{stat.value}</div>
              <div className="text-xs sm:text-sm text-blue-200">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent transform rotate-12 translate-x-1/4" />
      </div>
    </div>
  );
};
// Imports remain the same
import React from 'react';
import { ArrowLeft, Clock, Play, Zap, Users, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext.jsx';
import Header from '../components/Header.jsx';

const ComingSoonPage = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const handleBackHome = () => {
    navigate('/');
  };

  const features = [
    {
      icon: Play,
      title: 'Live Streaming',
      description: 'Watch real-time token launches and trading sessions'
    },
    {
      icon: Users,
      title: 'Community Interaction',
      description: 'Chat with streamers and fellow traders in real-time'
    },
    {
      icon: TrendingUp,
      title: 'Market Analysis',
      description: 'Get expert insights and technical analysis live'
    },
    {
      icon: Zap,
      title: 'Instant Trading',
      description: 'Trade directly from the stream interface'
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-700' : 'bg-[#EBEBEB]'}`}>
      <Header />

      <div className="pt-16 md:pt-40 px-4 lg:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className={`inline-flex items-center backdrop-blur-md border rounded-full px-6 py-3 mb-8 transition-colors duration-300 ${
              isDark ? 'bg-[#01DB75]/10 border-[#01DB75]/30' : 'bg-gray-700/10 border-gray-900/30'
            }`}>
              <Clock className={`w-5 h-5 mr-2 ${isDark ? 'text-[#01DB75]' : 'text-pink-400'}`} />
              <span className={`font-medium transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Coming Soon
              </span>
            </div>

            <h1 className={`text-4xl md:text-6xl font-bold mb-6 transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Live Streaming
            </h1>

            <p className={`text-lg md:text-xl mb-8 leading-relaxed max-w-2xl mx-auto transition-colors duration-300 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Experience the future of crypto trading with live streaming. Watch token launches, 
              get real-time analysis, and trade alongside expert streamers.
            </p>

            <div className={`${isDark ? 'text-[#01DB75]' : 'text-pink-400'} font-semibold mb-12 text-lg`}>
              Expected Launch: Q1 2025
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className={`backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 hover:scale-105 ${
                    isDark 
                      ? 'bg-[#01DB75]/5 border-[#01DB75]/20 hover:bg-[#01DB75]/10' 
                      : 'bg-gray-700/5 border-gray-900/20 hover:bg-gray-700/10'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isDark 
                        ? 'bg-gradient-to-br from-[#01DB75] to-[#00b96e]'
                        : 'bg-gradient-to-br from-pink-500 to-pink-600'
                    }`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {feature.title}
                      </h3>
                      <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Preview Section */}
          <div className={`backdrop-blur-md rounded-2xl p-8 border mb-16 transition-colors duration-300 ${
            isDark 
              ? 'bg-[#01DB75]/5 border-[#01DB75]/20' 
              : 'bg-gray-700/5 border-gray-900/20'
          }`}>
            <div className="text-center">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
                isDark 
                  ? 'bg-gradient-to-br from-[#01DB75] to-[#00b96e]' 
                  : 'bg-gradient-to-br from-pink-500 to-purple-600'
              }`}>
                <Play className="w-12 h-12 text-white ml-1" fill="currentColor" />
              </div>
              <h3 className={`text-2xl font-semibold mb-4 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Revolutionary Trading Experience
              </h3>
              <p className={`text-base leading-relaxed max-w-2xl mx-auto transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Our live streaming platform will combine real-time market data, expert analysis, 
                and social trading features to create the ultimate crypto trading experience.
              </p>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className={`backdrop-blur-md rounded-2xl p-8 border mb-16 transition-colors duration-300 ${
            isDark 
              ? 'bg-[#01DB75]/5 border-[#01DB75]/20' 
              : 'bg-gray-700/5 border-gray-900/20'
          }`}>
            <div className="text-center">
              <h3 className={`text-xl font-semibold mb-4 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Get notified when we launch
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={`flex-1 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 ${
                    isDark 
                      ? 'bg-[#01DB75]/10 border-[#01DB75]/30 text-white placeholder-gray-300 focus:ring-[#01DB75]'
                      : 'bg-white/80 border-gray-300 text-gray-900 placeholder-gray-600 focus:ring-pink-400'
                  }`}
                />
                <button className={`rounded-xl px-6 py-3 font-medium transition-all duration-200 hover:scale-105 ${
                  isDark 
                    ? 'bg-[#01DB75] text-black hover:bg-[#00b96e]' 
                    : 'bg-gray-700 text-white hover:bg-gray-800'
                }`}>
                  Notify Me
                </button>
              </div>
            </div>
          </div>

          {/* Back to Home Button */}
          <div className="text-center">
            <button 
              onClick={handleBackHome}
              className={`text-white border-0 rounded-xl px-8 py-3 text-base font-medium flex items-center justify-center mx-auto transition-all duration-200 transform hover:scale-105 ${
                isDark 
                  ? 'bg-gradient-to-r from-[#01DB75] to-[#00b96e] hover:from-[#00b96e] hover:to-[#01a85f]' 
                  : 'bg-gradient-to-r from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700'
              }`}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;

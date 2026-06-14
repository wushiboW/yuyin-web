import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUserStore } from '@stores/userStore';

/**
 * Register Page - 屿音注册页
 * 高奢极简风格
 */
export default function Register() {
  const navigate = useNavigate();
  const { register } = useUserStore();
  const [formData, setFormData] = useState({
    nickname: '',
    phone: '',
    code: '',
    password: '',
    confirmPassword: '',
  });
  const [codeSent, setCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [loading, setLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSendCode = () => {
    if (!formData.phone || formData.phone.length !== 11) return;
    setCodeSent(true);
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCodeSent(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleRegister = async () => {
    if (!agreeTerms) return;
    setLoading(true);
    try {
      await register({
        username: formData.nickname, // 后端用 nickname 作为 username
        email: `${formData.phone}@yuyin.local`, // 后端 email 必填，用手机号生成临时邮箱
        password: formData.password,
        phone: formData.phone,
      });
      navigate('/');
    } catch (error) {
      console.error('Register failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const isPhoneValid = formData.phone.length === 11;
  const isCodeValid = formData.code.length === 6;
  const isPasswordValid = formData.password.length >= 6;
  const isPasswordMatch = formData.password === formData.confirmPassword;
  const isFormValid = formData.nickname && isPhoneValid && isCodeValid && isPasswordValid && isPasswordMatch && agreeTerms;

  return (
    <div className="min-h-screen relative flex bg-[#0a0a0a]">
      {/* 左侧视频区域 */}
      <div className="hidden lg:flex flex-1 relative">
        <video
          src="/videos/login-bg.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'sharpness(1.1) contrast(1.05)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
      </div>

      {/* 右侧表单区域 - 淡雅玻璃质感 */}
      <div className="w-full lg:w-[420px] xl:w-[480px] flex-shrink-0 relative flex items-center justify-center min-h-screen">
        {/* 淡雅背景 */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#141414] to-[#0f0f0f]" />

        {/* 淡灰色半透明遮罩增加层次感 */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent" />

        {/* 返回登录 */}
        <Link
          to="/login"
          className="absolute top-6 left-1/2 -translate-x-1/2 lg:left-auto lg:right-6 lg:translate-x-0 z-20 flex items-center gap-1.5 text-white/40 hover:text-white/70 transition-colors duration-300"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-[11px] tracking-wide">返回登录</span>
        </Link>

        <div className="relative z-10 w-full max-w-[320px] px-4 py-20 lg:py-0">
          {/* Logo与标题 */}
          <div className="mb-8">
            <div className="flex items-center gap-2.5 mb-4">
              <svg
                className="w-8 h-8 text-[#C9A962]"
                viewBox="0 0 32 32"
                fill="none"
              >
                <path d="M6 26L16 8L26 26" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 26L16 16L22 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
              </svg>
              <span
                className="text-lg text-[#C9A962] tracking-[0.08em]"
                style={{ fontFamily: "'Noto Serif SC', serif" }}
              >
                屿音
              </span>
            </div>
            <h1
              className="text-2xl lg:text-3xl text-white/90 mb-1"
              style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 600 }}
            >
              创建账号
            </h1>
            <p className="text-white/30 text-xs tracking-[0.1em]">
              加入屿音，开启品质生活
            </p>
          </div>

          {/* 表单 */}
          <div className="space-y-3">
            <input
              type="text"
              placeholder="昵称"
              value={formData.nickname}
              onChange={(e) => handleChange('nickname', e.target.value)}
              className="w-full h-11 px-3.5 bg-white/[0.04] border border-white/[0.08] text-white/90 placeholder:text-white/25 text-[13px] rounded-lg transition-all duration-300 focus:border-[#C9A962]/50 focus:outline-none focus:bg-white/[0.06]"
            />

            <div className="flex gap-2">
              <input
                type="tel"
                placeholder="手机号"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value.replace(/\D/g, '').slice(0, 11))}
                className="flex-1 h-11 px-3.5 bg-white/[0.04] border border-white/[0.08] text-white/90 placeholder:text-white/25 text-[13px] rounded-lg transition-all duration-300 focus:border-[#C9A962]/50 focus:outline-none focus:bg-white/[0.06]"
              />
              <button
                onClick={handleSendCode}
                disabled={!isPhoneValid || countdown > 0}
                className={`h-11 px-3 text-[11px] rounded-lg transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                  isPhoneValid && countdown === 0
                    ? 'bg-[#C9A962] text-[#0a0a0a] hover:bg-[#C9A962]/90 font-medium'
                    : 'bg-white/[0.04] text-white/25 cursor-not-allowed border border-white/[0.06]'
                }`}
              >
                {countdown > 0 ? `${countdown}s` : codeSent ? '已发送' : '获取验证码'}
              </button>
            </div>

            <input
              type="text"
              placeholder="验证码"
              value={formData.code}
              onChange={(e) => handleChange('code', e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="w-full h-11 px-3.5 bg-white/[0.04] border border-white/[0.08] text-white/90 placeholder:text-white/25 text-[13px] rounded-lg transition-all duration-300 focus:border-[#C9A962]/50 focus:outline-none focus:bg-white/[0.06]"
            />

            <input
              type="password"
              placeholder="设置密码（至少6位）"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              className="w-full h-11 px-3.5 bg-white/[0.04] border border-white/[0.08] text-white/90 placeholder:text-white/25 text-[13px] rounded-lg transition-all duration-300 focus:border-[#C9A962]/50 focus:outline-none focus:bg-white/[0.06]"
            />

            <input
              type="password"
              placeholder="确认密码"
              value={formData.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              className="w-full h-11 px-3.5 bg-white/[0.04] border border-white/[0.08] text-white/90 placeholder:text-white/25 text-[13px] rounded-lg transition-all duration-300 focus:border-[#C9A962]/50 focus:outline-none focus:bg-white/[0.06]"
            />

            {/* 用户协议 */}
            <label className="flex items-center gap-2 cursor-pointer mt-1">
              <div
                onClick={() => setAgreeTerms(!agreeTerms)}
                className={`w-4 h-4 rounded flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                  agreeTerms
                    ? 'bg-[#C9A962] border-[#C9A962]'
                    : 'bg-white/[0.04] border border-white/[0.12] hover:border-white/[0.18]'
                }`}
              >
                {agreeTerms && (
                  <svg className="w-2.5 h-2.5 text-[#0a0a0a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-white/[0.25] text-[11px]">
                我已阅读并同意
                <a href="#" className="text-[#C9A962]/80 hover:text-[#C9A962] hover:underline">《用户协议》</a>
                和
                <a href="#" className="text-[#C9A962]/80 hover:text-[#C9A962] hover:underline">《隐私政策》</a>
              </span>
            </label>

            {/* 注册按钮 */}
            <button
              onClick={handleRegister}
              disabled={!isFormValid || loading}
              className={`w-full h-11 text-[13px] tracking-[0.1em] rounded-lg transition-all duration-300 mt-2 ${
                isFormValid
                  ? 'bg-[#C9A962] text-[#0a0a0a] hover:bg-[#C9A962]/90 font-medium'
                  : 'bg-white/[0.06] text-white/25 cursor-not-allowed'
              }`}
            >
              {loading ? '注册中...' : '注册'}
            </button>
          </div>

          {/* 已有账号 */}
          <p className="text-center text-white/[0.25] text-[11px] mt-6">
            已有账号？
            <Link to="/login" className="text-[#C9A962]/80 hover:text-[#C9A962] hover:underline ml-1">立即登录</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

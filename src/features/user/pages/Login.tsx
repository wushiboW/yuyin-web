import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUserStore } from '@stores/userStore';
import { userApi } from '@api/user';

type LoginMethod = 'sms' | 'password';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useUserStore();

  const [loginMethod, setLoginMethod] = useState<LoginMethod>('sms');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 双视频全屏背景 — 播完一个完整视频后随机切下一个
  const videos = ['/videos/login-bg.mp4', '/videos/login-bg2.mp4'];
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = [useRef<HTMLVideoElement>(null), useRef<HTMLVideoElement>(null)];

  // 首次挂载：随机选一个起始
  useEffect(() => {
    const start = Math.floor(Math.random() * videos.length);
    setActiveIndex(start);
  }, []);

  // 切到 nextIndex：重置 next 视频并播放，同时淡出当前
  const switchTo = (nextIndex: number) => {
    const nextRef = videoRefs[nextIndex].current;
    const curRef = videoRefs[activeIndex].current;
    if (nextRef) {
      nextRef.currentTime = 0;
      nextRef.play().catch(() => {});
    }
    if (curRef && curRef !== nextRef) {
      curRef.pause();
    }
    setActiveIndex(nextIndex);
  };

  // 视频自然播完 → 随机选另一个
  const handleVideoEnded = (finishedIndex: number) => {
    const others = videos.map((_, i) => i).filter((i) => i !== finishedIndex);
    const next = others[Math.floor(Math.random() * others.length)];
    switchTo(next);
  };

  // 发送验证码
  const handleSendCode = async () => {
    if (!phone || phone.length !== 11) return;
    setLoading(true);
    try {
      await userApi.sendSmsCode(phone, 'login');
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
    } catch {
      setError('验证码发送失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  // 第三方登录
  const handleThirdPartyLogin = async (provider: string) => {
    setLoading(true);
    setError(null);
    try {
      // 第三方登录后端 OAuth 回调，暂时用 identifier 作为 provider 名称
      await userApi.bindSocial(provider, provider);
      navigate('/');
    } catch {
      setError('第三方登录失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  // 登录提交
  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      if (loginMethod === 'sms') {
        if (!isPhoneValid || !isCodeValid) {
          setError('请填写完整的登录信息');
          setLoading(false);
          return;
        }
        // 短信验证码登录：先校验验证码，再用手机号+验证码登录
        await userApi.verifySmsCode(phone, 'login', code);
        await login(phone, code);
      } else {
        if (!isPasswordValid) {
          setError('请填写完整的登录信息');
          setLoading(false);
          return;
        }
        await login(account, password);
      }
      navigate('/');
    } catch {
      setError('登录失败，请检查账号密码');
    } finally {
      setLoading(false);
    }
  };

  const isPhoneValid = phone.length === 11;
  const isCodeValid = code.length === 6;
  const isPasswordValid = account.trim().length > 0 && password.length >= 6;
  const isFormValid =
    loginMethod === 'sms' ? isPhoneValid && isCodeValid : isPasswordValid;

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* ========== 全屏视频背景 ========== */}
      <div className="absolute inset-0">
        <video
          ref={videoRefs[0]}
          src={videos[0]}
          autoPlay
          muted
          loop={false}
          playsInline
          onEnded={() => handleVideoEnded(0)}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{ opacity: activeIndex === 0 ? 1 : 0 }}
        />
        <video
          ref={videoRefs[1]}
          src={videos[1]}
          autoPlay
          muted
          loop={false}
          playsInline
          onEnded={() => handleVideoEnded(1)}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{ opacity: activeIndex === 1 ? 1 : 0 }}
        />

        {/* 视频渐变遮罩 */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-black/70" />
      </div>

      {/* ========== 浮动登录面板 ========== */}
      <div className="absolute right-0 top-0 h-full w-full lg:w-[440px] xl:w-[500px]
                    bg-gradient-to-b from-white/[0.08] via-white/[0.04] to-white/[0.08]
                    backdrop-blur-3xl border-l border-white/[0.15] flex items-center justify-center">
        {/* 返回首页 */}
        <Link
          to="/"
          className="absolute top-6 left-1/2 -translate-x-1/2 lg:left-auto lg:right-6 lg:translate-x-0 z-20 
                   flex items-center gap-1.5 text-white/50 hover:text-[#C9A962] transition-all duration-300"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-[11px] tracking-wide">返回首页</span>
        </Link>

        <div className="relative z-10 w-full max-w-[340px] px-6 py-20 lg:py-0">
          {/* Logo 与标题 */}
          <div className="mb-8">
            <div className="flex items-center gap-2.5 mb-4">
              <svg className="w-8 h-8 text-[#C9A962]" viewBox="0 0 32 32" fill="none">
                <path d="M6 26L16 8L26 26" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10 26L16 16L22 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
              </svg>
              <span className="text-lg text-[#C9A962] tracking-[0.08em]" style={{ fontFamily: "'Noto Serif SC', serif" }}>
                屿音
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl text-white/90 mb-1" style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 600 }}>
              欢迎回来
            </h1>
            <p className="text-white/40 text-xs tracking-[0.1em]">登录屿音，探索生活之美</p>
          </div>

          {/* 错误提示 */}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs backdrop-blur-sm">
              {error}
            </div>
          )}

          {/* 登录方式切换 */}
          <div className="flex gap-0.5 mb-6 p-0.5 bg-white/[0.03] rounded-lg border border-white/[0.06]">
            <button
              onClick={() => setLoginMethod('sms')}
              className={`flex-1 py-2 rounded-md text-xs transition-all duration-300 ${
                loginMethod === 'sms'
                  ? 'bg-[#C9A962] text-black font-medium shadow-lg shadow-[#C9A962]/20'
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              短信登录
            </button>
            <button
              onClick={() => setLoginMethod('password')}
              className={`flex-1 py-2 rounded-md text-xs transition-all duration-300 ${
                loginMethod === 'password'
                  ? 'bg-[#C9A962] text-black font-medium shadow-lg shadow-[#C9A962]/20'
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              密码登录
            </button>
          </div>

          {/* 表单 */}
          <div className="space-y-3">
            {loginMethod === 'sms' ? (
              <>
                <input
                  type="tel"
                  placeholder="手机号"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 11))}
                  className="w-full h-11 px-3.5 bg-white/[0.06] border border-white/[0.10] 
                           text-white/90 placeholder:text-white/30 text-[13px] rounded-lg 
                           focus:border-[#C9A962]/60 focus:outline-none focus:ring-1 focus:ring-[#C9A962]/30 transition-all"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="验证码"
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="flex-1 h-11 px-3.5 bg-white/[0.06] border border-white/[0.10] 
                             text-white/90 placeholder:text-white/30 text-[13px] rounded-lg 
                             focus:border-[#C9A962]/60 focus:outline-none focus:ring-1 focus:ring-[#C9A962]/30 transition-all"
                  />
                  <button
                    onClick={handleSendCode}
                    disabled={!isPhoneValid || countdown > 0}
                    className={`h-11 px-3 text-[11px] rounded-lg whitespace-nowrap flex-shrink-0 transition-all ${
                      isPhoneValid && countdown === 0
                        ? 'bg-[#C9A962] text-black hover:bg-[#C9A962]/90 font-medium shadow-md'
                        : 'bg-white/[0.06] text-white/30 cursor-not-allowed border border-white/[0.08]'
                    }`}
                  >
                    {countdown > 0 ? `${countdown}s` : codeSent ? '已发送' : '获取验证码'}
                  </button>
                </div>
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="手机号 / 邮箱"
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  className="w-full h-11 px-3.5 bg-white/[0.06] border border-white/[0.10] 
                           text-white/90 placeholder:text-white/30 text-[13px] rounded-lg 
                           focus:border-[#C9A962]/60 focus:outline-none focus:ring-1 focus:ring-[#C9A962]/30 transition-all"
                />
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="密码"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-11 px-3.5 pr-10 bg-white/[0.06] border border-white/[0.10] 
                             text-white/90 placeholder:text-white/30 text-[13px] rounded-lg 
                             focus:border-[#C9A962]/60 focus:outline-none focus:ring-1 focus:ring-[#C9A962]/30 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                  >
                    {showPassword ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </>
            )}

            {/* 登录按钮 */}
            <button
              onClick={handleLogin}
              disabled={!isFormValid || loading}
              className={`w-full h-11 text-[13px] tracking-[0.1em] rounded-lg mt-2 transition-all ${
                isFormValid && !loading
                  ? 'bg-[#C9A962] text-black hover:bg-[#C9A962]/90 font-medium shadow-lg shadow-[#C9A962]/20 active:scale-[0.98]'
                  : 'bg-white/[0.06] text-white/30 cursor-not-allowed'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  登录中...
                </span>
              ) : (
                '登录'
              )}
            </button>
          </div>

          {/* ========== 第三方登录（图标已修复为官方样式） ========== */}
          <div className="mt-6">
            <div className="flex items-center gap-2.5">
              <div className="flex-1 h-px bg-white/[0.08]" />
              <span className="text-white/[0.30] text-[10px] tracking-wider select-none">其他方式登录</span>
              <div className="flex-1 h-px bg-white/[0.08]" />
            </div>
            <div className="flex items-center justify-center gap-5 mt-4">
              {/* 微信 - 标准气泡图标 */}
              <button
                onClick={() => handleThirdPartyLogin('wechat')}
                className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.10] 
                         hover:bg-white/[0.10] hover:border-[#07C160]/40 flex items-center justify-center 
                         transition-all duration-200 active:scale-95"
                title="微信登录"
              >
                <svg className="w-5 h-5 text-[#07C160]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.69 11.52c-1.12 0-2.03-.91-2.03-2.03 0-1.12.91-2.03 2.03-2.03 1.12 0 2.03.91 2.03 2.03 0 1.12-.91 2.03-2.03 2.03zm6.94 0c-1.12 0-2.03-.91-2.03-2.03 0-1.12.91-2.03 2.03-2.03 1.12 0 2.03.91 2.03 2.03 0 1.12-.91 2.03-2.03 2.03zm-5.87 4.19c-1.08.64-2.42.99-3.8.99-4.15 0-7.49-3.07-7.49-6.88 0-3.81 3.34-6.88 7.49-6.88 4.15 0 7.49 3.07 7.49 6.88 0 1.47-.46 2.85-1.26 3.99l-.03.04c.09.31.17.63.17.94 0 2.34-2.34 4.24-5.22 4.24-.51 0-1.01-.07-1.5-.18l-.26-.08.41-1.28zm7.03-7.21c-.41 0-.75-.34-.75-.75s.34-.75.75-.75.75.34.75.75-.34.75-.75.75zm-3.47 2.42c-.41 0-.75-.34-.75-.75s.34-.75.75-.75.75.34.75.75-.34.75-.75.75z"/>
                </svg>
              </button>

              {/* 小红书 */}
              <button
                onClick={() => handleThirdPartyLogin('xiaohongshu')}
                className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.10]
                         hover:bg-white/[0.10] hover:border-[#FF2442]/40 flex items-center justify-center
                         transition-all duration-200 active:scale-95"
                title="小红书登录"
              >
                <svg className="w-5 h-5 text-[#FF2442]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5.57 3.8C5.34 3.93 5.12 4.08 4.92 4.27c-.2.2-.35.42-.47.66-.12.24-.2.49-.25.74L2.3 17.72c-.1.53.27 1.03.8 1.03h.17c.33 0 .62-.17.77-.45l1.87-3.74c.05-.11.13-.2.22-.28l4.55-4.55c.08-.08.17-.16.28-.22l.4-.2c.21-.1.34-.32.34-.55V3.97c0-.44-.36-.8-.8-.8-.23 0-.46.09-.62.25l-.17.17c-.16.17-.27.38-.3.61zM9.45 9.85c-.18.18-.29.42-.29.68s.11.5.29.68l.72.72c.18.18.42.29.68.29s.5-.11.68-.29l5.45-5.45c.18-.18.29-.42.29-.68s-.11-.5-.29-.68l-.72-.72c-.18-.18-.42-.29-.68-.29s-.5.11-.68.29l-5.45 5.45z"/>
                </svg>
              </button>

              {/* 抖音 - 优化颜色 */}
              <button
                onClick={() => handleThirdPartyLogin('douyin')}
                className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.10] 
                         hover:bg-white/[0.10] hover:border-white/30 flex items-center justify-center 
                         transition-all duration-200 active:scale-95"
                title="抖音登录"
              >
                <svg className="w-5 h-5 text-white/90" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.2 8.2 0 004.78 2.16V7.02a4.83 4.83 0 01-1-.33z" />
                </svg>
              </button>
            </div>
          </div>

          {/* 注册链接 */}
          <p className="text-center text-white/[0.25] text-[11px] mt-6">
            还没有账号？
            <Link
              to="/register"
              className="text-[#C9A962]/80 hover:text-[#C9A962] hover:underline ml-1 transition-colors"
            >
              立即注册
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
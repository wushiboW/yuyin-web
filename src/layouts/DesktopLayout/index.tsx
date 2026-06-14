import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Avatar } from '@components/Avatar';
import { useUserStore } from '@stores/userStore';
import { useNavbar } from '@contexts/NavbarContext';

interface DesktopLayoutProps {
  children: React.ReactNode;
}

/**
 * DesktopLayout - 桌面端布局
 * PlanE 高奢极简风格，固定顶部导航 + 中心内容区
 */
export function DesktopLayout({ children }: DesktopLayoutProps) {
  const location = useLocation();
  const { user, isLoggedIn, logout } = useUserStore();
  const { isAtTop, isDark, toggleTheme } = useNavbar();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // 判断当前页面是否有深色hero背景需要透明导航
  // 空山物语(商品列表)页面没有深色hero，需要始终显示导航背景
  const shouldBeTransparentAllowed = location.pathname === '/';
  const shouldBeTransparent = isAtTop && shouldBeTransparentAllowed;
  // Unified dark mode flag to reduce repeated conditionals
  const isDarkMode = shouldBeTransparent || isDark;

  const navItems = [
    { path: '/', label: '推荐' },
    { path: '/product', label: '空山物语' },
    { path: '/about', label: '怦然心动' },
    { path: '/brand', label: '晓屿识音' },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Single source for nav colors
  const navTextColor = isDarkMode ? 'text-white' : 'text-ink-black';
  const iconColor = isDarkMode ? 'text-white' : 'text-ink-black';
  const navTextHoverColor = 'hover:text-[#C9A962]';
  const navActiveColor = 'text-[#C9A962]';

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    setIsDropdownOpen(false);

    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isDropdownOpen]);

  return (
    <div className="min-h-screen bg-moon-white dark:bg-ink-black">
      {/* Header - 全宽导航栏 */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full h-16 transition-all duration-500 ${
          shouldBeTransparent
            ? 'bg-transparent backdrop-blur-none'
            : 'bg-moon-white/30 dark:bg-ink-black/30 backdrop-blur-xl'
        }`}
      >
        {/* 全宽flex布局 */}
        <div className="relative w-full h-full flex items-center">
          {/* Logo区域 - 左对齐 */}
          <div className="flex items-center gap-4 pl-8 sm:pl-12 md:pl-16 lg:pl-24">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
              {/* 品牌图标 - 金色山峦线条 */}
              <svg
                className="w-8 h-8 sm:w-9 sm:h-9 text-[#C9A962] transition-all duration-300 group-hover:scale-110"
                viewBox="0 0 32 32"
                fill="none"
              >
                <path d="M6 26L16 8L26 26" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 26L16 16L22 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
              </svg>
              <span
                className="text-xl sm:text-2xl font-medium text-[#C9A962] tracking-[0.08em]"
                style={{ fontFamily: "'Noto Serif SC', serif" }}
              >
                屿音
              </span>
            </Link>

            {/* Navigation - 全部显示，当前页金色，其他白色，悬停金色 */}
            <nav className="hidden lg:flex items-center gap-1 ml-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium tracking-[0.06em] px-4 py-2 transition-all duration-300 ${
                    isActive(item.path)
                      ? navActiveColor
                      : `${navTextColor} ${navTextHoverColor}`
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right section - 绝对定位到最右侧，贴近浏览器边缘 */}
          <div
            className="absolute right-0 flex items-center gap-1 pr-4 sm:pr-6 md:pr-8 lg:pr-12"
          >
            {/* 搜索图标 */}
            <button
              className={`p-3 transition-all duration-300 rounded-full ${iconColor} ${navTextHoverColor}`}
              title="搜索"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* 分隔线 */}
            <div className={`w-px h-5 mx-1 ${shouldBeTransparent ? 'bg-white/20' : 'bg-ink-black/20 dark:bg-white/20'}`} />

            {/* 登录项或用户头像 */}
            {isLoggedIn && user ? (
              <div
                className="relative"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button
                  className="flex items-center p-1 transition-all duration-300 rounded-full hover:bg-white/10"
                  aria-label="用户菜单"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.nickname || '用户'}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <Avatar size="sm" />
                  )}
                </button>

                {/* 下拉菜单 */}
                {isDropdownOpen && (
                  <div
                    className={`absolute right-0 top-full mt-2 w-52 py-2 rounded-xl shadow-xl border transition-all duration-200 ${
                      isDarkMode
                        ? 'bg-ink-black/95 backdrop-blur-xl border-white/10 text-white'
                        : 'bg-moon-white/95 backdrop-blur-xl border-light-gray/30 text-ink-black'
                    }`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* 用户信息 */}
                    <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-white/10' : 'border-light-gray/20'}`}>
                      <p className="text-sm font-medium truncate">
                        {user.nickname || user.phone || '用户'}
                      </p>
                      <p className="text-xs text-white/40 dark:text-ink-black/50 mt-0.5 truncate">
                        {user.phone || user.email || ''}
                      </p>
                    </div>

                    <Link
                      to="/user"
                      className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-200 ${
                        isDarkMode
                          ? 'hover:bg-white/10'
                          : 'hover:bg-[#C9A962]/10 hover:text-[#C9A962]'
                      }`}
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      用户中心
                    </Link>
                    <Link
                      to="/user/assets"
                      className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-200 ${
                        isDarkMode
                          ? 'hover:bg-white/10'
                          : 'hover:bg-[#C9A962]/10 hover:text-[#C9A962]'
                      }`}
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      账户资产
                    </Link>
                    <Link
                      to="/user/orders"
                      className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-200 ${
                        isDarkMode
                          ? 'hover:bg-white/10'
                          : 'hover:bg-[#C9A962]/10 hover:text-[#C9A962]'
                      }`}
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      采购清单
                    </Link>

                    <div className={`my-1 mx-3 h-px ${isDarkMode ? 'bg-white/10' : 'bg-light-gray/30'}`} />

                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className={`flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm transition-colors duration-200 ${
                        isDarkMode
                          ? 'hover:bg-white/10 text-white/70'
                          : 'hover:bg-red-50 text-red-600'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      {isLoggingOut ? '退出中...' : '退出登录'}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-5 py-2.5 text-sm text-[#C9A962] border border-[#C9A962]/30 hover:border-[#C9A962] hover:bg-[#C9A962]/10 transition-all duration-300 rounded-full"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>登录</span>
              </Link>
            )}

            {/* 语言切换 */}
            <button
              className={`p-3 transition-all duration-300 rounded-full ${iconColor} ${navTextHoverColor}`}
              title="语言切换"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
            </button>

            {/* 主题切换 */}
            <button
              onClick={toggleTheme}
              className={`p-3 transition-all duration-300 rounded-full ${iconColor} ${navTextHoverColor}`}
              title={isDark ? '切换浅色模式' : '切换深色模式'}
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content - 根据滚动状态动态调整padding */}
      <main className={`w-full transition-all duration-300 ${
        isAtTop ? 'pt-0' : 'pt-14 sm:pt-16'
      }`}>
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-light-gray/30 dark:border-white/10 mt-auto">
        <div className="w-full max-w-[1600px] mx-auto px-8 sm:px-12 md:px-16 lg:px-20 py-10 sm:py-14">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-warm-gray dark:text-white/50">
            <p className="tracking-[0.05em]">© 2024 屿音电商. 保留所有权利.</p>
            <div className="flex items-center gap-8">
              <a href="#" className="hover:text-ink-black dark:hover:text-[#C9A962] transition-colors duration-300 tracking-[0.05em]">关于我们</a>
              <a href="#" className="hover:text-ink-black dark:hover:text-[#C9A962] transition-colors duration-300 tracking-[0.05em]">联系客服</a>
              <a href="#" className="hover:text-ink-black dark:hover:text-[#C9A962] transition-colors duration-300 tracking-[0.05em]">隐私政策</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default DesktopLayout;

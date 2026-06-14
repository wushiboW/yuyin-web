import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface NavbarContextValue {
  isAtTop: boolean;
  isTransparent: boolean;
  isDark: boolean;
  themeMode: 'light' | 'dark';
  toggleTheme: () => void;
}

const NavbarContext = createContext<NavbarContextValue | null>(null);

// 判断当前系统主题
function getSystemTheme(): 'light' | 'dark' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function NavbarProvider({ children }: { children: ReactNode }) {
  const [isAtTop, setIsAtTop] = useState(true);
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>(() => {
    // 有手动保存的主题时，使用保存值（但会因系统变化而重置）
    const saved = localStorage.getItem('yuyin-theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return getSystemTheme();
  });

  const isDark = themeMode === 'dark';
  const isTransparent = isAtTop;

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY <= 10);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 监听系统主题变化：一旦系统主题改变，自动清除手动设置，恢复跟随系统
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemThemeChange = () => {
      const hasManualSetting = localStorage.getItem('yuyin-theme');
      if (hasManualSetting) {
        // 系统主题变化了，清除手动设置，恢复跟随系统
        localStorage.removeItem('yuyin-theme');
        setThemeMode(getSystemTheme());
      }
    };

    // 使用 addEventListener（现代浏览器）
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemThemeChange);
      return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
    } else {
      // 兼容旧版 Safari
      mediaQuery.addListener(handleSystemThemeChange);
      return () => mediaQuery.removeListener(handleSystemThemeChange);
    }
  }, []);

  // 应用主题到 html 元素
  useEffect(() => {
    const html = document.documentElement;
    if (themeMode === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    // 始终保持 localStorage 同步（手动设置或系统主题）
    localStorage.setItem('yuyin-theme', themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode(current => current === 'dark' ? 'light' : 'dark');
  };

  return (
    <NavbarContext.Provider value={{ isAtTop, isTransparent, isDark, themeMode, toggleTheme }}>
      {children}
    </NavbarContext.Provider>
  );
}

export function useNavbar() {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error('useNavbar must be used within NavbarProvider');
  }
  return context;
}
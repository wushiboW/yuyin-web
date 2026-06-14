/**
 * AuthLayout - 认证页面专用布局（无导航栏）
 * 用于登录、注册等不需要顶部导航的页面
 */
export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-moon-white dark:bg-ink-black">
      {children}
    </div>
  );
}
import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { DesktopLayout } from './layouts/DesktopLayout';
import { MobileLayout } from './layouts/MobileLayout';
import { MiniProgramLayout } from './layouts/MiniProgramLayout/MiniProgramLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { Spinner } from './components';
import { useDeviceDetect } from './hooks/useDeviceDetect';

const Home = lazy(() => import('./features/product/pages/Home'));
const ProductList = lazy(() => import('./features/product/pages/ProductList'));
const ProductDetail = lazy(() => import('./features/product/pages/ProductDetail'));
const Cart = lazy(() => import('./features/cart/pages/Cart'));
const Checkout = lazy(() => import('./features/cart/pages/Checkout'));
const OrderList = lazy(() => import('./features/order/pages/OrderList'));
const OrderDetail = lazy(() => import('./features/order/pages/OrderDetail'));
const UserProfile = lazy(() => import('./features/user/pages/Profile'));
const Login = lazy(() => import('./features/user/pages/Login'));
const Register = lazy(() => import('./features/user/pages/Register'));
const Brand = lazy(() => import('./features/marketing/pages/Brand'));
const About = lazy(() => import('./features/marketing/pages/About'));
const BrandStory = lazy(() => import('./features/marketing/pages/brand/Story'));
const BrandVision = lazy(() => import('./features/marketing/pages/brand/Vision'));
const BrandValues = lazy(() => import('./features/marketing/pages/brand/Values'));
const ProductInquiry = lazy(() => import('./features/service/pages/ProductInquiry'));
const AfterSale = lazy(() => import('./features/service/pages/AfterSale'));
const OnlineChat = lazy(() => import('./features/service/pages/OnlineChat'));
const HelpCenter = lazy(() => import('./features/service/pages/HelpCenter'));

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spinner size="lg" />
    </div>
  );
}

function AppContent() {
  const { isMobile, isMiniProgram } = useDeviceDetect();

  // 认证页面路径
  const authPaths = ['/login', '/register'];

  // 小程序使用独立布局
  if (isMiniProgram) {
    return (
      <MiniProgramLayout>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order" element={<OrderList />} />
            <Route path="/order/:id" element={<OrderDetail />} />
            <Route path="/user" element={<UserProfile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/brand" element={<Brand />} />
            <Route path="/brand/story" element={<BrandStory />} />
            <Route path="/brand/vision" element={<BrandVision />} />
            <Route path="/brand/values" element={<BrandValues />} />
            <Route path="/about" element={<About />} />
            <Route path="/service/product" element={<ProductInquiry />} />
            <Route path="/service/after-sale" element={<AfterSale />} />
            <Route path="/service/chat" element={<OnlineChat />} />
            <Route path="/service/help" element={<HelpCenter />} />
          </Routes>
        </Suspense>
      </MiniProgramLayout>
    );
  }

  // 移动端使用独立布局
  if (isMobile) {
    return (
      <MobileLayout>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order" element={<OrderList />} />
            <Route path="/order/:id" element={<OrderDetail />} />
            <Route path="/user" element={<UserProfile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/brand" element={<Brand />} />
            <Route path="/brand/story" element={<BrandStory />} />
            <Route path="/brand/vision" element={<BrandVision />} />
            <Route path="/brand/values" element={<BrandValues />} />
            <Route path="/about" element={<About />} />
            <Route path="/service/product" element={<ProductInquiry />} />
            <Route path="/service/after-sale" element={<AfterSale />} />
            <Route path="/service/chat" element={<OnlineChat />} />
            <Route path="/service/help" element={<HelpCenter />} />
          </Routes>
        </Suspense>
      </MobileLayout>
    );
  }

  // 桌面端：认证页使用无导航栏布局，其他页面使用桌面布局
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* 认证页面 - 无导航栏 */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 常规页面 - 有导航栏 */}
        <Route path="/*" element={
          <DesktopLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order" element={<OrderList />} />
              <Route path="/order/:id" element={<OrderDetail />} />
              <Route path="/user" element={<UserProfile />} />
              <Route path="/brand" element={<Brand />} />
              <Route path="/brand/story" element={<BrandStory />} />
              <Route path="/brand/vision" element={<BrandVision />} />
              <Route path="/brand/values" element={<BrandValues />} />
              <Route path="/about" element={<About />} />
              <Route path="/service/product" element={<ProductInquiry />} />
              <Route path="/service/after-sale" element={<AfterSale />} />
              <Route path="/service/chat" element={<OnlineChat />} />
              <Route path="/service/help" element={<HelpCenter />} />
            </Routes>
          </DesktopLayout>
        } />
      </Routes>
    </Suspense>
  );
}

export default function App() {
  return <AppContent />;
}
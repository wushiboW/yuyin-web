import { Link } from 'react-router-dom';

/**
 * 商品咨询页面
 */
export default function ProductInquiry() {
  return (
    <div className="min-h-screen bg-moon-white dark:bg-ink-black pt-20">
      <div className="max-w-[1400px] mx-auto px-8 sm:px-12 md:px-16 lg:px-20 py-16 sm:py-20">
        <div className="text-center mb-12">
          <p className="text-gold-sand text-xs sm:text-sm tracking-[0.3em] uppercase mb-4">Product Inquiry</p>
          <h1 className="text-3xl sm:text-4xl text-ink-black dark:text-moon-white" style={{ fontFamily: "'Noto Serif SC', serif" }}>
            商品咨询
          </h1>
        </div>
        <div className="text-center py-20">
          <p className="text-warm-gray dark:text-white/60 mb-8">产品材质、尺寸、库存等问题</p>
          <Link to="/brand" className="text-gold-sand hover:underline">返回晓屿识音</Link>
        </div>
      </div>
    </div>
  );
}
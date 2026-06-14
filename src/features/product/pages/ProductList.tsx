import { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * 商品数据 - 32个商品，支持分页展示
 */
const allProducts = [
  { id: 1, name: '云逸沙发', price: 12800, category: '家居', isNew: true, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80' },
  { id: 2, name: '静谧长椅', price: 6800, category: '家居', isNew: false, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80' },
  { id: 3, name: '竹韵茶几', price: 4200, category: '家居', isNew: true, image: 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=800&q=80' },
  { id: 4, name: '时光书架', price: 8800, category: '家居', isNew: false, image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&q=80' },
  { id: 5, name: '悠然屏风', price: 5600, category: '家居', isNew: false, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80' },
  { id: 6, name: '禅意花瓶', price: 1200, category: '配饰', isNew: true, image: 'https://images.unsplash.com/photo-1602164925666-21415a2dd1b7?w=800&q=80' },
  { id: 7, name: '木语边柜', price: 7500, category: '家居', isNew: false, image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80' },
  { id: 8, name: '雅致落地灯', price: 2800, category: '配饰', isNew: true, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80' },
  { id: 9, name: '云纹抱枕', price: 680, category: '配饰', isNew: false, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80' },
  { id: 10, name: '山影挂画', price: 3200, category: '配饰', isNew: true, image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=80' },
  { id: 11, name: '棉麻床品套装', price: 4200, category: '家居', isNew: false, image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80' },
  { id: 12, name: '实木餐椅', price: 2400, category: '家居', isNew: true, image: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=800&q=80' },
  { id: 13, name: '藤编收纳篮', price: 380, category: '配饰', isNew: false, image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80' },
  { id: 14, name: '极简壁挂架', price: 1600, category: '家居', isNew: false, image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=800&q=80' },
  { id: 15, name: '羊绒毯', price: 2800, category: '配饰', isNew: true, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80' },
  { id: 16, name: '陶瓷餐具套装', price: 1800, category: '配饰', isNew: false, image: 'https://images.unsplash.com/photo-1603199506016-b9a594b593c0?w=800&q=80' },
  { id: 17, name: '水墨装饰画', price: 2600, category: '配饰', isNew: true, image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=80' },
  { id: 18, name: '胡桃木餐桌', price: 16800, category: '家居', isNew: false, image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80' },
  { id: 19, name: '手工香薰烛', price: 280, category: '配饰', isNew: false, image: 'https://images.unsplash.com/photo-1602607943728-54a0e5afe8e8?w=800&q=80' },
  { id: 20, name: '棉麻窗帘', price: 1200, category: '家居', isNew: true, image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&q=80' },
  { id: 21, name: '极简边几', price: 3200, category: '家居', isNew: false, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80' },
  { id: 22, name: '艺术雕塑摆件', price: 4800, category: '配饰', isNew: true, image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800&q=80' },
  { id: 23, name: '亚麻抱枕套', price: 320, category: '配饰', isNew: false, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80' },
  { id: 24, name: '黑胡桃木床', price: 22800, category: '家居', isNew: false, image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80' },
  { id: 25, name: '创意壁灯', price: 980, category: '配饰', isNew: true, image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=800&q=80' },
  { id: 26, name: '慢回弹坐垫', price: 480, category: '配饰', isNew: false, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80' },
  { id: 27, name: '榉木衣架', price: 680, category: '家居', isNew: false, image: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=800&q=80' },
  { id: 28, name: '釉下彩茶具', price: 1680, category: '配饰', isNew: true, image: 'https://images.unsplash.com/photo-1603204077779-bed963ea7d0e?w=800&q=80' },
  { id: 29, name: '布艺收纳盒', price: 260, category: '配饰', isNew: false, image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80' },
  { id: 30, name: '极简书桌', price: 5800, category: '家居', isNew: false, image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80' },
  { id: 31, name: '黄铜花器', price: 880, category: '配饰', isNew: true, image: 'https://images.unsplash.com/photo-1602164925666-21415a2dd1b7?w=800&q=80' },
  { id: 32, name: '羊毛毡地垫', price: 680, category: '配饰', isNew: false, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80' },
];

const categories = ['全部', '家居', '服饰', '配饰', '生活方式'];
const PAGE_SIZE = 12;

function formatPrice(price: number): string {
  return `¥${price.toLocaleString()}`;
}

/**
 * ProductList Page - 空山物语商品展示页
 * 遵循 CLAUDE.md 规范：
 * - 高奢极简风格：墨黑/月白/金砂/竹青/楮色/暖灰/浅灰色彩系统
 * - 响应式网格：桌面4列、平板3列、移动2列
 * - 极简商品卡片：图片+名称+价格
 * - 8pt网格间距系统
 * - 大量留白，呼吸感布局
 */
export default function ProductList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('全部');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === '全部' || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // 分页计算
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // 筛选变化时重置页码
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-moon-white dark:bg-ink-black">
      {/* 页面标题区域 */}
      <div className="pt-20 sm:pt-24 pb-10 sm:pb-14">
        <div className="max-w-[1600px] mx-auto px-8 sm:px-12 md:px-16 lg:px-20">
          <p className="text-warm-gray text-[11px] sm:text-xs tracking-[0.35em] uppercase mb-3 sm:mb-4">
            Collections
          </p>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl text-ink-black dark:text-moon-white mb-8 sm:mb-12"
            style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 600 }}
          >
            精选商品
          </h1>

          {/* 搜索与筛选栏 */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start lg:items-center">
            {/* 搜索框 */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="搜索商品..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-4 pr-12 bg-transparent border-b border-ink-black/20 dark:border-white/20 text-ink-black dark:text-moon-white placeholder-warm-gray/60 dark:placeholder-moon-white/60 text-sm focus:outline-none focus:border-ink-black dark:focus:border-moon-white transition-colors duration-300"
              />
              <svg
                className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray/60 dark:text-moon-white/60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* 分类筛选 */}
            <div className="flex gap-6 sm:gap-8 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`relative text-sm tracking-wide transition-all duration-300 pb-1 ${
                    activeCategory === category
                      ? 'text-ink-black dark:text-moon-white font-medium'
                      : 'text-warm-gray/70 dark:text-moon-white/70 hover:text-ink-black dark:hover:text-moon-white'
                  }`}
                >
                  {category}
                  {activeCategory === category && (
                    <span className="absolute bottom-0 left-0 right-0 h-px bg-ink-black dark:bg-moon-white" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 商品网格区域 */}
      <div className="w-full px-8 sm:px-12 md:px-16 lg:px-20 pb-16 sm:pb-24">
        {/* 商品网格 - 桌面4列，填满宽度 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-12">
          {currentProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group block"
            >
              {/* 商品图片 - 更大的卡片，图片占据80%+空间 */}
              <div className="relative aspect-[4/5] overflow-hidden bg-light-gray/20 dark:bg-white/10 mb-5 sm:mb-7 shadow-sm group-hover:shadow-xl transition-all duration-500">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                {/* 悬停视频层 - 演示用，实际产品视频URL接入后启用 */}
                <video
                  src={product.image.replace('w=800', 'w=400')}
                  poster={product.image}
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                {product.isNew && (
                  <span className="absolute top-3.5 left-3.5 px-2.5 py-1 bg-gold-sand/95 backdrop-blur-sm text-moon-white text-[10px] tracking-[0.2em] uppercase font-medium">
                    New
                  </span>
                )}
                {/* 悬停遮罩层 */}
                <div className="absolute inset-0 bg-ink-black/0 group-hover:bg-ink-black/30 dark:bg-moon-white/0 group-hover:dark:bg-moon-white/20 transition-all duration-500" />

                {/* 悬停操作按钮 */}
                <div className="absolute inset-x-4 bottom-4 flex gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); /* 加入购物车逻辑 */ }}
                    className="flex-1 py-3 bg-moon-white/95 dark:bg-ink-black/95 backdrop-blur-sm text-ink-black dark:text-moon-white text-sm tracking-wide hover:bg-moon-white dark:hover:bg-ink-black transition-colors duration-300"
                  >
                    加入购物车
                  </button>
                  <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                    className="w-12 py-3 bg-[#C9A962] hover:bg-[#C9A962]/90 text-ink-black text-sm tracking-wide transition-colors duration-300 flex items-center justify-center"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>

                {/* 悬停快速查看 */}
                <div className="absolute inset-x-0 top-4 flex justify-center opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  <span className="px-4 py-1.5 bg-ink-black/70 dark:bg-moon-white/70 backdrop-blur-sm text-moon-white dark:text-ink-black text-xs tracking-widest">
                    快速查看
                  </span>
                </div>
              </div>

              {/* 商品信息 */}
              <div className="space-y-2.5">
                <h3
                  className="text-ink-black dark:text-moon-white text-lg sm:text-xl tracking-[0.02em] group-hover:text-warm-gray dark:group-hover:text-moon-white/60 transition-colors duration-300"
                  style={{ fontFamily: "'Noto Serif SC', serif" }}
                >
                  {product.name}
                </h3>
                <p className="text-warm-gray dark:text-moon-white/60 text-base sm:text-lg tracking-wide">
                  {formatPrice(product.price)}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* 分页导航 */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-16 sm:mt-20">
            {/* 上一页 */}
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-11 h-11 border border-ink-black/20 dark:border-white/20 text-ink-black dark:text-moon-white disabled:opacity-30 hover:bg-ink-black/5 dark:hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* 页码 */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-11 h-11 text-sm transition-all duration-300 ${
                  currentPage === page
                    ? 'bg-ink-black dark:bg-moon-white text-moon-white dark:text-ink-black font-medium'
                    : 'border border-ink-black/20 dark:border-white/20 text-ink-black dark:text-moon-white hover:bg-ink-black/5 dark:hover:bg-white/10'
                }`}
              >
                {page}
              </button>
            ))}

            {/* 下一页 */}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-11 h-11 border border-ink-black/20 dark:border-white/20 text-ink-black dark:text-moon-white disabled:opacity-30 hover:bg-ink-black/5 dark:hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        {/* 空状态 */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-24">
            <p className="text-warm-gray dark:text-moon-white/60 text-base mb-6">暂无符合条件的商品</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('全部');
              }}
              className="text-sm text-warm-gray dark:text-moon-white/60 hover:text-ink-black dark:hover:text-moon-white transition-colors duration-300 underline underline-offset-4"
            >
              清除筛选
            </button>
          </div>
        )}

        {/* 加载更多按钮 - 仅在无分页时显示 */}
        {totalPages <= 1 && filteredProducts.length > 0 && (
          <div className="flex justify-center mt-16 sm:mt-20">
            <button className="h-14 px-12 border border-ink-black dark:border-moon-white text-ink-black dark:text-moon-white hover:bg-ink-black dark:hover:bg-moon-white hover:text-moon-white dark:hover:text-ink-black transition-all duration-300 text-sm tracking-widest">
              加载更多
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
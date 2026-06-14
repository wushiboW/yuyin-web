import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useNavbar } from '@contexts/NavbarContext';

/**
 * 滚动渐显动画 Hook
 */
function useFadeInOnScroll(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return { ref, isVisible };
}

/**
 * 晓屿识音品牌价值观详情页
 *
 * 品质至上、匠心独运、用户为本，屿音坚守着对美好生活的承诺。
 * 每一件产品都经过精心设计，融合传统工艺与现代审美，传递品牌匠心。
 */
export default function Values() {
  const [isLoaded, setIsLoaded] = useState(false);
  const section1 = useFadeInOnScroll(0.1);
  const section2 = useFadeInOnScroll(0.1);
  const section3 = useFadeInOnScroll(0.1);
  const section4 = useFadeInOnScroll(0.1);
  const { isAtTop } = useNavbar();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const coreValues = [
    {
      title: '品质至上',
      subtitle: 'Quality First',
      description: '我们只推荐经过时间验证的好物。每一件产品的材质、工艺、耐用性都经过严格筛选，确保到达用户手中的都是精益求精的精品。',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    },
    {
      title: '匠心独运',
      subtitle: 'Craftsmanship',
      description: '我们崇尚匠人精神，尊重每一双创造美好的双手。无论是传统工艺的传承者，还是现代设计的新锐力量，屿音愿意为匠心提供舞台。',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      )
    },
    {
      title: '用户为本',
      subtitle: 'User First',
      description: '用户的信任是我们最宝贵的资产。我们倾听每一位用户的声音，不断优化服务，让购物体验成为美好生活的一部分。',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: '简约克制',
      subtitle: 'Simplicity',
      description: '我们相信好的设计是隐而不喧的。屿音呈现的每一件好物都经过时间的沉淀与匠心的打磨，不追求瞬间的惊艳，只愿成为生活中持久而舒适的存在。',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-moon-white dark:bg-ink-black">
      {/* ===== Hero Section ===== */}
      <section className="relative w-full h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&q=90)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-black/60 via-ink-black/40 to-ink-black/80" />

        {/* Back button */}
        <button
          onClick={() => navigate('/brand')}
          className="absolute top-24 left-8 z-30 flex items-center gap-3 text-moon-white/70 hover:text-moon-white transition-colors duration-300"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm tracking-wider">返回</span>
        </button>

        {/* Content */}
        <div className={`relative z-10 h-full flex flex-col justify-end transition-all duration-[1200ms] ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="w-full max-w-[1400px] mx-auto px-8 sm:px-12 md:px-16 lg:px-20 pb-20 sm:pb-24 md:pb-28 lg:pb-32">
            <span className="inline-block px-5 py-2 bg-gold-sand/15 text-gold-sand text-xs sm:text-sm tracking-[0.2em] border border-gold-sand/25 mb-6 sm:mb-8">
              Brand Values
            </span>
            <p className="text-gold-sand text-xs sm:text-sm tracking-[0.5em] uppercase mb-5 sm:mb-6">品牌价值观 CORE VALUES</p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-moon-white mb-5 sm:mb-6 leading-[1.1]" style={{ fontFamily: "'Noto Serif SC', serif" }}>
              品质至上
            </h1>
            <p className="text-moon-white/60 text-lg sm:text-xl max-w-2xl leading-[1.8]">
              每一件产品都经过精心设计，融合传统工艺与现代审美，传递品牌匠心
            </p>
          </div>
        </div>
      </section>

      {/* ===== Core Values Grid ===== */}
      <section
        ref={section1.ref}
        className={`w-full py-24 sm:py-28 md:py-32 lg:py-40 bg-moon-white dark:bg-ink-black transition-all duration-700 ease-out ${section1.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <div className="w-full max-w-[1400px] mx-auto px-8 sm:px-12 md:px-16 lg:px-20">
          <div className="text-center mb-16 sm:mb-20 md:mb-24">
            <p className="text-gold-sand text-xs sm:text-sm tracking-[0.3em] uppercase mb-4 sm:mb-5">核心理念</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-ink-black dark:text-moon-white mb-6" style={{ fontFamily: "'Noto Serif SC', serif" }}>
              屿音坚守的四大价值观
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
            {coreValues.map((value, index) => (
              <div
                key={value.title}
                className={`p-8 sm:p-10 bg-ivory/30 dark:bg-white/5 border border-light-gray dark:border-white/10 hover:border-gold-sand/50 transition-all duration-500 ease-out ${section1.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <div className="w-16 h-16 flex items-center justify-center bg-gold-sand/10 text-gold-sand mb-6">
                  {value.icon}
                </div>
                <p className="text-gold-sand text-xs tracking-[0.2em] uppercase mb-2">{value.subtitle}</p>
                <h3 className="text-xl text-ink-black dark:text-moon-white mb-4" style={{ fontFamily: "'Noto Serif SC', serif" }}>
                  {value.title}
                </h3>
                <p className="text-warm-gray dark:text-white/60 text-sm leading-[1.9]">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Quality Commitment ===== */}
      <section
        ref={section2.ref}
        className={`w-full py-24 sm:py-28 md:py-32 lg:py-40 bg-ivory/40 dark:bg-ink-black transition-all duration-700 ease-out ${section2.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <div className="w-full max-w-[1400px] mx-auto px-8 sm:px-12 md:px-16 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="text-gold-sand text-xs sm:text-sm tracking-[0.3em] uppercase mb-4 sm:mb-5">品质承诺</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl text-ink-black dark:text-moon-white mb-6 sm:mb-8 leading-[1.2]" style={{ fontFamily: "'Noto Serif SC', serif" }}>
                只选精品好物
              </h2>
              <div className="space-y-5 text-warm-gray dark:text-white/70 leading-[1.9]">
                <p>
                  屿音的选品团队走遍各地，只为寻找那些真正经得起时间考验的好物。我们建立了严格的选品标准：
                  材质安全、工艺精湛、耐用性高、设计美学，四者缺一不可。
                </p>
                <p>
                  我们相信，真正的好物不需要过多营销包装。屿音要做的，是帮用户节省筛选的时间，
                  让每一位用户都能放心购买到称心如意的精品。
                </p>
                <p>
                  每一件从屿音走出去的产品，都承载着我们对品质的坚持，对匠人的尊重，对用户的责任。
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=85"
                alt="屿音品质承诺"
                className="w-full h-full object-cover"
              />
              <div className="absolute -top-3 -right-3 w-full h-full border border-gold-sand/20 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Craftsman Spirit ===== */}
      <section
        ref={section3.ref}
        className={`w-full py-24 sm:py-28 md:py-32 lg:py-40 bg-moon-white dark:bg-ink-black transition-all duration-700 ease-out ${section3.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <div className="w-full max-w-[1400px] mx-auto px-8 sm:px-12 md:px-16 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1 relative aspect-[4/5] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=85"
                alt="屿音匠心精神"
                className="w-full h-full object-cover"
              />
              <div className="absolute -bottom-3 -left-3 w-full h-full border border-gold-sand/20 -z-10" />
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-gold-sand text-xs sm:text-sm tracking-[0.3em] uppercase mb-4 sm:mb-5">匠心精神</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl text-ink-black dark:text-moon-white mb-6 sm:mb-8 leading-[1.2]" style={{ fontFamily: "'Noto Serif SC', serif" }}>
                尊重每一双创造美好的手
              </h2>
              <div className="space-y-5 text-warm-gray dark:text-white/70 leading-[1.9]">
                <p>
                  在屿音，我们崇尚匠人精神。每一件被推荐的好物背后，都有创作者的心血与坚持。
                  我们尊重传统工艺的传承，也欣赏现代设计的创新，让匠心精神在当代生活中继续发光。
                </p>
                <p>
                  我们相信，快节奏的时代更需要慢下来的智慧。屿音愿为那些默默坚守的匠人提供舞台，
                  让他们的作品被更多人看见、珍惜、传承。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Closing Statement ===== */}
      <section
        ref={section4.ref}
        className={`w-full py-24 sm:py-28 md:py-32 lg:py-40 bg-ink-black text-moon-white/90 transition-all duration-700 ease-out ${section4.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <div className="w-full max-w-[1000px] mx-auto px-8 sm:px-12 text-center">
          <svg className="w-12 h-12 mx-auto mb-8 text-gold-sand/50" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <blockquote className="text-2xl sm:text-3xl md:text-4xl leading-[1.6] mb-8" style={{ fontFamily: "'Noto Serif SC', serif" }}>
            每一次选择，都是对美好生活的投票
          </blockquote>
          <p className="text-moon-white/50 text-base max-w-xl mx-auto">
            屿音相信，我们推荐的每一件好物，都在帮助用户构建自己理想中的品质生活。这是我们不变的初心，也是永恒的追求。
          </p>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="w-full py-12 bg-ink-black text-moon-white/60">
        <div className="w-full max-w-[1400px] mx-auto px-8 sm:px-12 md:px-16 lg:px-20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-moon-white text-lg mb-2" style={{ fontFamily: "'Noto Serif SC', serif" }}>晓屿识音</p>
              <p className="text-sm">让生活回归本真</p>
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              <Link to="/about" className="hover:text-gold-sand transition-colors">关于我们</Link>
              <Link to="/brand" className="hover:text-gold-sand transition-colors">品牌介绍</Link>
              <Link to="/privacy" className="hover:text-gold-sand transition-colors">隐私政策</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-xs">
            <p>&copy; 2024 晓屿识音. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
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
 * 晓屿识音品牌愿景详情页
 *
 * 屿音的愿景是成为用户心灵栖息的港湾，以简约之手诠释生活之美，
 * 共创美好，让每一刻都值得珍藏。
 */
export default function Vision() {
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

  return (
    <div className="min-h-screen bg-moon-white dark:bg-ink-black">
      {/* ===== Hero Section ===== */}
      <section className="relative w-full h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=90)'
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
        <div className={`relative z-10 h-full flex flex-col justify-center items-center text-center transition-all duration-[1200ms] ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="px-8 sm:px-12 md:px-16 lg:px-20 max-w-[1400px] mx-auto">
            <span className="inline-block px-5 py-2 bg-gold-sand/15 text-gold-sand text-xs sm:text-sm tracking-[0.2em] border border-gold-sand/25 mb-6 sm:mb-8">
              Brand Vision
            </span>
            <p className="text-gold-sand text-xs sm:text-sm tracking-[0.5em] uppercase mb-5 sm:mb-6">愿景未来 FUTURE VISION</p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-moon-white mb-5 sm:mb-6 leading-[1.1]" style={{ fontFamily: "'Noto Serif SC', serif" }}>
              愿景未来
            </h1>
            <p className="text-moon-white/60 text-lg sm:text-xl max-w-2xl mx-auto leading-[1.8]">
              以简约之手，诠释生活之美，让每一刻都值得珍藏，成为用户心灵栖息的港湾
            </p>
          </div>
        </div>
      </section>

      {/* ===== Vision Statement ===== */}
      <section
        ref={section1.ref}
        className={`w-full py-24 sm:py-28 md:py-32 lg:py-40 bg-ink-black text-moon-white/90 transition-all duration-700 ease-out ${section1.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <div className="w-full max-w-[1000px] mx-auto px-8 sm:px-12 text-center">
          <svg className="w-12 h-12 mx-auto mb-8 text-gold-sand/50" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <blockquote className="text-2xl sm:text-3xl md:text-4xl leading-[1.6] mb-8" style={{ fontFamily: "'Noto Serif SC', serif" }}>
            成为用户推荐生活精品好物的首选平台
          </blockquote>
          <p className="text-moon-white/50 text-base">
            让每一位用户都能在这里发现让生活变得更美好的物品
          </p>
        </div>
      </section>

      {/* ===== Future Vision Section ===== */}
      <section
        ref={section2.ref}
        className={`w-full py-24 sm:py-28 md:py-32 lg:py-40 bg-moon-white dark:bg-ink-black transition-all duration-700 ease-out ${section2.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <div className="w-full max-w-[1400px] mx-auto px-8 sm:px-12 md:px-16 lg:px-20">
          <div className="text-center mb-16 sm:mb-20 md:mb-24">
            <p className="text-gold-sand text-xs sm:text-sm tracking-[0.3em] uppercase mb-4 sm:mb-5">展望</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-ink-black dark:text-moon-white mb-6" style={{ fontFamily: "'Noto Serif SC', serif" }}>
              共创美好未来
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div className="space-y-8">
              {[
                {
                  title: '品质生活引领者',
                  description: '屿音致力于成为品质生活的引领者，通过精心筛选的精品好物，帮助用户构建属于自己的美学空间。让每一次购买都是对美好生活的投资。'
                },
                {
                  title: '东方美学传承者',
                  description: '我们将继续深入挖掘东方美学的精髓，将传统工艺与现代设计融合，让更多承载文化厚度的精品走入现代家庭。'
                }
              ].map((item, index) => (
                <div
                  key={item.title}
                  className={`p-8 bg-ivory/30 dark:bg-white/5 border border-light-gray dark:border-white/10 transition-all duration-500 ease-out ${section2.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${200 + index * 150}ms` }}
                >
                  <h3 className="text-xl text-ink-black dark:text-moon-white mb-4" style={{ fontFamily: "'Noto Serif SC', serif" }}>
                    {item.title}
                  </h3>
                  <p className="text-warm-gray dark:text-white/60 text-sm leading-[1.9]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="space-y-8">
              {[
                {
                  title: '用户心灵港湾',
                  description: '屿音希望成为用户心灵的港湾。在这里，用户可以暂时放下喧嚣，沉浸在美好的物品与内容中，感受生活的从容与品质。'
                },
                {
                  title: '可持续美好',
                  description: '我们倡导可持续的生活方式，优先推荐环保材质、经久耐用的精品。每一件被选中的好物，都值得被珍惜，让消费成为对地球的友好行为。'
                }
              ].map((item, index) => (
                <div
                  key={item.title}
                  className={`p-8 bg-ivory/30 dark:bg-white/5 border border-light-gray dark:border-white/10 transition-all duration-500 ease-out ${section2.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${400 + index * 150}ms` }}
                >
                  <h3 className="text-xl text-ink-black dark:text-moon-white mb-4" style={{ fontFamily: "'Noto Serif SC', serif" }}>
                    {item.title}
                  </h3>
                  <p className="text-warm-gray dark:text-white/60 text-sm leading-[1.9]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Image + Text Section ===== */}
      <section
        ref={section3.ref}
        className={`w-full py-24 sm:py-28 md:py-32 lg:py-40 bg-ivory/40 dark:bg-ink-black transition-all duration-700 ease-out ${section3.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <div className="w-full max-w-[1400px] mx-auto px-8 sm:px-12 md:px-16 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=85"
                alt="屿音未来愿景"
                className="w-full h-full object-cover"
              />
              <div className="absolute -bottom-3 -left-3 w-full h-full border border-gold-sand/20 -z-10" />
            </div>
            <div>
              <p className="text-gold-sand text-xs sm:text-sm tracking-[0.3em] uppercase mb-4 sm:mb-5">使命</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl text-ink-black dark:text-moon-white mb-6 sm:mb-8 leading-[1.2]" style={{ fontFamily: "'Noto Serif SC', serif" }}>
                让美好触手可及
              </h2>
              <div className="space-y-5 text-warm-gray dark:text-white/70 leading-[1.9]">
                <p>
                  在屿音，我们相信未来不是遥不可及的愿景，而是每一天脚踏实地的积累。我们通过持续优化用户体验、
                  深化供应链合作、严选精品好物，让品质生活不再是少数人的专属。
                </p>
                <p>
                  每一件从屿音走出去的好物，都承载着我们对美好生活的理解与承诺。用户购买的不只是一件物品，
                  更是对品质生活的向往，对自我价值的认同，对可持续未来的选择。
                </p>
                <p>
                  让我们一起，共创美好未来。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Values Timeline ===== */}
      <section
        ref={section4.ref}
        className={`w-full py-24 sm:py-28 md:py-32 lg:py-40 bg-moon-white dark:bg-ink-black transition-all duration-700 ease-out ${section4.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <div className="w-full max-w-[1400px] mx-auto px-8 sm:px-12 md:px-16 lg:px-20">
          <div className="text-center mb-16 sm:mb-20 md:mb-24">
            <p className="text-gold-sand text-xs sm:text-sm tracking-[0.3em] uppercase mb-4 sm:mb-5">愿景里程碑</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-ink-black dark:text-moon-white" style={{ fontFamily: "'Noto Serif SC', serif" }}>
              共同前行的方向
            </h2>
          </div>

          <div className="space-y-8">
            {[
              { year: '现在', title: '沉淀与积累', description: '屿音正在用心做好每一件小事，从选品到服务，从内容到体验，一点一滴积累用户的信任。' },
              { year: '不久', title: '连接与扩展', description: '我们将连接更多优质的匠人与品牌，让好东西不再被埋没，让更多人发现身边的美好。' },
              { year: '未来', title: '共创与引领', description: '屿音希望与用户、供应商、匠人一起共创全新的品质生活标准，引领东方美学生活方式的复兴。' }
            ].map((item, index) => (
              <div
                key={item.year}
                className={`flex gap-8 items-start transition-all duration-500 ease-out ${section4.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${200 + index * 150}ms` }}
              >
                <div className="w-24 sm:w-32 flex-shrink-0">
                  <p className="text-gold-sand text-xs sm:text-sm tracking-[0.2em]">{item.year}</p>
                </div>
                <div className="flex-1 pb-8 border-b border-light-gray dark:border-white/10 last:border-0 last:pb-0">
                  <h3 className="text-xl text-ink-black dark:text-moon-white mb-3" style={{ fontFamily: "'Noto Serif SC', serif" }}>
                    {item.title}
                  </h3>
                  <p className="text-warm-gray dark:text-white/60 text-sm leading-[1.9]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
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
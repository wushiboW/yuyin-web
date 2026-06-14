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
 * 晓屿识音品牌故事详情页
 *
 * 屿音电商创立于对东方美学的深度探索。我们相信，真正的精致生活不是堆砌奢华，
 * 而是在简约中寻找恰到好处的平衡。每一件推荐给用户的精品，都承载着匠人的心血
 * 与对美好生活的向往。
 */
export default function Story() {
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
            backgroundImage: 'url(https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=90)'
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
              Brand Story
            </span>
            <p className="text-gold-sand text-xs sm:text-sm tracking-[0.5em] uppercase mb-5 sm:mb-6">晓屿识音 XIAOYU SHIYIN</p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-moon-white mb-5 sm:mb-6 leading-[1.1]" style={{ fontFamily: "'Noto Serif SC', serif" }}>
              晓屿识音
            </h1>
            <p className="text-moon-white/60 text-lg sm:text-xl max-w-2xl leading-[1.8]">
              源自对东方美学的深度理解与传承，我们相信真正的奢华在于恰到好处的克制与从容
            </p>
          </div>
        </div>
      </section>

      {/* ===== Origin Section ===== */}
      <section
        ref={section1.ref}
        className={`w-full py-24 sm:py-28 md:py-32 lg:py-40 bg-moon-white dark:bg-ink-black transition-all duration-700 ease-out ${section1.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <div className="w-full max-w-[1400px] mx-auto px-8 sm:px-12 md:px-16 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="text-gold-sand text-xs sm:text-sm tracking-[0.3em] uppercase mb-4 sm:mb-5">缘起</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl text-ink-black dark:text-moon-white mb-6 sm:mb-8 leading-[1.2]" style={{ fontFamily: "'Noto Serif SC', serif" }}>
                一场关于美好生活的探索
              </h2>
              <div className="space-y-5 text-warm-gray dark:text-white/70 leading-[1.9]">
                <p>
                  屿音的故事始于一群对生活充满热爱的人。我们走访各地，寻找那些被忽视却真正有价值的好物。
                  从江南水乡的手工织物，到云贵山区的传统漆艺；从日本工匠的精研精神，到北欧设计的简约哲学——
                  每一件精品都承载着文化的厚度与匠人的温度。
                </p>
                <p>
                  我们发现，真正的美好不需要张扬。它在晨光中的一杯清茶里，在手工陶瓷的细腻纹理中，
                  在实木家具温润的触感里。屿音的使命，就是将这些恰到好处的美好带入更多人的生活中。
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=85"
                alt="屿音生活美学"
                className="w-full h-full object-cover"
              />
              <div className="absolute -bottom-3 -left-3 w-full h-full border border-gold-sand/20 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Philosophy Section ===== */}
      <section
        ref={section2.ref}
        className={`w-full py-24 sm:py-28 md:py-32 lg:py-40 bg-ivory/40 dark:bg-ink-black transition-all duration-700 ease-out ${section2.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <div className="w-full max-w-[1400px] mx-auto px-8 sm:px-12 md:px-16 lg:px-20">
          <div className="text-center mb-16 sm:mb-20 md:mb-24">
            <p className="text-gold-sand text-xs sm:text-sm tracking-[0.3em] uppercase mb-4 sm:mb-5">理念</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-ink-black dark:text-moon-white mb-6" style={{ fontFamily: "'Noto Serif SC', serif" }}>
              为用户推荐生活精品好物的电商平台
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            {[
              {
                title: '克制之美',
                description: '我们相信好的设计是隐而不喧的。屿音呈现的每一件好物，都经过时间的沉淀与匠心的打磨，不追求瞬间的惊艳，只愿成为你生活中持久而舒适的存在。'
              },
              {
                title: '自然之道',
                description: '真正的品质源于对自然的尊重。我们偏爱人天合一的设计语言——实木的温润、棉麻的透气、陶瓷的拙朴，让每一次使用都成为与自然的对话。'
              },
              {
                title: '传承之心',
                description: '每一件被屿音推荐的好物，都承载着匠人的情感与技艺的传承。我们希望这些美好的物品不仅被使用，更能被珍惜、被传递给下一代。'
              }
            ].map((item, index) => (
              <div
                key={item.title}
                className={`text-center p-8 sm:p-10 bg-moon-white dark:bg-white/5 border border-light-gray dark:border-white/10 transition-all duration-500 ease-out ${section2.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${200 + index * 150}ms` }}
              >
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-gold-sand/10 text-gold-sand">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
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
      </section>

      {/* ===== Team Section ===== */}
      <section
        ref={section3.ref}
        className={`w-full py-24 sm:py-28 md:py-32 lg:py-40 bg-moon-white dark:bg-ink-black transition-all duration-700 ease-out ${section3.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <div className="w-full max-w-[1400px] mx-auto px-8 sm:px-12 md:px-16 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1 relative aspect-[4/5] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=85"
                alt="屿音团队"
                className="w-full h-full object-cover"
              />
              <div className="absolute -top-3 -right-3 w-full h-full border border-gold-sand/20 -z-10" />
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-gold-sand text-xs sm:text-sm tracking-[0.3em] uppercase mb-4 sm:mb-5">初心</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl text-ink-black dark:text-moon-white mb-6 sm:mb-8 leading-[1.2]" style={{ fontFamily: "'Noto Serif SC', serif" }}>
                让美好触手可及
              </h2>
              <div className="space-y-5 text-warm-gray dark:text-white/70 leading-[1.9]">
                <p>
                  屿音的团队由一群热爱生活、追求品质的年轻人组成。我们有设计师、摄影师、文化研究者，
                  也有专注用户体验的技术团队。每个人都在自己的领域里，用专业与热情诠释着对美好生活的理解。
                </p>
                <p>
                  我们相信，一个好的平台不只是交易场所，更是美好生活的引导者。屿音希望通过我们的努力，
                  让每一位用户都能在这里发现让生活变得更美好的物品，让家成为真正的心灵港湾。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Quote Section ===== */}
      <section
        ref={section4.ref}
        className={`w-full py-24 sm:py-28 md:py-32 lg:py-40 bg-ink-black text-moon-white/90 transition-all duration-700 ease-out ${section4.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <div className="w-full max-w-[1000px] mx-auto px-8 sm:px-12 text-center">
          <svg className="w-12 h-12 mx-auto mb-8 text-gold-sand/50" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <blockquote className="text-2xl sm:text-3xl md:text-4xl leading-[1.6] mb-8" style={{ fontFamily: "'Noto Serif SC', serif" }}>
            真正的奢华，不是堆砌，而是恰到好处
          </blockquote>
          <p className="text-moon-white/50 text-base">
            — 屿音品牌理念
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
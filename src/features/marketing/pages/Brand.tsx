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
 * 全屏视频 Section 组件
 */
function VideoSection({
  videoSrc,
  poster,
  title,
  subtitle,
  description,
  tag,
  isActive,
  index,
}: {
  videoSrc: string;
  poster: string;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  isActive: boolean;
  index: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive]);

  return (
    <div
      className={`absolute inset-0 transition-opacity duration-[1500ms] ease-out ${
        isActive ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        poster={poster}
        autoPlay={isActive}
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      />
      {/* 多层渐变遮罩 */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink-black/85 via-ink-black/35 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-black/75 via-transparent to-transparent" />
    </div>
  );
}

/**
 * 品牌故事数据
 */
const brandSections = [
  {
    id: 'story',
    videoSrc: '/videos/brand-story.mp4',
    poster: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=90',
    title: '晓屿识音',
    subtitle: '品牌故事',
    description: '源自对东方美学的深度理解与传承，我们相信真正的奢华在于恰到好处的克制与从容。',
    tag: 'Brand Story',
  },
  {
    id: 'vision',
    videoSrc: '/videos/brand-vision.mp4',
    poster: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=90',
    title: '愿景未来',
    subtitle: '共创美好',
    description: '以简约之手，诠释生活之美，让每一刻都值得珍藏，成为用户心灵栖息的港湾。',
    tag: 'Vision',
  },
  {
    id: 'values',
    videoSrc: '/videos/brand-values.mp4',
    poster: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&q=90',
    title: '价值观',
    subtitle: '品质至上',
    description: '每一件产品都经过精心设计，融合传统工艺与现代审美，传递品牌匠心。',
    tag: 'Values',
  },
];

/**
 * 联系信息数据
 */
const contactInfo = [
  {
    label: '电话',
    value: '400-888-8888',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.021l-2.308 1.154a11.042 11.042 0 005.516 5.516l1.154-2.308a1 1 0 011.021-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    label: '邮箱',
    value: 'contact@yuyin.com',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: '地址',
    value: '上海市静安区南京西路1266号',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

/**
 * 社交媒体数据
 */
const socialLinks = [
  { name: '微信', icon: 'wx', href: '#' },
  { name: '微博', icon: 'wb', href: '#' },
  { name: '小红书', icon: 'xhs', href: '#' },
  { name: 'Instagram', icon: 'ins', href: '#' },
];

/**
 * 客服入口数据
 */
const serviceEntries = [
  {
    title: '售后服务',
    description: '退换货、维修、保养等问题',
    href: '/service/after-sale',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: '商品咨询',
    description: '产品材质、尺寸、库存等问题',
    href: '/service/product',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: '在线客服',
    description: '人工客服实时解答',
    href: '/service/chat',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    title: '帮助中心',
    description: '常见问题、操作指南',
    href: '/service/help',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
];

/**
 * 晓屿识音品牌介绍页面
 */
export default function Brand() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const storySection = useFadeInOnScroll(0.1);
  const valuesSection = useFadeInOnScroll(0.1);
  const contactSection = useFadeInOnScroll(0.1);
  const serviceSection = useFadeInOnScroll(0.1);
  const { isAtTop } = useNavbar();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // 处理视频 section 滚动切换
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.video-section');
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          setCurrentSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-moon-white dark:bg-ink-black">
      {/* ===== 全屏视频 Section 1: 品牌故事 ===== */}
      <section
        className="video-section relative w-full h-screen overflow-hidden bg-transparent cursor-pointer"
        onClick={() => navigate('/brand/story')}
      >
        <VideoSection
          videoSrc={brandSections[0].videoSrc}
          poster={brandSections[0].poster}
          title={brandSections[0].title}
          subtitle={brandSections[0].subtitle}
          description={brandSections[0].description}
          tag={brandSections[0].tag}
          isActive={currentSection === 0}
          index={0}
        />

        {/* 内容层 */}
        <div className={`relative z-10 h-full flex flex-col justify-end transition-all duration-[1200ms] ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '200ms' }}>
          <div className="w-full max-w-[1400px] mx-auto px-8 sm:px-12 md:px-16 lg:px-20 pb-20 sm:pb-24 md:pb-28 lg:pb-32">
            <span className="inline-block px-5 py-2 bg-gold-sand/15 text-gold-sand text-xs sm:text-sm tracking-[0.2em] border border-gold-sand/25 mb-6 sm:mb-8">
              {brandSections[0].tag}
            </span>
            <p className="text-gold-sand text-xs sm:text-sm tracking-[0.5em] uppercase mb-5 sm:mb-6">晓屿识音 XIAOYU SHIYIN</p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-moon-white mb-5 sm:mb-6 leading-[1.1]" style={{ fontFamily: "'Noto Serif SC', serif" }}>
              {brandSections[0].title}<br />{brandSections[0].subtitle}
            </h1>
            <p className="text-moon-white/60 text-base sm:text-lg mb-10 sm:mb-12 max-w-2xl leading-[1.8]">
              {brandSections[0].description}
            </p>
          </div>
        </div>

        {/* 滚动提示 */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-moon-white/40">
          <span className="text-[10px] tracking-[0.4em] mb-4">SCROLL</span>
          <div className="w-px h-14 bg-gradient-to-b from-moon-white/40 to-transparent" />
        </div>

        {/* 点击了解更多 */}
        <button
          onClick={() => navigate('/brand/story')}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 text-moon-white/60 hover:text-moon-white transition-colors text-sm"
        >
          <span>点击了解更多</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </section>

      {/* ===== 全屏视频 Section 2: 品牌愿景 ===== */}
      <section
        className="video-section relative w-full h-screen overflow-hidden bg-transparent cursor-pointer"
        onClick={() => navigate('/brand/vision')}
      >
        <VideoSection
          videoSrc={brandSections[1].videoSrc}
          poster={brandSections[1].poster}
          title={brandSections[1].title}
          subtitle={brandSections[1].subtitle}
          description={brandSections[1].description}
          tag={brandSections[1].tag}
          isActive={currentSection === 1}
          index={1}
        />

        {/* 内容层 */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-8 sm:px-12 md:px-16 lg:px-20">
          <span className="inline-block px-5 py-2 bg-gold-sand/15 text-gold-sand text-xs sm:text-sm tracking-[0.2em] border border-gold-sand/25 mb-6 sm:mb-8">
            {brandSections[1].tag}
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-moon-white mb-6 sm:mb-8 leading-[1.2]" style={{ fontFamily: "'Noto Serif SC', serif" }}>
            {brandSections[1].title}
          </h2>
          <p className="text-moon-white/70 text-lg sm:text-xl leading-[1.9] max-w-3xl">
            {brandSections[1].description}
          </p>
        </div>

        {/* 点击了解更多 */}
        <button
          onClick={() => navigate('/brand/vision')}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 text-moon-white/60 hover:text-moon-white transition-colors text-sm"
        >
          <span>点击了解更多</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </section>

      {/* ===== 全屏视频 Section 3: 品牌价值观 ===== */}
      <section
        className="video-section relative w-full h-screen overflow-hidden bg-transparent cursor-pointer"
        onClick={() => navigate('/brand/values')}
      >
        <VideoSection
          videoSrc={brandSections[2].videoSrc}
          poster={brandSections[2].poster}
          title={brandSections[2].title}
          subtitle={brandSections[2].subtitle}
          description={brandSections[2].description}
          tag={brandSections[2].tag}
          isActive={currentSection === 2}
          index={2}
        />

        {/* 内容层 */}
        <div className="relative z-10 h-full flex flex-col justify-end items-start px-8 sm:px-12 md:px-16 lg:px-20 pb-20 sm:pb-24 md:pb-28 lg:pb-32">
          <div className="max-w-2xl">
            <span className="inline-block px-5 py-2 bg-gold-sand/15 text-gold-sand text-xs sm:text-sm tracking-[0.2em] border border-gold-sand/25 mb-6 sm:mb-8">
              {brandSections[2].tag}
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-moon-white mb-6 sm:mb-8 leading-[1.2]" style={{ fontFamily: "'Noto Serif SC', serif" }}>
              {brandSections[2].title}
            </h2>
            <p className="text-moon-white/70 text-lg sm:text-xl leading-[1.9]">
              {brandSections[2].description}
            </p>
          </div>
        </div>

        {/* 点击了解更多 */}
        <button
          onClick={() => navigate('/brand/values')}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 text-moon-white/60 hover:text-moon-white transition-colors text-sm"
        >
          <span>点击了解更多</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </section>

      {/* ===== Section 4: 联系我们 ===== */}
      <section
        ref={contactSection.ref}
        className={`w-full py-24 sm:py-28 md:py-32 lg:py-40 bg-moon-white dark:bg-ink-black transition-all duration-700 ease-out ${contactSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <div className="w-full max-w-[1400px] mx-auto px-8 sm:px-12 md:px-16 lg:px-20">
          <div className="text-center mb-16 sm:mb-20 md:mb-24">
            <p className="text-gold-sand text-xs sm:text-sm tracking-[0.3em] uppercase mb-4 sm:mb-5">Contact Us</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-ink-black dark:text-moon-white" style={{ fontFamily: "'Noto Serif SC', serif" }}>联系我们</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* 联系信息 */}
            <div className="space-y-8 sm:space-y-10">
              {contactInfo.map((item, index) => (
                <div
                  key={item.label}
                  className={`flex items-start gap-5 transition-all duration-500 ease-out ${contactSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${200 + index * 100}ms` }}
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-gold-sand/10 text-gold-sand">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-warm-gray dark:text-white/50 text-sm mb-1">{item.label}</p>
                    <p className="text-ink-black dark:text-moon-white text-lg" style={{ fontFamily: "'Noto Serif SC', serif" }}>{item.value}</p>
                  </div>
                </div>
              ))}

              {/* 社交媒体 */}
              <div className={`pt-8 border-t border-light-gray dark:border-white/10 transition-all duration-500 ease-out ${contactSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '500ms' }}>
                <p className="text-warm-gray dark:text-white/50 text-sm mb-4">关注我们</p>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      className="w-10 h-10 flex items-center justify-center bg-ink-black/5 dark:bg-white/10 text-ink-black dark:text-moon-white hover:bg-gold-sand hover:text-moon-white transition-colors duration-300"
                      aria-label={social.name}
                    >
                      <span className="text-xs">{social.icon}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* 地图占位 */}
            <div
              className={`relative aspect-[4/3] lg:aspect-auto lg:h-full min-h-[300px] bg-light-gray dark:bg-white/5 overflow-hidden transition-all duration-500 ease-out ${contactSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '300ms' }}
            >
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-light-gray to-warm-gray/20 dark:from-white/5 dark:to-white/10">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold-sand/20 flex items-center justify-center">
                    <svg className="w-8 h-8 text-gold-sand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <p className="text-warm-gray dark:text-white/50 text-sm">地图展示区域</p>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-full h-full border border-gold-sand/20 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Section 5: 客服中心 ===== */}
      <section
        ref={serviceSection.ref}
        className={`w-full py-24 sm:py-28 md:py-32 lg:py-40 bg-ivory/40 dark:bg-ink-black transition-all duration-700 ease-out ${serviceSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <div className="w-full max-w-[1400px] mx-auto px-8 sm:px-12 md:px-16 lg:px-20">
          <div className="text-center mb-16 sm:mb-20 md:mb-24">
            <p className="text-gold-sand text-xs sm:text-sm tracking-[0.3em] uppercase mb-4 sm:mb-5">Customer Service</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-ink-black dark:text-moon-white" style={{ fontFamily: "'Noto Serif SC', serif" }}>客服中心</h2>
            <p className="text-warm-gray dark:text-white/60 text-base mt-4 sm:mt-5 max-w-xl mx-auto">
              买到放心、用得安心、品得真心，我们随时为您服务
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {serviceEntries.map((item, index) => (
              <Link
                key={item.title}
                to={item.href}
                className={`group block p-8 bg-moon-white dark:bg-white/5 border border-light-gray dark:border-white/10 hover:border-gold-sand/50 transition-all duration-300 ${serviceSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <div className="w-14 h-14 flex items-center justify-center bg-gold-sand/10 text-gold-sand mb-6 group-hover:bg-gold-sand group-hover:text-ink-black transition-colors duration-300">
                  {item.icon}
                </div>
                <h3 className="text-lg text-ink-black dark:text-moon-white mb-3 group-hover:text-gold-sand transition-colors duration-300" style={{ fontFamily: "'Noto Serif SC', serif" }}>
                  {item.title}
                </h3>
                <p className="text-warm-gray dark:text-white/50 text-sm leading-relaxed">
                  {item.description}
                </p>
                <div className="mt-6 flex items-center text-gold-sand text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>进入</span>
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          {/* 底部承诺 */}
          <div
            className={`mt-16 sm:mt-20 md:mt-24 text-center transition-all duration-500 ease-out ${serviceSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '600ms' }}
          >
            <p className="text-warm-gray dark:text-white/50 text-sm mb-4">品质承诺 · 诚信服务 · 用户至上</p>
            <p className="text-ink-black dark:text-moon-white text-base" style={{ fontFamily: "'Noto Serif SC', serif" }}>
              7×24 小时全天候服务 | 7天内无理由退换 | 专业客服团队
            </p>
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
              <Link to="/privacy" className="hover:text-gold-sand transition-colors">隐私政策</Link>
              <Link to="/terms" className="hover:text-gold-sand transition-colors">使用条款</Link>
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
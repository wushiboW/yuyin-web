import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

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
 * Hero Section - 全屏沉浸式 Banner
 */
function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-ink-black">
      <img
        src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=90"
        alt="怦然心动"
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink-black/30 via-transparent to-ink-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-black/40 to-transparent" />

      <div className="relative z-10 h-full flex flex-col justify-end">
        <div className="w-full max-w-[1400px] mx-auto px-8 sm:px-12 md:px-16 lg:px-20 pb-20 sm:pb-24 md:pb-28 lg:pb-32">
          <div className={`transition-all duration-[1200ms] ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-gold-sand text-xs sm:text-sm tracking-[0.5em] uppercase mb-6 sm:mb-8">YUYIN 屿音</p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-moon-white mb-6 sm:mb-8 leading-[1.1]" style={{ fontFamily: "'Noto Serif SC', serif" }}>
              怦然心动
            </h1>
            <p className="text-moon-white/60 text-base sm:text-lg max-w-2xl leading-[1.8]">
              精选商品深度解析，探索每一件器物背后的故事与用法
            </p>
          </div>
        </div>
      </div>

      {/* 滚动提示 */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-moon-white/40">
        <span className="text-[10px] tracking-[0.4em] mb-4">SCROLL</span>
        <div className="w-px h-14 bg-gradient-to-b from-moon-white/40 to-transparent" />
      </div>
    </section>
  );
}

/**
 * 商品详情数据
 */
interface ProductDetail {
  name: string;
  subtitle: string;
  image: string;
  sections: {
    title: string;
    content: string;
  }[];
}

const products: ProductDetail[] = [
  {
    name: '云逸沙发',
    subtitle: 'Cloud Comfort Sofa',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=85',
    sections: [
      {
        title: '使用场景',
        content: '云逸沙发专为现代客厅设计，适合家庭聚会、阅读休憩、午后小憩。宽大的座深和柔和的曲线，为您营造一个舒适的私人领地。无论是独自放松，还是与家人共享天伦，云逸沙发都是您的理想之选。'
      },
      {
        title: '操作演示',
        content: '1. 首次使用时请先用软毛刷轻轻拂去表面浮尘\n2. 配合使用沙发垫，可延长面料寿命\n3. 每周用吸尘器配软绒刷头清理缝隙\n4. 避免长时间暴露在强烈阳光下\n5. 移动时轻抬轻放，保护木质脚轮'
      },
      {
        title: '高级用法',
        content: '搭配同系列脚踏，打造完整的休闲区；利用靠枕的不同排列，创造多样化的坐卧姿态；结合毛毯与抱枕，随季节变换沙发的表情，让客厅始终保持新鲜感。'
      },
      {
        title: '产品渊源',
        content: '云逸沙发的设计灵感源自天空中自由舒展的云朵。设计师希望每一件沙发都能承载人们对舒适生活的向往。历经三年研发，上百次打样，最终呈现出这款兼具支撑性与包裹感的座椅。'
      },
      {
        title: '工艺揭秘',
        content: '框架采用北美白蜡木实木，榫卯结构连接，无需金属螺丝，确保长期使用的稳固性。填充层选用高回弹海绵与羽绒混合，座感柔软而不塌陷。面料经过36道水洗工艺处理的亚麻布料，触感温润，透气性极佳。'
      }
    ]
  },
  {
    name: '竹韵茶几',
    subtitle: 'Bamboo Rhythm Coffee Table',
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=1200&q=85',
    sections: [
      {
        title: '使用场景',
        content: '竹韵茶几是茶室的点睛之笔，适合品茗会友、阅读写作、休憩小坐。配合蒲团或矮凳，营造出禅意十足的空间氛围。无论是现代简约还是传统中式家居，都能完美融入。'
      },
      {
        title: '操作演示',
        content: '1. 日常清洁使用干净柔软的棉布擦拭\n2. 茶水渍可用微湿布轻擦后立即擦干\n3. 避免硬物刮划，不要直接拖拽物品\n4. 建议每季度使用专用木蜡油护理\n5. 保持室内湿度平衡，防止开裂变形'
      },
      {
        title: '高级用法',
        content: '可作为客厅的主茶几，搭配干果盘与花瓶，展现待客之道；也能置于卧室作为床头柜，存放睡前读物与小物；在茶室中配合工夫茶具，演绎东方待客礼仪。'
      },
      {
        title: '产品渊源',
        content: '竹韵茶几的诞生源于一次江南之旅。设计师在安吉竹林中被竹子的清雅气节所打动，萌生出将这份东方美学融入日常器物的想法。以茶为媒，以竹为材，创造出这件连接传统与现代的生活器皿。'
      },
      {
        title: '工艺揭秘',
        content: '桌面采用五年老楠竹，经过碳化处理，防潮防腐性能大幅提升。每一片竹片均采用传统榫卯工艺拼接，需要资深工匠耗时三天完成。桌腿设计借鉴宋代家具的束腰结构美学，兼具稳固与美观。底部配有静音毛毡垫，保护地板的同时让茶几安放无声。'
      }
    ]
  },
  {
    name: '雅致落地灯',
    subtitle: 'Elegant Floor Lamp',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1200&q=85',
    sections: [
      {
        title: '使用场景',
        content: '雅致落地灯是阅读角的最佳拍档，适合客厅阅读角、卧室床头、书房工作区。柔和的光线营造出温馨的氛围，让您在繁忙一天后得到彻底的放松。简约的造型让它成为空间中的视觉焦点。'
      },
      {
        title: '操作演示',
        content: '1. 请使用不超过60W的灯泡，E27螺口为通用规格\n2. 金属灯罩可用微湿棉布擦拭，忌用腐蚀性清洁剂\n3. 调光旋钮位于灯头下方，轻松调节亮度\n4. 移动时请扶住灯杆中部，避免灯头晃动\n5. 长时间使用时注意散热，避免灯罩过热'
      },
      {
        title: '高级用法',
        content: '搭配暖色调灯泡（2700K-3000K），营造舒适氛围；配合智能灯泡，可实现远程控制与定时开关；在客厅角落放置，与绿植相伴，打造充满生机的阅读角；多个落地灯组合使用，可定义不同功能区域。'
      },
      {
        title: '产品渊源',
        content: '设计灵感来自北欧的极简主义与东方美学的融合。设计师认为，灯不只是照明工具，更是生活氛围的营造者。雅致落地灯的轮廓简洁而优雅，如同一位安静的守护者，在每个夜晚为用户点亮归家的温暖。'
      },
      {
        title: '工艺揭秘',
        content: '灯杆采用黄铜材质，表面经过抛光与做旧双重工艺处理，呈现温润的古铜色泽。灯罩选用半透明和纸与钢丝骨架结合，光线透过和纸散发柔和的漫射光，避免眩光刺激。底座采用铸铁配重设计，重心稳固，不易倾倒，整灯净重达4.5公斤。'
      }
    ]
  }
];

/**
 * 商品详情 Section
 */
function ProductSection({ product, reverse = false }: { product: ProductDetail; reverse?: boolean }) {
  const sectionRef = useFadeInOnScroll(0.1);

  return (
    <section
      ref={sectionRef.ref}
           className={`w-full min-h-screen py-24 sm:py-28 md:py-32 lg:py-40 bg-moon-white dark:bg-ink-black flex items-center transition-all duration-700 ease-out ${sectionRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
    >
      <div className="w-full max-w-[1400px] mx-auto px-8 sm:px-12 md:px-16 lg:px-20">
        {/* 商品名称 */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <p className="text-gold-sand text-xs sm:text-sm tracking-[0.3em] uppercase mb-3 sm:mb-4">{product.subtitle}</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ink-black dark:text-moon-white" style={{ fontFamily: "'Noto Serif SC', serif" }}>
            {product.name}
          </h2>
        </div>

        {/* 主图 + 详情内容 */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start ${reverse ? 'lg:flex lg:flex-row-reverse' : ''}`}>
          {/* 左侧大图 */}
          <div className={`relative ${reverse ? 'lg:order-2' : ''}`}>
            <div className="aspect-[16/10] overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-gold-sand/20 -z-10 hidden lg:block" />
          </div>

          {/* 右侧详情 */}
          <div className={`lg:pl-4 xl:pl-8 space-y-10 sm:space-y-12 ${reverse ? 'lg:order-1' : ''}`}>
            {product.sections.map((section, index) => (
              <div
                key={section.title}
                className="transition-all duration-500 ease-out"
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <h3 className="text-lg sm:text-xl text-ink-black dark:text-moon-white mb-3 sm:mb-4 flex items-center gap-3" style={{ fontFamily: "'Noto Serif SC', serif" }}>
                  <span className="w-8 h-px bg-gold-sand"></span>
                  {section.title}
                </h3>
                <div className="text-warm-gray dark:text-moon-white/60 leading-[1.9] text-sm sm:text-base whitespace-pre-line">
                  {section.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * 分割线 Section - 用于分隔不同商品
 */
function DividerSection({ number }: { number: number }) {
  const sectionRef = useFadeInOnScroll(0.1);

  return (
    <section
      ref={sectionRef.ref}
      className={`w-full py-16 sm:py-20 md:py-24 bg-ink-black dark:bg-moon-white flex items-center justify-center transition-all duration-700 ease-out ${sectionRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
    >
      <div className="flex items-center gap-8 sm:gap-12 md:gap-16">
        <div className="w-16 sm:w-24 md:w-32 h-px bg-gradient-to-r from-transparent to-gold-sand/50" />
        <span className="text-gold-sand text-xs sm:text-sm tracking-[0.5em]">NO. {number}</span>
        <div className="w-16 sm:w-24 md:w-32 h-px bg-gradient-to-l from-transparent to-gold-sand/50" />
      </div>
    </section>
  );
}

/**
 * CTA Section
 */
function CTASection() {
  const sectionRef = useFadeInOnScroll(0.1);

  return (
    <section
      ref={sectionRef.ref}
      className={`relative w-full py-24 sm:py-28 md:py-32 lg:py-40 overflow-hidden transition-all duration-700 ease-out ${sectionRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
    >
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=85" alt="屿音生活" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-ink-black/80" />
      </div>

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-8 sm:px-12 md:px-16 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl text-moon-white mb-6 sm:mb-8" style={{ fontFamily: "'Noto Serif SC', serif" }}>
          探索全部商品
        </h2>
        <p className="text-moon-white/60 text-base sm:text-lg mb-10 sm:mb-12 max-w-xl mx-auto">
          了解更多精选商品，发现更多生活之美
        </p>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
          <Link
            to="/product"
            className="inline-flex items-center justify-center gap-3 bg-gold-sand text-ink-black px-10 py-4 hover:bg-gold-sand/90 transition-colors duration-300 text-sm sm:text-base"
            style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
          >
            <span>探索全部商品</span>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-3 border border-moon-white/50 text-moon-white px-10 py-4 hover:bg-moon-white hover:text-ink-black transition-all duration-300 text-sm sm:text-base"
            style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
          >
            <span>返回首页</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/**
 * 怦然心动页面 - 精选商品深度展示
 */
export default function About() {
  return (
    <div className="min-h-screen bg-moon-white dark:bg-ink-black">
      {/* Hero Banner */}
      <HeroSection />

      {/* Product 1: 云逸沙发 */}
      <ProductSection product={products[0]} />

      {/* Divider */}
      <DividerSection number={1} />

      {/* Product 2: 竹韵茶几 */}
      <ProductSection product={products[1]} reverse />

      {/* Divider */}
      <DividerSection number={2} />

      {/* Product 3: 雅致落地灯 */}
      <ProductSection product={products[2]} />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
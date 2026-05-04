import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "motion/react";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import ProjectsSlider from "./ProjectSlider";
import ProjectsGridSection from "./ProjectsGridSection";
import HoldingSection from "./Hero";
import MasterSection from "./MasterSection";
import RevealingHeading from "./RevealingHeader";

const IntroMorphSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const words = [
    {
      visible: "EVOKING",
      hidden: "DEFINING",
      isSerifVisible: true,
      isSerifHidden: false,
      range: [0.1, 0.4],
    },
    {
      visible: "UNBUILT",
      hidden: "FUTURE",
      isSerifVisible: false,
      isSerifHidden: true,
      range: [0.3, 0.6],
    },
    {
      visible: "REALITIES",
      hidden: "STANDARDS",
      isSerifVisible: true,
      isSerifHidden: false,
      range: [0.5, 0.8],
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative h-[200vh] bg-[#F8F7F4] z-40"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-40 bg-[#F8F7F4]">
        <div className="flex flex-col items-center text-center gap-4 md:gap-8 lg:gap-12 w-full max-w-7xl px-4">
          {words.map((word, i) => {
            const yVisible = useTransform(smoothProgress, word.range, [
              "0%",
              "-120%",
            ]);
            const yHidden = useTransform(smoothProgress, word.range, [
              "120%",
              "0%",
            ]);
            const opacityHidden = useTransform(
              smoothProgress,
              word.range,
              [0, 1],
            );
            const opacityVisible = useTransform(
              smoothProgress,
              word.range,
              [1, 0],
            );

            return (
              <div
                key={i}
                className="relative overflow-hidden h-[15vw] md:h-[12vw] lg:h-[10vw] flex items-center justify-center w-full"
              >
                <motion.span
                  style={{ y: yVisible, opacity: opacityVisible }}
                  className={`${word.isSerifVisible ? "font-serif" : "font-display"} text-[12vw] md:text-[10vw] lg:text-[8vw] leading-none uppercase tracking-tighter text-black select-none whitespace-nowrap`}
                >
                  {word.visible}
                </motion.span>
                <motion.span
                  style={{ y: yHidden, opacity: opacityHidden }}
                  className={`absolute h-full flex items-center justify-center inset-0 ${word.isSerifHidden ? "font-serif" : "font-display"} text-[12vw] md:text-[10vw] lg:text-[8vw] leading-none uppercase tracking-tighter text-black select-none whitespace-nowrap`}
                >
                  {word.hidden}
                </motion.span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
const spiralImages = [
  {
    src: "https://cdn.prod.website-files.com/685284771a3175da27f67ba1/6937e61b62c573f916024e78_1_Luxury_Villa_Night.avif",
    alt: "1",
  },
  {
    src: "https://cdn.prod.website-files.com/685284771a3175da27f67ba1/6937e61b37c5c78176983d54_2_Private_Spa_Landscape.avif",
    alt: "2",
  },
  {
    src: "https://cdn.prod.website-files.com/685284771a3175da27f67ba1/6937e61bfb74047d2ef52563_4_Luxury_Villa__Outdoor_Pool.avif",
    alt: "3",
  },
  {
    src: "https://cdn.prod.website-files.com/685284771a3175da27f67ba1/6937e61bc2307c9830e5ceec_5_Luxury_Master_Bedroom.avif",
    alt: "4",
  },
  {
    src: "https://cdn.prod.website-files.com/685284771a3175da27f67ba1/6937e61b7ca21af8764885cd_6_Architecture_Light_Materials.avif",
    alt: "5",
  },
];

const SpiralSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // "start end" starts tracking as soon as the section is visible at the bottom
    offset: ["start end", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 35,
    restDelta: 0.0001,
  });

  // Start rotation and radius shifts earlier
  const totalRotation = useTransform(smoothProgress, [0, 1], [0, 1080]);

  return (
    <section
      ref={containerRef}
      // Reducing height to 300vh makes the progress feel faster/snappier
      className="relative h-[300vh] bg-[#F8F7F4] z-50"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center z-60">
        <div className="relative w-full h-full flex items-center justify-center [transform-style:preserve-3d]">
          {spiralImages.map((img, i) => {
            const angleOffset = (i / spiralImages.length) * 360;

            // Adjusting startEntry to be much lower so images fly in sooner
            const startEntry = i * 0.04;
            const endEntry = 0.25 + i * 0.05;

            const xPos = useTransform(
              smoothProgress,
              [startEntry, endEntry],
              [150, 0],
            );

            const yPos = useTransform(
              smoothProgress,
              [startEntry, endEntry],
              [-100, 0],
            );

            const rotation = useTransform(
              totalRotation,
              (r) => r + angleOffset,
            );
            const radius = useTransform(
              smoothProgress,
              [startEntry, 0.5, 1],
              [10, 45, 0],
            );

            // Opacity and Scale need to trigger right at the start
            const opacity = useTransform(
              smoothProgress,
              [startEntry, startEntry + 0.02],
              [0, 1],
            );

            return (
              <motion.div
                key={i}
                style={{
                  rotate: rotation,
                  width: "100%",
                  zIndex: i,
                  position: "absolute",
                  opacity,
                }}
                className="h-1 flex items-center justify-center origin-center pointer-events-none"
              >
                <motion.div
                  className="w-[40vw] aspect-[4/3] bg-white shadow-2xl pointer-events-auto"
                  style={{
                    x: useTransform(
                      [xPos, radius],
                      ([x, r]) => `${(x as number) + (r as number)}vw`,
                    ),
                    y: useTransform([yPos], ([y]) => `${y}vh`),
                    rotateZ: useTransform(rotation, (r) => -r),
                    scale: useTransform(
                      smoothProgress,
                      [startEntry, endEntry],
                      [0.5, 1],
                    ),
                  }}
                >
                  <img
                    src={img.src}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
const ReviewsSection = () => {
  const testimonials = [
    {
      quote:
        "Félix brought clarity, initiative and reliability to a fast-paced, AI-driven competition. The project ended up winning, a great outcome for a collaboration we genuinely recommend and would repeat again.",
      author: "SANZPONT AWARD-WINNING",
      category: "ARCHITECTURE FIRM",
    },
    {
      quote:
        '"INSPIRE" helped us understand our strengths and focus on what truly matters in our studio. Félix exceeded our expectations, his insights on processes, client acquisition and positioning were especially valuable.',
      author: "NUA",
      category: "ARCHITECTURE FIRM",
    },
    {
      quote:
        'The whole experience felt warm, coherent and genuinely empathetic. Félix quickly understood my studio and the essence of my work. "INSPIRE" added real quality and value, helping me strengthen my positioning within my niche.',
      author: "Romina Ross",
      category: "RO ARCHITECTURE",
    },
    {
      quote:
        "Félix delivered outstanding videos for an international sports event under intense deadlines. He understood every indication, added high-value proposals and made the whole process smooth and collaborative. The final result was excellent and visually spectacular.",
      author: "Simone Vela",
      category: "SV DESIGN",
    },
  ];

  const logos = [
    "https://cdn.prod.website-files.com/68b71f6389ec905c7b57de05/69749272a91a4725f8afcffa_SENDA_Logo_320x200.avif",
    "https://cdn.prod.website-files.com/68b71f6389ec905c7b57de05/6937fa70e72c49e66d8649ea_SANZPONT_Logo_320x200.avif",
    "https://cdn.prod.website-files.com/68b71f6389ec905c7b57de05/6937fa686c9dadcfbd975b95_RO_Logo_320x200.avif",
    "https://cdn.prod.website-files.com/68b71f6389ec905c7b57de05/6937fa5d5fe2a35881e59d56_NUA_Logo_320x200.avif",
    "https://cdn.prod.website-files.com/68b71f6389ec905c7b57de05/68b9962b75cc971c5bb54221_zagaleta.avif",
    "https://cdn.prod.website-files.com/68b71f6389ec905c7b57de05/68b995792210258dd491861c_ark.avif",
    "https://cdn.prod.website-files.com/68b71f6389ec905c7b57de05/68b9956bd33d82d2042afca2_aspire.avif",
    "https://cdn.prod.website-files.com/68b71f6389ec905c7b57de05/68b99559afbc4ce307216c75_reserva-club.avif",
    "https://cdn.prod.website-files.com/68b71f6389ec905c7b57de05/68b99537a9f6585961894b14_sotogrande.avif",
    "https://cdn.prod.website-files.com/68b71f6389ec905c7b57de05/68b99517cb2be7e369b5f1af_modon.avif",
  ];

  return (
    <section className="bg-luxury-bg py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <RevealingHeading topText="What people" bottomText="say about Us" />
        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-24">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col justify-between border border-black/10 bg-white/40 p-8 pt-10 min-h-[420px] transition-all duration-700 hover:shadow-2xl hover:shadow-black/5"
            >
              <p className="font-sans text-[10.5px] uppercase tracking-[0.12em] leading-[1.8] text-neutral-800 font-medium">
                {t.quote}
              </p>

              <div className="mt-12 flex flex-wrap items-center gap-1.5 text-[8.5px] tracking-[0.3em] font-medium text-neutral-500 uppercase">
                <span>{t.author}</span>
                <span className="opacity-40 ml-1">/</span>
                <span className="opacity-70">{t.category}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Logo Marquee */}
        <div className="relative border-t border-black/5">
          {/* Subtle Side Fade Masks for "Infinite" look */}
          <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-luxury-bg to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-luxury-bg to-transparent z-10 pointer-events-none" />

          <div className="flex overflow-hidden relative">
            <motion.div
              animate={{ x: ["0%", "-50%"] }} // Perfectly seamless with 2 sets
              transition={{
                duration: 35,
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex whitespace-nowrap gap-14 py-6 flex-none items-center"
            >
              {/* Pair of sets for infinite loop */}
              {[...logos, ...logos].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="Client Logo"
                  className="h-16 md:h-17 lg:h-24 w-auto object-contain flex-none grayscale brightness-0 transition-all duration-700 cursor-pointer"
                  referrerPolicy="no-referrer"
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const BlogSection = () => {
  const posts = [
    {
      label: "RESIDENTIAL",
      title: "IDENTITY MAGAZINE",
      description:
        "A Fine Balance - This home by Elicyon creates a sense of intimacy at every turn",
      image:
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000&auto=format&fit=crop",
      overlay: "identity",
    },
    {
      label: "INSIGHT",
      title: "A DUBAI VILLA OF QUIET GRANDEUR AND CRAFTED DETAIL",
      description: "",
      image:
        "https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=1000&auto=format&fit=crop",
      overlay: "",
    },
    {
      label: "COMMERCIAL",
      title: "DESIGN ANTHOLOGY UK",
      description: "Commercial Design Reimagined",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop",
      overlay: "design anthology",
    },
  ];

  return (
    <section className="bg-[#f8f7f5] py-32 md:py-48">
      <div className="container mx-auto px-8 md:px-16">
        {/* Header */}
        <RevealingHeading topText="Explore" bottomText="Insights and Blogs" />
        <div className="flex flex-col md:flex-row justify-end items-start md:items-end mb-24 gap-8">
          <a
            href="#"
            className="font-sans text-[10px] md:text-xs font-bold tracking-[0.2em] text-neutral-900 border-b border-neutral-900 pb-1 hover:opacity-60 transition-opacity whitespace-nowrap"
          >
            EXPLORE INSIGHTS
          </a>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16 items-start">
          {posts.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="flex flex-col group cursor-pointer"
            >
              <div
                className={`relative overflow-hidden mb-8 shadow-sm transition-all duration-500 group-hover:shadow-xl ${
                  i === 1 ? "aspect-square opacity-90" : "aspect-[4/5]"
                }`}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                {post.overlay && (
                  <div className="absolute inset-0 flex items-start justify-center pt-20">
                    <span className="font-serif text-white text-7xl md:text-5xl lg:text-7xl opacity-90 tracking-tighter mix-blend-difference">
                      {post.overlay}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col">
                <span className="font-sans text-[10px] tracking-[0.3em] font-bold text-neutral-400 mb-4 uppercase">
                  {post.label}
                </span>
                <h3 className="font-serif text-xl md:text-2xl text-neutral-900 leading-snug mb-4">
                  {post.title}
                </h3>
                {post.description && (
                  <p className="font-sans text-xs text-neutral-500 leading-relaxed mb-6">
                    {post.description}
                  </p>
                )}
                <a
                  href="#"
                  className="font-sans text-[10px] tracking-[0.2em] font-bold text-neutral-900 border-b border-neutral-900 w-fit pb-1 hover:opacity-60 transition-opacity"
                >
                  READ MORE
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-neutral-900 pt-24 pb-12 text-white">
      <div className="container mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 mb-24">
          {/* Logo & Intro */}
          <div className="md:col-span-5 flex flex-col items-start">
            <span className="font-sans font-bold text-2xl tracking-tighter text-white mb-8 lowercase">
              felixnieto.
            </span>
            <p className="font-sans text-sm text-neutral-400 leading-relaxed max-w-xs mb-8">
              Crafting visual narratives for the world's most ambitious
              architecture and design practices.
            </p>
            <div className="flex gap-6 mt-auto">
              {["Instagram", "LinkedIn", "Vimeo"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="font-sans text-[10px] tracking-[0.2em] uppercase font-bold text-neutral-500 hover:text-white transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Grid */}
          <div className="md:col-span-7 grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h4 className="font-sans text-[10px] tracking-[0.3em] font-bold text-neutral-600 uppercase mb-8">
                Work
              </h4>
              <ul className="flex flex-col gap-4">
                {["Residential", "Commercial", "Cultural", "Hospitality"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="font-sans text-sm text-neutral-300 hover:text-[#adc9c6] transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div>
              <h4 className="font-sans text-[10px] tracking-[0.3em] font-bold text-neutral-600 uppercase mb-8">
                Agency
              </h4>
              <ul className="flex flex-col gap-4">
                {["About", "Services", "News", "Careers"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="font-sans text-sm text-neutral-300 hover:text-[#adc9c6] transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-full lg:col-span-2">
              <div>
                <h5 className="font-serif italic text-xl mb-4 text-neutral-400">
                  Address
                </h5>
                <p className="font-sans text-[12px] text-neutral-600 leading-relaxed uppercase tracking-widest">
                  Studio Dubai
                  <br />
                  International House
                </p>
                <h5 className="font-serif italic text-xl my-4 text-neutral-400">
                  Phone
                </h5>
                <p className="font-sans text-[12px] text-neutral-600 leading-relaxed uppercase tracking-widest">
                  +44 (0) 20 7123 4567
                </p>
                <h5 className="font-serif italic text-xl my-4 text-neutral-400">
                  Email
                </h5>
                <p className="font-sans text-[12px] text-neutral-600 leading-relaxed tracking-widest">
                  hi@falcondesign.com
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Global Presence */}

        {/* Legal & Copyright */}
        <div className="border-t border-neutral-800 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex gap-8">
            <a
              href="#"
              className="font-sans text-[9px] tracking-[0.1em] text-neutral-600 uppercase hover:text-neutral-400 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="font-sans text-[9px] tracking-[0.1em] text-neutral-600 uppercase hover:text-neutral-400 transition-colors"
            >
              Terms of Service
            </a>
          </div>
          <p className="font-sans text-[9px] tracking-[0.1em] text-neutral-700 uppercase">
            © {new Date().getFullYear()} FELIXNIETO VISUAL STRATEGY. ALL RIGHTS
            RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <HoldingSection />
      <IntroMorphSection />
      {/* <MasterSection/> */}
      <SpiralSection />
      <ProjectsSlider />
      <ProjectsGridSection />
      <ReviewsSection />
      <BlogSection />
      <Footer />
    </main>
  );
}

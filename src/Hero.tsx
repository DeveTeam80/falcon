import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react"; // Assuming you're using lucide-react based on the icon

const HoldingSection = () => {
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

  // --- UPDATED VIDEO TRANSFORMS ---
  // [0.0 - 0.3]: Horizontal expansion
  // [0.3 - 0.6]: Vertical expansion

  const videoWidth = useTransform(
    smoothProgress,
    [0, 0.3, 0.6],
    ["60vw", "100vw", "100vw"],
  );
  const videoHeight = useTransform(
    smoothProgress,
    [0, 0.3, 0.6],
    ["55vh", "55vh", "100vh"],
  );

  // X moves during horizontal expansion, Y moves during vertical expansion
  const videoX = useTransform(
    smoothProgress,
    [0, 0.3, 0.6],
    ["10%", "0%", "0%"],
  );
  const videoY = useTransform(
    smoothProgress,
    [0, 0.3, 0.6],
    ["20%", "20%", "0%"],
  );

  // Scale smoothly across both phases
  const videoScale = useTransform(
    smoothProgress,
    [0, 0.3, 0.6],
    [0.85, 0.95, 1],
  );

  // Border radius smooths out gradually
  const videoBorderRadius = useTransform(
    smoothProgress,
    [0, 0.3, 0.6],
    ["12px", "6px", "0px"],
  );

  // Text transforms
  const titleOpacity = useTransform(smoothProgress, [0, 0.25], [1, 0]);
  const titleY = useTransform(smoothProgress, [0, 0.25], [0, -80]);

  const CharacterReveal = ({
    text,
    delay = 0,
    className = "",
  }: {
    text: string;
    delay?: number;
    className?: string;
  }) => {
    return (
      <div className={`flex flex-wrap ${className}`}>
        {text.split("").map((char, i) => (
          <span key={i} className="relative overflow-hidden inline-block">
            <motion.span
              initial={{
                x: "-100%",
                opacity: 0,
              }}
              animate={{
                x: "0%",
                opacity: 1,
              }}
              transition={{
                duration: 1.1,
                delay: delay + i * 0.035,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block whitespace-pre"
            >
              {char}
            </motion.span>
          </span>
        ))}
      </div>
    );
  };

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-[#f8f7f5]">
      <div className="sticky top-0 h-screen w-full flex flex-col overflow-hidden">
        {/* Navigation Bar */}
        <nav className="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-8 md:px-12 py-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center"
          >
            <img
              src="/assets/images/falcon-logo.png"
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </motion.div>

          <div className="flex items-center gap-8">
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="group hidden md:flex items-center gap-3 bg-[#adc9c6] text-neutral-900 px-6 py-2.5 rounded-full font-sans text-sm font-semibold tracking-tight hover:bg-[#9eb8b5] transition-colors"
            >
              GET IN TOUCH
              <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center p-1 group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="w-3 h-3 rotate-[-45deg]" />
              </div>
            </motion.button>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col gap-1.5 w-8 items-end group"
            >
              <div className="w-full h-0.5 bg-neutral-900" />
              <div className="w-2/3 h-0.5 bg-neutral-900 group-hover:w-full transition-all" />
            </motion.button>
          </div>
        </nav>

        {/* Main Content Area */}
        <div className="relative flex-1 flex flex-col pt-[15vh] px-12">
          {/* Subtle Brush Stroke Decoration */}
          {/* <motion.div
            style={{ opacity: titleOpacity }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, delay: 1 }}
            className="absolute right-[10%] top-[40%] w-[40vw] h-[20vh] pointer-events-none opacity-20"
          >
            <svg
              viewBox="0 0 400 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full text-[#adc9c6]"
            >
              <path
                d="M10 80C100 20 300 20 390 80"
                stroke="currentColor"
                strokeWidth="20"
                strokeLinecap="round"
                strokeDasharray="5 15"
              />
            </svg>
          </motion.div> */}

          {/* Titles */}
          <motion.div
            style={{ opacity: titleOpacity, y: titleY }}
            className="px-8 md:px-16 z-20"
          >
            <div className="flex flex-col uppercase font-sans font-medium text-[8vw] leading-[0.85] tracking-tighter text-neutral-900">
              <CharacterReveal text="ARCHITECTURAL SOUL" delay={0.2} />
            </div>
            <div className="flex items-center text-[7vw] leading-none tracking-tight text-neutral-900 -mt-1 lg:-mt-4 ml-[10vw] md:ml-[15vw]">
              <CharacterReveal
                text="& VISUAL POETRY"
                delay={0.45}
                className="font-serif font-extralight italic"
              />
            </div>
          </motion.div>
          {/* Side Info */}
          <motion.div
            style={{ opacity: titleOpacity }}
            className="absolute left-8 md:left-12 top-[65%] z-20 max-w-[400px] overflow-hidden"
          >
            <motion.p
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 1,
                delay: 1.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="font-sans text-[11px] md:text-sm leading-relaxed text-neutral-800 uppercase tracking-wider font-medium"
            >
              Transforming structural blueprints into sensory experiences. We
              capture the unseen atmosphere of a project, defining space through
              the lens of cinematic precision and technical mastery.
            </motion.p>
          </motion.div>
        </div>

        {/* Expanding Media Layer */}
        {/* Expanding Media Layer */}
        <div className="absolute inset-0 flex items-end justify-end pointer-events-none z-10">
          <motion.div
            // --- THE NEW REVEAL ANIMATION ---
            // inset(top right bottom left)
            // Starts clipped 100% from top and 100% from left (meaning only the bottom-right pixel is visible)
            initial={{ clipPath: "inset(100% 0% 0% 100%)" }}
            // Animates to 0% clip (fully visible)
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{
              duration: 1.4,
              delay: 2.2, // Waits for the text to finish animating before firing
              ease: [0.76, 0, 0.24, 1], // Matches the premium easing curve
            }}
            style={{
              width: videoWidth,
              height: videoHeight,
              scale: videoScale,
              x: videoX,
              y: videoY,
            }}
            className="relative overflow-hidden shadow-2xl pointer-events-auto origin-bottom-right m-0"
          >
            <video
              src="https://felixnieto.b-cdn.net/projects/Loop_web_hero_2025.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            {/* Soft lighting overlay */}
            <motion.div
              style={{
                opacity: useTransform(smoothProgress, [0, 0.4], [0.2, 0]),
              }}
              className="absolute inset-0 bg-black/20 pointer-events-none"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HoldingSection;

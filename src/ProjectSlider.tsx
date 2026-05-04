import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import RevealingHeading from "./RevealingHeader";

const PROJECTS = [
  {
    id: "architecture",
    category: "architecture",
    name: "ARCHITECTURAL DESIGN",
    image: "/assets/images/proj1.webp",
    furnitureImage: "/assets/images/proj1-pop.webp",
    link: "",
  },
  {
    id: "interiors",
    category: "interiors",
    name: "LUXURY INTERIOR DESIGN",
    image: "/assets/images/proj2.webp",
    furnitureImage: "/assets/images/proj2-pop.webp",
    link: "",
  },
  {
    id: "visualization",
    category: "visualization",
    name: "3D VISUALIZATION & VR",
    image: "/assets/images/proj3.webp",
    furnitureImage: "/assets/images/proj3-pop.webp",
    link: "",
  },
];
const LETTER_END = 0.35;
const WIPE_START = 0.6;
const AnimatedLetter = ({ char, progress, index, isInitial }) => {
  const staggerRange = LETTER_END - 0.05;
  const start = 0.05 + (index % 3) * (staggerRange / 3);
  const end = start + staggerRange / 3;

  // Row 0 (top) = 80px, Row 1 (mid) = 200px, Row 2 (bottom) = 400px
  const initialY = [250, 500][index % 2];

  const y = useTransform(
    progress,
    [0, start, end],
    isInitial ? [0, 0, 0] : [initialY, initialY, 0],
  );

  return (
    <motion.span
      style={{ y }}
      className="font-serif inline-block text-[11vw] leading-none uppercase will-change-transform"
    >
      {char}
    </motion.span>
  );
};

// ─── Row of animated letters ─────────────────────────────────────────────────
const AnimatedLetters = ({ text, progress }) => {
  const letters = text.split("");
  return (
    <h2 className="flex absolute z-[3] text-white w-full justify-between py-[30px] px-[20px] lg:px-[32px] pointer-events-none overflow-hidden h-full">
      {letters.map((char, i) => {
        const isInitial =
          i === 0 ||
          i === Math.floor(letters.length / 2) ||
          i === Math.floor(letters.length / 4) ||
          i === letters.length - 1;
        return (
          <AnimatedLetter
            key={i}
            char={char}
            progress={progress}
            index={i}
            isInitial={isInitial}
          />
        );
      })}
    </h2>
  );
};

const ProjectSlide = ({ project, index, total, scrollYProgress }) => {
  const isFirst = index === 0;
  const bandSize = 1 / total;
  const bandStart = index * bandSize;
  const bandEnd = bandStart + bandSize;

  // --- TRANSITION LOGIC (Wipe effect remains) ---
  const rawClip = useTransform(
    scrollYProgress,
    isFirst ? [0, 1] : [bandStart - bandSize * 0.4, bandStart],
    isFirst ? [0, 0] : [100, 0],
  );
  const clip = useSpring(rawClip, { stiffness: 60, damping: 24 });
  const clipPath = useTransform(clip, (v) => `inset(${v}% 0 0 0)`);

  // --- LETTER PROGRESS ---
  const localRaw = useTransform(scrollYProgress, [bandStart, bandEnd], [0, 1]);
  const localSmooth = useSpring(localRaw, { stiffness: 40, damping: 40 });

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      style={{ zIndex: index + 1, clipPath }}
    >
      {/* LAYER 1: Background Image (Static) */}
      <div className="absolute inset-0 z-[1]">
        <img
          src={project.image}
          className="w-full h-full object-cover"
          alt=""
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* LAYER 2: Text (The only thing moving with scroll) */}
      <div className="absolute inset-0 z-[2] flex items-start justify-start">
        <AnimatedLetters
          text={project.category.toUpperCase()}
          progress={localSmooth}
        />
      </div>

      {/* LAYER 3: Foreground Furniture PNG (Static & Superimposed) */}
      {project.furnitureImage && (
        <div className="absolute inset-0 z-[3] flex items-center justify-center pointer-events-none">
          <img
            src={project.furnitureImage}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* LAYER 4: UI / Project Info */}
      <motion.div
        className="absolute left-[24px] lg:left-[32px] bottom-[10%] text-white z-[10]"
        style={{
          opacity: useTransform(
            scrollYProgress,
            [bandStart, bandStart + 0.05, bandEnd - 0.1, bandEnd],
            [0, 1, 1, 0],
          ),
        }}
      >
        <p className="text-[10px] tracking-[0.35em] text-white/50 mb-3 uppercase">
          {String(index + 1).padStart(2, "0")} &mdash;{" "}
          {String(total).padStart(2, "0")}
        </p>
        <h3 className="text-2xl lg:text-4xl font-serif uppercase mb-5 leading-tight max-w-sm">
          {project.name}
        </h3>
        <a
          href={project.link}
          className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase border-b border-white/30 pb-1 hover:border-white transition-colors duration-300"
        >
          View Project <ArrowRight className="w-3 h-3" />
        </a>
      </motion.div>

      {/* Progress indicators */}
      <div className="absolute right-[24px] lg:right-[32px] bottom-[10%] flex flex-col gap-[6px] z-[10]">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`w-[2px] rounded-full transition-all duration-500 ${
              i === index ? "h-8 bg-white" : "h-4 bg-white/25"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
};

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function ProjectsSlider() {
  const containerRef = useRef(null);
  const total = PROJECTS.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} style={{ height: `${total * 200}vh` }}>
      <RevealingHeading topText="Discover" bottomText="Our Services" />

      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {PROJECTS.map((project, i) => (
          <ProjectSlide
            key={project.id}
            project={project}
            index={i}
            total={total}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </div>
  );
}

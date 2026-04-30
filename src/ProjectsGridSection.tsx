import { useMemo, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";

const PROJECT_IMAGES = [
  {
    src: "https://cdn.prod.website-files.com/697096b6dde8a7564252bfdd/69a859206f8dac87c4c0b553_MERSI%20x%20LEVALLOIS-2%20(1).webp",
    title: "Naya",
    category: "Résidentiel",
  },
  {
    src: "https://cdn.prod.website-files.com/697096b6dde8a7564252bfdd/69a85c648569d5ab75b8d1a3_MERSI%20x%20MAURICE_-6.webp",
    title: "Maurice Cafe St-Honore",
    category: "Hospitality",
  },
  {
    src: "https://cdn.prod.website-files.com/697096b6dde8a7564252bfdd/69a85c20c68e51f70e07786b_CC_MERSIxBERRI-24%20(1).webp",
    title: "Berri",
    category: "Résidentiel",
  },
  {
    src: "https://cdn.prod.website-files.com/697096b6dde8a7564252bfdd/69a85dced45ab84536e7cd04_MERSI%20x%20MAURICE_-16.webp",
    title: "Maurice Cafe",
    category: "Hospitality",
  },
  {
    src: "https://cdn.prod.website-files.com/697096b6dde8a7564252bfdd/69a85beae7ee6ecaf8863ba3_CC_Mersi%20x%20Restaurant%20COOK-2.webp",
    title: "Cook Restaurant",
    category: "Retail",
  },
  {
    src: "https://cdn.prod.website-files.com/697096b6dde8a7564252bfdd/699ec2802ca327082f12fb8c_Cover%20R.webp",
    title: "Project R",
    category: "Résidentiel",
  },
  {
    src: "https://cdn.prod.website-files.com/697096b6dde8a7564252bfdd/699dcffd7c4bc95194bed857_Cover%20R.webp",
    title: "Project R2",
    category: "Retail",
  },
  {
    src: "https://cdn.prod.website-files.com/697096b6dde8a7564252bfdd/69a858a21313048249c36dc2_MERSI%20x%20AURE%CC%81LIEN%20COHEN-4%20(1).webp",
    title: "Aurelien Cohen",
    category: "Retail",
  },
  {
    src: "https://cdn.prod.website-files.com/697096b6dde8a7564252bfdd/699dd9281a44841220d126ec_Cover%20R.webp",
    title: "Project R3",
    category: "Hospitality",
  },
    {
    src: "https://cdn.prod.website-files.com/697096b6dde8a7564252bfdd/69a858a21313048249c36dc2_MERSI%20x%20AURE%CC%81LIEN%20COHEN-4%20(1).webp",
    title: "Aurelien Cohen",
    category: "Résidentiel",
  },
];

const TitleWord = ({
  word,
  wordIndex,
  totalWords,
  smoothProgress,
}: {
  word: string;
  wordIndex: number;
  totalWords: number;
  smoothProgress: MotionValue<number>;
}) => {
  const start = (wordIndex / totalWords) * 0.08;
  const end = start + 0.07;

  const y = useTransform(smoothProgress, [0, start, end, 1], [80, 80, 0, 0]);
  const opacity = useTransform(
    smoothProgress,
    [0, start, end, 1],
    [0, 0, 1, 1],
  );

  return (
    <span className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
      <motion.span className="inline-block" style={{ y, opacity }}>
        {word}
      </motion.span>
    </span>
  );
};

type Project = {
  src: string;
  title: string;
  category: string;
};

type ImageCardProps = {
  project: Project;
  i: number;
  smoothProgress: MotionValue<number>;
};

const ImageCard = ({ project, i, smoothProgress }: ImageCardProps) => {
  const col = i % 3;
  const row = Math.floor(i / 3);

  // Initial State (The horizontal strip)
  const fWidth = 8; // Slightly narrower to fit 10 better
  const fHeight = 30;
  const fLeft = i * 10;
  const fTop = 60;

  // Grid State (The 3-column layout)
  const gMargin = 5;
  const gGap = 2;
  const gWidth = (100 - gMargin * 2 - gGap * 2) / 3;
  const gHeight = 50; // Increased height
  const gLeft = gMargin + col * (gWidth + gGap);
  const gTop = 10 + row * (gHeight + gGap); // Initial top positions

  const range = [0.1, 0.6];

  const width = useTransform(smoothProgress, range, [
    `${fWidth}%`,
    `${gWidth}%`,
  ]);
  const height = useTransform(smoothProgress, range, [
    `${fHeight}vh`,
    `${gHeight}vh`,
  ]);
  const left = useTransform(smoothProgress, range, [`${fLeft}%`, `${gLeft}%`]);
  const top = useTransform(smoothProgress, range, [`${fTop}vh`, `${gTop}vh`]);

  return (
    <motion.div
      key={i}
      initial={{
        y: "100vh",
        opacity: 0,
        scale: 0.8,
        rotate: i % 2 === 0 ? 2 : -2,
      }}
      animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
      transition={{
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1],
      }}
      style={{
        position: "absolute",
        width,
        height,
        left,
        top,
        zIndex: 10,
        paddingRight: 10,
      }}
      className="overflow-hidden"
    >
      <motion.img
        src={project.src}
        className="w-full h-full object-cover"
        initial={{ scale: 1.4 }}
        animate={{ scale: 1 }}
        transition={{ delay: i * 0.1, duration: 1.2 }}
      />
    </motion.div>
  );
};


const ProjectsGridSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState("All");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 20,
    mass: 0.5,
  });

  // Header Title fades and moves up
  const titleOpacity = useTransform(smoothProgress, [0.1, 0.3], [1, 0]);
  const titleY = useTransform(smoothProgress, [0.1, 0.3], [0, -50]);

  // NEW: Filter bar movement logic
  // Moves the bar from its initial position to the very top (sticky look)
  const filterY = useTransform(smoothProgress, [0.2, 0.5], ["0px", "-120px"]);
  const filterScale = useTransform(smoothProgress, [0.2, 0.5], [1, 0.9]);

  // Slide logic for the image canvas
  const canvasY = useTransform(smoothProgress, [0.6, 1.0], ["0vh", "-120vh"]);

  const filteredProjects = useMemo(() => {
    return filter === "All"
      ? PROJECT_IMAGES
      : PROJECT_IMAGES.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-[#F4F1EE]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* HEADER & FILTER CONTAINER */}
        <div className="relative z-50 pt-[10vh] flex flex-col items-center text-center pointer-events-none">
          {/* This part fades out */}
          <motion.h2
            style={{ opacity: titleOpacity, y: titleY }}
            className="text-5xl lg:text-7xl font-display font-bold uppercase tracking-tighter leading-[0.9] mb-10"
          >
            {[
              ["Curated", "spaces"],
              ["defined", "by"],
              ["singular", "vision"],
            ].map((line, li) => (
              <span key={li} className="block">
                {line.map((word, wi) => (
                  <TitleWord
                    key={wi}
                    word={word}
                    wordIndex={li * 3 + wi}
                    totalWords={7}
                    smoothProgress={smoothProgress}
                  />
                ))}
              </span>
            ))}
          </motion.h2>

          {/* This part moves to the top and stays (Sticky Filter Bar) */}
          <motion.div
            style={{ y: filterY, scale: filterScale }}
            className="pointer-events-auto flex gap-6 px-8 py-3 bg-[#D6D1C9]/60 backdrop-blur-md rounded-md text-[10px] uppercase tracking-[0.25em] font-bold text-neutral-700 shadow-sm"
          >
            {["All", "Résidentiel", "Retail", "Hospitality"].map((f) => (
              <span
                key={f}
                onClick={() => setFilter(f)}
                className={`cursor-pointer transition-colors ${
                  filter === f ? "text-black" : "hover:text-black opacity-50"
                }`}
              >
                {f}
              </span>
            ))}
          </motion.div>
        </div>

        {/* IMAGE CANVAS */}
        <motion.div style={{ y: canvasY }} className="absolute inset-0 z-10">
          {filteredProjects.map((project, i) => (
            <ImageCard
              key={project.title + i} // Unique key for filtering
              project={project}
              i={i}
              smoothProgress={smoothProgress}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
export default ProjectsGridSection;

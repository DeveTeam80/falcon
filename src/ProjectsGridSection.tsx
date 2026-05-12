import { useMemo, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";

const PROJECT_IMAGES = [
  { src: "https://cdn.prod.website-files.com/697096b6dde8a7564252bfdd/69a859206f8dac87c4c0b553_MERSI%20x%20LEVALLOIS-2%20(1).webp", title: "Naya", category: "Résidentiel" },
  { src: "https://cdn.prod.website-files.com/697096b6dde8a7564252bfdd/69a85c648569d5ab75b8d1a3_MERSI%20x%20MAURICE_-6.webp", title: "Maurice Cafe St-Honore", category: "Hospitality" },
  { src: "https://cdn.prod.website-files.com/697096b6dde8a7564252bfdd/69a85c20c68e51f70e07786b_CC_MERSIxBERRI-24%20(1).webp", title: "Berri", category: "Résidentiel" },
  { src: "https://cdn.prod.website-files.com/697096b6dde8a7564252bfdd/69a85dced45ab84536e7cd04_MERSI%20x%20MAURICE_-16.webp", title: "Maurice Cafe", category: "Hospitality" },
  { src: "https://cdn.prod.website-files.com/697096b6dde8a7564252bfdd/69a85beae7ee6ecaf8863ba3_CC_Mersi%20x%20Restaurant%20COOK-2.webp", title: "Cook Restaurant", category: "Retail" },
  { src: "https://cdn.prod.website-files.com/697096b6dde8a7564252bfdd/699ec2802ca327082f12fb8c_Cover%20R.webp", title: "Project R", category: "Résidentiel" },
  { src: "https://cdn.prod.website-files.com/697096b6dde8a7564252bfdd/699dcffd7c4bc95194bed857_Cover%20R.webp", title: "Project R2", category: "Retail" },
  { src: "https://cdn.prod.website-files.com/697096b6dde8a7564252bfdd/69a858a21313048249c36dc2_MERSI%20x%20AURE%CC%81LIEN%20COHEN-4%20(1).webp", title: "Aurelien Cohen", category: "Retail" },
  { src: "https://cdn.prod.website-files.com/697096b6dde8a7564252bfdd/699dd9281a44841220d126ec_Cover%20R.webp", title: "Project R3", category: "Hospitality" },
  { src: "https://cdn.prod.website-files.com/697096b6dde8a7564252bfdd/69a858a21313048249c36dc2_MERSI%20x%20AURE%CC%81LIEN%20COHEN-4%20(1).webp", title: "Aurelien Cohen 2", category: "Résidentiel" },
];

const TitleWord = ({ word, wordIndex, totalWords, smoothProgress }: any) => {
  const start = (wordIndex / totalWords) * 0.08;
  const end = start + 0.07;
  const y = useTransform(smoothProgress, [0, start, end, 1], [80, 80, 0, 0]);
  const opacity = useTransform(smoothProgress, [0, start, end, 1], [0, 0, 1, 1]);

  return (
    <span className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
      <motion.span className="inline-block" style={{ y, opacity }}>
        {word}
      </motion.span>
    </span>
  );
};

const ImageCard = ({ project, i, smoothProgress, masonryPos }: any) => {
  const fWidth = 8;
  const fHeight = 30;
  const fLeft = i * 10;
  const fTop = 60;

  // range defines when the "fan" spreads into the "masonry"
  const range = [0.05, 0.45];

  const width = useTransform(smoothProgress, range, [`${fWidth}%`, `${masonryPos.width}%`]);
  const height = useTransform(smoothProgress, range, [`${fHeight}vh`, `${masonryPos.height}vh`]);
  const left = useTransform(smoothProgress, range, [`${fLeft}%`, `${masonryPos.left}%`]);
  const top = useTransform(smoothProgress, range, [`${fTop}vh`, `${masonryPos.top}vh`]);

  return (
    <motion.div
      style={{
        position: "absolute",
        width,
        height,
        left,
        top,
        zIndex: 10,
        paddingRight: 15,
      }}
      className="overflow-hidden"
    >
      <motion.img
        src={project.src}
        className="w-full h-full object-cover"
        initial={{ scale: 1.3 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
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
    stiffness: 45,
    damping: 30,
    mass: 0.5,
  });

  const titleOpacity = useTransform(smoothProgress, [0.1, 0.2], [1, 0]);
  const filterTop = useTransform(smoothProgress, [0.05, 0.35], ["53vh", "2vh"]);
  
  // CRITICAL: This is what moves the whole grid up to eliminate the gap
  // It starts at 0.5 (halfway through the scroll) and finishes by 1.0
  const canvasY = useTransform(smoothProgress, [0.5, 1.0], ["0vh", "-100vh"]);

  const { filteredProjects, masonryPositions } = useMemo(() => {
    const filtered = filter === "All" 
      ? PROJECT_IMAGES 
      : PROJECT_IMAGES.filter((p) => p.category === filter);

    const columnCount = 3;
    const gMargin = 5;
    const gGap = 2;
    const gWidth = (100 - gMargin * 2 - gGap * (columnCount - 1)) / columnCount;
    
    const colHeights = [0, 0, 0];
    const positions = filtered.map((p, idx) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      // Variations in height to create the staggered effect
      const itemHeight = 35 + (idx % 3 === 0 ? 15 : idx % 3 === 1 ? 5 : 25); 
      
      const left = gMargin + col * (gWidth + gGap);
      const top = 15 + colHeights[col]; 
      
      colHeights[col] += itemHeight + gGap;
      
      return { left, top, width: gWidth, height: itemHeight };
    });

    return { filteredProjects: filtered, masonryPositions: positions };
  }, [filter]);

  return (
    // Changed from 450vh to 300vh to reduce total dead space
    <section ref={containerRef} className="relative h-[300vh] bg-[#F4F1EE]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        <div className="relative z-50 pt-[10vh] flex flex-col items-center text-center pointer-events-none">
          <motion.h2
            style={{ opacity: titleOpacity }}
            className="text-5xl lg:text-7xl font-display font-bold uppercase tracking-tighter leading-[0.9] mb-10"
          >
            {[["Curated", "spaces"], ["defined", "by"], ["singular", "vision"]].map((line, li) => (
              <span key={li} className="block">
                {line.map((word, wi) => (
                  <TitleWord
                    key={wi} word={word} wordIndex={li * 3 + wi}
                    totalWords={7} smoothProgress={smoothProgress}
                  />
                ))}
              </span>
            ))}
          </motion.h2>
        </div>

        <motion.div
          style={{ top: filterTop, left: "50%", x: "-50%", position: "absolute", zIndex: 100 }}
          className="pointer-events-auto flex gap-6 px-8 py-3 bg-[#D6D1C9]/60 backdrop-blur-md rounded-md text-[10px] uppercase tracking-[0.25em] font-bold text-neutral-700 shadow-sm"
        >
          {["All", "Résidentiel", "Retail", "Hospitality"].map((f) => (
            <span
              key={f}
              onClick={() => setFilter(f)}
              className={`cursor-pointer transition-colors ${filter === f ? "text-black" : "opacity-50"}`}
            >
              {f}
            </span>
          ))}
        </motion.div>

        <motion.div style={{ y: canvasY }} className="absolute inset-0 z-10">
          {filteredProjects.map((project, i) => (
            <ImageCard
              key={project.title + i}
              project={project}
              i={i}
              smoothProgress={smoothProgress}
              masonryPos={masonryPositions[i]}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsGridSection;
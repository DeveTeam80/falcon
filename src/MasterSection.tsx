import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, MotionValue } from "framer-motion";

const spiralImages = [
  { src: "https://cdn.prod.website-files.com/685284771a3175da27f67ba1/6937e61b62c573f916024e78_1_Luxury_Villa_Night.avif", alt: "1" },
  { src: "https://cdn.prod.website-files.com/685284771a3175da27f67ba1/6937e61b37c5c78176983d54_2_Private_Spa_Landscape.avif", alt: "2" },
  { src: "https://cdn.prod.website-files.com/685284771a3175da27f67ba1/6937e61bfb74047d2ef52563_4_Luxury_Villa__Outdoor_Pool.avif", alt: "3" },
  { src: "https://cdn.prod.website-files.com/685284771a3175da27f67ba1/6937e61bc2307c9830e5ceec_5_Luxury_Master_Bedroom.avif", alt: "4" },
  { src: "https://cdn.prod.website-files.com/685284771a3175da27f67ba1/6937e61b7ca21af8764885cd_6_Architecture_Light_Materials.avif", alt: "5" }
];

const MasterSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 30,
    restDelta: 0.001,
  });

  // 1. Text Morphing Logic
  const words = [
    { visible: "TRANSFORMING", hidden: "CINEMATIC", range: [0, 0.2] },
    { visible: "ARCHITECTURE", hidden: "VISUAL", range: [0.1, 0.3] },
    { visible: "INTO", hidden: "NARRATIVES", range: [0.2, 0.4] },
  ];

  return (
    <main ref={containerRef} className="relative h-[600vh] bg-[#F8F7F4]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* TEXT LAYER */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
          {words.map((word, i) => {
            const y = useTransform(smoothProgress, word.range, ["0%", "-100%"]);
            const opacity = useTransform(smoothProgress, [0.4, 0.5], [1, 0]);
            
            return (
              <div key={i} className="h-[12vw] overflow-hidden relative w-full flex justify-center">
                <motion.div style={{ y, opacity }} className="flex flex-col">
                  <span className="text-[10vw] font-light uppercase leading-none">{word.visible}</span>
                  <span className="text-[10vw] font-serif italic uppercase leading-none">{word.hidden}</span>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

const ImageCard = ({ index, src, progress, total }: { index: number, src: string, progress: MotionValue<number>, total: number }) => {
  // Stagger the start of each image
  const start = 0.3 + (index * 0.05);
  const end = 0.8;

  // Fly in from different corners
  const initialX = index % 2 === 0 ? -150 : 150;
  const initialY = index < 2 ? -100 : 100;

  const x = useTransform(progress, [start, end], [`${initialX}%`, "0%"]);
  const y = useTransform(progress, [start, end], [`${initialY}%`, "0%"]);
  const rotate = useTransform(progress, [start, end], [index * 15, 0]);
  const scale = useTransform(progress, [start, end], [1.2, 1 - (index * 0.02)]);
  const opacity = useTransform(progress, [start, start + 0.1], [0, 1]);
  
  // Z-index trick: The last image in the array should end up on top
  const zIndex = index;

  return (
    <motion.div
      style={{
        x, y, rotate, scale, opacity, zIndex,
        position: "absolute",
      }}
      className="w-[40vw] aspect-[16/10] shadow-2xl rounded-sm overflow-hidden bg-gray-200"
    >
      <img src={src} className="w-full h-full object-cover" alt="Architectural" />
    </motion.div>
  );
};

export default MasterSection;
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

// const HeroLogo = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 977 423"
//     className="w-full h-auto"
//   >
//     <g fill="currentColor">
//       <path d="M836.06 1.01c77.3 0 139.94 62.69 139.94 140C976 218.33 913.35 281 836.06 281H702.61V1.01zm-52.82 80.17v119.44h44.58a59.5 59.5 0 0 0 42.21-17.5 59.7 59.7 0 0 0-42.2-101.94z" />
//       <path d="M595.45 183.2V1h80.14v279.99H556.68l-73.33-152.93V281H403.2V1h110.33z" />
//       <path d="M376.19 280.99h-141l61.26-140.29L235.2 1h141v279.99Z" />
//       <path d="M244.55 81.28H81.14v59.42h101.02v80.17H81.14v60.12H1V1h207.91z" />
//       <path d="M610.88 350.4h18.48v13.96h-18.48v31.8c0 3.36.95 6.05 3 7.89 2.03 1.82 5.08 2.63 8.92 2.63 1.47 0 2.85-.14 4.15-.44.8-.19 1.6-.4 2.41-.63v14c-1.04.47-2.48.88-4.34 1.19a42 42 0 0 1-7.12.54c-9 0-15.5-2.16-19.73-6.29-4.13-4.22-6.29-10.69-6.29-19.59v-31.1h-13.3V350.4h13.3v-16.26l19-7.1z" />
//       <path d="M732.73 350.6h18.48v13.96h-18.48v31.8c0 3.36.94 6.05 3 7.89 2.03 1.82 5.07 2.63 8.92 2.63 1.46 0 2.85-.14 4.14-.44.8-.19 1.61-.4 2.42-.63v14c-1.05.47-2.49.87-4.35 1.18a41.7 41.7 0 0 1-7.11.55c-9 0-15.51-2.16-19.74-6.29-4.13-4.22-6.28-10.69-6.28-19.59v-31.1h-13.3V350.6h13.3v-16.27l19-7.09z" />
//       <path d="M546.65 349c9.3 0 16.6 1.89 21.98 5.56v.01c5.05 3.36 7.93 7.96 8.69 13.85h-16.84a8.17 8.17 0 0 0-4.25-5.34c-2.46-1.42-5.83-2.08-10-2.08-3.8 0-6.8.56-8.9 1.81a5.9 5.9 0 0 0-3.16 5.35c0 2.04.93 3.69 2.67 4.88l.02.02h.02c1.65 1.04 4.26 1.9 7.74 2.66l12.89 2.66c7.04 1.46 12.24 4.18 15.7 8.08v.02a19.26 19.26 0 0 1 5.34 13.6c0 6.48-2.45 11.52-7.36 15.21l-.48.35c-5.18 3.66-12.64 5.56-22.52 5.56-10.33 0-18.42-2.08-24.36-6.13-5.6-3.82-8.77-8.98-9.54-15.53h16.83a10.8 10.8 0 0 0 5.06 7.13l.02.01.02.01c3 1.7 7.02 2.51 11.97 2.51 4.43 0 7.84-.6 10.04-1.97h.02a7.14 7.14 0 0 0 3.54-6.31c0-2.01-.7-3.67-2.18-4.82-1.33-1.21-3.65-2.09-6.73-2.74l-11.49-2.38c-8.15-1.7-14.1-4.2-17.93-7.43l-.37-.32c-3.78-3.44-5.68-7.83-5.68-13.25 0-6.6 2.52-11.66 7.56-15.29h.01c5.09-3.75 12.27-5.69 21.67-5.69" />
//       <path d="M508.46 321v14.52h-51.8v26.64h48.58v14.24h-48.58v28.88h53.48v14.52H437.1V321z" />
//       <path d="M404.3 321v98.8h-19V321z" />
//       <path d="M345.13 349c10.13 0 17.7 2.26 22.87 6.62 5.14 4.35 7.76 10.62 7.76 18.98v31.5c0 2.37.15 4.8.43 7.25v.05c.33 2 .79 4.14 1.37 6.4h-18.92c-.45-1.78-.8-3.68-1.04-5.68a89 89 0 0 1-.24-5l-1.89-.43a22.06 22.06 0 0 1-7.67 8.61c-4 2.58-8.94 3.9-14.86 3.9-6.92 0-12.3-1.73-16.28-5.08-3.96-3.43-5.96-7.95-5.96-13.66 0-6.34 2.35-11.37 7.06-15.18 4.85-3.96 11.65-6.57 20.5-7.77l17.64-2.49.87-.12v-4.54c0-3.14-1.08-5.68-3.3-7.48-2.12-1.9-5.2-2.76-9.05-2.76-3.64 0-6.68.62-9.03 1.95h-.01a9.6 9.6 0 0 0-4.28 5.19h-18.11c1.1-5.64 4.2-10.35 9.35-14.16 5.46-4.03 13.02-6.1 22.79-6.1m10.48 38.26-14.13 2.17c-3.82.57-6.78 1.64-8.76 3.3-2.03 1.71-3.02 4.06-3.02 6.93 0 2.6.96 4.7 2.94 6.13 1.9 1.37 4.37 2.01 7.3 2.01 4.58 0 8.53-1.22 11.8-3.7h.02v-.01c3.26-2.57 5-5.64 5-9.19v-7.81l-1.15.18ZM667.85 349c10.13 0 17.7 2.26 22.87 6.62 5.14 4.35 7.77 10.62 7.77 18.98v31.5c0 2.37.14 4.8.42 7.25v.03l.01.02c.32 2 .78 4.14 1.37 6.4h-18.93c-.45-1.78-.8-3.68-1.04-5.68-.12-1.5-.2-3.17-.24-5l-1.89-.43a22.05 22.05 0 0 1-7.66 8.61c-4.01 2.58-8.95 3.9-14.86 3.9-6.92 0-12.32-1.73-16.29-5.08-3.96-3.43-5.95-7.95-5.95-13.66 0-6.34 2.35-11.37 7.05-15.18 4.85-3.96 11.66-6.57 20.5-7.77l17.65-2.49.86-.12v-4.54c0-3.14-1.08-5.68-3.3-7.48-2.12-1.9-5.2-2.76-9.04-2.76-3.65 0-6.69.62-9.03 1.95h-.02a9.6 9.6 0 0 0-4.28 5.19h-18.1c1.1-5.64 4.19-10.35 9.34-14.16 5.47-4.03 13.03-6.1 22.79-6.1m10.49 38.26-14.14 2.17c-3.81.57-6.78 1.64-8.76 3.3-2.03 1.71-3.01 4.06-3.01 6.93 0 2.6.96 4.7 2.93 6.13 1.9 1.37 4.37 2.01 7.3 2.01 4.58 0 8.54-1.22 11.81-3.7l.02-.01c3.25-2.57 5-5.64 5-9.19v-7.81l-1.15.18Z" />
//       <path d="M269.54 349c7.23 0 13.45 1.46 18.7 4.36a30.73 30.73 0 0 1 12.2 12.07c2.9 5.15 4.36 11.22 4.36 18.27 0 1.47-.05 2.85-.14 4.13-.07.88-.16 1.74-.28 2.57h-53.25l.16 1.14c.63 4.51 2.05 8.16 4.32 10.86l.01.02c3.32 3.82 8.21 5.66 14.48 5.66 3.46 0 6.5-.58 9.1-1.77a12 12 0 0 0 5.65-5.37h17.7a30.76 30.76 0 0 1-10.68 14.2l-.5.36c-5.4 3.77-12.41 5.7-21.13 5.7-7.56 0-14.13-1.42-19.72-4.23l-.54-.28c-5.54-2.99-9.87-7.08-13.02-12.27l-.3-.5c-3.07-5.43-4.62-11.7-4.62-18.82 0-7.23 1.55-13.49 4.62-18.82a32.8 32.8 0 0 1 13.19-12.64c5.63-3.08 12.17-4.64 19.69-4.64m-.28 13.12c-5.76 0-10.36 1.97-13.66 5.96v.01c-1.93 2.42-3.25 5.52-3.98 9.26l-.24 1.19h34.26l-.08-1.08c-.37-4.67-1.8-8.34-4.4-10.86-2.94-3.02-6.95-4.48-11.9-4.48" />
//       <path d="M789.93 349c7.24 0 13.46 1.46 18.7 4.36a30.73 30.73 0 0 1 12.2 12.07c2.9 5.15 4.36 11.22 4.36 18.27 0 1.47-.05 2.85-.14 4.13-.07.88-.16 1.74-.28 2.57h-53.25l.16 1.14c.63 4.51 2.05 8.16 4.32 10.86l.01.02c3.33 3.82 8.21 5.66 14.48 5.66 3.47 0 6.51-.58 9.1-1.77a12 12 0 0 0 5.65-5.37h17.7a30.75 30.75 0 0 1-10.68 14.2l-.5.36c-5.4 3.77-12.41 5.7-21.13 5.7-7.56 0-14.13-1.42-19.72-4.23l-.54-.28a33.5 33.5 0 0 1-13.02-12.27l-.3-.5c-3.07-5.43-4.62-11.7-4.62-18.82 0-7.23 1.55-13.49 4.62-18.82a32.8 32.8 0 0 1 13.19-12.64c5.63-3.08 12.18-4.64 19.69-4.64m-.28 13.12c-5.76 0-10.36 1.97-13.65 5.96v.01h-.01c-1.93 2.42-3.25 5.52-3.98 9.26l-.24 1.19h34.26l-.08-1.08c-.37-4.67-1.8-8.34-4.4-10.86-2.94-3.02-6.95-4.48-11.9-4.48" />
//       <path d="M196.08 321c7.17 0 13.36 1.24 18.62 3.69h.01c5.26 2.36 9.3 5.7 12.18 10 2.86 4.3 4.31 9.33 4.31 15.13 0 5.7-1.44 10.68-4.3 14.98-2.88 4.21-6.92 7.55-12.19 10a42.7 42.7 0 0 1-14.92 3.45l-2.06.13 1.37 1.53 35.63 39.89h-26.4l-31.72-41.05-.3-.39h-4.75v41.44H152V321zm-24.52 43.54h23.96c5.27 0 9.46-1.2 12.41-3.74 3.06-2.65 4.55-6.3 4.55-10.84 0-4.6-1.43-8.22-4.4-10.7-2.96-2.55-7.2-3.74-12.56-3.74h-23.96z" />
//     </g>
//   </svg>
// );

// const HeroSection = () => {
//   const containerRef = useRef<HTMLDivElement>(null);

//   /**
//    * SCROLL TRACKING
//    */
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end start"],
//   });

//   /**
//    * SMOOTH SCROLL PROGRESS
//    */
//   const smoothProgress = useSpring(scrollYProgress, {
//     stiffness: 80,
//     damping: 25,
//     restDelta: 0.001,
//   });

//   const progress = useTransform(smoothProgress, [0, 0.2, 1], [0, 0, 1]);

//   /**
//    * HOUSE REVEAL (uses full scroll range)
//    */
//   const houseY = useTransform(progress, [0, 1], ["140%", "-5%"]);

//   const houseScale = useTransform(progress, [0, 1], [1, 1.08]);

//   /**
//    * TEXT (fixed, fades only near end)
//    */
//   const textOpacity = useTransform(progress, [0, 0.7, 0.95], [1, 1, 0]);

//   /**
//    * CLOUD PARALLAX
//    */
//   const cloudY = useTransform(progress, [0, 1], ["0%", "12%"]);
//   const cloudOpacity = useTransform(progress, [0, 0.8], [0.6, 0.25]);

//   /**
//    * LOGO FADE
//    */
//   const logoOpacity = useTransform(progress, [0, 0.1], [1, 0]);

//   return (
//     <section ref={containerRef} className="relative h-[360vh] bg-[#f5f2ed]">
//       {/* PINNED VIEWPORT */}
//       <div className="sticky top-0 h-screen w-full overflow-hidden">
//         {/* SKY BACKGROUND */}
//         <div className="absolute inset-0 z-0">
//           <img
//             src="/assets/images/back.webp"
//             alt="Sky"
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-b from-[#a5c7e9] to-[#f7d7b5] opacity-50" />
//         </div>

//         {/* TEXT */}
//         <motion.div
//           style={{ opacity: textOpacity }}
//           className="absolute inset-0 z-40 flex flex-col items-center justify-center text-center px-6"
//         >
//           <div className="max-w-5xl mb-24">
//             <h1 className="font-serif text-[10vw] lg:text-[8vw] leading-[0.9] text-black uppercase tracking-tighter">
//               {["Find", "What", "Moves", "You"].map((word, i) => (
//                 <div
//                   key={i}
//                   className="inline-block overflow-hidden mr-[0.2em] py-2"
//                 >
//                   <motion.span
//                     initial={{ y: "100%" }}
//                     animate={{ y: 0 }}
//                     transition={{
//                       delay: 0.5 + i * 0.1,
//                       duration: 1,
//                       ease: [0.33, 1, 0.68, 1],
//                     }}
//                     className="inline-block"
//                   >
//                     {word}
//                   </motion.span>
//                 </div>
//               ))}
//             </h1>

//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 1.2 }}
//               className="text-black text-xl lg:text-2xl mt-6 font-light"
//             >
//               Expert agents. Real guidance.
//               <span className="opacity-60">
//                 {" "}
//                 A clear path to find what’s next.
//               </span>
//             </motion.p>

//             <div className="mt-8">
//               <button className="bg-black text-white px-6 py-3 rounded-full">
//                 Find Properties →
//               </button>
//             </div>
//           </div>
//         </motion.div>

//         {/* COVER SHADOW (depth illusion) */}
//         <div className="absolute inset-0 z-15 pointer-events-none bg-gradient-to-b from-transparent via-black/5 to-transparent" />

//         {/* HOUSE */}
//         <motion.div
//           style={{ y: houseY, scale: houseScale }}
//           className="absolute inset-0 z-40 flex items-end justify-center pb-[12vh]"
//         >
//           <img
//             src="/assets/images/house.webp"
//             alt="House"
//             className="w-[85vw] h-auto object-contain"
//           />
//         </motion.div>

//         {/* CLOUDS */}
//         <motion.div
//           style={{ y: cloudY, opacity: cloudOpacity }}
//           className="absolute inset-0 z-30 pointer-events-none"
//         >
//           <img
//             src="/assets/images/smoke.webp"
//             alt="Clouds"
//             className="w-full h-full object-cover mix-blend-screen"
//           />
//         </motion.div>

//         {/* LOGO */}
//         <motion.div
//           style={{ opacity: logoOpacity }}
//           className="absolute top-10 left-10 z-50 w-20 lg:w-28 text-black/60"
//         >
//           <HeroLogo />
//         </motion.div>
//       </div>
//     </section>
//   );
// };


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
    { visible: "EVOKING", hidden: "DEFINING", isSerifVisible: true, isSerifHidden: false, range: [0.1, 0.4] },
    { visible: "UNBUILT", hidden: "FUTURE", isSerifVisible: false, isSerifHidden: true, range: [0.3, 0.6] },
    { visible: "REALITIES", hidden: "STANDARDS", isSerifVisible: true, isSerifHidden: false, range: [0.5, 0.8] },
  ];

  return (
    <section ref={containerRef} className="relative h-[200vh] bg-[#F8F7F4] z-40">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-40 bg-[#F8F7F4]">
        <div className="flex flex-col items-center text-center gap-4 md:gap-8 lg:gap-12 w-full max-w-7xl px-4">
          {words.map((word, i) => {
            const yVisible = useTransform(smoothProgress, word.range, ["0%", "-120%"]);
            const yHidden = useTransform(smoothProgress, word.range, ["120%", "0%"]);
            const opacityHidden = useTransform(smoothProgress, word.range, [0, 1]);
            const opacityVisible = useTransform(smoothProgress, word.range, [1, 0]);

            return (
              <div key={i} className="relative overflow-hidden h-[15vw] md:h-[12vw] lg:h-[10vw] flex items-center justify-center w-full">
                <motion.span style={{ y: yVisible, opacity: opacityVisible }} className={`${word.isSerifVisible ? "font-serif" : "font-display"} text-[12vw] md:text-[10vw] lg:text-[8vw] leading-none uppercase tracking-tighter text-black select-none whitespace-nowrap`}>
                  {word.visible}
                </motion.span>
                <motion.span style={{ y: yHidden, opacity: opacityHidden }} className={`absolute h-full flex items-center justify-center inset-0 ${word.isSerifHidden ? "font-serif" : "font-display"} text-[12vw] md:text-[10vw] lg:text-[8vw] leading-none uppercase tracking-tighter text-black select-none whitespace-nowrap`}>
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
  }
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
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-full flex items-center justify-center [transform-style:preserve-3d]">
          {spiralImages.map((img, i) => {
            const angleOffset = (i / spiralImages.length) * 360;
            
            // Adjusting startEntry to be much lower so images fly in sooner
            const startEntry = i * 0.04; 
            const endEntry = 0.25 + (i * 0.05);

            const xPos = useTransform(
              smoothProgress,
              [startEntry, endEntry],
              [150, 0]
            );

            const yPos = useTransform(
              smoothProgress,
              [startEntry, endEntry],
              [-100, 0]
            );

            const rotation = useTransform(totalRotation, (r) => r + angleOffset);
            const radius = useTransform(
              smoothProgress, 
              [startEntry, 0.5, 1], 
              [10, 45, 0] 
            );

            // Opacity and Scale need to trigger right at the start
            const opacity = useTransform(smoothProgress, [startEntry, startEntry + 0.02], [0, 1]);

            return (
              <motion.div
                key={i}
                style={{ 
                  rotate: rotation, 
                  width: "100%", 
                  zIndex: i,
                  position: "absolute",
                  opacity
                }}
                className="h-1 flex items-center justify-center origin-center pointer-events-none"
              >
                <motion.div
                  className="w-[40vw] aspect-[4/3] bg-white shadow-2xl border-[8px] border-white pointer-events-auto"
                  style={{
                    x: useTransform([xPos, radius], ([x, r]) => `${(x as number) + (r as number)}vw`),
                    y: useTransform([yPos], ([y]) => `${y}vh`),
                    rotateZ: useTransform(rotation, (r) => -r),
                    scale: useTransform(smoothProgress, [startEntry, endEntry], [0.5, 1]),
                  }}
                >
                  <img src={img.src} className="w-full h-full object-cover" alt="" />
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
        <div className="mb-24 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <span className="font-serif italic text-6xl md:text-8xl text-neutral-800 leading-tight">
              what people
            </span>
            <span className="font-sans font-bold text-6xl md:text-8xl text-neutral-900 uppercase tracking-tighter -mt-2">
              say about me
            </span>
          </motion.h2>
        </div>

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
    </main>
  );
}

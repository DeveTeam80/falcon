import { motion } from "motion/react";

const RevealingHeading = ({ 
  topText, 
  bottomText, 
  className = "" 
}: { 
  topText: string; 
  bottomText: string; 
  className?: string;
}) => {
  // Shared transition setting for a high-end, smooth feel
  const smoothTransition = {
    duration: 1.5,
    ease: [0.22, 1, 0.36, 1], // Custom "Expo Out" curve for a more fluid swoop
  };

  return (
    <motion.h2
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={`flex flex-col items-center ${className}`}
    >
      {/* Top Line: Serif/Italic */}
      <div className="overflow-hidden w-full flex justify-center">
        <motion.span
          variants={{
            hidden: { 
              y: "100%", 
              x: "-20%", // Slightly more offset for a clearer "left-to-center" path
              opacity: 0 
            },
            visible: { 
              y: 0, 
              x: 0, 
              opacity: 1,
              transition: {
                // By removing individual delays, x and y start together
                y: { ...smoothTransition, duration: 1.2 }, 
                x: { ...smoothTransition, duration: 1.8 }, // x lasts longer to "settle" into center
                opacity: { duration: 1 }
              }
            }
          }}
          className="font-serif italic text-6xl md:text-8xl text-neutral-800 leading-tight whitespace-nowrap"
        >
          {topText}
        </motion.span>
      </div>

      {/* Bottom Line: Sans/Bold */}
      <div className="overflow-hidden w-full flex justify-center -mt-2">
        <motion.span
          variants={{
            hidden: { y: "100%" },
            visible: { 
              y: 0, 
              transition: { 
                ...smoothTransition,
                delay: 0.05 // A tiny staggered start for the second line looks more organic
              } 
            }
          }}
          className="font-sans font-bold text-6xl md:text-8xl text-neutral-900 uppercase tracking-tighter"
        >
          {bottomText}
        </motion.span>
      </div>
    </motion.h2>
  );
};

export default RevealingHeading;
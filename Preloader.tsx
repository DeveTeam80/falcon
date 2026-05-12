import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = ({ isComplete }: { isComplete: boolean }) => {
  const [stage, setStage] = useState("reveal");

  useEffect(() => {
    const revealTimer = setTimeout(() => setStage("rotate"), 1800);
    const finishTimer = setTimeout(() => setStage("finish"), 3000);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(finishTimer);
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-[#F4F1EE]"
      animate={{ opacity: isComplete ? 0 : 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{ pointerEvents: isComplete ? "none" : "auto" }}
    >
      <div className="relative flex flex-col items-center justify-center w-full h-full">
        <AnimatePresence mode="wait">
          {stage === "reveal" && (
            <motion.div
              key="text-reveal"
              className="flex items-center font-display font-bold uppercase text-6xl tracking-tighter text-neutral-900"
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="overflow-hidden">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                  className="block mr-4"
                >
                  Falcon
                </motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.span
                  initial={{ y: "-100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                  className="block"
                >
                  Design
                </motion.span>
              </div>
            </motion.div>
          )}

          {(stage === "rotate" || stage === "finish") && (
            <motion.div
              key="logo-container"
              // When stage is finish, we move to the exact Nav position
              className={stage === "finish" 
                ? "fixed top-8 left-8 md:left-12 md:top-8 w-24 h-12" // MATCH YOUR NAV SIZE/POS
                : "relative w-32 h-32"
              }
              transition={{
                duration: 1.4,
                ease: [0.76, 0, 0.24, 1], // Premium easing
              }}
              layout // This is the magic for smooth size/pos interpolation
            >
              <motion.img
                layoutId="main-logo"
                src="/assets/images/falcon-logo.png"
                alt="Logo"
                className="w-full h-full object-contain"
                initial={{ rotateX: -90, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Preloader;
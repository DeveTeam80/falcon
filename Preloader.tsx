import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type PreloaderProps = {
  onComplete: () => void;
};

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [stage, setStage] = useState<"reveal" | "rotate" | "finish">("reveal");

  useEffect(() => {
    const revealTimer = setTimeout(() => {
      setStage("rotate");
    }, 1800);

    const finishTimer = setTimeout(() => {
      setStage("finish");
    }, 3200);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 4300);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(finishTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-[#F4F1EE]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="relative flex h-full w-full flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {stage === "reveal" && (
            <motion.div
              key="text-reveal"
              className="flex items-center font-display text-6xl font-bold uppercase tracking-tighter text-neutral-900"
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div className="overflow-hidden">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                  className="mr-4 block"
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
              layout
              className={
                stage === "finish"
                  ? "fixed left-8 top-8 h-40 w-40 md:left-20 md:top-14 md:h-24 md:w-24"
                  : "relative h-[200px] w-[240px]"
              }
              transition={{
                duration: stage === "finish" ? 1.4 : 1,
                ease: [0.76, 0, 0.24, 1],
              }}
            >
              <motion.div
                className="relative h-full w-full"
                initial={{
                  scale: 0.7,
                  opacity: 0,
                }}
                animate={
                  stage === "finish"
                    ? {
                        scale: 1.2,
                        opacity: 1,
                      }
                    : {
                        scale: 1,
                        opacity: 1,
                      }
                }
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <motion.div
                  className="absolute inset-0 overflow-hidden"
                  initial={{
                    x: -120,
                    y: -40,
                    rotate: -12,
                    opacity: 0,
                  }}
                  animate={{
                    x: 0,
                    y: 0,
                    rotate: 0,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    clipPath: "polygon(0 0, 34% 0, 28% 100%, 0 100%)",
                  }}
                >
                  <motion.img
                    src="/assets/images/falcon-logo.png"
                    alt="Falcon Design Logo"
                    className="h-full w-full object-contain"
                  />
                </motion.div>

                <motion.div
                  className="absolute inset-0 overflow-hidden"
                  initial={{
                    y: 120,
                    rotate: 8,
                    opacity: 0,
                  }}
                  animate={{
                    y: 0,
                    rotate: 0,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    clipPath: "polygon(34% 0, 68% 0, 62% 100%, 28% 100%)",
                  }}
                >
                  <motion.img
                    src="/assets/images/falcon-logo.png"
                    alt="Falcon Design Logo"
                    className="h-full w-full object-contain"
                  />
                </motion.div>

                <motion.div
                  className="absolute inset-0 overflow-hidden"
                  initial={{
                    x: 120,
                    y: 40,
                    rotate: 12,
                    opacity: 0,
                  }}
                  animate={{
                    x: 0,
                    y: 0,
                    rotate: 0,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.16,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    clipPath: "polygon(68% 0, 100% 0, 100% 100%, 62% 100%)",
                  }}
                >
                  <motion.img
                    src="/assets/images/falcon-logo.png"
                    alt="Falcon Design Logo"
                    className="h-full w-full object-contain"
                  />
                </motion.div>

                <motion.div
                  className="absolute inset-0 rounded-full bg-black/5 blur-2xl"
                  animate={{
                    opacity: [0.2, 0.45, 0.2],
                    scale: [0.9, 1.1, 0.9],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Preloader;

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import RevealingHeading from "./RevealingHeader";

const studies = [
  {
    id: "01",
    title: "Falcon Architecture",
    subtitle: "Luxury Interior Experience",
    problem:
      "Luxury residences looked visually premium but emotionally forgettable.",
    solution:
      "Created cinematic interaction systems with layered storytelling and immersive transitions.",
    result: "42% higher engagement",
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=2200&auto=format&fit=crop",
  },
  {
    id: "02",
    title: "Vertex Studio",
    subtitle: "Creative Brand Identity",
    problem:
      "Creative agencies struggled to showcase innovation without overwhelming users.",
    solution:
      "Built a restrained luxury interface with smooth pacing and emotional hierarchy.",
    result: "2.4x portfolio interaction",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=2200&auto=format&fit=crop",
  },
  {
    id: "03",
    title: "Noir Residence",
    subtitle: "Minimal Living Spaces",
    problem:
      "Modern spaces lacked emotional warmth and immersive storytelling.",
    solution:
      "Introduced adaptive motion systems and cinematic visual composition.",
    result: "31% better retention",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2200&auto=format&fit=crop",
  },
];

const SLIDE_COUNT = studies.length;
const ENTRY_END = 0.14;
const H_START = ENTRY_END;
const H_END = 0.92;
const DWELL_THRESHOLD = 200;

const CaseStudies = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const dwellBucket = useRef(0);
  const isDwelling = useRef(false);
  const released = useRef<"none" | "start" | "end">("none");
  const rafId = useRef<number | null>(null);
  const accumDelta = useRef(0);
  const touchY = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 28,
    mass: 0.4,
    restDelta: 0.00001,
  });

  // ── ENTRY: grows up from below (0 → ENTRY_END) ─────────────────────
  const entryScale = useTransform(smooth, [0, ENTRY_END], [0.82, 1]);
  const entryY = useTransform(smooth, [0, ENTRY_END], [80, 0]);
  const entryOpacity = useTransform(
    smooth,
    [0, ENTRY_END * 0.4, ENTRY_END],
    [0, 1, 1],
  );

  // ── EXIT: mirrors entry exactly — shrinks down (H_END → 1) ─────────
  // origin-bottom on both wrappers = grows up on entry, shrinks down on exit
  // exitY goes from 0 → 80 (slides down, same distance as entry)
  const exitScale = useTransform(smooth, [H_END, 1], [1, 0.82]);
  const exitY = useTransform(smooth, [H_END, 1], [0, 80]);
  const exitOpacity = useTransform(smooth, [H_END, H_END + 0.05, 1], [1, 1, 0]);

  // ── Horizontal strip ───────────────────────────────────────────────
  const x = useTransform(
    smooth,
    [H_START, H_END],
    ["0vw", `-${(SLIDE_COUNT - 1) * 100}vw`],
  );

  // First slide content gate
  const firstContentOpacity = useTransform(
    smooth,
    [ENTRY_END * 0.55, ENTRY_END],
    [0, 1],
  );
  // Last slide content gate — fades as exit begins
  const lastContentOpacity = useTransform(
    smooth,
    [H_END, H_END + 0.04],
    [1, 0],
  );

  // ── Scroll engine ──────────────────────────────────────────────────
  useEffect(() => {
    const getEl = () => containerRef.current;

    const getProgress = (): number => {
      const c = getEl();
      if (!c) return -1;
      const h = c.offsetHeight - window.innerHeight;
      if (h <= 0) return 0;
      return -c.getBoundingClientRect().top / h;
    };

    const docTop = (): number => {
      const c = getEl();
      if (!c) return 0;
      return c.getBoundingClientRect().top + window.scrollY;
    };

    const jumpTo = (p: number) => {
      const c = getEl();
      if (!c) return;
      const h = c.offsetHeight - window.innerHeight;
      window.scrollTo({
        top: docTop() + p * h,
        behavior: "instant" as ScrollBehavior,
      });
    };

    const flush = () => {
      rafId.current = null;
      const delta = accumDelta.current;
      accumDelta.current = 0;
      if (delta === 0) return;

      const p = getProgress();
      const goingDown = delta > 0;
      const goingUp = delta < 0;

      if (p < 0 || p > 1) return;
      if (p < H_START - 0.003) return;
      if (p > H_END + 0.003) return;

      const atStart = p <= H_START + 0.022;
      const atEnd = p >= H_END - 0.022;

      // ── START dwell ──────────────────────────────────────────────
      if (goingUp && atStart) {
        if (!isDwelling.current) {
          isDwelling.current = true;
          dwellBucket.current = 0;
          jumpTo(H_START);
        }
        dwellBucket.current += Math.abs(delta);
        if (dwellBucket.current >= DWELL_THRESHOLD) {
          isDwelling.current = false;
          dwellBucket.current = 0;
          released.current = "start";
        }
        return;
      }

      // ── END dwell ────────────────────────────────────────────────
      if (goingDown && atEnd) {
        if (!isDwelling.current) {
          isDwelling.current = true;
          dwellBucket.current = 0;
          jumpTo(H_END);
        }
        dwellBucket.current += Math.abs(delta);
        if (dwellBucket.current >= DWELL_THRESHOLD) {
          isDwelling.current = false;
          dwellBucket.current = 0;
          released.current = "end";
        }
        return;
      }

      // Reset when away from edges
      if (p > H_START + 0.05 && p < H_END - 0.05) {
        isDwelling.current = false;
        dwellBucket.current = 0;
      }

      // ── Normal horizontal scroll ─────────────────────────────────
      const speed = 1.2 / window.innerHeight;
      const next = Math.max(H_START, Math.min(H_END, p + delta * speed));
      jumpTo(next);
    };

    const schedule = (delta: number) => {
      accumDelta.current += delta;
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(flush);
      }
    };

    const onWheel = (e: WheelEvent) => {
      const p = getProgress();
      if (p < -0.02 || p > 1.02) return;
      if (p < H_START - 0.003) return;
      if (p > H_END + 0.003) return;

      if (
        e.deltaY < 0 &&
        p <= H_START + 0.022 &&
        released.current === "start"
      ) {
        released.current = "none";
        return;
      }
      if (e.deltaY > 0 && p >= H_END - 0.022 && released.current === "end") {
        released.current = "none";
        return;
      }

      e.preventDefault();
      schedule(e.deltaY);
    };

    const onTouchStart = (e: TouchEvent) => {
      touchY.current = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      const p = getProgress();
      const dy = touchY.current - e.touches[0].clientY;
      touchY.current = e.touches[0].clientY;

      if (p < H_START - 0.003 || p > H_END + 0.003) return;

      if (dy < 0 && p <= H_START + 0.022 && released.current === "start") {
        released.current = "none";
        return;
      }
      if (dy > 0 && p >= H_END - 0.022 && released.current === "end") {
        released.current = "none";
        return;
      }

      e.preventDefault();
      schedule(dy * 2);
    };

    const onNativeScroll = () => {
      const p = getProgress();
      if (p < 0 || p > 1) {
        isDwelling.current = false;
        dwellBucket.current = 0;
        released.current = "none";
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("scroll", onNativeScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("scroll", onNativeScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#F8F7F4] py-32"
      style={{ height: `${SLIDE_COUNT * 140}svh` }}
    >
      {/* HEADING */}
      <div className="flex flex-col gap-10 pb-12 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <RevealingHeading topText="Selected" bottomText="Case Studies" />
        </div>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-xl text-base leading-relaxed text-black/55 md:text-lg"
        >
          Transforming complex design challenges into immersive digital
          experiences through cinematic storytelling and premium interaction
          systems.
        </motion.p>
      </div>

      {/* STICKY CANVAS */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/*
          Both wrappers use origin-bottom:
          - Entry: scale 0.82→1, y 80→0  = grows up from bottom ✓
          - Exit:  scale 1→0.82, y 0→80  = shrinks down to bottom ✓  (mirrors entry)
        */}

        {/* EXIT wrapper */}
        <motion.div
          style={{ scale: exitScale, y: exitY, opacity: exitOpacity }}
          className="h-full w-full origin-bottom"
        >
          {/* ENTRY wrapper */}
          <motion.div
            style={{ scale: entryScale, y: entryY, opacity: entryOpacity }}
            className="h-full w-full origin-bottom"
          >
            {/* HORIZONTAL STRIP */}
            <motion.div style={{ x }} className="flex h-full">
              {studies.map((study, index) => {
                const isFirst = index === 0;
                const isLast = index === SLIDE_COUNT - 1;
                const range = H_END - H_START;
                const start = H_START + (index / SLIDE_COUNT) * range;
                const end = H_START + ((index + 1) / SLIDE_COUNT) * range;

                // How wide is this slide's progress window
                const slideRange = end - start;

                // Text visibility — last slide holds until H_END
                const textOpacity = useTransform(
                  smooth,
                  isLast
                    ? [start - 0.04, start, H_END - 0.01, H_END + 0.01]
                    : [start - 0.04, start, end - 0.04, end],
                  [1, 1, 1, 0],
                );
                const textY = useTransform(smooth, [start, end], [45, -45]);

                // Title — all slides use same relative offset within their range
                // Last slide: starts animating as soon as it enters (no delay)
                const titleInStart = isFirst
                  ? ENTRY_END * 0.7
                  : isLast
                    ? start // immediate on entry
                    : start - 0.015;
                const titleInEnd = isFirst
                  ? ENTRY_END
                  : isLast
                    ? start + slideRange * 0.25 // 25% into slide range
                    : start + 0.05;

                const titleY = useTransform(
                  smooth,
                  [titleInStart, titleInEnd],
                  isFirst ? [50, 0] : [130, 0],
                );
                const titleOpacity = useTransform(
                  smooth,
                  [titleInStart, titleInEnd],
                  [0, 1],
                );

                // Subtitle + problem — slight stagger after title
                const subInStart = isFirst
                  ? ENTRY_END * 0.75
                  : isLast
                    ? start + slideRange * 0.02
                    : start + 0.01;
                const subInEnd = isFirst
                  ? ENTRY_END
                  : isLast
                    ? start + slideRange * 0.3
                    : start + 0.06;

                const subY = useTransform(
                  smooth,
                  [subInStart, subInEnd],
                  isFirst ? [25, 0] : [45, 0],
                );
                const subOpacity = useTransform(
                  smooth,
                  [subInStart, subInEnd],
                  [0, 1],
                );

                const imgScale = useTransform(
                  smooth,
                  [start, end],
                  [1.05, 1.0],
                );
                const imgY = useTransform(smooth, [start, end], [25, -25]);
                const barWidth = useTransform(
                  smooth,
                  [start, end],
                  ["0%", "100%"],
                );

                return (
                  <section
                    key={study.id}
                    className="relative h-screen w-screen shrink-0 overflow-hidden"
                  >
                    {/* IMAGE */}
                    <motion.div
                      style={{ scale: imgScale, y: imgY }}
                      className="absolute inset-0"
                    >
                      <img
                        src={study.image}
                        alt={study.title}
                        className="h-full w-full object-cover"
                      />
                    </motion.div>

                    <div className="absolute inset-0 bg-black/42" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/78 via-black/15 to-black/48" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                    <motion.div
                      animate={{ x: [0, 90, 0], y: [0, -70, 0] }}
                      transition={{
                        duration: 11,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute right-[10%] top-[14%] h-96 w-96 rounded-full bg-white/8 blur-3xl"
                    />

                    {/* CONTENT */}
                    <motion.div
                      style={{
                        opacity: isFirst
                          ? firstContentOpacity
                          : isLast
                            ? lastContentOpacity
                            : undefined,
                      }}
                      className="contents"
                    >
                      <motion.div
                        style={{ opacity: textOpacity, y: textY }}
                        className="relative z-20 flex h-full flex-col justify-end px-6 pb-16 md:px-12 md:pb-16"
                      >
                        <div className="max-w-[950px]">
                          <div className="mb-8 overflow-hidden">
                            <motion.div
                              style={{ width: barWidth }}
                              className="h-[2px] bg-white/75"
                            />
                          </div>

                          <motion.p
                            style={{ opacity: subOpacity, y: subY }}
                            className="mb-5 text-[10px] uppercase tracking-[0.45em] text-white/55"
                          >
                            {study.subtitle}
                          </motion.p>

                          <div className="overflow-hidden mb-6">
                            <motion.h2
                              style={{ y: titleY, opacity: titleOpacity }}
                              className="text-[3rem] font-black uppercase leading-[0.85] tracking-[-0.07em] text-white md:text-[7.5rem]"
                            >
                              {study.title}
                            </motion.h2>
                          </div>

                          <motion.p
                            style={{ opacity: subOpacity, y: subY }}
                            className="mb-9 max-w-2xl text-base leading-relaxed text-white/78 md:text-xl"
                          >
                            {study.problem}
                          </motion.p>

                          <div className="flex flex-col gap-8 border-t border-white/10 pt-7 lg:flex-row lg:items-end lg:justify-between">
                            <div className="max-w-xl">
                              <p className="text-sm leading-relaxed text-white/58 md:text-base">
                                {study.solution}
                              </p>
                            </div>

                            <div className="flex items-center gap-8">
                              <div className="text-right">
                                <p className="mb-1 text-[10px] uppercase tracking-[0.45em] text-white/35">
                                  Result
                                </p>
                                <h3 className="text-lg font-bold uppercase tracking-[-0.04em] text-white md:text-2xl">
                                  {study.result}
                                </h3>
                              </div>

                              <motion.div
                                whileHover={{ scale: 1.08, rotate: 8 }}
                                whileTap={{ scale: 0.96 }}
                                transition={{
                                  type: "spring",
                                  stiffness: 260,
                                  damping: 16,
                                }}
                                className="group relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/10 backdrop-blur-xl md:h-28 md:w-28"
                              >
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{
                                    duration: 12,
                                    repeat: Infinity,
                                    ease: "linear",
                                  }}
                                  className="absolute inset-0 rounded-full border border-dashed border-white/20"
                                />
                                <span className="relative z-10 text-[10px] uppercase tracking-[0.35em] text-white">
                                  Explore
                                </span>
                              </motion.div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  </section>
                );
              })}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudies;

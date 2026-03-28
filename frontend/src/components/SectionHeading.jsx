import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ badge, title, italicWord, subtitle, center = false }) {
  const titleParts = italicWord
    ? title.split(italicWord)
    : [title];

  return (
    <FadeUp className={center ? "text-center" : ""}>
      {badge && (
        <span className="inline-block mb-4 px-3 py-1 rounded-full border border-gold/30 text-gold text-xs tracking-widest uppercase">
          {badge}
        </span>
      )}
      <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight mb-4">
        {italicWord ? (
          <>
            {titleParts[0]}
            <em className="text-gold not-italic italic">{italicWord}</em>
            {titleParts[1]}
          </>
        ) : title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </FadeUp>
  );
}

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Calendar } from "lucide-react";
import heroImg from "@/assets/hero-forest.jpg";

export default function Hero() {
  return (
    <section className="relative h-screen flex flex-col overflow-hidden">
      {/* Background Image with parallax feel */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Red Sandalwood farmland"
          className="w-full h-full object-cover scale-105"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest/80 via-forest/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center pt-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 glass text-gold text-xs tracking-widest uppercase mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                Structured Farmland Ownership 🌿
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="font-serif text-5xl md:text-7xl text-foreground leading-[1.05] mb-5"
            >
              Own a{" "}
              <em className="text-gold italic">Rare</em>{" "}
              Asset Class<br className="hidden md:block" /> Built on Time<br className="hidden md:block" /> and Nature
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="text-foreground/75 text-lg md:text-xl leading-relaxed max-w-xl mb-3"
            >
              Premium farmland projects integrating Red Sandalwood plantations, designed for long-term ownership and transparency.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="text-gold/80 text-sm tracking-wide italic mb-8"
            >
              "Visit the land. Understand it. Then decide."
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="flex flex-wrap gap-3 mb-12"
            >
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-gold text-forest font-semibold text-sm hover:shadow-gold hover:scale-105 transition-all duration-300"
              >
                Explore Projects
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/site-visit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gold/50 text-foreground text-sm hover:border-gold hover:bg-gold/10 transition-all duration-300"
              >
                <Calendar className="w-4 h-4 text-gold" />
                Schedule Site Visit
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass text-foreground/80 text-sm hover:text-foreground transition-all duration-300"
              >
                Talk to Advisor
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Land Preview Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="relative z-10 container mx-auto px-6 pb-10"
      >
        <div className="glass rounded-2xl p-5 max-w-lg ml-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-muted-foreground tracking-widest uppercase">Live Project Preview</span>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Project Name</p>
              <p className="font-serif text-foreground">Srikakulam Greens</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Location</p>
              <p className="text-foreground text-sm flex items-center gap-1">
                <MapPin className="w-3 h-3 text-gold" />
                Andhra Pradesh
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Plot Sizes</p>
              <p className="text-foreground text-sm">200 – 500 sq. yards</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Availability</p>
              <p className="text-green-400 text-sm font-medium">Open</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link
              to="/projects/srikakulam-greens"
              className="flex-1 text-center py-2 rounded-full bg-gradient-gold text-forest text-xs font-semibold hover:shadow-gold transition-all duration-300"
            >
              View Project
            </Link>
            <Link
              to="/site-visit"
              className="flex-1 text-center py-2 rounded-full border border-gold/40 text-gold text-xs hover:border-gold hover:bg-gold/10 transition-all duration-300"
            >
              Book Visit
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8 bg-gradient-to-b from-gold/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}

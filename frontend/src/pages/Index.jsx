import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FadeUp, SectionHeading } from "@/components/SectionHeading";
import { Link } from "react-router-dom";
import { ArrowRight, TreePine, Shield, Map, Eye, CheckCircle2 } from "lucide-react";
import projectFarm from "@/assets/project-farm.jpg";
import heroForest from "@/assets/hero-forest.jpg";

const features = [
  {
    icon: Map,
    title: "Identified Growth Corridors",
    desc: "Projects selected in regions with proven infrastructure development and connectivity.",
  },
  {
    icon: TreePine,
    title: "Plantation Integration",
    desc: "Every project includes a structured Red Sandalwood plantation as a land-use component.",
  },
  {
    icon: Shield,
    title: "Full Transparency",
    desc: "All legal documents, approvals, and land records shared before any purchase.",
  },
  {
    icon: Eye,
    title: "Site Visit First",
    desc: "We encourage every prospective buyer to visit and evaluate the land physically.",
  },
];

const whyPoints = [
  "Structured, organized plots with defined boundaries",
  "Internal roads and planned layout",
  "Plantation-integrated land use",
  "Clear documentation before any commitment",
  "No pressure — visit first, decide later",
];

export default function Index() {
  return (
    <div className="bg-background text-foreground">
      <Navbar />
      <Hero />

      {/* Brand Story */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeading
              badge="Our Story"
              title="Where Land Meets Long-Term "
              italicWord="Thinking"
              subtitle="At Red Gold Fields, we develop structured farmland projects that combine ecological value with organized land ownership."
            />
            <FadeUp delay={0.2} className="mt-8 space-y-3">
              {whyPoints.map((p) => (
                <div key={p} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{p}</span>
                </div>
              ))}
            </FadeUp>
            <FadeUp delay={0.4} className="mt-8">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-gold hover:gap-3 transition-all duration-300 text-sm font-medium"
              >
                Learn Our Approach <ArrowRight className="w-4 h-4" />
              </Link>
            </FadeUp>
          </div>

          <FadeUp delay={0.2}>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <img
                src={projectFarm}
                alt="Structured farmland project"
                className="w-full h-full object-cover"
                loading="lazy"
                width={1024}
                height={900}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/60 to-transparent" />
              <div className="absolute bottom-4 left-4 glass rounded-xl px-4 py-3">
                <p className="text-xs text-muted-foreground mb-0.5">Active Projects</p>
                <p className="font-serif text-2xl text-foreground">3 Locations</p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Why This Model */}
      <section className="py-20 bg-earth">
        <div className="container mx-auto px-6">
          <SectionHeading
            badge="The Approach"
            title="A More Structured Way to Own "
            italicWord="Land"
            subtitle="Traditional land is often fragmented and opaque. Our projects bring structure, visibility, and long-term usability."
            center
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {features.map((f, i) => (
              <FadeUp key={f.title} delay={i * 0.1}>
                <div className="bg-gradient-card border border-border/40 rounded-2xl p-6 h-full hover:border-gold/30 hover:shadow-gold transition-all duration-400 group">
                  <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                    <f.icon className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="font-serif text-foreground text-lg mb-2">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Red Sandalwood Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                <img
                  src={heroForest}
                  alt="Red Sandalwood plantation"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={1920}
                  height={1080}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="glass rounded-xl p-4">
                    <p className="text-xs text-muted-foreground tracking-widest uppercase mb-2">Asset Profile</p>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { label: "Type", val: "Regulated" },
                        { label: "Nature", val: "Long-term" },
                        { label: "Origin", val: "S. India" },
                      ].map((s) => (
                        <div key={s.label}>
                          <p className="text-xs text-muted-foreground">{s.label}</p>
                          <p className="text-gold text-sm font-medium">{s.val}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>

            <div>
              <SectionHeading
                badge="The Asset"
                title="Understanding Red "
                italicWord="Sandalwood"
                subtitle="Red Sandalwood (Pterocarpus santalinus) is a rare, government-regulated timber species native to Southern India."
              />
              <FadeUp delay={0.2} className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  It grows slowly by nature — making it inherently long-term. Cultivation is strictly regulated and
                  requires government approvals. When integrated into farmland projects, it becomes a complementary
                  land-use element rather than a speculative crop.
                </p>
                <p>
                  We view it as a <span className="text-gold italic">patience-based asset</span> — not a short-term
                  return model. Buyers should understand this distinction clearly before deciding.
                </p>
              </FadeUp>
              <FadeUp delay={0.4} className="mt-8 flex gap-3">
                <Link
                  to="/investment"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gold/40 text-gold text-sm hover:bg-gold/10 hover:border-gold transition-all duration-300"
                >
                  Read Investment Overview
                </Link>
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-gold text-forest text-sm font-semibold hover:shadow-gold transition-all duration-300"
                >
                  Shop Products
                </Link>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-earth">
        <div className="container mx-auto px-6">
          <FadeUp className="max-w-3xl mx-auto text-center">
            <p className="text-gold text-sm tracking-widest uppercase mb-4">Next Step</p>
            <h2 className="font-serif text-5xl md:text-6xl text-foreground mb-6">
              Visit. <em className="text-gold italic">Understand.</em> Then Decide.
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
              Every investor is encouraged to visit and evaluate the land physically before making any commitment.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/site-visit"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-gold text-forest font-semibold hover:shadow-gold hover:scale-105 transition-all duration-300"
              >
                Schedule Your Site Visit
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-border/60 text-foreground hover:border-gold/40 transition-all duration-300"
              >
                View All Projects
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}

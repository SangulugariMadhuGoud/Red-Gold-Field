import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FadeUp, SectionHeading } from "@/components/SectionHeading";
import { Link } from "react-router-dom";
import { AlertTriangle, CheckCircle2, ArrowRight, TrendingUp, Clock, MapPin } from "lucide-react";

const factors = [
  { icon: MapPin, title: "Location Quality", desc: "Proximity to infrastructure, highways, and developing zones significantly influences land value over time." },
  { icon: TrendingUp, title: "Development Activity", desc: "Government-led infrastructure and industrial projects in nearby regions can positively affect adjacent land parcels." },
  { icon: Clock, title: "Time Horizon", desc: "Agricultural land is inherently a long-term holding. Short-term liquidity expectations are not appropriate." },
];

const principles = [
  "We do not promise or guarantee financial returns",
  "All claims about land value are contextual and historical, not projections",
  "Buyers are encouraged to seek independent legal and financial advice",
  "Site visits are arranged before any purchase decision",
  "Full documentation is shared and verified before agreement",
];

export default function Investment() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />

      <div className="pt-32 pb-16 bg-earth">
        <div className="container mx-auto px-6">
          <FadeUp>
            <span className="text-gold text-xs tracking-widest uppercase">Investment Overview</span>
            <h1 className="font-serif text-5xl md:text-6xl text-foreground mt-3 mb-4">
              Understanding Farmland as an <em className="text-gold italic">Asset</em>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl">
              A transparent overview of how agricultural land works, what influences its value, and what you should know before buying.
            </p>
          </FadeUp>
        </div>
      </div>

      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <FadeUp>
            <h2 className="font-serif text-3xl text-foreground mb-4">How Land Value Works</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Agricultural land value is determined by multiple factors — none of which can be predicted with certainty. Unlike financial instruments, land value depends on physical, geographical, and developmental context.
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {factors.map((f, i) => (
              <FadeUp key={f.title} delay={i * 0.1}>
                <div className="bg-gradient-card border border-border/40 rounded-2xl p-6 h-full">
                  <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mb-4">
                    <f.icon className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="font-serif text-lg text-foreground mb-2">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.1}>
            <h2 className="font-serif text-3xl text-foreground mb-4">Red Sandalwood as a Land-Use Element</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our projects integrate Red Sandalwood plantation as a long-term land-use component. This is not a financial product — it is a species integrated into the agricultural use of the land.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Red Sandalwood grows slowly. It takes many years to mature. Regulatory compliance is required at every stage. We view it as a <span className="text-gold italic">patience-based asset</span> — appropriate only for buyers who have a long-term view of land ownership.
            </p>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="bg-amber-950/30 border border-amber-700/30 rounded-2xl p-6 mb-10 flex items-start gap-4">
              <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="text-amber-300 font-semibold mb-2">Important: No Returns Guaranteed</h3>
                <p className="text-amber-200/70 text-sm leading-relaxed">
                  Red Gold Fields does not guarantee, promise, or imply any financial return on land purchases or plantation investments. Agricultural land is a long-term holding with inherent risks including regulatory changes, climate impact, and market conditions. Past appreciation of similar assets in the region is not a reliable indicator of future performance.
                </p>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <h2 className="font-serif text-2xl text-foreground mb-4">Our Transparency Principles</h2>
            <div className="space-y-3">
              {principles.map((p) => (
                <div key={p} className="flex items-start gap-3 bg-earth rounded-xl px-4 py-3">
                  <CheckCircle2 className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                  <span className="text-muted-foreground text-sm">{p}</span>
                </div>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.25} className="mt-12 text-center">
            <p className="text-muted-foreground mb-6">Ready to evaluate the land for yourself?</p>
            <Link
              to="/site-visit"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-gold text-forest font-semibold hover:shadow-gold transition-all duration-300"
            >
              Schedule a Site Visit <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FadeUp } from "@/components/SectionHeading";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Users, Shield, Eye } from "lucide-react";
import heroForest from "@/assets/hero-forest.jpg";

const values = [
  { icon: Leaf, title: "Ecological Integrity", desc: "We select only genuine land parcels with viable plantation potential and responsible management." },
  { icon: Eye, title: "Full Transparency", desc: "Every document, approval, and land detail is shared before any conversation about purchase." },
  { icon: Shield, title: "Legal Compliance", desc: "All projects comply with applicable state and central regulations for agricultural land and plantation." },
  { icon: Users, title: "Buyer-First Approach", desc: "We encourage site visits and independent advice. Our team informs — it does not pressure." },
];

export default function About() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />

      {/* Header */}
      <div className="relative pt-24 pb-0 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroForest} alt="About" className="w-full h-full object-cover opacity-20" loading="lazy" width={1920} height={600} />
          <div className="absolute inset-0 bg-gradient-to-b from-forest via-forest/80 to-forest" />
        </div>
        <div className="relative z-10 container mx-auto px-6 pt-16 pb-20 text-center max-w-3xl mx-auto">
          <FadeUp>
            <span className="text-gold text-xs tracking-widest uppercase">Who We Are</span>
            <h1 className="font-serif text-5xl md:text-6xl text-foreground mt-3 mb-6">
              Our <em className="text-gold italic">Approach</em>
            </h1>
            <p className="text-muted-foreground text-xl leading-relaxed">
              Red Gold Fields exists to bring structure, transparency, and clarity to farmland ownership — starting with the land that is often misunderstood: Red Sandalwood estates.
            </p>
          </FadeUp>
        </div>
      </div>

      <section className="py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16 items-start mb-20">
            <FadeUp>
              <h2 className="font-serif text-3xl text-foreground mb-4">What We Do</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We identify, develop, and present structured farmland projects in Andhra Pradesh and surrounding states. Our focus is on organized layouts, plantation-integrated land use, and complete legal clarity.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We also source and offer authenticated Red Sandalwood products through our e-commerce platform — where regulatory compliance is maintained at every step.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                What we don't do: promise returns, inflate expectations, or close deals without buyers fully understanding what they are purchasing.
              </p>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h2 className="font-serif text-3xl text-foreground mb-4">Our Philosophy</h2>
              <blockquote className="border-l-2 border-gold pl-6 mb-6">
                <p className="font-serif text-xl text-foreground/90 italic leading-relaxed">
                  "Land should be seen, touched, and understood — before it is owned."
                </p>
              </blockquote>
              <p className="text-muted-foreground leading-relaxed">
                Every prospective buyer is encouraged to visit the project site, review documents, and take independent advice. This is the foundation of how we build trust.
              </p>
            </FadeUp>
          </div>

          <FadeUp className="mb-12">
            <h2 className="font-serif text-3xl text-foreground mb-8 text-center">Our Core Values</h2>
          </FadeUp>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {values.map((v, i) => (
              <FadeUp key={v.title} delay={i * 0.1}>
                <div className="bg-gradient-card border border-border/40 rounded-2xl p-6 h-full hover:border-gold/30 transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mb-4">
                    <v.icon className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="font-serif text-lg text-foreground mb-2">{v.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.2} className="text-center bg-earth border border-border/30 rounded-3xl p-12">
            <p className="text-gold text-xs tracking-widest uppercase mb-3">Get In Touch</p>
            <h2 className="font-serif text-3xl text-foreground mb-4">Start a Conversation</h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              Our team is available to explain projects, arrange visits, and answer questions — without any obligation.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-gold text-forest font-semibold hover:shadow-gold transition-all duration-300">
                Contact Us <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/projects" className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-border/60 text-foreground hover:border-gold/40 transition-all duration-300">
                View Projects
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}

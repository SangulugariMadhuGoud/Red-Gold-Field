import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FadeUp } from "@/components/SectionHeading";
import { Calendar, MapPin, Clock, CheckCircle2, Send } from "lucide-react";
import projectFarm from "@/assets/project-farm.jpg";

const projects = ["Srikakulam Greens", "Vizag Valley Estate", "Kadapa Farmlands", "Not sure yet"];

export default function SiteVisit() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", project: "", date: "", message: "" });

  const   handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />

      {/* Header */}
      <div className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={projectFarm} alt="Site Visit" className="w-full h-full object-cover opacity-25" loading="lazy" width={1200} height={500} />
          <div className="absolute inset-0 bg-gradient-to-b from-forest/80 via-forest/90 to-forest" />
        </div>
        <div className="relative z-10 container mx-auto px-6 max-w-3xl text-center mx-auto pt-10">
          <FadeUp>
            <span className="text-gold text-xs tracking-widest uppercase">Experience the Land</span>
            <h1 className="font-serif text-5xl md:text-6xl text-foreground mt-3 mb-4">
              Schedule a <em className="text-gold italic">Site Visit</em>
            </h1>
            <p className="text-muted-foreground text-xl leading-relaxed">
              Visiting the land is essential before making any decision. We arrange dedicated site visits with guidance from our team.
            </p>
          </FadeUp>
        </div>
      </div>

      {/* What to Expect */}
      <section className="py-12 bg-earth">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: MapPin, title: "On-Site Walkthrough", desc: "Physically tour the land, see plot boundaries, internal roads, and plantation areas." },
              { icon: Clock, title: "Team Guidance", desc: "Our team explains every aspect — no rushed presentations, just honest conversation." },
              { icon: CheckCircle2, title: "Document Review", desc: "All project documents reviewed on-site or shared digitally beforehand." },
            ].map((s, i) => (
              <FadeUp key={s.title} delay={i * 0.1}>
                <div className="bg-gradient-card border border-border/40 rounded-2xl p-5 h-full">
                  <div className="w-9 h-9 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mb-3">
                    <s.icon className="w-4 h-4 text-gold" />
                  </div>
                  <h3 className="font-serif text-lg text-foreground mb-1">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-2xl">
          <FadeUp>
            {submitted ? (
              <div className="bg-gradient-card border border-gold/20 rounded-3xl p-14 text-center">
                <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-5">
                  <Calendar className="w-8 h-8 text-gold" />
                </div>
                <h2 className="font-serif text-3xl text-foreground mb-3">Visit Request Submitted</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our team will call you within 24 hours to confirm your visit date and provide all necessary details.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-gradient-card border border-border/40 rounded-3xl p-8 space-y-5">
                <h2 className="font-serif text-2xl text-foreground mb-6">Book Your Visit</h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-muted/50 border border-border rounded-xl px-4 py-2.5 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-1.5">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 XXXXX XXXXX"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-muted/50 border border-border rounded-xl px-4 py-2.5 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/50 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-muted-foreground mb-1.5">Email Address</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-muted/50 border border-border rounded-xl px-4 py-2.5 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/50 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm text-muted-foreground mb-1.5">Project of Interest *</label>
                  <select
                    required
                    value={form.project}
                    onChange={(e) => setForm({ ...form, project: e.target.value })}
                    className="w-full bg-muted/50 border border-border rounded-xl px-4 py-2.5 text-foreground text-sm focus:outline-none focus:border-gold/50 transition-all"
                  >
                    <option value="" disabled>Select a project</option>
                    {projects.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-muted-foreground mb-1.5">Preferred Visit Date</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full bg-muted/50 border border-border rounded-xl px-4 py-2.5 text-foreground text-sm focus:outline-none focus:border-gold/50 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm text-muted-foreground mb-1.5">Additional Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Any specific questions or requirements..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-muted/50 border border-border rounded-xl px-4 py-2.5 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/50 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-gold text-forest font-semibold hover:shadow-gold transition-all duration-300"
                >
                  <Send className="w-4 h-4" /> Submit Visit Request
                </button>

                <p className="text-xs text-muted-foreground/60 text-center">
                  No commitment required. Our team will contact you to confirm details.
                </p>
              </form>
            )}
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}

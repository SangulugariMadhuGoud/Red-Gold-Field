import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FadeUp } from "@/components/SectionHeading";
import { MapPin, Phone, Mail, MessageCircle, Send, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />

      <div className="pt-32 pb-16 bg-earth">
        <div className="container mx-auto px-6">
          <FadeUp>
            <span className="text-gold text-xs tracking-widest uppercase">Reach Out</span>
            <h1 className="font-serif text-5xl md:text-6xl text-foreground mt-3 mb-4">
              Connect <em className="text-gold italic">With Us</em>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl">
              Our team can explain projects, arrange site visits, and share all documentation. No pressure. No commitment required.
            </p>
          </FadeUp>
        </div>
      </div>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <FadeUp>
                <h2 className="font-serif text-2xl text-foreground mb-6">Get In Touch</h2>
                {[
                  { icon: MapPin, label: "Location", val: "Andhra Pradesh, India" },
                  { icon: Phone, label: "Phone", val: "+91 XXXXX XXXXX" },
                  { icon: Mail, label: "Email", val: "info@redgoldfields.com" },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-4 bg-gradient-card border border-border/40 rounded-xl p-4">
                    <div className="w-9 h-9 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                      <c.icon className="w-4 h-4 text-gold" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{c.label}</p>
                      <p className="text-foreground text-sm">{c.val}</p>
                    </div>
                  </div>
                ))}

                <a
                  href="https://wa.me/91XXXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full py-3 px-4 rounded-full border border-green-600/40 text-green-400 hover:bg-green-900/20 transition-all duration-300 mt-4"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">Chat on WhatsApp</span>
                  <span className="ml-auto w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                </a>
              </FadeUp>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <FadeUp delay={0.1}>
                {submitted ? (
                  <div className="bg-gradient-card border border-gold/20 rounded-2xl p-12 text-center">
                    <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-7 h-7 text-gold" />
                    </div>
                    <h3 className="font-serif text-2xl text-foreground mb-2">Message Received</h3>
                    <p className="text-muted-foreground">Our team will reach out within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="bg-gradient-card border border-border/40 rounded-2xl p-8 space-y-5">
                    <h3 className="font-serif text-xl text-foreground mb-6">Send Us a Message</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        { id: "name", label: "Full Name", type: "text", placeholder: "Your name" },
                        { id: "phone", label: "Phone Number", type: "tel", placeholder: "+91 XXXXX XXXXX" },
                      ].map((f) => (
                        <div key={f.id}>
                          <label htmlFor={f.id} className="block text-sm text-muted-foreground mb-1.5">{f.label}</label>
                          <input
                            id={f.id}
                            type={f.type}
                            placeholder={f.placeholder}
                            required
                            value={form[f.id]}
                            onChange={(e) => setForm({ ...form, [f.id]: e.target.value })}
                            className="w-full bg-muted/50 border border-border rounded-xl px-4 py-2.5 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all"
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm text-muted-foreground mb-1.5">Email Address</label>
                      <input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-muted/50 border border-border rounded-xl px-4 py-2.5 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/50 transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm text-muted-foreground mb-1.5">Message</label>
                      <textarea
                        id="message"
                        rows={4}
                        placeholder="Tell us what you're looking for..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full bg-muted/50 border border-border rounded-xl px-4 py-2.5 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/50 transition-all resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-gold text-forest font-semibold hover:shadow-gold transition-all duration-300"
                    >
                      <Send className="w-4 h-4" /> Send Message
                    </button>
                  </form>
                )}
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

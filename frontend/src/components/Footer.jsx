import { Link } from "react-router-dom";
import { Leaf, MapPin, Phone, Mail, Instagram, Youtube, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-forest-dark border-t border-border/30 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-gold flex items-center justify-center">
                <Leaf className="w-4 h-4 text-forest" />
              </div>
              <span className="font-serif text-xl">Red Gold Fields</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Structured farmland ownership with Red Sandalwood plantations — built on transparency, land access, and long-term thinking.
            </p>
            <div className="flex gap-4">
              {[Instagram, Youtube, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold/50 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-gold mb-4 text-sm tracking-widest uppercase">Explore</h4>
            <ul className="space-y-2">
              {[
                { label: "Farmland Projects", href: "/projects" },
                { label: "Shop Products", href: "/shop" },
                { label: "Investment Overview", href: "/investment" },
                { label: "Schedule Site Visit", href: "/site-visit" },
                { label: "About Us", href: "/about" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    className="text-muted-foreground hover:text-gold text-sm transition-colors duration-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-serif text-gold mb-4 text-sm tracking-widest uppercase">Legal</h4>
            <ul className="space-y-2">
              {[
                { label: "Terms & Conditions", href: "/terms" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Refund Policy", href: "/refund" },
                { label: "Investment Disclaimer", href: "/disclaimer" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    className="text-muted-foreground hover:text-gold text-sm transition-colors duration-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-gold mb-4 text-sm tracking-widest uppercase">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <span>Andhra Pradesh, India</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <a href="tel:+91XXXXXXXXXX" className="hover:text-gold transition-colors">+91 XXXXX XXXXX</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <a href="mailto:info@redgoldfields.com" className="hover:text-gold transition-colors">info@redgoldfields.com</a>
              </li>
            </ul>
            <a
              href="https://wa.me/91XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-700/30 border border-green-600/30 text-green-400 text-sm hover:bg-green-700/50 transition-all duration-300"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Divider + Disclaimer */}
        <div className="border-t border-border/30 pt-6">
          <p className="text-xs text-muted-foreground/60 mb-3 leading-relaxed max-w-3xl">
            <strong className="text-muted-foreground/80">Investment Disclaimer:</strong> Red Gold Fields facilitates agricultural land ownership. Land investments carry risk. Past performance of similar assets does not guarantee future results. We do not promise or guarantee any financial returns. Please conduct your own due diligence before making any land purchase.
          </p>
          <p className="text-xs text-muted-foreground/50">
            © {new Date().getFullYear()} Red Gold Fields. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

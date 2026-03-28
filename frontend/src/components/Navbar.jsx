import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, Leaf, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

const navLinks = [
  { label: "Projects", href: "/projects" },
  { label: "Shop", href: "/shop" },
  { label: "Investment", href: "/investment" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const { items } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-dark shadow-deep py-3" : "py-5"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-gradient-gold flex items-center justify-center">
              <Leaf className="w-4 h-4 text-forest" />
            </div>
            <span className="font-serif text-xl text-foreground group-hover:text-gold transition-colors duration-300">
              Red Gold Fields
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium tracking-wide transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-px after:bg-gold after:transition-all after:duration-300 ${
                  location.pathname === link.href
                    ? "text-gold after:w-full"
                    : "text-foreground/70 hover:text-foreground after:w-0 hover:after:w-full"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/cart" className="relative text-foreground/70 hover:text-gold transition-colors duration-300">
              <ShoppingBag className="w-5 h-5" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-gold text-forest text-xs font-bold rounded-full flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Link>
            {user ? (
              <button
                onClick={logout}
                className="flex items-center gap-1 px-4 py-2 rounded-full border border-border/40 text-foreground/70 text-sm hover:border-gold hover:text-gold transition-all duration-300"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1 px-4 py-2 rounded-full border border-gold text-gold text-sm font-medium hover:bg-gold hover:text-forest transition-all duration-300"
              >
                <User className="w-4 h-4" /> Sign In
              </Link>
            )}
          </div>

          <button
            className="md:hidden text-foreground p-1"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed inset-0 z-40 glass-dark flex flex-col pt-24 px-8 pb-10 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.div key={link.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                <Link
                  to={link.href}
                  className={`block py-4 text-2xl font-serif border-b border-border/40 transition-colors duration-200 ${
                    location.pathname === link.href ? "text-gold" : "text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: navLinks.length * 0.07 }} className="mt-4">
              <Link to="/cart" className="block py-4 text-2xl font-serif border-b border-border/40 text-foreground">
                Cart {items.length > 0 && <span className="text-gold text-lg">({items.length})</span>}
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: (navLinks.length + 1) * 0.07 }} className="mt-8">
              {user ? (
                <button onClick={logout} className="block w-full text-center py-3 rounded-full border border-border/40 text-foreground font-semibold">
                  Sign Out
                </button>
              ) : (
                <Link to="/login" className="block w-full text-center py-3 rounded-full bg-gradient-gold text-forest font-semibold">
                  Sign In
                </Link>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

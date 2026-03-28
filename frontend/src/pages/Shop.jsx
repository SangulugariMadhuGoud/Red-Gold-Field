import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FadeUp } from "@/components/SectionHeading";
import { Link } from "react-router-dom";
import { ShoppingCart, Star, Shield } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { productsAPI } from "@/api/products";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import productPowder from "@/assets/product-powder.jpg";
import productOil from "@/assets/product-oil.jpg";
import productWood from "@/assets/product-wood.jpg";

const imageMap = {
  "/product-powder.jpg": productPowder,
  "/product-oil.jpg": productOil,
  "/product-wood.jpg": productWood,
};

export default function Shop() {
  const { user } = useAuth();
  const { addToCart } = useCart();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await productsAPI.getAll();
      return response.data.filter(product => product.inStock);
    },
  });

  const handleAddToCart = async (productId) => {
    if (!user) {
      toast({ title: "Please sign in", description: "Login to add items to cart", variant: "destructive" });
      return;
    }
    await addToCart(productId);
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />
      <div className="pt-32 pb-16 bg-earth">
        <div className="container mx-auto px-6">
          <FadeUp>
            <span className="text-gold text-xs tracking-widest uppercase">Authentic Products</span>
            <h1 className="font-serif text-5xl md:text-6xl text-foreground mt-3 mb-4">
              Red Sandalwood <em className="text-gold italic">Products</em>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl">
              Products offered where sourcing complies with applicable regulations. Each item is authenticated and traceable.
            </p>
          </FadeUp>
        </div>
      </div>

      <section className="py-20">
        <div className="container mx-auto px-6">
          {isLoading ? (
            <p className="text-center text-muted-foreground">Loading products...</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {products.length === 0 ? (
                <p className="col-span-3 text-center text-muted-foreground">No products available yet.</p>
              ) : (
                products.map((p, i) => (
                  <FadeUp key={p._id || p.id} delay={i * 0.12}>
                    <div className="bg-gradient-card border border-border/40 rounded-2xl overflow-hidden group hover:border-gold/30 hover:shadow-gold transition-all duration-400 flex flex-col">
                      <div className="relative aspect-square overflow-hidden">
                        <img
                          src={imageMap[p.imageUrl] || productPowder}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-forest/60 to-transparent" />
                        {p.badge && (
                          <span className="absolute top-3 left-3 px-2 py-1 rounded-full bg-gold/20 border border-gold/30 text-gold text-xs font-medium">
                            {p.badge}
                          </span>
                        )}
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="font-serif text-xl text-foreground mb-1">{p.name}</h3>
                        <div className="flex items-center gap-1 mb-3">
                          {[...Array(5)].map((_, j) => (
                            <Star key={j} className="w-3 h-3 fill-gold text-gold" />
                          ))}
                          <span className="text-xs text-muted-foreground ml-1">(Verified)</span>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">{p.description}</p>
                        <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-muted-foreground">
                          <span>Weight: <span className="text-foreground">{p.weight}</span></span>
                          <span>Origin: <span className="text-foreground">{p.origin}</span></span>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="font-serif text-2xl text-gold">₹{p.price.toLocaleString()}</span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Shield className="w-3 h-3 text-gold" /> Authenticated
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Link
                            to={`/shop/${p._id}`}
                            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full border border-gold/30 text-gold text-sm font-medium hover:bg-gold/10 transition-all duration-300"
                          >
                            View Details
                          </Link>
                          <button
                            onClick={() => handleAddToCart(p._id)}
                            className="flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-gradient-gold text-forest font-semibold text-sm hover:shadow-gold transition-all duration-300"
                          >
                            <ShoppingCart className="w-4 h-4" />
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </FadeUp>
                ))
              )}
            </div>
          )}

          <FadeUp delay={0.3} className="mt-16 bg-earth border border-border/30 rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h3 className="font-serif text-xl text-foreground mb-2">Compliance & Authenticity</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
                  All Red Sandalwood products sold on this platform are sourced from government-permitted cultivation zones in compliance with applicable Indian forest and wildlife regulations.
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
      <Footer />
    </div>
  );
}

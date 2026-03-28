import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FadeUp } from "@/components/SectionHeading";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Shield, Star, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { productsAPI } from "@/api/products";
import productPowder from "@/assets/product-powder.jpg";
import productOil from "@/assets/product-oil.jpg";
import productWood from "@/assets/product-wood.jpg";

const imageMap: Record<string, string> = {
  "/product-powder.jpg": productPowder,
  "/product-oil.jpg": productOil,
  "/product-wood.jpg": productWood,
};

export default function ShopProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { addToCart } = useCart();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await productsAPI.getProduct(id);
      return response.data;
    },
  });

  const handleAddToCart = async () => {
    if (!user) {
      toast({ title: "Please sign in", description: "Login to add items to cart", variant: "destructive" });
      return;
    }
    if (product) await addToCart(product.id);
  };

  if (isLoading) {
    return (
      <div className="bg-background text-foreground min-h-screen">
        <Navbar />
        <div className="pt-32 pb-20 text-center"><p className="text-muted-foreground">Loading...</p></div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-background text-foreground min-h-screen">
        <Navbar />
        <div className="pt-32 pb-20 text-center">
          <p className="text-muted-foreground mb-4">Product not found</p>
          <Link to="/shop"><Button>Back to Shop</Button></Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <Link to="/shop" className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Shop
          </Link>
          <FadeUp>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="aspect-square rounded-2xl overflow-hidden bg-earth">
                <img
                  src={imageMap[product.imageUrl || product.image_url || ""] || productPowder}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                {product.badge && (
                  <span className="inline-block w-fit px-3 py-1 rounded-full bg-gold/20 border border-gold/30 text-gold text-xs font-medium mb-4">
                    {product.badge}
                  </span>
                )}
                <h1 className="font-serif text-4xl mb-2">{product.name}</h1>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">(Verified)</span>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>
                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <div className="bg-earth p-3 rounded-lg border border-border/30">
                    <span className="text-muted-foreground">Weight</span>
                    <p className="font-medium">{product.weight}</p>
                  </div>
                  <div className="bg-earth p-3 rounded-lg border border-border/30">
                    <span className="text-muted-foreground">Origin</span>
                    <p className="font-medium">{product.origin}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-serif text-3xl text-gold">₹{product.price.toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Shield className="w-3 h-3 text-gold" /> Authenticated
                  </span>
                </div>
                <Button onClick={handleAddToCart} className="w-full sm:w-auto bg-gradient-gold text-forest font-semibold hover:shadow-gold py-6 text-base">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <div className="mt-8 p-4 bg-earth border border-border/30 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-gold" />
                    <span className="text-sm font-medium">Authenticity Guarantee</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Sourced from government-permitted cultivation zones with full documentation.
                  </p>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
      <Footer />
    </div>
  );
}

import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import productPowder from "@/assets/product-powder.jpg";
import productOil from "@/assets/product-oil.jpg";
import productWood from "@/assets/product-wood.jpg";

const imageMap = {
  "/product-powder.jpg": productPowder,
  "/product-oil.jpg": productOil,
  "/product-wood.jpg": productWood,
};

export default function Cart() {
  const { user } = useAuth();
  const { items, loading, updateQuantity, removeFromCart, totalPrice } = useCart();

  if (!user) {
    return (
      <div className="bg-background text-foreground min-h-screen">
        <Navbar />
        <div className="pt-32 pb-20 flex flex-col items-center justify-center text-center px-6">
          <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
          <h1 className="font-serif text-3xl mb-2">Sign in to view your cart</h1>
          <p className="text-muted-foreground mb-6">Please login to add items and checkout</p>
          <Link to="/login">
            <Button className="bg-gradient-gold text-forest font-semibold">Sign In</Button>
          </Link>
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
          <h1 className="font-serif text-4xl mb-8">Your Cart</h1>

          {loading ? (
            <p className="text-muted-foreground">Loading cart...</p>
          ) : items.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg mb-6">Your cart is empty</p>
              <Link to="/shop">
                <Button className="bg-gradient-gold text-forest font-semibold">Browse Products</Button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => {
                const product = item.productId || item.product || {};
                return (
                  <div key={item._id || item.id} className="flex gap-4 p-4 bg-earth border border-border/40 rounded-xl">
                    <img
                      src={imageMap[product.imageUrl || product.image_url || ""] || productPowder}
                      alt={product.name || "Product"}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-serif text-lg">{product.name || "Unknown Product"}</h3>
                      <p className="text-sm text-muted-foreground">{product.weight || ""}</p>
                      <p className="text-gold font-serif text-lg mt-1">₹{(product.price || 0).toLocaleString()}</p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button onClick={() => removeFromCart(item._id)} className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="flex items-center gap-2 border border-border/40 rounded-full px-2">
                        <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="p-1 hover:text-gold">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="p-1 hover:text-gold">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
                })}
              </div>

              <div className="bg-earth border border-border/40 rounded-xl p-6 h-fit">
                <h2 className="font-serif text-xl mb-4">Order Summary</h2>
                <div className="space-y-2 text-sm">
                  {items.map((item) => {
                    const product = item.productId || item.product || {};
                    return (
                      <div key={item._id || item.id} className="flex justify-between text-muted-foreground">
                        <span>{product.name || 'Product'} × {item.quantity}</span>
                        <span>₹{((product.price || 0) * item.quantity).toLocaleString()}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="border-t border-border/40 mt-4 pt-4 flex justify-between font-serif text-xl">
                  <span>Total</span>
                  <span className="text-gold">₹{totalPrice.toLocaleString()}</span>
                </div>
                <Link to="/checkout">
                  <Button className="w-full mt-6 bg-gradient-gold text-forest font-semibold hover:shadow-gold">
                    Proceed to Checkout <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

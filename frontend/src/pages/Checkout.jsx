import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { ordersAPI } from "@/api/orders";
import { profileAPI } from "@/api/profile";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Loader2, MapPin, CreditCard, CheckCircle } from "lucide-react";

export default function Checkout() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, totalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("address");
  const [address, setAddress] = useState({
    full_name: "",
    phone: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    pincode: "",
  });

  if (!user) {
    navigate("/login");
    return null;
  }

  if (items.length === 0 && step !== "done") {
    navigate("/cart");
    return null;
  }

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (!address.full_name || !address.phone || !address.address_line1 || !address.city || !address.state || !address.pincode) {
      toast({ title: "Fill all required fields", variant: "destructive" });
      return;
    }
    setStep("payment");
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      // Save address
      await profileAPI.addAddress({
        fullName: address.full_name,
        phone: address.phone,
        addressLine1: address.address_line1,
        addressLine2: address.address_line2,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        isDefault: true,
      });

      // Create order
      await ordersAPI.createOrder(address, "cod");
      await clearCart();
      setStep("done");
      toast({ title: "Order placed successfully!" });
    } catch (error) {
      toast({ title: "Order failed", description: error.response?.data?.message || "An error occurred", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-2xl">
          {/* Steps */}
          <div className="flex items-center gap-4 mb-10">
            {[
              { key: "address", label: "Address", icon: MapPin },
              { key: "payment", label: "Payment", icon: CreditCard },
              { key: "done", label: "Confirmed", icon: CheckCircle },
            ].map((s, i) => (
              <div key={s.key} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  step === s.key ? "bg-gold text-forest" : "bg-earth border border-border/40 text-muted-foreground"
                }`}>
                  <s.icon className="w-4 h-4" />
                </div>
                <span className={`text-sm hidden sm:block ${step === s.key ? "text-gold" : "text-muted-foreground"}`}>
                  {s.label}
                </span>
                {i < 2 && <div className="w-8 h-px bg-border/40" />}
              </div>
            ))}
          </div>

          {step === "address" && (
            <form onSubmit={handleAddressSubmit} className="space-y-5 bg-earth border border-border/40 rounded-2xl p-8">
              <h2 className="font-serif text-2xl mb-4">Shipping Address</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Full Name *</label>
                  <Input value={address.full_name} onChange={(e) => setAddress({ ...address, full_name: e.target.value })} className="bg-background border-border/60" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Phone *</label>
                  <Input value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })} className="bg-background border-border/60" />
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Address Line 1 *</label>
                <Input value={address.address_line1} onChange={(e) => setAddress({ ...address, address_line1: e.target.value })} className="bg-background border-border/60" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Address Line 2</label>
                <Input value={address.address_line2} onChange={(e) => setAddress({ ...address, address_line2: e.target.value })} className="bg-background border-border/60" />
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">City *</label>
                  <Input value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} className="bg-background border-border/60" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">State *</label>
                  <Input value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} className="bg-background border-border/60" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Pincode *</label>
                  <Input value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value })} className="bg-background border-border/60" />
                </div>
              </div>
              <Button type="submit" className="w-full bg-gradient-gold text-forest font-semibold hover:shadow-gold">
                Continue to Payment
              </Button>
            </form>
          )}

          {step === "payment" && (
            <div className="bg-earth border border-border/40 rounded-2xl p-8">
              <h2 className="font-serif text-2xl mb-6">Payment & Review</h2>
              <div className="space-y-3 mb-6">
                {items.map((item) => {
                  const product = item.productId || item.product || {};
                  return (
                    <div key={item._id || item.id} className="flex justify-between text-sm">
                      <span>{product.name || 'Product'} × {item.quantity}</span>
                      <span className="text-gold">₹{((product.price || 0) * item.quantity).toLocaleString()}</span>
                    </div>
                  );
                })}
                <div className="border-t border-border/40 pt-3 flex justify-between font-serif text-xl">
                  <span>Total</span>
                  <span className="text-gold">₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>
              <div className="mb-6 p-4 bg-background/50 rounded-xl border border-border/30">
                <p className="text-sm text-muted-foreground mb-1">Delivering to:</p>
                <p className="text-sm">{address.full_name}, {address.address_line1}, {address.city}, {address.state} - {address.pincode}</p>
              </div>
              <div className="mb-6 p-4 bg-gold/5 rounded-xl border border-gold/20">
                <p className="text-sm font-medium text-gold">💰 Cash on Delivery</p>
                <p className="text-xs text-muted-foreground mt-1">Pay when you receive your order. Online payment coming soon.</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep("address")} className="flex-1 border-border/40">
                  Back
                </Button>
                <Button onClick={handlePlaceOrder} disabled={loading} className="flex-1 bg-gradient-gold text-forest font-semibold hover:shadow-gold">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Place Order"}
                </Button>
              </div>
            </div>
          )}

          {step === "done" && (
            <div className="text-center bg-earth border border-border/40 rounded-2xl p-12">
              <CheckCircle className="w-16 h-16 text-gold mx-auto mb-4" />
              <h2 className="font-serif text-3xl mb-2">Order Confirmed!</h2>
              <p className="text-muted-foreground mb-8">Thank you for your purchase. We'll contact you for delivery details.</p>
              <Button onClick={() => navigate("/shop")} className="bg-gradient-gold text-forest font-semibold">
                Continue Shopping
              </Button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

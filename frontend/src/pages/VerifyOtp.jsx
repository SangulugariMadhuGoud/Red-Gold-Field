import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { ShieldCheck, Loader2 } from "lucide-react";

export default function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  const phone = location.state?.phone || "";
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!otp || otp.length < 6) {
      toast({ title: "Enter 6-digit OTP", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.verifyOtp({ phone, token: otp, type: "sms" });
    setLoading(false);
    if (error) {
      toast({ title: "Verification failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Phone verified!", description: "Welcome to Red Gold Fields" });
      navigate("/shop");
    }
  };

  const handleResend = async () => {
    const { error } = await supabase.auth.resend({ phone, type: "sms" });
    if (error) {
      toast({ title: "Could not resend", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "OTP resent!" });
    }
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />
      <div className="pt-32 pb-20 flex items-center justify-center">
        <div className="w-full max-w-md mx-4 p-8 bg-earth border border-border/40 rounded-2xl text-center">
          <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="w-8 h-8 text-gold" />
          </div>
          <h1 className="font-serif text-3xl text-foreground mb-2">Verify Your Phone</h1>
          <p className="text-muted-foreground text-sm mb-2">
            We sent a 6-digit code to
          </p>
          <p className="text-gold font-medium mb-8">{phone}</p>
          <form onSubmit={handleVerify} className="space-y-5">
            <Input
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              className="text-center text-2xl tracking-[0.5em] bg-background border-border/60"
            />
            <Button type="submit" disabled={loading} className="w-full bg-gradient-gold text-forest font-semibold hover:shadow-gold">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify & Continue"}
            </Button>
          </form>
          <button
            onClick={handleResend}
            className="mt-4 text-sm text-muted-foreground hover:text-gold transition-colors"
          >
            Didn't receive code? <span className="text-gold">Resend</span>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FadeUp } from "@/components/SectionHeading";

export default function Legal({ type }) {
  const content = {
    terms: {
      title: "Terms & Conditions",
      updated: "March 2025",
      sections: [
        { heading: "1. Acceptance", body: "By accessing the Red Gold Fields website and platform, you agree to be bound by these Terms & Conditions. If you do not agree, please discontinue use immediately." },
        { heading: "2. Nature of Service", body: "Red Gold Fields facilitates the viewing, evaluation, and purchase of structured farmland projects and authenticated Red Sandalwood products. We are not a financial institution, investment advisor, or securities issuer." },
        { heading: "3. Land Transactions", body: "All land transactions are executed as direct agricultural land purchases. Buyers are responsible for independent legal, financial, and technical due diligence before finalizing any purchase." },
        { heading: "4. No Investment Advice", body: "Nothing on this platform constitutes financial investment advice. We do not guarantee any returns, appreciation, or yield from land purchased through our platform." },
        { heading: "5. Intellectual Property", body: "All content on this platform is owned by Red Gold Fields. Reproduction without written permission is prohibited." },
        { heading: "6. Limitation of Liability", body: "Red Gold Fields shall not be liable for any indirect, incidental, or consequential damages arising from use of this platform or reliance on information provided." },
        { heading: "7. Governing Law", body: "These terms are governed by the laws of India. Disputes shall be subject to the exclusive jurisdiction of courts in Andhra Pradesh." },
      ],
    },
    privacy: {
      title: "Privacy Policy",
      updated: "March 2025",
      sections: [
        { heading: "1. Information We Collect", body: "We collect name, phone, email, and inquiry data submitted through our contact forms and booking forms. We do not collect payment information on this platform directly." },
        { heading: "2. How We Use Your Information", body: "Your information is used solely to respond to inquiries, arrange site visits, and communicate about projects. We do not sell or rent your data to third parties." },
        { heading: "3. Data Storage", body: "All data is stored securely. We implement standard security measures to protect personal information from unauthorized access." },
        { heading: "4. Cookies", body: "We use cookies for analytics and session management. You may disable cookies in your browser settings, though some site functionality may be affected." },
        { heading: "5. Your Rights", body: "You have the right to access, correct, or delete your personal data. Contact us at info@redgoldfields.com to make such requests." },
        { heading: "6. Changes", body: "We may update this policy from time to time. Continued use of the platform after changes constitutes acceptance of the updated policy." },
      ],
    },
    refund: {
      title: "Refund Policy",
      updated: "March 2025",
      sections: [
        { heading: "Land Purchases", body: "Land purchase agreements are legally binding documents governed by applicable registration and transfer laws. Refunds are not applicable once a Sale Agreement is executed and registration has been completed." },
        { heading: "Booking Amounts", body: "Booking amounts paid prior to execution of a formal Sale Agreement may be refundable subject to the terms specified in the booking receipt and applicable negotiation between parties." },
        { heading: "Product Returns", body: "Red Sandalwood products may be returned within 7 days of delivery if found to be defective or not matching the product description. Products must be in original, unused condition." },
        { heading: "Damaged Products", body: "If a product arrives damaged, please photograph and report within 48 hours of delivery to info@redgoldfields.com. Replacements or refunds will be processed within 7-10 business days." },
        { heading: "Non-Refundable Items", body: "Site visit facilitation fees, processing charges, and documentation fees are non-refundable once services have been rendered." },
      ],
    },
    disclaimer: {
      title: "Investment Disclaimer",
      updated: "March 2025",
      sections: [
        { heading: "No Financial Returns Guaranteed", body: "Red Gold Fields does not, under any circumstances, guarantee, promise, or imply any financial return, yield, profit, or appreciation from the purchase of agricultural land or participation in any of our farmland projects." },
        { heading: "Agricultural Land Risk", body: "Agricultural land investment carries inherent risks including but not limited to: changes in government policy, environmental factors, market volatility, regulatory amendments affecting Red Sandalwood cultivation, infrastructure delays, and force majeure events." },
        { heading: "Not an Investment Product", body: "Our farmland projects are not securities, collective investment schemes, or any regulated financial product. They are direct land purchase opportunities. We are not registered with SEBI or any financial regulatory body in this capacity." },
        { heading: "Independent Advice Required", body: "Buyers are strongly advised to consult their own legal advisors, chartered accountants, and independent evaluators before making any land purchase decision." },
        { heading: "Historical Context Not a Projection", body: "Any reference to regional land value trends or historical appreciation of similar assets is provided for informational context only and should not be interpreted as a projection or forecast." },
        { heading: "Regulatory Compliance", body: "Red Sandalwood cultivation is subject to strict state and central government regulations in India. Buyers are responsible for understanding applicable laws regarding ownership, cultivation, harvesting, and sale of Red Sandalwood timber." },
      ],
    },
  };

  const data = content[type];

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />

      <div className="pt-32 pb-12 bg-earth">
        <div className="container mx-auto px-6">
          <FadeUp>
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-2">{data.title}</h1>
            <p className="text-muted-foreground text-sm">Last updated: {data.updated}</p>
          </FadeUp>
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="space-y-8">
            {data.sections.map((s, i) => (
              <FadeUp key={s.heading} delay={i * 0.06}>
                <div className="border-b border-border/30 pb-8">
                  <h2 className="font-serif text-xl text-foreground mb-3">{s.heading}</h2>
                  <p className="text-muted-foreground leading-relaxed">{s.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.3} className="mt-10 bg-earth border border-border/30 rounded-2xl p-6">
            <p className="text-muted-foreground text-sm">
              For questions regarding this {data.title}, contact us at{" "}
              <a href="mailto:info@redgoldfields.com" className="text-gold hover:underline">
                info@redgoldfields.com
              </a>
            </p>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}

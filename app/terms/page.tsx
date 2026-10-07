import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <Link href="/" className="text-brand-royal text-sm hover:underline">← Back to home</Link>
            <h1 className="font-bebas text-brand-navy text-5xl tracking-wide mt-4 mb-2">TERMS OF SERVICE</h1>
            <p className="text-gray-400 text-sm">Last updated: October 2026</p>
          </div>
          <div className="prose prose-sm max-w-none text-gray-600 space-y-6">
            {[
              { title: "Acceptance of Terms", body: "By accessing and using Double V Business Support Services website and offerings, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services." },
              { title: "Description of Services", body: "Double V Business Support Services provides business registration, accounts monitoring, statutory compliance, IPO registration, and operational audit assistance in Dipolog City and across the Philippines." },
              { title: "Client Responsibilities", body: "Clients must provide accurate, complete, and timely information required for official government filings (SEC, BIR, IPOPHL, etc.). Double V Business Support Services is not liable for delays resulting from inaccurate or incomplete client submissions." },
              { title: "Payment and Fees", body: "Service rates are quoted exclusive of government filing fees unless explicitly stated. Full or partial payment terms will be agreed upon prior to commencement of any filing or engagement." },
              { title: "Limitation of Liability", body: "While we make every effort to ensure timely and accurate statutory filings, Double V Business Support Services shall not be held liable for statutory penalties resulting from third-party agency delays or unfulfilled client obligations." },
              { title: "Contact Information", body: "For any questions regarding these Terms, please reach out via email at doublevdipolog@gmail.com or call 0970-686-7170." },
            ].map((s) => (
              <section key={s.title}>
                <h2 className="font-bebas text-brand-navy text-2xl tracking-wide mb-2">{s.title}</h2>
                <p className="leading-relaxed">{s.body}</p>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

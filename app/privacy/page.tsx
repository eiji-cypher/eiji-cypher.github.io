import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <Link href="/" className="text-brand-royal text-sm hover:underline">← Back to home</Link>
            <h1 className="font-bebas text-brand-navy text-5xl tracking-wide mt-4 mb-2">PRIVACY POLICY</h1>
            <p className="text-gray-400 text-sm">Last updated: January 2025</p>
          </div>
          <div className="prose prose-sm max-w-none text-gray-600 space-y-6">
            {[
              { title: "Information We Collect", body: "We collect information you provide directly to us, including your name, email address, phone number, and business information when you create an account or submit a service request. We also collect information about your use of our services." },
              { title: "How We Use Your Information", body: "We use the information we collect to provide, maintain, and improve our services, process transactions, send service notifications, respond to comments and questions, and comply with legal obligations." },
              { title: "Information Sharing", body: "We do not sell, trade, or otherwise transfer your personal information to outside parties except as required by law, to provide our services, or with your consent. We may share information with regulatory bodies as required for the services we provide (e.g., SEC, BIR filings)." },
              { title: "Data Security", body: "We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure." },
              { title: "Cookies", body: "We use cookies and similar tracking technologies to track activity on our service and hold certain information to improve your experience. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent." },
              { title: "Your Rights", body: "You have the right to access, update, or delete your personal information. You may also request restriction of processing or data portability. To exercise these rights, please contact us at doublevdipolog@gmail.com." },
              { title: "Contact Us", body: "If you have any questions about this Privacy Policy, please contact us at doublevdipolog@gmail.com or call 0970-686-7170." },
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

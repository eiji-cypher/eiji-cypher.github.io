import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Rates from "@/components/Rates";
import Certifications from "@/components/Certifications";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Location from "@/components/Location";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

export default function Home() {
  return (
    <main className="min-h-screen bg-white relative">
      <Navbar />
      <Hero />
      <Services />
      <Rates />
      <Certifications />
      <FAQ />
      <Contact />
      <Location />
      <Footer />
      <ChatBot />
    </main>
  );
}

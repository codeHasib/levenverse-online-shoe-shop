import Hero from "@/components/public/Hero";
import "../globals.css";
import FeaturedProducts from "@/components/public/FeaturedProducts";
import LiveReviewMarquee from "@/components/public/LiveReview";
import ContactSection from "@/components/public/ContactSection";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <Hero></Hero>

      {/* featured products */}
      <FeaturedProducts></FeaturedProducts>

      {/* Review Page */}
      <LiveReviewMarquee></LiveReviewMarquee>

      {/* Contact Section */}
      <ContactSection></ContactSection>
    </div>
  );
}

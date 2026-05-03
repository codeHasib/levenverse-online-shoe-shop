import Hero from "@/components/public/Hero";
import "../globals.css";
import FeaturedProducts from "@/components/public/FeaturedProducts";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <Hero></Hero>

      {/* featured products */}
      <FeaturedProducts></FeaturedProducts>
    </div>
  );
}

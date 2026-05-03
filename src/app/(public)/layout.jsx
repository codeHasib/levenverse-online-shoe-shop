import FloatingCart from "@/components/public/FloatingCart";
import "../globals.css";
import Navbar from "@/components/public/Nav";
import Footer from "@/components/public/Footer";

export default function PublicLayout({ children }) {
  return (
    <section>
      <Navbar></Navbar>
      {children}
      <Footer></Footer>
      <FloatingCart></FloatingCart>
    </section>
  );
}

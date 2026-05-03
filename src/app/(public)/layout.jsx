import FloatingCart from "@/components/public/FloatingCart";
import "../globals.css";
import Navbar from "@/components/public/Nav";

export default function PublicLayout({ children }) {
  return (
    <section>
      <Navbar></Navbar>
      {children}
      <FloatingCart></FloatingCart>
    </section>
  );
}

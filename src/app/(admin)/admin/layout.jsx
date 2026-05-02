import Navigation from "@/components/admin/Navigation";

export default function AdminLayout({ children }) {

  return (
    <>
      <section>
        <Navigation></Navigation>
        <main className="lg:ml-72">{children}</main>
      </section>
    </>
  );
}

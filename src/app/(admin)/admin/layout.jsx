import { authClient, useSession } from "@/lib/auth-client";
import Navigation from "@/components/admin/Navigation";
import { redirect } from "next/navigation";

export default function AdminLayout({ children }) {
  // function auth() {
  //   const { data, isPending } = useSession();

  //   if (isPending) {
  //     return <div>Loading</div>;
  //   }

  //   if (!data) {
  //     return redirect("/");
  //   }
  // }

  return (
    <>
      <section>
        <Navigation></Navigation>
        <main className="lg:ml-72">{children}</main>
      </section>
    </>
  );
}

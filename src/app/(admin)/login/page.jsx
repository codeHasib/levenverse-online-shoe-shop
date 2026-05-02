// import { auth } from "@/lib/auth";
// import { redirect } from "next/navigation";
// import { headers } from "next/headers";
import LoginPage from "@/components/admin/Login";

export default async function Page() {
  // const session = await auth.api.getSession({
  //   headers: await headers(),
  // });

  // if (!session?.user) {
  //   redirect("/admin/dashboard");
  // }
  return (
    <>
      <LoginPage></LoginPage>
    </>
  );
}

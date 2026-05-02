"use client";

import Login from "@/components/admin/Login";
import { authClient } from "@/lib/auth-client";

const LoginPage = () => {
  async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: userData.email, // required
      password: userData.password, // required
      rememberMe: true,
    });

    if (!data) {
      alert("login failed");
    } else {
      alert("login success");
    }
  }
  return (
    <div>
      <Login></Login>
    </div>
  );
};

export default LoginPage;

"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // Clear previous errors

    const { data, error: signInError } = await authClient.signIn.email({
      email,
      password,
      rememberMe: true,
    });

    setIsLoading(false);

    if (signInError) {
      setError(
        signInError.message ||
          "Invalid credentials. Hit the track and try again.",
      );
      setSuccess(false);
    } else if (data) {
      setSuccess(true);
      // Redirect after a slight delay to allow success animation
      setTimeout(() => {
        window.location.href = "/admin/dashboard";
      }, 1500);
    }
  }

  // Animation Variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delayChildren: 0.3, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black font-sans text-white px-6 py-12">
      {/* Dynamic Background Pattern (Optional) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%">
          <pattern
            id="pattern"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 40 L40 0"
              stroke="#0070f3"
              strokeWidth="0.5"
              fill="none"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#pattern)" />
        </svg>
      </div>

      <motion.div
        className="w-full max-w-md bg-[#0a0a0a] rounded-3xl p-10 md:p-12 shadow-2xl relative z-10 border border-neutral-900" // Added a subtle dark gray
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold italic tracking-tighter uppercase leading-none">
            LEVEN<span className="text-[#0070f3]">VERSE</span>
          </h1>
          <p className="text-neutral-400 font-semibold text-xs tracking-widest mt-1 uppercase">
            ADMIN PORTAL | QATAR
          </p>
        </motion.div>

        {/* Dynamic Success/Error Indicators */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-red-600/10 text-red-400 p-4 mb-6 rounded-lg text-sm text-center border border-red-500"
            >
              {error}
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-[#0070f3]/10 text-[#0070f3] p-4 mb-6 rounded-lg text-sm text-center border border-[#0070f3]"
            >
              Access Granted. Prepping Dashboard.
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={onSubmit} className="space-y-7">
          <motion.div variants={itemVariants} className="relative">
            <label className="text-sm text-neutral-500 font-semibold uppercase tracking-wider">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" " // Crucial for floating label
              className="block w-full px-5 py-4 bg-transparent border-2 border-neutral-800 rounded-full focus:border-[#0070f3] focus:ring-1 focus:ring-[#0070f3] outline-none transition-colors placeholder-shown:border-neutral-800"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="relative">
            <label className="text-sm text-neutral-500 font-semibold uppercase tracking-wider">
              PASSWORD
            </label>
            <input
              type="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" " // Crucial for floating label
              className="block w-full px-5 py-4 bg-transparent border-2 border-neutral-800 rounded-full focus:border-[#0070f3] focus:ring-1 focus:ring-[#0070f3] outline-none transition-colors placeholder-shown:border-neutral-800"
            />
          </motion.div>

          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.03 }} // Subtle scale on hover
            whileTap={{ scale: 0.97 }} // Subtle scale on tap
            type="submit"
            disabled={isLoading || success} // Disable during loading and success
            className={`w-full text-center py-4 rounded-full font-bold uppercase tracking-widest text-sm relative group overflow-hidden ${
              success
                ? "bg-[#0070f3]"
                : isLoading
                  ? "bg-neutral-700"
                  : "bg-black"
            }`}
          >
            {/* Animated Loading Gradient (Optional) */}
            {(isLoading || success) && (
              <span className="absolute inset-0 bg-gradient-to-r from-[#0070f3]/20 via-[#0070f3] to-[#0070f3]/20 animate-pulse-slow"></span>
            )}

            {/* Default State */}
            {!isLoading && !success && (
              <>
                <span className="relative z-10 text-white transition-colors group-hover:text-black">
                  ENTER THE COURT
                </span>
                <span className="absolute inset-0 bg-white scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-300 rounded-full"></span>
              </>
            )}

            {/* Loading/Success States */}
            {isLoading && (
              <span className="relative z-10 text-neutral-400">
                AUTHENTICATING...
              </span>
            )}
            {success && (
              <span className="relative z-10 text-white">ACCESS GRANTED</span>
            )}
          </motion.button>
        </form>

        <motion.p
          variants={itemVariants}
          className="text-center text-neutral-600 text-[10px] uppercase tracking-widest mt-12"
        >
          &copy; {new Date().getFullYear()} LEVENVERSE QATAR. Authorized
          Personnel Only.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LoginPage;

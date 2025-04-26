// app/auth/signin/page.tsx
"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/"
    });

    if (res?.error) {
        setError(res.error);
      } else if (res?.url) {
        // If sign in is successful, redirect to callbackUrl
        window.location.href = res.url; // Automatically redirects
      }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
      {/* Logo Section */}
      <div className="flex justify-center mb-4">
        <Image
          src="/roam-nepal-black.png" // 👈 replace this with your logo path
          alt="Roam Nepal"
          width={60}
          height={60}
        />
      </div>

      <h2 className="text-2xl font-bold text-center mb-2 font-kanit text-black">Sign In</h2>
      <p className="text-center text-sm text-gray-900 mb-6 font-outfit">
        Join to Our Community with all time access and free
      </p>

      {/* Social Buttons */}
      <div className="flex gap-4 mb-4">
        <button onClick={() => signIn("google", { callbackUrl: "/" })} className="flex-1 flex items-center justify-center border border-gray-300 py-2 rounded-md text-sm gap-2 text-black font-exo">
          <FcGoogle size={20} /> Sign In with Google
        </button>
        <button onClick={() => signIn("google", { callbackUrl: "/" })} className="flex-1 flex items-center justify-center border border-gray-300 py-2 rounded-md text-sm gap-2 text-black font-exo">
          <FaGithub size={20} /> Sign In with Github
        </button>
      </div>

      <p className="text-center text-sm text-gray-800 my-4">or with email</p>

      {/* Sign Up Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-900 rounded-md px-4 py-2 text-black placeholder:text-black font-exo"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-900 rounded-md px-4 py-2 text-black placeholder:text-black font-exo"
          required
        />
        <button
          type="submit"
          className="bg-black text-white py-2 gont-kanit rounded-md hover:bg-gray-800"
        >
          Sign Up
        </button>
      </form>

      <p className="text-sm text-center font-outfit mt-4 text-black">
        Already have an account?{" "}
        <Link href="/auth/signin" className="text-black font-exo font-semibold hover:underline">
          Login here
        </Link>
      </p>
    </div>
  </div>
  );
}

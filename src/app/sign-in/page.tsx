// app/sign-in/page.tsx
"use client";

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow rounded">
        <SignIn path="/sign-in" routing="path" afterSignInUrl="/home"  />
      </div>
    </div>
  );
}

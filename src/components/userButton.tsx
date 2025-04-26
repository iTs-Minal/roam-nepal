"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function UserButton() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);

  if (status !== "authenticated") return null;

  const toggleMenu = () => setOpen((prev) => !prev);

  return (
    <div className="relative">
      <button onClick={toggleMenu} className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition">
        {session.user?.image && (
          <Image
            src={session.user.image}
            alt="User Avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
        )}
        <span className="text-sm font-medium">{session.user?.name?.split(" ")[0]}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 shadow-lg rounded-md overflow-hidden z-50">
          <Link
            href="/profile"
            className="block px-4 py-2 text-sm font-exo hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Profile
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full text-left px-4 py-2 text-sm font-exo hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}

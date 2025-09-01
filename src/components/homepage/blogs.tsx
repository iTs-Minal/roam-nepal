"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Blog = {
  id: number;
  title: string;
  slug: string;
  subtitle: string;
  images: string[];
};

export default function BlogsSection() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data));
  }, []);

  return (
    <section className="px-4 sm:px-6 lg:px-12 py-10 bg-white">
      {/* Section Header */}
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <h2 className="text-4xl font-extrabold text-gray-800">Popular Blogs</h2>
        <p className="mt-4 text-lg text-gray-600">
          Get inspired by our latest travel stories and guides.
        </p>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <Link key={blog.id} href={`/blogs/${blog.slug}`} className="group">
            <div className="rounded-xl overflow-hidden bg-white relative transition hover:shadow-lg">
              {/* Image with overlay text */}
              <div className="relative h-56">
                <Image
                  src={blog.images[0]}
                  alt={blog.title}
                  fill
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white text-xl font-semibold line-clamp-2">
                    {blog.title}
                  </h3>
                </div>
              </div>

              {/* Subtitle + Read more */}
              <div className="p-4">
                <p className="text-sm text-gray-600 line-clamp-2">{blog.subtitle}</p>
                <span className="mt-3 inline-block text-blue-600 font-medium relative group">
                  Read More →
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

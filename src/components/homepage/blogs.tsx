
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
      .then((data) => {
        setBlogs(data);
      });
  }, []);


  return (
    <section className="px-6 py-12 space-y-6 mt-10">
      <h2 className="text-3xl font-bold">Popular Blogs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {blogs.map((blog: any) => (
        <div key={blog.id} className="border rounded-md overflow-hidden shadow hover:shadow-lg transition">
          <Image src={blog.image} alt={blog.title} width={500} height={300} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-xl font-bold">{blog.title}</h3>
            <p className="text-gray-600">{blog.subtitle}</p>
            <Link href={`/blogs/${blog.slug}`} className="text-blue-600 mt-2 inline-block">Read More →</Link>
          </div>
        </div>
      ))}
      </div>
    </section>
  );
}

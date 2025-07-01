
import Image from "next/image";
import Link from "next/link";

export default async function BlogsSection() {
  const res = await fetch("http://localhost:3000/api/blogs", { cache: "no-store" });
  const blogs = await res.json();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
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
  );
}

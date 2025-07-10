// app/admin/blogs/page.tsx
'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Blog = {
  id: number;
  title: string;
  subtitle: string;
  slug: string;
  image: string[];
  placeId:number;
  // Add other fields as needed
};

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      console.log('Fetched blogs:', data); // Debugging line
      setBlogs(data);
      setLoading(false);
    };
    fetchBlogs();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;
    const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setBlogs(blogs.filter((blog) => blog.id !== id));
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📝 Blog Manager</h1>
        <Link href="/blog/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          ➕ Create Blog
        </Link>
      </div>

      {loading ? (
        <p>Loading blogs...</p>
      ) : blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {blogs.map((blog: any) => (
            <div key={blog.id} className="border rounded-lg overflow-hidden shadow">
              <Image src={blog.image} alt={blog.title} width={500} height={300} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{blog.title}</h2>
                <p className="text-sm text-gray-600">{blog.subtitle}</p>
                <p className="text-xs text-gray-400 mb-2">Slug: {blog.slug}</p>
                <div className="flex gap-2">
                  <Link
                    href={`/blog/edit/${blog.id}`}
                    className="bg-yellow-400 text-black px-3 py-1 rounded text-sm"
                  >
                    ✏️ Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

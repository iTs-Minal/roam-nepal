// app/admin/blogs/edit/[id]/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

type Blog = {
  id: number;
  title: string;
  slug: string;
  subtitle: string;
  content:string;
  images: string;
}


export default function EditBlogPage() {
  const { id } = useParams();
  const router = useRouter();

  const [blog, setBlog] = useState<Blog>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      const res = await fetch(`/api/blogs/${id}`);
      const data = await res.json();
      setBlog(data);
      setLoading(false);
    };
    fetchBlog();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/blogs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blog),
    });

    if (res.ok) {
      router.push('/blog');
    } else {
      alert('Failed to update blog');
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!blog) return <p className="p-6 text-red-500">Blog not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">✏️ Edit Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded"
          value={blog.title}
          onChange={(e) => setBlog({ ...blog, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Subtitle"
          className="w-full p-2 border rounded"
          value={blog.subtitle}
          onChange={(e) => setBlog({ ...blog, subtitle: e.target.value })}
        />
        <input
          type="text"
          placeholder="Slug"
          className="w-full p-2 border rounded"
          value={blog.slug}
          onChange={(e) => setBlog({ ...blog, slug: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          className="w-full p-2 border rounded"
          value={blog.images}
          onChange={(e) => setBlog({ ...blog, images: e.target.value })}
        />
        <textarea
          placeholder="Content"
          className="w-full p-2 border rounded h-40"
          value={blog.content}
          onChange={(e) => setBlog({ ...blog, content: e.target.value })}
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

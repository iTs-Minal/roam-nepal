import { PrismaClient } from "@prisma/client";
import Image from "next/image";

const prisma = new PrismaClient();

export default async function BlogDetail({ params }: { params: { slug: string } }) {
  const blog = await prisma.blog.findUnique({ where: { slug: params.slug } });

  if (!blog) return <div className="p-4">Blog not found</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Image src={blog.image} alt={blog.title} width={500} height={300} className="w-full h-64 object-cover rounded" />
      <h1 className="text-3xl font-bold mt-4">{blog.title}</h1>
      <p className="text-gray-600 mt-2">{blog.subtitle}</p>
      <article className="prose prose-lg mt-6">{blog.content}</article>
    </div>
  );
}

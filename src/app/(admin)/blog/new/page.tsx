"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiImage, FiEdit3, FiFileText, FiLink, FiMapPin } from "react-icons/fi";

interface Place {
  id: number;
  name: string;
}

export default function CreateBlogPage() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [slug, setSlug] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [content, setContent] = useState("");
  const [placeId, setPlaceId] = useState<number | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);

  const router = useRouter();

  useEffect(() => {
    const fetchPlaces = async () => {
      const res = await fetch("/api/places");
      const data = await res.json();
      setPlaces(data);
    };
    fetchPlaces();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        subtitle,
        slug,
        image: [images],
        content,
        placeId,
      }),
    });

    if (res.ok) {
      router.push("/blog");
    } else {
      alert("Failed to create blog");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
        📝 Create a New Blog Post
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className=" text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
            <FiEdit3 /> Title
          </label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Subtitle */}
        <div>
          <label className=" text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
            <FiEdit3 /> Subtitle
          </label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            required
          />
        </div>

        {/* Slug */}
        <div>
          <label className=" text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
            <FiLink /> Slug
          </label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />
        </div>

        {/* Image */}
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
            <FiImage /> Blog Images (URLs)
          </label>

          {images.map((url, index) => (
            <input
              key={index}
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md mb-2"
              placeholder={`Image URL ${index + 1}`}
              value={url}
              onChange={(e) => {
                const newImages = [...images];
                newImages[index] = e.target.value;
                setImages(newImages);
              }}
              required={index === 0} // only first is required
            />
          ))}

          <button
            type="button"
            onClick={() => setImages([...images, ""])}
            className="text-blue-600 mt-2 hover:underline"
          >
            + Add another image
          </button>
        </div>

        {/* Content */}
        <div>
          <label className=" text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
            <FiFileText /> Blog Content
          </label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md h-40 resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        {/* Place dropdown */}
        <div>
          <label className=" text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
            <FiMapPin /> Select Place
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-md"
            value={placeId || ""}
            onChange={(e) => setPlaceId(Number(e.target.value))}
            required
          >
            <option value="" disabled>
              -- Choose a Place --
            </option>
            {places.map((place) => (
              <option key={place.id} value={place.id}>
                {place.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white font-medium px-6 py-2 rounded-md hover:bg-blue-700 transition-all"
          >
            🚀 Publish Blog
          </button>
        </div>
      </form>
    </div>
  );
}

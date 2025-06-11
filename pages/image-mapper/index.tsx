"use client";

import { useSearchParams } from "next/navigation";

export default function ImageMapper() {
  const searchParams = useSearchParams();
  const images = JSON.parse(searchParams.get("images") || "[]");

  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-2">
        {images?.map((item: string, index: number) => (
          <div key={index} className="w-full md:w-[45%] h-auto max-w-[700px]">
            <img
              src={item}
              alt={`Image ${index + 1}`}
              className="w-full h-auto object-contain rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

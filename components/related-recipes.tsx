"use client";

import { useState, useEffect } from "react";
import { getRelatedRecipes } from "@/lib/actions";
import { Recipe } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { urlFor } from "@/lib/sanity";

export default function RelatedRecipes({ category }: { category: string }) {
  const [data, setData] = useState<Recipe[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getRelatedRecipes(category).then((data) => setData(data));
  }, []);

  if (!data) return <p>Loading...</p>;
  return (
    <div className="w-1/4 flex flex-col gap-4">
      <p className="text-lg font-bold">Related recipes</p>
      {data.map((i) => (
        <Link href={`/recipes/${i.id}`} className="w-full" key={i.id}>
          <div className="relative w-full h-[200px] rounded-lg overflow-hidden">
            <Image
              src={urlFor(i.photo).url()}
              alt={i.title}
              fill
              className={cn(
                "duration-700 ease-in-out object-cover",
                isLoading
                  ? "grayscale scale-110 blur-2xl"
                  : "grayscale-0 scale-100 blur-0"
              )}
              onLoad={() => setIsLoading(false)}
            />
          </div>
        </Link>
      ))}
    </div>
  );
}

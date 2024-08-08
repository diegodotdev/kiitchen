"use client";

import { type Recipe } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";

export default function RecipesDisplay({ data }: { data: Recipe[] }) {
  const [isLoading, setIsLoading] = useState(true);

  if (!data) return <p>No recipes</p>;
  return (
    <div className="w-full grid grid-cols-4 place-items-start gap-8 py-10">
      {data.map((i) => (
        <Link href={`/recipes/${i.id}`} className="group w-full" key={i.id}>
          <div className="relative w-full h-[250px] rounded-lg overflow-hidden">
            <Image
              src={urlFor(i.photo).url()}
              alt={i.title}
              fill
              className={cn(
                "duration-700 ease-in-out object-cover group-hover:scale-105",
                isLoading
                  ? "grayscale scale-110 blur-2xl"
                  : "grayscale-0 scale-100 blur-0"
              )}
              onLoad={() => setIsLoading(false)}
            />
          </div>
          <p className="font-[600] mt-2 text-lg">{i.title}</p>
        </Link>
      ))}
    </div>
  );
}

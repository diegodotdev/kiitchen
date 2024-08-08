import MaxWidthWrapper from "@/components/max-width-wrapper";
import RelatedRecipes from "@/components/related-recipes";
import { getUniqueRecipe } from "@/lib/queries";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";

export default async function Recipe({ params }: { params: { id: string } }) {
  const data = await getUniqueRecipe(params.id);

  if (!data) return <p>Loading...</p>;
  return (
    <MaxWidthWrapper>
      <div className="w-full flex gap-8 py-10">
        <div className="w-3/4 flex flex-col gap-4">
          <p className="text-5xl font-[600]">{data.title}</p>
          <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
            <Image
              src={urlFor(data.photo).url()}
              alt={data.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="w-full flex justify-end items-center">
            <p>
              Category:{" "}
              <Link href={`/search/categories/${data.category}`}>
                <span className="font-bold capitalize">{data.category}</span>
              </Link>
            </p>
          </div>
          <p>{data.description}</p>
          <p className="text-3xl font-bold">Ingredients</p>
          {data.ingredients.map((i, idx) => (
            <p key={idx}>- {i}</p>
          ))}
          <p className="text-3xl font-bold">Instructions</p>
          {data.instructions.map((i, idx) => (
            <p key={idx}>
              {idx + 1}. {i}
            </p>
          ))}
        </div>
        <RelatedRecipes category={data.category} />
      </div>
    </MaxWidthWrapper>
  );
}

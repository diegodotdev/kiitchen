import Image from "next/image";
import RecipesDisplay from "@/components/recipes-display";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { getUniqueUser } from "@/lib/queries";
import { USER_BANNERS } from "@/constants";

export default async function User({ params }: { params: { id: string } }) {
  const data = await getUniqueUser(params.id);
  const n = Math.floor(Math.random() * USER_BANNERS.length);

  if (!data) return <p>Loading...</p>;
  return (
    <div className="pb-10">
      <div className="w-full min-h-[400px] grid place-items-center relative">
        <img
          src={USER_BANNERS[n].image}
          alt="food image"
          className="w-full h-full object-cover absolute top-0 right-0 z-10"
        />
        <div className="absolute z-20 top-0 right-0 bg-black/70 w-full h-full"></div>
        <MaxWidthWrapper>
          <div className="w-full relative z-50 text-white flex items-center gap-4">
            <img
              src={data.photo}
              alt={data.username}
              className="w-48 h-48 rounded-full object-cover"
            />
            <p className="text-xl font-bold">{data.username}</p>
          </div>
        </MaxWidthWrapper>
      </div>
      <MaxWidthWrapper>
        <RecipesDisplay data={data.recipes} />
      </MaxWidthWrapper>
    </div>
  );
}

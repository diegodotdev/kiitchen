import MaxWidthWrapper from "@/components/max-width-wrapper";
import { auth } from "@clerk/nextjs/server";
import { getUniqueUser } from "@/lib/queries";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Dashboard() {
  const { userId } = auth();
  if (!userId) return <p>Loading...</p>;

  const data = await getUniqueUser(userId);
  if (!data?.recipes) return <p>Loading...</p>;
  return (
    <MaxWidthWrapper>
      <div className="py-10">
        <div className="w-full flex justify-between items-center">
          <p className="text-3xl font-bold">Dashboard</p>
          <Link href="/dashboard/create-recipe">
            <Button size="sm">Create Recipe</Button>
          </Link>
        </div>
        <div className="w-full flex gap-4 mt-4">
          <Link href={"/dashboard/recipes"} className="w-1/2">
            <div className="w-full h-[300px] border border-gray-300 rounded-lg p-8 flex jsutify-start items-start">
              <p className="text-2xl font-bold">
                {data.recipes.length} Recipes
              </p>
            </div>
          </Link>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}

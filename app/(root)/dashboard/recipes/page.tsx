import MaxWidthWrapper from "@/components/max-width-wrapper";
import RecipesDisplay from "@/components/recipes-display";
import { auth } from "@clerk/nextjs/server";
import { getUserRecipes } from "@/lib/queries";

export default async function Recipes() {
  const { userId } = auth();
  if (!userId) return <p>Loading...</p>;

  const data = await getUserRecipes(userId);
  return (
    <MaxWidthWrapper>
      <RecipesDisplay data={data} />
    </MaxWidthWrapper>
  );
}

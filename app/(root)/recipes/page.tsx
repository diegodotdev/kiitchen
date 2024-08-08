import { getAllRecipes } from "@/lib/queries";
import RecipesDisplay from "@/components/recipes-display";
import MaxWidthWrapper from "@/components/max-width-wrapper";

export default async function Recipes() {
  const data = await getAllRecipes();

  if (!data) return <p>Loading...</p>;
  return (
    <MaxWidthWrapper>
      <RecipesDisplay data={data} />
    </MaxWidthWrapper>
  );
}

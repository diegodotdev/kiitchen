import { createClient } from "@sanity/client";
import imageurlBuilder from "@sanity/image-url";

export const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  useCdn: true,
  apiVersion: "2024-07-30",
  token: process.env.NEXT_PUBLIC_SANITY_PROJECT_TOKEN,
});

const builder = imageurlBuilder(sanity);

export const urlFor = (source: string) => builder.image(source);

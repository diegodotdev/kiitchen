import { getAllUsers } from "@/lib/queries";
import Link from "next/link";
import Image from "next/image";
import MaxWidthWrapper from "@/components/max-width-wrapper";

export default async function Users() {
  const data = await getAllUsers();

  if (!data) return <p>Loading...</p>;
  return (
    <MaxWidthWrapper>
      <div className="py-10 grid grid-cols-5 gap-4 place-items-center">
        {data.map((i) => (
          <Link href={`/users/${i.clerkId}`} className="w-full">
            <div className="w-full flex flex-col justify-center items-center gap-4">
              <img
                src={i.photo}
                alt={i.username}
                className="w-3/4 aspect-square object-cover rounded-full"
              />
              <p>
                {i.firstname} {i.lastname}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </MaxWidthWrapper>
  );
}

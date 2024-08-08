export default function Search({
  searchParams,
}: {
  searchParams: { title: string };
}) {
  return <div>{searchParams.title}</div>;
}

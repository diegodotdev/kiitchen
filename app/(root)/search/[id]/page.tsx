export default function Searched({ params }: { params: { id: string } }) {
  return <div>{params?.id}</div>;
}

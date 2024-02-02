export default function Spinner({ white }: { white?: boolean }) {

  const color = white ? "border-white" : "border-black";

  return (
    <span className={`animate-spin h-5 w-5 ${color} border-2 rounded-full border-r-0 border-t-0`}></span>
  );
}

import { Link } from "react-router";

export default function ButtonLink({
  text,
  link,
}: {
  text: string;
  link: string;
}) {
  return (
    <Link to={link}>
      <button className="mt-4 bg-[#2D1C0F] hover:bg-[#f87108] text-white font-medium py-2 px-6 rounded-lg transition">
        {text}
      </button>
    </Link>
  );
}

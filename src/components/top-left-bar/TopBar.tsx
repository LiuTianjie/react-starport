import { Link } from "react-router-dom";
function TopBar(props: { link: string; name: string }) {
  const { link, name } = props;
  return (
    <Link
      to={link}
      className="w-fit flex justify-between items-center font-bold text-white"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 drop-shadow-lg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      <p className="text-4xl drop-shadow-lg">{name}</p>
    </Link>
  );
}
export default TopBar;

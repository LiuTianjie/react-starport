import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function TopBar(props: { link: string; name: string }) {
  const { link, name } = props;
  return (
    <Link
      to={link}
      className="w-fit h-10 flex justify-between items-baseline font-bold text-white"
    >
      <ArrowLeftOutlined
        className="mr-2 sm:text-xl md:text-2xl lg:text-4xl"
        style={{}}
      />

      <p className="h-10 sm:text-xl md:text-2xl lg:text-4xl drop-shadow-lg">
        {name}
      </p>
    </Link>
  );
}
export default TopBar;

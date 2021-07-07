import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface TitleProps {
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

const Title: FunctionComponent<TitleProps> = ({ onClick }) => {
  return (
    <Link
      to={process.env.PUBLIC_URL + "/"}
      onClick={onClick}
      className="sm:pl-8"
    >
      <pre className="text-3xl font-hand">My Memo</pre>
    </Link>
  );
};

export default Title;

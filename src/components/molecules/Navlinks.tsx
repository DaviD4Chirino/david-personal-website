import { NavLink } from "react-router-dom";
import { routes } from "../../staticData/pages.json";
export default function Navlinks(props: JSX.IntrinsicElements["ul"]) {
  const { id, ...rest } = props;
  return (
    <ul {...rest} id="NavLinks">
      <li className="list-none">
        <Link to={routes.homepage} title="Home" />
      </li>
      <li className="list-none">
        <Link to={routes.library} title="Library" />
      </li>
      <li className="list-none">
        <Link to={routes.projects} title="Projects" />
      </li>
      <li className="list-none">
        <Link to={routes.blogs.path} title="Blogs" />
      </li>
    </ul>
  );
}

function Link({ to, title }: { to: any; title: any }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        ` rounded-md  px-3 py-2 ${
          isActive ? " bg-secondary  no-underline" : ""
        }`
      }
    >
      {title}
    </NavLink>
  );
}

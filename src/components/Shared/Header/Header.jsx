import { Link } from "react-router-dom";

const Header = () => {
  const navOptions = (
    <>
      <li>
        <Link className="font-bold" to="/">
          Home
        </Link>
      </li>
      <li>
        <Link className="font-bold" to="/">
          Contact Us
        </Link>
      </li>
      <li>
        <Link className="font-bold" to="/">
          Dashboard
        </Link>
      </li>
      <li>
        <Link className="font-bold" to="/">
          Our Menu
        </Link>
      </li>
      <li>
        <Link className="font-bold" to="/">
          Our Shop
        </Link>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navOptions}
          </ul>
        </div>
        <Link to="/" className="flex flex-col uppercase">
          <span className="text-xl leading-none font-bold">Bistro Boss</span>
          <span className="tracking-[0.2em] font-medium leading-none">
            Restaurant
          </span>
        </Link>
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navOptions}</ul>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;

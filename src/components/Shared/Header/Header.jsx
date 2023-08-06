import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [headerBg, setHeaderBg] = useState(false);
  const headerRef = useRef();
  window.onscroll = () => {
    const banner = document?.getElementById("banner");
    if (window.scrollY > banner.offsetHeight - headerRef.current.offsetHeight) {
      setHeaderBg(true);
    } else {
      setHeaderBg(false);
    }
  };
  const navItems = [
    { title: "home", link: "home" },
    { title: "our menu", link: "menu" },
    { title: "our shop", link: "shop" },
    { title: "contact us", link: "contact" },
    { title: "dashboard", link: "dashboard" },
  ];
  const navOptions = (
    <>
      {navItems.map((item, i) => (
        <li key={i}>
          <Link
            className={`font-bold capitalize ${
              !headerBg && "hover:text-[#ffa300]"
            }`}
            to={item.link.toLowerCase()}
          >
            {item.title}
          </Link>
        </li>
      ))}
    </>
  );
  return (
    <header
      className={`navbar fixed top-0 max-w-screen-xl z-50 shadow ${
        headerBg ? "bg-base-100" : "bg-opacity-30 bg-black text-neutral-content"
      }`}
      ref={headerRef}
    >
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
            className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 ${
              headerBg
                ? "bg-base-100"
                : "bg-opacity-80 bg-black text-neutral-content"
            }`}
          >
            {navOptions}
          </ul>
        </div>
        <Link
          to="/"
          className={`flex flex-col uppercase ${
            headerBg &&
            "bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 hover:to-indigo-700"
          }`}
        >
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
    </header>
  );
};

export default Header;

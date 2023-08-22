import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import swal from "sweetalert";
import Loading from "../Loading";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../../hooks/useCart";

const Header = () => {
  const { user, logOut, loading } = useContext(AuthContext);
  const [headerBg, setHeaderBg] = useState(false);
  const navigate = useNavigate();
  const [cart] = useCart();

  window.onscroll = () => {
    if (window.scrollY > 270) {
      setHeaderBg(true);
    } else {
      setHeaderBg(false);
    }
  };

  const navItems = [
    { title: "home", link: "home" },
    { title: "our menu", link: "menu" },
    { title: "our shop", link: "shop/salad" },
    { title: "contact us", link: "contact" },
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

  const handleLogOut = () => {
    logOut()
      .then(() => {
        swal("Logout Successful", "", "success");
        navigate("/login");
      })
      .catch((err) => swal("", `${err}`, "error"));
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <header
      className={`navbar fixed top-0 max-w-screen-xl z-50 shadow ${
        headerBg ? "bg-base-100" : "bg-opacity-30 bg-black text-neutral-content"
      }`}
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
      </div>
      <div className="max-w-max">
        <li className="list-none mr-3">
          <Link to="/dashboard/mycart" className="indicator">
            <span className="indicator-item badge badge-warning">
              {cart.length}
            </span>
            <div className="pt-1.5">
              <FaShoppingCart className="text-xl" />
            </div>
          </Link>
        </li>
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src={
                    user?.photoURL
                      ? user.photoURL
                      : "/assets/images/login/profile.png"
                  }
                  alt={user?.displayName}
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 text-black font-semibold rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  {user?.displayName}
                  <span className="badge">Profile</span>
                </a>
              </li>
              <li>
                <Link to="/dashboard/home">Dashboard</Link>
              </li>
              <li>
                <a>Setting</a>
              </li>
              <li>
                <a onClick={handleLogOut}>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <li className="list-none">
            <Link
              className={`font-bold uppercase ${
                !headerBg && "hover:text-[#ffa300]"
              }`}
              to="/login"
            >
              Login
            </Link>
          </li>
        )}
      </div>
    </header>
  );
};

export default Header;

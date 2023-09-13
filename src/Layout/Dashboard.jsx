import {
  FaShoppingCart,
  FaWallet,
  FaCalendarAlt,
  FaHome,
  FaHamburger,
  FaShoppingBag,
  FaAngleDoubleRight,
  FaUtensils,
  FaList,
  FaBook,
  FaUsers,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
  const [cart] = useCart();
  const [isAdmin] = useAdmin();
  return (
    <div className="drawer lg:drawer-open bg-base-200">
      <input id="dashboardSidebar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content px-2 md:px-10 py-5">
        {/* Page content here */}
        <Outlet></Outlet>
        <label
          htmlFor="dashboardSidebar"
          className="btn btn-warning btn-sm sm:btn-md btn-square drawer-button lg:hidden absolute top-1 left-1"
        >
          <FaAngleDoubleRight />
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="dashboardSidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 w-52 md:w-60 h-full text-base-content bg-warning">
          {/* Sidebar content here */}
          {isAdmin ? (
            <>
              <li>
                <NavLink to="home">
                  <FaHome />
                  Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="additem">
                  <FaUtensils />
                  Add an Item
                </NavLink>
              </li>
              <li>
                <NavLink to="manageitems">
                  <FaList />
                  Manage Items
                </NavLink>
              </li>
              <li>
                <NavLink to="bookings">
                  <FaBook />
                  Manage Bookings
                </NavLink>
              </li>
              <li>
                <NavLink to="users">
                  <FaUsers />
                  All Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="home">
                  <FaHome />
                  User Home
                </NavLink>
              </li>
              <li>
                <NavLink to="reservation">
                  <FaCalendarAlt />
                  Reservation
                </NavLink>
              </li>
              <li>
                <NavLink to="paymenthistory">
                  <FaWallet />
                  Payment History
                </NavLink>
              </li>
              <li>
                <NavLink to="mycart">
                  <FaShoppingCart />
                  <span>My Cart</span>
                  <span className="indicator-item badge badge-warning">
                    {cart.length}
                  </span>
                </NavLink>
              </li>
            </>
          )}
          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHome />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/menu">
              <FaHamburger />
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop/salad">
              <FaShoppingBag />
              Shop
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;

import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Menu from "../pages/Menu/Menu";
import NotFound from "../pages/NotFound/NotFound";
import Shop from "../pages/Shop/Shop";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import MyCart from "../pages/Dashboard/User/MyCart";
import DashboardHome from "../pages/Dashboard/Home";
import Users from "../pages/Dashboard/Admin/Users";
import AdminRoute from "./AdminRoute";
import AddItem from "../pages/Dashboard/Admin/AddItem";
import NoAccess from "../pages/NotFound/NoAccess";
import ManageItems from "../pages/Dashboard/Admin/ManageItems";
import BookTable from "../pages/Dashboard/User/BookTable";
import MyBooking from "../pages/Dashboard/User/MyBooking";
import ManageBooking from "../pages/Dashboard/Admin/ManageBooking";
import AddReview from "../pages/Dashboard/User/AddReview";
import Pay from "../pages/Dashboard/User/Pay";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/shop/:category",
        element: (
          <PrivateRoute>
            <Shop />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "home",
        element: <DashboardHome />,
      },
      {
        path: "mycart",
        element: <MyCart />,
      },
      {
        path: "reservation",
        element: <BookTable />,
      },
      {
        path: "mybooking",
        element: <MyBooking />,
      },
      {
        path: "pay",
        element: <Pay />,
      },
      {
        path: "addreview",
        element: (
          <PrivateRoute>
            <AddReview />
          </PrivateRoute>
        ),
      },
      // admin routes
      {
        path: "users",
        element: (
          <AdminRoute>
            <Users />
          </AdminRoute>
        ),
      },
      {
        path: "additem",
        element: (
          <AdminRoute>
            <AddItem />
          </AdminRoute>
        ),
      },
      {
        path: "manageitems",
        element: (
          <AdminRoute>
            <ManageItems />
          </AdminRoute>
        ),
      },
      {
        path: "managebooking",
        element: (
          <AdminRoute>
            <ManageBooking />
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/noaccess",
    element: <NoAccess />,
  },
]);

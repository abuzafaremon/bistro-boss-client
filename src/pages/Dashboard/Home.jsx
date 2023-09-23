import { FaShoppingCart, FaStar, FaStore, FaWallet } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { BiSolidPhoneCall } from "react-icons/bi";
import useCart from "../../hooks/useCart";
import useBooking from "../../hooks/useBooking";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const { user } = useAuth();
  return <>{user?.role === "admin" ? <AdminHome /> : <UserHome />}</>;
};

export default Home;

const AdminHome = () => {
  return <div>Admin</div>;
};

const UserHome = () => {
  const { user } = useAuth();
  const [cart] = useCart();
  const [booking] = useBooking();
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/reviews");
      return res.data;
    },
  });
  const myReviews = reviews.filter((review) => review.email === user?.email);
  return (
    <div>
      <h2 className="text-xl md:text-3xl mb-5">Hi, Welcome Back!</h2>
      <div className="flex flex-col items-center md:flex-row gap-5">
        <div className="w-full bg-gradient-to-r from-purple-500 to-purple-200 flex justify-center items-center rounded p-5">
          <div className="flex items-center gap-3 font-bold text-white">
            <FaWallet className="text-xl" />
            <div>
              <h3 className="text-3xl">205</h3>
              <span className="font-normal">Menu</span>
            </div>
          </div>
        </div>
        <div className="w-full bg-gradient-to-r from-amber-600 to-amber-200 flex justify-center items-center rounded p-5">
          <div className="flex items-center gap-3 font-bold text-white">
            <FaStore className="text-xl" />
            <div>
              <h3 className="text-3xl">103</h3>
              <span className="font-normal">Shop</span>
            </div>
          </div>
        </div>
        <div className="w-full bg-gradient-to-r from-pink-500 to-pink-200 flex justify-center items-center rounded p-5">
          <div className="flex items-center gap-3 font-bold text-white">
            <BiSolidPhoneCall className="text-2xl" />
            <div>
              <h3 className="text-3xl">03</h3>
              <span className="font-normal">Contact</span>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:flex mt-5">
        <div className="py-16 px-10 w-full mx-auto bg-orange-200 flex flex-col gap-5 justify-center items-center">
          <img
            className="rounded-full w-48"
            src={user?.photoURL}
            alt={user?.displayName}
          />
          <h2 className="uppercase text-3xl font-semibold">
            {user?.displayName}
          </h2>
        </div>
        <div className="py-16 px-10 w-full mx-auto bg-yellow-200">
          <h2 className="text-2xl md:text-4xl mb-5">Your Activities</h2>
          <div className="flex gap-3 items-center text-blue-500 font-semibold text-xl mb-2">
            <FaShoppingCart />
            <span>ORDERS: {cart?.length}</span>
          </div>
          <div className="flex gap-3 items-center text-green-500 font-semibold text-xl mb-2">
            <FaShoppingCart />
            <span>REVIEWS: {myReviews?.length}</span>
          </div>
          <div className="flex gap-3 items-center text-yellow-500 font-semibold text-xl mb-2">
            <FaStar />
            <span>BOOKING: {booking?.length}</span>
          </div>
          <div className="flex gap-3 items-center text-orange-700 font-semibold text-xl mb-2">
            <FaShoppingCart />
            <span>PAYMENT: 3</span>
          </div>
        </div>
      </div>
    </div>
  );
};

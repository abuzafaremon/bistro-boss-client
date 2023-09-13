import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useCart = () => {
  const { user, loading } = useAuth();
  // get jwt token from local storage
  // const token = localStorage.getItem("access-token");
  const [axiosSecure] = useAxiosSecure();

  const {
    isLoading,
    data: cart = [],
    refetch,
  } = useQuery({
    queryKey: ["cart", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/carts?email=${user?.email}`);
      return res?.data;
    },
    enabled: !loading,
  });
  return [cart, refetch, isLoading];
};
export default useCart;

// queryFn: async () => {
//   const res = await fetch(
//     `https://bistro-boss-server-abuzafaremon.vercel.app/carts?email=${user?.email}`,
//     { headers: { authorization: `bearer ${token}` } }
//   );
//   return res.json();
// },

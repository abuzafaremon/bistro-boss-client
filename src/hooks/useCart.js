import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useCart = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["carts", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure(`/carts?email=${user?.email}`);
      return res.data;
    },
  });
  return [cart, refetch];
};
export default useCart;

// queryFn: async () => {
//   const res = await fetch(
//     `https://bistro-boss-server-abuzafaremon.vercel.app/carts?email=${user?.email}`,
//     { headers: { authorization: `bearer ${token}` } }
//   );
//   return res.json();
// },

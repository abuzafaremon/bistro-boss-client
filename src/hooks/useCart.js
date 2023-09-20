import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useCart = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const { data: cart = [], refetch } = useQuery({
    queryKey: ["cart", user?.email],
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
//     `http://localhost:5000/carts?email=${user?.email}`,
//     { headers: { authorization: `bearer ${token}` } }
//   );
//   return res.json();
// },

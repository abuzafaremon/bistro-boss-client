import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useCart = () => {
  const { user } = useAuth();
  // get jwt token from local storage
  // const token = localStorage.getItem("access-token");
  const [axiosSecure] = useAxiosSecure();

  const {
    isLoading,
    data: cart = [],
    refetch,
  } = useQuery({
    queryKey: ["cart", user?.email],
    // queryFn: async () => {
    //   const res = await fetch(
    //     `http://localhost:5000/carts?email=${user?.email}`,
    //     { headers: { authorization: `bearer ${token}` } }
    //   );
    //   return res.json();
    // },
    queryFn: async () => {
      const res = await axiosSecure(`/carts?email=${user?.email}`);
      console.log("res from axios", res);
      return res.data;
    },
  });
  return [cart, refetch, isLoading];
};
export default useCart;

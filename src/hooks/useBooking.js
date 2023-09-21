import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useBooking = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const {
    data: booking = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["booking", user?.email],
    queryFn: async () => {
      const res = await axiosSecure("/booking");
      return res.data;
    },
  });

  return [booking, refetch, isLoading];
};
export default useBooking;

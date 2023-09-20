import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useBooking = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const { data: booking = [] } = useQuery({
    queryKey: ["booking", user?.email],
    queryFn: async () => {
      const res = await axiosSecure("/booking");
      console.log(res.data);
      return res.data;
    },
  });

  return [booking];
};
export default useBooking;

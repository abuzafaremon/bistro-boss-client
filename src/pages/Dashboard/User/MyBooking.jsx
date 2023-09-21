import { Helmet } from "react-helmet-async";
import SectionHeader from "../../../components/Shared/SectionHeader/SectionHeader";
import useBooking from "../../../hooks/useBooking";
import { FaTrashAlt } from "react-icons/fa";
import swal from "sweetalert";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MyBooking = () => {
  const [booking, refetch] = useBooking();
  const [axiosSecure] = useAxiosSecure();
  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: `You won't be able to revert this!`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((yes) => {
      if (yes) {
        axiosSecure.delete(`/booking/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Item deleted successfully",
              showConfirmButton: false,
              timer: 1200,
            });
          }
        });
      }
    });
  };
  return (
    <div>
      <Helmet>
        <title>Bistro Boss | My Bookings</title>
      </Helmet>
      <SectionHeader subTitle="---Excellent Ambience---" title="MY BOOKINGS" />
      <div className="bg-white p-2 md:p-10">
        <div className="flex items-center justify-between uppercase bg-warning text-white font-bold p-4 mb-2">
          <h2>Total Bookings: {booking.length}</h2>
          <h2>Total Price:{}</h2>
          <button className="btn btn-xs">Pay</button>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="bg-base-200">
                <th className="px-1 md:px-4">#</th>
                <th className="px-1 md:px-4">Name</th>
                <th className="px-1 md:px-4">Guest Number</th>
                <th className="px-2 md:px-4">Date</th>
                <th className="px-2 md:px-4">Time</th>
                <th className="px-2 md:px-4">Status</th>
                <th className="px-1 md:px-4 text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {booking.map((book, i) => (
                <tr key={book._id}>
                  <td className="px-1 md:px-4">{i + 1}</td>
                  <td className="px-1 md:px-4">{book.name}</td>
                  <td className="px-1 md:px-4">{book.guest}</td>
                  <td className="px-1 md:px-4">{book.date}</td>
                  <td className="px-1 md:px-4">{book.time}</td>
                  <td
                    className={`px-1 md:px-4 ${
                      book.status === "Pending"
                        ? "text-warning"
                        : "text-success"
                    }`}
                  >
                    {book.status}
                    {book.status === "Pending" && "..."}
                  </td>
                  <td className="px-1 md:px-4 text-end">
                    <button
                      onClick={() => handleDelete(book._id)}
                      className="btn btn-ghost btn-sm btn-square"
                    >
                      <FaTrashAlt className="text-lg text-red-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyBooking;

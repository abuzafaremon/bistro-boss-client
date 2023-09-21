import { Helmet } from "react-helmet-async";
import SectionHeader from "../../../components/Shared/SectionHeader/SectionHeader";
import useBooking from "../../../hooks/useBooking";
import { FaCheckCircle } from "react-icons/fa";
import swal from "sweetalert";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageBooking = () => {
  const [booking, refetch, isLoading] = useBooking();
  const [axiosSecure] = useAxiosSecure();

  const handleComplete = (book) => {
    swal({
      title: "Change Status?",
      text: `Do you want to change status of this booking?`,
      icon: "warning",
      buttons: ["No", "Yes"],
      dangerMode: true,
    }).then((yes) => {
      if (yes) {
        const status = book.status === "Completed" ? "Pending" : "Completed";
        const updatedBooking = {
          status: status,
        };
        axiosSecure.put(`/booking/${book._id}`, updatedBooking).then((data) => {
          if (data.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Status Changed",
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
        <title>Bistro Boss | Manage Bookings</title>
      </Helmet>
      <SectionHeader
        subTitle="---AT A GLANCE!---"
        title="MANAGE ALL BOOKINGS"
      />
      <div className="bg-white p-2 md:p-10">
        <div className="flex items-center justify-between uppercase bg-warning text-white font-bold p-4 mb-2">
          <h2>Total Bookings: {booking.length}</h2>
          <h2>Total Price:{}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="bg-base-200">
                <th className="px-1 md:px-4">#</th>
                <th className="px-1 md:px-4">Name</th>
                <th className="px-1 md:px-4">Contact</th>
                <th className="px-1 md:px-4">Guest Number</th>
                <th className="px-2 md:px-4">Date - Time</th>
                <th className="px-2 md:px-4">Status</th>
                <th className="px-1 md:px-4 text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {booking.map((book, i) => (
                <tr key={book._id}>
                  <td className="px-1 md:px-4">{i + 1}</td>
                  <td className="px-1 md:px-4">{book.name}</td>
                  <td className="px-1 md:px-4">
                    <div className="flex flex-col gap-1">
                      <a href={`mailto:${book.email}`}>{book.email}</a>
                      <a href={`tel:+88${book.phone}`}>{book.phone}</a>
                    </div>
                  </td>
                  <td className="px-1 md:px-4">{book.guest}</td>
                  <td className="px-1 md:px-4">
                    <div className="flex flex-col">
                      <span>Date - {book.date}</span>
                      <span>Time - {book.time}</span>
                    </div>
                  </td>
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
                    {isLoading ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      <button
                        onClick={() => handleComplete(book)}
                        className="btn btn-ghost btn-sm btn-square"
                      >
                        <FaCheckCircle
                          className={`text-lg ${
                            book.status === "Pending"
                              ? "text-warning"
                              : "text-green-600"
                          }`}
                        />
                      </button>
                    )}
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

export default ManageBooking;

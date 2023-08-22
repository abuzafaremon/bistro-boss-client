import { Helmet } from "react-helmet-async";
import useCart from "../../../hooks/useCart";
import SectionHeader from "../../../components/Shared/SectionHeader/SectionHeader";
import { FaTrashAlt } from "react-icons/fa";
import swal from "sweetalert";
import Loading from "../../../components/Shared/Loading";

const MyCart = () => {
  const [cart, refetch, isLoading] = useCart();
  // array of object price calculation
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
  const handleDelete = (item) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Item",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`http://localhost:5000/carts/${item._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              swal("Your Item has been deleted!", "", "success");
            } else {
              swal("Something went wrong", "", "error");
            }
          });
      } else {
        swal("Your Item is safe!");
      }
    });
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <Helmet>
        <title>Bistro Boss | My Cart</title>
      </Helmet>
      <SectionHeader subTitle="---My Cart---" title="WANNA ADD MORE?" />
      <div className="bg-white p-2 md:p-10">
        <div className="flex items-center justify-between uppercase bg-warning text-white font-bold p-4 mb-2">
          <h2>Total Orders:{cart.length}</h2>
          <h2>Total Price:{totalPrice}</h2>
          <button className="btn btn-xs">Pay</button>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="bg-base-200">
                <th className="px-1 md:px-4">#</th>
                <th className="px-2 md:px-4">Food</th>
                <th className="px-1 md:px-4">Item Name</th>
                <th className="px-1 md:px-4 text-end">Price</th>
                <th className="px-1 md:px-4 text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, i) => (
                <tr key={item._id}>
                  <td className="px-1 md:px-4">{i + 1}</td>
                  <td className="px-2 md:px-4">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={item.image} alt={item.name} />
                      </div>
                    </div>
                  </td>
                  <td className="px-1 md:px-4">{item.name}</td>
                  <td className="text-end px-1 md:px-4">${item.price}</td>
                  <td className="px-1 md:px-4 text-end">
                    <button
                      onClick={() => handleDelete(item)}
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

export default MyCart;

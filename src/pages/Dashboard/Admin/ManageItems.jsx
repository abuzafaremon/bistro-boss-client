import { Helmet } from "react-helmet-async";
import SectionHeader from "../../../components/Shared/SectionHeader/SectionHeader";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import useMenu from "../../../hooks/useMenu";
import swal from "sweetalert";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Shared/Loading";
import { useState } from "react";
import EditItem from "./EditItem";
import Swal from "sweetalert2";

const ManageItems = () => {
  const [editItem, setEditItem] = useState(null);
  const [menu, loading, refetch] = useMenu();
  const [axiosSecure] = useAxiosSecure();

  const handleEdit = (item) => {
    setEditItem(item);
  };

  const handleDelete = (item) => {
    swal({
      title: "Are you sure?",
      text: `You won't be able to revert this!`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((yes) => {
      if (yes) {
        axiosSecure.delete(`/menu/${item._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            if (item.deleteImage) {
              swal({
                title: "Delete Image",
                text: `Do you want to delete image from hosting?`,
                icon: "warning",
                buttons: true,
                dangerMode: true,
              }).then((yes) => {
                if (yes) {
                  window.open(`${item.deleteImage}`, "_blank");
                }
              });
            }
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Item deleted successfully",
              timer: 1200,
            });
          }
        });
      }
    });
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      {editItem ? (
        <EditItem
          editItem={editItem}
          setEditItem={setEditItem}
          refetch={refetch}
        />
      ) : (
        <div>
          <Helmet>
            <title>Bistro Boss | Manage Items</title>
          </Helmet>
          <SectionHeader subTitle="---Whats New---" title="Manage All Items" />
          <div className="bg-white p-2 md:p-10">
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                {/* head */}
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Item Image</th>
                    <th>Item Name</th>
                    <th>$Price</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {[...menu].reverse().map((item, i) => (
                    <tr key={item._id}>
                      <th>{i + 1}</th>
                      <td>
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={item.image} alt={item.name} />
                          </div>
                        </div>
                      </td>
                      <td>{item.name}</td>
                      <td>${item.price}</td>
                      <td>
                        <button
                          onClick={() => handleEdit(item)}
                          className="btn btn-warning btn-sm btn-square text-white text-lg"
                        >
                          <FaEdit title="Admin" />
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDelete(item)}
                          className="btn btn-error btn-sm btn-square"
                        >
                          <FaTrashAlt className="text-lg text-white" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageItems;

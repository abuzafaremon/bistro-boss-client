import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import SectionHeader from "../../../components/Shared/SectionHeader/SectionHeader";
import { FaTrashAlt, FaUserShield, FaUsers } from "react-icons/fa";
import swal from "sweetalert";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Users = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await axiosSecure.get("/users");
    return res.data;
  });

  // make admin
  const handleMakeAdmin = (user) => {
    if (user.role !== "admin") {
      swal({
        title: "Make Admin?",
        text: `Are you sure You want to make ${user.name} is an Admin?`,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((yes) => {
        if (yes) {
          fetch(`http://localhost:5000/users/admin/${user._id}`, {
            method: "PATCH",
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.modifiedCount) {
                refetch();
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: `${user.name} is an Admin now!`,
                  timer: 1500,
                });
              }
            });
        }
      });
    } else {
      Swal.fire({
        position: "top-end",
        title: `${user.name} already is an admin`,
        timer: 1200,
      });
    }
  };

  const handleDelete = (user) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this User",
      icon: "warning",
      buttons: ["cancel", "Delete"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`http://localhost:5000/users/${user._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "The user has been deleted!",
                showConfirmButton: false,
                timer: 1200,
              });
            } else {
              swal("Something went wrong", "", "error");
            }
          });
      } else {
        Swal.fire({
          position: "top-end",
          title: "The User is safe!",
          showConfirmButton: false,
          timer: 1200,
        });
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Users</title>
      </Helmet>
      <SectionHeader subTitle="---How Many---" title="Manage All Users" />
      <div className="bg-white p-2 md:p-10">
        <div className="uppercase font-bold p-4 mb-2">
          <h2>Total Users: {users.length}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className={`btn btn-sm btn-square text-white text-lg ${
                        user.role === "admin" ? "btn-success" : "btn-warning"
                      }`}
                    >
                      {user.role === "admin" ? (
                        <FaUserShield title="Admin" />
                      ) : (
                        <FaUsers title="User" />
                      )}
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(user)}
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
  );
};

export default Users;

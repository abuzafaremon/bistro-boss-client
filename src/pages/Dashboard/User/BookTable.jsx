import { Helmet } from "react-helmet-async";
import SectionHeader from "../../../components/Shared/SectionHeader/SectionHeader";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const BookTable = () => {
  const [loading, setLoading] = useState(false);
  const [axiosSecure] = useAxiosSecure();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setLoading(true);
    axiosSecure.post("/booking", data).then((data) => {
      if (data.data.insertedId) {
        setLoading(false);
        navigate("/dashboard/mybooking");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Booking successful",
          timer: 1200,
        });
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Book a Table</title>
      </Helmet>
      <SectionHeader subTitle="---Reservation---" title="BOOK A TABLE" />
      <div className="bg-white p-2 md:p-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
        >
          <div className="form-control w-full">
            <label className="label font-semibold">
              <span className="label-text">Date*</span>
            </label>
            <input
              {...register("date", { required: true })}
              type="date"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full">
            <label className="label font-semibold">
              <span className="label-text">Time*</span>
            </label>
            <input
              {...register("time", { required: true })}
              type="time"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full">
            <label className="label font-semibold">
              <span className="label-text">Time*</span>
            </label>
            <select
              {...register("guest", { required: true })}
              className="select select-bordered"
            >
              <option>1 Person</option>
              <option>2 Person</option>
              <option>3 Person</option>
              <option>4 Person</option>
              <option>5 Person</option>
              <option>6 Person</option>
            </select>
          </div>
          <div className="form-control w-full">
            <label className="label font-semibold">
              <span className="label-text">Name*</span>
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full">
            <label className="label font-semibold">
              <span className="label-text">Phone*</span>
            </label>
            <input
              {...register("phone", { required: true })}
              type="text"
              placeholder="Phone Number"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full">
            <label className="label font-semibold">
              <span className="label-text">Email*</span>
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control pt-2">
            <button className="btn btn-warning">
              {loading ? (
                <>
                  <span className="loading loading-spinner"></span> Booking...
                </>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookTable;

import { Helmet } from "react-helmet-async";
import SectionHeader from "../../../components/Shared/SectionHeader/SectionHeader";

//rating resources
import { Rating, RoundedStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaPlus } from "react-icons/fa";

const customStyles = {
  itemShapes: RoundedStar,
  activeFillColor: ["#e7040f", "#ff6300", "#ffde37", "#61bb00", "#19a974"],
  inactiveFillColor: "lightgray",
};

const AddReview = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [rating, setRating] = useState(1);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    const review = {
      name: data.name,
      email: user?.email,
      details: data.details,
      rating: rating,
    };
    axiosSecure.post("/reviews", review).then((res) => {
      if (res.data.insertedId) {
        setLoading(false);
        setRating(1);
        reset();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Review added successfully",
          timer: 1200,
        });
      }
    });
  };
  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Add Review</title>
      </Helmet>
      <SectionHeader
        subTitle="---Sharing is Caring!!!---"
        title="GIVE A REVIEW"
      />
      <div className="bg-white p-2 md:p-10">
        <div className="text-center">
          <h2 className="text-xl md:text-3xl">Rate Us</h2>
          <Rating
            style={{ maxWidth: 200, margin: "10px auto" }}
            value={rating}
            onChange={setRating}
            itemStyles={customStyles}
            spaceBetween="small"
            spaceInside="medium"
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full">
            <label className="label font-semibold">
              <span className="label-text">Your Name</span>
            </label>
            <input
              {...register("name", { required: true })}
              value={user?.displayName}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full">
            <label className="label font-semibold">
              <span className="label-text">
                Kindly express your opinion in a short way.*
              </span>
            </label>
            <textarea
              {...register("details", { required: true })}
              type="text"
              placeholder="Your Review"
              className="input input-bordered w-full resize-none"
            ></textarea>
          </div>
          <button className="btn btn-warning mt-5" type="submit">
            {loading ? (
              <>
                <span className="loading loading-spinner"></span> Adding...
              </>
            ) : (
              <>
                <span>Add Review</span>
                <FaPlus />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddReview;

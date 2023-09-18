import { Helmet } from "react-helmet-async";
import SectionHeader from "../../../components/Shared/SectionHeader/SectionHeader";
import { FaUtensils } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import swal from "sweetalert";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const imageHostingToken = import.meta.env.VITE_Image_Upload_Token;

const AddItem = () => {
  const [loading, setLoading] = useState(false);
  const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${imageHostingToken}`;
  const { register, handleSubmit } = useForm();
  const [axiosSecure] = useAxiosSecure();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", data.image[0]);
    fetch(imageHostingUrl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgRes) => {
        if (imgRes.success) {
          const imgURL = imgRes.data.display_url;
          const deleteURL = imgRes.data.delete_url;
          const { name, category, recipe, price } = data;
          const newItem = {
            _id: Date.now().toString(),
            name,
            category: category.toLowerCase(),
            recipe,
            price: parseFloat(price),
            image: imgURL,
            deleteImage: deleteURL,
          };
          axiosSecure.post("/menu", newItem).then((data) => {
            if (data.data.insertedId) {
              navigate("/dashboard/manageitems");
              setLoading(false);
              swal("Item added successfully", "", "success");
            }
          });
        }
      });
  };
  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Add Item</title>
      </Helmet>
      <SectionHeader subTitle="---Whats New---" title="Add an item" />
      <div className="bg-white p-2 md:p-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full">
            <label className="label font-semibold">
              <span className="label-text">Recipe name*</span>
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Recipe name"
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex gap-5">
            <div className="form-control w-full">
              <label className="label font-semibold">
                <span className="label-text">Category*</span>
              </label>
              <select
                {...register("category", { required: true })}
                className="select select-bordered"
              >
                <option>Pizza</option>
                <option>Salad</option>
                <option>Deserts</option>
                <option>Soup</option>
                <option>Drinks</option>
                <option>Popular</option>
                <option>Offered</option>
              </select>
            </div>
            <div className="form-control w-full">
              <label className="label font-semibold">
                <span className="label-text">Price</span>
              </label>
              <input
                {...register("price", { required: true })}
                type="number"
                placeholder="Price"
                className="input input-bordered w-full"
              />
            </div>
          </div>
          <div className="form-control">
            <label className="label font-semibold">
              <span className="label-text">Recipe Details*</span>
            </label>
            <textarea
              {...register("recipe", { required: true })}
              className="textarea textarea-bordered h-24 resize-none"
              placeholder="Recipe Details"
            ></textarea>
          </div>
          <div className="pt-3">
            <label className="label font-semibold">
              <span className="label-text">Item Image*</span>
            </label>
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input file-input-bordered w-full max-w-xs"
            />
          </div>
          <div className="pt-5">
            <button
              className="btn btn-active btn-warning"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                "Loading..."
              ) : (
                <>
                  <span>Add Item</span>
                  <FaUtensils />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItem;

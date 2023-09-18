import { Helmet } from "react-helmet-async";
import SectionHeader from "../../../components/Shared/SectionHeader/SectionHeader";
import { FaUtensils } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import swal from "sweetalert";

const imageHostingToken = import.meta.env.VITE_Image_Upload_Token;

const EditItem = ({ editItem, setEditItem, refetch }) => {
  const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${imageHostingToken}`;
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const [axiosSecure] = useAxiosSecure();

  // const { data = [], isLoading } = useQuery({
  //   queryKey: ["menuItem", id],
  //   queryFn: async () => {
  //     const res = await axiosSecure.get(`/menu/${id}`);
  //     return res?.data;
  //   },
  // });

  const [name, setName] = useState(editItem?.name);
  const [category, setCategory] = useState(editItem?.category);
  const [price, setPrice] = useState(editItem?.price);
  const [details, setDetails] = useState(editItem?.recipe);

  const onSubmit = (data) => {
    setLoading(true);
    if (data.image.length > 0) {
      // if image changed
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
            const updatedItem = {
              name,
              category: category.toLowerCase(),
              recipe,
              price: parseFloat(price),
              image: imgURL,
              deleteImage: deleteURL,
            };
            axiosSecure
              .put(`/menu/${editItem._id}`, updatedItem)
              .then((data) => {
                if (data.data.modifiedCount > 0) {
                  setEditItem(false);
                  refetch();
                  setLoading(false);
                  swal("Item updated successfully", "", "success");
                }
              });
          } else {
            setLoading(false);
          }
        });
    } else {
      // if image not changed
      const { name, category, recipe, price } = data;
      const updatedItem = {
        name,
        category: category.toLowerCase(),
        recipe,
        price: parseFloat(price),
        image: editItem.image,
        deleteImage: editItem.deleteImage,
      };
      axiosSecure.put(`/menu/${editItem._id}`, updatedItem).then((data) => {
        if (data.data.modifiedCount > 0) {
          setEditItem(false);
          refetch();
          setLoading(false);
          swal("Item updated successfully", "", "success");
        }
      });
    }
  };

  return (
    <div>
      {/* {loading && <Loading />} */}
      <Helmet>
        <title>Bistro Boss | Edit Item</title>
      </Helmet>
      <SectionHeader subTitle="---Whats New---" title="Edit item" />
      <div className="bg-white p-2 md:p-10 relative">
        <button
          onClick={() => setEditItem(null)}
          className="btn btn-square btn-outline btn-sm absolute top-1 right-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full">
            <label className="label font-semibold">
              <span className="label-text">Recipe name*</span>
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
                defaultValue={category}
                onChange={(e) => setCategory(e.target.value)}
                className="select select-bordered"
              >
                <option>pizza</option>
                <option>salad</option>
                <option>deserts</option>
                <option>soup</option>
                <option>drinks</option>
                <option>popular</option>
                <option>offered</option>
              </select>
            </div>
            <div className="form-control w-full">
              <label className="label font-semibold">
                <span className="label-text">Price</span>
              </label>
              <input
                {...register("price", { required: true })}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
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
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="textarea textarea-bordered h-24 resize-none"
              placeholder="Recipe Details"
            ></textarea>
          </div>
          <div className="pt-3">
            <label className="label font-semibold">
              <span className="label-text">Item Image</span>
            </label>
            <input
              {...register("image")}
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

export default EditItem;

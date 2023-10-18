import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAdmin from "../../hooks/useAdmin";

const ItemCard = ({ item }) => {
  const { image, name, recipe } = item;
  const { user } = useAuth();
  const [isAdmin] = useAdmin();
  const [, refetch] = useCart();
  const navigate = useNavigate();
  const handleAddToCart = (item) => {
    if (user && user.email) {
      const cartItem = {
        menuItemId: item._id,
        name,
        image,
        price: item.price,
        email: user.email,
      };
      fetch("http://localhost:5000/carts", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(cartItem),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Added to cart",
              showConfirmButton: false,
              timer: 1000,
            });
          }
        });
    } else {
      swal({
        title: "Please Login",
        text: "To Order Your Food",
        icon: "warning",
        buttons: ["Cancel", "Login"],
        dangerMode: true,
      }).then((ok) => {
        if (ok) {
          navigate("/login");
        }
      });
    }
  };
  return (
    <div className="card card-compact max-w-[400px] bg-[#F3F3F3] shadow lg:shadow-lg">
      <figure>
        <img className="w-full" src={image} alt={name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title justify-center">{name}</h2>
        <p className="text-center mb-3">
          {recipe?.split(" ").slice(0, 9).join(" ")}
        </p>
        <div className="card-actions justify-center">
          {isAdmin ? (
            <button className="btn" disabled>
              Add to cart
            </button>
          ) : (
            <button
              onClick={() => handleAddToCart(item)}
              className="uppercase text-[#ffa300] border-b-[3px] border-b-[#ffa300] lg:text-xl font-medium bg-[#E8E8E8] hover:bg-[#1F2937] px-3 lg:px-5 py-2 rounded-lg transition-all"
            >
              Add to cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemCard;

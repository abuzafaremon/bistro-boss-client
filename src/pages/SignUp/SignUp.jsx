import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { Helmet } from "react-helmet-async";
import Loading from "../../components/Shared/Loading";
import swal from "sweetalert";

const SignUp = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const navigate = useNavigate();

  const { createUser, loading, updateUserProfile, logOut } =
    useContext(AuthContext);

  const onSubmit = (data) => {
    createUser(data.email, data.password).then(() => {
      // Signed in
      reset();
      // Update Profile
      updateUserProfile(data.name, data.photoURL)
        .then(() => {
          // send user data to mongodb
          const saveUser = { name: data.name, email: data.email };
          fetch("http://localhost:5000/users", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(saveUser),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.insertedId) {
                swal("User Created Successful", "Please Login", "success");
              }
            });
        })
        .catch((err) => {
          swal("", `${err}`, "error");
        });

      logOut().then(() => {
        navigate("/login");
      });
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>Bistro Boss | Sign Up</title>
      </Helmet>
      <Link
        to="/"
        className={`inline-flex flex-col w-max uppercase shadow-xl absolute left-1 top-1 p-1 rounded-md`}
      >
        <span className="text-lg leading-none font-bold">Bistro Boss</span>
        <span className="text-sm tracking-[0.21em] font-medium leading-none">
          Restaurant
        </span>
      </Link>
      <section
        className="sm:px-5"
        style={{ backgroundImage: "url('/assets/images/login/login-bg.png')" }}
      >
        <div className="hero max-w-screen-lg mx-auto min-h-screen sm:py-5">
          <div className="hero-content lg:p-6 w-full h-full flex-col gap-28 lg:flex-row-reverse shadow-2xl rounded-lg">
            <div className="hidden lg:block">
              <img src="/assets/images/login/login-img.png" alt="Login image" />
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-xl">
              <div className="card-body p-6">
                <h1 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold">
                  Sign Up
                </h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-control">
                    <label className="label pb-0.5">
                      <span className="label-text">Name</span>
                    </label>
                    <input
                      {...register("name", {
                        required: "Name is required",
                      })}
                      type="text"
                      placeholder="Your Name"
                      className="input input-bordered"
                    />
                    {errors.name && (
                      <p className="text-rose-500 text-sm" role="alert">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="form-control">
                    <label className="label pb-0.5">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      {...register("email", {
                        required: "Email Address is required",
                      })}
                      type="email"
                      placeholder="email@example.com"
                      className="input input-bordered"
                    />
                    {errors.email && (
                      <p className="text-rose-500 text-sm" role="alert">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="form-control">
                    <label className="label pb-0.5">
                      <span className="label-text">Photo URL</span>
                    </label>
                    <input
                      {...register("photoURL", {
                        required: "Photo URL is required",
                      })}
                      placeholder="Photo URL"
                      className="input input-bordered"
                    />
                    {errors.photoURL && (
                      <p className="text-rose-500 text-sm" role="alert">
                        {errors.photoURL.message}
                      </p>
                    )}
                  </div>
                  <div className="form-control">
                    <label className="label pb-0.5">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      {...register("password", {
                        required: true,
                        minLength: 6,
                        maxLength: 10,
                        pattern:
                          /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                      })}
                      type="password"
                      placeholder="Password"
                      className="input input-bordered"
                    />
                    {errors.password && (
                      <p className="text-rose-500 text-sm" role="alert">
                        {errors.password?.type === "required" &&
                          "Password is required."}
                        {errors.password?.type === "minLength" &&
                          "Password is too short."}
                        {errors.password?.type === "maxLength" &&
                          "Password is too long."}
                        {errors.password?.type === "pattern" &&
                          "Password must have one Uppercase one lowercase, one number, and one special character."}
                      </p>
                    )}
                  </div>
                  <div className="form-control mt-6">
                    <input
                      type="submit"
                      value="Sign Up"
                      className="btn btn-outline"
                    />
                    <p className="text-[#ffa300] text-center text-sm mt-2">
                      Have an Account?
                      <Link to="/login" className="font-bold">
                        {" "}
                        Please Login
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;

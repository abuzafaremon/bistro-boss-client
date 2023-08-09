import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const SignUp = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { createUser } = useContext(AuthContext);

  const onSubmit = (data) => {
    createUser(data.email, data.password).then((result) => {
      // Signed in
      const user = result.user;
      console.log(user);
    });
  };
  return (
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
                    placeholder="Email"
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
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    {...register("password", {
                      required: "Password is required",
                    })}
                    type="password"
                    placeholder="Password"
                    className="input input-bordered"
                  />
                  {errors.password && (
                    <p className="text-rose-500 text-sm" role="alert">
                      {errors.password.message}
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
  );
};

export default SignUp;

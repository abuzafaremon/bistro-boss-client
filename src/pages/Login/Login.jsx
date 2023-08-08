import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";

const Login = () => {
  const [disabled, setDisabled] = useState(true);
  const [validateSuccess, setValidateSuccess] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // initial captcha load
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  //captchaValidate
  const captchaRef = useRef();
  const captchaValidate = (e) => {
    e.preventDefault();
    const user_captcha = captchaRef.current.value;
    if (validateCaptcha(user_captcha)) {
      setDisabled(false);
      setValidateSuccess("Validate Success");
    }
  };

  //form submission
  const onSubmit = (data) => console.log(data);
  return (
    <section
      className="sm:px-5"
      style={{ backgroundImage: "url('/assets/images/login/login-bg.png')" }}
    >
      <div className="hero max-w-screen-lg mx-auto min-h-screen sm:py-5">
        <div className="hero-content lg:p-6 w-full h-full flex-col gap-28 lg:flex-row shadow-2xl rounded-lg">
          <div className="hidden lg:block">
            <img src="/assets/images/login/login-img.png" alt="Login image" />
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-xl">
            <div className="card-body p-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold">
                Login
              </h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                  <label className="label pb-0.5">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    {...register("mail", {
                      required: "Email Address is required",
                    })}
                    type="email"
                    placeholder="Email"
                    className="input input-bordered"
                  />
                  {errors.mail && (
                    <p className="text-rose-500 text-sm" role="alert">
                      {errors.mail.message}
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
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>
                </div>
                <div className="form-control mb-5 pl-0.5 input input-bordered">
                  <div className="mt-3.5">
                    <LoadCanvasTemplate reloadColor="#ffa300" />
                  </div>
                </div>
                <div className="form-control">
                  <div className="flex">
                    <input
                      {...register("captcha", {
                        required: "Captcha is required",
                      })}
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-full"
                      ref={captchaRef}
                    />
                    <button
                      onClick={captchaValidate}
                      disabled={!disabled}
                      className="btn btn-outline"
                    >
                      Validate
                    </button>
                  </div>
                  <p className="text-success">{validateSuccess}</p>
                  {errors.captcha && (
                    <p className="text-rose-500 text-sm" role="alert">
                      {errors.captcha.message}
                    </p>
                  )}
                </div>
                <div className="form-control mt-6">
                  <input
                    type="submit"
                    value="Login"
                    disabled={disabled}
                    className="btn btn-outline"
                  />
                  <p className="text-[#ffa300] text-center text-sm mt-2">
                    New Here?
                    <Link className="font-bold"> Create a New Account</Link>
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

export default Login;

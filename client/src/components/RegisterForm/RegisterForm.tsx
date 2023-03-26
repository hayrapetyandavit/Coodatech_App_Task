import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ErrorMessage } from "@hookform/error-message";

import { useDispatch } from "react-redux";

import { authState } from "../../types/authTypes";
import { registerAction } from "../../redux/auth/authSlice";
import { togglePassVisibility } from "../../utils/togglePassVisibility";

import { registerUser } from "../../services/authService";

import "../../style/form.scss";

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const [isPassVisibile, setPassVisibile] = useState({
    icon: faEyeSlash,
    type: "password",
  });
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<authState>();

  const onSubmit: SubmitHandler<authState> = (data) => {
    const form: any = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    const userRegister = {
      form: form,
      navigate: navigate,
    };
    dispatch(registerAction(userRegister));
  };
  const onFail = (error: any) => {
    console.log(error, "Error");
  };

  return (
    <div className="form__container">
      <div className="form__wallpaper">
        <h1>coodatech</h1>
      </div>
      <div className="form__content">
        <div className="form-title">Create an Account</div>
        <form
          className="form__fildes"
          onSubmit={handleSubmit(onSubmit, onFail)}
        >
          <div className="wrap-input">
            <input
              type="name"
              className="form-input"
              placeholder="Name"
              {...register("name", {
                required: "⚠ this is required field",
                pattern: /^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/,
              })}
            />
            {(errors?.email?.type && (
              <span className="focus-input focus-input-name invalid" />
            )) || <span className="focus-input focus-input-name valid" />}
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => <p>{message}</p>}
            />
          </div>
          <div className="wrap-input">
            <input
              type="email"
              className="form-input"
              placeholder="Email"
              {...register("email", {
                required: "⚠ this is required field",
                pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/,
              })}
            />
            {(errors?.email?.type && (
              <span className="focus-input focus-input-email invalid" />
            )) || <span className="focus-input focus-input-email valid" />}
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => <p>{message}</p>}
            />
          </div>
          <div className="wrap-input">
            <input
              type={isPassVisibile.type}
              className="form-input form-input-pass"
              placeholder="Password"
              {...register("password", {
                required: "⚠ this is required field",
                pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
              })}
            />
            {(errors?.password?.type && (
              <span className="focus-input focus-input-password invalid" />
            )) || (
              <span className="focus-input focus-input-password valid"></span>
            )}
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }) => <p>{message}</p>}
            />
            <button
              className="fa-eye-btn"
              onClick={(e) => togglePassVisibility(e, setPassVisibile)}
            >
              <FontAwesomeIcon icon={isPassVisibile.icon} size="lg" />
            </button>
          </div>

          <button type="submit" className="login-btn">
            Register
          </button>
        </form>
        <div className="link-subtitle">
          <Link to="/login">
            <span>Already have an account?</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

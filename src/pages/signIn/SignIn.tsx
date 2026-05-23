import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";

import slideImg1 from "../../assets/signIn/slide-img-1.svg";
import slideImg2 from "../../assets/signIn/slide-img-2.svg";
import slideImg3 from "../../assets/signIn/slide-img-3.svg";
import logoSignIn from "../../assets/signIn/logo-pehraft-sign-in.svg";

// @ts-ignore
import "swiper/css";

// @ts-ignore
import "swiper/css/pagination";

// @ts-ignore
import "swiper/css/navigation";

import "./SignIn.css";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Link, useNavigate } from "react-router-dom";
import { saveToken } from "../../utils/token";

const SignIn = () => {
  const navigate = useNavigate();

  // Slides Data
  const slidesData = [
    {
      id: 1,
      image: slideImg1,
      title: "Welcome",
      description:
        "You enter the verified login and become an administrator. Good luck to you.",
    },
    {
      id: 2,
      image: slideImg2,
      title: "Dear Admin!",
      description:
        "All the features and improvements of the program are in your hands and you can use them actively.",
    },
    {
      id: 3,
      image: slideImg3,
      title: "Dear Admin!",
      description:
        "All the features and improvements of the program are in your hands and you can use them actively.",
    },
  ];

  // States
  const [isShowPassword, setIsShowPassword] = useState(false);

  const [emailInpValue, setEmailInpValue] = useState("");
  const [passwordInpValue, setPasswordInpValue] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  // Password Show/Hide
  const handleClickPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  // Validation
  function validateForm() {
    const newErrors = {
      email: "",
      password: "",
    };

    let isValid = true;

    // Email Validation
    if (!emailInpValue.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(emailInpValue.trim())
    ) {
      newErrors.email = "Invalid email address";
      isValid = false;
    }

    // Password Validation
    if (!passwordInpValue.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (passwordInpValue.trim().length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    } else if (!/(?=.*[a-z])(?=.*\d)/.test(passwordInpValue.trim())) {
      newErrors.password = "Password must contain lowercase and number";
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  }

  // Submit Form
  function handleSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const isValid = validateForm();

    if (!isValid) return;

    signInToAccount();
  }

  // API Request
  async function signInToAccount() {
    try {
      setIsLoading(true);

      const trimmedUserData = {
        email: emailInpValue.trim(),
        password: passwordInpValue.trim(),
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        trimmedUserData,
      );

      if (response.status === 200 || response.status === 201) {
        console.log("Login Success:", response.data);

        // Save token if exists
        if (response.data?.token) {
          saveToken(response.data.token);
        }

        // Redirect
        navigate("/dashboard");
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        setErrors({
          email: "Invalid email or password",
          password: "Invalid email or password",
        });
      } else if (error.response?.status === 404) {
        setErrors((prev) => ({
          ...prev,
          email: "User not found",
        }));
      } else if (error.request) {
        alert("Unable to connect to server. Check your internet connection.");
      } else {
        alert(error.response?.data?.message || "Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="sing_in_component flex">
        {/* Left Slider */}
        <div className="sign_in_block_1 w-1/2 h-screen sm:hidden md:block">
          <Swiper
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            {slidesData.map((slide) => (
              <SwiperSlide
                key={slide.id}
                className="flex items-center justify-center"
              >
                <div className="slide_block slides_block">
                  <img
                    src={slide.image}
                    className="img_slides"
                    alt={slide.title}
                  />

                  <div className="logo_block absolute top-0 left-0 flex items-center gap-1">
                    <img
                      src={logoSignIn}
                      alt="Logo"
                      className="md:w-12 md:h-12 lg:w-14 lg:h-14"
                    />

                    <h1 className="text-[#7EC7EC] md:text-[20px] lg:text-[25px] font-400">
                      Peshraft Library
                    </h1>
                  </div>

                  <div className="text_block absolute bottom-10 left-10 right-10 px-6 py-2 bg-white rounded-xl shadow-2xl">
                    <h1 className="title_admin md:text-[23px] lg:text-[27px] font-600">
                      {slide.title}
                    </h1>

                    <p className="description_admin md:text-[14px] lg:text-[17px] font-400 max-w-175 md:leading-4 lg:leading-4.5">
                      {slide.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Right Form */}
        <div className="sign_in_block_2 h-screen flex justify-center items-center w-full sm:flex-col md:flex-row">
          <form className="form_sign_in px-4" onSubmit={handleSignIn}>
            {/* Logo */}
            <div className="block_logo_and_title_sign_in_component flex flex-col justify-center items-center">
              <div className="logo_block sm:flex md:hidden items-center gap-1">
                <img src={logoSignIn} alt="Logo" className="w-23 h-23" />

                <h1 className="text-[#7EC7EC] text-[30px] font-400">
                  Peshraft Library
                </h1>
              </div>

              <h1 className="title_sign_in_block_2 text-center text-[#100F14] text-[32px] font-600">
                Sign In
              </h1>
            </div>

            {/* Inputs */}
            <div className="label_input_email_password_sign_in mt-2 flex flex-col gap-5">
              {/* Email */}
              <div className="form_sign_in_block_1_email">
                <label
                  htmlFor="email"
                  className="label_email text-[#9794AA] text-[16px] font-500 cursor-pointer"
                >
                  Email
                </label>

                <TextField
                  id="email"
                  label="Enter your email"
                  variant="outlined"
                  fullWidth
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                  sx={{
                    marginTop: 1,
                  }}
                  value={emailInpValue}
                  onChange={(event) => {
                    setEmailInpValue(event.target.value);

                    if (errors.email) {
                      setErrors((prev) => ({
                        ...prev,
                        email: "",
                      }));
                    }
                  }}
                />
              </div>

              {/* Password */}
              <div className="form_sign_in_block_2_password">
                <label
                  htmlFor="password"
                  className="label_password text-[#9794AA] text-[16px] font-500 cursor-pointer"
                >
                  Password
                </label>

                <FormControl
                  fullWidth
                  variant="outlined"
                  sx={{ marginTop: 1 }}
                  error={Boolean(errors.password)}
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>

                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={isShowPassword ? "text" : "password"}
                    value={passwordInpValue}
                    onChange={(event) => {
                      setPasswordInpValue(event.target.value);

                      if (errors.password) {
                        setErrors((prev) => ({
                          ...prev,
                          password: "",
                        }));
                      }
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            isShowPassword ? "hide password" : "show password"
                          }
                          onClick={handleClickPassword}
                          onMouseDown={handleMouseDownPassword}
                          onMouseUp={handleMouseUpPassword}
                          edge="end"
                        >
                          {isShowPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>

                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full mt-6 py-2 rounded-lg text-white text-[20px] font-500 transition-colors duration-300 cursor-pointer ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#7A5AF8] hover:bg-[#7A5AF8]/90"
              }`}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>

            {/* Sign Up */}
            <p className="text-center text-[#8E8E8E] text-[18px] font-400 mt-4">
              Don't have an account?{" "}
              <Link to={"/sign-up"} className="text-[#3A65FF] hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;

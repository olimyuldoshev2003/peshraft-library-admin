import TextField from "@mui/material/TextField";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

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
import { Link } from "react-router-dom";

const SignIn = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);

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

  return (
    <>
      <div className="sing_in_component flex">
        <div className="sign_in_block_1 w-1/2 h-screen sm:hidden md:block">
          {" "}
          {/* Added width and height */}
          <Swiper
            // spaceBetween={30}
            // centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true, // Enable clickable pagination
            }}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide className="flex items-center justify-center">
              {" "}
              {/* Center slide content */}
              <div
                className="slide_1_block slides_block
              "
              >
                {" "}
                {/* Full width container */}
                <img src={slideImg1} className="img_slides" alt="" />
                <div className="logo_block absolute top-0 left-0 flex items-center gap-1">
                  <img
                    src={logoSignIn}
                    alt="Logo"
                    className="md:w-13 md:h-13 lg:w-16 lg:h-16"
                  />
                  <h1 className="text-[#7EC7EC] md:text-[25px] lg:text-[35px] font-400">
                    Peshraft Library
                  </h1>
                </div>
                <div className="text_block absolute bottom-10 left-10">
                  <h1 className="title_admin md:text-[30px] lg:text-[35px] font-600">
                    Welcome
                  </h1>
                  <p className="description_admin md:text-[18px] lg:text-[23px] font-400 max-w-175">
                    You enter the verified login and become an
                    administrator.Good luck to you.
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="flex items-center justify-center">
              <div className="slide_2_block slides_block">
                <img src={slideImg2} className="img_slides" alt="" />
                <div className="logo_block absolute top-0 left-0 flex items-center gap-1">
                  <img
                    src={logoSignIn}
                    alt="Logo"
                    className="md:w-13 md:h-13 lg:w-16 lg:h-16"
                  />
                  <h1 className="text-[#7EC7EC] md:text-[25px] lg:text-[35px] font-400">
                    Peshraft Library
                  </h1>
                </div>
                <div className="text_block absolute bottom-10 left-10">
                  <h1 className="title_admin md:text-[30px] lg:text-[35px] font-600">
                    Dear Admin!
                  </h1>
                  <p className="description_admin md:text-[18px] lg:text-[23px] font-400 max-w-175">
                    All the features and improvements of the program are in your
                    hands and you can use them actively.
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="flex items-center justify-center">
              <div className="slide_3_block slides_block">
                <img src={slideImg3} className="img_slides" alt="" />
                <div className="logo_block absolute top-0 left-0 flex items-center gap-1">
                  <img
                    src={logoSignIn}
                    alt="Logo"
                    className="md:w-13 md:h-13 lg:w-16 lg:h-16"
                  />
                  <h1 className="text-[#7EC7EC] md:text-[25px] lg:text-[35px] font-400">
                    Peshraft Library
                  </h1>
                </div>
                <div className="text_block absolute bottom-10 left-10">
                  <h1 className="title_admin md:text-[30px] lg:text-[35px] font-600">
                    Dear Admin!
                  </h1>
                  <p className="description_admin md:text-[18px] lg:text-[23px] font-400 max-w-175">
                    All the features and improvements of the program are in your
                    hands and you can use them actively.
                  </p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="sign_in_block_2 h-screen flex justify-center items-center w-full sm:flex-col md:flex-row">
          <form action="" className="form_sign_in px-4">
            <h1 className="title_sign_in_block_2 text-center text-[#100F14] text-[32px] font-600">
              Sign In
            </h1>
            <div className="label_input_email_password_sign_in mt-2 flex flex-col gap-5">
              <div className="form_sign_in_block_1_email">
                <label
                  htmlFor="email"
                  className="label_email text-[#9794AA] text-[16px] font-500"
                >
                  Email
                </label>
                <TextField
                  id="email"
                  label="Enter your email"
                  variant="outlined"
                  fullWidth
                  sx={{
                    marginTop: 1,
                  }}
                />
              </div>
              <div className="form_sign_in_block_2_password">
                <label
                  htmlFor="password"
                  className="label_password text-[#9794AA] text-[16px] font-500"
                >
                  Password
                </label>
                <FormControl
                  sx={{ width: "100%", marginTop: 1 }}
                  variant="outlined"
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={isShowPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            isShowPassword
                              ? "hide the password"
                              : "display the password"
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
              </div>
            </div>
            <Link to={"/dashboard"}>
              <button
                type="submit"
                className="bg-[#7A5AF8] w-full mt-6 py-2 rounded-lg cursor-pointer text-white text-[20px] font-500 hover:bg-[#7A5AF8]/90 transition-colors duration-300"
              >
                Sign In
              </button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;

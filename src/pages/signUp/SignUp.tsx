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

import "./SignUp.css";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Link, useNavigate } from "react-router-dom";

// Tajikistan phone prefixes and operators
const TAJIK_PREFIXES: Record<string, string> = {
  "90": "MegaFon Tajikistan",
  "55": "MegaFon Tajikistan",
  "41": "MegaFon Tajikistan",
  "88": "MegaFon Tajikistan",
  "00": "MegaFon Tajikistan",
  "01": "MegaFon Tajikistan",
  "02": "MegaFon Tajikistan",
  "07": "MegaFon Tajikistan",
  "97": "MegaFon Tajikistan",
  "12": "MegaFon Tajikistan",
  "21": "MegaFon Tajikistan",
  "27": "MegaFon Tajikistan",
  "91": "ZET-Mobile",
  "40": "ZET-Mobile",
  "80": "ZET-Mobile",
  "33": "ZET-Mobile",
  "81": "ZET-Mobile",
  "03": "ZET-Mobile",
  "04": "ZET-Mobile",
  "08": "ZET-Mobile",
  "05": "ZET-Mobile",
  "09": "ZET-Mobile",
  "06": "ZET-Mobile",
  "18": "ZET-Mobile",
  "19": "ZET-Mobile",
  "66": "ZET-Mobile",
  "38": "ZET-Mobile",
  "92": "Tcell",
  "93": "Tcell",
  "50": "Tcell",
  "77": "Tcell",
  "70": "Tcell",
  "99": "Tcell",
  "11": "Tcell",
  "10": "O-Mobile",
  "20": "O-Mobile",
  "22": "O-Mobile",
  "30": "O-Mobile",
  "78": "Anor",
  "87": "Anor",
  "98": "Babilon-Mobile",
  "94": "Babilon-Mobile",
  "71": "Babilon-Mobile",
  "17": "Babilon-Mobile",
  "75": "Babilon-Mobile",
  "440": "ZET-Mobile",
  "444": "ZET-Mobile",
  "030": "ZET-Mobile",
  "040": "ZET-Mobile",
  "080": "ZET-Mobile",
  "442": "ZET-Mobile",
  "443": "ZET-Mobile",
  "447": "ZET-Mobile",
  "449": "ZET-Mobile",
  "918": "Babilon-Mobile",
};

// Helper function to validate and clean Tajik phone number
const validateTajikPhoneNumber = (
  phone: string,
): { isValid: boolean; operator: string | null; cleanedNumber: string } => {
  // Remove all non-digit characters
  let digits = phone.replace(/\D/g, "");

  // Handle +992 or 992 prefix
  if (digits.startsWith("992") && digits.length > 10) {
    digits = digits.slice(3);
  } else if (digits.startsWith("992") && digits.length === 12) {
    digits = digits.slice(3);
  }

  // Check if we have exactly 9 digits after processing
  if (digits.length !== 9) {
    return { isValid: false, operator: null, cleanedNumber: phone };
  }

  // Check against all prefixes (both 2-digit and 3-digit)
  let foundOperator: string | null = null;

  // Check 3-digit prefixes first
  for (let i = 0; i <= digits.length - 3; i++) {
    const prefix3 = digits.substring(i, i + 3);
    if (TAJIK_PREFIXES[prefix3]) {
      foundOperator = TAJIK_PREFIXES[prefix3];
      break;
    }
  }

  // If no 3-digit prefix found, check 2-digit prefixes
  if (!foundOperator) {
    for (let i = 0; i <= digits.length - 2; i++) {
      const prefix2 = digits.substring(i, i + 2);
      if (TAJIK_PREFIXES[prefix2]) {
        foundOperator = TAJIK_PREFIXES[prefix2];
        break;
      }
    }
  }

  return {
    isValid: !!foundOperator,
    operator: foundOperator,
    cleanedNumber: `+992 ${digits.substring(0, 3)} ${digits.substring(3, 6)} ${digits.substring(6, 9)}`,
  };
};

// Form validation helper
const getFieldErrors = (
  fullName: string,
  dateOfBirth: string,
  phoneNumber: string,
  email: string,
  password: string,
  confirmPassword: string,
): Record<string, string> => {
  const errors: Record<string, string> = {};

  // Full Name validation - must be 2 or more words
  if (!fullName.trim()) {
    errors.fullName = "Full name is required";
  } else {
    const trimmedName = fullName.trim();
    const words = trimmedName.split(/\s+/).filter((word) => word.length > 0);

    if (words.length < 2) {
      errors.fullName = "Please enter your full name (first and last name)";
    } else if (words.length < 2 || !words[0] || !words[1]) {
      errors.fullName = "Please enter both first name and last name";
    } else if (trimmedName.length < 3) {
      errors.fullName = "Full name must be at least 3 characters";
    }
  }

  // Date of Birth validation (must be at least 13 years old)
  if (!dateOfBirth) {
    errors.dateOfBirth = "Date of birth is required";
  } else {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    if (age < 13) {
      errors.dateOfBirth = "You must be at least 13 years old to register";
    }
  }

  // Phone Number validation (Tajikistan)
  if (!phoneNumber.trim()) {
    errors.phoneNumber = "Phone number is required";
  } else {
    const phoneValidation = validateTajikPhoneNumber(phoneNumber);
    if (!phoneValidation.isValid) {
      errors.phoneNumber =
        "Invalid Tajikistan phone number. Must be a valid Tajikistan number (e.g., +992 90 000 00 00)";
    } else if (phoneValidation.operator) {
      // Store operator info in a custom property for display
      (errors as any)._phoneOperator = phoneValidation.operator;
      (errors as any)._formattedPhone = phoneValidation.cleanedNumber;
    }
  }

  // Email validation
  if (!email.trim()) {
    errors.email = "Email is required";
  } else {
    const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
    if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email address";
    }
  }

  // Password validation
  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  } else if (!/[A-Z]/.test(password)) {
    errors.password = "Password must contain at least one uppercase letter";
  } else if (!/[0-9]/.test(password)) {
    errors.password = "Password must contain at least one number";
  } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.password = "Password must contain at least one special character";
  }

  // Confirm Password validation
  if (!confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (confirmPassword !== password) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};

const SignUp = () => {
  const navigate = useNavigate();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

  // Form state
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Touched state for showing errors
  const [touched, setTouched] = useState({
    fullName: false,
    dateOfBirth: false,
    phoneNumber: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  // Submit attempt state
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

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

  const handleClickConfirmPassword = () => {
    setIsShowConfirmPassword(!isShowConfirmPassword);
  };

  const handleMouseDownConfirmPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleMouseUpConfirmPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  // Calculate current errors based on form state
  const errors = getFieldErrors(
    fullName,
    dateOfBirth,
    phoneNumber,
    email,
    password,
    confirmPassword,
  );

  // Get phone operator for helper text
  const phoneOperator = (errors as any)._phoneOperator;
  const formattedPhone = (errors as any)._formattedPhone;

  // Determine if error should be shown for a field
  const shouldShowError: any = (fieldName: keyof typeof touched) => {
    return (touched[fieldName] || attemptedSubmit) && errors[fieldName];
  };

  const handleBlur = (fieldName: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAttemptedSubmit(true);

    // Mark all fields as touched
    setTouched({
      fullName: true,
      dateOfBirth: true,
      phoneNumber: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    // Check if there are any errors
    const currentErrors = getFieldErrors(
      fullName,
      dateOfBirth,
      phoneNumber,
      email,
      password,
      confirmPassword,
    );

    const hasErrors = Object.keys(currentErrors).some(
      (key) =>
        key !== "_phoneOperator" &&
        key !== "_formattedPhone" &&
        currentErrors[key],
    );

    if (!hasErrors) {
      // All validations passed - proceed with sign up
      console.log("Form submitted successfully!");
      navigate("/dashboard");
    }
  };

  // Slides data
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

  return (
    <>
      <div className="sign_up_component flex">
        <div className="sign_up_block_1 h-screen flex md:justify-center w-full sm:flex-col md:flex-row mt-3 mb-11">
          <form onSubmit={handleSubmit} className="form_sign_up px-4 pb-9">
            <div className="block_logo_and_title_sign_up_component flex flex-col justify-center items-center">
              <div className="logo_block sm:flex md:hidden items-center gap-1">
                <img src={logoSignIn} alt="Logo" className="w-23 h-23" />
                <h1 className="text-[#7EC7EC] text-[30px] font-400">
                  Peshraft Library
                </h1>
              </div>
              <h1 className="title_sign_up_block_2 text-center text-[#100F14] text-[32px] font-600">
                Sign Up
              </h1>
            </div>
            <div className="label_input_email_password_sign_up mt-2 flex flex-col gap-5">
              <div className="form_sign_up_block_1_email">
                <label
                  htmlFor="fullname"
                  className="label_email text-[#9794AA] text-[16px] font-500 cursor-pointer"
                >
                  Full Name
                </label>
                <TextField
                  id="fullname"
                  label="Enter your full name (first and last name)"
                  variant="outlined"
                  fullWidth
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  onBlur={() => handleBlur("fullName")}
                  error={shouldShowError("fullName")}
                  helperText={
                    shouldShowError("fullName") ? errors.fullName : ""
                  }
                  sx={{
                    marginTop: 1,
                  }}
                />
              </div>
              <div className="form_sign_up_block_2_date_of_birth">
                <label
                  htmlFor="dateOfBirth"
                  className="label_email text-[#9794AA] text-[16px] font-500 cursor-pointer"
                >
                  Date of Birth
                </label>
                <TextField
                  id="dateOfBirth"
                  label="Enter your date of birth"
                  variant="outlined"
                  fullWidth
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  onBlur={() => handleBlur("dateOfBirth")}
                  error={shouldShowError("dateOfBirth")}
                  helperText={
                    shouldShowError("dateOfBirth") ? errors.dateOfBirth : ""
                  }
                  sx={{
                    marginTop: 1,
                  }}
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div className="form_sign_up_block_3_phone_number">
                <label
                  htmlFor="phoneNumber"
                  className="label_email text-[#9794AA] text-[16px] font-500 cursor-pointer"
                >
                  Phone Number
                </label>
                <TextField
                  id="phoneNumber"
                  label="Enter your phone number"
                  variant="outlined"
                  fullWidth
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  onBlur={() => handleBlur("phoneNumber")}
                  error={shouldShowError("phoneNumber")}
                  helperText={
                    shouldShowError("phoneNumber")
                      ? errors.phoneNumber
                      : phoneOperator && formattedPhone && !errors.phoneNumber
                        ? `${formattedPhone} (${phoneOperator})`
                        : "Format: +992 XX XXX XXXX or 992XX... or just 9 digits"
                  }
                  sx={{
                    marginTop: 1,
                  }}
                  type="tel"
                />
              </div>
              <div className="form_sign_up_block_4_email">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => handleBlur("email")}
                  error={shouldShowError("email")}
                  helperText={shouldShowError("email") ? errors.email : ""}
                  sx={{
                    marginTop: 1,
                  }}
                  type="email"
                />
              </div>
              <div className="form_sign_up_block_5_password">
                <label
                  htmlFor="password"
                  className="label_password text-[#9794AA] text-[16px] font-500 cursor-pointer"
                >
                  Password
                </label>
                <FormControl
                  sx={{ width: "100%", marginTop: 1 }}
                  variant="outlined"
                  error={shouldShowError("password")}
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={isShowPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => handleBlur("password")}
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
                  {shouldShowError("password") && (
                    <div
                      style={{
                        color: "#d32f2f",
                        fontSize: "0.75rem",
                        marginTop: "3px",
                        marginLeft: "14px",
                      }}
                    >
                      {errors.password}
                    </div>
                  )}
                </FormControl>
              </div>
              <div className="form_sign_up_block_6_confirm_password">
                <label
                  htmlFor="confirm_password"
                  className="label_password text-[#9794AA] text-[16px] font-500 cursor-pointer"
                >
                  Confirm Password
                </label>
                <FormControl
                  sx={{ width: "100%", marginTop: 1 }}
                  variant="outlined"
                  error={shouldShowError("confirmPassword")}
                >
                  <InputLabel htmlFor="outlined-adornment-confirm_password">
                    Confirm Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-confirm_password"
                    type={isShowConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onBlur={() => handleBlur("confirmPassword")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            isShowConfirmPassword
                              ? "hide the password"
                              : "display the password"
                          }
                          onClick={handleClickConfirmPassword}
                          onMouseDown={handleMouseDownConfirmPassword}
                          onMouseUp={handleMouseUpConfirmPassword}
                          edge="end"
                        >
                          {isShowConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Confirm Password"
                  />
                  {shouldShowError("confirmPassword") && (
                    <div
                      style={{
                        color: "#d32f2f",
                        fontSize: "0.75rem",
                        marginTop: "3px",
                        marginLeft: "14px",
                      }}
                    >
                      {errors.confirmPassword}
                    </div>
                  )}
                </FormControl>
              </div>
            </div>
            <button
              type="submit"
              className="bg-[#7A5AF8] w-full mt-6 py-2 rounded-lg cursor-pointer text-white text-[20px] font-500 hover:bg-[#7A5AF8]/90 transition-colors duration-300"
            >
              Sign Up
            </button>
            <p className="text-center text-[#8E8E8E] text-[18px] font-400 mt-4">
              Already have an account?{" "}
              <Link to={"/"} className="text-[#3A65FF] hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>
        <div className="sign_up_block_2 w-1/2 h-screen sm:hidden md:block sticky top-0">
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
                  <img src={slide.image} className="img_slides" alt="" />
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
      </div>
    </>
  );
};

export default SignUp;

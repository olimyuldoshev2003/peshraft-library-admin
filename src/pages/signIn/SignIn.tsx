// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import slideImg1 from "../../assets/signIn/slide-img-1.svg";
import slideImg2 from "../../assets/signIn/slide-img-2.svg";
import slideImg3 from "../../assets/signIn/slide-img-3.svg";

// @ts-ignore
import "swiper/css";

// @ts-ignore
import "swiper/css/pagination";

// @ts-ignore
import "swiper/css/navigation";

import "./SignIn.css";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

const SignIn = () => {
  return (
    <>
      <div className="sing_in_component flex">
        <div className="sign_in_block_1 w-1/2 h-screen">
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
              </div>
            </SwiperSlide>
            <SwiperSlide className="flex items-center justify-center">
              <div className="slide_2_block slides_block">
                <img src={slideImg2} className="img_slides" alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide className="flex items-center justify-center">
              <div className="slide_3_block slides_block">
                <img src={slideImg3} className="img_slides" alt="" />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="sign_in_block_2 h-screen"></div>
      </div>
    </>
  );
};

export default SignIn;

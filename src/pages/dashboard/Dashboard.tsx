import { HiOutlineSearch } from "react-icons/hi";

// Images
import userImg from "../../assets/user-img.svg";

const Dashboard = () => {
  return (
    <>
      <div className="dashboard_component p-7">
        <div className="header_dashboard_admin flex justify-between items-center">
          <div className="search_logo_and_search_input relative flex-1">
            <HiOutlineSearch size={24} className="absolute top-4 left-4" />
            <input
              type="search"
              className="inp_search outline-none shadow-[0_0_6px_gray] pl-12 pr-4 py-3 rounded-[30px] text-[20px] font-500 sm:w-full md:w-[90%] lg:w-[80%]"
              name=""
              id=""
              placeholder="Search enter..."
            />
          </div>
          <div className="fullname_img_of_admin_and_admin_title sm:hidden md:flex items-center gap-3">
            <div className="fullname_of_user_and_admin_title">
              <h1 className="text-[22px] font-500">Suhrob H.</h1>
              <h1 className="text-[#808080] text-[15px] font-400 text-right">
                Admin
              </h1>
            </div>
            <img className="w-14 h-14" src={userImg} alt="" />
          </div>
        </div>
        <div className="section_dashboard_admin"></div>
      </div>
    </>
  );
};

export default Dashboard;

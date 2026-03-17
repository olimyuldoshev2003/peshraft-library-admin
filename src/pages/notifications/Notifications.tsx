import { HiOutlineSearch } from "react-icons/hi";

import userImg from "../../assets/user-img.svg";
import { LuPlus } from "react-icons/lu";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

const Notifications = () => {
  return (
    <>
      <div className="notifications_component p-4">
        <div className="notifications_component_block">
          <div className="header_notifications_component flex justify-between items-center gap-6">
            <div className="search_logo_and_search_input relative flex-1">
              <HiOutlineSearch size={24} className="absolute top-4 left-4" />
              <input
                type="search"
                className="inp_search outline-none shadow-[0_0_6px_gray] pl-12 pr-4 py-3 rounded-[30px] text-[20px] font-500 sm:w-full md:w-[90%] lg:w-[80%]"
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

          <div className="section_notifications_component mt-7">
            <div className="title_and_btn_add_notifications_block flex justify-between items-center gap-2">
              <h1 className="title_notitfications sm:text-[18px] md:text-2xl font-600">
                Overdue Returns List
              </h1>
              <div className="btn_add_block flex justify-between items-center gap-6">
                <button className="flex items-center gap-2 bg-[#20ACFF] p-2.5 rounded-[10px] text-white text-[18px] font-500 cursor-pointer">
                  <LuPlus />
                  Add Notication
                </button>
              </div>
            </div>
            <div className="notifications_block mt-6">
              {/* Notification 1 */}
              <div className="notification_container flex justify-between shadow-[0_0_6px_gray] rounded-xl p-2">
                <div className="title_and_description_block">
                  <h1 className="title_notification text-[16px] font-600">
                    IT-GAP
                  </h1>
                  <p className="description_notification text-[14px] font-400">
                    IT-GAP is coming! Join us for an exciting IT event bringing
                    together innovation, technology, and networking.
                  </p>
                </div>
                <div className="btns_functionalities_block flex items-center gap-1.5">
                  <AiFillEdit
                    size={27}
                    className="cursor-pointer text-blue-600 hover:text-blue-800 duration-100"
                    // onClick={() => {
                    //   setModalBookInfoAndEdit(true);
                    //   removeScrollbar()
                    // }}
                  />
                  <MdDelete
                    size={27}
                    className="cursor-pointer text-red-500 hover:text-red-600 duration-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notifications;

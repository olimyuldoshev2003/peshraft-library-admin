import { HiOutlineSearch } from "react-icons/hi";
import userImg from "../../assets/user-img.svg";

// Icons
import TuneIcon from "@mui/icons-material/Tune";
import { LuPlus } from "react-icons/lu";

const Books = () => {
  return (
    <>
      <div className="books_component p-4">
        <div className="header_books flex justify-between items-center gap-6">
          <div className="search_logo_and_search_input relative flex items-center flex-1 gap-4">
            <HiOutlineSearch size={24} className="absolute top-4 left-4" />
            <input
              type="search"
              className="inp_search outline-none shadow-[0_0_6px_gray] pl-12 pr-4 py-3 rounded-[30px] text-[20px] font-500 sm:w-full md:w-[90%] lg:w-[80%]"
              placeholder="Search enter..."
            />
            <button className="icons_filter_block shadow-[0_0_6px_gray] flex justify-center items-center p-2 rounded-[10px]">
              <TuneIcon
                sx={{
                  fontSize: "36px",
                }}
              />
            </button>
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
        <div className="section_books mt-7">
          <div className="title_filter_btn_add__book_block flex justify-between items-center">
            <h1 className="title_filter text-2xl font-600">Manage Books</h1>
            <div className="filter_and_btn_add_block flex justify-between items-center gap-6">
              <div className="filter_block">
                <h3 className="filter_title text-[20px] font-600">Showing</h3>
              </div>
              <button className="flex items-center gap-2 bg-[#20ACFF] p-2.5 rounded-[10px] text-white text-[18px] font-500 cursor-pointer">
                <LuPlus />
                Add new book
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Books;

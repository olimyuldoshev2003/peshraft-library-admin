import "./Dashboard.css";

import { HiOutlineSearch } from "react-icons/hi";

// Images
import userImg from "../../assets/user-img.svg";
import { LuUsers } from "react-icons/lu";
import { PiBookOpen } from "react-icons/pi";
import SecurityUpdateGoodOutlinedIcon from "@mui/icons-material/SecurityUpdateGoodOutlined";
import { MdOutlineSecurityUpdateWarning } from "react-icons/md";

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
        <div className="section_dashboard_admin mt-5">
          <h1 className="title_admin_dashboard text-[25px] font-600">
            Admin Dashboard
          </h1>
          <div className="amount_block flex justify-between items-center mt-2 sm:flex-col md:flex-row md:flex-wrap gap-4">
            <div className="amount_block_members bg-[#F1E7FF] p-2.5 flex justify-between items-center gap-5 rounded-[10px] sm:w-full md:w-[48%] lg:w-max">
              <div className="title_and_amount_block">
                <h1 className="title">Members</h1>
                <h1 className="amount">60</h1>
              </div>
              <LuUsers
                style={{
                  color: "#6D05FF",
                  fontSize: "40px",
                }}
              />
            </div>
            <div className="amount_block_total_books bg-[#E4F5FF] p-2.5 flex justify-between items-center gap-5 rounded-[10px] sm:w-full md:w-[48%] lg:w-max">
              <div className="title_and_amount_block">
                <h1 className="title">Total Books</h1>
                <h1 className="amount">600</h1>
              </div>
              <PiBookOpen
                style={{
                  color: "#37B5FF",
                  fontSize: "40px",
                }}
              />
            </div>
            <div className="amount_block_books_borrowers bg-[#EAFEEF] p-2.5 flex justify-between items-center gap-5 rounded-[10px] sm:w-full md:w-[48%] lg:w-max">
              <div className="title_and_amount_block">
                <h1 className="title">Books Borrowers</h1>
                <h1 className="amount">76</h1>
              </div>
              <SecurityUpdateGoodOutlinedIcon
                style={{
                  color: "#00FF40",
                  fontSize: "40px",
                }}
              />
            </div>
            <div className="amount_block_overdue_books bg-[#FFDADB] p-2.5 flex justify-between items-center gap-5 rounded-[10px] sm:w-full md:w-[48%] lg:w-max">
              <div className="title_and_amount_block">
                <h1 className="title">Overdue Books</h1>
                <h1 className="amount">60</h1>
              </div>
              <MdOutlineSecurityUpdateWarning
                style={{
                  color: "#FD286F",
                  fontSize: "40px",
                }}
              />
            </div>
          </div>
          <div className="monthly_borrowing_summary_and_volunteeers_graph_block">
            <div className="monthly_borrowing_summary_graph_block">
              <h1 className="title_monthly_borrowing_summary">
                Monthly Borrowing Summary
              </h1>
              
            </div>
            <div className="volunteers_graph_block">
              <h1 className="title_volunteers">Volunteers</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

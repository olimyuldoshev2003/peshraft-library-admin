import "./Dashboard.css";

import { HiOutlineSearch } from "react-icons/hi";

// Images
import userImg from "../../assets/user-img.svg";
import { LuUsers } from "react-icons/lu";
import { PiBookOpen } from "react-icons/pi";
import SecurityUpdateGoodOutlinedIcon from "@mui/icons-material/SecurityUpdateGoodOutlined";
import { MdOutlineSecurityUpdateWarning } from "react-icons/md";

// import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import { useEffect, useState } from "react";
import { axiosRequest } from "../../utils/axiosRequest";

// Table data array
const overdueBorrowersData = [
  {
    id: 1,
    fullName: "Olim Yuldoshev",
    phoneNumber: "+992919697875",
    role: "Volunteer",
    bookTitle: "Cashflow Quadrant",
    borrowDate: "2026-02-24",
    dueDate: "2024-03-24",
    daysOverdue: "30 days left",
  },
  {
    id: 2,
    fullName: "Olim Yuldoshev",
    phoneNumber: "+992919697875",
    role: "Volunteer",
    bookTitle: "Cashflow Quadrant",
    borrowDate: "2026-02-24",
    dueDate: "2024-03-24",
    daysOverdue: "30 days left",
  },
  {
    id: 3,
    fullName: "John Doe",
    phoneNumber: "+992919697876",
    role: "Student",
    bookTitle: "Rich Dad Poor Dad",
    borrowDate: "2026-02-20",
    dueDate: "2024-03-20",
    daysOverdue: "25 days left",
  },
];

const Dashboard = () => {
  const [stat, setStat] = useState<any>({});
  const [loadingStat, setLoadingStat] = useState<boolean>(false);

  // const volunteersData = [
  //   { id: 0, value: 50, label: "Male" },
  //   { id: 1, value: 50, label: "Female" },
  // ];

  const dataset = [
    {
      overdue: 8,
      borrowed: 45,
      month: "Jan",
    },
    {
      overdue: 10,
      borrowed: 52,
      month: "Feb",
    },
    {
      overdue: 12,
      borrowed: 58,
      month: "Mar",
    },
    {
      overdue: 9,
      borrowed: 63,
      month: "Apr",
    },
    {
      overdue: 15,
      borrowed: 71,
      month: "May",
    },
    {
      overdue: 18,
      borrowed: 68,
      month: "June",
    },
    {
      overdue: 22,
      borrowed: 55,
      month: "July",
    },
    {
      overdue: 20,
      borrowed: 49,
      month: "Aug",
    },
    {
      overdue: 14,
      borrowed: 57,
      month: "Sept",
    },
    {
      overdue: 11,
      borrowed: 62,
      month: "Oct",
    },
    {
      overdue: 9,
      borrowed: 54,
      month: "Nov",
    },
    {
      overdue: 7,
      borrowed: 48,
      month: "Dec",
    },
  ];

  const chartSetting = {
    yAxis: [
      {
        width: 60,
      },
    ],
    height: 300,
  };

  function valueFormatter(value: number | null) {
    return `${value}`;
  }

  //For Table
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      whiteSpace: "nowrap",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      whiteSpace: "nowrap",
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  async function getStat() {
    setLoadingStat(true);
    try {
      const { data } = await axiosRequest.get(
        `${import.meta.env.VITE_API_URL}/admin/stats`,
      );

      setStat(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingStat(false);
    }
  }

  useEffect(() => {
    getStat();
  }, []);

  // Admin Side
  ////////////////////////////////////////////////////////////////
  // Dashboard page
  ////////////////////////////////////////////////////////////////
  // 1. Stat
  // get()
  // {
  //  total_members: 20,
  //  total_books: 100,
  //  active_borrows: 5,
  //  overdue_books: 3
  // }

  // 2. Stat in month(in chart)
  // get()
  // [
  //   {
  //      overdue: 3,
  //      borrowed: 5,
  //      date: "01-01-2024",
  //      month: 1
  //   },
  //   ...
  // ]

  // 3. Overdue Received Members
  // get()
  // [
  //   {
  //     id: "",
  //     name: "",
  //     phone:"",
  //     book_title:"",
  //     borrow_date: "",
  //     due_date: "",
  //     days_overdue: "",
  //   },
  //   ...
  // ]
  ////////////////////////////////////////////////////////////////

  // Books page
  ////////////////////////////////////////////////////////////////
  // 1. Filter
  // get()
  // [
  //   {
  //     id: "1",
  //     filterName: "Finance",
  //   },
  //   {
  //     id: "2",
  //     filterName: "Fantasy",
  //   },
  //   {
  //     id: "3",
  //     filterName: "Drama",
  //   },
  //   ...
  // ];

  // post() (add), put() (edit)
  // {
  //   id: new id (add) or existed id (edit) (type string),
  //    filterName: "newFilter"
  // }

  // delete()
  // delete filter by id

  // 2. Books
  // get()
  // [
  //   {
  //     id: "",
  //     image_url: "",
  //     title: "",
  //     author: "",
  //     category: "",
  //     book_page: "",
  //     year: 2005 (type number),
  //     available_copies: 3 (type number),
  //   },
  //   ...
  // ]

  // post() (add), put() (edit)
  // {
  //   id: new id (add) or existed id (edit) (type string),
  //   bg_image_url: "",
  //   image_url: "",
  //   title: "",
  //   category: "",
  //   year: 2005 (type number),
  //   author: "",
  //   book_page: "",
  //   language: "",
  //   available_copies: 3 (type number),
  //   description: "",
  // },

  // delete()
  // delete book by id
  ////////////////////////////////////////////////////////////////

  // Members page
  ////////////////////////////////////////////////////////////////
  // 1. Members
  // get()
  // [
  //   {
  //     id: "",
  //     member_image_url: "",
  //     name: "",
  //     date_of_birth:"",
  //     phone: "",
  //     email: "",
  //   }
  //   ...
  // ]

  // 2. Bookshelf (Received books by user_id)
  // get()
  // [
  //   {
  //      id: "",
  //      image_url: "",
  //      title: "",
  //      author: ""
  //      borrow_date: "",
  //      due_date: "",
  //    }
  //   ...
  // ]

  // 3. History (History of already read book by user_id)
  // get()
  // [
  //   {
  //      id: "",
  //      image_url: "",
  //      title: "",
  //      author: ""
  //   }
  //   ...
  // ]
  ////////////////////////////////////////////////////////////////

  // Received Members Page
  ////////////////////////////////////////////////////////////////
  // 1. Received Members
  // get()
  // [
  //   {
  //      id: "",
  //      member_image_url: "",
  //      borrower_name: "",
  //      borrow_date: "",
  //      due_date: "",
  //      phone:"",
  //      email:  ""
  //      book_title:"",
  //      author:  ""
  //   }
  //   ...
  // ]

  // delete()
  // delete Received Member by id
  ////////////////////////////////////////////////////////////////

  // Receive Book Requests Page
  ////////////////////////////////////////////////////////////////
  // 1. Receive Book Requests
  // get()
  // [
  //   {
  //      id: "",
  //      member_image_url: "",
  //      receiver_name: "",
  //      phone:"",
  //      email:  ""
  //      request_date: "",
  //      due_date: "",
  //      book_title:"",
  //      author:  ""
  //   }
  //   ...
  // ]

  // post() (add), delete() (Accept Button) (both actions in one request: delete - receive book request by id,
  // post - received member)
  // post()
  // [
  //   {
  //      id: "",
  //      member_image_url: "",
  //      borrower_name: "",
  //      borrow_date: "",
  //      due_date: "",
  //      phone:"",
  //      email:  ""
  //      book_title:"",
  //      author:  ""
  //   }
  //   ...
  // ]

  // delete()
  // Delete Receive Book Request by id
  ////////////////////////////////////////////////////////////////

  // Return Book Requests Page
  ////////////////////////////////////////////////////////////////
  // 1. Return Book Requests
  // get()
  // [
  //   {
  //      id: "",
  //      member_image_url: "",
  //      returner_name: "",
  //      phone:"",
  //      email:  ""
  //      borrowed_date: "",
  //      due_date: "",
  //      request_date: "",
  //      book_title:"",
  //      author:  ""
  //   }
  //   ...
  // ]

  // delete(), delete() (Accept Button) (both actions in one request: delete - return book request by id,
  // delete - received member by id)

  // delete()
  // Delete Return Book Request by id, Received Member By id
  ////////////////////////////////////////////////////////////////

  // Notifications Page
  ////////////////////////////////////////////////////////////////
  // 1. Notifications
  // get()
  // [
  //   {
  //      id: "",
  //      title: "",
  //      description: "",
  //   }
  //   ...
  // ]

  // post() (add), put() (edit)
  // In here the database notificaion has to have the filter by notification type.
  // If notification type is duetime, we need to send the notification to the defined user by user id,
  // but if notification type is news, the notification has to be sent to all users
  // {
  //   id: "",
  //   member: "user_id, all_users", (In here member will be chosen from members - getting the members)
  //   notification_type: "duetime or news",
  //   title: "",
  //   description: "",
  // }

  // delete()
  // Delete notification by notification_id
  ////////////////////////////////////////////////////////////////

  // Profile Page
  ////////////////////////////////////////////////////////////////
  // 1. Main Admin and Admins Profile
  // get()
  // {
  //   id: "",
  //   admin_image_url: "",
  //   name: "",
  //   date_of_birth: "",
  //   phone: "",
  //   email: "",
  // }

  // put() (Change Password)
  // {
  //   old_password: "",
  //   new_password: "",
  // }

  // put()
  // {
  //   id: "",
  //   admin_image_url: "",
  //   name: "",
  //   date_of_birth: "",
  //   phone: "",
  //   email: "",
  // }

  // 2. All Admins (will be showed only to Main Admin for management other admins)
  // get()
  // [
  //  {
  //    id: "",
  //    name: "",
  //    date_of_birth: "",
  //    phone: "",
  //    email: "",
  //  }
  // ...
  // ]
  // post() (Accepting registered Admin as Admin - Allowing to use the data od Peshraft Library and being Admin)
  // Accepting the request
  ////////////////////////////////////////////////////////////////

  // Sign Up Page (Admin side)
  ////////////////////////////////////////////////////////////////
  // 1. Sign Up
  // post()
  // {
  //   name: "",
  //   date_of_birth: "",
  //   phone: "",
  //   email: "",
  //   password: "",
  //   confirm_password: "",
  // }
  ////////////////////////////////////////////////////////////////
  
  // Sign In Page (Admin side)
  ////////////////////////////////////////////////////////////////
  // 1. Sign In
  // post()
  // {
  //   email: "",
  //   password: "",
  // }
  ////////////////////////////////////////////////////////////////

  // Forget Password Page (Admin side)
  ////////////////////////////////////////////////////////////////
  // 1. Forget Password
  // post()
  // {
  //   new_password: "",
  //   confirm_new_password: "",
  // }
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////

  return (
    <>
      <div className="dashboard_component p-4 max-w-360 mx-auto">
        <div className="header_dashboard_admin flex justify-between items-center">
          <div className="search_logo_and_search_input relative flex-1">
            <HiOutlineSearch size={24} className="absolute top-2.5 left-3" />
            <input
              type="search"
              className="inp_search outline-none shadow-[0_0_6px_gray] pl-12 pr-4 py-2 rounded-[30px] text-[18px] font-500 sm:w-full md:w-[90%] lg:w-[80%]"
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
          {loadingStat ? (
            <>
              <h1>Loading...</h1>
            </>
          ) : (
            <div className="amount_block flex justify-between items-center mt-2 sm:flex-col md:flex-row md:flex-wrap gap-4">
              <div className="amount_block_members bg-[#F1E7FF] p-2.5 flex justify-between items-center gap-5 rounded-[10px] sm:w-full md:w-[48%] lg:w-max flex-1">
                <div className="title_and_amount_block">
                  <h1 className="title">Members</h1>
                  <h1 className="amount">{stat.total_members}</h1>
                </div>
                <LuUsers
                  style={{
                    color: "#6D05FF",
                    fontSize: "40px",
                  }}
                />
              </div>
              <div className="amount_block_total_books bg-[#E4F5FF] p-2.5 flex justify-between items-center gap-5 rounded-[10px] sm:w-full md:w-[48%] lg:w-max flex-1">
                <div className="title_and_amount_block">
                  <h1 className="title">Total Books</h1>
                  <h1 className="amount">{stat.total_books}</h1>
                </div>
                <PiBookOpen
                  style={{
                    color: "#37B5FF",
                    fontSize: "40px",
                  }}
                />
              </div>
              <div className="amount_block_books_borrowers bg-[#EAFEEF] p-2.5 flex justify-between items-center gap-5 rounded-[10px] sm:w-full md:w-[48%] lg:w-max flex-1">
                <div className="title_and_amount_block">
                  <h1 className="title">Books Borrowers</h1>
                  <h1 className="amount">{stat.active_borrows}</h1>
                </div>
                <SecurityUpdateGoodOutlinedIcon
                  style={{
                    color: "#00FF40",
                    fontSize: "40px",
                  }}
                />
              </div>
              <div className="amount_block_overdue_books bg-[#FFDADB] p-2.5 flex justify-between items-center gap-5 rounded-[10px] sm:w-full md:w-[48%] lg:w-max flex-1">
                <div className="title_and_amount_block">
                  <h1 className="title">Overdue Books</h1>
                  <h1 className="amount">{stat.overdue_books}</h1>
                </div>
                <MdOutlineSecurityUpdateWarning
                  style={{
                    color: "#FD286F",
                    fontSize: "40px",
                  }}
                />
              </div>
            </div>
          )}
          {loadingStat === false && stat.length === 0 && (
            <>
              <h1>Statistics not found</h1>
            </>
          )}

          <div className="monthly_borrowing_summary_and_volunteeers_graph_block mt-5 flex flex-col lg:flex-row justify-between gap-8 lg:gap-20">
            <div className="monthly_borrowing_summary_graph_block w-full lg:w-2/3 overflow-x-auto">
              <h1 className="title_monthly_borrowing_summary text-[25px] font-600 mb-4">
                Monthly Borrowing Summary
              </h1>
              <div>
                <BarChart
                  dataset={dataset}
                  xAxis={[{ dataKey: "month", scaleType: "band" }]}
                  series={[
                    { dataKey: "overdue", label: "Overdue", valueFormatter },
                    { dataKey: "borrowed", label: "Borrowed", valueFormatter },
                  ]}
                  {...chartSetting}
                />
              </div>
            </div>
            {/* <div className="volunteers_graph_block w-full lg:w-1/3">
              <h1 className="title_volunteers text-[25px] font-600 mb-4 sm:text-start md:text-center">
                Volunteers
              </h1>
              <div className="flex justify-center">
                <PieChart
                  series={[
                    {
                      data: volunteersData,
                      innerRadius: 30,
                      outerRadius: 80,
                      paddingAngle: 0,
                      cornerRadius: 0,
                    },
                  ]}
                  width={200}
                  height={200}
                  slotProps={{
                    legend: {
                      direction: "horizontal",
                      position: { vertical: "bottom", horizontal: "center" },
                    },
                  }}
                />
              </div>
            </div> */}
          </div>
          <div className="priority_overdue_borrewers_list_block mt-8">
            <h1 className="title_priority_overdue_borrewers text-[25px] font-600 mb-4">
              Priority Overdue Borrowers
            </h1>

            <TableContainer>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell sx={{ minWidth: 150 }}>
                      Full Name
                    </StyledTableCell>
                    <StyledTableCell sx={{ minWidth: 150 }}>
                      Phone Number
                    </StyledTableCell>
                    <StyledTableCell sx={{ minWidth: 200 }}>
                      Book Title
                    </StyledTableCell>
                    <StyledTableCell sx={{ minWidth: 120 }}>
                      Borrow date
                    </StyledTableCell>
                    <StyledTableCell sx={{ minWidth: 120 }}>
                      Due Date
                    </StyledTableCell>
                    <StyledTableCell sx={{ minWidth: 120 }}>
                      Days Overdue
                    </StyledTableCell>
                    <StyledTableCell sx={{ minWidth: 120 }}>
                      Status
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {overdueBorrowersData.map((borrower: any) => (
                    <StyledTableRow key={borrower.id}>
                      <StyledTableCell>{borrower.fullName}</StyledTableCell>
                      <StyledTableCell>{borrower.phoneNumber}</StyledTableCell>
                      <StyledTableCell>{borrower.bookTitle}</StyledTableCell>
                      <StyledTableCell>{borrower.borrowDate}</StyledTableCell>
                      <StyledTableCell>{borrower.dueDate}</StyledTableCell>
                      <StyledTableCell>{borrower.daysOverdue}</StyledTableCell>
                      <StyledTableCell>Danger</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

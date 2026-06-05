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
import CircularProgress from "@mui/material/CircularProgress";

const Dashboard = () => {
  const [stat, setStat] = useState<any>({});
  const [loadingStat, setLoadingStat] = useState<boolean>(false);

  const [overdueBorrowers, setOverdueBorrowers] = useState<any[]>([]);
  const [loadingOverdueBorrowers, setLoadingOverdueBorrowers] =
    useState<boolean>(false);

  const [monthlyStats, setMonthlyStats] = useState<any[]>([]);
  const [loadingMonthlyStats, setLoadingMonthlyStats] =
    useState<boolean>(false);

  // const volunteersData = [
  //   { id: 0, value: 50, label: "Male" },
  //   { id: 1, value: 50, label: "Female" },
  // ];

  const dataset =
    monthlyStats.length > 0
      ? monthlyStats
      : [
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

  async function getMonthlyStats() {
    setLoadingMonthlyStats(true);
    try {
      const { data } = await axiosRequest.get(
        `${import.meta.env.VITE_API_URL}/admin/stats/monthly`,
      );

      // Transform API data to match chart format
      if (data && Array.isArray(data)) {
        const transformedData = data.map((item: any) => ({
          month: getMonthName(item.month),
          overdue: item.overdue || 0,
          borrowed: item.borrowed || 0,
        }));
        setMonthlyStats(transformedData);
      }
    } catch (error) {
      console.error("Error fetching monthly stats:", error);
      // Keep default dataset if API fails
    } finally {
      setLoadingMonthlyStats(false);
    }
  }

  function getMonthName(monthNumber: number): string {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[monthNumber - 1] || "Jan";
  }

  async function getOverdueBorrowers() {
    setLoadingOverdueBorrowers(true);
    try {
      const { data } = await axiosRequest.get(
        `${import.meta.env.VITE_API_URL}/admin/overdue`,
      );

      // Transform API data to match table format
      if (data && Array.isArray(data)) {
        const transformedData = data.map((item: any) => ({
          id: item.id,
          fullName: item.name || item.fullName,
          phoneNumber: item.phone,
          role: item.role || "Member",
          bookTitle: item.book_title,
          borrowDate: item.borrow_date,
          dueDate: item.due_date,
          daysOverdue: item.days_overdue || `${item.days_overdue} days left`,
        }));
        setOverdueBorrowers(transformedData);
      } else if (data?.members && Array.isArray(data.members)) {
        const transformedData = data.members.map((item: any) => ({
          id: item.id,
          fullName: item.name || item.fullName,
          phoneNumber: item.phone,
          role: item.role || "Member",
          bookTitle: item.book_title,
          borrowDate: item.borrow_date,
          dueDate: item.due_date,
          daysOverdue: item.days_overdue || `${item.days_overdue} days left`,
        }));
        setOverdueBorrowers(transformedData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingOverdueBorrowers(false);
    }
  }

  useEffect(() => {
    getStat();
    getMonthlyStats();
    getOverdueBorrowers();
  }, []);

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
            <div className="flex justify-center items-center py-10">
              <CircularProgress />
            </div>
          ) : (
            <div className="amount_block flex justify-between items-center mt-2 sm:flex-col md:flex-row md:flex-wrap gap-4">
              <div className="amount_block_members bg-[#F1E7FF] p-2.5 flex justify-between items-center gap-5 rounded-[10px] sm:w-full md:w-[48%] lg:w-max flex-1">
                <div className="title_and_amount_block">
                  <h1 className="title">Members</h1>
                  <h1 className="amount">{stat.total_members || 0}</h1>
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
                  <h1 className="amount">{stat.total_books || 0}</h1>
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
                  <h1 className="amount">{stat.active_borrows || 0}</h1>
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
                  <h1 className="amount">{stat.overdue_books || 0}</h1>
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

          <div className="monthly_borrowing_summary_and_volunteeers_graph_block mt-5 flex flex-col lg:flex-row justify-between gap-8 lg:gap-20">
            <div className="monthly_borrowing_summary_graph_block w-full lg:w-2/3 overflow-x-auto">
              <h1 className="title_monthly_borrowing_summary text-[25px] font-600 mb-4">
                Monthly Borrowing Summary
              </h1>
              <div>
                {loadingMonthlyStats ? (
                  <div className="flex justify-center items-center h-80">
                    <CircularProgress />
                  </div>
                ) : (
                  <BarChart
                    dataset={dataset}
                    xAxis={[{ dataKey: "month", scaleType: "band" }]}
                    series={[
                      { dataKey: "overdue", label: "Overdue", valueFormatter },
                      {
                        dataKey: "borrowed",
                        label: "Borrowed",
                        valueFormatter,
                      },
                    ]}
                    {...chartSetting}
                  />
                )}
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

            {loadingOverdueBorrowers ? (
              <div className="flex justify-center items-center py-10">
                <CircularProgress />
              </div>
            ) : (
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
                    {overdueBorrowers.length > 0 ? (
                      overdueBorrowers.map((borrower: any) => (
                        <StyledTableRow key={borrower.id}>
                          <StyledTableCell>{borrower.fullName}</StyledTableCell>
                          <StyledTableCell>
                            {borrower.phoneNumber}
                          </StyledTableCell>
                          <StyledTableCell>
                            {borrower.bookTitle}
                          </StyledTableCell>
                          <StyledTableCell>
                            {borrower.borrowDate}
                          </StyledTableCell>
                          <StyledTableCell>{borrower.dueDate}</StyledTableCell>
                          <StyledTableCell>
                            {borrower.daysOverdue}
                          </StyledTableCell>
                          <StyledTableCell
                            sx={{ color: "#FD286F", fontWeight: 600 }}
                          >
                            Danger
                          </StyledTableCell>
                        </StyledTableRow>
                      ))
                    ) : (
                      <StyledTableRow>
                        <StyledTableCell colSpan={7} align="center">
                          No overdue borrowers found
                        </StyledTableCell>
                      </StyledTableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

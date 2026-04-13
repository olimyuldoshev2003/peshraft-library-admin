import { HiOutlineSearch } from "react-icons/hi";

// Images
import userImg from "../../assets/user-img.svg";
import memberImg from "../../assets/profile-img.jpg";
import bookImg from "../../assets/tojikon.jpg";

// Table
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
// import { IoClose } from "react-icons/io5";
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogActions from "@mui/material/DialogActions";
import { BsThreeDots } from "react-icons/bs";
// import { Link } from "react-router-dom";
import { alpha } from "@mui/material/styles";
import { useMemo, useState } from "react";
import Dialog from "@mui/material/Dialog";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { LuOctagonAlert } from "react-icons/lu";

const Members = () => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<any>("bookTitle");
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(17);

  const [modalInfoAboutMember, setModalInfoAboutMember] =
    useState<boolean>(false);

  const rows: any = [
    {
      id: 1,
      img: "/src/assets/signIn/logo-pehraft-sign-in.svg",
      fullname: "Olim Yuldoshev",
      birthDate: "2003-19-11",
      jobPosition: "Volunteer",
      phoneNumber: "919697875",
      email: "oyuldoshev39@gmail.com",
      status: "Active",
    },
  ];

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  type Order = "asc" | "desc";

  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
  ): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
  ) => number {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const headCells: any = [
    {
      id: "img",
      numeric: false,
      disablePadding: true,
      label: "Image",
    },
    {
      id: "fullname",
      numeric: false,
      disablePadding: true,
      label: "Full Name",
    },
    {
      id: "birth-date",
      numeric: false,
      disablePadding: false,
      label: "Date of Birthday",
    },
    {
      id: "job-position",
      numeric: false,
      disablePadding: false,
      label: "Job Position",
    },
    {
      id: "phone-number",
      numeric: false,
      disablePadding: false,
      label: "Phone Number",
    },
    {
      id: "email",
      numeric: false,
      disablePadding: false,
      label: "Email Adress",
    },
    {
      id: "status",
      numeric: false,
      disablePadding: false,
      label: "Status",
    },
    {
      id: "action",
      numeric: false,
      disablePadding: false,
      label: "Action",
    },
  ];

  interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: any) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
  }

  function EnhancedTableHead(props: EnhancedTableProps) {
    const {
      // onSelectAllClick,
      order,
      orderBy,
      // numSelected,
      // rowCount,
      onRequestSort,
    } = props;
    const createSortHandler =
      (property: any) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
      };

    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell: any) => (
            <TableCell
              key={headCell.id}
              // align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  interface EnhancedTableToolbarProps {
    numSelected: number;
  }

  function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected } = props;

    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity,
              ),
          }),
        }}
      >
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Members
        </Typography>
      </Toolbar>
    );
  }

  const handleRequestSort = (_: React.MouseEvent<unknown>, property: any) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n: any) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  // const handleClick = (_: React.MouseEvent<unknown>, id: number) => {
  //   const selectedIndex = selected.indexOf(id);
  //   let newSelected: readonly number[] = [];

  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, id);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1),
  //     );
  //   }
  //   setSelected(newSelected);
  // };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setDense(event.target.checked);
  // };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage],
  );

  // function removeScrollbar() {
  //   document.body.classList.add("scroll_hidden_modal_filter_without_overlay");
  //   document.body.classList.remove(
  //     "scroll_visible_modal_filter_without_overlay",
  //   );
  // }

  // function showScrollbar() {
  //   document.body.classList.add("scroll_visible_modal_filter_without_overlay");
  //   document.body.classList.remove(
  //     "scroll_hidden_modal_filter_without_overlay",
  //   );
  // }

  return (
    <>
      <div className="members_component">
        <div className="members_component_block p-4">
          <div className="header_member_component flex justify-between items-center gap-6">
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
          <div className="section_member_component mt-6">
            <Paper
              sx={{
                width: "100%",
                // mb: 2,
                paddingLeft: 3,
                paddingRight: 3,
              }}
            >
              <EnhancedTableToolbar numSelected={selected.length} />
              <TableContainer>
                <Table
                  sx={{ minWidth: 750 }}
                  aria-labelledby="tableTitle"
                  // size={dense ? "small" : "medium"}
                >
                  <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                  />
                  <TableBody>
                    {visibleRows.map((row, index) => {
                      // const isItemSelected = selected.includes(row.id);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
                        >
                          {/*  */}
                          <TableCell>
                            <img
                              src={row.img}
                              className="w-10 h-10 rounded-full"
                              alt="Book cover"
                            />
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            {row.fullname}
                          </TableCell>
                          <TableCell>{row.birthDate}</TableCell>
                          <TableCell>{row.jobPosition}</TableCell>
                          <TableCell>{row.phoneNumber}</TableCell>
                          <TableCell>{row.email}</TableCell>
                          <TableCell>{row.status}</TableCell>
                          <TableCell>
                            <BsThreeDots
                              size={27}
                              className="cursor-pointer text-blue-600 hover:text-blue-800 duration-100"
                              onClick={() => {
                                setModalInfoAboutMember(true);
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[17, 10, 8, 5]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>

            {/* Modal about member info */}
            <Dialog
              open={modalInfoAboutMember}
              onClose={() => {
                setModalInfoAboutMember(false);
              }}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              maxWidth="md"
              fullWidth
            >
              <div className="modal_info_about_member_block sm:p-4 md:p-2.5 flex items-center gap-5 min-w-0 flex-wrap">
                <div className="info_about_member shrink-0 flex flex-col sm:justify-center md:justify-start sm:w-full md:w-[45%]">
                  <div className="btn_close_block">
                    <IoArrowBackCircleOutline
                      size={25}
                      className="cursor-pointer"
                      onClick={() => {
                        setModalInfoAboutMember(false);
                      }}
                    />
                  </div>
                  <div className="info_about_member flex flex-col sm:justify-center md:justify-start sm:items-center md:items-start">
                    <img
                      src={memberImg}
                      className="w-58.5 h-68.5 rounded-xl object-contain"
                      alt=""
                    />
                    <div className="info_text_block">
                      <h1 className="info_text_title text-[22px] font-500">
                        Bio Info
                      </h1>
                      <h1 className="text-[#6E6E6E] text-[17px] font-500">
                        Full Name:{" "}
                        <span className="text-black font-400">
                          Olim Yuldoshev
                        </span>
                      </h1>
                      <h1 className="text-[#6E6E6E] text-[17px] font-500">
                        Birth Date:{" "}
                        <span className="text-black font-400">19.11.2003</span>
                      </h1>
                      <h1 className="text-[#6E6E6E] text-[17px] font-500">
                        Job Title:{" "}
                        <span className="text-black font-400">Volunteer</span>
                      </h1>
                      <h1 className="text-[#6E6E6E] text-[17px] font-500">
                        Phone:{" "}
                        <span className="text-black font-400">919697875</span>
                      </h1>
                      <h1 className="text-[#6E6E6E] text-[17px] font-500">
                        Email:{" "}
                        <span className="text-black font-400">
                          oyuldoshev39@gmail.com
                        </span>
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="info_bookshelf_and_history_book_block flex flex-col gap-3 flex-1 min-w-0">
                  <div className="info_about_bookshelf_of_member">
                    <h1 className="bookshelf_title text-[25px] font-500 border-b-3">
                      Bookshelf
                    </h1>
                    <div className="bookshelf_block p-3 h-47 overflow-auto flex flex-col gap-3 border-b-2 border-b-[#D9D9D9] w-full">
                      {/* Bookshelf 1 */}
                      <div className="boolshelf_container flex justify-between items-center gap-3 sm:w-80 md:w-auto">
                        <div className="img_book_name_and_author_name_block flex items-center gap-3">
                          <div className="block_img bg-[#F5EABD] p-2 rounded-[5px]">
                            <img
                              src={bookImg}
                              alt=""
                              className="w-10.75 h-15"
                            />
                          </div>
                          <div className="name_and_author_of_book">
                            <h1 className="name_of_book text-[20px] font-500">
                              TOJIKON
                            </h1>
                            <p className="author_of_book text-[#515151] text-[14px] font-400">
                              Bobojon Gafurov
                            </p>
                          </div>
                        </div>
                        <div className="icon_and_days_left">
                          <h1 className="flex items-center text-[#FF383C] gap-1.5">
                            <LuOctagonAlert size={18} />
                            <span className="text-[12px] font-600">
                              6 days left
                            </span>
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="info_about_history_book_of_member">
                    <h1 className="history_book_title text-[25px] font-500 border-b-3">
                      History Book
                    </h1>
                    <div className="history_book_block p-3 h-47 overflow-auto flex flex-col gap-3 border-b-2 border-b-[#D9D9D9] ">
                      {/* History Book 1 */}
                      <div className="hisory_book_container flex items-center gap-3 sm:w-50 md:w-auto">
                        <div className="block_img bg-[#F5EABD] p-2 rounded-[5px]">
                          <img src={bookImg} alt="" className="w-10.75 h-15" />
                        </div>
                        <div className="name_and_author_of_book">
                          <h1 className="name_of_book text-[20px] font-500">
                            TOJIKON
                          </h1>
                          <p className="author_of_book text-[#515151] text-[14px] font-400">
                            Bobojon Gafurov
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
};

export default Members;

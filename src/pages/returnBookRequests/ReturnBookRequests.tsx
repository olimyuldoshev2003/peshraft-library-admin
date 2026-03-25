import { HiOutlineSearch } from "react-icons/hi";
import userImg from "../../assets/user-img.svg";

// Icons
// import TuneIcon from "@mui/icons-material/Tune";
// import { LuPlus } from "react-icons/lu";
// import FormControl from "@mui/material/FormControl";
// import InputLabel from "@mui/material/InputLabel";
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
import { useMemo, useState } from "react";

//Material UI
import {
  alpha,
  // styled,
  // useTheme
} from "@mui/material/styles";
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
import Dialog from "@mui/material/Dialog";
import { MdOutlineClose } from "react-icons/md";
import DialogTitle from "@mui/material/DialogTitle";
// import { IoClose } from "react-icons/io5";
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogActions from "@mui/material/DialogActions";
// import {  MdOutlineClose } from "react-icons/md";

const ReturnBookRequests = () => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<any>("bookTitle");
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(17);
  const [
    modalAcceptingOrDecliningReceiverUserRequest,
    setModalAcceptingOrDecliningReceiverUserRequest,
  ] = useState<boolean>(false);

  // Table Section
  const rows: any = [
    {
      id: 1,
      img: "/src/assets/signIn/logo-pehraft-sign-in.svg",
      returnerFullName: "Olim Yuldoshev",
      email: "oyuldoshev39@hmail.com",
      phoneNumber: "919697875",
      borrowedDate: "2025-11-19",
      requestDate: "2026-11-11",
      bookTitle: "Cashflow Quadrant",
      author: "Robert T. Kiyosaki",
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
      id: "returner-full-name",
      numeric: false,
      disablePadding: false,
      label: "Returner Full Name",
    },
    {
      id: "phone-number",
      numeric: false,
      disablePadding: false,
      label: "Phone number",
    },
    {
      id: "email",
      numeric: false,
      disablePadding: false,
      label: "email",
    },
    {
      id: "borrowed-date",
      numeric: false,
      disablePadding: false,
      label: "Borrowed Date",
    },
    {
      id: "request-date",
      numeric: false,
      disablePadding: false,
      label: "Request Date",
    },
    {
      id: "book-title",
      numeric: false,
      disablePadding: true,
      label: "Book Title",
    },
    {
      id: "author",
      numeric: false,
      disablePadding: true,
      label: "Author",
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
          Requested Book Members
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

  return (
    <>
      <div className="return_book_request_component">
        <div className="return_book_request_component_block px-4 py-4">
          <div className="header_return_book_requests flex justify-between items-center gap-6">
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

          {/* Section */}
          <div className="section_received_book_requests mt-6">
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
                            {row.returnerFullName}
                          </TableCell>
                          <TableCell>{row.phoneNumber}</TableCell>
                          <TableCell>{row.email}</TableCell>
                          <TableCell>{row.borrowedDate}</TableCell>
                          <TableCell>{row.requestDate}</TableCell>
                          <TableCell>{row.bookTitle}</TableCell>
                          <TableCell>{row.author}</TableCell>
                          <TableCell>
                            <div className="btn_block">
                              <button
                                className="bg-[green] px-2.5 py-1.5 rounded-[5px] text-white text-[14px] font-500 cursor-pointer outline-none"
                                onClick={() => {
                                  setModalAcceptingOrDecliningReceiverUserRequest(
                                    true,
                                  );
                                }}
                              >
                                Accept
                              </button>
                            </div>
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

            <Dialog
              open={modalAcceptingOrDecliningReceiverUserRequest}
              onClose={() => {
                setModalAcceptingOrDecliningReceiverUserRequest(false);
              }}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              sx={{}}
              fullWidth
            >
              <div className="modal_delete_book_block px-4 py-4">
                <div className="header_delete_book_block flex items-center gap-6 justify-between">
                  <h1 className="text-[26px] font-600">
                    Request Returning Book
                  </h1>
                  <button
                    className="close_modal_btn outline-none cursor-pointer p-2 bg-[#D9D9D9] rounded-full"
                    onClick={() => {
                      setModalAcceptingOrDecliningReceiverUserRequest(false);
                    }}
                  >
                    <MdOutlineClose size={27} className="" />
                  </button>
                </div>
                <DialogTitle>
                  {"Did this person really return this book?"}
                </DialogTitle>
                <div className="block_btns flex gap-5 justify-between">
                  <button
                    className="hover:bg-[#20ACFF] p-2.5 rounded-[10px] text-[#20ACFF] hover:text-white text-[18px] font-500 cursor-pointer w-full duration-300"
                    onClick={() => {
                      setModalAcceptingOrDecliningReceiverUserRequest(false);
                    }}
                  >
                    No
                  </button>
                  <button className="hover:bg-[red] text-[red] p-2.5 rounded-[10px] hover:text-white text-[18px] font-500 cursor-pointer w-full duration-300">
                    Yes
                  </button>
                </div>
              </div>
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReturnBookRequests;

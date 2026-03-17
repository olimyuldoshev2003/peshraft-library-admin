import { HiOutlineSearch } from "react-icons/hi";
import userImg from "../../assets/user-img.svg";

// Icons
import TuneIcon from "@mui/icons-material/Tune";
import { LuPlus } from "react-icons/lu";
// import FormControl from "@mui/material/FormControl";
// import InputLabel from "@mui/material/InputLabel";
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
import { useMemo, useState } from "react";

//Material UI
import {
  alpha,
  styled,
  // useTheme
} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { IoClose } from "react-icons/io5";
import { AiFillEdit } from "react-icons/ai";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import { MdDelete } from "react-icons/md";

const BorrowedBooks = () => {
  const allFiltersByCategory: any = [
    {
      id: "fantasy",
      filterName: "Fantasy",
    },
    {
      id: "best-book",
      filterName: "Best Book",
    },
    {
      id: "classics",
      filterName: "Classics",
    },
    {
      id: "romance",
      filterName: "Romance",
    },
    {
      id: "science-fiction",
      filterName: "Science Fiction",
    },
    {
      id: "mystery",
      filterName: "Mystery",
    },
    {
      id: "historycal-fiction",
      filterName: "Historical Fiction",
    },
    {
      id: "finance",
      filterName: "Finance",
    },
  ];

  const filtersByCategory: any = [
    {
      id: "fantasy",
      filterName: "Fantasy",
    },
    {
      id: "best-book",
      filterName: "Best Book",
    },
    {
      id: "classics",
      filterName: "Classics",
    },
    {
      id: "romance",
      filterName: "Romance",
    },
    {
      id: "science-fiction",
      filterName: "Science Fiction",
    },
    {
      id: "mystery",
      filterName: "Mystery",
    },
    {
      id: "historycal-fiction",
      filterName: "Historical Fiction",
    },
  ];

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<any>("bookTitle");
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  // const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState<number>(17);
  const [modalFilter, setModalFilter] = useState<boolean>(false);
  const [modalShowAllFilters, setModalShowAllFilters] =
    useState<boolean>(false);
  const [modalFilterOptions, setModalFilterOptions] = useState<boolean>(false);

  function removeScrollbar() {
    document.body.classList.add("scroll_hidden_modal_filter_without_overlay");
    document.body.classList.remove(
      "scroll_visible_modal_filter_without_overlay",
    );
  }

  function showScrollbar() {
    document.body.classList.add("scroll_visible_modal_filter_without_overlay");
    document.body.classList.remove(
      "scroll_hidden_modal_filter_without_overlay",
    );
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

  // Table Section
  const rows: any = [
    {
      id: 1,
      img: "/src/assets/signIn/logo-pehraft-sign-in.svg",
      bookTitle: "Cashflow Quadrant",
      borrowerName: "Olim Yuldoshev",
      dateBorrowed: "2025-11-19",
      dueDate: "2026-11-11",
      phoneNumber: "919697875",
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
      id: "book-title",
      numeric: false,
      disablePadding: true,
      label: "Book Title",
    },
    {
      id: "borrower-name",
      numeric: false,
      disablePadding: false,
      label: "Borrower Name",
    },
    {
      id: "date-borrowed",
      numeric: false,
      disablePadding: false,
      label: "Date Borrowed",
    },
    {
      id: "due-date",
      numeric: false,
      disablePadding: false,
      label: "Due Date",
    },
    {
      id: "phone-number",
      numeric: false,
      disablePadding: false,
      label: "Phone number",
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
          Books
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
      <div className="borrowed_books_component">
        <div className="borrowed_books_component_block p-4">
          <div className="header_borrowed_books flex justify-between items-center gap-6">
            <div className="search_logo_and_search_input relative flex items-center flex-1 gap-4">
              <HiOutlineSearch size={24} className="absolute top-4 left-4" />
              <input
                type="search"
                className="inp_search outline-none shadow-[0_0_6px_gray] pl-12 pr-4 py-3 rounded-[30px] text-[20px] font-500 sm:w-full md:w-[90%] lg:w-[80%]"
                placeholder="Search enter..."
              />

              <div className="btn_filter_and_modal_filter_overlay_transparent_block md:relative flex flex-col">
                <button
                  className="icons_filter_block shadow-[0_0_6px_gray] flex justify-center items-center p-2 rounded-[10px] cursor-pointer"
                  onClick={() => {
                    setModalFilter(true);
                    removeScrollbar();
                  }}
                >
                  <TuneIcon
                    sx={{
                      fontSize: "36px",
                    }}
                  />
                </button>

                {/* Modal filter */}
                <div
                  className={`modal_filter_transparent_overlay_main_block absolute sm:left-0 sm:w-full sm:top-16 md:top-15 md:-left-30.5 p-3 z-40 rounded-2xl duration-300
                md:w-77.5
                bg-white shadow-2xl
                ${modalFilter ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}
                `}
                >
                  <div className="header_modal_filter flex justify-between items-center">
                    <h1 className="title_filter_modal text-[20px] font-500">
                      Filter Book
                    </h1>
                    <IoClose
                      size={31}
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setModalFilter(false);
                        showScrollbar();
                      }}
                    />
                  </div>
                  <div className="section_modal_filter">
                    <div className="filter_by_category_block">
                      <h1 className="title_filter_by_category text-[#A1A1A1] text-[16px] font-400">
                        Category
                      </h1>
                      <div className="filter_by_category mt-1 grid grid-cols-2 gap-2">
                        {filtersByCategory?.map((item: any) => {
                          return (
                            <div
                              key={item.id}
                              className="flex items-center gap-2"
                            >
                              <input
                                type="checkbox"
                                name=""
                                id={item.id}
                                className="outline-none cursor-pointer"
                              />
                              <label
                                className="text-[#6C757D] text-[13px] font-400 cursor-pointer"
                                htmlFor={item.id}
                              >
                                {item.filterName}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="btns_show_filters_and_filter_options flex justify-between mt-1 px-5">
                      <button
                        className="show_filters cursor-pointer outline-none text-[14px] font-400 text-[gray] hover:text-green-500"
                        onClick={() => {
                          setModalShowAllFilters(true);
                          setModalFilter(false);
                        }}
                      >
                        Show All Filters
                      </button>
                      <button
                        className="filter_options cursor-pointer outline-none text-[14px] font-400 text-[gray] hover:text-green-500"
                        onClick={() => {
                          setModalFilterOptions(true);
                          setModalFilter(false);
                        }}
                      >
                        Filter Options
                      </button>
                    </div>

                    <div className="btn_submit_block flex justify-end mt-2">
                      <button className="btn_submit_filter cursor-pointer px-5 py-1 text-[#FFFFFF] text-[18px] font-500 bg-[#20ACFF] rounded-[10px]">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>

                {/* Modal Show All Filters */}
                <Dialog
                  open={modalShowAllFilters}
                  onClose={() => {
                    setModalShowAllFilters(false);
                    showScrollbar();
                  }}
                  // fullScreen={fullScreen}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  sx={{}}
                >
                  <div className="modal_show_all_filters_block px-4 py-4">
                    {/* <h1 className="title_filter_by_category text-[#A1A1A1] text-[16px] font-400">
                    Filter by Category
                  </h1> */}

                    <DialogTitle id="alert-dialog-title">
                      {"Filter by Category"}
                    </DialogTitle>
                    <div className="filter_by_category mt-1 grid sm:grid-cols-2 md:grid-cols-5 gap-2">
                      {allFiltersByCategory?.map((item: any) => {
                        return (
                          <div
                            key={item.id}
                            className="flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              name=""
                              id={item.id}
                              className="outline-none cursor-pointer"
                            />
                            <label
                              className="text-[#6C757D] text-[13px] font-400 cursor-pointer"
                              htmlFor={item.id}
                            >
                              {item.filterName}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                    <DialogActions>
                      <button
                        className="btn_submit_filter cursor-pointer px-5 py-1 text-[#FFFFFF] text-[18px] font-500 bg-[#20ACFF] rounded-[10px]"
                        onClick={() => {
                          setModalShowAllFilters(false);
                        }}
                      >
                        Submit
                      </button>
                    </DialogActions>
                  </div>
                </Dialog>

                {/* Modal Filter Options */}
                <Dialog
                  open={modalFilterOptions}
                  onClose={() => {
                    setModalFilterOptions(false);
                    showScrollbar();
                  }}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <div className="modal_filter_options_block px-4 py-4">
                    <div className="header_modal_filter_options_block flex justify-between items-center">
                      <DialogTitle id="alert-dialog-title">
                        {"Filter Options"}
                      </DialogTitle>
                      <button className="add_filter_btn flex items-center gap-1 bg-[#20ACFF] px-2.5 py-2.5 rounded-[10px] text-white text-[18px] font-500 cursor-pointer">
                        <LuPlus />
                      </button>
                    </div>

                    <div className="filter_functionalities_or_options">
                      <TableContainer>
                        <Table
                          aria-label="customized table"
                          sx={{
                            width: 500,
                          }}
                        >
                          <TableHead>
                            <TableRow>
                              <StyledTableCell>Filter name</StyledTableCell>
                              <StyledTableCell align="right">
                                Action
                              </StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <StyledTableRow>
                              <StyledTableCell>Finance</StyledTableCell>
                              <StyledTableCell
                                sx={{
                                  width: "",
                                }}
                              >
                                <div className="btn_func_block flex items-center gap-1.5">
                                  <AiFillEdit
                                    size={27}
                                    className="cursor-pointer text-blue-600 hover:text-blue-800 duration-100"
                                  />
                                  <MdDelete
                                    size={27}
                                    className="cursor-pointer text-red-500 hover:text-red-600 duration-100"
                                  />
                                </div>
                              </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                              <StyledTableCell>Fantasy</StyledTableCell>
                              <StyledTableCell
                                sx={{
                                  width: "",
                                }}
                              >
                                <div className="btn_func_block flex items-center gap-1.5">
                                  <AiFillEdit
                                    size={27}
                                    className="cursor-pointer text-blue-600 hover:text-blue-800 duration-100"
                                  />
                                  <MdDelete
                                    size={27}
                                    className="cursor-pointer text-red-500 hover:text-red-600 duration-100"
                                  />
                                </div>
                              </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                              <StyledTableCell>Drama</StyledTableCell>
                              <StyledTableCell
                                sx={{
                                  width: "",
                                }}
                              >
                                <div className="btn_func_block flex items-center gap-1.5">
                                  <AiFillEdit
                                    size={27}
                                    className="cursor-pointer text-blue-600 hover:text-blue-800 duration-100"
                                  />
                                  <MdDelete
                                    size={27}
                                    className="cursor-pointer text-red-500 hover:text-red-600 duration-100"
                                  />
                                </div>
                              </StyledTableCell>
                            </StyledTableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                  </div>
                </Dialog>
              </div>
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
          <div className="section_borrowed_books">
            <div className="table_books mt-6">
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
                  <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
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
                              {row.bookTitle}
                            </TableCell>
                            <TableCell>{row.borrowerName}</TableCell>
                            <TableCell>{row.dateBorrowed}</TableCell>
                            <TableCell>{row.dueDate}</TableCell>
                            <TableCell>{row.phoneNumber}</TableCell>
                            <TableCell>
                              <div className="btn_func_block flex items-center gap-1.5">
                                <MdDelete
                                  size={27}
                                  className="cursor-pointer text-red-500 hover:text-red-600 duration-100"
                                />
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
            </div>
          </div>

          <div
            className={`transpartent_overlay_modal_filter absolute inset-0 ${modalFilter ? "pointer-events-auto" : "pointer-events-none"}`}
            onClick={() => {
              setModalFilter(false);
              showScrollbar();
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default BorrowedBooks;
